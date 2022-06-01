import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeConnection from '../config';

interface StudyGroupAttributes {
  id: number;
  name: string;
  leader: string;
  subject: string;
  time: string;
  createdAt?: Date;
  updatedAt?: Date;
}

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
}

StudyGroup.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    leader: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING
    },
   time: {
     type: DataTypes.STRING
   }
  }, {
    timestamps: true,
    sequelize: sequelizeConnection
  }
);

export default StudyGroup;
