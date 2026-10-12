import type { SupportedLocale } from './config';
import type { CurbSegment } from '../types';

const DAY_NAMES: Record<SupportedLocale, Record<string, string>> = {
  en: {
    Sunday: 'Sunday',
    Monday: 'Monday',
    Tuesday: 'Tuesday',
    Wednesday: 'Wednesday',
    Thursday: 'Thursday',
    Friday: 'Friday',
    Saturday: 'Saturday',
    Today: 'Today',
    Tomorrow: 'Tomorrow',
  },
  es: {
    Sunday: 'Domingo',
    Monday: 'Lunes',
    Tuesday: 'Martes',
    Wednesday: 'Miércoles',
    Thursday: 'Jueves',
    Friday: 'Viernes',
    Saturday: 'Sábado',
    Today: 'Hoy',
    Tomorrow: 'Mañana',
  },
  zh: {
    Sunday: '周日',
    Monday: '周一',
    Tuesday: '周二',
    Wednesday: '周三',
    Thursday: '周四',
    Friday: '周五',
    Saturday: '周六',
    Today: '今天',
    Tomorrow: '明天',
  },
};

export function localizeTimelineDate(text: string, locale: SupportedLocale): string {
  if (locale === 'en' || !text) return text;

  let result = text;

  // Replace English days
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (const d of days) {
    const localized = DAY_NAMES[locale][d] || d;
    result = result.replace(new RegExp(`\\b${d}\\b`, 'g'), localized);
  }

  if (locale === 'es') {
    result = result.replace(/\bToday at\b/i, 'Hoy a las');
    result = result.replace(/\bTomorrow\b/i, 'Mañana');
    result = result.replace(/\bat (\d)/i, 'a las $1');
  } else if (locale === 'zh') {
    result = result.replace(/\bToday at\b/i, '今天');
    result = result.replace(/\bTomorrow\b/i, '明天');
    result = result.replace(/\bat (\d{1,2}:\d{2}\s*(?:AM|PM)?)/i, '$1');
    result = result.replace(/(\d{1,2}:\d{2})\s*AM/i, '上午 $1');
    result = result.replace(/(\d{1,2}:\d{2})\s*PM/i, '下午 $1');
  }

  return result;
}

export function localizeDuration(text: string, locale: SupportedLocale): string {
  if (locale === 'en' || !text) return text;

  if (locale === 'es') {
    return text
      .replace(/(\d+)m left/i, 'Quedan $1m')
      .replace(/(\d+)h (\d+)m left/i, 'Quedan $1h $2m')
      .replace(/(\d+)h left/i, 'Quedan $1h')
      .replace(/(\d+)d (\d+)h left/i, 'Quedan $1d $2h')
      .replace(/(\d+)d left/i, 'Quedan $1d');
  } else if (locale === 'zh') {
    return text
      .replace(/(\d+)m left/i, '剩余 $1分钟')
      .replace(/(\d+)h (\d+)m left/i, '剩余 $1小时 $2分')
      .replace(/(\d+)h left/i, '剩余 $1小时')
      .replace(/(\d+)d (\d+)h left/i, '剩余 $1天 $2小时')
      .replace(/(\d+)d left/i, '剩余 $1天');
  }

  return text;
}

