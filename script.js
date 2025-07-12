const fgColor = document.getElementById('fgColor');
const bgColor = document.getElementById('bgColor');
const fgHex = document.getElementById('fgHex');
const bgHex = document.getElementById('bgHex');
const preview = document.getElementById('preview');
const contrastRatioText = document.getElementById('contrastRatio');
const wcagResults = document.getElementById('wcagResults');
const clearBtn = document.getElementById('clearBtn');

function updateUI() {
  const fg = fgHex.value;
  const bg = bgHex.value;

  if (!validateHex(fg) || !validateHex(bg)) {
    contrastRatioText.textContent = '--';
    wcagResults.innerHTML = '';
    return;
  }

  const ratio = getContrastRatio(fg, bg);
  contrastRatioText.textContent = ratio;

  preview.style.color = fg;
  preview.style.backgroundColor = bg;

  const ratioVal = parseFloat(ratio);
  const tags = [];

  tags.push(tag(ratioVal >= 4.5, 'AA Normal'));
  tags.push(tag(ratioVal >= 3.0, 'AA Large'));
  tags.push(tag(ratioVal >= 7.0, 'AAA Normal'));
  tags.push(tag(ratioVal >= 4.5, 'AAA Large'));

  wcagResults.innerHTML = tags.join('');
}

function tag(pass, label) {
  return `<span class="${pass ? 'pass' : 'fail'}">${pass ? '✅' : '❌'} ${label}</span>`;
}

function syncInputs(fromColorPicker) {
  fgHex.value = fgColor.value.toLowerCase();
  bgHex.value = bgColor.value.toLowerCase();
  updateUI();
}

fgColor.addEventListener('input', () => {
  fgHex.value = fgColor.value;
  updateUI();
});

bgColor.addEventListener('input', () => {
  bgHex.value = bgColor.value;
  updateUI();
});

fgHex.addEventListener('input', () => {
  if (validateHex(fgHex.value)) fgColor.value = fgHex.value;
  updateUI();
});

bgHex.addEventListener('input', () => {
  if (validateHex(bgHex.value)) bgColor.value = bgHex.value;
  updateUI();
});

clearBtn.addEventListener('click', () => {
  fgColor.value = '#000000';
  bgColor.value = '#ffffff';
  fgHex.value = '#000000';
  bgHex.value = '#ffffff';
  updateUI();
});

updateUI();
