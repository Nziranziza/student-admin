import { NextFunction, Request, Response } from 'express';
import { studyGroupService, enrollmentService } from '../services';

const notfound = 'study group with such id is not found'

export const getAll = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const studyGroups = await studyGroupService.getAll();
    return res.status(200).json(studyGroups);
  } catch(error) {
    return next(error)
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const studyGroup = await studyGroupService.getById(id);
    if(!studyGroup) {
      return res.status(404).json({
        message: notfound
      })
    }
    return res.status(200).json(
      studyGroup
    )
  } catch(error) {
    return next(error)
  }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studyGroup = await studyGroupService.create(req.body);
    return res.status(201).json(studyGroup)
  } catch(error) {
    return next(error)
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const isDeleted = await studyGroupService.deleteById(id);
    if(!isDeleted) {
      return res.status(404).json({
        message: notfound
      })
    }
    return res.status(204).json({
      message: 'deleted'
    })
  } catch(error) {
    return next(error)
  }
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const studyGroup = await studyGroupService.update(id, req.body);
    if(!studyGroup) {
      return res.status(404).json({
        message: notfound
      })
    }
    return res.status(200).json(studyGroup)
  } catch(error) {
    return next(error)
  }
};

export const join = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const enrollment = await enrollmentService.create({
      studyGroupId: id,
      ...req.body
    });
    if(!enrollment) {
      return res.status(422).json({
        message: 'can only enroll to 4 study groups'
      })
    }
    return res.status(201).json(enrollment)
  } catch(error) {
    return next(error)
  }
};

export const leave = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const studentId = Number(req.body.studentId);
    const isDeleted = await enrollmentService.destroy(id, studentId);
    if(!isDeleted) {
      return res.status(404).json({
        message: 'you do not belongs to this group'
      })
    }
    return res.status(204).json({
      message: 'left'
    })
  } catch(error) {
    return next(error)
  }
};

