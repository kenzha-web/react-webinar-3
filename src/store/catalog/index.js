import { codeGenerator } from '../../components/utils/utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      page: 0,
      totalItemsCount: 0
    };
  }

  async load(page= 0) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${page * 10}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        totalItemsCount: json.result.count
      },
      'Загружены товары из АПИ',
    );
  }

  async changePage(page) {
    this.setState(
      {
        ...this.getState(),
        page,
      },
    );
  }
}


export default Catalog;
