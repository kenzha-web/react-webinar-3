/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    // this.nextEntryCode = Math.max(0, ...this.state.list.map(item => item.code)) + 1;
    this.uniqueCodes = new Set(this.state.list.map(item => item.code));
    this.lastCode = this.uniqueCodes.size > 0 ? Math.max(...this.uniqueCodes) : 0;
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

  generateCode() {
    let newCode = this.lastCode + 1;
    while (this.uniqueCodes.has(newCode)) {
      newCode++;
    }
    this.uniqueCodes.add(newCode);
    this.lastCode = newCode;
    return newCode;
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
    this.nextEntryCode += 1;
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
