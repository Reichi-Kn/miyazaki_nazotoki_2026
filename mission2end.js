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
