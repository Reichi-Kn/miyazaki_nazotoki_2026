// ============================================================
//  story.js  ―  ストーリーデータファイル
//  ✏️  ここだけ編集すればセリフ・演出を変えられます！
// ============================================================

const STORY = {

  characters: {
    mystery: {
      name:   '???',          // 最初は名前を隠す
      avatar: 'chara_sennin.png',
      emoji:  '✨',
      color:  '#aaaaaa',
    },
    kamisama: {
      name:   '神様',
      avatar: 'chara_sennin.png',
      emoji:  '🌟',
      color:  '#FFD700',
    },
    achan: {
      name:   'あーちゃん',
      avatar: 'chara_achan_back.png',
      emoji:  '🌸',
      color:  '#E8A020',
    },
    achan_guts: {
      name:   'あーちゃん',
      avatar: 'chara_achan_guts.png',
      emoji:  '🌸',
      color:  '#E8A020',
    },
    takun: {
      name:   'たーくん',
      avatar: 'chara_takun_guts.png',
      emoji:  '🔥',
      color:  '#E85020',
    },
  },

  // ----------------------------------------------------------
  //  オープニング
  //  type: 'narration' | 'reveal' | 'dialog' | 'choice'
  //  reveal → 神様が中央にフワッと光とともに現れる特殊演出
  // ----------------------------------------------------------
  opening: [
    // シーン0: ナレーション
    {
      type: 'narration',
      bg:   'bg_miyazaki.jpg',
      text: '🌴  伝説の黄金のマンゴーが眠る地\n　　　　　　　― 宮 崎 ―',
    },
    // シーン1: 神様が光とともに登場（真っ暗→フワッ）
    {
      type:      'reveal',
      bg:        'bg_cave.jpg',
      character: 'mystery',
    },
    // シーン2: ???のまま話しかける
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'mystery',
      side:      'left',
      text:      'ずっと待っておったぞ……\nようやく来たか。',
    },
    // シーン3: 選択肢（どちらも名前を聞く流れ）
    {
      type: 'choice',
      bg:   'bg_cave.jpg',
      choices: [
        { label: 'あなたは誰ですか？',    next: 4 },
        { label: 'だれ……？🤔',           next: 5 },
      ],
    },
    // シーン4: 「あなたは誰」ルート → 神様と名乗る
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',   // ← ここで名前が神様に変わる
      side:      'left',
      revealName: true,        // エンジン側でアニメONにするフラグ
      text:      'わしか……宮崎に宿る神様じゃ🌟\n黄金のマンゴーへ導く者よ。',
      next:      6,
    },
    // シーン5: 「だれ」ルート → 神様と名乗る
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      revealName: true,
      text:      'ふふ……わしは神様じゃよ🌟\n宮崎の地に宿る者じゃ。',
      next:      6,
    },
    // シーン6: 合流・本題へ
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      '黄金のマンゴーを手に入れたくば\n謎を解くしかないぞ。',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'さあ……冒険のはじまりじゃ！\n3周年の旅を楽しんでおくれ🥭✨',
    },
  ],

  startButtonText: '冒険をはじめる ✦',

  // ----------------------------------------------------------
  //  Mission2クリア後・たーくん登場
  // ----------------------------------------------------------
  mission2end: [
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'おお……気配を感じるぞ。\n誰かがやってくる！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      'おれも来たぞ〜！！🔥\nあーちゃん、置いていくなよ！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'ほほ……仲間が現れたようじゃ。\nこれで旅はより心強くなったな。',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      '一緒にマンゴー探そうぜ！💪\n絶対見つけてみせる！',
    },
  ],

  mission2endButtonText: '次のミッションへ ✦',

  // ----------------------------------------------------------
  //  Mission3クリア後・花火アニメ（夜景背景＋花火CSS）
  // ----------------------------------------------------------
  mission3end: [
    {
      type:      'fireworks',   // ← 花火打ち上げ特殊演出
      bg:        'bg_night.jpg',
      text:      '🎆  花火……きれいだなぁ……',
    },
    {
      type:      'dialog',
      bg:        'bg_night.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'わぁ〜！！花火きれい〜〜！！🎆✨\nすごいすごい！！',
    },
    {
      type:      'dialog',
      bg:        'bg_night.jpg',
      character: 'takun',
      side:      'left',
      text:      'ほんとだ……めちゃくちゃきれいじゃん🎇\nあーちゃんと見れてよかった〜',
    },
    {
      type:      'dialog',
      bg:        'bg_night.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'ずっと見てたい……🥺💛',
    },
    {
      type:      'dialog',
      bg:        'bg_night.jpg',
      character: 'takun',
      side:      'left',
      text:      'あ！！！\nってか黄金のマンゴー探すの忘れてたーーー！！！😱',
    },
    {
      type:      'dialog',
      bg:        'bg_night.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'やばい！！まだ見つけてないじゃん！！💦\nはやくはやく〜！！',
    },
  ],

  mission3endButtonText: '急いで探しに行く！ 🥭',

  // ----------------------------------------------------------
  //  Mission4クリア後・みらいちずアニメ（3人）
  // ----------------------------------------------------------
  mission4end: [
    {
      type: 'narration',
      bg:   'bg_jungle.jpg',
      text: '🗺️  みらいちずを手に入れた……！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'おお……それが「みらいちず」じゃ！\nその地図を使えば、黄金のマンゴーの場所がわかるぞ。',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      'マジか！！じゃあもうすぐマンゴーゲットじゃん！！🔥',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'やった〜！！地図使えばいいんだね！！🗺️💪',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'さあ……みらいちずを使うのじゃ。\n黄金のマンゴーはもうすぐそこじゃぞ🥭✨',
    },
  ],

  mission4endButtonText: 'みらいちずを使う！ 🗺️',

  // ----------------------------------------------------------
  //  エンディング
  // ----------------------------------------------------------
  ending: [
    {
      type: 'narration',
      bg:   'bg_miyazaki.jpg',
      text: '🥭  ついに……黄金のマンゴーを手に入れた！',
    },
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'よくぞ辿り着いた……\n3年分の絆が、マンゴーを引き寄せたのじゃ。',
    },
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'takun',
      side:      'right',
      text:      'あーちゃんすごすぎ！！🔥\n謎全部解いちゃったじゃん！',
    },
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'えへへ……やったー！！🌸💪',
    },
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'kamisama',
      side:      'left',
      text:      '3周年、おめでとう。\nこれからも二人で、素敵な旅を続けるのじゃ✨',
    },
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'takun',
      side:      'right',
      text:      '3年間ありがとう！\nこれからもよろしく🧡',
    },
  ],

  endingButtonText: 'ありがとう ✦',
};
