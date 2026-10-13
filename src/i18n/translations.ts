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
  tip_btn_full: string;
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

  // BottomSheet Additional Labels
  between_label: string;
  and_label: string;
  can_park_until: string;
  when_you_can_park: string;
  outside_restrictions_note: string;
  active_restriction_ends_at: string;
  nyc_311_title: string;
  nyc_311_subtitle: string;
  nyc_311_default_advice: string;
  official_signs_title: string;
  arrow_label: string;
  operational_hours: string;
  max_duration: string;
  parking_rates: string;

  // Buy Me A Coffee (TipModal)
  tip_modal_title: string;
  tip_modal_desc: string;
  tip_tier1_label: string;
  tip_tier1_desc: string;
  tip_tier2_label: string;
  tip_tier2_desc: string;
  tip_tier3_label: string;
  tip_tier3_desc: string;
  tip_tier4_label: string;
  tip_tier4_desc: string;
  tip_modal_action: string;
  tip_modal_footer_secure: string;
  tip_modal_footer_built_by: string;

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
    tip_btn: '☕ Tip Jar',
    tip_btn_full: '☕ Tip Jar',
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

    between_label: 'Between',
    and_label: '&',
    can_park_until: 'Can Park Until',
    when_you_can_park: 'When You Can Park',
    outside_restrictions_note: 'Outside scheduled restrictions, NYC residential parking is free & unlimited.',
    active_restriction_ends_at: 'Active restriction ends at',
    nyc_311_title: 'NYC 311 City Status & Weather',
    nyc_311_subtitle: 'NYC 311 Daily Service Updates',
    nyc_311_default_advice: 'During major snowstorms, DSNY suspends Alternate Side Parking for plowing operations. Parking meters generally remain in effect.',
    official_signs_title: 'Official NYC DOT Posted Signs',
    arrow_label: 'Arrow:',
    operational_hours: 'Operational Hours',
    max_duration: 'Max Duration',
    parking_rates: 'Parking Rates',

    tip_modal_title: 'Buy Me a Coffee',
    tip_modal_desc: 'If StreetPark saved you from an expensive $65 Alternate Side sweeping ticket or tow-away, consider supporting server costs!',
    tip_tier1_label: '☕ 1 Coffee',
    tip_tier1_desc: 'Espresso fuel for live map servers',
    tip_tier2_label: '🍕 NYC Slice Combo',
    tip_tier2_desc: 'Classic slice & soda combo',
    tip_tier3_label: '🚇 Avoided $65 Ticket',
    tip_tier3_desc: 'Saved from an Alternate Side ticket',
    tip_tier4_label: '⛽ Super Supporter',
    tip_tier4_desc: 'Keeps NYC curb intelligence free',
    tip_modal_action: 'Tip via Apple Pay / Card',
    tip_modal_footer_secure: 'Official Buy Me a Coffee • Supports  Apple Pay & Cards',
    tip_modal_footer_built_by: 'Built by a local NYC driver for NYC drivers',

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
    tip_btn: '☕ Propinas',
    tip_btn_full: '☕ Tarro de Propinas',
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

    between_label: 'Entre',
    and_label: 'y',
    can_park_until: 'Puede Estacionar Hasta',
    when_you_can_park: 'Cuándo Puede Estacionar',
    outside_restrictions_note: 'Fuera de las restricciones programadas, el estacionamiento residencial en NYC es gratuito e ilimitado.',
    active_restriction_ends_at: 'La restricción activa termina a las',
    nyc_311_title: 'Estado de la Ciudad y Clima (NYC 311)',
    nyc_311_subtitle: 'Actualizaciones de Servicio NYC 311',
    nyc_311_default_advice: 'Durante tormentas de nieve, DSNY suspende el barrido (ASP) para operaciones de limpieza. Los parquímetros generalmente siguen vigentes.',
    official_signs_title: 'Señales Oficiales del NYC DOT',
    arrow_label: 'Flecha:',
    operational_hours: 'Horario Operativo',
    max_duration: 'Tiempo Máximo',
    parking_rates: 'Tarifas de Estacionamiento',

    tip_modal_title: 'Cómprame un Café',
    tip_modal_desc: '¡Si StreetPark te ahorró una costosa multa de $65 de barrido de calles o remolque, apoya los costos del servidor!',
    tip_tier1_label: '☕ 1 Café',
    tip_tier1_desc: 'Combustible espresso para los servidores del mapa',
    tip_tier2_label: '🍕 Combo de Pizza de NYC',
    tip_tier2_desc: 'Clásico combo de porción de pizza y refresco',
    tip_tier3_label: '🚇 Multa de $65 Evitada',
    tip_tier3_desc: 'Ahorro de una multa de Alternate Side',
    tip_tier4_label: '⛽ Súper Patrocinador',
    tip_tier4_desc: 'Mantiene libre e inteligente el mapa de NYC',
    tip_modal_action: 'Dar propina con Apple Pay / Tarjeta',
    tip_modal_footer_secure: 'Buy Me a Coffee Oficial • Admite  Apple Pay y Tarjetas',
    tip_modal_footer_built_by: 'Creado por un conductor local de NYC para conductores de NYC',

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
    tip_btn: '☕ 打赏',
    tip_btn_full: '☕ 打赏箱 (Tip Jar)',
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

    between_label: '位于',
    and_label: '与',
    can_park_until: '可停放至',
    when_you_can_park: '何时可停放',
    outside_restrictions_note: '在公布的禁停时段之外，纽约市住宅街道停车完全免费且无时限。',
    active_restriction_ends_at: '当前禁令结束时间为',
    nyc_311_title: '纽约市 311 城市动态与天气',
    nyc_311_subtitle: 'NYC 311 每日服务通知',
    nyc_311_default_advice: '在大雪灾暴天气中，卫生局会暂停扫街移车禁令（ASP）以进行铲雪，咪表通常照常运作。',
    official_signs_title: 'NYC DOT 官方路牌标志',
    arrow_label: '指示箭头:',
    operational_hours: '收费运作时段',
    max_duration: '最长停放时间',
    parking_rates: '停车收费标准',

    tip_modal_title: '请开发者喝杯咖啡',
    tip_modal_desc: '如果 StreetPark 帮您避免了一张昂贵的 $65 扫街罚单或拖车损失，欢迎赞助支持服务器运营！',
    tip_tier1_label: '☕ 1 杯浓缩咖啡',
    tip_tier1_desc: '为实时地图服务器提供动力',
    tip_tier2_label: '🍕 纽约经典披萨套餐',
    tip_tier2_desc: '经典的纽约披萨和汽水组合',
    tip_tier3_label: '🚇 避开 $65 罚单',
    tip_tier3_desc: '成功省下一张扫街违规罚单',
    tip_tier4_label: '⛽ 超级支持者',
    tip_tier4_desc: '让纽约路边智能停车数据永久保持免费',
    tip_modal_action: '通过 Apple Pay / 银行卡打赏',
    tip_modal_footer_secure: '官方 Buy Me a Coffee • 支持  Apple Pay 及国际信用卡',
    tip_modal_footer_built_by: '由纽约本地车主打造，服务纽约全体司机',

    about_title: '关于与常见问题',
    disclaimer_agree: '我已了解并同意',
  },
};

export type TranslationKey = keyof TranslationDictionary;
