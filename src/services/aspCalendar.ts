import type { AspHoliday } from '../types';

/**
 * Official NYC DOT Alternate Side Parking (ASP) Holiday Calendar.
 * Street cleaning regulations are suspended on these official city holidays.
 * (Note: Major Legal Holidays also suspend parking meters, while standard holidays only suspend street sweeping).
 */
export const NYC_ASP_HOLIDAYS: AspHoliday[] = [
  // 2025
  { date: '2025-01-01', name: "New Year's Day (Major)", rulesSuspended: true },
  { date: '2025-01-06', name: 'Three Kings Day', rulesSuspended: true },
  { date: '2025-01-20', name: 'Martin Luther King Jr. Day', rulesSuspended: true },
  { date: '2025-01-29', name: 'Lunar New Year', rulesSuspended: true },
  { date: '2025-02-12', name: "Lincoln's Birthday", rulesSuspended: true },
  { date: '2025-02-17', name: "Washington's Birthday (Presidents' Day)", rulesSuspended: true },
  { date: '2025-03-05', name: 'Ash Wednesday', rulesSuspended: true },
  { date: '2025-03-14', name: 'Purim', rulesSuspended: true },
  { date: '2025-03-31', name: 'Eid al-Fitr (Day 1)', rulesSuspended: true },
  { date: '2025-04-01', name: 'Eid al-Fitr (Day 2)', rulesSuspended: true },
  { date: '2025-04-13', name: 'Passover (Day 1)', rulesSuspended: true },
  { date: '2025-04-18', name: 'Good Friday', rulesSuspended: true },
  { date: '2025-04-19', name: 'Passover (Day 7)', rulesSuspended: true },
  { date: '2025-05-26', name: 'Memorial Day (Major)', rulesSuspended: true },
  { date: '2025-06-06', name: 'Eid al-Adha (Day 1)', rulesSuspended: true },
  { date: '2025-06-07', name: 'Eid al-Adha (Day 2)', rulesSuspended: true },
  { date: '2025-06-19', name: 'Juneteenth', rulesSuspended: true },
  { date: '2025-07-04', name: 'Independence Day (Major)', rulesSuspended: true },
  { date: '2025-08-15', name: 'Feast of the Assumption', rulesSuspended: true },
  { date: '2025-09-01', name: 'Labor Day (Major)', rulesSuspended: true },
  { date: '2025-09-23', name: 'Rosh Hashanah (Day 1)', rulesSuspended: true },
  { date: '2025-09-24', name: 'Rosh Hashanah (Day 2)', rulesSuspended: true },
  { date: '2025-10-02', name: 'Yom Kippur', rulesSuspended: true },
  { date: '2025-10-07', name: 'Succoth (Day 1)', rulesSuspended: true },
  { date: '2025-10-13', name: 'Columbus Day / Indigenous Peoples Day', rulesSuspended: true },
  { date: '2025-10-20', name: 'Diwali', rulesSuspended: true },
  { date: '2025-11-01', name: "All Saints' Day", rulesSuspended: true },
  { date: '2025-11-04', name: 'Election Day', rulesSuspended: true },
  { date: '2025-11-11', name: 'Veterans Day', rulesSuspended: true },
  { date: '2025-11-27', name: 'Thanksgiving Day (Major)', rulesSuspended: true },
  { date: '2025-12-08', name: 'Immaculate Conception', rulesSuspended: true },
  { date: '2025-12-25', name: 'Christmas Day (Major)', rulesSuspended: true },

  // 2026
  { date: '2026-01-01', name: "New Year's Day (Major)", rulesSuspended: true },
  { date: '2026-01-06', name: 'Three Kings Day', rulesSuspended: true },
  { date: '2026-01-19', name: 'Martin Luther King Jr. Day', rulesSuspended: true },
  { date: '2026-02-12', name: "Lincoln's Birthday", rulesSuspended: true },
  { date: '2026-02-16', name: "Washington's Birthday (Presidents' Day)", rulesSuspended: true },
  { date: '2026-02-17', name: 'Lunar New Year', rulesSuspended: true },
  { date: '2026-02-18', name: 'Ash Wednesday', rulesSuspended: true },
  { date: '2026-03-03', name: 'Purim', rulesSuspended: true },
  { date: '2026-03-20', name: 'Eid al-Fitr', rulesSuspended: true },
  { date: '2026-04-02', name: 'Passover (Day 1)', rulesSuspended: true },
  { date: '2026-04-03', name: 'Good Friday', rulesSuspended: true },
  { date: '2026-04-08', name: 'Passover (Day 7)', rulesSuspended: true },
  { date: '2026-05-25', name: 'Memorial Day (Major)', rulesSuspended: true },
  { date: '2026-05-27', name: 'Eid al-Adha', rulesSuspended: true },
  { date: '2026-06-19', name: 'Juneteenth', rulesSuspended: true },
  { date: '2026-07-04', name: 'Independence Day (Major)', rulesSuspended: true },
  { date: '2026-08-15', name: 'Feast of the Assumption', rulesSuspended: true },
  { date: '2026-09-07', name: 'Labor Day (Major)', rulesSuspended: true },
  { date: '2026-09-12', name: 'Rosh Hashanah', rulesSuspended: true },
  { date: '2026-09-21', name: 'Yom Kippur', rulesSuspended: true },
  { date: '2026-10-12', name: 'Columbus Day / Indigenous Peoples Day', rulesSuspended: true },
  { date: '2026-11-03', name: 'Election Day', rulesSuspended: true },
  { date: '2026-11-08', name: 'Diwali', rulesSuspended: true },
  { date: '2026-11-11', name: 'Veterans Day', rulesSuspended: true },
  { date: '2026-11-26', name: 'Thanksgiving Day (Major)', rulesSuspended: true },
  { date: '2026-12-08', name: 'Immaculate Conception', rulesSuspended: true },
  { date: '2026-12-25', name: 'Christmas Day (Major)', rulesSuspended: true },

  // 2027
  { date: '2027-01-01', name: "New Year's Day (Major)", rulesSuspended: true },
  { date: '2027-01-18', name: 'Martin Luther King Jr. Day', rulesSuspended: true },
  { date: '2027-02-15', name: "Presidents' Day", rulesSuspended: true },
  { date: '2027-05-31', name: 'Memorial Day (Major)', rulesSuspended: true },
  { date: '2027-07-04', name: 'Independence Day (Major)', rulesSuspended: true },
  { date: '2027-09-06', name: 'Labor Day (Major)', rulesSuspended: true },
  { date: '2027-11-25', name: 'Thanksgiving Day (Major)', rulesSuspended: true },
  { date: '2027-12-25', name: 'Christmas Day (Major)', rulesSuspended: true },
];

/**
 * Check if Alternate Side Parking is suspended on a given Date.
 */
export function getAspHolidayStatus(date: Date): { suspended: boolean; holidayName?: string; isMajor: boolean } {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const dateKey = `${yyyy}-${mm}-${dd}`;

  // Sunday is always suspended for ASP citywide
  if (date.getDay() === 0) {
    return {
      suspended: true,
      holidayName: 'Sunday (Citywide ASP Free)',
      isMajor: false,
    };
  }

  const holiday = NYC_ASP_HOLIDAYS.find((h) => h.date === dateKey);
  if (holiday) {
    return {
      suspended: true,
      holidayName: holiday.name,
      isMajor: holiday.name.includes('(Major)'),
    };
  }

  return {
    suspended: false,
    isMajor: false,
  };
}
