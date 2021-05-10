const { Model } = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Contract extends Model {
        static associate(models) {
            Contract.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'userId',
                sourceKey: 'id'
            });
        }
    }

    Contract.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false
            },
            startDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            endDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            sequelize,
            paranoid: true,
            modelName: 'Contract',
            timestamps: true
        }
    );

    return Contract;
};
