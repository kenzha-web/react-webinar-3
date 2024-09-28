import { codeGenerator } from '../../components/utils/utils';
import StoreModule from '../module';

class Product extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      id: '',
      description: '',
      madeIn: '',
      category: '',
      edition: 0,
      price: 0
    };
  }

  async productLoad(id= '') {
    try {
      const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
      const json = await response.json();
      this.setState(
        {
          ...this.getState(),
          ...json.result
        },
      );
    } catch(error) {
      console.error('Ошибка загрузки продукта:', error);
    }

  }

  async changeId(id) {
    this.setState(
      {
        ...this.getState(),
        id,
      },
    );
  }
}


export default Product;
