import {createComparison, defaultRules} from "../lib/compare.js";

// @todo: #4.3 — настроить компаратор
const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    Object.keys(indexes)                                    // Получаем ключи из объекта
      .forEach((elementName) => {                        // Перебираем по именам
        elements[elementName].append(                    // в каждый элемент добавляем опции
            ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                      .map(name => {                        // используйте name как значение и текстовое содержимое
                  const opt = document.createElement('option');
                    opt.value = opt.textContent = name;
                    return opt;                                // @todo: создать и вернуть тег опции
                      })
        )
     })
  return (data, state, action, event) => {
    // @todo: #4.2 — обработать очистку поля
    if (action === 'clear' && event) {
      const btn = event.target.closest('button[name="clear"]') || event.target;
      const fieldName = btn?.dataset.field;

      if (fieldName) {
        const parent = btn.parentElement;
        const inputOrSelect = parent?.querySelector(`[data-field="${fieldName}"]`);

        if (inputOrSelect) {
          if (inputOrSelect.tagName === 'SELECT') {
            inputOrSelect.selectedIndex = 0;
          } else {
            inputOrSelect.value = '';
          }

          // Синхронизируем со state
          if (state && typeof state === 'object') {
            state[fieldName] = '';
          }
        }
      }
      // После очистки фильтра сразу возвращаем все данные — дальше фильтровать не нужно
      return data;
    }

    // @todo: #4.5 — отфильтровать данные используя компаратор
    return data.filter(row => compare(row, state));
  };
}