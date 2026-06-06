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
    mystery_voice: {
      name:   '???',
      avatar: 'chara_takun_guts.png',
      emoji:  '❓',
      color:  '#aaaaaa',
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
      text: '🌴　伝説の黄金のマンゴーが眠る地　🌴\n　　　　　　　―in  宮 崎 ―',
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
      text:      'ほっほっほ...やっと来たか\nずっと待っておったぞ、あーちゃん...',
    },
    // シーン3: 第1の選択肢
    {
      type: 'choice',
      bg:   'bg_cave.jpg',
      choices: [
        { label: 'なんで名前をしってるの？', next: 4 },
        { label: 'だーれ……？',                next: 5 },
      ],
    },
    // シーン4: 「なんで名前を」ルート → 神様と名乗る
    {
      type:       'dialog',
      bg:         'bg_cave.jpg',
      character:  'kamisama',
      side:       'left',
      revealName: true,
      text:       'それは、わしが神様だからじゃよ🌟\n宮崎の地をずっと守っておるのじゃ。',
      next:       6,
    },
    // シーン5: 「だれ」ルート → 神様と名乗る
    {
      type:       'dialog',
      bg:         'bg_cave.jpg',
      character:  'kamisama',
      side:       'left',
      revealName: true,
      text:       'わしか……宮崎に宿る神様じゃよ🌟\nこの地をずっとまもっておるのじゃ。',
      next:       6,
    },
    // シーン6: 合流・マンゴーの話へ
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'おぬしには、黄金のマンゴーをさがしてほしいのじゃ。',
    },
    // シーン7: 第2の選択肢
    {
      type: 'choice',
      bg:   'bg_cave.jpg',
      choices: [
        { label: '黄金のマンゴーって？', next: 8 },
      ],
    },
    // シーン8: マンゴーの説明1
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      '黄金のマンゴーは宮崎の地にねむるお宝じゃ。',
    },
    // シーン9: マンゴーの説明2
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'これを持つ者には幸運がおとずれると言われておる。',
    },
    // シーン10: 第3の選択肢
    {
      type: 'choice',
      bg:   'bg_cave.jpg',
      choices: [
        { label: 'えっ！ほしい！', next: 11 },
      ],
    },
    // シーン11: よい返事
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'よい返事じゃ！\n黄金のマンゴーを手に入れるには、謎を解くしかないぞ。',
    },
    // シーン12: 冒険スタート
    {
      type:      'dialog',
      bg:        'bg_cave.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'さあ……冒険のはじまりじゃ！\n謎解きの旅を楽しんでおくれ🥭✨',
    },
  ],

  startButtonText: '✦冒険をはじめる ✦',

  // ----------------------------------------------------------
  //  Mission1クリア後
  // ----------------------------------------------------------
  mission1end: [
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'ほっほっほっ……一つ目の謎を解けたようじゃな。\nさすがじゃ、あーちゃんよ🌟',
    },
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'やったー！！解けた〜！！🌸✨',
    },
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'kamisama',
      side:      'left',
      text:      '黄金のマンゴーへの道はまだ続くぞ。\n次の謎も、その調子で頑張るのじゃ💪',
    },
  ],

  mission1endButtonText: '✦次のミッションへ ✦',

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
      character: 'mystery_voice',
      side:      'right',
      text:      'お～い！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'あ！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      'あーちゃん、置いていかないでよ！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'たーくんが遅いんでしょ！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      '……',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'ほほ……おぬしがたーくんか。\n３年記念日で宮崎に来てるんじゃったのぉ。',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'なんでも知ってるんだね。',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      '神様じゃからのぅ\n２人で探せばきっと黄金のマンゴーもみつかるぞい。',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      '一緒に黄金のマンゴー探そうぜ！\n絶対見つけてみせる！',
    },
  ],

  mission2endButtonText: '✦次のミッションへ ✦',

  // ----------------------------------------------------------
  //  Mission3クリア後・花火アニメ（夜景背景＋花火CSS）
  // ----------------------------------------------------------
  mission3end: [
    {
      type:      'fireworks',
      bg:        'bg_night.jpg',
      text:      '花火……きれいだなぁ……',
    },
    {
      type:      'dialog',
      bg:        'bg_night.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'わぁ〜！！花火きれい〜〜！！✨\nすごいすごい！！',
    },
    {
      type:      'dialog',
      bg:        'bg_night.jpg',
      character: 'takun',
      side:      'left',
      text:      'ほんとだ……めちゃくちゃきれいじゃん！\nあーちゃんと見れてよかった〜',
    },
    {
      type:      'dialog',
      bg:        'bg_night.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'ずっと見てたい……',
    },
    {
      type:      'dialog',
      bg:        'bg_night.jpg',
      character: 'takun',
      side:      'left',
      text:      'あ！！！\nってか黄金のマンゴー探すの忘れてたーーー！！！',
    },
    {
      type:      'dialog',
      bg:        'bg_night.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'やばい！！まだ見つけてないじゃん！！💦\nはやくはやく〜！！',
    },
  ],

  mission3endButtonText: '✦急いで探しに行く✦',

  // ----------------------------------------------------------
  //  Mission4クリア後・みらいちずアニメ（3人）
  // ----------------------------------------------------------
  mission4end: [
    {
      type: 'narration',
      bg:   'bg_jungle.jpg',
      text: 'みらいちずを手に入れた……！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'おお……それは「みらいちず」じゃ！\nその地図を使えば、黄金のマンゴーの場所がわかるぞ。',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      'マジか！！じゃあもうすぐマンゴーゲットじゃん！！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'やった〜！！地図使えばいいんだね！！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'さあ……みらいちずを使うのじゃ。\n黄金のマンゴーはもうすぐそこじゃぞ✨',
    },
  ],

  mission4endButtonText: '✦みらいちずを使おう✦',

  // ----------------------------------------------------------
  //  エンディング
  // ----------------------------------------------------------
  ending: [
    {
      type: 'narration',
      bg:   'bg_miyazaki.jpg',
      text: 'ついに……黄金のマンゴーを手に入れた！',
    },
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'よくぞ辿り着いた……\nふたりの絆が、マンゴーを引き寄せたのじゃ。',
    },
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'takun',
      side:      'right',
      text:      'あーちゃんすごすぎ！！\n謎全部解いちゃったじゃん！',
    },
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'えへへ……やったー！！',
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
      text:      '3年間ありがとう！\nこれからもよろしくね！',
    },
    // シーン7: 少し間を置いてから（next指定なし＝自動で次へ）
    {
      type:      'dialog',
      bg:        'bg_miyazaki.jpg',
      character: 'takun',
      side:      'right',
      text:      'がさごぞ...',
      delayMs:   2000,
      tapLockMs: 1000,
    },
  ],

  endingButtonText: '✦ Thank you ✦',
  // ----------------------------------------------------------
  //  パスワード入力後 → QRコード表示前のアニメーション
  // ----------------------------------------------------------
  qrPreAnim: [
    {
      type: 'narration',
      bg:   'bg_jungle.jpg',
      text: 'おや？黄金のマンゴーが......',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'おぉ！黄金のマンゴーの力で幸運がやってきたか！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      'なんだろう！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'わしにも何が起こるかまではわからんのじゃ。',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'achan_guts',
      side:      'right',
      text:      '神様でもわからないことあるんだね。',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      'あーちゃん！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      'じつは黄金のマンゴーにお願いしてプレゼントを用意したんだ！',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'kamisama',
      side:      'left',
      text:      'ほぅ......いつの間にしておったのじゃ。',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      'えへへ……',
    },
    {
      type:      'dialog',
      bg:        'bg_jungle.jpg',
      character: 'takun',
      side:      'right',
      text:      'あーちゃんいつもありがとう！\nよろこんでくれるとうれしいな！',
    },
  ],

  qrPreAnimButtonText: 'プレゼントをひらく ✦',

};
