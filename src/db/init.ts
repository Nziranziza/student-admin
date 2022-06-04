import { Student, StudyGroup, Enrollment } from './models';

const isDevMode = process.env.NODE_ENV === 'development';

const databaseInit = async () => {
  await Student.sync({
    force: isDevMode,
  });
  await StudyGroup.sync({
    force: isDevMode
  });
  await Enrollment.sync({
    force: isDevMode
  })
}

export default databaseInit;
