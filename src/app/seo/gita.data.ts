export const SITE_ORIGIN = 'https://bhagvad-gita.vercel.app';
export const OG_IMAGE = `${SITE_ORIGIN}/assets/ogImage.jpg`;
export const DEFAULT_OG_IMAGE_ALT = 'Bhagavad Gita – Krishna and Arjuna on the battlefield of Kurukshetra';

export const VERSES_PER_CHAPTER: { [key: number]: number } = {
  1: 47, 2: 72, 3: 43, 4: 42, 5: 29, 6: 47, 7: 30,
  8: 28, 9: 34, 10: 42, 11: 55, 12: 20, 13: 35, 14: 27,
  15: 20, 16: 24, 17: 28, 18: 78
};

export type YogaPath = 'Karma Yoga' | 'Bhakti Yoga' | 'Jnana Yoga';

export interface ChapterMeta {
  number: number;
  nameTranslated: string;
  nameMeaning: string;
  shortTopic: string;
  yogaPath: YogaPath;
  themes: string[];
  teachings: string[];
}

export const CHAPTER_META: { [key: number]: ChapterMeta } = {
  1: {
    number: 1,
    nameTranslated: 'Arjuna Visada Yoga',
    nameMeaning: "Arjuna's Dilemma",
    shortTopic: "Arjuna's Dilemma",
    yogaPath: 'Karma Yoga',
    themes: ['Duty on the battlefield', 'Compassion and confusion', 'The crisis that begins the teaching'],
    teachings: [
      'The Gita begins with a moral crisis, not an abstract lecture.',
      'Arjuna’s grief shows how attachment can cloud judgment even in a righteous person.',
      'The setting of Kurukshetra frames the later teaching on dharma, action, and self-knowledge.'
    ]
  },
  2: {
    number: 2,
    nameTranslated: 'Sankhya Yoga',
    nameMeaning: 'Transcendental Knowledge',
    shortTopic: 'Transcendental Knowledge',
    yogaPath: 'Karma Yoga',
    themes: ['The immortal self', 'Equanimity', 'Yoga of selfless action'],
    teachings: [
      'Krishna introduces the distinction between the changing body and the unchanging self.',
      'Steady wisdom (sthita-prajna) is presented as the fruit of right understanding.',
      'Verse 2.47 becomes a foundation for karma yoga: act, but do not cling to the fruit.'
    ]
  },
  3: {
    number: 3,
    nameTranslated: 'Karma Yoga',
    nameMeaning: 'Path of Selfless Service',
    shortTopic: 'Selfless Action',
    yogaPath: 'Karma Yoga',
    themes: ['Action versus inaction', 'Yajna and social duty', 'Working without selfish motive'],
    teachings: [
      'Renouncing action is not the same as acting without attachment.',
      'Krishna teaches that the world moves through action, so withdrawal is not a universal solution.',
      'Selfless work is offered as a practical path for people living in the world.'
    ]
  },
  4: {
    number: 4,
    nameTranslated: 'Jnana Karma Sanyasa Yoga',
    nameMeaning: 'Path of Knowledge and the Disciplines of Action',
    shortTopic: 'Knowledge and Action',
    yogaPath: 'Karma Yoga',
    themes: ['Divine descent', 'Action in knowledge', 'The sacrifice of wisdom'],
    teachings: [
      'Krishna describes the continuity of this teaching through time.',
      'Action performed in knowledge does not bind the way ignorant action does.',
      'Jnana-yajna, the sacrifice of knowledge, is praised as purifying understanding.'
    ]
  },
  5: {
    number: 5,
    nameTranslated: 'Karma Sanyasa Yoga',
    nameMeaning: 'Path of Renunciation',
    shortTopic: 'Renunciation in Action',
    yogaPath: 'Karma Yoga',
    themes: ['Sannyasa and karma yoga', 'Inner renunciation', 'The sage who sees the same in all'],
    teachings: [
      'Outer renunciation and inner yoga are shown as leading to the same goal when rightly understood.',
      'True renunciation is giving up selfish claim, not abandoning responsibility.',
      'The chapter points toward even-mindedness toward pleasure, pain, honor, and blame.'
    ]
  },
  6: {
    number: 6,
    nameTranslated: 'Dhyana Yoga',
    nameMeaning: 'Path of Meditation',
    shortTopic: 'Meditation',
    yogaPath: 'Karma Yoga',
    themes: ['Self-mastery', 'Meditation practice', 'The yogi’s steadiness'],
    teachings: [
      'The mind can be a friend or an enemy, depending on whether it is trained.',
      'Krishna gives a practical picture of meditation: posture, withdrawal, and one-pointedness.',
      'Even a seeker who falls short is not lost; sincere effort continues.'
    ]
  },
  7: {
    number: 7,
    nameTranslated: 'Gyaan Vigyana Yoga',
    nameMeaning: 'Self-Knowledge and Enlightenment',
    shortTopic: 'Knowing the Divine',
    yogaPath: 'Bhakti Yoga',
    themes: ['God as the source of all', 'Higher and lower nature', 'Devotion born of knowledge'],
    teachings: [
      'Krishna reveals himself as the origin and support of the world.',
      'Material nature and the conscious principle are distinguished without denying their relation.',
      'Those who take refuge in the divine with wholehearted devotion are especially praised.'
    ]
  },
  8: {
    number: 8,
    nameTranslated: 'Akshara Brahma Yoga',
    nameMeaning: 'Path of the Eternal God',
    shortTopic: 'The Imperishable Brahman',
    yogaPath: 'Bhakti Yoga',
    themes: ['The last thought at death', 'Brahman and adhyatma', 'Paths of light and darkness'],
    teachings: [
      'The state of mind at death is said to follow the direction of a person’s lifelong devotion.',
      'Krishna explains Brahman, karma, and the supreme Person in compact definitions.',
      'Remembering the divine at the time of leaving the body is presented as decisive.'
    ]
  },
  9: {
    number: 9,
    nameTranslated: 'Raja Vidya Yoga',
    nameMeaning: 'Yoga through the King of Sciences',
    shortTopic: 'Royal Knowledge',
    yogaPath: 'Bhakti Yoga',
    themes: ['God pervading all beings', 'Simple offerings of devotion', 'The promise of care for the devotee'],
    teachings: [
      'The chapter calls this teaching royal knowledge because it is both profound and practical.',
      'Krishna accepts even a leaf, flower, fruit, or water when offered with devotion.',
      'Verse 9.22 is often read as a promise of support for those who worship without other refuge.'
    ]
  },
  10: {
    number: 10,
    nameTranslated: 'Vibhooti Yoga',
    nameMeaning: 'Yoga through Appreciating the Infinite Opulences of God',
    shortTopic: 'Divine Glories',
    yogaPath: 'Bhakti Yoga',
    themes: ['God as the source of excellence', 'Vibhutis in the world', 'Seeing the divine in the best of each kind'],
    teachings: [
      'Krishna identifies himself with the outstanding expression of each category in creation.',
      'The list of vibhutis is a way of training the mind to recognize the divine in the world.',
      'The chapter prepares Arjuna for the direct vision of the universal form.'
    ]
  },
  11: {
    number: 11,
    nameTranslated: 'Vishwaroopa Darshana Yoga',
    nameMeaning: 'Yoga through Beholding the Cosmic Form of God',
    shortTopic: 'The Universal Form',
    yogaPath: 'Bhakti Yoga',
    themes: ['The cosmic form', 'Divine sight', 'Awe, fear, and devotion'],
    teachings: [
      'Arjuna asks to see the universal form, and Krishna grants divine sight so that it can be seen.',
      'The vision includes creation, preservation, and dissolution in one overwhelming form.',
      'The chapter ends by pointing back to devotion as the way to know this reality.'
    ]
  },
  12: {
    number: 12,
    nameTranslated: 'Bhakti Yoga',
    nameMeaning: 'The Yoga of Devotion',
    shortTopic: 'The Path of Devotion',
    yogaPath: 'Bhakti Yoga',
    themes: ['Worship of the personal and the unmanifest', 'Qualities of a devotee', 'Compassion and even-mindedness'],
    teachings: [
      'Krishna says the path of loving devotion is more accessible for most people than meditation on the unmanifest.',
      'The later verses describe the character of a true devotee: friendly, free from hatred, and steady.',
      'Bhakti is presented not only as emotion but as a disciplined way of living.'
    ]
  },
  13: {
    number: 13,
    nameTranslated: 'Ksetra Ksetrajna Vibhaaga Yoga',
    nameMeaning: 'Yoga through Distinguishing the Field and the Knower of the Field',
    shortTopic: 'Field and Knower',
    yogaPath: 'Jnana Yoga',
    themes: ['Body as the field', 'The knower of the field', 'Prakriti and purusha'],
    teachings: [
      'The body and its conditions are called the field; the conscious knower is distinct from them.',
      'Knowledge is described through qualities such as humility, non-violence, and steadiness.',
      'Seeing the same knower in all beings is presented as liberating understanding.'
    ]
  },
  14: {
    number: 14,
    nameTranslated: 'Gunatraya Vibhaga Yoga',
    nameMeaning: 'Yoga through Understanding the Three Modes of Material Nature',
    shortTopic: 'The Three Gunas',
    yogaPath: 'Jnana Yoga',
    themes: ['Sattva, rajas, and tamas', 'Bondage through the gunas', 'Rising beyond the modes'],
    teachings: [
      'Sattva, rajas, and tamas color knowledge, action, and rest in different ways.',
      'Even sattva binds when one is attached to knowledge and happiness.',
      'The chapter describes the person who has gone beyond the three modes.'
    ]
  },
  15: {
    number: 15,
    nameTranslated: 'Purushottama Yoga',
    nameMeaning: 'The Yoga of the Supreme Divine Personality',
    shortTopic: 'The Supreme Person',
    yogaPath: 'Jnana Yoga',
    themes: ['The inverted ashvattha tree', 'The eternal portion of the divine', 'Purushottama'],
    teachings: [
      'The world is pictured as an inverted tree whose roots must be understood and cut with detachment.',
      'The living being is described as an eternal portion of the divine, struggling with the mind and senses.',
      'Krishna is identified as Purushottama, higher than both the perishable and the imperishable.'
    ]
  },
  16: {
    number: 16,
    nameTranslated: 'Daivasura Sampad Vibhaga Yoga',
    nameMeaning: 'Yoga through Discerning the Divine and Demoniac Natures',
    shortTopic: 'Divine and Demonic Natures',
    yogaPath: 'Jnana Yoga',
    themes: ['Divine qualities', 'Asuric qualities', 'Scripture as a guide'],
    teachings: [
      'Fearlessness, purity, generosity, and self-restraint are listed among divine qualities.',
      'Pride, cruelty, and the claim that the world is without truth are associated with the asuric path.',
      'The chapter warns that desire, anger, and greed lead a person away from well-being.'
    ]
  },
  17: {
    number: 17,
    nameTranslated: 'Sraddhatraya Vibhaga Yoga',
    nameMeaning: 'Yoga through Discerning the Three Divisions of Faith',
    shortTopic: 'Three Kinds of Faith',
    yogaPath: 'Jnana Yoga',
    themes: ['Faith according to the gunas', 'Food, sacrifice, and tapas', 'Om Tat Sat'],
    teachings: [
      'Faith itself takes the color of sattva, rajas, or tamas.',
      'Food, giving, austerity, and worship are classified so that practice can be examined honestly.',
      'The traditional utterance Om Tat Sat is explained as a way of consecrating action.'
    ]
  },
  18: {
    number: 18,
    nameTranslated: 'Moksha Sanyaas Yoga',
    nameMeaning: 'Yoga through the Perfection of Renunciation and Surrender',
    shortTopic: 'Liberation and Renunciation',
    yogaPath: 'Jnana Yoga',
    themes: ['Tyaga and sannyasa', 'The five factors of action', 'Surrender to Krishna'],
    teachings: [
      'The final chapter gathers the Gita’s teaching on action, knowledge, and devotion.',
      'Krishna distinguishes giving up selfish fruit from abandoning necessary work.',
      'The closing instruction of taking refuge is presented as the heart of the teaching for Arjuna.'
    ]
  }
};

