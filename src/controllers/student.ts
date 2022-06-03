import { NextFunction, Request, Response } from 'express';
import { UniqueConstraintError } from 'sequelize';

import { studentService } from '../services';
import { HTTP_STATUS } from '../constants';

const notfound = 'student with such id is not found';

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;

    const students = await studentService.getAll({
      page: Number(page),
      limit: Number(limit),
      search,
    });
    return res.status(HTTP_STATUS.OK).json(students);
  } catch (error) {
    return next(error);
  }
};

export const getById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const student = await studentService.getById(id);
    if (!student) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: notfound,
      });
    }
    return res.status(HTTP_STATUS.OK).json(student);
  } catch (error) {
    return next(error);
  }
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const student = await studentService.create(req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      ...student.toJSON(),
      enrollments: []
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: 'email already taken',
      });
    }
    return next(error);
  }
};

export const deleteById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const isDeleted = await studentService.deleteById(id);
    if (!isDeleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: notfound,
      });
    }
    return res.status(HTTP_STATUS.NO_CONTENT).json({
      message: 'deleted',
    });
  } catch (error) {
    return next(error);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const student = await studentService.update(id, req.body);
    if (!student) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: notfound,
      });
    }
    return res.status(HTTP_STATUS.OK).json(student);
  } catch (error) {
    return next(error);
  }
};
