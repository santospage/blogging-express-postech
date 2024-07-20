import IClassRoom from '../Interfaces/IClassRoom';
import ClassRoomODM from '../Models/ClassRoomODM';

export default class ClassRoomService {
  private classRoomODM = new ClassRoomODM();

  public async listClasses() {
    return this.classRoomODM.getAllClasses();
  }

  public async listClassRoomById(id: string) {
    return this.classRoomODM.getClassRoomById(id);
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
