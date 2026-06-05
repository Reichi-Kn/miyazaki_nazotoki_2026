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
      avatar: 'chara_kamisama.png',
      emoji:  '🌟',   // 画像が読み込めない場合の代替
      color:  '#FFD700',
    },
    achan: {
      name:   'あーちゃん',
      avatar: 'chara_achan_back.png',
      emoji:  '🌸',
      color:  '#E8A020',
      side:   'right',
    },
  },

  // ----------------------------------------------------------
  //  オープニングシーン
  //  type: 'narration' | 'dialog' | 'choice'
  //
  //  narration → 中央にテキストのみ
  //  dialog    → キャラ吹き出し（character, side: 'left'|'right'）
  //  choice    → あーちゃんの返答ボタン（choices配列）
  //              選んだ後は nextSceneIndex で次のシーンへ飛ぶ
  // ----------------------------------------------------------
  opening: [
    // シーン0: ナレーション
    {
      type: 'narration',
      bg:   'bg_miyazaki.jpg',
      text: '🌴  伝説の黄金のマンゴーが眠る地\n　　　　　　　― 宮 崎 ―',
    },
    // シーン1: 神様登場
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'おお……来たか。\nずっと待っておったぞ、あーちゃんよ。',
    },
    // シーン2: 神様→選択肢へ
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      '黄金のマンゴーを求めて、\nここまで来たのじゃな？',
    },
    // シーン3: あーちゃんの選択肢
    {
      type: 'choice',
      bg:   'bg_cave.jpg',
      choices: [
        { label: 'うん、探したい！🥭', next: 4 },
        { label: 'え、だれ？🤔',        next: 5 },
      ],
    },
    // シーン4: 「うん！」ルート
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'うむ！その意気じゃ！\n謎を解けば、マンゴーへの道が開かれる💪',
      next:      6,  // シーン6へジャンプ
    },
    // シーン5: 「だれ？」ルート
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'わしか？宮崎に宿る神様じゃよ🌟\nまあよい、謎を解けばわかる！',
      next:      6,  // シーン6へジャンプ
    },
    // シーン6: 合流後
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      '謎を全て解いた者だけが\n黄金のマンゴーにたどり着けるのじゃ。',
    },
    // シーン7: ラスト
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'さあ……冒険のはじまりじゃ！\n3周年の旅を楽しんでおくれ🥭✨',
    },
  ],

  // オープニング最後のボタンテキスト
  startButtonText: '冒険をはじめる ✦',

  // ----------------------------------------------------------
  //  Mission2クリア後の演出シーン
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
};
