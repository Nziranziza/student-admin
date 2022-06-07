import { Student, StudyGroup, Enrollment } from './models';

const isDevMode = process.env.NODE_ENV === 'development';

const databaseInit = async () => {
  await Student.sync({
    alter: isDevMode,
  });
  await StudyGroup.sync({
    alter: isDevMode
  });
  await Enrollment.sync({
    alter: isDevMode
  })
}

export default databaseInit;
