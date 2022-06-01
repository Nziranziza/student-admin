import { Student } from './models';

const databaseInit = () => {
  Student.sync({
    alter: process.env.NODE_ENV === 'development',
  })
}

export default databaseInit;
