const input = document.getElementById('json-input');
const formatBtn = document.getElementById('format-btn');
const minifyBtn = document.getElementById('minify-btn');
const copyBtn = document.getElementById('copy-btn');
const errorMsg = document.getElementById('error-msg');
const highlighted = document.getElementById('highlighted-json');

// Load saved JSON from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('jsonCleanerProInput');
  if (saved) input.value = saved;
});

// Save JSON to localStorage on input
input.addEventListener('input', () => {
  localStorage.setItem('jsonCleanerProInput', input.value);
  highlighted.innerHTML = '';
  errorMsg.textContent = '';
});

// Syntax highlighting function
function syntaxHighlight(json) {
  if (typeof json !== 'string') json = JSON.stringify(json, undefined, 2);
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(\.\d+)?([eE][+-]?\d+)?)/g, match => {
    let cls = 'number';
    if (/^"/.test(match)) {
      cls = /:$/.test(match) ? 'key' : 'string';
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return `<span class="${cls}">${match}</span>`;
  });
}

// Format JSON button
formatBtn.addEventListener('click', () => {
  try {
    const obj = JSON.parse(input.value);
    const pretty = JSON.stringify(obj, null, 2);
    input.value = pretty;
    highlighted.innerHTML = syntaxHighlight(obj);
    errorMsg.textContent = '';
    localStorage.setItem('jsonCleanerProInput', input.value);
  } catch (e) {
    errorMsg.textContent = 'Invalid JSON: ' + e.message;
    highlighted.innerHTML = '';
  }
});

// Minify JSON button
minifyBtn.addEventListener('click', () => {
  try {
    const obj = JSON.parse(input.value);
    const minified = JSON.stringify(obj);
    input.value = minified;
    highlighted.innerHTML = '';
    errorMsg.textContent = '';
    localStorage.setItem('jsonCleanerProInput', input.value);
  } catch (e) {
    errorMsg.textContent = 'Invalid JSON: ' + e.message;
    highlighted.innerHTML = '';
  }
});

// Copy to clipboard button
copyBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(input.value);
    errorMsg.textContent = 'Copied to clipboard!';
    errorMsg.style.color = '#6A9955';
    setTimeout(() => { errorMsg.textContent = ''; errorMsg.style.color = '#f48771'; }, 1500);
  } catch (err) {
    errorMsg.textContent = 'Failed to copy!';
  }
});