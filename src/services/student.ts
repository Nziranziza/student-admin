import { Op } from 'sequelize';
import { Enrollment, Student, StudyGroup } from '../db/models';
import { StudentInput } from '../db/models/Student';

type GetAllFilters = {
  page?: number;
  limit?: number;
  search?: any;
};

type Where = {
  name?: {
    [Op.like]: string;
  };
};

type GetAllResponse = {
  page: number;
  pages: number;
  pageSize: number;
  count: number;
  data: Student[];
};

export const getAll = async ({
  limit = 10,
  page = 1,
  search,
}: GetAllFilters = {}): Promise<GetAllResponse> => {
  const offset: number = (page - 1) * limit;
  let where: Where = {};
  if (search) {
    where = {
      name: {
        [Op.like]: `%${search}%`,
      },
    };
  }
  const count = await Student.count({
    where,
  });
  const data = await Student.findAll({
    limit,
    offset,
    where,
    include: [
      {
        model: Enrollment,
        attributes: ['id'],
        as: 'enrollments',
        include: [StudyGroup],
      },
    ],
  });
  return {
    page,
    pages: Math.ceil(count / limit) || 1,
    pageSize: limit,
    count,
    data,
  };
};

export const getById = (id: number): Promise<Student | null> => {
  return Student.findByPk(id, {
    include: [
      {
        model: Enrollment,
        attributes: ['id'],
        as: 'enrollments',
        include: [StudyGroup],
      },
    ],
  });
};

export const create = (payload: StudentInput): Promise<Student> => {
  return Student.create(payload);
};

export const deleteById = (id: number): Promise<number> => {
  return Student.destroy({
    where: {
      id,
    },
  });
};

export const update = async (
  id: number,
  payload: Partial<StudentInput>
): Promise<Student | null> => {
  const student = await Student.findByPk(id);
  if (!student) {
    return null;
  }
  return student.update(payload);
};
