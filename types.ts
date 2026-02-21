
export interface Translations {
  home: string;
  squad: string;
  tiktok: string;
  telegram: string;
  youtube: string;
  liveArena: string;
  establishingLink: string;
  connectingTo: string;
  ultraHdStream: string;
  exclusiveBroadcast: string;
  chooseLanguage: string;
  premiumAccess: string;
  ultimateExperience: string;
  aboutUs: string;
  aboutSite: string;
  contacts: string;
  privacyPolicy: string;
  aboutUsContent: string;
  aboutSiteContent: string;
  contactsContent: string;
  privacyPolicyContent: string;
  close: string;
  goals: string;
  assists: string;
  appearances: string;
  cleanSheets: string;
  position: string;
  nationality: string;
  settings: string;
  colorScheme: string;
  background: string;
  favPlayer: string;
  language: string;
  matchSchedule: string;
  livePerformance: string;
  broadcastDescription: string;
  windowTransparency: string;
  copyright: string;
  anthem: string;
  clearCache: string;
  resetConfirm: string;
  brightMoments: string;
  uclBracket: string;
  possession: string;
  shots: string;
  shotsOnTarget: string;
  passing: string;
  fouls: string;
  corners: string;
  expectedGoals: string;
  matchStats: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  streamUrl: string;
  translations: Translations;
  isSpecial?: boolean;
}

