export interface Question {
  id: string;
  type: 'multiple-choice' | 'word-bank' | 'listening';
  prompt: string;
  subPrompt?: string;
  audioText: string;
  langCode: string;
  correctAnswer: string;
  options?: string[];
  wordPool?: string[];
  explanation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  desc: string;
  xpReward: number;
  completed?: boolean;
  questions: Question[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  color: 'green' | 'blue' | 'purple' | 'orange';
  lessons: Lesson[];
}

export type CourseTag = 'all' | 'travel' | 'career' | 'easy' | 'global';

export interface Course {
  id: string;
  name: string;
  englishName: string;
  flag: string;
  learnerCount: string;
  badge: string;
  badgeColor: string;
  langCode: string;
  tags: CourseTag[];
  koreanDifficulty: '매우 쉬움' | '쉬움' | '보통' | '도전적';
  difficultyScore: number;
  estimatedMonths: string;
  speakerCount: string;
  countriesCount: string;
  bestFor: string;
  practicalBenefit: string;
  greetingExample: {
    foreign: string;
    korean: string;
  };
  units: Unit[];
}

export const COURSES: Course[] = [
  // 1. Japanese
  {
    id: 'japanese',
    name: '일본어',
    englishName: 'Japanese',
    flag: '🇯🇵',
    learnerCount: '4,500만 명',
    badge: '한국인 입문 1위',
    badgeColor: 'blue',
    langCode: 'ja-JP',
    tags: ['travel', 'easy', 'all'],
    koreanDifficulty: '매우 쉬움',
    difficultyScore: 1,
    estimatedMonths: '3~6개월',
    speakerCount: '1억 2,500만 명',
    countriesCount: '일본 및 아시아',
    bestFor: '어학 학습이 처음이거나 가장 빠른 성취감을 원하는 분',
    practicalBenefit: '한국어와 문법 및 어순(SOV)이 거의 일치하여 초반 진도가 가장 빠릅니다. 일본 여행, 서브컬처, 비즈니스에 직결됩니다.',
    greetingExample: {
      foreign: 'こんにちは！',
      korean: '안녕하세요!',
    },
    units: [
      {
        id: 'ja-unit-1',
        number: 1,
        title: '히라가나와 첫인사',
        subtitle: '기본 일본어 인사와 감사의 말',
        color: 'green',
        lessons: [
          {
            id: 'ja-u1-l1',
            title: '기초 만남 인사법',
            desc: '낮 인사와 감사 표현',
            xpReward: 15,
            questions: [
              {
                id: 'ja-q1',
                type: 'multiple-choice',
                prompt: '"こんにちは (Konnichiwa)"의 한국어 뜻은?',
                audioText: 'こんにちは',
                langCode: 'ja-JP',
                correctAnswer: '안녕하세요 (낮 인사)',
                options: ['좋은 아침입니다', '안녕하세요 (낮 인사)', '잘 자요', '처음 뵙겠습니다'],
                explanation: '낮 시간대에 건네는 일본의 대표 인사말입니다.',
              },
              {
                id: 'ja-q2',
                type: 'word-bank',
                prompt: '문장을 완성하세요:',
                subPrompt: '"대단히 감사합니다."',
                audioText: 'どうも ありがとうございます',
                langCode: 'ja-JP',
                correctAnswer: 'どうも ありがとうございます',
                wordPool: ['どうも', 'ありがとうございます', 'おはよう', 'さようなら'],
                explanation: '정중하고 깊은 감사를 표하는 문장입니다.',
              },
              {
                id: 'ja-q3',
                type: 'listening',
                prompt: '음성을 듣고 뜻을 고르세요.',
                subPrompt: '🔊 음성을 듣고 확인하세요',
                audioText: 'はじめまして',
                langCode: 'ja-JP',
                correctAnswer: '처음 뵙겠습니다',
                options: ['오랜만입니다', '처음 뵙겠습니다', '수고하셨습니다', '감사합니다'],
                explanation: 'はじめまして (Hajimemashite)는 첫 대면 인사입니다.',
              },
            ],
          },
          {
            id: 'ja-u1-l2',
            title: '안부와 자기소개',
            desc: '이름과 국적 말하기',
            xpReward: 20,
            questions: [
              {
                id: 'ja-u1-l2-q1',
                type: 'multiple-choice',
                prompt: '"저는 한국인입니다"를 일본어로 말하면?',
                audioText: '私は 韓国人です',
                langCode: 'ja-JP',
                correctAnswer: '私は 韓国人です',
                options: ['私は 韓国人です', '私は 学生です', '私は 先生です', '私は 日本人です'],
                explanation: '韓国人(かんこくじん, 캉코쿠진)은 한국인입니다.',
              },
              {
                id: 'ja-u1-l2-q2',
                type: 'word-bank',
                prompt: '문장을 완성하세요:',
                subPrompt: '"잘 부탁드립니다."',
                audioText: 'よろしく お願いします',
                langCode: 'ja-JP',
                correctAnswer: 'よろしく お願いします',
                wordPool: ['よろしく', 'お願いします', 'おはよう', 'すみません'],
                explanation: '첫인사를 마친 후 건네는 핵심 인사말입니다.',
              },
            ],
          },
        ],
      },
      {
        id: 'ja-unit-2',
        number: 2,
        title: '현지 식당 & 편의점 주문',
        subtitle: '라멘집, 이자카야, 편의점에서 바로 쓰는 실전 회화',
        color: 'blue',
        lessons: [
          {
            id: 'ja-u2-l1',
            title: '식당에서 주문하기',
            desc: '이것 주세요, 계산해 주세요',
            xpReward: 20,
            questions: [
              {
                id: 'ja-u2-q1',
                type: 'multiple-choice',
                prompt: '메뉴판을 가리키며 "이것으로 주세요"는?',
                audioText: 'これ お願いします',
                langCode: 'ja-JP',
                correctAnswer: 'これ お願いします',
                options: ['これ お願いします', 'あれ は何ですか', '水 をください', 'いくら ですか'],
                explanation: 'これ(이것) + お願いします(부탁합니다).',
              },
              {
                id: 'ja-u2-q2',
                type: 'word-bank',
                prompt: '문장을 완성하세요:',
                subPrompt: '"얼마인가요?"',
                audioText: 'いくら ですか',
                langCode: 'ja-JP',
                correctAnswer: 'いくら ですか',
                wordPool: ['いくら', 'ですか', 'どこ', 'なん'],
                explanation: '가격이나 계산 금액을 물어볼 때 필수 표현입니다.',
              },
            ],
          },
        ],
      },
    ],
  },

  // 2. Spanish
  {
    id: 'spanish',
    name: '스페인어',
    englishName: 'Spanish',
    flag: '🇪🇸',
    learnerCount: '3,800만 명',
    badge: '여행 & 가성비 최고',
    badgeColor: 'amber',
    langCode: 'es-ES',
    tags: ['travel', 'global', 'easy', 'all'],
    koreanDifficulty: '쉬움',
    difficultyScore: 2,
    estimatedMonths: '6~9개월',
    speakerCount: '5억 5,000만 명',
    countriesCount: '21개국 모국어',
    bestFor: '남미/유럽 여행, 신나는 발음과 빠른 회화를 즐기고 싶은 분',
    practicalBenefit: '발음 규칙이 한국어 모음과 유사해 읽기가 매우 쉽습니다. 미국 내 제2언어이자 20개국 이상에서 공용어로 사용되어 여행 효율이 압도적입니다.',
    greetingExample: {
      foreign: '¡Hola!',
      korean: '안녕하세요!',
    },
    units: [
      {
        id: 'es-unit-1',
        number: 1,
        title: '첫걸음 인사 & 기본 표현',
        subtitle: '스페인어의 가장 기초적인 만남과 안부 표현을 마스터하세요.',
        color: 'green',
        lessons: [
          {
            id: 'es-u1-l1',
            title: '만남의 인사',
            desc: 'Hola, Buenos días 인사법 익히기',
            xpReward: 15,
            questions: [
              {
                id: 'q1',
                type: 'multiple-choice',
                prompt: '다음 스페인어 단어의 뜻은?',
                audioText: '¡Hola!',
                langCode: 'es-ES',
                correctAnswer: '안녕하세요!',
                options: ['감사합니다', '안녕하세요!', '잘 가요', '실례합니다'],
                explanation: '¡Hola!는 스페인어권에서 언제나 사용하는 친근한 기본 인사입니다.',
              },
              {
                id: 'q2',
                type: 'word-bank',
                prompt: '문장을 완성하세요:',
                subPrompt: '"좋은 아침이에요, 친구여!"',
                audioText: 'Buenos días amigo',
                langCode: 'es-ES',
                correctAnswer: 'Buenos días amigo',
                wordPool: ['Buenos', 'días', 'amigo', 'noche', 'gracias', 'por'],
                explanation: 'Buenos días는 "좋은 아침입니다", amigo는 "친구"라는 뜻입니다.',
              },
              {
                id: 'q3',
                type: 'listening',
                prompt: '음성을 듣고 올바른 한국어 뜻을 선택하세요.',
                subPrompt: '🔊 발음을 듣고 의미를 맞춰보세요',
                audioText: 'Muchas gracias',
                langCode: 'es-ES',
                correctAnswer: '정말 감사합니다',
                options: ['죄송합니다', '정말 감사합니다', '천만에요', '어떻게 지내세요?'],
                explanation: 'Muchas gracias는 "정말 감사합니다"라는 뜻입니다.',
              },
              {
                id: 'q4',
                type: 'multiple-choice',
                prompt: '부탁하거나 주문할 때 사용하는 "제발 / 부탁합니다"는?',
                audioText: 'Por favor',
                langCode: 'es-ES',
                correctAnswer: 'Por favor',
                options: ['De nada', 'Por favor', 'Perdón', 'Hasta luego'],
                explanation: 'Por favor는 영어의 "Please"와 같이 정중한 요청 시 덧붙입니다.',
              },
            ],
          },
          {
            id: 'es-u1-l2',
            title: '안부 묻기와 작별',
            desc: '¿Cómo estás? 및 작별 인사',
            xpReward: 20,
            questions: [
              {
                id: 'es2-q1',
                type: 'multiple-choice',
                prompt: '상대방의 안부를 물을 때 하는 말은?',
                audioText: '¿Cómo estás?',
                langCode: 'es-ES',
                correctAnswer: '어떻게 지내세요?',
                options: ['이름이 뭐예요?', '어떻게 지내세요?', '몇 살이에요?', '어디 가세요?'],
                explanation: '¿Cómo estás?는 친구나 동료에게 안부를 물을 때 사용합니다.',
              },
              {
                id: 'es2-q2',
                type: 'word-bank',
                prompt: '문장을 완성하세요:',
                subPrompt: '"매우 잘 지내요, 감사합니다."',
                audioText: 'Muy bien gracias',
                langCode: 'es-ES',
                correctAnswer: 'Muy bien gracias',
                wordPool: ['Muy', 'bien', 'gracias', 'mal', 'por', 'favor'],
                explanation: 'Muy bien(매우 잘) + gracias(감사합니다).',
              },
            ],
          },
        ],
      },
      {
        id: 'es-unit-2',
        number: 2,
        title: '바르셀로나 타파스 & 카페 주문',
        subtitle: '커피, 타파스, 와인 주문 및 계산서 요청 실전 회화',
        color: 'blue',
        lessons: [
          {
            id: 'es-u2-l1',
            title: '카페에서 주문하기',
            desc: '라테와 물 한 병 주문',
            xpReward: 20,
            questions: [
              {
                id: 'es2-1',
                type: 'word-bank',
                prompt: '문장을 완성하세요:',
                subPrompt: '"라테 커피 한 잔 부탁합니다."',
                audioText: 'Un café con leche por favor',
                langCode: 'es-ES',
                correctAnswer: 'Un café con leche por favor',
                wordPool: ['Un', 'café', 'con', 'leche', 'por', 'favor', 'té', 'agua'],
                explanation: 'con leche는 "우유와 함께(라테)"를 뜻합니다.',
              },
              {
                id: 'es2-2',
                type: 'multiple-choice',
                prompt: '식사 후 "계산서 주세요"를 의미하는 표현은?',
                audioText: 'La cuenta, por favor',
                langCode: 'es-ES',
                correctAnswer: 'La cuenta, por favor',
                options: ['El menú, por favor', 'La cuenta, por favor', 'Agua, por favor', 'Una mesa'],
                explanation: 'La cuenta는 계산서입니다.',
              },
            ],
          },
        ],
      },
    ],
  },

  // 3. English
  {
    id: 'english',
    name: '영어',
    englishName: 'English',
    flag: '🇺🇸',
    learnerCount: '1.2억 명',
    badge: '글로벌 필수 1위',
    badgeColor: 'green',
    langCode: 'en-US',
    tags: ['global', 'career', 'travel', 'all'],
    koreanDifficulty: '보통',
    difficultyScore: 3,
    estimatedMonths: '6~12개월',
    speakerCount: '15억 명',
    countriesCount: '67개국 공식어',
    bestFor: '취업, 이직, 해외여행, 글로벌 비즈니스 등 실용성을 최우선으로 두는 분',
    practicalBenefit: '전 세계 인터넷 정보의 60% 이상이 영어입니다. 해외 어디서나 통하며 승진과 커리어 성장에 가장 결정적인 언어입니다.',
    greetingExample: {
      foreign: 'Hello! Nice to meet you!',
      korean: '안녕하세요! 만나서 반가워요!',
    },
    units: [
      {
        id: 'en-unit-1',
        number: 1,
        title: '자신감 넘치는 첫 대화',
        subtitle: '원어민과 자연스럽게 주고받는 기본 매너 표현',
        color: 'green',
        lessons: [
          {
            id: 'en-u1-l1',
            title: '첫인사와 자기소개',
            desc: '자연스러운 소개 문장 익히기',
            xpReward: 15,
            questions: [
              {
                id: 'en1-q1',
                type: 'multiple-choice',
                prompt: '처음 만났을 때 전하는 말 "Nice to meet you!"의 뜻은?',
                audioText: 'Nice to meet you!',
                langCode: 'en-US',
                correctAnswer: '만나서 반갑습니다!',
                options: ['오랜만이에요!', '만나서 반갑습니다!', '내일 봐요!', '도와주세요!'],
                explanation: '첫 대면에서 가장 격식 있고 친근한 인사 표현입니다.',
              },
              {
                id: 'en1-q2',
                type: 'word-bank',
                prompt: '문장을 완성하세요:',
                subPrompt: '"어떻게 지내고 계셨어요?"',
                audioText: 'How have you been',
                langCode: 'en-US',
                correctAnswer: 'How have you been',
                wordPool: ['How', 'have', 'you', 'been', 'what', 'do', 'are'],
                explanation: '근황을 물어볼 때 쓰는 완벽한 표현입니다.',
              },
              {
                id: 'en1-q3',
                type: 'listening',
                prompt: '음성을 듣고 알맞은 한국어 번역을 고르세요.',
                subPrompt: '🔊 소리를 듣고 뜻을 찾으세요',
                audioText: 'I would like to order a cup of coffee',
                langCode: 'en-US',
                correctAnswer: '커피 한 잔 주문하고 싶어요',
                options: ['커피를 마시러 갈래요?', '커피 한 잔 주문하고 싶어요', '물 좀 주시겠어요?', '계산서 부탁드려요'],
                explanation: 'I would like to ~ 는 공손하게 주문할 때 필수 표현입니다.',
              },
            ],
          },
        ],
      },
      {
        id: 'en-unit-2',
        number: 2,
        title: '여행 & 공항 / 호텔 체크인',
        subtitle: '호텔 예약 확인과 현지 길 찾기',
        color: 'blue',
        lessons: [
          {
            id: 'en-u2-l1',
            title: '호텔 체크인 대화',
            desc: 'I have a reservation 말하기',
            xpReward: 20,
            questions: [
              {
                id: 'en-u2-q1',
                type: 'multiple-choice',
                prompt: '"예약했습니다"를 영어로 말하면?',
                audioText: 'I have a reservation',
                langCode: 'en-US',
                correctAnswer: 'I have a reservation',
                options: ['I have a reservation', 'Where is the room', 'Can I leave my bags', 'What is the wifi'],
                explanation: '호텔 프런트에서 가장 먼저 건네는 문장입니다.',
              },
            ],
          },
        ],
      },
    ],
  },

  // 4. Italian (NEW)
  {
    id: 'italian',
    name: '이탈리아어',
    englishName: 'Italian',
    flag: '🇮🇹',
    learnerCount: '1,500만 명',
    badge: '로맨틱 & 미식 여행 1위',
    badgeColor: 'purple',
    langCode: 'it-IT',
    tags: ['travel', 'easy', 'all'],
    koreanDifficulty: '쉬움',
    difficultyScore: 2,
    estimatedMonths: '6~9개월',
    speakerCount: '8,500만 명',
    countriesCount: '이탈리아, 스위스, 산마리노',
    bestFor: '로마/피렌체/베네치아 여행, 에스프레소 & 파스타 미식, 예술 감상을 사랑하는 분',
    practicalBenefit: '음악 용어(피아노, 포르테)처럼 모음이 명확해 한국인이 발음하기 가장 아름답고 쉬운 유럽 언어입니다.',
    greetingExample: {
      foreign: 'Ciao! Come stai?',
      korean: '안녕! 어떻게 지내?',
    },
    units: [
      {
        id: 'it-unit-1',
        number: 1,
        title: '차오! 이탈리아 첫걸음',
        subtitle: '기본 인사와 정중한 감사의 표현',
        color: 'green',
        lessons: [
          {
            id: 'it-u1-l1',
            title: '차오 & 부온조르노',
            desc: 'Ciao와 Grazie mille',
            xpReward: 15,
            questions: [
              {
                id: 'it-q1',
                type: 'multiple-choice',
                prompt: '만날 때와 헤어질 때 모두 쓰는 "안녕 / 잘 가"는?',
                audioText: 'Ciao!',
                langCode: 'it-IT',
                correctAnswer: 'Ciao!',
                options: ['Grazie', 'Ciao!', 'Prego', 'Scusi'],
                explanation: 'Ciao(차오)는 이탈리아에서 가장 대중적인 인사입니다.',
              },
              {
                id: 'it-q2',
                type: 'word-bank',
                prompt: '문장을 완성하세요:',
                subPrompt: '"대단히 감사합니다."',
                audioText: 'Grazie mille',
                langCode: 'it-IT',
                correctAnswer: 'Grazie mille',
                wordPool: ['Grazie', 'mille', 'per', 'favore', 'buono'],
                explanation: 'Grazie mille는 "천 번 감사하다"는 뜻의 진심 어린 표현입니다.',
              },
              {
                id: 'it-q3',
                type: 'listening',
                prompt: '음성을 듣고 뜻을 고르세요.',
                subPrompt: '🔊 소리를 들어보세요',
                audioText: 'Un espresso, per favore',
                langCode: 'it-IT',
                correctAnswer: '에스프레소 한 잔 부탁합니다',
                options: ['계산서 주세요', '에스프레소 한 잔 부탁합니다', '물 좀 주세요', '화장실이 어디예요?'],
                explanation: '이탈리아 카페에서 가장 멋지게 주문하는 기본 문장입니다.',
              },
            ],
          },
        ],
      },
    ],
  },

  // 5. Vietnamese (NEW)
  {
    id: 'vietnamese',
    name: '베트남어',
    englishName: 'Vietnamese',
    flag: '🇻🇳',
    learnerCount: '1,200만 명',
    badge: '한국인 동남아 여행 1위',
    badgeColor: 'amber',
    langCode: 'vi-VN',
    tags: ['travel', 'career', 'all'],
    koreanDifficulty: '보통',
    difficultyScore: 3,
    estimatedMonths: '6~10개월',
    speakerCount: '1억 명',
    countriesCount: '베트남 및 동남아',
    bestFor: '다낭, 나트랑, 호치민 여행과 급성장하는 베트남 비즈니스 진출을 준비하는 분',
    practicalBenefit: '한자 어휘가 60% 이상이라 단어 습득이 매우 빠르며, 로컬 야시장과 마사지샵에서 흥정할 때 실질적인 여행 경비를 절약해 줍니다.',
    greetingExample: {
      foreign: 'Xin chào!',
      korean: '안녕하세요!',
    },
    units: [
      {
        id: 'vi-unit-1',
        number: 1,
        title: '신짜오! 베트남어 첫걸음',
        subtitle: '기본 인사와 감사의 말',
        color: 'green',
        lessons: [
          {
            id: 'vi-u1-l1',
            title: '신짜오와 깜언',
            desc: 'Xin chào와 Cảm ơn',
            xpReward: 15,
            questions: [
              {
                id: 'vi-q1',
                type: 'multiple-choice',
                prompt: '베트남어의 기본 만남 인사 "Xin chào (신짜오)"의 뜻은?',
                audioText: 'Xin chào',
                langCode: 'vi-VN',
                correctAnswer: '안녕하세요!',
                options: ['감사합니다', '안녕하세요!', '잘 자요', '얼마예요?'],
                explanation: 'Xin chào는 베트남 전역에서 통하는 기본 인사입니다.',
              },
              {
                id: 'vi-q2',
                type: 'word-bank',
                prompt: '문장을 완성하세요:',
                subPrompt: '"대단히 감사합니다!"',
                audioText: 'Cảm ơn nhiều',
                langCode: 'vi-VN',
                correctAnswer: 'Cảm ơn nhiều',
                wordPool: ['Cảm', 'ơn', 'nhiều', 'chào', 'tạm', 'biệt'],
                explanation: 'Cảm ơn(감사합니다) + nhiều(많이).',
              },
              {
                id: 'vi-q3',
                type: 'listening',
                prompt: '음성을 듣고 뜻을 맞히세요.',
                subPrompt: '🔊 소리를 듣고 확인하세요',
                audioText: 'Bao nhiêu tiền',
                langCode: 'vi-VN',
                correctAnswer: '얼마인가요?',
                options: ['맛있어요', '얼마인가요?', '화장실 어디예요?', '안녕하세요'],
                explanation: 'Bao nhiêu tiền(바오 니에우 띠엔)은 시장이나 식당에서 가격을 물어볼 때 필수입니다.',
              },
            ],
          },
        ],
      },
    ],
  },

  // 6. Chinese
  {
    id: 'chinese',
    name: '중국어',
    englishName: 'Chinese',
    flag: '🇨🇳',
    learnerCount: '2,100만 명',
    badge: '비즈니스 파워',
    badgeColor: 'red',
    langCode: 'zh-CN',
    tags: ['career', 'global', 'all'],
    koreanDifficulty: '보통',
    difficultyScore: 3,
    estimatedMonths: '8~12개월',
    speakerCount: '13억 명',
    countriesCount: '중국, 대만, 싱가포르 등',
    bestFor: '무역, 금융, IT, 제조 비즈니스와 아시아 경제 네트워크 확장을 원하는 분',
    practicalBenefit: '한자 문화권인 한국인에게 어휘 유추가 매우 유리합니다. 성조만 마스터하면 문법이 복잡하지 않아 실용 회화에 강합니다.',
    greetingExample: {
      foreign: '你好！(Nǐ hǎo!)',
      korean: '안녕하세요!',
    },
    units: [
      {
        id: 'zh-unit-1',
        number: 1,
        title: '성조와 첫마디 중국어',
        subtitle: '기본 만남과 헤어짐의 표현',
        color: 'green',
        lessons: [
          {
            id: 'zh-u1-l1',
            title: '니하오 첫걸음',
            desc: '你好 와 谢谢',
            xpReward: 15,
            questions: [
              {
                id: 'zh-q1',
                type: 'multiple-choice',
                prompt: '"你好！(Nǐ hǎo)"의 뜻은?',
                audioText: '你好',
                langCode: 'zh-CN',
                correctAnswer: '안녕하세요!',
                options: ['감사합니다', '안녕하세요!', '잘 가요', '괜찮아요'],
                explanation: '중국어의 가장 대표적인 인사말입니다.',
              },
              {
                id: 'zh-q2',
                type: 'word-bank',
                prompt: '문장을 완성하세요:',
                subPrompt: '"정말 감사합니다!"',
                audioText: '非常 感谢 你',
                langCode: 'zh-CN',
                correctAnswer: '非常 感谢 你',
                wordPool: ['非常', '感谢', '你', '不客气', '对不起'],
                explanation: '非常感谢你는 매우 감사하다는 뜻입니다.',
              },
            ],
          },
        ],
      },
    ],
  },

  // 7. French
  {
    id: 'french',
    name: '프랑스어',
    englishName: 'French',
    flag: '🇫🇷',
    learnerCount: '3,200만 명',
    badge: '문화 & 예술 선호 1위',
    badgeColor: 'purple',
    langCode: 'fr-FR',
    tags: ['travel', 'career', 'all'],
    koreanDifficulty: '도전적',
    difficultyScore: 4,
    estimatedMonths: '9~14개월',
    speakerCount: '3억 명',
    countriesCount: '29개국 공식어',
    bestFor: '패션, 와인, 요리, 외교, 유럽 인문학 여행을 꿈꾸는 분',
    practicalBenefit: 'UN, 올림픽, 국제기구 공식 언어이자 서아프리카 및 캐나다 등 세계 각지에서 쓰입니다. 매혹적인 억양과 지적 교양을 자랑합니다.',
    greetingExample: {
      foreign: 'Bonjour! Comment allez-vous?',
      korean: '안녕하세요! 어떻게 지내세요?',
    },
    units: [
      {
        id: 'fr-unit-1',
        number: 1,
        title: '봉주르! 파리지앵 첫걸음',
        subtitle: '기본 인사와 정중한 에티켓',
        color: 'green',
        lessons: [
          {
            id: 'fr-u1-l1',
            title: '에티켓 기본 인사',
            desc: 'Bonjour 와 Merci',
            xpReward: 15,
            questions: [
              {
                id: 'fr-q1',
                type: 'multiple-choice',
                prompt: '"Bonjour !"의 뜻은?',
                audioText: 'Bonjour',
                langCode: 'fr-FR',
                correctAnswer: '좋은 아침 / 안녕하세요!',
                options: ['잘 자요', '좋은 아침 / 안녕하세요!', '미안해요', '잘 가요'],
                explanation: '프랑스에서 사람을 만났을 때 건네는 가장 기본적인 낮 인사입니다.',
              },
              {
                id: 'fr-q2',
                type: 'listening',
                prompt: '음성을 듣고 뜻을 맞히세요.',
                subPrompt: '🔊 음성을 들어보세요',
                audioText: 'Merci beaucoup',
                langCode: 'fr-FR',
                correctAnswer: '대단히 감사합니다',
                options: ['천만에요', '대단히 감사합니다', '실례합니다', '안녕하세요'],
                explanation: 'Merci beaucoup는 "정말 감사합니다"라는 뜻입니다.',
              },
            ],
          },
        ],
      },
    ],
  },

  // 8. German
  {
    id: 'german',
    name: '독일어',
    englishName: 'German',
    flag: '🇩🇪',
    learnerCount: '1,800만 명',
    badge: '유럽 경제 & 공학 1위',
    badgeColor: 'yellow',
    langCode: 'de-DE',
    tags: ['career', 'easy', 'all'],
    koreanDifficulty: '도전적',
    difficultyScore: 4,
    estimatedMonths: '9~12개월',
    speakerCount: '1억 3,000만 명',
    countriesCount: '독일, 오스트리아, 스위스',
    bestFor: '공학, 클래식 음악, 철학, 유럽 유학 및 취업을 준비하는 분',
    practicalBenefit: '유럽 최대 경제 대국 독일의 모국어입니다. 영어와 게르만어 계열로 어휘 연계가 높으며 체계적이고 논리적인 문법 구조를 가집니다.',
    greetingExample: {
      foreign: 'Guten Tag!',
      korean: '좋은 날이에요! (안녕하세요)',
    },
    units: [
      {
        id: 'de-unit-1',
        number: 1,
        title: '구텐 탁! 독일어 첫걸음',
        subtitle: '기본 인사와 독일식 에티켓',
        color: 'green',
        lessons: [
          {
            id: 'de-u1-l1',
            title: '기초 인사법',
            desc: 'Guten Tag와 Danke schön',
            xpReward: 15,
            questions: [
              {
                id: 'de-q1',
                type: 'multiple-choice',
                prompt: '"Guten Tag!"의 뜻은?',
                audioText: 'Guten Tag',
                langCode: 'de-DE',
                correctAnswer: '안녕하세요 / 좋은 날입니다!',
                options: ['잘 자요', '안녕하세요 / 좋은 날입니다!', '미안해요', '실례합니다'],
                explanation: '독일어권에서 낮에 격식 있게 나누는 대표 인사입니다.',
              },
              {
                id: 'de-q2',
                type: 'listening',
                prompt: '음성을 듣고 뜻을 찾으세요.',
                subPrompt: '🔊 음성을 들어보세요',
                audioText: 'Danke schön',
                langCode: 'de-DE',
                correctAnswer: '대단히 감사합니다',
                options: ['천만에요', '대단히 감사합니다', '내일 봐요', '환영합니다'],
                explanation: 'Danke schön은 독일어로 "정말 감사합니다"입니다.',
              },
            ],
          },
        ],
      },
    ],
  },
];
