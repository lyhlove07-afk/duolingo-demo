export interface DialogueChoice {
  id: string;
  foreignText: string;
  koreanText: string;
  audioText: string;
  characterReaction: string;
  reactionMood: 'happy' | 'smile' | 'amazed';
  scoreReward: number;
}

export interface DialogueTurn {
  id: string;
  speaker: string;
  speakerRole: string;
  speakerAvatar: string;
  foreignSpeech: string;
  koreanTranslation: string;
  audioText: string;
  langCode: string;
  choices: DialogueChoice[];
}

export interface DialogueScenario {
  id: string;
  title: string;
  subtitle: string;
  category: 'cafe' | 'travel' | 'food' | 'street';
  language: string;
  langCode: string;
  flag: string;
  characterName: string;
  characterAvatar: string;
  location: string;
  xpReward: number;
  turns: DialogueTurn[];
}

export const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  // 1. Tokyo Ramen Shop
  {
    id: 'tokyo-ramen',
    title: '도쿄 심야 라멘집에서 주문하기',
    subtitle: '활기찬 이자카야 라멘 가게에서 자리 잡고 취향에 맞게 주문하기',
    category: 'food',
    language: '일본어',
    langCode: 'ja-JP',
    flag: '🇯🇵',
    characterName: '켄지 (Kenji)',
    characterAvatar: '🍜',
    location: '도쿄 신주쿠 골목 라멘집',
    xpReward: 25,
    turns: [
      {
        id: 't1',
        speaker: '켄지 (점장)',
        speakerRole: '라멘 장인',
        speakerAvatar: '👨‍🍳',
        foreignSpeech: 'いらっしゃいませ！何名様ですか？',
        koreanTranslation: '어서오세요! 몇 분이신가요?',
        audioText: 'いらっしゃいませ！何名様ですか？',
        langCode: 'ja-JP',
        choices: [
          {
            id: 'c1-1',
            foreignText: '一人です！カウンター席は ありますか？',
            koreanText: '혼자입니다! 카운터석 있나요?',
            audioText: '一人です！カウンター席は ありますか？',
            characterReaction: 'はい、どうぞ！奥のカウンター席へご案内します！ (네, 어서오세요! 안쪽 카운터석으로 안내해 드릴게요!)',
            reactionMood: 'happy',
            scoreReward: 10,
          },
          {
            id: 'c1-2',
            foreignText: '二人です、テーブル席で お願いします。',
            koreanText: '두 명입니다, 테이블석으로 부탁해요.',
            audioText: '二人です、テーブル席で お願いします。',
            characterReaction: 'かしこまりました！こちらのテーブルへどうぞ！ (알겠습니다! 이쪽 테이블로 앉으세요!)',
            reactionMood: 'smile',
            scoreReward: 10,
          },
        ],
      },
      {
        id: 't2',
        speaker: '켄지 (점장)',
        speakerRole: '라멘 장인',
        speakerAvatar: '👨‍🍳',
        foreignSpeech: 'ご注文はお決まりですか？おすすめは特製醤油ラーメンです！',
        koreanTranslation: '주문하시겠어요? 추천 메뉴는 특제 간장 라멘입니다!',
        audioText: 'ご注文はお決まりですか？おすすめは特製醤油ラーメンです！',
        langCode: 'ja-JP',
        choices: [
          {
            id: 'c2-1',
            foreignText: 'おすすめの 醤油ラーメンを 一つ お願いします！',
            koreanText: '추천해주신 간장 라멘 하나 부탁드립니다!',
            audioText: 'おすすめの 醤油ラーメンを 一つ お願いします！',
            characterReaction: 'ありがとうございます！麺の硬さはどうなさいますか？ (감사합니다! 면 익힘 정도는 어떻게 해드릴까요?)',
            reactionMood: 'amazed',
            scoreReward: 10,
          },
          {
            id: 'c2-2',
            foreignText: '豚骨ラーメンに 煮卵を トッピングしてください。',
            koreanText: '돈코츠 라멘에 맛달걀 토핑 추가해주세요.',
            audioText: '豚骨ラーメンに 煮卵を トッピングしてください。',
            characterReaction: '最高の組み合わせですね！すぐにお作りします！ (최고의 조합이네요! 바로 만들어 드릴게요!)',
            reactionMood: 'happy',
            scoreReward: 10,
          },
        ],
      },
      {
        id: 't3',
        speaker: '켄지 (점장)',
        speakerRole: '라멘 장인',
        speakerAvatar: '👨‍🍳',
        foreignSpeech: 'お待たせしました！熱いのでお気をつけて。ごゆっくりどうぞ！',
        koreanTranslation: '기다리셨습니다! 뜨거우니 조심하세요. 맛있게 드세요!',
        audioText: 'お待たせしました！熱いのでお気をつけて。ごゆっくりどうぞ！',
        langCode: 'ja-JP',
        choices: [
          {
            id: 'c3-1',
            foreignText: 'わあ、美味しそう！いただきます！',
            koreanText: '와아, 맛있겠다! 잘 먹겠습니다!',
            audioText: 'わあ、美味しそう！いただきます！',
            characterReaction: 'ありがとうございます！スープも全部楽しんでくださいね！ (감사합니다! 국물도 끝까지 맛있게 드세요!)',
            reactionMood: 'happy',
            scoreReward: 10,
          },
          {
            id: 'c3-2',
            foreignText: 'ありがとうございます！水のおかわりも いただけますか？',
            koreanText: '감사합니다! 물 리필도 부탁드릴 수 있나요?',
            audioText: 'ありがとうございます！水のおかわりも いただけますか？',
            characterReaction: 'はい、冷たいお水どうぞ！ (네, 시원한 물 여기 있습니다!)',
            reactionMood: 'smile',
            scoreReward: 10,
          },
        ],
      },
    ],
  },

  // 2. Barcelona Tapas Bar
  {
    id: 'barcelona-tapas',
    title: '바르셀로나 테라스 바에서 타파스 주문',
    subtitle: '스페인 현지 바리스타와 유쾌하게 인사하고 샹그리아 주문하기',
    category: 'cafe',
    language: '스페인어',
    langCode: 'es-ES',
    flag: '🇪🇸',
    characterName: '카를로스 (Carlos)',
    characterAvatar: '🍷',
    location: '바르셀로나 고딕 지구 야외 테라스',
    xpReward: 25,
    turns: [
      {
        id: 'es-t1',
        speaker: '카를로스',
        speakerRole: '타파스 서버',
        speakerAvatar: '🕺',
        foreignSpeech: '¡Hola! Buenas tardes, ¿tienes reserva o prefieres la terraza?',
        koreanTranslation: '안녕하세요! 좋은 오후예요, 예약하셨나요 아니면 테라스로 앉으시겠어요?',
        audioText: '¡Hola! Buenas tardes, ¿tienes reserva o prefieres la terraza?',
        langCode: 'es-ES',
        choices: [
          {
            id: 'es-c1-1',
            foreignText: '¡Buenas tardes! La terraza, por favor, si hay una mesa libre.',
            koreanText: '좋은 오후예요! 빈자리 있다면 테라스로 부탁드려요.',
            audioText: '¡Buenas tardes! La terraza por favor si hay una mesa libre.',
            characterReaction: '¡Claro que sí! Esta mesa al sol es perfecta para ti. (네 물론이죠! 햇살 비치는 이 자리가 딱 좋겠네요.)',
            reactionMood: 'happy',
            scoreReward: 10,
          },
          {
            id: 'es-c1-2',
            foreignText: 'Hola, somos dos personas. ¿Podemos sentarnos aquí?',
            koreanText: '안녕하세요, 2명입니다. 여기 앉아도 될까요?',
            audioText: 'Hola somos dos personas. ¿Podemos sentarnos aquí?',
            characterReaction: '¡Por supuesto! Bienvenidos. (그럼요! 환영합니다.)',
            reactionMood: 'smile',
            scoreReward: 10,
          },
        ],
      },
      {
        id: 'es-t2',
        speaker: '카를로스',
        speakerRole: '타파스 서버',
        speakerAvatar: '🕺',
        foreignSpeech: '¿Qué os gustaría tomar de bebida para empezar?',
        koreanTranslation: '시작으로 마실 것은 무엇으로 준비해 드릴까요?',
        audioText: '¿Qué os gustaría tomar de bebida para empezar?',
        langCode: 'es-ES',
        choices: [
          {
            id: 'es-c2-1',
            foreignText: 'Una copa de sangría y una cerveza fría, por favor.',
            koreanText: '샹그리아 한 잔이랑 시원한 맥주 한 잔 부탁해요.',
            audioText: 'Una copa de sangría y una cerveza fría por favor.',
            characterReaction: '¡Excelente elección! La sangría de la casa es espectacular. (훌륭한 선택입니다! 하우스 샹그리아가 일품이죠.)',
            reactionMood: 'amazed',
            scoreReward: 10,
          },
          {
            id: 'es-c2-2',
            foreignText: 'Agua con gas y un café con leche, por favor.',
            koreanText: '탄산수와 카페라테 한 잔 주세요.',
            audioText: 'Agua con gas y un café con leche por favor.',
            characterReaction: '¡Marchando enseguida! (곧장 가져다드릴게요!)',
            reactionMood: 'smile',
            scoreReward: 10,
          },
        ],
      },
      {
        id: 'es-t3',
        speaker: '카를로스',
        speakerRole: '타파스 서버',
        speakerAvatar: '🕺',
        foreignSpeech: 'Aquí tenéis las bebidas. ¿Habéis elegido alguna tapa para picar?',
        koreanTranslation: '음료 나왔습니다. 함께 드실 타파스도 정하셨나요?',
        audioText: 'Aquí tenéis las bebidas. ¿Habéis elegido alguna tapa para picar?',
        langCode: 'es-ES',
        choices: [
          {
            id: 'es-c3-1',
            foreignText: 'Unas patatas bravas y una ración de jamón ibérico, por favor.',
            koreanText: '파타타스 브라바스와 이베리코 하몽 한 접시 주세요.',
            audioText: 'Unas patatas bravas y una ración de jamón ibérico por favor.',
            characterReaction: '¡Lo más auténtico de España! Os va a encantar. (스페인에서 가장 정통적인 메뉴죠! 정말 맘에 드실 거예요.)',
            reactionMood: 'happy',
            scoreReward: 10,
          },
          {
            id: 'es-c3-2',
            foreignText: '¿Cuál es la especialidad del chef hoy?',
            koreanText: '오늘 셰프 추천 스페셜 메뉴는 무엇인가요?',
            audioText: '¿Cuál es la especialidad del chef hoy?',
            characterReaction: '¡El pulpo a la gallega está fresquísimo hoy! (오늘 갈리시아 문어 요리가 아주 신선합니다!)',
            reactionMood: 'amazed',
            scoreReward: 10,
          },
        ],
      },
    ],
  },

  // 3. New York Soho Cafe
  {
    id: 'nyc-cafe',
    title: '뉴욕 소호 카페에서 베이글과 커피 주문',
    subtitle: '힙한 뉴요커 바리스타와 자연스럽게 스몰토크하며 커스텀 주문하기',
    category: 'cafe',
    language: '영어',
    langCode: 'en-US',
    flag: '🇺🇸',
    characterName: '에마 (Emma)',
    characterAvatar: '☕',
    location: '뉴욕 소호 브로드웨이 카페',
    xpReward: 25,
    turns: [
      {
        id: 'en-t1',
        speaker: '에마',
        speakerRole: '소호 바리스타',
        speakerAvatar: '👩‍🦰',
        foreignSpeech: "Good morning! How are you doing today? What can I get started for you?",
        koreanTranslation: '좋은 아침이에요! 오늘 기분 어떠세요? 어떤 걸로 주문 도와드릴까요?',
        audioText: "Good morning! How are you doing today? What can I get started for you?",
        langCode: 'en-US',
        choices: [
          {
            id: 'en-c1-1',
            foreignText: "I'm doing great, thank you! Could I get an iced vanilla latte, please?",
            koreanText: '아주 좋아요, 감사해요! 아이스 바닐라 라테 하나 부탁드릴 수 있을까요?',
            audioText: "I'm doing great, thank you! Could I get an iced vanilla latte, please?",
            characterReaction: "Awesome! What kind of milk do you prefer? Oat, almond, or whole milk? (좋아요! 어떤 우유로 해드릴까요? 오트, 아몬드, 일반 우유?)",
            reactionMood: 'happy',
            scoreReward: 10,
          },
          {
            id: 'en-c1-2',
            foreignText: "Hi! Just a large cold brew for here, please.",
            koreanText: '안녕하세요! 매장에서 마실 콜드브루 라지 사이즈 하나요.',
            audioText: "Hi! Just a large cold brew for here, please.",
            characterReaction: "You got it! Do you have room for cream or syrup? (알겠습니다! 크림이나 시럽 넣어드릴까요?)",
            reactionMood: 'smile',
            scoreReward: 10,
          },
        ],
      },
      {
        id: 'en-t2',
        speaker: '에마',
        speakerRole: '소호 바리스타',
        speakerAvatar: '👩‍🦰',
        foreignSpeech: "Great choice! Would you like a toasted bagel or bakery treat with that?",
        koreanTranslation: '좋은 선택이에요! 따뜻하게 구운 베이글이나 베이커리 곁들이시겠어요?',
        audioText: "Great choice! Would you like a toasted bagel or bakery treat with that?",
        langCode: 'en-US',
        choices: [
          {
            id: 'en-c2-1',
            foreignText: "Yes! A toasted everything bagel with scallion cream cheese, please.",
            koreanText: '네! 파 크림치즈 바른 에브리띵 베이글 구워서 부탁드려요.',
            audioText: "Yes! A toasted everything bagel with scallion cream cheese, please.",
            characterReaction: "That's our absolute bestseller! You're going to love it. (우리 가게 최고 인기 메뉴예요! 완전 맘에 드실 거예요.)",
            reactionMood: 'amazed',
            scoreReward: 10,
          },
          {
            id: 'en-c2-2',
            foreignText: "Just the coffee for now, thank you so much!",
            koreanText: '지금은 커피만 할게요, 정말 감사합니다!',
            audioText: "Just the coffee for now, thank you so much!",
            characterReaction: "No problem at all! Can I grab a name for the cup? (전혀 문제없죠! 컵에 적을 이름 알려주시겠어요?)",
            reactionMood: 'smile',
            scoreReward: 10,
          },
        ],
      },
    ],
  },

  // 4. Rome Gelateria
  {
    id: 'rome-gelato',
    title: '로마 판테온 옆 젤라토 가게에서 주문',
    subtitle: '달콤한 젤라토 맛을 추천받고 콘에 담아 이탈리아어로 맛보기',
    category: 'travel',
    language: '이탈리아어',
    langCode: 'it-IT',
    flag: '🇮🇹',
    characterName: '마테오 (Matteo)',
    characterAvatar: '🍨',
    location: '로마 판테온 근처 수제 젤라테리아',
    xpReward: 25,
    turns: [
      {
        id: 'it-t1',
        speaker: '마테오',
        speakerRole: '젤라토 장인',
        speakerAvatar: '👨‍🎨',
        foreignSpeech: 'Ciao! Benvenuto! Vuoi una coppetta o un cono?',
        koreanTranslation: '안녕! 어서 와! 컵으로 줄까, 콘으로 줄까?',
        audioText: 'Ciao! Benvenuto! Vuoi una coppetta o un cono?',
        langCode: 'it-IT',
        choices: [
          {
            id: 'it-c1-1',
            foreignText: 'Ciao! Un cono medio con due gusti, per favore.',
            koreanText: '안녕! 콘 중간 사이즈에 두 가지 맛으로 부탁해.',
            audioText: 'Ciao! Un cono medio con due gusti, per favore.',
            characterReaction: 'Perfetto! Quali gusti preferisci oggi? (완벽해! 오늘 어떤 맛으로 골라볼래?)',
            reactionMood: 'happy',
            scoreReward: 10,
          },
          {
            id: 'it-c1-2',
            foreignText: 'Vorrei una coppetta grande, per favore.',
            koreanText: '컵 큰 사이즈로 부탁합니다.',
            audioText: 'Vorrei una coppetta grande, per favore.',
            characterReaction: 'Ottima scelta per una giornata calda! (더운 날에 딱 좋은 선택이야!)',
            reactionMood: 'smile',
            scoreReward: 10,
          },
        ],
      },
      {
        id: 'it-t2',
        speaker: '마테오',
        speakerRole: '젤라토 장인',
        speakerAvatar: '👨‍🎨',
        foreignSpeech: 'Ti consiglio il nostro pistacchio di Sicilia e il cioccolato fondente!',
        koreanTranslation: '우리 시칠리아 피스타치오와 다크 초콜릿 맛을 강력 추천해!',
        audioText: 'Ti consiglio il nostro pistacchio di Sicilia e il cioccolato fondente!',
        langCode: 'it-IT',
        choices: [
          {
            id: 'it-c2-1',
            foreignText: 'Sì, pistacchio e cioccolato, per favore! E con panna sopra!',
            koreanText: '응, 피스타치오랑 초콜릿으로 부탁해! 위에 생크림도 얹어줘!',
            audioText: 'Sì, pistacchio e cioccolato, per favore! E con panna sopra!',
            characterReaction: 'Bravissimo! Con panna è la vera tradizione romana! (최고야! 생크림 얹는 게 로마의 진짜 전통이지!)',
            reactionMood: 'amazed',
            scoreReward: 10,
          },
          {
            id: 'it-c2-2',
            foreignText: 'Posso assaggiare prima il gusto limone?',
            koreanText: '레몬 맛 한 스푼 먼저 맛볼 수 있을까?',
            audioText: 'Posso assaggiare prima il gusto limone?',
            characterReaction: 'Ma certo! Ecco a te, freschissimo! (물론이지! 여기 맛봐, 아주 상큼해!)',
            reactionMood: 'smile',
            scoreReward: 10,
          },
        ],
      },
    ],
  },

  // 5. Da Nang Night Market
  {
    id: 'danang-market',
    title: '다낭 한시장 야시장에서 망고 쇼핑 & 흥정',
    subtitle: '친절한 베트남 과일 상인과 달콤한 망고를 고르고 유쾌하게 가격 흥정하기',
    category: 'travel',
    language: '베트남어',
    langCode: 'vi-VN',
    flag: '🇻🇳',
    characterName: '린 (Linh)',
    characterAvatar: '🥭',
    location: '다낭 한시장 로컬 과일 코너',
    xpReward: 25,
    turns: [
      {
        id: 'vi-t1',
        speaker: '린',
        speakerRole: '과일 상인',
        speakerAvatar: '👩‍🌾',
        foreignSpeech: 'Xin chào bạn! Xoài cát Hòa Lộc ngọt lịm, mua ăn thử nhé?',
        koreanTranslation: '안녕하세요 친구! 화록 망고가 꿀처럼 달아요, 먹어보고 살래요?',
        audioText: 'Xin chào bạn! Xoài cát Hòa Lộc ngọt lịm, mua ăn thử nhé?',
        langCode: 'vi-VN',
        choices: [
          {
            id: 'vi-c1-1',
            foreignText: 'Xin chào chị! Một ký xoài này bao nhiêu tiền?',
            koreanText: '안녕하세요 언니! 이 망고 1킬로에 얼마예요?',
            audioText: 'Xin chào chị! Một ký xoài này bao nhiêu tiền?',
            characterReaction: 'Bốn mươi ngàn một ký thôi, rất rẻ và ngọt lắm! (1킬로에 4만 동(약 2,100원)뿐이에요, 엄청 달아요!)',
            reactionMood: 'happy',
            scoreReward: 10,
          },
          {
            id: 'vi-c1-2',
            foreignText: 'Cho em ăn thử một miếng được không?',
            koreanText: '한 조각 맛봐도 될까요?',
            audioText: 'Cho em ăn thử một miếng được không?',
            characterReaction: 'Được chứ! Ăn thử đi, ngon tuyệt vời! (그럼요! 먹어봐요, 끝내줘요!)',
            reactionMood: 'smile',
            scoreReward: 10,
          },
        ],
      },
      {
        id: 'vi-t2',
        speaker: '린',
        speakerRole: '과일 상인',
        speakerAvatar: '👩‍🌾',
        foreignSpeech: 'Bạn mua hai ký nhé, mình gọt sẵn và cho đá lạnh luôn!',
        koreanTranslation: '2킬로 사가세요, 먹기 좋게 바로 깎아서 얼음 포장도 해줄게요!',
        audioText: 'Bạn mua hai ký nhé, mình gọt sẵn và cho đá lạnh luôn!',
        langCode: 'vi-VN',
        choices: [
          {
            id: 'vi-c2-1',
            foreignText: 'Bớt một chút nhé chị, hai ký bảy mươi ngàn được không?',
            koreanText: '조금만 깎아주세요, 2킬로에 7만 동 어때요?',
            audioText: 'Bớt một chút nhé chị, hai ký bảy mươi ngàn được không?',
            characterReaction: 'Haha bạn khéo trả giá quá! Thôi được rồi, bán cho bạn mở hàng! (하하 흥정 잘하시네! 좋아요, 첫 손님이니까 해줄게요!)',
            reactionMood: 'amazed',
            scoreReward: 10,
          },
          {
            id: 'vi-c2-2',
            foreignText: 'Vâng, gọt sẵn giúp em nhé! Cảm ơn chị nhiều!',
            koreanText: '네, 먹기 편하게 깎아주세요! 정말 감사해요!',
            audioText: 'Vâng, gọt sẵn giúp em nhé! Cảm ơn chị nhiều!',
            characterReaction: 'Xong ngay đây! Chúc bạn du lịch Đà Nẵng vui vẻ! (금방 해드릴게요! 다낭 여행 즐겁게 하세요!)',
            reactionMood: 'happy',
            scoreReward: 10,
          },
        ],
      },
    ],
  },
];