export const LANGUAGES: Language[] = [
  { 
    code: 'en', 
    name: 'English', 
    nativeName: 'English',
    streamUrl: '',
    translations: {
      home: 'Home',
      squad: 'Team Squad',
      tiktok: 'TikTok',
      telegram: 'Telegram',
      youtube: 'YouTube',
      liveArena: 'Live Arena',
      establishingLink: 'Establishing link...',
      connectingTo: 'Connecting to English broadcast...',
      ultraHdStream: 'Ultra HD Stream • English',
      exclusiveBroadcast: 'Exclusive English broadcast',
      chooseLanguage: 'Welcome to Walkers Madrid. Choose your language:',
      premiumAccess: 'Premium Access',
      ultimateExperience: 'The ultimate sports experience',
      aboutUs: 'About Us',
      aboutSite: 'About Site',
      contacts: 'Contacts',
      privacyPolicy: 'Privacy Policy',
      close: 'Close',
      goals: 'Goals',
      assists: 'Assists',
      appearances: 'Apps',
      cleanSheets: 'Clean Sheets',
      position: 'Position',
      nationality: 'Nationality',
      settings: 'Settings',
      colorScheme: 'Color Scheme',
      background: 'Background',
      favPlayer: 'Fav Player',
      language: 'Language',
      matchSchedule: 'Match Schedule',
      livePerformance: 'Live Performance',
      broadcastDescription: 'Experience the match in highest fidelity with localized commentary.',
      windowTransparency: 'Interface Transparency',
      aboutUsContent: '• Our mission is to unite Madridistas from every corner of the globe within a single premier digital sanctuary.\n• Walkers Madrid offers more than just streams; it provides a comprehensive matchday atmosphere with deep analytics and live player performance data.\n• We are an independent, fan-led project driven purely by passion for the "Royal Club" rather than commercial gain.\n• Every update to this platform is inspired by community feedback, ensuring we maintain the highest standards of quality and loyalty to the club heritage.\n\nHala Madrid i nada mas',
      aboutSiteContent: '• Walkers Madrid is an interactive fan platform built to unite Madridistas globally.\n• Purpose: The site is intended for a premium match-day experience, offering high-quality Ultra HD streams and integrated live statistics.\n• Sources: Broadcast links are aggregated from open legal sources and official club mirror servers to ensure maximum stability and availability.\n• Tech: Developed using modern web standards (React/Tailwind) to provide a seamless, lightweight, and secure viewing sanctuary.\n\nHala Madrid i nada mas',
      contactsContent: 'Contact us via social media:\n\n📸 Instagram: @abul_walker\n🎬 YouTube: @abulwalker\n🎵 TikTok: @abul_wa7ker',
      privacyPolicyContent: '• We operate on the principle of data minimization: the site functions perfectly without registration, accounts, or collection of personal data.\n• Your preferences (color scheme, background, volume, favorite player) are stored exclusively in your browser\'s local storage.\n• We do not use third-party advertising trackers or sell information about your browsing habits to external entities.\n• Security First: All data streams are encrypted, and clearing your browser cache instantly removes all site-related data from your device.\n\nHala Madrid i nada mas',
      copyright: '© 2026 Or1G1nal. All rights reserved.',
      anthem: 'Real Madrid Anthem',
      clearCache: 'Reset Settings',
      resetConfirm: 'Are you sure?',
      brightMoments: 'Bright Moments',
      uclBracket: 'Champions League Bracket',
      possession: 'Possession',
      shots: 'Total Shots',
      shotsOnTarget: 'Shots on Target',
      passing: 'Passing Accuracy',
      fouls: 'Fouls',
      corners: 'Corners',
      expectedGoals: 'Expected Goals (xG)',
      matchStats: 'Match Statistics'
    }
  },
  { 
    code: 'ru', 
    name: 'Russian', 
    nativeName: 'Русский',
    streamUrl: '',
    translations: {
      home: 'Главная',
      squad: 'Состав команды',
      tiktok: 'Тик ток',
      telegram: 'Телеграм',
      youtube: 'Youtube',
      liveArena: 'Прямой Эфир',
      establishingLink: 'Установка соединения...',
      connectingTo: 'Подключение к трансляции на русском...',
      ultraHdStream: 'Ultra HD Поток • Русский',
      exclusiveBroadcast: 'Эксклюзивная трансляция на русском языке',
      chooseLanguage: 'Добро пожаловать в Walkers Madrid. Выберите ваш язык:',
      premiumAccess: 'Премиум Доступ',
      ultimateExperience: 'Лучший опыт просмотра спорта',
      aboutUs: 'О нас',
      aboutSite: 'О сайте',
      contacts: 'Contacts',
      privacyPolicy: 'Политика конфиденциальности',
      close: 'Закрыть',
      goals: 'Голы',
      assists: 'Пасы',
      appearances: 'Матчи',
      cleanSheets: 'Сухие матчи',
      position: 'Позиция',
      nationality: 'Национальность',
      settings: 'Настройки',
      colorScheme: 'Цветовая гамма',
      background: 'Фон',
      favPlayer: 'Любимый игрок',
      language: 'Язык сайта',
      matchSchedule: 'Расписание матчей',
      livePerformance: 'Текущая форма',
      broadcastDescription: 'Наслаждайтесь матчем в высочайшем качестве с локализованными комментариями.',
      windowTransparency: 'Прозрачность интерфейса',
      aboutUsContent: '• Наша миссия — объединить мадридистов со всех уголков планеты в едином цифровом пространстве.\n• Walkers Madrid — это не просто трансляции, это полноценная атмосфера игрового дня с глубокой аналитикой и живой статистикой.\n• Мы являемся независимым фанатским проектом, движимым исключительно страстью к «королевскому клубу», а не коммерческой выгодой.\n• Каждое обновление сайта вдохновлено отзывами нашего сообщества, чтобы соответствовать самым высоким стандартам качества и верности наследию.\n\nHala Madrid i nada mas',
      aboutSiteContent: '• Walkers Madrid — это интерактивная платформа, созданная для объединения болельщиков клуба по всему миру.\n• Предназначение: Сайт предназначен для комфортного просмотра матчей в высоком качестве (Ultra HD) с доступом к актуальной статистике в реальном времени.\n• Источники: Ссылки на трансляции собираются из открытых легальных источников и официальных зеркальных серверов клуба для обеспечения стабильного доступа.\n• Технологии: Мы используем современные архитектуры на базе React и Tailwind CSS для создания максимально быстрого и легкого интерфейса.\n\nHala Madrid i nada mas',
      contactsContent: 'Связаться с нами можно через социальные сети:\n\n📸 Instagram: @abul_walker\n🎬 YouTube: @abulwalker\n🎵 TikTok: @abul_wa7ker',
      privacyPolicyContent: '• Мы придерживаемся принципа минимизации данных: сайт работает без регистрации, паролей и сбора личной информации.\n• Ваши предпочтения (цветовая схема, громкость, любимый игрок) хранятся исключительно в локальном хранилище вашего браузера.\n• Мы не используем сторонние рекламные трекеры и не передаем данные о ваших действиях третьим лицам.\n• Безопасность: Потоки данных защищены шифрованием, а очистка кэша браузера мгновенно удаляет все сохраненные настройки сайта.\n\nHala Madrid i nada mas',
      copyright: '© 2026 Or1G1nal. Все права защищены.',
      anthem: 'Гимн Real Madrid',
      clearCache: 'Сбросить настройки',
      resetConfirm: 'Вы уверены?',
      brightMoments: 'Яркие моменты',
      uclBracket: 'Сетка Плей-офф ЛЧ',
      possession: 'Владение',
      shots: 'Всего ударов',
      shotsOnTarget: 'Удары в створ',
      passing: 'Точность передач',
      fouls: 'Фолы',
      corners: 'Угловые',
      expectedGoals: 'Ожидаемые голы (xG)',
      matchStats: 'Статистика матча'
    }
  },
  { 
    code: 'hy', 
    name: 'Armenian', 
    nativeName: 'Հայերեն',
    streamUrl: '',
    translations: {
      home: 'Գլխավոր',
      squad: 'Թիմի կազմը',
      tiktok: 'TikTok',
      telegram: 'Telegram',
      youtube: 'Youtube',
      liveArena: 'Ուղիղ եթեր',
      establishingLink: 'Միացում...',
      connectingTo: 'Միացում հայերեն հեռարձակմանը...',
      ultraHdStream: 'Ultra HD • Հայերեն',
      exclusiveBroadcast: 'Բացառիկ հեռարձակում հայերենով',
      chooseLanguage: 'Բարի գալուստ Walkers Madrid: Ընտրեք ձեր լեզուն.',
      premiumAccess: 'Պրեմիում մուտք',
      ultimateExperience: 'Լավագույն մարզական փորձը',
      aboutUs: 'Մեր մասին',
      aboutSite: 'Կայքի մասին',
      contacts: 'Կոնտակտներ',
      privacyPolicy: 'Գաղտնիության քաղաքականություն',
      close: 'Փակել',
      goals: 'Գոլեր',
      assists: 'Գոլային փոխանցումներ',
      appearances: 'Խաղեր',
      cleanSheets: 'Չոր հանդիպումներ',
      position: 'Դիրք',
      nationality: 'Ազգություն',
      settings: 'Կարգավորումներ',
      colorScheme: 'Գունային սխեման',
      background: 'Ֆոն',
      favPlayer: 'Սիրված խաղացող',
      language: 'Կայքի լեզուն',
      matchSchedule: 'Խաղերի ժամանակացույց',
      livePerformance: 'Կատարողականություն',
      broadcastDescription: 'Վայելեք հանդիպումը բարձրագույն որակով՝ տեղայնացված մեկնաբանություններով։',
      windowTransparency: 'Պատուհանների թափանցիկություն',
      aboutUsContent: '• Մեր առաքելությունն է միավորել մադրիդիստներին աշխարհի բոլոր ծայրերից մեկ միասնական թվային հարթակում:\n• Walkers Madrid-ը պարզապես հեռարձակում չէ, այն խաղային օրվա ամբողջական մթնոլորտ է՝ խորը վերլուծություններով և վիճակագրությամբ:\n• Մենք անկախ երկրպագուների նախագիծ ենք, որը առաջնորդվում է բացառապես սիրով դեպի "Արքայական ակումբ":\n• Կայքի յուրաքանչյուր թարմացում ներշնչված է մեր համայնքի կարծիքներով՝ ապահովելու որակի ամենաբարձր չափանիշները:\n\nHala Madrid i nada mas',
      aboutSiteContent: '• Walkers Madrid-ը ինտերակտիվ երկրպագուների հարթակ է, որը ստեղծված է աշխարհի մադրիդիստներին միավորելու համար:\n• Նպատակը: Կայքը նախատեսված է խաղերը բարձր որակով (Ultra HD) դիտելու և իրական ժամանակի վիճակագրությանը հետևելու համար:\n• Աղբյուրները: Հեռարձակման հղումները հավաքվում են բաց օրինական աղբյուրներից և ակումբի պաշտոնական հայելային սերվերներից՝ կայուն հասանելիություն ապահովելու համար:\n• Տեխնոլոգիաներ: Մենք օգտագործում ենք ժամանակակից React և Tailwind CSS տեխնոլոգիաներ՝ թեթև և արագ ինտերֆեյս ստեղծելու համար:\n\nHala Madrid i nada mas',
      contactsContent: 'Կապվեք մեզ հետ սոցիալական ցանցերի միջոցով:\n\n📸 Instagram: @abul_walker\n🎬 YouTube: @abulwalker\n🎵 TikTok: @abul_wa7ker',
      privacyPolicyContent: '• Մենք հետևում ենք տվյալների նվազագույնի հասցման սկզբունքին. կայքն աշխատում է առանց գրանցման և անձնական տվյալների հավաքագրման:\n• Ձեր նախապատվությունները (գույնը, ձայնի բարձրությունը, սիրված խաղացողը) պահվում են բացառապես ձեր բրաուզերում:\n• Մենք չենք օգտագործում գովազդային հետքեր և չենք փոխանցում ձեր տվյալները երրորդ անձանց:\n• Անվտանգություն. Տվյալների հոսքերը պաշտպանված են վերծանմամբ, իսկ բրաուզերի քեշի մաքրումը անմիջապես ջնջում է կայքի բոլոր կարգավորումները:\n\nHala Madrid i nada mas',
      copyright: '© 2026 Or1G1nal. Բոլոր իրավունքները պաշտպանված են:',
      anthem: 'Real Madrid-ի օրհներգը',
      clearCache: 'Վերականգնել կարգավորումները',
      resetConfirm: 'Վստա՞հ եք:',
      brightMoments: 'Պայծառ պահեր',
      uclBracket: 'Չեմպիոնների Լիգայի Փլեյ-օֆֆ',
      possession: 'Գնդակի տիրապետում',
      shots: 'Ընդհանուր հարվածներ',
      shotsOnTarget: 'Հարվածներ դարպասին',
      passing: 'Փոխանցումների ճշգրտություն',
      fouls: 'Խախտումներ',
      corners: 'Անկյունայիններ',
      expectedGoals: 'xG (Սպասվող գոլեր)',
      matchStats: 'Խաղի վիճակագրություն'
    }
  },
  { 
    code: 'rmtv', 
    name: 'Real Madrid TV', 
    nativeName: 'Real Madrid TV',
    isSpecial: true,
    streamUrl: 'https://rmtv.akamaized.net/hls/live/2043154/rmtv-en-web/bitrate_3.m3u8',
    translations: {
      home: 'Home',
      squad: 'Team Squad',
      tiktok: 'TikTok',
      telegram: 'Telegram',
      youtube: 'Youtube',
      liveArena: 'RM TV Live',
      establishingLink: 'Connecting...',
      connectingTo: 'Connecting to Real Madrid TV Official Channel...',
      ultraHdStream: 'Official Channel',
      exclusiveBroadcast: 'Official Club Broadcast',
      chooseLanguage: 'Select Official Channel Language',
      premiumAccess: 'Official Access',
      ultimateExperience: 'The Real Madrid Official Experience',
      aboutUs: 'About Us',
      aboutSite: 'About Site',
      contacts: 'Contacts',
      privacyPolicy: 'Privacy Policy',
      close: 'Close',
      goals: 'Goals',
      assists: 'Assists',
      appearances: 'Apps',
      cleanSheets: 'Clean Sheets',
      position: 'Position',
      nationality: 'Nationality',
      settings: 'Settings',
      colorScheme: 'Color Scheme',
      background: 'Background',
      favPlayer: 'Favorite Player',
      language: 'Language',
      matchSchedule: 'Match Schedule',
      livePerformance: 'Team Performance',
      broadcastDescription: 'Official Real Madrid TV stream.',
      windowTransparency: 'UI Opacity',
      aboutUsContent: '• Official professional portal dedicated to the global delivery of Real Madrid CF content.\n• Our primary objective is to maintain a high-grade digital sanctuary for club supporters and media partners.\n• We operate with professional transparency, ensuring the club\'s legacy is protected through verified media channels.\n• This platform serves as a reliable node for official club updates, historical archives, and live events.\n\nHala Madrid i nada mas',
      aboutSiteContent: '• Official fan hub for high-fidelity content delivery.\n• Intended for authorized broadcasting of live matches and historical club archives.\n• Sources: Links are served directly from official club infrastructure and verified global partners.\n• Design: Secure, low-latency delivery designed for the best possible fan experience.\n\nHala Madrid i nada mas',
      contactsContent: 'Contact us via official channels.',
      privacyPolicyContent: '• Standard enterprise-grade privacy protocols apply to all official streaming sessions.\n• We ensure total protection of session metadata; no personally identifiable information (PII) is captured during visits.\n• Local storage is utilized solely for maintaining technical state and user interface preferences.\n• Any external nodes accessed through this portal are verified for security and compliance with international media laws.\n\nHala Madrid i nada mas',
      copyright: '© 2026 Or1G1nal. All rights reserved.',
      anthem: 'Real Madrid Anthem',
      clearCache: 'Reset Settings',
      resetConfirm: 'Are you sure?',
      brightMoments: 'Bright Moments',
      uclBracket: 'UCL Tournament Bracket',
      possession: 'Possession',
      shots: 'Total Shots',
      shotsOnTarget: 'Shots on Target',
      passing: 'Passing %',
      fouls: 'Fouls',
      corners: 'Corners',
      expectedGoals: 'xG',
      matchStats: 'Match Stats'
    }
  }
];
