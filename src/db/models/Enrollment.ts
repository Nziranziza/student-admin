import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';

import sequelizeConnection from '../config';
import { StudentAttributes, StudentInput } from './Student';
import { StudyGroupAttributes, StudyGroupInput } from './StudyGroup'


export interface EnrollmentAttributes {
  id: number;
  studyGroupId: number;
  studentId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type AssociatedModels = {
  StudyGroup: ModelStatic<Model<StudyGroupAttributes, StudyGroupInput>>;
  Student: ModelStatic<Model<StudentAttributes, StudentInput>>;
};

export interface EnrollmentInput extends Optional<EnrollmentAttributes, 'id'> {}

class Enrollment
  extends Model<EnrollmentAttributes, EnrollmentInput>
  implements EnrollmentAttributes
{
  public id!: number;
  public studyGroupId!: number;
  public studentId!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  static associate({ StudyGroup, Student }: AssociatedModels) {
    this.belongsTo(StudyGroup, { foreignKey: 'studyGroupId', onDelete: 'CASCADE', as: 'studyGroup' });
    this.belongsTo(Student, { foreignKey: 'studentId', onDelete: 'CASCADE', as: 'student' });
  }
}

Enrollment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    studentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    studyGroupId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  }
);

export default Enrollment;
