/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = this.validateAndInitializeState(initState);
    this.listeners = []; // Слушатели изменений состояния
    this.uniqueCodes = new Set(this.state.list.map(item => item.code));
    this.generateCode = this.generator(this.uniqueCodes);
  }

  validateAndInitializeState(state) {
    const codes = state.list.map(item => item.code);
    const uniqueCodes = new Set(codes);

    if (codes.length !== uniqueCodes.size) {
      throw new Error("Некоторые коды повторяются в начальном состоянии");
    }

    return state;
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  generator(start) {
    let lastCode = start.size > 0 ? Math.max(...start) : 0;

    return function() {
      let newCode = ++lastCode;
      start.add(newCode);
      return newCode;
    };
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newCode = this.generateCode();

    this.setState({
      ...this.state,
      list: [...this.state.list, { code: newCode, title: 'Новая запись', selected: false, selectCount: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.uniqueCodes.delete(code);
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          item.selected = !item.selected;

          if(item.selected) {
            item.selectCount = (item.selectCount || 0) + 1;
          }
        } else {
          item.selected = false;
        }
        return item;
      }),
    });
  }
}

export default Store;
