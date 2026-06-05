// ============================================================
//  story.js  ―  ストーリーデータファイル
//
//  ✏️  ここだけ編集すればセリフ・演出を変えられます！
// ============================================================

const STORY = {

  // ----------------------------------------------------------
  //  キャラクター設定
  // ----------------------------------------------------------
  characters: {
    kamisama: {
      name:   '神様',
      avatar: 'chara_sennin.png',   // ← ファイル名に合わせた
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
  //  オープニングシーン
  // ----------------------------------------------------------
  opening: [
    {
      type: 'narration',
      bg:   'bg_miyazaki.jpg',
      text: '🌴  伝説の黄金のマンゴーが眠る地\n　　　　　　　― 宮 崎 ―',
    },
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'おお……来たか。\nずっと待っておったぞ、あーちゃんよ。',
    },
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      '黄金のマンゴーを求めて、\nここまで来たのじゃな？',
    },
    {
      type: 'choice',
      bg:   'bg_cave.jpg',
      choices: [
        { label: 'うん、探したい！🥭', next: 4 },
        { label: 'え、だれ？🤔',        next: 5 },
      ],
    },
    // 「うん！」ルート
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'うむ！その意気じゃ！\n謎を解けば、マンゴーへの道が開かれる💪',
      next:      6,
    },
    // 「だれ？」ルート
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'わしか？宮崎に宿る神様じゃよ🌟\nまあよい、謎を解けばわかる！',
      next:      6,
    },
    // 合流後
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      '謎を全て解いた者だけが\n黄金のマンゴーにたどり着けるのじゃ。',
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
  //  エンディング（黄金のマンゴー発見後・とじるボタンの後）
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
