import {
  CHAPTER_META,
  ChapterMeta,
  nextVerseRef,
  previousVerseRef,
  versePath
} from './gita.data';

export interface GitaTranslation {
  id?: number;
  description: string;
  author_name: string;
  language: string;
}

export interface GitaCommentary {
  id?: number;
  description: string;
  author_name: string;
  language: string;
}

export interface GitaVerse {
  id?: number;
  verse_number: number;
  chapter_number: number;
  slug?: string;
  text: string;
  transliteration: string;
  word_meanings: string;
  translations?: GitaTranslation[];
  commentaries?: GitaCommentary[];
}

export interface RelatedVerseLink {
  chapter: number;
  verse: number;
  path: string;
  label: string;
  reason: string;
}

export interface VersePageContent {
  chapter: number;
  verse: number;
  chapterMeta: ChapterMeta;
  sanskrit: string;
  transliteration: string;
  wordMeanings: string;
  englishTranslation?: GitaTranslation;
  hindiTranslation?: GitaTranslation;
  extraEnglishTranslations: GitaTranslation[];
  englishCommentary?: GitaCommentary;
  hindiCommentaries: GitaCommentary[];
  commentaryBody?: string;
  title: string;
  description: string;
  h1: string;
  topic: string;
  spiritualSignificance: string;
  practicalApplication?: string;
  teachings: string[];
  relatedVerses: RelatedVerseLink[];
  faqs: Array<{ question: string; answer: string }>;
}

const CURATED_RELATED: { [key: string]: Array<{ chapter: number; verse: number; reason: string }> } = {
  '1.1': [{ chapter: 1, verse: 28, reason: 'Arjuna’s grief becomes explicit' }, { chapter: 2, verse: 7, reason: 'Arjuna asks Krishna to teach him' }],
  '2.7': [{ chapter: 2, verse: 11, reason: 'Krishna begins the teaching' }, { chapter: 18, verse: 73, reason: 'Arjuna’s confusion is resolved at the end' }],
  '2.20': [{ chapter: 2, verse: 22, reason: 'The self is not destroyed with the body' }, { chapter: 13, verse: 2, reason: 'The knower of the field' }],
  '2.47': [{ chapter: 3, verse: 19, reason: 'Act without clinging' }, { chapter: 18, verse: 9, reason: 'Sattvic relinquishment of fruit' }],
  '3.19': [{ chapter: 2, verse: 47, reason: 'The foundational karma-yoga verse' }, { chapter: 3, verse: 8, reason: 'Perform necessary action' }],
  '4.7': [{ chapter: 4, verse: 8, reason: 'The purpose of divine descent' }, { chapter: 9, verse: 11, reason: 'The divine appearing in human form' }],
  '4.8': [{ chapter: 4, verse: 7, reason: 'When dharma declines' }],
  '6.5': [{ chapter: 6, verse: 6, reason: 'The mind as friend or enemy' }, { chapter: 2, verse: 48, reason: 'Yoga as evenness of mind' }],
  '7.7': [{ chapter: 10, verse: 8, reason: 'Krishna as the source of all' }, { chapter: 15, verse: 7, reason: 'The living being as a portion of the divine' }],
  '8.5': [{ chapter: 8, verse: 6, reason: 'The last thought follows one’s being' }, { chapter: 8, verse: 13, reason: 'Remembering the divine at death' }],
  '9.22': [{ chapter: 9, verse: 34, reason: 'Wholehearted devotion' }, { chapter: 18, verse: 66, reason: 'Taking refuge without other support' }],
  '9.26': [{ chapter: 9, verse: 22, reason: 'The devotee who depends on God' }, { chapter: 9, verse: 27, reason: 'Offering all action' }],
  '11.3': [{ chapter: 11, verse: 8, reason: 'Divine sight is granted' }, { chapter: 11, verse: 15, reason: 'Arjuna begins to describe the vision' }],
  '11.15': [{ chapter: 11, verse: 16, reason: 'The boundless cosmic form' }, { chapter: 10, verse: 41, reason: 'All glory is a spark of the divine' }],
  '11.16': [{ chapter: 11, verse: 15, reason: 'The vision of gods and sages in the form' }, { chapter: 11, verse: 17, reason: 'The blazing cosmic person' }],
  '11.32': [{ chapter: 11, verse: 33, reason: 'Arjuna is told to act as an instrument' }, { chapter: 18, verse: 59, reason: 'Nature will compel action anyway' }],
  '12.13': [{ chapter: 12, verse: 14, reason: 'Further qualities of a devotee' }, { chapter: 16, verse: 1, reason: 'Divine qualities listed later' }],
  '13.2': [{ chapter: 13, verse: 3, reason: 'Knowledge of the field and its knower' }, { chapter: 15, verse: 7, reason: 'The eternal portion in the body' }],
  '15.1': [{ chapter: 15, verse: 3, reason: 'Cutting the inverted tree' }, { chapter: 15, verse: 15, reason: 'The Lord in the heart' }],
  '18.66': [{ chapter: 9, verse: 22, reason: 'Refuge and divine care' }, { chapter: 18, verse: 65, reason: 'Love and worship of Krishna' }]
};

