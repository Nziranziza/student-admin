import { Student, StudyGroup } from './models';

const isDevMode = process.env.NODE_ENV === 'development';

const databaseInit = () => {
  Student.sync({
    alter: isDevMode,
  });
  StudyGroup.sync({
    alter: isDevMode
  })
}

export default databaseInit;
