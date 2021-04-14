const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RoleUser extends Model {
        static associate(models) {
            RoleUser.belongsTo(models.Role, {
                as: 'role',
                foreignKey: 'roleId'
            });
            RoleUser.belongsTo(models.User, {
                as: 'user',
                foreignKey: 'userId'
            });
        }
    }

    RoleUser.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false
            },
            roleId: {
                type: DataTypes.UUID,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'RoleUser',
            freezeTableName: true,
            tableName: 'Role2User'
        }
    );

    return RoleUser;
};
