import IClassRoom from '../Interfaces/IClassRoom';

export default class ClassRoomDomain {
  readonly id: string;
  protected title: string;
  protected detail: string;
  protected date: Date;
  protected resume: string;
  protected image: object;
  protected category: object;

  constructor(classroom: IClassRoom) {
    this.id = classroom.id;
    this.title = classroom.title;
    this.detail = classroom.detail;
    this.date = classroom.date;
    this.resume = classroom.resume;
    this.title = classroom.title;
    this.image = classroom.image;
    this.category = classroom.category;
  }
}
