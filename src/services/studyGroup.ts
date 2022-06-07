import { Op } from 'sequelize';

import { Enrollment, Student, StudyGroup } from '../db/models';
import { StudyGroupInput } from '../db/models/StudyGroup';

type GetAllResponse = {
  page: number;
  pages: number;
  pageSize: number;
  count: number;
  data: StudyGroup[];
  studentCount: number;
};

type GetAllFilters = {
  page?: number;
  limit?: number;
  search?: string;
};

type Where = {
  name?: {
    [Op.like]: string;
  };
};

const include = [{
  model: Enrollment,
  attributes: ['id'],
  as: 'enrolled',
  include: [{
    model: Student,
    as: 'student'
  }],
}]

export const getAll = async ({
  limit = 10,
  page = 1,
  search,
}: GetAllFilters = {}): Promise<GetAllResponse> => {
  const offset: number = (page - 1) * limit;
  let where: Where = {};
  const studentCount = await Enrollment.count({
    col: 'studentId',
    distinct: true,
  });

  if (search) {
    where = {
      name: {
        [Op.like]: `%${search}%`,
      },
    };
  }
  const count = await StudyGroup.count({
    where,
  });

  const data = await StudyGroup.findAll({
    limit,
    offset,
    where,
    include,
  });

  return {
    page,
    pages: Math.ceil(count / limit) || 1,
    pageSize: limit,
    count,
    studentCount,
    data,
  };
};

export const getById = (id: number): Promise<StudyGroup | null> => {
  return StudyGroup.findByPk(id, {
    include,
  });
};

export const create = (payload: StudyGroupInput): Promise<StudyGroup> => {
  return StudyGroup.create(payload);
};

export const deleteById = (id: number): Promise<number> => {
  return StudyGroup.destroy({
    where: {
      id,
    },
  });
};

export const update = async (
  id: number,
  payload: Partial<StudyGroupInput>
): Promise<StudyGroup | null> => {
  const studyGroup = await StudyGroup.findByPk(id, {
    include
  });
  if (!studyGroup) {
    return null;
  }
  return studyGroup.update(payload);
};
