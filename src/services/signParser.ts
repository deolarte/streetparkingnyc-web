import type { CurbSegment, ParkingStatus, VehicleType } from '../types';
import { getAspHolidayStatus } from './aspCalendar';

interface TimeWindow {
  startMinutes: number; // minutes from midnight (0 .. 1439)
  endMinutes: number;
  daysOfWeek: number[]; // 0=Sunday, 1=Monday, ..., 6=Saturday
  type: 'street_sweeping' | 'no_parking' | 'no_standing' | 'no_stopping' | 'commercial_only' | 'metered';
  rawText: string;
}

const DAY_MAP: Record<string, number> = {
  SUN: 0,
  SUNDAY: 0,
  MON: 1,
  MONDAY: 1,
  TUE: 2,
  TUES: 2,
  TUESDAY: 2,
  WED: 3,
  WEDNESDAY: 3,
  THU: 4,
  THUR: 4,
  THURS: 4,
  THURSDAY: 4,
  FRI: 5,
  FRIDAY: 5,
  SAT: 6,
  SATURDAY: 6,
};

function parseTimeToMinutes(timeStr: string): number | null {
  const clean = timeStr.trim().toUpperCase();
  const match = clean.match(/^(\d{1,2})(?::(\d{2}))?\s*(AM|PM|MIDNIGHT|NOON)?$/);
  if (!match) return null;

  let hour = parseInt(match[1], 10);
  const minute = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3];

  if (period === 'MIDNIGHT' || (hour === 12 && period === 'AM')) {
    hour = 0;
  } else if (period === 'NOON' || (hour === 12 && period === 'PM')) {
    hour = 12;
  } else if (period === 'PM' && hour < 12) {
    hour += 12;
  }

  return hour * 60 + minute;
}

function parseDays(text: string): number[] {
  const upper = text.toUpperCase();
  const days: Set<number> = new Set();

  if (upper.includes('ANYTIME') || upper.includes('ALL DAYS')) {
    return [0, 1, 2, 3, 4, 5, 6];
  }

  if (upper.includes('EXCEPT SUNDAY')) {
    return [1, 2, 3, 4, 5, 6];
  }

  if (upper.includes('MONDAY-FRIDAY') || upper.includes('MON-FRI') || upper.includes('MONDAY THRU FRIDAY')) {
    [1, 2, 3, 4, 5].forEach((d) => days.add(d));
  }

  if (upper.includes('MONDAY-SATURDAY') || upper.includes('MON-SAT')) {
    [1, 2, 3, 4, 5, 6].forEach((d) => days.add(d));
  }

  // Look for single or paired days (e.g. MONDAY THURSDAY or TUESDAY FRIDAY)
  const tokens = upper.split(/[\s,/-]+/);
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (DAY_MAP[t] !== undefined) {
      // Check if it's a range like MON-WED
      if (tokens[i + 1] === 'TO' || tokens[i + 1] === 'THRU') {
        const next = tokens[i + 2];
        if (DAY_MAP[next] !== undefined) {
          const start = DAY_MAP[t];
          const end = DAY_MAP[next];
          for (let d = start; d <= end; d++) days.add(d);
          i += 2;
          continue;
        }
      }
      days.add(DAY_MAP[t]);
    }
  }

  return days.size > 0 ? Array.from(days) : [1, 2, 3, 4, 5]; // default Mon-Fri if day pattern was implied
}

export function parseSignToWindows(description: string): TimeWindow[] {
  const upper = description.toUpperCase();
  const windows: TimeWindow[] = [];

  const isSweeping =
    upper.includes('SANITATION BROOM') ||
    upper.includes('BROOM SYMBOL') ||
    upper.includes('STREET CLEANING') ||
    (upper.includes('NO PARKING') && (upper.includes('9AM-10:30AM') || upper.includes('8:30AM-10AM') || upper.includes('9:30AM-11AM') || upper.includes('8AM-9:30AM') || upper.includes('11AM-12:30PM') || upper.includes('11:30AM-1PM')));

  const isStanding = upper.includes('NO STANDING');
  const isStopping = upper.includes('NO STOPPING');
  const isCommercial = upper.includes('TRUCK') || upper.includes('COMMERCIAL VEHICLES') || upper.includes('LOADING ONLY');
  const isMeter = upper.includes('HMP') || upper.includes('METER') || upper.includes('PAY-BY-CELL');
  const isNoParking = upper.includes('NO PARKING') && !isSweeping;

  let type: TimeWindow['type'] = 'no_parking';
  if (isSweeping) type = 'street_sweeping';
  else if (isStopping) type = 'no_stopping';
  else if (isStanding) type = 'no_standing';
  else if (isCommercial) type = 'commercial_only';
  else if (isMeter) type = 'metered';
  else if (isNoParking) type = 'no_parking';

  // Anytime restrictions
  if (upper.includes('ANYTIME')) {
    windows.push({
      startMinutes: 0,
      endMinutes: 1440,
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
      type,
      rawText: description,
    });
    return windows;
  }

  // Parse time ranges e.g., "8:30AM-10AM", "7AM-7PM", "9AM-4PM"
  const timeRangeMatch = upper.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM|MIDNIGHT|NOON)?)\s*-\s*(\d{1,2}(?::\d{2})?\s*(?:AM|PM|MIDNIGHT|NOON)?)/);

  if (timeRangeMatch) {
    const startM = parseTimeToMinutes(timeRangeMatch[1]);
    const endM = parseTimeToMinutes(timeRangeMatch[2]);
    const days = parseDays(upper);

    if (startM !== null && endM !== null) {
      windows.push({
        startMinutes: startM,
        endMinutes: endM < startM ? endM + 1440 : endM, // handle overnight
        daysOfWeek: days,
        type,
        rawText: description,
      });
    }
  } else {
    // If no explicit time range found but days are present or meter noted
    if (isMeter) {
      windows.push({
        startMinutes: 8 * 60, // 8:00 AM
        endMinutes: 19 * 60, // 7:00 PM
        daysOfWeek: [1, 2, 3, 4, 5, 6],
        type: 'metered',
        rawText: description,
      });
    }
  }

  return windows;
}

