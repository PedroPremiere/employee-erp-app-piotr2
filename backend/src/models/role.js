const { Model } = require('sequelize');
const { DataTypes } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static associate(models) {
            // define association here
        }
    }
    Role.init(
        {
            title: DataTypes.UUID,
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            }
        },
        {
            sequelize,
            modelName: 'Role',
            timestamps: true
        }
    );

    return Role;
};
