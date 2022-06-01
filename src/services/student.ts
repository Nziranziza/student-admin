import { Student } from '../db/models';

export const getAll  = (): Promise<Student[]> => {
  return Student.findAll()
}