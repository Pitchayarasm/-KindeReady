module.exports = function(sequelize, DataTypes) {
    var Unit2 = sequelize.define("Unit2",{
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
    },{
        timestamps : false
    });
  
      Unit2.associate = function(models) {
        Unit2.belongsTo(models.Student, {
          foreignKey: "studentId"
        });
      };
      return Unit2;
    };