import { Op } from 'sequelize';
import { Enrollment, Student, StudyGroup } from '../db/models';
import { StudentInput } from '../db/models/Student';

type GetAllFilters = {
  page?: number;
  limit?: number;
  search?: string;
  groups?: number[];
};

type WhereStudyGroup = {
  '$enrollments.studyGroupId$': number;
};

type Where = {
  name?: {
    [Op.like]: string;
  };
  [Op.or]?: WhereStudyGroup[];
};

type GetAllResponse = {
  page: number;
  pages: number;
  pageSize: number;
  count: number;
  data: Student[];
};

const include = [
  {
    model: Enrollment,
    attributes: ['id'],
    as: 'enrollments',
    include: [StudyGroup]
  }
]

export const getAll = async ({
  limit = 10,
  page = 1,
  search,
  groups = [],
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
  if (groups.length) {
    where = {
      ...where,
      [Op.or]: [
        ...groups.map((groupId) => ({ '$enrollments.studyGroupId$': groupId })),
      ],
    };
  }

  const count = await Student.count({
    where,
    include,
  });

  const data = await Student.findAll({
    limit,
    offset,
    where,
    subQuery: false,
    include,
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
    include,
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
  const student = await Student.findByPk(id, {
    include
  });
  if (!student) {
    return null;
  }
  return student.update(payload);
};
