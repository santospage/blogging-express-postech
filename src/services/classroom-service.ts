import IClassRoom from '../interfaces/classroom';
import IParams from '../interfaces/params';
import ClassRoomModel from '../models/classroom-model';

export default class ClassRoomService {
  private classRoomModel = new ClassRoomModel();

  public async listClasses(params: IParams) {
    return this.classRoomModel.getAllClasses(params);
  }

  public async listClassesManagerial(params: IParams) {
    return this.classRoomModel.getAllClassesManagerial(params);
  }

  public async listClassRoomById(id: string) {
    return this.classRoomModel.getClassRoomById(id);
  }

  public async listClassesByFilter(search: IParams, params: IParams) {
    return this.classRoomModel.getClassesByFilter(search, params);
  }

  createClassRoom = async (classRoom: IClassRoom) => {
    return this.classRoomModel.insertClassRoom(classRoom);
  };

  public async updateClassRoom(id: string, classRoom: IClassRoom) {
    return this.classRoomModel.updateClassRoom(id, classRoom);
  }

  public async deleteClassRoom(id: string) {
    return this.classRoomModel.deleteClassRoom(id);
  }
}
