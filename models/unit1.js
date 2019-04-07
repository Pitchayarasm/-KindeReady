module.exports = function(sequelize, DataTypes) {
    var Unit1 = sequelize.define("Unit1",{
        act1 : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        act2 : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        act3 : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        },
        summary : {
            type : DataTypes.BOOLEAN,
            defaultValue : false
        }
    });
  
      Unit1.associate = function(models) {
        Unit1.belongsTo(models.Student, {
          foreignKey: "studentId"
        });
      };
      return Unit1;
    };
