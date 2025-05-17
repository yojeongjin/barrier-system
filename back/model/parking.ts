import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Parking extends Model {
  public readonly id!: number;
  public car_number!: string;
  public phone_number!: string;
  public reduction_type!: string;
  public use_from!: Date;
  public use_to?: Date;
  public parking_status!: string;
}

Parking.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    car_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    reduction_type: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    use_from: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    use_to: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    parking_status: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Parking',
    tableName: 'tbl_parking_list',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export default Parking;
