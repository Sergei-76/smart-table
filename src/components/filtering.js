export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes).forEach((elementName) => {
            elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
                const el = document.createElement('option');
                el.textContent = name;
                el.value = name;
                return el;
            }))
        })
    }

    const applyFiltering = (query, state, action, e) => {
        // код с обработкой очистки поля
    // @todo: #4.2 — обработать очистку поля
    if (action === 'clear' && e) {
      const btn = e.target.closest('button[name="clear"]') || e.target;
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
    }         

        // @todo: #4.5 — отфильтровать данные, используя компаратор
        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
    };

    return {
        updateIndexes,
        applyFiltering
    };
}




/*export function initFiltering(elements, indexes) {
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
}*/