export function evaluateSegmentParking(
  segment: Omit<CurbSegment, 'status' | 'statusBadge' | 'statusHeadline' | 'statusDescription' | 'nextChangeTime' | 'timeUntilChangeMinutes' | 'activeRestrictionType'>,
  targetTime: Date,
  vehicleType: VehicleType = 'passenger'
): CurbSegment {
  const dayOfWeek = targetTime.getDay();
  const currentMinutes = targetTime.getHours() * 60 + targetTime.getMinutes();
  const aspStatus = getAspHolidayStatus(targetTime);

  // Extract all time windows from signs and meter data
  const allWindows: TimeWindow[] = [];

  for (const sign of segment.signs) {
    const windows = parseSignToWindows(sign.description);
    allWindows.push(...windows);
  }

  // Add meter window if meter info exists
  if (segment.meterInfo) {
    const mInfo = segment.meterInfo;
    const isCommercialMeter = mInfo.vehicleType.toLowerCase().includes('commercial');
    
    // Check if commercial meter applies to vehicle
    if (isCommercialMeter && vehicleType === 'passenger') {
      // Commercial only meter -> passenger vehicle is RESTRICTED (no parking for personal car)
      const days = parseDays(mInfo.commercialHours || 'Monday-Friday');
      const timeMatch = (mInfo.commercialHours || '7 AM-7 PM').match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM))\s*-\s*(\d{1,2}(?::\d{2})?\s*(?:AM|PM))/i);
      if (timeMatch) {
        const s = parseTimeToMinutes(timeMatch[1]);
        const e = parseTimeToMinutes(timeMatch[2]);
        if (s !== null && e !== null) {
          allWindows.push({
            startMinutes: s,
            endMinutes: e,
            daysOfWeek: days,
            type: 'commercial_only',
            rawText: `Commercial Only Meter: ${mInfo.commercialHours}`,
          });
        }
      }
    } else {
      // General meter
      const hoursStr = mInfo.allVehiclesHours || mInfo.commercialHours || 'Monday-Saturday 8 AM-7 PM';
      const days = parseDays(hoursStr);
      const timeMatch = hoursStr.match(/(\d{1,2}(?::\d{2})?\s*(?:AM|PM))\s*-\s*(\d{1,2}(?::\d{2})?\s*(?:AM|PM))/i);
      if (timeMatch) {
        const s = parseTimeToMinutes(timeMatch[1]);
        const e = parseTimeToMinutes(timeMatch[2]);
        if (s !== null && e !== null) {
          allWindows.push({
            startMinutes: s,
            endMinutes: e,
            daysOfWeek: days,
            type: 'metered',
            rawText: `Meter: ${hoursStr}`,
          });
        }
      }
    }
  }

  // Check currently active window
  let activeRestriction: TimeWindow | null = null;
  let activeMeter: TimeWindow | null = null;

  for (const win of allWindows) {
    if (!win.daysOfWeek.includes(dayOfWeek)) continue;

    // Check ASP suspension
    if (win.type === 'street_sweeping' && aspStatus.suspended) {
      // Street cleaning suspended today!
      continue;
    }

    // Check Major Holiday meter suspension
    if (win.type === 'metered' && aspStatus.isMajor) {
      continue;
    }

    if (currentMinutes >= win.startMinutes && currentMinutes < win.endMinutes) {
      if (win.type === 'metered') {
        activeMeter = win;
      } else {
        // Red restriction takes precedence over meter
        activeRestriction = win;
        break;
      }
    }
  }

  // Check impending restrictions in the next 60 minutes
  let impendingRestriction: TimeWindow | null = null;
  let minutesUntilImpending: number | null = null;

  if (!activeRestriction) {
    for (const win of allWindows) {
      if (!win.daysOfWeek.includes(dayOfWeek)) continue;
      if (win.type === 'street_sweeping' && aspStatus.suspended) continue;
      if (win.type === 'metered') continue; // only warning for tow/no-parking/sweeping

      const diff = win.startMinutes - currentMinutes;
      if (diff > 0 && diff <= 60) {
        if (minutesUntilImpending === null || diff < minutesUntilImpending) {
          minutesUntilImpending = diff;
          impendingRestriction = win;
        }
      }
    }
  }

  // Determine Parking Status and Description
  let status = 'free' as ParkingStatus;
  let statusBadge = '🟢 Legal Free Parking';
  let statusHeadline = 'Free Parking Permitted';
  let statusDescription = 'No active street cleaning or tow-away restrictions at this time.';
  let timeUntilChangeMinutes: number | undefined;
  let activeRestrictionType: CurbSegment['activeRestrictionType'] = undefined;

  if (activeRestriction) {
    status = 'restricted';
    activeRestrictionType = activeRestriction.type;
    const endHour = Math.floor(activeRestriction.endMinutes / 60);
    const endMin = activeRestriction.endMinutes % 60;
    const endPeriod = endHour >= 12 ? 'PM' : 'AM';
    const dispHour = endHour % 12 === 0 ? 12 : endHour % 12;
    const endFormatted = `${dispHour}:${String(endMin).padStart(2, '0')} ${endPeriod}`;
    timeUntilChangeMinutes = activeRestriction.endMinutes - currentMinutes;

    if (activeRestriction.type === 'street_sweeping') {
      statusBadge = '🔴 Street Cleaning (ASP)';
      statusHeadline = 'No Parking — Street Sweeping Active';
      statusDescription = `Alternate side sweeping in progress until ${endFormatted}. Violators will be ticketed.`;
    } else if (activeRestriction.type === 'commercial_only') {
      statusBadge = '🔴 Commercial Vehicles Only';
      statusHeadline = 'Restricted — Trucks / Loading Only';
      statusDescription = `Commercial loading zone until ${endFormatted}. Passenger vehicles are prohibited.`;
    } else if (activeRestriction.type === 'no_standing') {
      statusBadge = '🔴 No Standing Anytime';
      statusHeadline = 'No Standing Zone';
      statusDescription = `Vehicles may not wait, stop, or park here until ${endFormatted}.`;
    } else {
      statusBadge = '🔴 No Parking';
      statusHeadline = 'Parking Prohibited';
      statusDescription = `Active parking restriction until ${endFormatted}.`;
    }
  } else if (impendingRestriction && minutesUntilImpending !== null) {
    status = 'warning';
    timeUntilChangeMinutes = minutesUntilImpending;
    const restrictionName = impendingRestriction.type === 'street_sweeping' ? 'Street Sweeping' : 'No Parking Restriction';
    statusBadge = `🟡 Restriction in ${minutesUntilImpending}m`;
    statusHeadline = `Approaching ${restrictionName}`;
    statusDescription = `Legal right now, but ${restrictionName.toLowerCase()} begins in ${minutesUntilImpending} minutes (${impendingRestriction.rawText}). Move your vehicle to avoid fines.`;
  } else if (activeMeter) {
    status = 'metered';
    activeRestrictionType = 'metered';
    timeUntilChangeMinutes = activeMeter.endMinutes - currentMinutes;
    const rateInfo = segment.meterInfo?.allVehiclesRate || '$4.50–$8.25/hr';
    const zone = segment.meterInfo?.meterRateZone || 'ParkNYC Zone';
    statusBadge = `🔵 Metered Parking (${zone})`;
    statusHeadline = 'Paid Muni-Meter in Effect';
    statusDescription = `Pay-by-Cell Meter zone active. Rates: ${rateInfo}. Max stay: ${segment.meterInfo?.allVehiclesDuration || '2-3 Hours'}.`;
  } else {
    // Check if ASP was suspended for the day
    if (aspStatus.suspended && aspStatus.holidayName) {
      statusBadge = '🟢 Free (Holiday ASP Suspension)';
      statusHeadline = 'ASP Rules Suspended Today';
      statusDescription = `Alternate side parking is suspended for ${aspStatus.holidayName}. Parking is 100% legal & free!`;
    }
  }

  const nextChangeTime =
    timeUntilChangeMinutes !== undefined
      ? new Date(targetTime.getTime() + timeUntilChangeMinutes * 60000)
      : undefined;

  return {
    ...segment,
    status,
    statusBadge,
    statusHeadline,
    statusDescription,
    nextChangeTime,
    timeUntilChangeMinutes,
    activeRestrictionType,
  };
}
