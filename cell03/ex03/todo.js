(function () {
  const COOKIE_NAME = 'todos';

  const list = document.getElementById('ft_list');
  const btn = document.getElementById('new_todo');

  function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days*24*60*60*1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
  }

  function getCookie(name) {
    const cname = name + "=";
    const ca = document.cookie.split(';');
    for (let c of ca) {
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(cname) === 0) return decodeURIComponent(c.substring(cname.length, c.length));
    }
    return "";
  }

  function saveList() {
    // save texts (top -> bottom)
    const items = Array.from(list.querySelectorAll('.todo')).map(el => el.textContent);
    setCookie(COOKIE_NAME, JSON.stringify(items), 365);
  }

  function createItem(text) {
    const item = document.createElement('div');
    item.className = 'todo';
    item.textContent = text; 
    item.addEventListener('click', function () {
      if (confirm('Do you want to remove this TO DO?')) {
        item.remove();
        saveList();
      }
    });
    return item;
  }

  function addNew() {
    const input = prompt('Enter a new TO DO:');
    if (input === null) return; 
    const text = input.trim();
    if (!text) return; 
    const el = createItem(text);
    list.prepend(el);     
    saveList();
  }

  function loadList() {
    const raw = getCookie(COOKIE_NAME);
    if (!raw) return;
    try {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) {
        for (const t of arr) {
          if (typeof t === 'string' && t.trim() !== '') {
            const el = createItem(t);
            list.appendChild(el);
          }
        }
      }
    } catch (e) {
    }
  }

  btn.addEventListener('click', addNew);
  loadList();
})();