export function localizeCurbSegment(curb: CurbSegment, locale: SupportedLocale): CurbSegment {
  if (locale === 'en') return curb;

  const clone: CurbSegment = { ...curb };

  // Status Badge
  if (clone.statusBadge) {
    if (clone.statusBadge.includes('Legal Free Parking')) {
      clone.statusBadge = locale === 'es' ? '🟢 Estacionamiento Gratuito' : '🟢 允许合法免费停车';
    } else if (clone.statusBadge.includes('Free (Holiday ASP Suspension)')) {
      clone.statusBadge = locale === 'es' ? '🟢 Gratis (ASP Suspendido por Feriado)' : '🟢 免费 (节假日扫街禁令暂停)';
    } else if (clone.statusBadge.includes('Street Cleaning (ASP)')) {
      clone.statusBadge = locale === 'es' ? '🔴 Barrido de Calles (ASP)' : '🔴 扫街禁令进行中 (ASP)';
    } else if (clone.statusBadge.includes('Commercial Vehicles Only')) {
      clone.statusBadge = locale === 'es' ? '🔴 Solo Vehículos Comerciales' : '🔴 仅限商业货车';
    } else if (clone.statusBadge.includes('No Standing Anytime')) {
      clone.statusBadge = locale === 'es' ? '🔴 Prohibido Detenerse' : '🔴 全时段禁止停留';
    } else if (clone.statusBadge.includes('No Parking')) {
      clone.statusBadge = locale === 'es' ? '🔴 No Estacionar' : '🔴 禁止停车';
    } else if (clone.statusBadge.includes('Commercial Meter')) {
      clone.statusBadge = locale === 'es' ? clone.statusBadge.replace('Commercial Meter', 'Parquímetro Comercial') : clone.statusBadge.replace('Commercial Meter', '商业货运咪表');
    } else if (clone.statusBadge.includes('Metered Parking')) {
      clone.statusBadge = locale === 'es' ? clone.statusBadge.replace('Metered Parking', 'Zona de Parquímetro') : clone.statusBadge.replace('Metered Parking', '收费咪表车位');
    } else if (clone.statusBadge.includes('Restriction in')) {
      clone.statusBadge = locale === 'es' ? clone.statusBadge.replace('Restriction in', 'Restricción en') : clone.statusBadge.replace(/Restriction in (\d+)m/, '禁令将在 $1分钟后生效');
    }
  }

  // Status Headline
  if (clone.statusHeadline) {
    if (clone.statusHeadline.includes('Free Parking Permitted')) {
      clone.statusHeadline = locale === 'es' ? 'Estacionamiento Gratuito Permitido' : '允许免费停放';
    } else if (clone.statusHeadline.includes('ASP Rules Suspended Today')) {
      clone.statusHeadline = locale === 'es' ? 'Reglas de ASP Suspendidas Hoy' : '今日扫街禁令暂停';
    } else if (clone.statusHeadline.includes('Street Sweeping Active')) {
      clone.statusHeadline = locale === 'es' ? 'No Estacionar — Barrido Activo' : '禁止停车 — 扫街进行中';
    } else if (clone.statusHeadline.includes('Restricted — Trucks / Loading Only')) {
      clone.statusHeadline = locale === 'es' ? 'Restringido — Solo Carga / Camiones' : '受限时段 — 仅限货车装卸';
    } else if (clone.statusHeadline.includes('No Standing Zone')) {
      clone.statusHeadline = locale === 'es' ? 'Zona de No Detenerse' : '全时段禁止停留区域';
    } else if (clone.statusHeadline.includes('Parking Prohibited')) {
      clone.statusHeadline = locale === 'es' ? 'Estacionamiento Prohibido' : '禁止停放';
    } else if (clone.statusHeadline.includes('Paid Muni-Meter in Effect')) {
      clone.statusHeadline = locale === 'es' ? 'Parquímetro Muni-Meter en Vigor' : 'Muni-Meter 咪表收费生效中';
    }
  }

  // Status Description
  if (clone.statusDescription) {
    if (clone.statusDescription.includes('No active street cleaning or tow-away restrictions at this time.')) {
      clone.statusDescription = locale === 'es'
        ? 'Sin barrido de calles ni restricciones de grúa activas en este momento.'
        : '当前时段无正在执行的扫街或拖车禁令。';
    } else if (clone.statusDescription.includes('Alternate side parking is suspended for')) {
      clone.statusDescription = locale === 'es'
        ? clone.statusDescription
            .replace('Alternate side parking is suspended for', 'El barrido (ASP) está suspendido por')
            .replace('Parking is 100% legal & free!', '¡El estacionamiento es 100% legal y gratuito!')
        : clone.statusDescription
            .replace('Alternate side parking is suspended for', '因以下节假日暂停扫街移车禁令：')
            .replace('Parking is 100% legal & free!', '停车完全合法且免费！');
    }
  }

  // Timeline
  if (clone.parkingTimeline) {
    const t = { ...clone.parkingTimeline };
    t.canParkUntilFormatted = localizeTimelineDate(t.canParkUntilFormatted, locale);
    if (t.resumeParkingFormatted) {
      t.resumeParkingFormatted = localizeTimelineDate(t.resumeParkingFormatted, locale);
    }
    t.durationFormatted = localizeDuration(t.durationFormatted, locale);

    if (t.nextEventTitle) {
      if (t.nextEventTitle.includes('No Standing')) {
        t.nextEventTitle = locale === 'es' ? 'Prohibido Detenerse (No Standing)' : '全时段禁止停留 (No Standing)';
      } else if (t.nextEventTitle.includes('Street Sweeping')) {
        t.nextEventTitle = locale === 'es' ? 'Barrido de Calles (ASP)' : '扫街清洁 (ASP)';
      } else if (t.nextEventTitle.includes('No Parking')) {
        t.nextEventTitle = locale === 'es' ? 'No Estacionar' : '禁止停车';
      } else if (t.nextEventTitle.includes('Commercial Loading Only')) {
        t.nextEventTitle = locale === 'es' ? 'Solo Carga Comercial' : '仅限商业货车装卸';
      }
    }

    if (t.nextEventDescription) {
      if (t.nextEventDescription.includes('No stopping or standing allowed')) {
        t.nextEventDescription = locale === 'es'
          ? 'No se permite detenerse ni esperar.'
          : '该时段内禁止任何车辆停靠或停留。';
      } else if (t.nextEventDescription.includes('Street sweeper cleaning in progress')) {
        t.nextEventDescription = locale === 'es'
          ? 'Barrido de calles en progreso.'
          : '环卫清扫车清洗路面进行中。';
      }
    }

    clone.parkingTimeline = t;
  }

  return clone;
}
