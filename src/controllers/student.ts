import { NextFunction, Request, Response } from 'express';
import { UniqueConstraintError } from 'sequelize';
import { ParamsDictionary } from 'express-serve-static-core';

import { studentService } from '../services';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../constants';

type Query = {
  page: string;
  limit: string;
  search: string;
  groups: string[]
}

export const getAll = async (
  req: Request<ParamsDictionary, any, any, Query>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10, search = '', groups = [] } = req.query;

    const students = await studentService.getAll({
      page: Number(page),
      limit: Number(limit),
      search,
      groups: groups.map((groupId: string) => Number(groupId))
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
        message: RESPONSE_MESSAGES.STUDENT_NOT_FOUND,
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
        message: RESPONSE_MESSAGES.EMAIL_TAKEN,
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
        message: RESPONSE_MESSAGES.STUDENT_NOT_FOUND,
      });
    }
    return res.status(HTTP_STATUS.NO_CONTENT).json({
      message: RESPONSE_MESSAGES.DELETED,
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
        message: RESPONSE_MESSAGES.STUDENT_NOT_FOUND,
      });
    }
    return res.status(HTTP_STATUS.OK).json(student);
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(HTTP_STATUS.CONFLICT).json({
        message: RESPONSE_MESSAGES.EMAIL_TAKEN,
      });
    }
    return next(error);
  }
};
