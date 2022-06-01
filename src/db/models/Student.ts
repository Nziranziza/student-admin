import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface StudentAttributes {
  id: number;
  name: string;
  sex: string;
  placeOfBirth: string;
  dateOfBirth: Date;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface StudentInput extends Optional<StudentAttributes, 'id'> {}
export interface StudentOutput extends Required<StudentAttributes> {}

class Student
  extends Model<StudentAttributes, StudentInput>
  implements StudentAttributes
{
  public id!: number;
  public name!: string;
  public sex!: string;
  public placeOfBirth!: string;
  public dateOfBirth!: Date;
  public email!: string;
  public readonly createdAt?: Date;
  public readonly updatedAt?: Date;
}

Student.init(
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
    sex: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    placeOfBirth: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: true,
    sequelize: sequelizeConnection,
  }
);

export default Student;
