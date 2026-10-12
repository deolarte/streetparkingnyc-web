import type { SupportedLocale } from './config';

export interface TranslationDictionary {
  // Navigation & Search Header
  search_placeholder: string;
  searching: string;
  passenger: string;
  commercial: string;
  filter_all: string;
  filter_free: string;
  filter_meter: string;
  filter_soon: string;
  filter_restricted: string;
  tip_btn: string;
  feedback_btn: string;
  faq_btn: string;
  jump_to: string;
  one_block_zoom: string;
  matching_curbs: string;
  park_until: string;
  language: string;

  // Time Simulation Bar
  simulate: string;
  hide: string;
  now: string;
  realtime_feed: string;
  simulated_time: string;
  asp_suspended: string;
  no_sweeping: string;
  prev_day: string;
  next_day: string;

  // Curb Details (BottomSheet)
  free_parking: string;
  metered_parking: string;
  prohibited_parking: string;
  status_changing_soon: string;
  active_regulation: string;
  upcoming_rules: string;
  rates_and_limits: string;
  pay_parknyc: string;
  report_sign: string;
  close: string;
  north_curb: string;
  south_curb: string;
  east_curb: string;
  west_curb: string;
  both_sides: string;
  park_until_badge: string;
  zone: string;
  copied: string;

  // Modals & Misc
  about_title: string;
  disclaimer_agree: string;
}

export const translations: Record<SupportedLocale, TranslationDictionary> = {
  en: {
    search_placeholder: 'Search street, cross street, or address...',
    searching: 'Searching...',
    passenger: 'Passenger',
    commercial: 'Commercial',
    filter_all: 'All Curbs',
    filter_free: 'Free Now',
    filter_meter: 'Meter',
    filter_soon: 'Soon (<60m)',
    filter_restricted: 'No Parking',
    tip_btn: 'Tip ☕',
    feedback_btn: 'Feedback',
    faq_btn: 'FAQ & Rules',
    jump_to: 'Jump to:',
    one_block_zoom: '1-Block Zoom',
    matching_curbs: 'Matching Street Curbs',
    park_until: 'Park until',
    language: 'Language',

    simulate: 'Simulate',
    hide: 'Hide',
    now: 'Now',
    realtime_feed: '🔴 Real-Time Live Feed',
    simulated_time: '⏱️ Custom Simulated Time',
    asp_suspended: 'ASP Suspended',
    no_sweeping: 'No Sweeping',
    prev_day: '-1 Day',
    next_day: '+1 Day',

    free_parking: 'Free Parking',
    metered_parking: 'Muni-Meter Parking',
    prohibited_parking: 'Parking Prohibited',
    status_changing_soon: 'Status Changing Soon',
    active_regulation: 'Active Regulation',
    upcoming_rules: 'Upcoming Rules',
    rates_and_limits: 'Rates & Max Stay',
    pay_parknyc: 'Pay on ParkNYC',
    report_sign: 'Report Sign Inaccuracy',
    close: 'Close',
    north_curb: 'North Curb',
    south_curb: 'South Curb',
    east_curb: 'East Curb',
    west_curb: 'West Curb',
    both_sides: 'Both Sides',
    park_until_badge: 'Legal until',
    zone: 'Zone',
    copied: 'Copied!',

    about_title: 'About & FAQ',
    disclaimer_agree: 'I Understand & Agree',
  },

  es: {
    search_placeholder: 'Buscar calle, cruce o dirección...',
    searching: 'Buscando...',
    passenger: 'Particular',
    commercial: 'Comercial',
    filter_all: 'Todas',
    filter_free: 'Gratis Ahora',
    filter_meter: 'Parquímetro',
    filter_soon: 'Pronto (<60m)',
    filter_restricted: 'No Estacionar',
    tip_btn: 'Propina ☕',
    feedback_btn: 'Comentarios',
    faq_btn: 'Reglas y FAQ',
    jump_to: 'Ir a:',
    one_block_zoom: 'Zoom de 1 Cuadra',
    matching_curbs: 'Aceras Encontradas',
    park_until: 'Estacionar hasta',
    language: 'Idioma',

    simulate: 'Simular',
    hide: 'Ocultar',
    now: 'Ahora',
    realtime_feed: '🔴 En Vivo en Tiempo Real',
    simulated_time: '⏱️ Tiempo Simulado Personalizado',
    asp_suspended: 'ASP Suspendido',
    no_sweeping: 'Sin Limpieza',
    prev_day: '-1 Día',
    next_day: '+1 Día',

    free_parking: 'Estacionamiento Gratuito',
    metered_parking: 'Zona de Parquímetro',
    prohibited_parking: 'Estacionamiento Prohibido',
    status_changing_soon: 'Cambio de Estado Pronto',
    active_regulation: 'Regulación Activa',
    upcoming_rules: 'Próximas Reglas',
    rates_and_limits: 'Tarifas y Tiempo Máximo',
    pay_parknyc: 'Pagar en ParkNYC',
    report_sign: 'Reportar Error de Señal',
    close: 'Cerrar',
    north_curb: 'Acera Norte',
    south_curb: 'Acera Sur',
    east_curb: 'Acera Este',
    west_curb: 'Acera Oeste',
    both_sides: 'Ambos Lados',
    park_until_badge: 'Legal hasta',
    zone: 'Zona',
    copied: '¡Copiado!',

    about_title: 'Acerca de y Preguntas',
    disclaimer_agree: 'Entendido y De Acuerdo',
  },

  zh: {
    search_placeholder: '搜索街道、交叉路口或地址...',
    searching: '正在搜索...',
    passenger: '乘用车',
    commercial: '商用车',
    filter_all: '所有路段',
    filter_free: '当前免费',
    filter_meter: '收费咪表',
    filter_soon: '即将变更 (<60分)',
    filter_restricted: '禁止停车',
    tip_btn: '打赏 ☕',
    feedback_btn: '反馈意见',
    faq_btn: '常见问题与规则',
    jump_to: '快速定位:',
    one_block_zoom: '街区特写',
    matching_curbs: '匹配的路段',
    park_until: '可停放至',
    language: '语言',

    simulate: '时间模拟',
    hide: '收起',
    now: '现在',
    realtime_feed: '🔴 实时动态更新',
    simulated_time: '⏱️ 自定义模拟时间',
    asp_suspended: '扫街禁令暂停 (ASP)',
    no_sweeping: '无需移车',
    prev_day: '-1 天',
    next_day: '+1 天',

    free_parking: '免费停车',
    metered_parking: 'Muni-Meter 咪表车位',
    prohibited_parking: '禁止停放',
    status_changing_soon: '状态即将变更',
    active_regulation: '当前执行规则',
    upcoming_rules: '后续时段规则',
    rates_and_limits: '收费标准与时限',
    pay_parknyc: '在 ParkNYC 支付',
    report_sign: '纠错/报告标志不符',
    close: '关闭',
    north_curb: '北侧路缘',
    south_curb: '南侧路缘',
    east_curb: '东侧路缘',
    west_curb: '西侧路缘',
    both_sides: '双侧路缘',
    park_until_badge: '合法停放至',
    zone: '区域编号',
    copied: '已复制!',

    about_title: '关于与常见问题',
    disclaimer_agree: '我已了解并同意',
  },
};

export type TranslationKey = keyof TranslationDictionary;
