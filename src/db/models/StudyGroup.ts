import { DataTypes, Model, ModelStatic, Optional } from 'sequelize';

import sequelizeConnection from '../config';
import { EnrollmentAttributes, EnrollmentInput } from './Enrollment';

export interface StudyGroupAttributes {
  id: number;
  name: string;
  leader: string;
  subject: string;
  time: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type AssociatedModels = {
  Enrollment: ModelStatic<Model<EnrollmentAttributes, EnrollmentInput>>;
};

export interface StudyGroupInput extends Optional<StudyGroupAttributes, 'id'> {}

class StudyGroup
  extends Model<StudyGroupAttributes, StudyGroupInput>
  implements StudyGroupAttributes
{
  public id!: number;
  public name!: string;
  public leader!: string;
  public subject!: string;
  public time!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;

  static associate({ Enrollment }: AssociatedModels) {
    this.hasMany(Enrollment, {
      foreignKey: 'studyGroupId',
      onDelete: 'CASCADE',
      as: 'enrolled',
    });
  }
}

StudyGroup.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    leader: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    time: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  }
);

export default StudyGroup;
