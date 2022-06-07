import { GetStudentResponse, Gender } from '../services/student';

export type StudentRow = {
  id: number;
  name: string;
  sex: Gender;
  groups: string[];
  placeOfBirth: string;
  dateOfBirth: string;
  email: string;
};

export function createStudentRow(
  id: number,
  name: string = '',
  sex: Gender,
  placeOfBirth: string = '',
  dateOfBirth: string = '',
  groups: any[] = [],
  email: string = ''
): StudentRow {
  return {
    id,
    name,
    sex,
    placeOfBirth,
    dateOfBirth,
    groups: groups.map(({ name }) => name),
    email,
  };
}

export function studentDataToRows(data: GetStudentResponse[] = []): StudentRow[] {
  return data.map(({
    id,
    name,
    sex,
    placeOfBirth,
    dateOfBirth,
    enrollments = [],
    email
  }) =>
    createStudentRow(
      id,
      name,
      sex,
      placeOfBirth,
      dateOfBirth,
      enrollments?.map(({ studyGroup }) => studyGroup),
      email
    )
  );
}
