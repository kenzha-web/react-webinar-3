import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      data: {},
      waiting: true,
      access: false,
      token: localStorage.getItem('token') || null,
    };
  }

  async login(credentials) {
    this.setState({
      data: {},
      waiting: true,
    });

    try {
      const response = await fetch(
        `/api/v1/users/sign`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: credentials.login,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();
      localStorage.setItem('token', json.result.token);
      this.setState(
        {
          data: json.result,
          access: true,
          waiting: false,
        },
      );

      return this.getState();
    } catch (e) {
      this.setState({
        data: {},
        access: false,
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
            // "X-Token": "de9911233f62807e70a6b02329c0c60e6115c8032e2f8cd082ff64ff42d224d9"
            "X-Token": localStorage.getItem('token'),
          },
        }
      );
      const json = await response.json();

      if (json.result.error != null) {
        throw json.result.error.message;
      }

      this.setState(
        {
          data: json.result,
          access: true,
          waiting: false,
        },
      );
    } catch (e) {
      this.setState({
        data: {},
        access: false,
        waiting: false,
      });
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.setState({ data: {}, token: null });
  }
}

export default ProfileState;
