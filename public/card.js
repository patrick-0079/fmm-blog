(() => {
  const card = document.querySelector('[data-wish-card]');
  if (!card) return;
  const canvas = card.querySelector('.wish-preview');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const message = card.querySelector('#wish-message');
  const count = card.querySelector('#wish-count');
  const download = card.querySelector('.wish-download');
  const status = card.querySelector('.wish-status');
  const limit = 48;
  const segmenter = typeof Intl.Segmenter === 'function'
    ? new Intl.Segmenter('zh-CN', { granularity: 'grapheme' })
    : null;
  const characters = text => segmenter
    ? Array.from(segmenter.segment(text), item => item.segment)
    : Array.from(text);
  const palettes = {
    rose: { name: '蔷薇粉', paper: '#f9e7e7', pale: '#fff4ef', accent: '#9d5268', line: '#d7a9ab' },
    cream: { name: '奶油白', paper: '#f7edd9', pale: '#fffaf0', accent: '#886134', line: '#d2b88d' },
    lilac: { name: '丁香紫', paper: '#ede6f3', pale: '#fcf6fa', accent: '#775979', line: '#bca7c6' },
  };
  const serif = '"Songti SC","Noto Serif CJK SC","SimSun",serif';
  const bodyFont = '"PingFang SC","Microsoft YaHei","Noto Sans CJK SC",sans-serif';

  function blossom(x, y, scale, ink, paper) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    for (let i = 0; i < 5; i++) {
      ctx.rotate(2 * Math.PI / 5);
      ctx.beginPath();
      ctx.moveTo(0, 3);
      ctx.bezierCurveTo(-15, -4, -20, -19, -10, -26);
      ctx.quadraticCurveTo(-5, -29, 0, -24);
      ctx.quadraticCurveTo(5, -29, 10, -24);
      ctx.bezierCurveTo(18, -16, 13, -4, 0, 3);
      ctx.fillStyle = ink;
      ctx.fill();
    }
    ctx.fillStyle = paper;
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
  }

  function stamp(colors) {
    ctx.save();
    ctx.translate(1010, 64);
    ctx.rotate(.065);
    ctx.fillStyle = colors.pale;
    ctx.fillRect(0, 0, 94, 118);
    ctx.strokeStyle = colors.accent;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.strokeRect(1, 1, 92, 116);
    ctx.setLineDash([]);
    ctx.strokeRect(8, 8, 78, 102);
    ctx.beginPath();
    ctx.moveTo(46, 85);
    ctx.quadraticCurveTo(49, 68, 45, 44);
    ctx.moveTo(48, 71);
    ctx.quadraticCurveTo(59, 51, 69, 56);
    ctx.quadraticCurveTo(64, 69, 48, 71);
    ctx.moveTo(48, 76);
    ctx.quadraticCurveTo(37, 61, 27, 63);
    ctx.quadraticCurveTo(34, 76, 48, 76);
    ctx.stroke();
    blossom(44, 42, .66, colors.accent, colors.pale);
    ctx.restore();
    ctx.save();
    ctx.strokeStyle = colors.accent;
    ctx.globalAlpha = .44;
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const y = 121 + i * 11;
      ctx.beginPath();
      ctx.moveTo(920, y);
      ctx.bezierCurveTo(952, y - 18, 973, y + 16, 1006, y);
      ctx.stroke();
    }
    ctx.restore();
  }

  function wrap(text, width) {
    const lines = [];
    for (const paragraph of text.split('\n')) {
      let current = '';
      for (const ch of characters(paragraph)) {
        if (current && ctx.measureText(current + ch).width > width) {
          lines.push(current.trimEnd());
          current = '';
        }
        current += ch;
      }
      lines.push(current.trimEnd());
    }
    return lines;
  }

  function draw(text, colors) {
    const { width, height } = canvas;
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, colors.pale);
    gradient.addColorStop(1, colors.paper);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = colors.line;
    ctx.strokeRect(23, 23, width - 46, height - 46);
    ctx.lineWidth = 1;
    ctx.strokeRect(31, 31, width - 62, height - 62);
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = colors.accent;
    ctx.font = 'italic 36px Georgia,serif';
    ctx.fillText('Nemu Journal', 86, 110);
    stamp(colors);
    ctx.fillStyle = '#4c343f';
    ctx.font = 'bold 63px ' + serif;
    ctx.fillText('给芙眠眠', 83, 228);
    ctx.strokeStyle = colors.line;
    ctx.beginPath();
    ctx.moveTo(86, 263);
    ctx.lineTo(1114, 263);
    ctx.stroke();

    const body = text.trim().replace(/[^\S\n]+/gu, ' ');
    const bodyWidth = 1020;
    ctx.font = '48px ' + bodyFont;
    let lines = wrap(body, bodyWidth);
    if (lines.length > 5) lines = wrap(body.replace(/\s+/gu, ' '), bodyWidth);
    const leading = 71;
    const first = 475 - (lines.length - 1) * leading / 2;
    ctx.fillStyle = '#4c343f';
    lines.forEach((line, i) => ctx.fillText(line, 86, first + i * leading, bodyWidth));

    ctx.strokeStyle = colors.line;
    ctx.beginPath();
    ctx.moveTo(86, 663);
    ctx.lineTo(1114, 663);
    ctx.stroke();
    blossom(101, 710, .55, colors.accent, colors.pale);
    ctx.fillStyle = colors.accent;
    ctx.font = '28px ' + serif;
    ctx.fillText('直播一周年', 129, 721);
    ctx.font = 'italic 30px Georgia,serif';
    ctx.textAlign = 'right';
    ctx.fillText('2026.12.01', 1114, 721);
    ctx.textAlign = 'left';
  }

  function refresh() {
    const chars = characters(message.value);
    if (chars.length > limit) message.value = chars.slice(0, limit).join('');
    const text = message.value;
    const colors = palettes[card.querySelector('input:checked').value];
    count.textContent = Math.min(chars.length, limit) + ' / ' + limit + ' 字';
    download.disabled = !text.trim();
    canvas.setAttribute('aria-label', colors.name + '周年花笺预览。' + text);
    draw(text, colors);
  }

  message.addEventListener('input', event => {
    if (event.isComposing) return;
    status.textContent = '';
    refresh();
  });
  message.addEventListener('compositionend', refresh);
  card.querySelector('.wish-palette').addEventListener('change', () => {
    status.textContent = '';
    refresh();
  });
  download.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = '芙眠眠-一周年花笺.png';
    link.href = canvas.toDataURL('image/png');
    document.body.append(link);
    link.click();
    link.remove();
    status.textContent = '花笺已生成。';
  });
  refresh();
  card.hidden = false;
  const navLink = document.querySelector('nav a[href="#wishes"]');
  if (navLink) navLink.hidden = false;
})();
