import { codeGenerator } from '../../utils';
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
          id: json.result._id,
          description: json.result.description,
          madeIn: json.result.madeIn.title,
          category: json.result.category.title,
          edition: json.result.edition,
          price: json.result.price
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
