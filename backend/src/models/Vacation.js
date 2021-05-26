const { Model } = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Vacation extends Model {
        static associate(models) {
            Vacation.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'userId',
                sourceKey: 'id'
            });
        }
    }

    Vacation.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            startDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            endDate: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            isConfirmed: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            sequelize,
            paranoid: true,
            modelName: 'Vacation',
            timestamps: true
        }
    );

    return Vacation;
};
