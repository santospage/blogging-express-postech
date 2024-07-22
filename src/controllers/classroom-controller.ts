import { NextFunction, Response, Request } from 'express';
import mongoose, { Model } from 'mongoose';

import ClassRoomService from '../services/classroom-service';
import IClassRoom from '../interfaces/classroom';
import NotFound from '../errors/not-found';
import IParams from '../interfaces/params';
import CategoryService from '../services/category-service';

export default class ClassRoomController {
  private classRoomService: ClassRoomService;
  private category: CategoryService;

  constructor(private req: Request, private res: Response, private next: NextFunction) {
    this.classRoomService = new ClassRoomService();
    this.category = new CategoryService();
  }

  public async listClasses(): Promise<void> {
    try {
      const classes = await this.classRoomService.listClasses(this.req.query);
      this.res.status(201).json(classes);
    } catch (e) {
      this.next(e);
    }
  }

  public async listClassesManagerial(): Promise<void> {
    try {
      const classes = await this.classRoomService.listClassesManagerial(this.req.query);
      this.res.status(201).json(classes);
    } catch (e) {
      this.next(e);
    }
  }

  public async listClassesByFilter(): Promise<void> {
    try {
      const search = await this.processSearch(this.req.query);
      if (search) {
        const classes = await this.classRoomService.listClassesByFilter(search, this.req.query);
        this.res.status(201).json(classes);
      } else {
        this.res.status(200).send([]);
      }
    } catch (e) {
      this.next(e);
    }
  }

  public async listClassRoomById(): Promise<void> {
    try {
      const { id } = this.req.params;
      const classRoom = await this.classRoomService.listClassRoomById(id);
      if (classRoom) {
        this.res.status(200).json(classRoom);
      } else {
        this.next(new NotFound('Class Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }

  public createClassRoom = async (): Promise<void> => {
    try {
      const classRoom: IClassRoom = { id: String(new mongoose.Types.ObjectId()), ...this.req.body };
      const newClassRoom = await this.classRoomService.createClassRoom(classRoom);
      this.res.status(201).json({ message: 'ClassRoom created!', id: newClassRoom });
    } catch (e) {
      this.next(e);
    }
  };

  public async updateClassRoom(): Promise<void> {
    try {
      const { id } = this.req.params;
      const classRoom: IClassRoom = { ...this.req.body };
      const updateClasRoom = await this.classRoomService.updateClassRoom(id, classRoom);
      if (updateClasRoom) {
        this.res.status(201).json(updateClasRoom);
      } else {
        this.next(new NotFound('Class Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }

  public async deleteClassRoom(): Promise<void> {
    try {
      const { id } = this.req.params;
      const classFound = await this.classRoomService.deleteClassRoom(id);
      if (classFound) {
        this.res.status(200).json({ message: 'ClassRoom deleted!', id: id });
      } else {
        this.next(new NotFound('Class Id not found'));
      }
    } catch (e) {
      this.next(e);
    }
  }

  public async processSearch(params: IParams) {
    const { title, detail, resume, category } = params;
    let search: any = {};

    if (title) search.title = new RegExp(title, 'i');
    if (detail) search.detail = new RegExp(detail, 'i');
    if (resume) search.resume = new RegExp(resume, 'i');
    if (category) {
      search.category = new RegExp(category, 'i');
      const categoryResult = await this.category.listCategoryByFilter(search.category);
      if (categoryResult) {
        search.category = categoryResult;
      } else {
        search = null;
      }
    }
    return search;
  }
}
