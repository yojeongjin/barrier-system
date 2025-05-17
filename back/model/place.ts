import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Place extends Model {
  public readonly id!: number;
  public base_name!: string;
  public base_address!: string;
  public base_time!: string;
  public base_fee?: number;
  public base_image?: string;
}

Place.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    base_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    base_address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    base_time: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    base_fee: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    base_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Place',
    tableName: 'tbl_place',
    charset: 'utf8',
    collate: 'utf8_general_ci',
  }
);

export default Place;
