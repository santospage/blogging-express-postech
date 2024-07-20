import IClassRoom from '../Interfaces/IClassRoom';
import QueryParams from '../Interfaces/IQueryParams';
import ClassRoomODM from '../Models/ClassRoomODM';

export default class ClassRoomService {
  private classRoomODM = new ClassRoomODM();

  public async listClasses(params: QueryParams) {
    return this.classRoomODM.getAllClasses(params);
  }

  public async listClassesManagerial(params: QueryParams) {
    return this.classRoomODM.getAllClassesManagerial(params);
  }

  public async listClassRoomById(id: string) {
    return this.classRoomODM.getClassRoomById(id);
  }

  public async listClassRoomByFilter(search: any) {
    return this.classRoomODM.getClassRoomByFilter(search);
  }

  createClassRoom = async (classRoom: IClassRoom) => {
    return this.classRoomODM.getClassRoomById(classRoom.id);
  };

  public async updateClassRoom(id: string, classRoom: IClassRoom) {
    return this.classRoomODM.updateClassRoom(id, classRoom);
  }

  public async deleteClassRoom(id: string) {
    return this.classRoomODM.deleteClassRoom(id);
  }
}