const ENGLISH_AUTHOR_ORDER = [
  'Swami Sivananda',
  'Swami Gambirananda',
  'Swami Adidevananda',
  'Shri Purohit Swami',
  'Dr. S. Sankaranarayan'
];

const HINDI_AUTHOR_ORDER = [
  'Swami Tejomayananda',
  'Swami Ramsukhdas',
  'Swami Chinmayananda'
];

export function pickTranslation(
  translations: GitaTranslation[] | undefined,
  language: 'english' | 'hindi',
  preferredAuthors: string[]
): GitaTranslation | undefined {
  const list = (translations || []).filter(item => item.language === language && item.description);
  for (const author of preferredAuthors) {
    const match = list.find(item => item.author_name === author);
    if (match) {
      return match;
    }
  }
  return list[0];
}

export function formatSanskrit(text: string, chapter: number): string {
  if (!text) {
    return '';
  }
  if (chapter >= 12) {
    return text.replace('\n\n', '').replace('।\n\n', '।').replace('।', '।\n\n');
  }
  return text;
}

export function cleanText(value: string | undefined): string {
  return (value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\?\s+/g, ', ')
    .trim();
}

export function extractTopic(translation: string, fallback: string): string {
  let text = cleanText(translation)
    .replace(/^[.।\d\s"“”]+/, '')
    .replace(/^[A-Za-z][A-Za-z.'-]+\s+said[,:]?\s*/i, '')
    .replace(/^["“”]+/, '')
    .replace(/^O [A-Za-z ]+[,!]?\s*/g, '')
    .replace(/^(I (see|behold|am|have|find)( Thee| You)?( with)?|You are|He who|The one who|Know that|Therefore|With)\s+/i, '')
    .replace(/^(Thee|You)\s+(with|of|in|as)\s+/i, '')
    .replace(/["“”]/g, '')
    .trim();

  const firstClause = text.split(/[.;:!?।]/)[0].trim();
  if (firstClause.length >= 16 && firstClause.length <= 52) {
    return toTitleCase(firstClause.replace(/[,;]+$/, ''));
  }

  const commaParts = firstClause.split(',').map(part => part.trim()).filter(Boolean);
  if (commaParts.length) {
    let acc = commaParts[0];
    for (let i = 1; i < commaParts.length; i++) {
      const next = `${acc}, ${commaParts[i]}`;
      if (next.length > 52) {
        break;
      }
      acc = next;
    }
    if (acc.length >= 16 && acc.length <= 52) {
      return toTitleCase(acc);
    }
  }

  const words = firstClause.split(/\s+/).filter(Boolean);
  let count = Math.min(10, words.length);
  let chosen = words.slice(0, count).join(' ').replace(/[,;]+$/, '');
  while (count > 4 && chosen.length > 52) {
    count--;
    chosen = words.slice(0, count).join(' ').replace(/[,;]+$/, '');
  }
  return chosen.length >= 12 ? toTitleCase(chosen) : fallback;
}

function toTitleCase(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function buildMetaDescription(chapter: number, verse: number, translation: string, topic: string): string {
  const core = cleanText(translation).replace(/^[.।\d\s]+/, '').replace(/["“”]/g, '');
  const lead = core.length > 110 ? core.slice(0, 107).replace(/\s+\S*$/, '') + '…' : core;
  if (lead.length >= 80) {
    const suffix = ` Bhagavad Gita ${chapter}.${verse}.`;
    const combined = lead + suffix;
    return combined.length <= 170 ? combined : lead;
  }
  return `Read Bhagavad Gita Chapter ${chapter} Verse ${verse} (${topic}) in Sanskrit, with English translation, Hindi meaning, and commentary.`;
}

export function extractCommentaryBody(raw: string | undefined): string {
  const text = cleanText(raw);
  if (!text) {
    return '';
  }
  const match = text.match(/commentary\s*[:.\-–]?\s*(.*)$/i);
  if (match && match[1] && match[1].length > 40) {
    return match[1].trim();
  }
  return text;
}

export function extractTeachings(commentary: string | undefined, translation: string | undefined): string[] {
  const source = extractCommentaryBody(commentary) || cleanText(translation);
  const sentences = splitSentences(source)
    .filter(sentence => sentence.length > 35 && sentence.length < 260)
    .filter(sentence => !/^\d+\.\d+/.test(sentence));
  const unique: string[] = [];
  for (const sentence of sentences) {
    if (!unique.some(item => item.slice(0, 40) === sentence.slice(0, 40))) {
      unique.push(sentence);
    }
    if (unique.length === 3) {
      break;
    }
  }
  return unique;
}

export function extractPracticalApplication(commentary: string | undefined): string | undefined {
  const sentences = splitSentences(extractCommentaryBody(commentary));
  const practical = sentences.find(sentence =>
    /therefore|should|ought|practice|must|let a man|in life|daily|work|duty|devote/i.test(sentence)
    && sentence.length > 40
    && sentence.length < 280
  );
  return practical;
}

function splitSentences(text: string): string[] {
  return cleanText(text)
    .split(/(?<=[.!?])\s+/)
    .map(item => item.trim())
    .filter(Boolean);
}

const PATH_KEY_VERSES: Array<{ chapter: number; verse: number; reason: string }> = [
  { chapter: 2, verse: 47, reason: 'A core teaching on selfless action' },
  { chapter: 3, verse: 19, reason: 'Karma yoga without clinging' },
  { chapter: 9, verse: 22, reason: 'Devotion and divine care' },
  { chapter: 12, verse: 13, reason: 'The character of a devotee' },
  { chapter: 15, verse: 7, reason: 'The self as a portion of the divine' },
  { chapter: 18, verse: 66, reason: 'The Gita’s closing call to refuge' }
];

export function getRelatedVerses(chapter: number, verse: number): RelatedVerseLink[] {
  const key = `${chapter}.${verse}`;
  const collected: RelatedVerseLink[] = [];
  const seen = new Set<string>([key]);

  const add = (ch: number, v: number, reason: string) => {
    const id = `${ch}.${v}`;
    if (seen.has(id) || !CHAPTER_META[ch]) {
      return;
    }
    seen.add(id);
    collected.push({
      chapter: ch,
      verse: v,
      path: versePath(ch, v),
      label: `Chapter ${ch}, Verse ${v}`,
      reason
    });
  };

  (CURATED_RELATED[key] || []).forEach(item => add(item.chapter, item.verse, item.reason));

  const prev = previousVerseRef(chapter, verse);
  const next = nextVerseRef(chapter, verse);
  if (prev && prev.chapter === chapter) {
    add(prev.chapter, prev.verse, 'Previous verse in this chapter');
  }
  if (next && next.chapter === chapter) {
    add(next.chapter, next.verse, 'Next verse in this chapter');
  }

  PATH_KEY_VERSES.forEach(item => {
    if (collected.length < 5) {
      add(item.chapter, item.verse, item.reason);
    }
  });

  return collected.slice(0, 5);
}

export function buildVersePageContent(verse: GitaVerse): VersePageContent {
  const chapter = verse.chapter_number;
  const verseNumber = verse.verse_number;
  const chapterMeta = CHAPTER_META[chapter];
  const englishTranslation = pickTranslation(verse.translations, 'english', ENGLISH_AUTHOR_ORDER);
  const hindiTranslation = pickTranslation(verse.translations, 'hindi', HINDI_AUTHOR_ORDER);
  const extraEnglishTranslations = (verse.translations || [])
    .filter(item => item.language === 'english' && item.author_name !== englishTranslation?.author_name)
    .slice(0, 2);

  const englishCommentary = (verse.commentaries || []).find(item => item.language === 'english');
  const hindiCommentaries = (verse.commentaries || []).filter(item => item.language === 'hindi').slice(0, 2);
  const commentaryBody = extractCommentaryBody(englishCommentary?.description);
  const topic = extractTopic(englishTranslation?.description || '', chapterMeta.shortTopic);
  const translationText = cleanText(englishTranslation?.description);
  const title = `Bhagavad Gita Chapter ${chapter} Verse ${verseNumber} – ${topic} | Bhagavad Gita`;
  const description = buildMetaDescription(chapter, verseNumber, translationText, topic);
  const teachings = extractTeachings(englishCommentary?.description, translationText);
  const practicalApplication = extractPracticalApplication(englishCommentary?.description);

  const spiritualSignificance = [
    `In ${chapterMeta.nameTranslated} (${chapterMeta.nameMeaning}), this verse belongs to the Gita’s teaching on ${chapterMeta.yogaPath.toLowerCase()}.`,
    translationText
      ? `Here the text presents that teaching through these words: ${translationText}`
      : `The verse continues the chapter’s focus on ${chapterMeta.themes[0].toLowerCase()}.`
  ].join(' ');

  const aboutAnswer = translationText
    ? `Chapter ${chapter}, verse ${verseNumber} is part of ${chapterMeta.nameTranslated}. In the English translation used on this page, it says: ${translationText}`
    : `Chapter ${chapter}, verse ${verseNumber} is part of ${chapterMeta.nameTranslated}, which deals with ${chapterMeta.nameMeaning.toLowerCase()}.`;

  return {
    chapter,
    verse: verseNumber,
    chapterMeta,
    sanskrit: formatSanskrit(verse.text, chapter),
    transliteration: verse.transliteration,
    wordMeanings: verse.word_meanings,
    englishTranslation,
    hindiTranslation,
    extraEnglishTranslations,
    englishCommentary,
    hindiCommentaries,
    commentaryBody,
    title,
    description,
    h1: `Bhagavad Gita Chapter ${chapter} Verse ${verseNumber}`,
    topic,
    spiritualSignificance,
    practicalApplication,
    teachings,
    relatedVerses: getRelatedVerses(chapter, verseNumber),
    faqs: [
      {
        question: `What is Bhagavad Gita Chapter ${chapter} Verse ${verseNumber} about?`,
        answer: aboutAnswer
      },
      {
        question: `What is the spiritual context of this verse?`,
        answer: `It appears in ${chapterMeta.nameTranslated}, a chapter associated with ${chapterMeta.yogaPath}. ${chapterMeta.themes[0]}.`
      }
    ]
  };
}
