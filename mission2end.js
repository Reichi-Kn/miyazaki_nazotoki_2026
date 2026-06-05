// ============================================================
//  mission2end.js  ―  Mission2クリア後・たーくん登場演出
//  ✋  このファイルは基本触らなくてOK
//  セリフ変更は story.js の mission2end を編集してね
// ============================================================

(function() {

  // たーくんのキャラクター定義（story.jsに追加しても可）
  if (window.STORY && !STORY.characters.takun) {
    STORY.characters.takun = {
      name:   'たーくん',
      avatar: 'chara_takun_guts.png',
      emoji:  '🔥',
      color:  '#E85020',
      side:   'right',
    };
  }

  // Mission2クリア後の演出を起動する関数
  window.playMission2End = function(onDone) {
    const scenes   = STORY.mission2end;
    const btnText  = STORY.mission2endButtonText || '次のミッションへ ✦';
    playOpening(scenes, btnText, onDone);
  };

})();
