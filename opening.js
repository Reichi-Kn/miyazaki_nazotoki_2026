// ============================================================
//  opening.js  ―  アニメーションエンジン（触らなくてOK）
//  セリフ変更は story.js だけ編集してね
// ============================================================

(function() {

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
      padding: 36px; pointer-events: none; z-index: 2;
    }
    #op-narration-text {
      font-family: 'Kaisei Decol', serif;
      font-size: 19px; font-weight: 700;
      color: #fff; text-align: center; line-height: 2;
      text-shadow: 0 2px 16px rgba(0,0,0,0.85);
      opacity: 0; transform: translateY(14px);
      transition: opacity 0.7s ease, transform 0.7s ease;
      white-space: pre-line;
    }
    #op-narration-text.show { opacity: 1; transform: translateY(0); }

    /* 会話エリア */
    #op-dialog {
      position: relative; z-index: 3;
      width: 100%; max-width: 480px;
      padding: 0 14px 20px;
      display: flex; flex-direction: column; gap: 6px;
      opacity: 0; transform: translateY(16px);
      transition: opacity 0.45s ease, transform 0.45s ease;
    }
    #op-dialog.show { opacity: 1; transform: translateY(0); }

    /* アバター行 */
    .op-row {
      display: flex;
      align-items: flex-end;
      gap: 10px;
    }
    .op-row.right { flex-direction: row-reverse; }

    /* アバター画像 */
    .op-avatar {
      width: 54px; height: 54px;
      min-width: 54px;
      border-radius: 50%;
      border: 2px solid rgba(232,160,32,0.6);
      background: rgba(196,125,14,0.15);
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      font-size: 26px;
      flex-shrink: 0;
    }
    .op-avatar img {
      width: 100%; height: 100%;
      object-fit: cover; border-radius: 50%;
      display: block;
    }

    /* 吹き出しカラム */
    .op-col {
      display: flex; flex-direction: column; gap: 3px;
      flex: 1; min-width: 0;
    }
    .op-col.right { align-items: flex-end; }

    .op-name {
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.08em;
      color: #fff; opacity: 0.85;
      padding: 0 4px;
    }

    .op-bubble {
      background: rgba(255,252,238,0.94);
      border-radius: 16px; border-top-left-radius: 4px;
      padding: 11px 14px;
      font-size: 14px; line-height: 1.8;
      color: #3A2800;
      white-space: pre-line;
      box-shadow: 0 3px 14px rgba(0,0,0,0.2);
      border: 1px solid rgba(196,125,14,0.18);
      word-break: break-all;
    }
    .op-bubble.right {
      border-radius: 16px; border-top-right-radius: 4px;
    }

    /* 選択肢 */
    #op-choices {
      position: relative; z-index: 3;
      width: 100%; max-width: 480px;
      padding: 0 14px 24px;
      display: flex; flex-direction: column; gap: 10px;
    }
    .op-choice-btn {
      background: rgba(255,252,238,0.93);
      border: 1.5px solid rgba(196,125,14,0.35);
      border-radius: 14px; padding: 14px 18px;
      font-family: 'Zen Maru Gothic', sans-serif;
      font-size: 15px; font-weight: 700;
      color: #3A2800; cursor: pointer; text-align: left;
      box-shadow: 0 3px 12px rgba(0,0,0,0.16);
      transition: transform 0.12s, background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .op-choice-btn:active { transform: scale(0.97); background: rgba(255,245,200,0.97); }

    /* タップヒント */
    #op-tap-hint {
      position: absolute; bottom: 8px; right: 16px;
      font-size: 10px; color: rgba(255,248,220,0.45);
      letter-spacing: 0.15em; z-index: 4;
      animation: opTapPulse 2s ease-in-out infinite;
    }
    @keyframes opTapPulse { 0%,100%{opacity:.3} 50%{opacity:.9} }

    /* ボタン */
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
    #op-start-btn.show { display: block; animation: opBtnIn 0.6s ease forwards; }
    @keyframes opBtnIn {
      from { opacity:0; transform:translateY(16px); }
      to   { opacity:1; transform:translateY(0); }
    }
    #op-start-btn:active { transform: scale(0.97); }

    /* パーティクル */
    .op-ptcl {
      position: absolute; pointer-events: none; z-index: 1;
      font-size: var(--sz,12px); color: var(--cl,rgba(255,215,0,0.5));
      opacity: 0;
      animation: opPtclFloat var(--dur,4s) ease-in-out infinite var(--dly,0s);
    }
    @keyframes opPtclFloat {
      0%   { opacity:0; transform:translateY(0) scale(0.4); }
      20%  { opacity:1; }
      80%  { opacity:0.5; }
      100% { opacity:0; transform:translateY(-90px) scale(1) rotate(var(--rot,180deg)); }
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

  // ── エンジン ─────────────────────────────────────────────
  let sceneIndex = 0;
  let isAnimating = false;
  let onComplete = null;
  let currentScenes = [];
  let currentStartBtnText = '';

  const overlay   = document.getElementById('op-overlay');
  const bg        = document.getElementById('op-bg');
  const narText   = document.getElementById('op-narration-text');
  const dialogEl  = document.getElementById('op-dialog');
  const choicesEl = document.getElementById('op-choices');
  const tapHint   = document.getElementById('op-tap-hint');
  const startBtn  = document.getElementById('op-start-btn');

  function setBg(src) {
    if (!src) { bg.classList.remove('show'); return; }
    bg.style.backgroundImage = `url('${src}')`;
    requestAnimationFrame(() => requestAnimationFrame(() => bg.classList.add('show')));
  }

  function avatarHTML(charKey) {
    const ch = STORY.characters[charKey];
    if (!ch) return `<div class="op-avatar">👤</div>`;
    const fallback = ch.emoji || '👤';
    return `<div class="op-avatar" data-fallback="${fallback}">
      <img src="${ch.avatar}" alt="${ch.name}"
        onload="this.style.opacity='1'"
        onerror="this.parentNode.innerHTML='${fallback}'"
        style="opacity:0;transition:opacity 0.3s;">
    </div>`;
  }

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
    }, 180);
  }

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
          <div class="op-name" style="color:${ch.color || '#E8A020'};text-align:${isRight?'right':'left'}">${ch.name || ''}</div>
          <div class="op-bubble ${isRight ? 'right' : ''}">${(scene.text||'').replace(/\n/g,'<br>')}</div>
        </div>
      </div>`;

    setTimeout(() => { dialogEl.classList.add('show'); isAnimating = false; }, 60);
  }

  function showChoice(scene) {
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
        setTimeout(renderScene, 180);
      });
      choicesEl.appendChild(btn);
    });
  }

  function renderScene() {
    if (sceneIndex >= currentScenes.length) {
      narText.classList.remove('show');
      dialogEl.classList.remove('show');
      choicesEl.style.display = 'none';
      tapHint.style.display = 'none';
      startBtn.textContent = currentStartBtnText;
      startBtn.classList.add('show');
      return;
    }
    const scene = currentScenes[sceneIndex];
    if (scene.bg) setBg(scene.bg);

    if (scene.type === 'narration')    showNarration(scene);
    else if (scene.type === 'dialog')  showDialog(scene);
    else if (scene.type === 'choice')  showChoice(scene);
  }

  // タップで次へ
  overlay.addEventListener('click', function(e) {
    if (e.target.closest('.op-choice-btn') || e.target === startBtn) return;
    if (isAnimating) return;
    const scene = currentScenes[sceneIndex];
    if (scene && scene.type === 'choice') return;
    sceneIndex = (scene && scene.next !== undefined) ? scene.next : sceneIndex + 1;
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
  const PTCL = ['✦','★','✶','·','⋆'];
  function spawnParticles() {
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('span');
      el.className = 'op-ptcl';
      el.textContent = PTCL[Math.floor(Math.random()*PTCL.length)];
      el.style.cssText = `left:${10+Math.random()*80}%;top:${20+Math.random()*60}%;
        --sz:${8+Math.random()*12}px;
        --cl:${['rgba(255,215,0,0.7)','rgba(255,255,255,0.6)','rgba(255,200,80,0.6)'][i%3]};
        --dur:${1.4+Math.random()*1.4}s;--dly:0s;--rot:${120+Math.floor(Math.random()*240)}deg;`;
      overlay.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }
  }

  // ── 公開API ──────────────────────────────────────────────
  window.playOpening = function(scenes, startText, callback) {
    currentScenes       = scenes;
    currentStartBtnText = startText || '次へ ✦';
    onComplete          = callback || null;
    sceneIndex          = 0;
    isAnimating         = false;

    bg.classList.remove('show');
    narText.classList.remove('show');
    dialogEl.classList.remove('show');
    dialogEl.innerHTML = '';
    choicesEl.style.display = 'none';
    choicesEl.innerHTML = '';
    tapHint.style.display = 'block';
    startBtn.classList.remove('show');
    overlay.style.opacity = '1';
    overlay.style.transition = '';
    overlay.style.display = 'flex';

    setTimeout(renderScene, 300);
  };

})();
