import IClassRoom from '../Interfaces/IClassRoom';
import ClassRoomODM from '../Models/ClassRoomODM';
import ClassRoom from '../Domains/ClassRoomDomain';

export default class ClassRoomService {
  private classRoomODM = new ClassRoomODM();

  public async listClasses() {
    const classes = await this.classRoomODM.getAllClasses();
    return classes.map((classes) => new ClassRoom(classes));
  }

  public async listClassRoomById(id: string) {
    const classRoom = await this.classRoomODM.getClassRoomById(id);
    if (classRoom) return new ClassRoom(classRoom);
    return null;
  }

  createClassRoom = async (classRoom: IClassRoom) => {
    const classRoomId = await this.classRoomODM.getClassRoomById(classRoom.id);
    if (classRoomId) return false;
    const newClassRoom = await this.classRoomODM.insertClassRoom(classRoom);
    return new ClassRoom(classRoom);
  };

  public async updateClassRoom(id: string, classRoom: IClassRoom) {
    const updateClassRoom = await this.classRoomODM.updateClassRoom(id, classRoom);
    return new ClassRoom(classRoom);
  }

  public async deleteClassRoom(id: string) {
    await this.classRoomODM.deleteClassRoom(id);
  }
}
