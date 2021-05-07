const { Model } = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        static ADMIN = 'admin';
        static USER = 'user';

        isAdmin() {
            return this.name === Role.ADMIN;
        }

        static associate(models) {
            Role.belongsToMany(models.User, {
                as: 'users',
                foreignKey: 'roleId',
                sourceKey: 'id',
                through: 'RoleUser'
            });
        }
    }

    Role.init(
        {
            name: {
                type: DataTypes.UUID,
                unique: true,
                allowNull: false
            },
            id: {
                primaryKey: true,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4
            }
        },
        {
            sequelize,
            paranoid: true,
            modelName: 'Role',
            timestamps: true
        }
    );

    return Role;
};
