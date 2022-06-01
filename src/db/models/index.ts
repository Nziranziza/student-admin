import Student from './Student';
import StudyGroup from './StudyGroup';
import Enrollment from './Enrollment';

Enrollment.associate({ Student, StudyGroup });
Student.associate({ Enrollment });
StudyGroup.associate({ Enrollment })

export {
  Student,
  StudyGroup,
  Enrollment
}