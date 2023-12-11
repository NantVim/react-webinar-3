import {codeGenerator} from "../../utils";
import StoreModule from "../module";

class Catalog extends StoreModule {

  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0)
  }

  initState() {
    return {
      list: [],
      pageCount: 0,
      selectedPage: 0,
      pageList: []
    }
  }

  async load(pageNumber, langCode) {
    const response = await fetch(`/api/v1/articles?limit=10&skip=${(pageNumber-1) *10}&fields=items(_id, title, price),count&lang=${langCode}`);
    const json = await response.json();
    this.setState({
      ...this.getState(),
      list: json.result.items,
      pageCount: Math.ceil(json.result.count / 10),
      selectedPage: pageNumber
    }, 'Загружены товары из АПИ');
  }
}

export default Catalog;
