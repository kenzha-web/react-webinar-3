import StoreModule from '../module';

/**
 * Детальная информация о товаре для страницы товара
 */
class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: false, // признак ожидания загрузки
    };
  }

  async login(credentials) {
    // Сброс текущего товара и установка признака ожидания загрузки
    this.setState({
      data: {},
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/users/sign`, {
          method: "POST",
          body: JSON.stringify({
            "login": "test_1",
            "password": "123456"
          }),
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(credentials),
        }
      );
      const json = await response.json();

      // Товар загружен успешно
      this.setState(
        {
          data: json.result,
          waiting: false,
        },
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        waiting: false,
      });
    }
  }

  /**
   * Загрузка товаров по id
   * @param id {String}
   * @return {Promise<void>}
   */
  async profileLoad(id) {
    this.setState({
      data: {},
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/users/self?fields=*`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Token": "de9911233f62807e70a6b02329c0c60e6115c8032e2f8cd082ff64ff42d224d9"
          },
        }
      );
      const json = await response.json();

      this.setState(
        {
          data: json.result,
          waiting: false,
        },
      );
    } catch (e) {
      // Ошибка при загрузке
      // @todo В стейт можно положить информацию об ошибке
      this.setState({
        data: {},
        waiting: false,
      });
    }
  }
}

export default ProfileState;
