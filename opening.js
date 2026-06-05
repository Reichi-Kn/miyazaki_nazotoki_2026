// ============================================================
//  opening.js  ―  オープニングアニメーションエンジン
//  ✋  このファイルは基本触らなくてOK
//  セリフ・演出の変更は story.js だけ編集してね
// ============================================================

(function() {

  // ── HTML挿入 ──────────────────────────────────────────────
  const css = `
    #op-overlay {
      position: fixed; inset: 0; z-index: 1100;
      background: #080400;
      display: flex; flex-direction: column;
      align-items: center; justify-content: flex-end;
      overflow: hidden;
      font-family: 'Zen Maru Gothic', sans-serif;
    }
    #op-bg {
      position: absolute; inset: 0;
      background-size: cover; background-position: center;
      opacity: 0; transition: opacity 0.9s ease;
    }
    #op-bg.show { opacity: 1; }
    #op-dim {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom,
        rgba(0,0,0,0.1) 0%,
        rgba(8,4,0,0.2) 50%,
        rgba(8,4,0,0.72) 100%);
    }
    /* ナレーション */
    #op-narration {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      padding: 32px; pointer-events: none; z-index: 2;
    }
    #op-narration-text {
      font-family: 'Kaisei Decol', serif;
      font-size: 19px; font-weight: 700;
      color: #fff; text-align: center; line-height: 1.9;
      text-shadow: 0 2px 14px rgba(0,0,0,0.8);
      opacity: 0; transform: translateY(14px);
      transition: opacity 0.7s ease, transform 0.7s ease;
      white-space: pre-line;
    }
    #op-narration-text.show { opacity: 1; transform: translateY(0); }

    /* 会話エリア */
    #op-dialog {
      position: relative; z-index: 3;
      width: 100%; max-width: 480px;
      padding: 0 16px 24px;
      display: flex; flex-direction: column; gap: 8px;
      opacity: 0; transform: translateY(18px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    #op-dialog.show { opacity: 1; transform: translateY(0); }

    .op-row { display: flex; align-items: flex-end; gap: 8px; }
    .op-row.right { flex-direction: row-reverse; }

    .op-avatar {
      width: 50px; height: 50px; border-radius: 50%;
      border: 2px solid rgba(232,160,32,0.55);
      background: rgba(196,125,14,0.18);
      flex-shrink: 0; overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px;
    }
    .op-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; }

    .op-col { display: flex; flex-direction: column; gap: 3px; max-width: calc(100% - 62px); }
    .op-col.right { align-items: flex-end; }

    .op-name {
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.1em; opacity: 0.8; color: #fff;
      padding: 0 4px;
    }

    .op-bubble {
      background: rgba(255,252,238,0.93);
      border-radius: 16px; border-top-left-radius: 4px;
      padding: 12px 15px; font-size: 14px; line-height: 1.8;
      color: #3A2800; white-space: pre-line;
      box-shadow: 0 3px 16px rgba(0,0,0,0.22);
      border: 1px solid rgba(196,125,14,0.2);
    }
    .op-bubble.right {
      border-radius: 16px; border-top-right-radius: 4px;
    }

    /* 選択肢ボタン */
    #op-choices {
      position: relative; z-index: 3;
      width: 100%; max-width: 480px;
      padding: 0 16px 24px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .op-choice-btn {
      background: rgba(255,252,238,0.92);
      border: 1.5px solid rgba(196,125,14,0.35);
      border-radius: 14px; padding: 14px 18px;
      font-family: 'Zen Maru Gothic', sans-serif;
      font-size: 15px; font-weight: 700;
      color: #3A2800; cursor: pointer;
      text-align: left;
      box-shadow: 0 3px 14px rgba(0,0,0,0.18);
      transition: transform 0.12s, background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .op-choice-btn:active { transform: scale(0.97); background: rgba(255,245,200,0.97); }

    /* タップヒント */
    #op-tap-hint {
      position: absolute; bottom: 8px; right: 18px;
      font-size: 10px; color: rgba(255,248,220,0.45);
      letter-spacing: 0.15em; z-index: 4;
      animation: opTapPulse 2s ease-in-out infinite;
    }
    @keyframes opTapPulse {
      0%,100% { opacity: 0.3; } 50% { opacity: 0.9; }
    }

    /* スタートボタン */
    #op-start-btn {
      display: none; position: relative; z-index: 4;
      background: linear-gradient(135deg, #8B5500, #E8A020);
      border: none; border-radius: 16px;
      padding: 16px 44px; margin: 0 auto 44px;
      font-family: 'Zen Maru Gothic', sans-serif;
      font-size: 16px; font-weight: 700; color: #fff;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(139,85,0,0.38);
      -webkit-tap-highlight-color: transparent;
      opacity: 0;
    }
    #op-start-btn.show {
      display: block;
      animation: opBtnIn 0.6s ease forwards;
    }
    @keyframes opBtnIn {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    #op-start-btn:active { transform: scale(0.97); }

    /* パーティクル */
    .op-ptcl {
      position: absolute; pointer-events: none; z-index: 1;
      font-size: var(--sz,12px);
      color: var(--cl, rgba(255,215,0,0.5));
      opacity: 0;
      animation: opPtclFloat var(--dur,4s) ease-in-out infinite var(--dly,0s);
    }
    @keyframes opPtclFloat {
      0%   { opacity:0; transform: translateY(0) scale(0.4); }
      20%  { opacity:1; }
      80%  { opacity:0.5; }
      100% { opacity:0; transform: translateY(-90px) scale(1) rotate(var(--rot,180deg)); }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  const html = `
  <div id="op-overlay" style="display:none;">
    <div id="op-bg"></div>
    <div id="op-dim"></div>
    <div id="op-narration"><div id="op-narration-text"></div></div>
    <div id="op-dialog"></div>
    <div id="op-choices" style="display:none;"></div>
    <div id="op-tap-hint">タップして続ける</div>
    <button id="op-start-btn"></button>
  </div>`;

  document.body.insertAdjacentHTML('afterbegin', html);

  // ── エンジン本体 ────────────────────────────────────────────
  let sceneIndex = 0;
  let isAnimating = false;
  let onComplete = null;

  const overlay    = document.getElementById('op-overlay');
  const bg         = document.getElementById('op-bg');
  const narration  = document.getElementById('op-narration');
  const narText    = document.getElementById('op-narration-text');
  const dialogEl   = document.getElementById('op-dialog');
  const choicesEl  = document.getElementById('op-choices');
  const tapHint    = document.getElementById('op-tap-hint');
  const startBtn   = document.getElementById('op-start-btn');

  // 背景を切り替え
  function setBg(src) {
    if (!src) { bg.classList.remove('show'); return; }
    bg.style.backgroundImage = `url('${src}')`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { bg.classList.add('show'); });
    });
  }

  // アバターHTML
  function avatarHTML(charKey) {
    const ch = STORY.characters[charKey];
    if (!ch) return '';
    return `<div class="op-avatar">
      <img src="${ch.avatar}" alt="${ch.name}"
           onerror="this.parentNode.textContent='${ch.emoji || '👤'}'">
    </div>`;
  }

  // ナレーション表示
  function showNarration(scene) {
    isAnimating = true;
    narText.classList.remove('show');
    dialogEl.classList.remove('show');
    choicesEl.style.display = 'none';
    tapHint.style.display = 'block';

    setTimeout(() => {
      narText.textContent = scene.text;
      narText.classList.add('show');
      isAnimating = false;
    }, 200);
  }

  // 会話表示
  function showDialog(scene) {
    isAnimating = true;
    const ch = STORY.characters[scene.character] || {};
    const isRight = scene.side === 'right';

    narText.classList.remove('show');
    dialogEl.classList.remove('show');
    choicesEl.style.display = 'none';
    tapHint.style.display = 'block';

    dialogEl.innerHTML = `
      <div class="op-row ${isRight ? 'right' : ''}">
        ${avatarHTML(scene.character)}
        <div class="op-col ${isRight ? 'right' : ''}">
          <div class="op-name" style="color:${ch.color || '#E8A020'}">${ch.name || ''}</div>
          <div class="op-bubble ${isRight ? 'right' : ''}">${scene.text.replace(/\n/g,'<br>')}</div>
        </div>
      </div>`;

    setTimeout(() => {
      dialogEl.classList.add('show');
      isAnimating = false;
    }, 80);
  }

  // 選択肢表示
  function showChoice(scene) {
    isAnimating = true;
    narText.classList.remove('show');
    dialogEl.classList.remove('show');
    tapHint.style.display = 'none';

    choicesEl.style.display = 'flex';
    choicesEl.innerHTML = '';
    scene.choices.forEach(c => {
      const btn = document.createElement('button');
      btn.className = 'op-choice-btn';
      btn.textContent = c.label;
      btn.addEventListener('click', () => {
        spawnParticles();
        sceneIndex = c.next;
        choicesEl.style.display = 'none';
        isAnimating = false;
        setTimeout(renderScene, 200);
      });
      choicesEl.appendChild(btn);
    });
    isAnimating = false;
  }

  // シーンをレンダリング
  function renderScene() {
    const scenes = currentScenes;
    if (sceneIndex >= scenes.length) {
      // 最後 → スタートボタン
      narText.classList.remove('show');
      dialogEl.classList.remove('show');
      choicesEl.style.display = 'none';
      tapHint.style.display = 'none';
      startBtn.textContent = currentStartBtnText;
      startBtn.classList.add('show');
      return;
    }

    const scene = scenes[sceneIndex];
    if (scene.bg) setBg(scene.bg);

    if (scene.type === 'narration') {
      showNarration(scene);
    } else if (scene.type === 'dialog') {
      showDialog(scene);
    } else if (scene.type === 'choice') {
      showChoice(scene);
    }
  }

  // タップで次へ
  overlay.addEventListener('click', function(e) {
    if (e.target.closest('.op-choice-btn')) return;
    if (e.target === startBtn) return;
    if (isAnimating) return;

    const scenes = currentScenes;
    const scene = scenes[sceneIndex];

    // 選択肢表示中はスキップしない
    if (scene && scene.type === 'choice') return;

    // nextジャンプあり？
    if (scene && scene.next !== undefined) {
      sceneIndex = scene.next;
    } else {
      sceneIndex++;
    }
    spawnParticles();
    renderScene();
  });

  // スタートボタン
  startBtn.addEventListener('click', function() {
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      if (onComplete) onComplete();
    }, 500);
  });

  // パーティクル
  const PTCL_CHARS = ['✦','★','✶','·','⋆'];
  function spawnParticles() {
    const count = 5 + Math.floor(Math.random() * 4);
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'op-ptcl';
      const x = 10 + Math.random() * 80;
      const y = 20 + Math.random() * 60;
      el.textContent = PTCL_CHARS[Math.floor(Math.random() * PTCL_CHARS.length)];
      el.style.cssText = `
        left:${x}%; top:${y}%;
        --sz:${8 + Math.random() * 12}px;
        --cl:${['rgba(255,215,0,0.7)','rgba(255,255,255,0.6)','rgba(255,200,80,0.6)'][i%3]};
        --dur:${1.5 + Math.random() * 1.5}s;
        --dly:0s;
        --rot:${Math.round(120 + Math.random() * 240)}deg;
      `;
      overlay.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }
  }

  // ── 公開API ────────────────────────────────────────────────
  let currentScenes = [];
  let currentStartBtnText = '冒険をはじめる ✦';

  window.playOpening = function(scenes, startText, callback) {
    currentScenes      = scenes;
    currentStartBtnText = startText || '冒険をはじめる ✦';
    onComplete         = callback || null;
    sceneIndex         = 0;
    isAnimating        = false;

    // リセット
    bg.classList.remove('show');
    narText.classList.remove('show');
    dialogEl.classList.remove('show');
    choicesEl.style.display = 'none';
    tapHint.style.display = 'block';
    startBtn.classList.remove('show');
    overlay.style.opacity = '1';
    overlay.style.transition = '';
    overlay.style.display = 'flex';

    setTimeout(renderScene, 300);
  };

})();
