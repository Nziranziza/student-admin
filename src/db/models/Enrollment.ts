import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface EnrollmentAttributes {
  id: number;
  studyGroupId: number;
  studentId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

type AssociatedModels = {
  StudyGroup: ModelStatic<Model<any, any>>,
  Student: ModelStatic<Model<any, any>>
}

export interface EnrollmentInput extends Optional<EnrollmentAttributes, 'id'> {}

class Enrollment extends Model<EnrollmentAttributes, EnrollmentInput> implements EnrollmentAttributes {
  public id!: number;
  public studyGroupId!: number;
  public studentId!: number;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  static associate({ StudyGroup, Student }: AssociatedModels) {
    this.belongsTo(StudyGroup, { foreignKey: 'studyGroupId' });
    this.belongsTo(Student, { foreignKey: 'studentId' })
  }
}

Enrollment.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  }, 
  studentId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  studyGroupId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
}, {
  timestamps: true,
  sequelize: sequelizeConnection
});

export default Enrollment;
