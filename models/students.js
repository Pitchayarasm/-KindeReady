module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student",{
      firstName : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [1],
            isAlpha: true   // will only allow letters
        }
      },
      lastName : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            len : [1],
            isAlpha: true   // will only allow letters
        }
      },
      age : {
        type : DataTypes.INTEGER,
        allowNull : true,
        validate : {
            len : [1,2],
            isNumeric: true          // will only allow numbers
        }
      }, 
      avatar : {
        type : DataTypes.STRING,
        allowNull : true
      },
      unit1Complete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      },
      unit2Complete : {
        type : DataTypes.BOOLEAN,
        defaultValue : false
      }
    },{
        timestamps : false
    });

    Student.associate = function (models) {
      models.Student.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: true,
          name : "userId"
        }
      });
    };
    return Student;
  };