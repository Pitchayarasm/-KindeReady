module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User",{
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
      email : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            isEmail: true,  // checks for email format (foo@bar.com)
            len : [5]
        }
      },
      password : {
        type : DataTypes.STRING,
        allowNull : false,
      },
      token : {
        type : DataTypes.STRING,
        allowNull : true
      },
    },{
        timestamps : false
    });

    return User;
  };

