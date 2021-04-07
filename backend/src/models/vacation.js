const { Model } = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Vacation extends Model {
        static associate(models) {
            // define association here
        }
    }

    Vacation.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            startDate: DataTypes.DATEONLY,
            endDate: DataTypes.DATEONLY,
            confirmed: DataTypes.BOOLEAN,
            userId: DataTypes.UUID
        },
        {
            sequelize,
            modelName: 'Vacation',
            timestamps: true
        }
    );

    return Vacation;
};
