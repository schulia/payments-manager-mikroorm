import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

interface PayoutAttributes {
  id: string;
  currency: string;
  amount: number;
  transactionId: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PayoutCreationAttributes extends Optional<PayoutAttributes, 'id'> {}

class Payout extends Model<PayoutAttributes, PayoutCreationAttributes> implements PayoutAttributes {
  public id!: string;
  public currency!: string;
  public amount!: number;
  public transactionId!: string;
  public userId!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payout.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'EUR'
    },
    amount :{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
    },
    transactionId: {
      type:  DataTypes.UUID,
      allowNull: false,
      unique: true
    },
    userId : {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'}
      } 
  },
  {
    sequelize,
    tableName: 'payouts'
  }
);

export default Payout;