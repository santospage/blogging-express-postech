import IClassRoom from '../Interfaces/IClassRoom';
import IParams from '../Interfaces/IParams';
import ClassRoomODM from '../Models/ClassRoomODM';

export default class ClassRoomService {
  private classRoomODM = new ClassRoomODM();

  public async listClasses(params: IParams) {
    return this.classRoomODM.getAllClasses(params);
  }

  public async listClassesManagerial(params: IParams) {
    return this.classRoomODM.getAllClassesManagerial(params);
  }

  public async listClassRoomById(id: string) {
    return this.classRoomODM.getClassRoomById(id);
  }

  public async listClassRoomByFilter(search: IParams, params: IParams) {
    return this.classRoomODM.getClassRoomByFilter(search, params);
  }

  createClassRoom = async (classRoom: IClassRoom) => {
    return this.classRoomODM.insertClassRoom(classRoom);
  };

  public async updateClassRoom(id: string, classRoom: IClassRoom) {
    return this.classRoomODM.updateClassRoom(id, classRoom);
  }

  public async deleteClassRoom(id: string) {
    return this.classRoomODM.deleteClassRoom(id);
  }
}