export const ALL_CHAPTERS = Object.keys(CHAPTER_META).map(n => CHAPTER_META[Number(n)]);

export function canonicalUrl(path: string = '/'): string {
  if (!path || path === '/') {
    return SITE_ORIGIN;
  }
  const clean = path.split('?')[0].split('#')[0].replace(/\/+$/, '');
  return clean.startsWith('http') ? clean : `${SITE_ORIGIN}${clean.startsWith('/') ? clean : '/' + clean}`;
}

export function parsePositiveInt(value: string | null | undefined): number | null {
  if (!value || !/^[1-9]\d*$/.test(value)) {
    return null;
  }
  return Number(value);
}

export function isValidChapter(chapter: number): boolean {
  return Number.isInteger(chapter) && chapter >= 1 && chapter <= 18;
}

export function isValidVerse(chapter: number, verse: number): boolean {
  return isValidChapter(chapter) && Number.isInteger(verse) && verse >= 1 && verse <= (VERSES_PER_CHAPTER[chapter] || 0);
}

export function previousVerseRef(chapter: number, verse: number): { chapter: number; verse: number } | null {
  if (!isValidVerse(chapter, verse)) {
    return null;
  }
  if (verse > 1) {
    return { chapter, verse: verse - 1 };
  }
  if (chapter > 1) {
    const prevChapter = chapter - 1;
    return { chapter: prevChapter, verse: VERSES_PER_CHAPTER[prevChapter] };
  }
  return null;
}

export function nextVerseRef(chapter: number, verse: number): { chapter: number; verse: number } | null {
  if (!isValidVerse(chapter, verse)) {
    return null;
  }
  if (verse < VERSES_PER_CHAPTER[chapter]) {
    return { chapter, verse: verse + 1 };
  }
  if (chapter < 18) {
    return { chapter: chapter + 1, verse: 1 };
  }
  return null;
}

export function versePath(chapter: number, verse: number): string {
  return `/chapter/${chapter}/verse/${verse}`;
}

export function chapterPath(chapter: number): string {
  return `/chapter/${chapter}`;
}
