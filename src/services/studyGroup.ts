import { Enrollment, Student, StudyGroup } from '../db/models';
import { StudyGroupInput } from '../db/models/StudyGroup';

export const getAll = (): Promise<StudyGroup[]> => {
  return StudyGroup.findAll({
    include: [
      {
        model: Enrollment,
        attributes: ['id'],
        as: 'enrolled',
        include: [Student],
      },
    ],
  });
};

export const getById = (id: number): Promise<StudyGroup | null> => {
  return StudyGroup.findByPk(id, {
    include: [
      {
        model: Enrollment,
        attributes: ['id'],
        as: 'enrolled',
        include: [Student],
      },
    ],
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
  const studyGroup = await StudyGroup.findByPk(id);
  if (!studyGroup) {
    return null;
  }
  return studyGroup.update(payload);
};
