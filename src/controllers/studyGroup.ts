import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import { studyGroupService, enrollmentService } from '../services';
import { HTTP_STATUS, RESPONSE_MESSAGES } from '../constants';

type Query = {
  search: string;
  limit: string;
  page: string
}

export const getAll = async (
  req: Request<ParamsDictionary, any, any, Query>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, limit = 10, page = 1 } = req.query;
    const studyGroups = await studyGroupService.getAll({
      search,
      limit: Number(limit),
      page: Number(page)
    });
    return res.status(HTTP_STATUS.OK).json(studyGroups);
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
    const studyGroup = await studyGroupService.getById(id);
    if (!studyGroup) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: RESPONSE_MESSAGES.GROUP_NOT_FOUND,
      });
    }
    return res.status(HTTP_STATUS.OK).json(studyGroup);
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
    const studyGroup = await studyGroupService.create(req.body);
    return res.status(HTTP_STATUS.CREATED).json({
      ...studyGroup.toJSON(),
      enrolled: []
    });
  } catch (error) {
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
    const isDeleted = await studyGroupService.deleteById(id);
    if (!isDeleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: RESPONSE_MESSAGES.GROUP_NOT_FOUND,
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
    const studyGroup = await studyGroupService.update(id, req.body);
    if (!studyGroup) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: RESPONSE_MESSAGES.GROUP_NOT_FOUND,
      });
    }
    return res.status(HTTP_STATUS.OK).json(studyGroup);
  } catch (error) {
    return next(error);
  }
};

export const join = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const enrollment = await enrollmentService.create({
      studyGroupId: id,
      ...req.body,
    });
    if (!enrollment) {
      return res.status(HTTP_STATUS.UNPROCESSED).json({
        message: RESPONSE_MESSAGES.GROUP_LIMIT,
      });
    }
    return res.status(HTTP_STATUS.CREATED).json(enrollment);
  } catch (error) {
    return next(error);
  }
};

export const leave = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const studentId = Number(req.body.studentId);
    const isDeleted = await enrollmentService.destroy(id, studentId);
    if (!isDeleted) {
      return res.status(HTTP_STATUS.NOT_FOUND).json({
        message: RESPONSE_MESSAGES.NOT_MEMBER,
      });
    }
    return res.status(HTTP_STATUS.NO_CONTENT).json({
      message: RESPONSE_MESSAGES.LEFT,
    });
  } catch (error) {
    return next(error);
  }
};
