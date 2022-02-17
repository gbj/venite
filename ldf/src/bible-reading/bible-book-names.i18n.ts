type BibleBookName = Record<string, { short: string; long: string }>;

export const BIBLE_BOOK_NAMES: Record<string, BibleBookName> = {
  Genesis: {
    en: {
      short: 'Genesis',
      long: 'The Book of Genesis',
    },
    es: {
      short: 'Génesis',
      long: 'El Libro de Génesis',
    },
  },
  Exodus: {
    en: {
      short: 'Exodus',
      long: 'The Book of Exodus',
    },
    es: {
      short: 'Éxodo',
      long: 'El Libro de Éxodo',
    },
  },
  Leviticus: {
    en: {
      short: 'Leviticus',
      long: 'The Book of Leviticus',
    },
    es: {
      short: 'Levítico',
      long: 'El Libro de Levítico',
    },
  },
  Numbers: {
    en: {
      short: 'Numbers',
      long: 'The Book of Numbers',
    },
    es: {
      short: 'Números',
      long: 'El Libro de Números',
    },
  },
  Deuteronomy: {
    en: {
      short: 'Deuteronomy',
      long: 'The Book of Deuteronomy',
    },
    es: {
      short: 'Deuteronomio',
      long: 'El Libro de Deuteronomio',
    },
  },
  Joshua: {
    en: {
      short: 'Joshua',
      long: 'The Book of Joshua',
    },
    es: {
      short: 'Josué',
      long: 'El Libro de Josué',
    },
  },
  Judges: {
    en: {
      short: 'Judges',
      long: 'The Book of Judges',
    },
    es: {
      short: 'Jueces',
      long: 'El Libro de Jueces',
    },
  },
  Ruth: {
    en: {
      short: 'Ruth',
      long: 'The Book of Ruth',
    },
    es: {
      short: 'Rut',
      long: 'El Libro de Rut',
    },
  },
  '1 Samuel': {
    en: {
      short: '1 Samuel',
      long: 'The First Book of Samuel',
    },
    es: {
      short: '1 Samuel',
      long: 'El Libro de 1 Samuel',
    },
  },
  '2 Samuel': {
    en: {
      short: '2 Samuel',
      long: 'The Second Book of Samuel',
    },
    es: {
      short: '2 Samuel',
      long: 'El Libro de 2 Samuel',
    },
  },
  '1 Kings': {
    en: {
      short: '1 Kings',
      long: 'The First Book of Kings',
    },
    es: {
      short: '1 Reyes',
      long: 'El Libro de 1 Reyes',
    },
  },
  '2 Kings': {
    en: {
      short: '2 Kings',
      long: 'The Second Book of Kings',
    },
    es: {
      short: '2 Reyes',
      long: 'El Libro de 2 Reyes',
    },
  },
  '1 Chronicles': {
    en: {
      short: '1 Chronicles',
      long: 'The First Book of Chronicles',
    },
    es: {
      short: '1 Crónicas',
      long: 'El Libro de 1 Crónicas',
    },
  },
  '2 Chronicles': {
    en: {
      short: '2 Chronicles',
      long: 'The Second Book of Chronicles',
    },
    es: {
      short: '2 Crónicas',
      long: 'El Libro de 2 Crónicas',
    },
  },
  Ezra: {
    en: {
      short: 'Ezra',
      long: 'The Book of Ezra',
    },
    es: {
      short: 'Esdras',
      long: 'El Libro de Esdras',
    },
  },
  Nehemiah: {
    en: {
      short: 'Nehemiah',
      long: 'The Book of Nehemiah',
    },
    es: {
      short: 'Nehemías',
      long: 'El Libro de Nehemías',
    },
  },
  Esther: {
    en: {
      short: 'Esther',
      long: 'The Book of Esther',
    },
    es: {
      short: 'Ester',
      long: 'El Libro de Ester',
    },
  },
  Job: {
    en: {
      short: 'Job',
      long: 'The Book of Job',
    },
    es: {
      short: 'Job',
      long: 'El Libro de Job',
    },
  },
  Psalms: {
    en: {
      short: 'Psalms',
      long: 'The Psalms',
    },
    es: {
      short: 'Salmos',
      long: 'El Libro de Salmos',
    },
  },
  Proverbs: {
    en: {
      short: 'Proverbs',
      long: 'The Book of Proverbs',
    },
    es: {
      short: 'Proverbios',
      long: 'El Libro de Proverbios',
    },
  },
  Ecclesiastes: {
    en: {
      short: 'Ecclesiastes',
      long: 'The Book of Ecclesiastes',
    },
    es: {
      short: 'Eclesiastés',
      long: 'El Libro de Eclesiastés',
    },
  },
  'The Song of Solomon': {
    en: {
      short: 'The Song of Solomon',
      long: 'The Song of Solomon',
    },
    es: {
      short: 'Cantares',
      long: 'El Libro de Cantares',
    },
  },
  Isaiah: {
    en: {
      short: 'Isaiah',
      long: 'The Book of the Prophet Isaiah',
    },
    es: {
      short: 'Isaías',
      long: 'El Libro de Isaías',
    },
  },
  Jeremiah: {
    en: {
      short: 'Jeremiah',
      long: 'The Book of the Prophet Jeremiah',
    },
    es: {
      short: 'Jeremías',
      long: 'El Libro de Jeremías',
    },
  },
  Lamentations: {
    en: {
      short: 'Lamentations',
      long: 'The Book of Lamentations',
    },
    es: {
      short: 'Lamentaciones',
      long: 'El Libro de Lamentaciones',
    },
  },
  Ezekiel: {
    en: {
      short: 'Ezekiel',
      long: 'The Book of the Prophet Ezekiel',
    },
    es: {
      short: 'Ezequiel',
      long: 'El Libro de Ezequiel',
    },
  },
  Daniel: {
    en: {
      short: 'Daniel',
      long: 'The Book of Daniel',
    },
    es: {
      short: 'Daniel',
      long: 'El Libro de Daniel',
    },
    'en-CA': {
      short: 'Daniel',
      long: 'The Book of the Prophet Daniel',
    },
    iu: {
      short: 'Daniel',
      long: 'The Book of the Prophet Daniel',
    },
  },
  Hosea: {
    en: {
      short: 'Hosea',
      long: 'The Book of the Prophet Hosea',
    },
    es: {
      short: 'Oseas',
      long: 'El Libro de Oseas',
    },
  },
  Joel: {
    en: {
      short: 'Joel',
      long: 'The Book of the Prophet Joel',
    },
    es: {
      short: 'Joel',
      long: 'El Libro de Joel',
    },
  },
  Amos: {
    en: {
      short: 'Amos',
      long: 'The Book of the Prophet Amos',
    },
    es: {
      short: 'Amós',
      long: 'El Libro de Amós',
    },
  },
  Obadiah: {
    en: {
      short: 'Obadiah',
      long: 'The Book of the Prophet Obadiah',
    },
    es: {
      short: 'Abdías',
      long: 'El Libro de Abdías',
    },
  },
  Jonah: {
    en: {
      short: 'Jonah',
      long: 'The Book of the Prophet Jonah',
    },
    es: {
      short: 'Jonás',
      long: 'El Libro de Jonás',
    },
  },
  Micah: {
    en: {
      short: 'Micah',
      long: 'The Book of the Prophet Micah',
    },
    es: {
      short: 'Miqueas',
      long: 'El Libro de Miqueas',
    },
  },
  Nahum: {
    en: {
      short: 'Nahum',
      long: 'The Book of the Prophet Nahum',
    },
    es: {
      short: 'Nahúm',
      long: 'El Libro de Nahúm',
    },
  },
  Habakkuk: {
    en: {
      short: 'Habakkuk',
      long: 'The Book of the Prophet Habakkuk',
    },
    es: {
      short: 'Habacuc',
      long: 'El Libro de Habacuc',
    },
  },
  Zephaniah: {
    en: {
      short: 'Zephaniah',
      long: 'The Book of the Prophet Zephaniah',
    },
    es: {
      short: 'Sofonías',
      long: 'El Libro de Sofonías',
    },
  },
  Haggai: {
    en: {
      short: 'Haggai',
      long: 'The Book of the Prophet Haggai',
    },
    es: {
      short: 'Hageo',
      long: 'El Libro de Hageo',
    },
  },
  Zechariah: {
    en: {
      short: 'Zechariah',
      long: 'The Book of the Prophet Zechariah',
    },
    es: {
      short: 'Zacarías',
      long: 'El Libro de Zacarías',
    },
  },
  Malachi: {
    en: {
      short: 'Malachi',
      long: 'The Book of the Prophet Malachi',
    },
    es: {
      short: 'Malaquías',
      long: 'El Libro de Malaquías',
    },
  },
  Tobit: {
    en: {
      short: 'Tobit',
      long: 'The Book of Tobit',
    },
    es: {
      short: 'Tobías',
      long: 'El Libro de Tobías',
    },
  },
  Azariah: {
    en: {
      short: 'The Song of the Three Children',
      long: 'The Song of the Three Children',
    },
    es: {
      short: 'El Himno de los tres jóvenes ',
      long: 'El Himno de los tres jóvenes ',
    },
  },
  Judith: {
    en: {
      short: 'Judith',
      long: 'The Book of Judith',
    },
    es: {
      short: 'Judit',
      long: 'El Libro de Judit',
    },
  },
  Baruch: {
    en: {
      short: 'Baruch',
      long: 'The Book of Baruch',
    },
    es: {
      short: 'Baruc',
      long: 'El Libro de Baruc',
    },
  },
  '1 Maccabees': {
    en: {
      short: '1 Maccabees',
      long: 'The First Book of Maccabees',
    },
    es: {
      short: '1 Macabeos',
      long: 'El Libro 1 de los Macabeos',
    },
  },
  '2 Maccabees': {
    en: {
      short: '2 Maccabees',
      long: 'The Second Book of Maccabees',
    },
    es: {
      short: '2 Macabeos',
      long: 'El Libro 2 de los Macabeos',
    },
  },
  Wisdom: {
    en: {
      short: 'Wisdom',
      long: 'The Wisdom of Solomon',
    },
    es: {
      short: 'Sabiduría',
      long: 'El Libro de la Sabiduría',
    },
  },
  Sirach: {
    en: {
      short: 'Sirach',
      long: 'The Wisdom of Ben Sira',
    },
    es: {
      short: 'Eclesiástico',
      long: 'La Sabiduría de Jesús ben Sirá',
    },
    'en-CA': {
      short: 'Sirach',
      long: 'The Book of Ecclesiasticus',
    },
    iu: {
      short: 'Sirach',
      long: 'The Book of Ecclesiasticus',
    },
  },
  Matthew: {
    en: {
      short: 'Matthew',
      long: 'The Gospel According to Matthew',
    },
    es: {
      short: 'Mateo',
      long: 'El Evangelio de San Mateo',
    },
    'en-CA': {
      short: 'Matthew',
      long: 'The Gospel According to St. Matthew',
    },
    iu: {
      short: 'Matthew',
      long: 'The Gospel According to St. Matthew',
    },
  },
  Mark: {
    en: {
      short: 'Mark',
      long: 'The Gospel According to Mark',
    },
    es: {
      short: 'Marcos',
      long: 'El Evangelio de San Marcos',
    },
    'en-CA': {
      short: 'Mark',
      long: 'The Gospel According to St. Mark',
    },
    iu: {
      short: 'Mark',
      long: 'The Gospel According to St. Mark',
    },
  },
  Luke: {
    en: {
      short: 'Luke',
      long: 'The Gospel According to Luke',
    },
    es: {
      short: 'Lucas',
      long: 'El Evangelio de San Mateo',
    },
    'en-CA': {
      short: 'Luke',
      long: 'The Gospel According to St. Luke',
    },
    iu: {
      short: 'Luke',
      long: 'The Gospel According to St. Luke',
    },
  },
  John: {
    en: {
      short: 'John',
      long: 'The Gospel According to John',
    },
    es: {
      short: 'Juan',
      long: 'El Evangelio de San Juan',
    },
    'en-CA': {
      short: 'John',
      long: 'The Gospel According to St. John',
    },
    iu: {
      short: 'John',
      long: 'The Gospel According to St. John',
    },
  },
  Acts: {
    en: {
      short: 'Acts',
      long: 'The Acts of the Apostles',
    },
    es: {
      short: 'Hechos',
      long: 'Los Hechos de los Apóstoles',
    },
    'en-CA': {
      short: 'Acts',
      long: 'The Book of the Acts of the Apostles',
    },
    iu: {
      short: 'Acts',
      long: 'The Book of the Acts of the Apostles',
    },
  },
  Romans: {
    en: {
      short: 'Romans',
      long: 'The Letter to the Romans',
    },
    es: {
      short: 'Romanos',
      long: 'La Epístola a los Romanos',
    },
    'en-CA': {
      short: 'Romans',
      long: 'The Epistle of St. Paul the Apostle to the Romans',
    },
    iu: {
      short: 'Romans',
      long: 'The Epistle of St. Paul the Apostle to the Romans',
    },
  },
  '1 Corinthians': {
    en: {
      short: '1 Corinthians',
      long: 'The First Letter to the Corinthians',
    },
    es: {
      short: '1 Corintios',
      long: 'La Primera Epístola a los Corintios',
    },
    'en-CA': {
      short: '1 Corinthians',
      long: 'The First Epistle of St. Paul the Apostle to the Corinthians',
    },
    iu: {
      short: '1 Corinthians',
      long: 'The First Epistle of St. Paul the Apostle to the Corinthians',
    },
  },
  '2 Corinthians': {
    en: {
      short: '2 Corinthians',
      long: 'The Second Letter to the Corinthians',
    },
    es: {
      short: '2 Corintios',
      long: 'La Segunda Epístola a los Corintios',
    },
    'en-CA': {
      short: '2 Corinthians',
      long: 'The Second Epistle of St. Paul the Apostle to the Corinthians',
    },
    iu: {
      short: '2 Corinthians',
      long: 'The Second Epistle of St. Paul the Apostle to the Corinthians',
    },
  },
  Galatians: {
    en: {
      short: 'Galatians',
      long: 'The Letter to the Galatians',
    },
    es: {
      short: 'Gálatas',
      long: 'La Epístola a los Gálatas',
    },
    'en-CA': {
      short: 'Galatians',
      long: 'The Epistle of St. Paul the Apostle to the Galatians',
    },
    iu: {
      short: 'Galatians',
      long: 'The Epistle of St. Paul the Apostle to the Galatians',
    },
  },
  Ephesians: {
    en: {
      short: 'Ephesians',
      long: 'The Letter to the Ephesians',
    },
    es: {
      short: 'Efesios',
      long: 'La Epístola a los Efesios',
    },
    'en-CA': {
      short: 'Ephesians',
      long: 'The Epistle of St. Paul the Apostle to the Ephesians',
    },
    iu: {
      short: 'Ephesians',
      long: 'The Epistle of St. Paul the Apostle to the Ephesians',
    },
  },
  Philippians: {
    en: {
      short: 'Philippians',
      long: 'The Letter to the Philippians',
    },
    es: {
      short: 'Filipenses',
      long: 'La Epístola a los Filipenses',
    },
    'en-CA': {
      short: 'Philippians',
      long: 'The Epistle of St. Paul the Apostle to the Philippians',
    },
    iu: {
      short: 'Philippians',
      long: 'The Epistle of St. Paul the Apostle to the Philippians',
    },
  },
  Colossians: {
    en: {
      short: 'Colossians',
      long: 'The Letter to the Colossians',
    },
    es: {
      short: 'Colosenses',
      long: 'La Epístola a los Colosenses',
    },
    'en-CA': {
      short: 'Colossians',
      long: 'The Epistle of St. Paul the Apostle to the Colossians',
    },
    iu: {
      short: 'Colossians',
      long: 'The Epistle of St. Paul the Apostle to the Colossians',
    },
  },
  '1 Thessalonians': {
    en: {
      short: '1 Thessalonians',
      long: 'The First Letter to the Thessalonians',
    },
    es: {
      short: '1 Tesalonicenses',
      long: 'La Primera Epístola a los Tesalonicenses',
    },
    'en-CA': {
      short: '1 Thessalonians',
      long: 'The First Epistle of St. Paul the Apostle to the Thessalonians',
    },
    iu: {
      short: '1 Thessalonians',
      long: 'The First Epistle of St. Paul the Apostle to the Thessalonians',
    },
  },
  '2 Thessalonians': {
    en: {
      short: '2 Thessalonians',
      long: 'The Second Letter to the Thessalonians',
    },
    es: {
      short: '2 Tesalonicenses',
      long: 'La Segunda Epístola a los Tesalonicenses',
    },
    'en-CA': {
      short: '2 Thessalonians',
      long: 'The Second Epistle of St. Paul the Apostle to the Thessalonians',
    },
    iu: {
      short: '2 Thessalonians',
      long: 'The Second Epistle of St. Paul the Apostle to the Thessalonians',
    },
  },
  '1 Timothy': {
    en: {
      short: '1 Timothy',
      long: 'The First Letter to Timothy',
    },
    es: {
      short: '1 Timoteo',
      long: 'La Primera Epístola a Timoteo',
    },
    'en-CA': {
      short: '1 Timothy',
      long: 'The First Epistle of St. Paul the Apostle to Timothy',
    },
    iu: {
      short: '1 Timothy',
      long: 'The First Epistle of St. Paul the Apostle to Timothy',
    },
  },
  '2 Timothy': {
    en: {
      short: '2 Timothy',
      long: 'The Second Letter to Timothy',
    },
    es: {
      short: '2 Timoteo',
      long: 'La Segunda Epístola a Timoteo',
    },
    'en-CA': {
      short: '2 Timothy',
      long: 'The Second Epistle of St. Paul the Apostle to Timothy',
    },
    iu: {
      short: '2 Timothy',
      long: 'The Second Epistle of St. Paul the Apostle to Timothy',
    },
  },
  Titus: {
    en: {
      short: 'Titus',
      long: 'The Letter to Titus',
    },
    es: {
      short: 'Tito',
      long: 'La Epístola a Tito',
    },
    'en-CA': {
      short: 'Titus',
      long: 'The Epistle of St. Paul the Apostle to Titus',
    },
    iu: {
      short: 'Titus',
      long: 'The Epistle of St. Paul the Apostle to Titus',
    },
  },
  Philemon: {
    en: {
      short: 'Philemon',
      long: 'The Letter to Philemon',
    },
    es: {
      short: 'Filemón',
      long: 'La Epístola a Filemón',
    },
    'en-CA': {
      short: 'Philemon',
      long: 'The Epistle of St. Paul the Apostle to Philemon',
    },
    iu: {
      short: 'Philemon',
      long: 'The Epistle of St. Paul the Apostle to Philemon',
    },
  },
  Hebrews: {
    en: {
      short: 'Hebrews',
      long: 'The Book of Hebrews',
    },
    es: {
      short: 'Hebrews',
      long: 'La Epístola a los Hebreos',
    },
    'en-CA': {
      short: 'Hebrews',
      long: 'The Epistle to the Hebrews',
    },
    iu: {
      short: 'Hebrews',
      long: 'The Epistle to the Hebrews',
    },
  },
  James: {
    en: {
      short: 'James',
      long: 'The Letter of James',
    },
    es: {
      short: 'Santiago',
      long: 'La Epístola de Santiago',
    },
    'en-CA': {
      short: 'James',
      long: 'The Epistle General of St. James',
    },
    iu: {
      short: 'James',
      long: 'The Epistle General of St. James',
    },
  },
  '1 Peter': {
    en: {
      short: '1 Peter',
      long: 'The First Letter of Peter',
    },
    es: {
      short: '1 Pedro',
      long: 'La Primera Epístola de Pedro',
    },
    'en-CA': {
      short: '1 Peter',
      long: 'The First Epistle General of St. Peter',
    },
    iu: {
      short: '1 Peter',
      long: 'The First Epistle General of St. Peter',
    },
  },
  '2 Peter': {
    en: {
      short: '2 Peter',
      long: 'The Second Letter of Peter',
    },
    es: {
      short: '2 Pedro',
      long: 'La Segunda Epístola de Pedro',
    },
    'en-CA': {
      short: '2 Peter',
      long: 'The Second Epistle General of St. Peter',
    },
    iu: {
      short: '2 Peter',
      long: 'The Second Epistle General of St. Peter',
    },
  },
  '1 John': {
    en: {
      short: '1 John',
      long: 'The First Letter of John',
    },
    es: {
      short: '1 Juan',
      long: 'La Primera Epístola de Juan',
    },
    'en-CA': {
      short: '2 John',
      long: 'The First Epistle General of St. John',
    },
    iu: {
      short: '2 John',
      long: 'The First Epistle General of St. John',
    },
  },
  '2 John': {
    en: {
      short: '2 John',
      long: 'The Second Letter of John',
    },
    es: {
      short: '1 Juan',
      long: 'La Segunda Epístola de Juan',
    },
    'en-CA': {
      short: '2 John',
      long: 'The Second Epistle General of St. John',
    },
    iu: {
      short: '2 John',
      long: 'The Second Epistle General of St. John',
    },
  },
  '3 John': {
    en: {
      short: '3 John',
      long: 'The Third Letter of John',
    },
    es: {
      short: '1 Juan',
      long: 'La Tercera Epístola de Juan',
    },
    'en-CA': {
      short: '3 John',
      long: 'The Third Epistle General of St. John',
    },
    iu: {
      short: '3 John',
      long: 'The Third Epistle General of St. John',
    },
  },
  Jude: {
    en: {
      short: 'Jude',
      long: 'The Letter of Jude',
    },
    es: {
      short: 'Judas',
      long: 'La Epístola de Judas',
    },
    'en-CA': {
      short: 'Jude',
      long: 'The Epistle General of St. Jude',
    },
    iu: {
      short: 'Jude',
      long: 'The Epistle General of St. Jude',
    },
  },
  Revelation: {
    en: {
      short: 'Revelation',
      long: 'The Book of Revelation',
    },
    es: {
      short: 'Apocalipsis',
      long: 'El Apocalipsis de San Juan',
    },
    'en-CA': {
      short: 'Revelation',
      long: 'The Revelation to St. John the Divine',
    },
    iu: {
      short: 'Revelation',
      long: 'The Revelation to St. John the Divine',
    },
  },
  '1 Esdras': {
    en: {
      short: '1 Esdras',
      long: 'The Second Book of Esdras',
    },
    es: {
      short: '1 Esdras',
      long: '1 Esdras',
    },
  },
  '2 Esdras': {
    en: {
      short: '2 Esdras',
      long: 'The Second Book of Esdras',
    },
    es: {
      short: '2 Esdras',
      long: '2 Esdras',
    },
  },
  Bel: {
    en: {
      short: 'Bel',
      long: 'Bel and the Dragon',
    },
    es: {
      short: 'Bel',
      long: 'La Historia de Bel y el Dragón',
    },
  },
  'Letter of Jeremiah': {
    en: {
      short: 'Letter of Jeremiah',
      long: 'The Letter of Jeremiah',
    },
    es: {
      short: 'Letter of Jeremiah',
      long: 'La Epístola de Jeremías',
    },
  },
};
