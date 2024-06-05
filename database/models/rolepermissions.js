module.exports = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define('RolePermission', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      roleId:{
        type:DataTypes.INTEGER,
        references: {
          model: 'Role', 
          key: 'id'      
        }
      },
      permissionId:{
        type:DataTypes.INTEGER,
        references: {
          model: 'Permission',
          key: 'id'
        }
      }
    },{
      tableName: 'role_permissions',
      timestamps: false
      });
  
    return RolePermission;
  };
  