import StoreModule from '../module';

class CategoriesState extends StoreModule {
  initState() {
    return {
      data: [],
      loading: false,
    };
  }

  async fetchCategories() {
    this.setState({ loading: true });

    try {
      const response = await fetch('/api/v1/categories?fields=_id,title,parent(_id)&limit=*');
      const json = await response.json();
      this.setState({
        data: json.result.items,
        loading: false,
      });
    } catch (e) {
      this.setState({ loading: false });
    }
  }
}

export default CategoriesState;
