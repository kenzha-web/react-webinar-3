/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      totalItems: 0,
      totalPrice: 0,
    };
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
    const newBasket = itemInBasket ? this.state.basket.map(
      item => item.code === code ? { ...item, quantity: item.quantity + 1 } : item)
      : [...this.state.basket, { ...this.state.list.find(item => item.code === code), quantity: 1 },];

    const updateTotalItems = newBasket.length;
    const updateTotalPrice = newBasket.reduce((sum, item) => sum + item.price * item.quantity, 0);

    this.setState({
      ...this.state,
      basket: newBasket,
      totalItems: updateTotalItems,
      totalPrice: updateTotalPrice,
    });
  }

  deleteItem(code) {
    const newBasket = this.state.basket.filter(item => item.code !== code);
    const totalPrice = newBasket.reduce((sum, item) => sum + item.price * item.quantity, 0);

    this.setState({
      ...this.state,
      basket: newBasket,
      totalPrice,
    });
  }
}

export default Store;
