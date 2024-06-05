module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
   
   
   
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2,
        references: {
            model: 'Role', 
            key: 'id'      
          }
    },
    
}, {
    tableName: 'users',
    timestamps: false
    });
  
    return User;
  };
  