// ============================================================
//  mission2end.js  ―  Mission2後・エンディング演出（触らなくてOK）
//  セリフ変更は story.js を編集してね
// ============================================================

// Mission2クリア後・たーくん登場
window.playMission2End = function(onDone) {
  playOpening(STORY.mission2end, STORY.mission2endButtonText || '次のミッションへ ✦', onDone);
};

// エンディング（マンゴー発見・とじるボタンの後）
window.playEnding = function(onDone) {
  playOpening(STORY.ending, STORY.endingButtonText || 'ありがとう ✦', onDone);
};

// Mission3クリア後・花火アニメ
window.playMission3End = function(onDone) {
  playOpening(STORY.mission3end, STORY.mission3endButtonText || '次のミッションへ ✦', onDone);
};

// Mission4クリア後・みらいちずアニメ
window.playMission4End = function(onDone) {
  playOpening(STORY.mission4end, STORY.mission4endButtonText || 'みらいちずを使う！ 🗺️', onDone);
};
