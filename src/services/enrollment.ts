import { Enrollment } from '../db/models';
import { EnrollmentInput } from '../db/models/Enrollment';

export const create = async (
  payload: EnrollmentInput
): Promise<Enrollment | null> => {
  const { studentId } = payload;
  const enrollments = await Enrollment.count({
    where: {
      studentId,
    },
  });
  if (enrollments >= 4) {
    return null;
  }
  const [enrollment] = await Enrollment.findOrCreate({
    where: payload,
  });

  return enrollment;
};

export const destroy = (
  studyGroupId: number,
  studentId: number
): Promise<number> => {
  return Enrollment.destroy({
    where: {
      studyGroupId,
      studentId,
    },
  });
};
