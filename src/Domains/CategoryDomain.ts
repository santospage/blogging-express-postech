import ICategory from '../Interfaces/ICategory';

export default class CategoryDomain {
  readonly id: string;
  protected name: string;

  constructor(category: ICategory) {
    this.id = category.id;
    this.name = category.name;
  }
}
