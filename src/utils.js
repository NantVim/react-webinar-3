const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

// Гениратор уникальных числе для атрибута code в store
export function createCode(codeLogs) {
  for (let i=0; i<100000; i++) {
    let now = Date()
    now = Date.parse(now)
    let code = Math.floor(now * Math.random())
    code = code%1e5
    // Проверяем существовал ли когда либо сгенерированный code
    let isAlife = codeLogs.find(item => item === code) 
    if (isAlife == undefined) return code
  }
}

export function declOfNum(n) {
  let titles = ['раз','раза','раз']
  return titles[n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2]
}