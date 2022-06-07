import { Student, StudyGroup, Enrollment } from './models';
import { students, enrollments, studyGroups } from '../constants/seeds';

const databseSeeder = async () => {
  try {
    await Enrollment.sync();
    await Student.sync();
    await StudyGroup.sync();
    await Enrollment.destroy({ where: {}});
    await Student.destroy({ where: {}});
    await StudyGroup.destroy({ where: {} });
    await Student.bulkCreate(
      students.map((student, index) => ({
        id: index + 1,
        ...student,
      }))
    );
    await StudyGroup.bulkCreate(
      studyGroups.map((studyGroup, index) => ({
        id: index + 1,
        ...studyGroup,
      }))
    );
    await Enrollment.bulkCreate(
      enrollments.map((enrollment, index) => ({
        id: index + 1,
        ...enrollment,
      }))
    );
  } catch (error) {
    console.log('seeding failed with error:', error);
  }
};

databseSeeder();

export default databseSeeder;
