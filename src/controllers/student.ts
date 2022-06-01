import { NextFunction, Request, Response } from 'express';
import { studentService } from "../services";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page =  1, limit = 10, search = '' } = req.query;

    const students =  await studentService.getAll({
      page: Number(page),
      limit: Number(limit),
      search
    });
    return res.status(200).json(students)
  } catch(error) {
    return next(error)
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const student = await studentService.getById(id);
    if(!student) {
      return res.status(404).json({
        message: 'student with such id is not found'
      })
    }
    return res.status(200).json(student);
  } catch(error) {
    return next(error)
  }
}

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const student = await studentService.create(req.body);
    return res.status(201).json(student);
  } catch(error) {
    return next(error)
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const isDeleted = await studentService.deleteById(id);
    if(!isDeleted)  {
      return res.status(404).json({
        message: 'student with such id is not found'
      })
    }
    return res.status(204).json({
      message: 'deleted'
    });
  } catch(error) {
    return next(error)
  }
};

export const update = async(req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    const student = await studentService.update(id, req.body);
    if(!student) {
      return res.status(404).json({
        message: 'student with such id is not found'
      })
    }
    return res.status(200).json(student);
  } catch(error) {
    return next(error)
  }
}