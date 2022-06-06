type StudentRow = {
  id: number;
  name: string;
  sex: string;
  groups: string[];
  placeOfBirth: string;
  dateOfBirth: string;
  email: string;
};
export function createStudentRow(
  id: number,
  name: string = '',
  sex: string = '',
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

export function studentDataToRows(data: any[] = []): StudentRow[] {
  return data.map((student: any) =>
    createStudentRow(
      student.id,
      student.name,
      student.sex,
      student.placeOfBirth,
      student.dateOfBirth,
      student.enrollments?.map(({ StudyGroup }: any) => StudyGroup),
      student.email
    )
  );
}
