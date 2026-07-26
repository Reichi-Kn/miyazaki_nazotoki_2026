// ============================================================
//  opening.js  ―  アニメーションエンジン（触らなくてOK）
// ============================================================
(function () {

  // ── CSS ────────────────────────────────────────────────────
  const css = `
    #op-overlay {
      position: fixed; inset: 0; z-index: 1100;
      background: #000;
      display: flex; flex-direction: column;
      align-items: center; justify-content: flex-end;
      overflow: hidden;
      font-family: 'Zen Maru Gothic', sans-serif;
      cursor: pointer;
    }
    #op-bg {
      position: absolute; inset: 0;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      opacity: 0; transition: opacity 1s ease;
      /* スマホで縦長画面にも対応 */
      min-height: 100%;
      min-width: 100%;
    }
    @media (max-aspect-ratio: 1/1) {
      #op-bg { background-size: cover; background-position: center top; }
    }
    #op-bg.show { opacity: 1; }
    #op-dim {
      position: absolute; inset: 0;
      background: linear-gradient(to bottom,
        rgba(0,0,0,0.05) 0%,
        rgba(0,0,0,0.15) 40%,
        rgba(0,0,0,0.70) 100%);
    }

    /* ── reveal演出（神様登場）──────────── */
    #op-reveal {
      position: absolute; inset: 0; z-index: 5;
      display: flex; align-items: center; justify-content: center;
      flex-direction: column; gap: 20px;
      background: #000;
      opacity: 1; transition: opacity 1.5s ease;
      pointer-events: none;
    }
    #op-reveal.fade-out { opacity: 0; }

    /* 放射光（背面） */
    #op-reveal-rays {
      position: absolute; inset: 0;
      background: radial-gradient(ellipse at center,
        rgba(255,220,60,0) 0%,
        rgba(255,200,40,0) 30%,
        transparent 70%);
      opacity: 0;
      transition: opacity 2.5s ease, background 2.5s ease;
    }
    #op-reveal-rays.lit {
      opacity: 1;
      background: radial-gradient(ellipse at center,
        rgba(255,240,100,0.45) 0%,
        rgba(255,200,40,0.25) 35%,
        rgba(255,150,0,0.08) 60%,
        transparent 75%);
      animation: opRaysPulse 3s ease-in-out infinite;
    }
    @keyframes opRaysPulse {
      0%,100% { opacity: 0.85; transform: scale(1); }
      50%      { opacity: 1;    transform: scale(1.06); }
    }

    /* 画像（丸枠なし・そのまま大きく） */
    #op-reveal-avatar {
      width: min(62vw, 260px);
      height: min(62vw, 260px);
      display: flex; align-items: center; justify-content: center;
      font-size: 72px;
      opacity: 0;
      transform: scale(0.55) translateY(20px);
      transition: opacity 2s ease, transform 2s ease;
      position: relative; z-index: 2;
      filter: drop-shadow(0 0 0px rgba(255,215,0,0));
    }
    #op-reveal-avatar.show {
      opacity: 1; transform: scale(1) translateY(0);
      filter: drop-shadow(0 0 28px rgba(255,215,0,0.6))
              drop-shadow(0 0 60px rgba(255,180,0,0.3));
    }
    #op-reveal-avatar img {
      width: 100%; height: 100%;
      object-fit: contain;
    }
    #op-reveal-tap {
      font-size: 11px; color: rgba(255,248,220,0.4);
      letter-spacing: 0.2em;
      animation: opTapPulse 2s ease-in-out infinite;
      position: relative; z-index: 2;
      opacity: 0; transition: opacity 1s ease;
    }
    #op-reveal-tap.show { opacity: 1; }

    /* 光粒子 */
    .op-reveal-spark {
      position: absolute; pointer-events: none; z-index: 3;
      border-radius: 50%;
      background: var(--sc, rgba(255,230,80,0.9));
      width: var(--sw,4px); height: var(--sw,4px);
      opacity: 0;
      animation: opSparkFly var(--sd2,2s) ease-out forwards var(--sdy,0s);
    }
    @keyframes opSparkFly {
      0%   { opacity:0.9; transform:translate(0,0) scale(1); }
      100% { opacity:0; transform:translate(var(--stx,0px),var(--sty,-120px)) scale(0.2); }
    }

    /* ── ナレーション ──────────────────── */
    #op-narration {
      position: absolute; inset: 0;
      display: flex; align-items: center; justify-content: center;
      padding: 36px; pointer-events: none; z-index: 2;
    }
    #op-narration-text {
      font-family: 'Kaisei Decol', serif;
      font-size: clamp(15px, 4vw, 18px);
      font-weight: 700; color: #fff;
      text-align: center; line-height: 1.5;
      text-shadow: 0 2px 16px rgba(0,0,0,0.9);
      opacity: 0; transform: translateY(14px);
      transition: opacity 0.7s ease, transform 0.7s ease;
      white-space: pre-line;
    }
    #op-narration-text.show { opacity: 1; transform: translateY(0); }

    /* ── 会話エリア ────────────────────── */
    #op-dialog {
      position: relative; z-index: 3;
      width: 100%; max-width: 480px;
      padding: 0 14px 52px;
      display: flex; flex-direction: column; gap: 6px;
      opacity: 0; transform: translateY(16px);
      transition: opacity 0.45s ease, transform 0.45s ease;
      margin-bottom: 0;
    }
    #op-dialog.show { opacity: 1; transform: translateY(0); }

    .op-row { display: flex; align-items: flex-end; gap: 10px; }
    .op-row.right { flex-direction: row-reverse; }

    .op-avatar {
      width: 50px; height: 50px; min-width: 50px;
      border-radius: 50%;
      border: 2px solid rgba(232,160,32,0.6);
      background: rgba(196,125,14,0.15);
      overflow: hidden;
      display: flex; align-items: center; justify-content: center;
      font-size: 24px; flex-shrink: 0;
    }
    .op-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }

    .op-col { display: flex; flex-direction: column; gap: 3px; flex: 1; min-width: 0; }
    .op-col.right { align-items: flex-end; }

    .op-name {
      font-size: 10px; font-weight: 700;
      letter-spacing: 0.08em; color: #fff; opacity: 0.85; padding: 0 4px;
    }
    .op-bubble {
      background: rgba(255,252,238,0.94);
      border-radius: 16px; border-top-left-radius: 4px;
      padding: 11px 14px;
      font-size: clamp(13px, 3.5vw, 15px);
      line-height: 1.8; color: #3A2800;
      white-space: pre-line;
      box-shadow: 0 3px 14px rgba(0,0,0,0.2);
      border: 1px solid rgba(196,125,14,0.18);
      word-break: break-all;
    }
    .op-bubble.right { border-radius: 16px; border-top-right-radius: 4px; }

    /* 名前reveal光りアニメ */
    @keyframes nameReveal {
      0%   { opacity:0; text-shadow: 0 0 20px rgba(255,215,0,0.9); }
      60%  { opacity:1; text-shadow: 0 0 10px rgba(255,215,0,0.6); }
      100% { opacity:0.85; text-shadow: none; }
    }
    .op-name.reveal-anim { animation: nameReveal 1s ease forwards; }

    /* ── 選択肢 ────────────────────────── */
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
      font-size: clamp(14px, 3.8vw, 16px);
      font-weight: 700; color: #3A2800;
      cursor: pointer; text-align: left;
      box-shadow: 0 3px 12px rgba(0,0,0,0.16);
      transition: transform 0.12s, background 0.15s;
      -webkit-tap-highlight-color: transparent;
    }
    .op-choice-btn:active { transform: scale(0.97); background: rgba(255,245,200,0.97); }

    /* ── タップヒント ──────────────────── */
    #op-tap-hint {
      position: absolute; bottom: 14px; right: 16px;
      font-size: 10px; color: rgba(255,248,220,0.55);
      letter-spacing: 0.15em; z-index: 4;
      animation: opTapPulse 2s ease-in-out infinite;
    }
    @keyframes opTapPulse { 0%,100%{opacity:.3} 50%{opacity:.9} }

    /* ── スタートボタン ────────────────── */
    #op-start-btn {
      display: none; position: relative; z-index: 4;
      background: linear-gradient(135deg, #8B5500, #E8A020);
      border: none; border-radius: 16px;
      padding: 15px 40px; margin: 0 auto 36px;
      font-family: 'Zen Maru Gothic', sans-serif;
      font-size: clamp(14px, 4vw, 16px);
      font-weight: 700; color: #fff;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(139,85,0,0.38);
      -webkit-tap-highlight-color: transparent;
      opacity: 0;
    }
    #op-start-btn.show { display: block; animation: opBtnIn 0.6s ease forwards; }
    @keyframes opBtnIn { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    #op-start-btn:active { transform: scale(0.97); }

    /* ── 花火アニメ ────────────────────── */
    .op-firework {
      position: absolute; pointer-events: none; z-index: 2;
      width: 6px; height: 6px; border-radius: 50%;
      animation: opFwLaunch var(--dur, 0.8s) ease-out forwards var(--dly, 0s);
    }
    @keyframes opFwLaunch {
      0%   { transform: translate(0, 0) scale(1); opacity: 1; }
      100% { transform: translate(var(--tx,0px), var(--ty,-200px)) scale(0.3); opacity: 0; }
    }
    .op-firework-burst {
      position: absolute; pointer-events: none; z-index: 2;
      animation: opFwBurst var(--bdur, 0.6s) ease-out forwards var(--bdly, 0.7s);
      opacity: 0;
    }
    .op-firework-burst::before {
      content: var(--char, '✦');
      font-size: var(--bsz, 14px);
      color: var(--bcl, #FFD700);
      text-shadow: 0 0 6px var(--bcl, #FFD700);
    }
    @keyframes opFwBurst {
      0%   { opacity: 1; transform: translate(var(--bx,0px), var(--by,0px)) scale(0.2); }
      60%  { opacity: 1; transform: translate(calc(var(--bx,0px)*2.5), calc(var(--by,0px)*2.5)) scale(1); }
      100% { opacity: 0; transform: translate(calc(var(--bx,0px)*3.5), calc(var(--by,0px)*3.5)) scale(0.5); }
    }

    /* ── パーティクル ──────────────────── */
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

  // ── HTML ───────────────────────────────────────────────────
  document.body.insertAdjacentHTML('afterbegin', `
    <div id="op-overlay" style="display:none;">
      <div id="op-bg"></div>
      <div id="op-dim"></div>
      <div id="op-reveal">
        <div id="op-reveal-rays"></div>
        <div id="op-reveal-avatar"></div>
        <div id="op-reveal-tap">タップして続ける</div>
      </div>
      <div id="op-narration"><div id="op-narration-text"></div></div>
      <div id="op-dialog"></div>
      <div id="op-choices" style="display:none;"></div>
      <div id="op-tap-hint">タップして続ける</div>
      <button id="op-start-btn"></button>
    </div>`);

  // ── エンジン ────────────────────────────────────────────────
  // 演出中に連打してどんどんスキップされてしまうのを防ぐため、
  // 各シーンが表示されてから最低このくらいは「タップして続ける」を
  // 出さない（＝タップを受け付けない）ようにする時間（ミリ秒）。
  // シーンごとに story.js 側で tapLockMs を指定すればそちらが優先される。
  const TAP_LOCK_MS = 1000;

  let sceneIndex = 0, isAnimating = false, onComplete = null;
  let currentScenes = [], currentStartBtnText = '';
  let revealTapped = false;

  const overlay   = document.getElementById('op-overlay');
  const bgEl      = document.getElementById('op-bg');
  const revealEl     = document.getElementById('op-reveal');
  const revealRays   = document.getElementById('op-reveal-rays');
  const revealAvatar = document.getElementById('op-reveal-avatar');
  const revealTapEl  = document.getElementById('op-reveal-tap');
  const narText   = document.getElementById('op-narration-text');
  const dialogEl  = document.getElementById('op-dialog');
  const choicesEl = document.getElementById('op-choices');
  const tapHint   = document.getElementById('op-tap-hint');
  const startBtn  = document.getElementById('op-start-btn');

  function setBg(src) {
    if (!src) { bgEl.classList.remove('show'); return; }
    bgEl.style.backgroundImage = `url('${src}')`;
    requestAnimationFrame(() => requestAnimationFrame(() => bgEl.classList.add('show')));
  }

  function avatarHTML(charKey) {
    const ch = STORY.characters[charKey];
    if (!ch) return `<div class="op-avatar">👤</div>`;
    return `<div class="op-avatar">
      <img src="${ch.avatar}" alt="${ch.name}"
        onload="this.style.opacity='1'"
        onerror="this.parentNode.innerHTML='${ch.emoji||'👤'}'"
        style="opacity:0;transition:opacity 0.3s;">
    </div>`;
  }

  // reveal演出（神様登場・強化版）
  function showReveal(scene) {
    isAnimating = true;
    const ch = STORY.characters[scene.character] || {};

    narText.classList.remove('show');
    dialogEl.classList.remove('show');
    choicesEl.style.display = 'none';
    tapHint.style.display = 'none';

    // リセット
    revealEl.style.display = 'flex';
    revealEl.style.opacity = '1';
    revealEl.classList.remove('fade-out');
    revealRays.classList.remove('lit');
    revealAvatar.classList.remove('show');
    revealTapEl.classList.remove('show');

    // 画像セット（丸枠なし・そのまま）
    revealAvatar.innerHTML = ch.avatar
      ? `<img src="${ch.avatar}" alt="${ch.name}"
           onerror="this.parentNode.innerHTML='${ch.emoji||'✨'}'"
           style="width:100%;height:100%;object-fit:contain;">`
      : (ch.emoji || '✨');

    // ステップ1: 1.2秒後に光が広がり始める
    setTimeout(() => {
      revealRays.classList.add('lit');
    }, 1200);

    // ステップ2: 2.2秒後に神様登場
    setTimeout(() => {
      revealAvatar.classList.add('show');
      spawnRevealSparks();
    }, 2200);

    // ステップ3: 3.8秒後にタップヒント（＝ここまではタップしても進めない）
    const lockMs = (scene.tapLockMs != null) ? scene.tapLockMs : 3800;
    setTimeout(() => {
      revealTapEl.classList.add('show');
      isAnimating = false;
    }, lockMs);
  }

  // 登場時の光粒子
  function spawnRevealSparks() {
    const colors = ['rgba(255,230,80,0.9)','rgba(255,255,200,0.8)','rgba(255,180,40,0.7)','rgba(255,255,255,0.7)'];
    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * 360;
      const dist  = 40 + Math.random() * 100;
      const el = document.createElement('div');
      el.className = 'op-reveal-spark';
      el.style.cssText = `
        left: 50%; top: 42%;
        --sc: ${colors[i%colors.length]};
        --sw: ${3 + Math.random()*4}px;
        --stx: ${Math.cos(angle*Math.PI/180)*dist}px;
        --sty: ${Math.sin(angle*Math.PI/180)*dist - 60}px;
        --sd2: ${0.8 + Math.random()*1}s;
        --sdy: ${Math.random()*0.3}s;
      `;
      revealEl.appendChild(el);
      setTimeout(() => el.remove(), 2500);
    }
  }

  // ナレーション表示
  // 連打対策：テキストが出てから一定時間（TAP_LOCK_MS、または scene.tapLockMs）が
  // 経過するまでは isAnimating を true のままにし、タップヒントも出さない。
  function showNarration(scene) {
    isAnimating = true;
    revealEl.style.display = 'none';
    narText.classList.remove('show');
    dialogEl.classList.remove('show');
    choicesEl.style.display = 'none';
    tapHint.style.display = 'none';

    setTimeout(() => { narText.textContent = scene.text; narText.classList.add('show'); }, 180);

    const lockMs = (scene.tapLockMs != null) ? scene.tapLockMs : TAP_LOCK_MS;
    setTimeout(() => {
      tapHint.style.display = 'block';
      isAnimating = false;
    }, lockMs);
  }

  // セリフ表示
  // 連打対策：吹き出しが表示されてから一定時間が経過するまではタップを受け付けない。
  function showDialog(scene) {
    isAnimating = true;
    const doShow = () => {
      revealEl.style.display = 'none';
      const ch = STORY.characters[scene.character] || {};
      const isRight = scene.side === 'right';
      narText.classList.remove('show');
      dialogEl.classList.remove('show');
      choicesEl.style.display = 'none';
      tapHint.style.display = 'none';

      const nameEl = `<div class="op-name ${scene.revealName ? 'reveal-anim' : ''}" style="color:${ch.color||'#E8A020'};text-align:${isRight?'right':'left'}">${ch.name||''}</div>`;
      dialogEl.innerHTML = `
        <div class="op-row ${isRight?'right':''}">
          ${avatarHTML(scene.character)}
          <div class="op-col ${isRight?'right':''}">
            ${nameEl}
            <div class="op-bubble ${isRight?'right':''}">${(scene.text||'').replace(/\n/g,'<br>')}</div>
          </div>
        </div>`;
      setTimeout(() => {
        dialogEl.classList.add('show');
        // tapLockMs が指定されていればその時間、無ければデフォルトのロック時間を使う
        const lockMs = (scene.tapLockMs != null) ? scene.tapLockMs : TAP_LOCK_MS;
        setTimeout(() => {
          tapHint.style.display = 'block';
          isAnimating = false;
        }, lockMs);
      }, 60);
    };
    if (scene.delayMs && scene.delayMs > 0) {
      setTimeout(doShow, scene.delayMs);
    } else {
      doShow();
    }
  }

  function showChoice(scene) {
    isAnimating = true;
    revealEl.style.display = 'none';
    narText.classList.remove('show');
    dialogEl.classList.remove('show');
    tapHint.style.display = 'none';
    choicesEl.style.display = 'none';
    choicesEl.innerHTML = '';

    // ダイアログのフェードアウト（0.45s）が終わってから選択肢を表示
    setTimeout(() => {
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
      choicesEl.style.display = 'flex';
      isAnimating = false;
    }, 480);
  }

  // 花火アニメ
  // 連打対策：花火の演出（2周目の打ち上げも含む）が一通り終わるまでタップを受け付けない。
  function showFireworks(scene) {
    isAnimating = true;
    revealEl.style.display = 'none';
    narText.classList.remove('show');
    dialogEl.classList.remove('show');
    choicesEl.style.display = 'none';
    tapHint.style.display = 'none';

    // ナレーションテキスト表示
    setTimeout(() => { narText.textContent = scene.text || ''; narText.classList.add('show'); }, 200);

    // 花火を複数回打ち上げ
    const colors = ['#FFD700','#FF6B6B','#6BFFE0','#FF9FFF','#FFFFFF','#FFB347'];
    const positions = [
      {x:20,y:75},{x:50,y:65},{x:80,y:70},{x:35,y:80},{x:65,y:72}
    ];
    positions.forEach((pos, pi) => {
      const delay = pi * 600;
      setTimeout(() => launchFirework(pos.x, pos.y, colors[pi % colors.length]), delay);
    });
    // 2周目
    setTimeout(() => {
      [{x:30,y:68},{x:60,y:75},{x:75,y:65}].forEach((pos, pi) => {
        setTimeout(() => launchFirework(pos.x, pos.y, colors[(pi+2) % colors.length]), pi * 500);
      });
    }, 3200);

    // 2周目の花火が落ち着く頃までロック（デフォルト4200ms）
    const lockMs = (scene.tapLockMs != null) ? scene.tapLockMs : 4200;
    setTimeout(() => {
      tapHint.style.display = 'block';
      isAnimating = false;
    }, lockMs);
  }

  function launchFirework(xPct, yFromBottom, color) {
    const burstY = `${yFromBottom}%`;
    const burstX = `${xPct}%`;
    // 破裂パーティクル
    const chars = ['✦','★','✶','·','●','◆'];
    const count = 10 + Math.floor(Math.random() * 6);
    for (let i = 0; i < count; i++) {
      const angle = (360 / count) * i;
      const rad   = angle * Math.PI / 180;
      const dist  = 28 + Math.random() * 20;
      const bx    = Math.cos(rad) * dist;
      const by    = Math.sin(rad) * dist;
      const el = document.createElement('div');
      el.className = 'op-firework-burst';
      el.style.cssText = `
        left:${xPct}%; top:calc(100% - ${burstY});
        --bx:${bx}px; --by:${by}px;
        --bdur:${0.5 + Math.random()*0.4}s;
        --bdly:${Math.random()*0.15}s;
        --bsz:${8 + Math.random()*8}px;
        --bcl:${color};
        --char:'${chars[i%chars.length]}';
      `;
      overlay.appendChild(el);
      setTimeout(() => el.remove(), 2000);
    }
    // 中心フラッシュ
    const flash = document.createElement('div');
    flash.style.cssText = `
      position:absolute; left:${xPct}%; top:calc(100% - ${burstY});
      width:20px; height:20px; border-radius:50%;
      background:${color}; opacity:0.9;
      transform:translate(-50%,-50%) scale(1);
      transition: transform 0.3s ease, opacity 0.3s ease;
      pointer-events:none; z-index:3;
      box-shadow: 0 0 20px 8px ${color};
    `;
    overlay.appendChild(flash);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      flash.style.transform = 'translate(-50%,-50%) scale(3)';
      flash.style.opacity = '0';
    }));
    setTimeout(() => flash.remove(), 400);
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

    if      (scene.type === 'reveal')    showReveal(scene);
    else if (scene.type === 'narration') showNarration(scene);
    else if (scene.type === 'dialog')    showDialog(scene);
    else if (scene.type === 'choice')    showChoice(scene);
    else if (scene.type === 'fireworks') showFireworks(scene);
  }

  // タップで次へ
  overlay.addEventListener('click', function (e) {
    if (e.target.closest('.op-choice-btn') || e.target === startBtn) return;
    if (isAnimating) return;
    const scene = currentScenes[sceneIndex];
    if (scene && scene.type === 'choice') return;
    if (scene && scene.type === 'reveal') {
      // reveal → フェードアウトして次へ
      isAnimating = true;
      revealEl.classList.add('fade-out');
      setTimeout(() => {
        revealEl.style.display = 'none';
        revealEl.classList.remove('fade-out');
        tapHint.style.display = 'block';
        sceneIndex++;
        isAnimating = false;
        renderScene();
      }, 1200);
      return;
    }
    sceneIndex = (scene && scene.next !== undefined) ? scene.next : sceneIndex + 1;
    spawnParticles();
    renderScene();
  });

  // スタートボタン
  startBtn.addEventListener('click', function () {
    overlay.style.transition = 'opacity 0.5s ease';
    overlay.style.opacity = '0';
    setTimeout(() => { overlay.style.display = 'none'; if (onComplete) onComplete(); }, 500);
  });

  // パーティクル
  const PTCL = ['✦','★','✶','·','⋆'];
  function spawnParticles() {
    for (let i = 0; i < 6; i++) {
      const el = document.createElement('span');
      el.className = 'op-ptcl';
      el.textContent = PTCL[Math.floor(Math.random() * PTCL.length)];
      el.style.cssText = `left:${10+Math.random()*80}%;top:${20+Math.random()*60}%;
        --sz:${8+Math.random()*12}px;
        --cl:${['rgba(255,215,0,0.7)','rgba(255,255,255,0.6)','rgba(255,200,80,0.6)'][i%3]};
        --dur:${1.4+Math.random()*1.4}s;--dly:0s;--rot:${120+Math.floor(Math.random()*240)}deg;`;
      overlay.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }
  }

  // ── 公開API ─────────────────────────────────────────────────
  window.playOpening = function (scenes, startText, callback) {
    currentScenes       = scenes;
    currentStartBtnText = startText || '次へ ✦';
    onComplete          = callback || null;
    sceneIndex          = 0;
    isAnimating         = false;

    bgEl.classList.remove('show');
    bgEl.style.backgroundImage = '';
    narText.classList.remove('show');
    dialogEl.classList.remove('show');
    dialogEl.innerHTML = '';
    choicesEl.style.display = 'none';
    choicesEl.innerHTML = '';
    tapHint.style.display = 'none';
    startBtn.classList.remove('show');
    revealEl.style.display  = 'none';
    overlay.style.opacity   = '1';
    overlay.style.transition = '';
    overlay.style.display   = 'flex';

    setTimeout(renderScene, 300);
  };

})();
