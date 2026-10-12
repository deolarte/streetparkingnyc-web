import type { SupportedLocale } from './config';

export interface AboutContent {
  subtitle: string;
  disclaimer: {
    title: string;
    p1: string;
    p2: string;
  };
  legendTitle: string;
  legend: {
    freeTitle: string;
    freeDesc: string;
    meterTitle: string;
    meterDesc: string;
    soonTitle: string;
    soonDesc: string;
    restrictedTitle: string;
    restrictedDesc: string;
  };
  simulationTitle: string;
  simulationSteps: {
    title: string;
    desc: string;
  }[];
  sourcesTitle: string;
  sources: {
    title: string;
    desc: string;
  }[];
  faqTitle: string;
  faqs: {
    q: string;
    a: string;
  }[];
  pwaTitle: string;
  pwaSubtitle: string;
  pwaIosTitle: string;
  pwaIosSteps: string[];
  pwaAndroidTitle: string;
  pwaAndroidSteps: string[];
  privacyTitle: string;
  privacy: {
    piiTitle: string;
    piiDesc: string;
    gpsTitle: string;
    gpsDesc: string;
    adsTitle: string;
    adsDesc: string;
  };
}

export const aboutContent: Record<SupportedLocale, AboutContent> = {
  en: {
    subtitle: 'Map legend, time simulation & legal disclaimers',
    disclaimer: {
      title: 'Legal Disclaimer & Driver Responsibility',
      p1: 'StreetPark is an independent civic utility and is NOT affiliated with, sponsored by, or endorsed by the City of New York or the NYC Department of Transportation (NYC DOT).',
      p2: 'Physical street signs posted on the block, temporary construction placards, film shoot restrictions, emergency tow-away orders, and police instructions always supersede any digital information. The driver remains solely responsible for parking compliance. StreetPark and its operators assume no legal liability for parking summonses, fines, or towing fees.',
    },
    legendTitle: 'Map Color Legend',
    legend: {
      freeTitle: 'Free (Green)',
      freeDesc: 'Legal free parking permitted. No active street cleaning or meter fees in effect. Outside posted restriction windows, NYC residential curbs are free and unlimited.',
      meterTitle: 'Meter (Blue)',
      meterDesc: 'Active NYC Muni-Meter zone. Pay-by-cell required via official ParkNYC app or kiosk. Subject to posted maximum stay limits (1–3 hours). Free outside operating hours!',
      soonTitle: 'Soon (<60Min) (Amber)',
      soonDesc: 'Status change in <60 minutes! Spots opening up soon (sweeping/meters ending shortly), or active legal parking expiring soon as restrictions begin.',
      restrictedTitle: 'No Parking (Red)',
      restrictedDesc: 'Parking prohibited. Active Alternate Side street sweeping (ASP), No Standing Anytime, or commercial truck loading only. Violators are ticketed and towed.',
    },
    simulationTitle: 'How Time Simulation Works',
    simulationSteps: [
      {
        title: 'Tap "Simulate"',
        desc: 'Expands the interactive time control dial at the bottom of the screen.',
      },
      {
        title: 'Slide Across 24 Hours',
        desc: 'Drag the time slider to test rules at any hour of the day or night (e.g., test what curbs become legal at 7:00 PM tonight or 8:30 AM tomorrow).',
      },
      {
        title: 'Day Selector',
        desc: 'Use -1 Day / +1 Day to plan weekend parking or check street sweeping for upcoming days.',
      },
      {
        title: 'Return to Live Feed',
        desc: 'Tap "Now" anytime to instantly snap back to real-time clock synchronization.',
      },
    ],
    sourcesTitle: 'Official NYC Data Sources & Attribution',
    sources: [
      {
        title: 'NYC Open Data (NYC DOT GIS)',
        desc: 'Parking sign regulations, curb order numbers, coordinates, and Muni-Meter pay-by-cell zones via official NYC Socrata datasets.',
      },
      {
        title: 'NYC 311 Daily Service Feeds',
        desc: 'Real-time Alternate Side Parking (ASP) suspension notices and official holiday calendars.',
      },
      {
        title: 'Basemap Data',
        desc: 'Vector streets and geometry provided © Esri, HERE, Garmin, and OpenStreetMap contributors.',
      },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqs: [
      {
        q: 'Is parking free on Sundays in NYC?',
        a: 'Yes! According to NYC DOT traffic rules, parking meters are not in effect on Sundays throughout all five boroughs unless a posted sign explicitly states Sunday meter hours.',
      },
      {
        q: 'What is Alternate Side Parking (ASP)?',
        a: 'Alternate Side Parking regulations require drivers to vacate curbs for 90 minutes to allow NYC Department of Sanitation street sweepers to clean. Violators are subject to a $65 summons.',
      },
      {
        q: 'What is the difference between Major and Minor Holidays?',
        a: "On Major Legal Holidays (New Year's Day, Memorial Day, July 4th, Labor Day, Thanksgiving, Christmas), both ASP and parking meters are suspended. On Minor Religious/Civic Holidays (Columbus Day, MLK Day, Presidents' Day, etc.), only ASP is suspended while parking meters remain in full effect.",
      },
      {
        q: 'How does Commercial mode work?',
        a: 'Toggling the "Commercial" switch evaluates curbs from the perspective of commercial delivery trucks, displaying dedicated commercial loading meters and zones where passenger vehicles are prohibited.',
      },
    ],
    pwaTitle: 'Save to Home Screen (Mobile App Mode)',
    pwaSubtitle: 'Install StreetPark directly onto your smartphone home screen for a fast, full-screen native app experience without browser URL bars:',
    pwaIosTitle: 'iPhone & iPad (Safari)',
    pwaIosSteps: [
      'Open park.djtechnyc.com in Safari.',
      'Tap the Share button (square icon with an arrow pointing up at the bottom).',
      'Scroll down and select "Add to Home Screen".',
      'Tap "Add" in the top-right corner.',
    ],
    pwaAndroidTitle: 'Android (Chrome & Samsung Internet)',
    pwaAndroidSteps: [
      'Open park.djtechnyc.com in Chrome.',
      'Tap the three vertical dots (⋮) menu in the upper-right corner.',
      'Tap "Add to Home screen" (or "Install app").',
      'Confirm by tapping "Install" or "Add".',
    ],
    privacyTitle: 'Privacy Policy & Cookie Disclosures',
    privacy: {
      piiTitle: 'Zero PII (Personally Identifiable Information) Collection:',
      piiDesc: 'StreetPark does not require account registration, logins, passwords, or emails to use the map. We do not collect, buy, or sell any personal identifying information.',
      gpsTitle: 'Device Location (GPS):',
      gpsDesc: 'When you tap the "Near Me" GPS button, your coordinates are processed strictly client-side on your device to center the map. Your location is never logged, stored, or transmitted to any server.',
      adsTitle: 'Advertising & Cookies (Google AdSense):',
      adsDesc: 'We use Google AdSense to serve advertisements that support server hosting costs. Third-party vendors, including Google, use cookies to serve ads based on prior visits to this website or other sites across the Internet.',
    },
  },

  es: {
    subtitle: 'Leyenda del mapa, simulación horaria y descargos de responsabilidad legal',
    disclaimer: {
      title: 'Aviso Legal y Responsabilidad del Conductor',
      p1: 'StreetPark es una herramienta cívica independiente y NO está afiliada, patrocinada ni respaldada por la Ciudad de Nueva York ni por el Departamento de Transporte de NYC (NYC DOT).',
      p2: 'Las señales físicas colocadas en la cuadra, carteles temporales de construcción, restricciones de filmación, órdenes de grúa y las indicaciones policiales SIEMPRE prevalecen sobre cualquier información digital. El conductor es el único responsable del cumplimiento de las normas. StreetPark no asume responsabilidad alguna por multas o costos de grúa.',
    },
    legendTitle: 'Leyenda de Colores del Mapa',
    legend: {
      freeTitle: 'Gratis (Verde)',
      freeDesc: 'Estacionamiento legal permitido sin costo. Sin limpieza de calles ni parquímetros activos en este momento. Fuera de horarios restringidos, el estacionamiento residencial es libre e ilimitado.',
      meterTitle: 'Parquímetro (Azul)',
      meterDesc: 'Zona de parquímetro NYC Muni-Meter activa. Pago por teléfono mediante la app oficial ParkNYC o en kiosco. Sujeto al tiempo máximo indicado (1–3 horas). ¡Gratis fuera del horario comercial!',
      soonTitle: 'Pronto (<60Min) (Ámbar)',
      soonDesc: '¡Cambio de estado en menos de 60 minutos! Lugares que se liberarán pronto (finaliza barrido o parquímetro) o estacionamiento legal que está por vencer al iniciar restricciones.',
      restrictedTitle: 'No Estacionar (Rojo)',
      restrictedDesc: 'Estacionamiento prohibido. Barrido de calles Alternate Side (ASP) en curso, No Detenerse (No Standing) o carga exclusiva de camiones comerciales. Los infractores son multados y remolcados.',
    },
    simulationTitle: 'Cómo Funciona la Simulación de Horario',
    simulationSteps: [
      {
        title: 'Toca "Simular"',
        desc: 'Despliega el control interactivo de tiempo en la parte inferior de la pantalla.',
      },
      {
        title: 'Desliza a lo largo de 24 horas',
        desc: 'Mueve el control deslizante para verificar las reglas a cualquier hora (por ejemplo, ver qué cuadras se liberan a las 7:00 PM hoy o a las 8:30 AM mañana).',
      },
      {
        title: 'Selector de Días',
        desc: 'Usa -1 Día / +1 Día para planificar el estacionamiento del fin de semana o verificar el barrido de calles de los próximos días.',
      },
      {
        title: 'Volver a Tiempo Real',
        desc: 'Toca "Ahora" en cualquier momento para sincronizarte instantáneamente con el reloj en vivo.',
      },
    ],
    sourcesTitle: 'Fuentes Oficiales de Datos de NYC y Atribución',
    sources: [
      {
        title: 'NYC Open Data (NYC DOT GIS)',
        desc: 'Regulaciones de señales, códigos de cuadras, coordenadas y zonas de pago Muni-Meter mediante conjuntos de datos oficiales de Socrata.',
      },
      {
        title: 'Servicios Diarios de NYC 311',
        desc: 'Avisos en tiempo real sobre suspensión del barrido Alternate Side (ASP) y calendario de feriados oficiales.',
      },
      {
        title: 'Datos del Mapa Base',
        desc: 'Geometría y calles vectoriales provistas por © Esri, HERE, Garmin y colaboradores de OpenStreetMap.',
      },
    ],
    faqTitle: 'Preguntas Frecuentes',
    faqs: [
      {
        q: '¿El estacionamiento es gratuito los domingos en NYC?',
        a: '¡Sí! Según las normas del NYC DOT, los parquímetros no están vigentes los domingos en los cinco condados, a menos que un cartel específico indique horas de parquímetro en domingo.',
      },
      {
        q: '¿Qué es Alternate Side Parking (ASP)?',
        a: 'Son reglas que obligan a mover los vehículos durante 90 minutos para permitir el paso de las barredoras mecánicas de basura (DSNY). Infringir esta norma conlleva una multa de $65.',
      },
      {
        q: '¿Cuál es la diferencia entre Feriados Mayores y Menores?',
        a: 'En Feriados Mayores (Año Nuevo, Memorial Day, 4 de Julio, Labor Day, Acción de Gracias, Navidad), se suspenden TANTO el barrido ASP como los parquímetros. En Feriados Menores cívicos/religiosos (Columbus Day, MLK, Presidents Day), SOLO se suspende el barrido ASP mientras que los parquímetros siguen vigentes.',
      },
      {
        q: '¿Cómo funciona el modo Comercial?',
        a: 'Al activar el selector "Comercial", las cuadras se evalúan desde la perspectiva de camiones de reparto y carga, mostrando zonas y parquímetros exclusivos para vehículos comerciales.',
      },
    ],
    pwaTitle: 'Guardar en la Pantalla de Inicio (Modo App)',
    pwaSubtitle: 'Instala StreetPark directamente en la pantalla de inicio de tu smartphone para una experiencia rápida a pantalla completa sin barras de navegador:',
    pwaIosTitle: 'iPhone e iPad (Safari)',
    pwaIosSteps: [
      'Abre park.djtechnyc.com en Safari.',
      'Toca el botón Compartir (el cuadrado con la flecha hacia arriba en la parte inferior).',
      'Desplázate hacia abajo y selecciona "Agregar al inicio" (Add to Home Screen).',
      'Toca "Agregar" en la esquina superior derecha.',
    ],
    pwaAndroidTitle: 'Android (Chrome y Samsung Internet)',
    pwaAndroidSteps: [
      'Abre park.djtechnyc.com en Chrome.',
      'Toca el menú de tres puntos verticales (⋮) en la esquina superior derecha.',
      'Toca "Agregar a la pantalla principal" (o "Instalar aplicación").',
      'Confirma tocando "Instalar" o "Agregar".',
    ],
    privacyTitle: 'Política de Privacidad y Divulgación de Cookies',
    privacy: {
      piiTitle: 'Cero Recopilación de Datos Personales (PII):',
      piiDesc: 'StreetPark no requiere registro de cuentas, contraseñas ni correos para usar el mapa. No recopilamos, compramos ni vendemos datos personales identificables.',
      gpsTitle: 'Ubicación del Dispositivo (GPS):',
      gpsDesc: 'Cuando tocas el botón GPS, tus coordenadas se procesan exclusivamente en tu propio dispositivo para centrar el mapa. Tu ubicación nunca se almacena ni se envía a ningún servidor.',
      adsTitle: 'Publicidad y Cookies (Google AdSense):',
      adsDesc: 'Utilizamos Google AdSense para costear los servidores de alojamiento. Proveedores externos, incluido Google, utilizan cookies para publicar anuncios basados en visitas anteriores a este u otros sitios web.',
    },
  },

  zh: {
    subtitle: '地图图例、时间模拟功能及法律免责声明',
    disclaimer: {
      title: '法律免责声明与驾驶员责任',
      p1: 'StreetPark 是一项独立的民间公共服务工具，与纽约市政府或纽约市交通局 (NYC DOT) 无任何附属、赞助或认可关系。',
      p2: '街区现场竖立的物理交通标志、临时施工通告、电影拍摄禁令、紧急拖车通告以及现场警务人员指示，均绝对优先于任何数字化数据。驾驶员对其停车行为及合规性承担全部责任。StreetPark 及其运营者对因停车引发的传票罚单、罚款或拖车费用概不承担任何法律责任。',
    },
    legendTitle: '地图颜色图例说明',
    legend: {
      freeTitle: '免费停车 (绿色)',
      freeDesc: '允许合法免费停放。当前时段无扫街禁令，亦无需支付咪表费用。在所公布的特定禁停时段之外，纽约市住宅街道停车均为免费且不受时间限制。',
      meterTitle: '咪表车位 (蓝色)',
      meterDesc: 'Muni-Meter 咪表收费时段生效中。需使用官方 ParkNYC 手机应用程序或街边缴费机付款。请遵守公布的最长停放时限 (1至3小时)。非营业时段完全免费！',
      soonTitle: '即将变更 (<60分钟) (琥珀黄)',
      soonDesc: '60分钟内状态即将改变！车位即将空出 (扫街或咪表即将结束)，或当前合法停车即将因禁停规则生效而到期，请留意移车。',
      restrictedTitle: '禁止停车 (红色)',
      restrictedDesc: '严禁停车。当前正处于扫街禁令 (ASP)、全时段禁止停车 (No Standing Anytime) 或仅限商业货车装卸时段。违规停放将被开具 $65 罚单并可能被拖车。',
    },
    simulationTitle: '时间模拟功能如何使用',
    simulationSteps: [
      {
        title: '点击“时间模拟”',
        desc: '展开屏幕底部的时间控制刻度盘。',
      },
      {
        title: '横跨 24 小时拖动',
        desc: '拖动时间滑块可查看一天中任意小时的规则（例如测试今晚 7:00 PM 或明天早晨 8:30 AM 哪些街道可以合法停车）。',
      },
      {
        title: '日期切换按钮',
        desc: '使用“-1 天”或“+1 天”规划周末行程，或预先检查未来几天的扫街安排。',
      },
      {
        title: '返回实时动态',
        desc: '随时点击“现在”即可瞬间恢复至与当前设备时钟同步的实时状态。',
      },
    ],
    sourcesTitle: '纽约官方数据来源与版权归属',
    sources: [
      {
        title: '纽约开放数据 (NYC Open Data / NYC DOT GIS)',
        desc: '街道路牌标志、路缘顺序、坐标及 Muni-Meter 手机收费编号均源自纽约市官方 Socrata 数据集。',
      },
      {
        title: 'NYC 311 每日服务通告',
        desc: '实时扫街移车禁令（ASP）暂停通知及官方节假日日历。',
      },
      {
        title: '底图地理数据',
        desc: '矢量街道与地理底图由 © Esri、HERE、Garmin 及 OpenStreetMap 贡献者提供。',
      },
    ],
    faqTitle: '常见问题解答 (FAQ)',
    faqs: [
      {
        q: '纽约市周日停车免费吗？',
        a: '是的！根据 NYC DOT 交通法规，除个别路段明确竖立有注明“周日收费”的特殊标志外，纽约市五大区所有咪表在周日均不生效，周日可全天免费停车。',
      },
      {
        q: '什么是扫街移车禁令 (Alternate Side Parking / ASP)？',
        a: 'ASP 规则要求车主在规定的 90 分钟内将车辆移走，以便纽约市环卫局 (DSNY) 的清扫车清洗路面。违规未移车者将被处以 $65 美元罚款。',
      },
      {
        q: '主要法定节假日与次要节假日有何区别？',
        a: '在主要法定节假日（元旦、阵亡将士纪念日、独立日、劳动节、感恩节、圣诞节），ASP 扫街禁令与咪表收费同时暂停。在次要宗教与公民节假日（哥伦布日、马丁路德金纪念日、总统日等），仅暂停 ASP 扫街，咪表收费仍然正常生效。',
      },
      {
        q: '商用车 (Commercial) 模式如何工作？',
        a: '切换至“商用车”模式后，系统将以商业配送货车的视角评估街道规则，重点高亮专属货车装卸货区域及私家乘用车禁停的装卸咪表。',
      },
    ],
    pwaTitle: '保存至手机主屏幕 (独立原生 App 模式)',
    pwaSubtitle: '将 StreetPark 直接添加到智能手机主屏幕，享受全屏原生 App 体验，无浏览器网址栏干扰：',
    pwaIosTitle: '苹果 iPhone 与 iPad (Safari 浏览器)',
    pwaIosSteps: [
      '在 Safari 中打开 park.djtechnyc.com。',
      '点击底部中央的“分享”按钮（带有向上箭头的正方形图标）。',
      '向下滑动并选择“添加到主屏幕” (Add to Home Screen)。',
      '点击右上角的“添加”即可完成！',
    ],
    pwaAndroidTitle: '安卓系统 (Chrome 或三星浏览器)',
    pwaAndroidSteps: [
      '在 Chrome 浏览器中打开 park.djtechnyc.com。',
      '点击右上角的“三个竖点”菜单 (⋮)。',
      '点击“添加到主屏幕”或“安装应用”。',
      '确认点击“安装”或“添加”即可。',
    ],
    privacyTitle: '隐私政策与 Cookie 声明',
    privacy: {
      piiTitle: '零个人身份信息收集 (Zero PII)：',
      piiDesc: 'StreetPark 无需注册账户、登录密码或邮箱即可完整使用地图。我们绝不收集、购买或出售任何个人身份信息。',
      gpsTitle: '设备地理位置 (GPS)：',
      gpsDesc: '当您点击“定位”按钮时，您的经纬度坐标完全仅在您的手机本地用于移动地图中心。您的位置绝不会被记录、储存或传输至任何服务器。',
      adsTitle: '广告展示与 Cookie 说明 (Google AdSense)：',
      adsDesc: '我们通过 Google AdSense 展示广告以支付地图云服务器的运营成本。包括 Google 在内的第三方合作伙伴会使用 Cookie 根据用户此前对本网站或其他网站的访问记录展示广告。',
    },
  },
};
