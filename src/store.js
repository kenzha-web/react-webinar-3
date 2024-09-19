/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
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

  addItemToBasket(code) {
    const itemInBasket = this.state.basket.find(item => item.code === code);

    if (itemInBasket) {
      this.setState({
        ...this.state,
        basket: this.state.basket.map(item =>
          item.code === code ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      const item = this.state.list.find(item => item.code === code);
      this.setState({
        ...this.state,
        basket: [...this.state.basket, { ...item, quantity: 1 }],
      });
    }
  }

  deleteItem(code) {
    this.setState({
      ...this.state,
      basket: this.state.basket.filter(item => item.code !== code),
    });
  }
}

export default Store;
