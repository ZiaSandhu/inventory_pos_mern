module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },{
      tableName: 'permissions',
      timestamps: false
      });
  
    return Permission;
  };
  