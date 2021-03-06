//Import required packages
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Initialize Comment model (table) by extending off Sequelize's Model Class
class Comment extends Model {};

//Set up fields and rules for Comment model 
Comment.init (
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            autoIncrement: true, 
            primaryKey: true
        },
        comment_text: {
            type: DataTypes.STRING,
            allowNull: false, 
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        },
        launch_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "launch",
                key: "id"
            }
            
        }
    },
    {
        //Create rules for Comment Model
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "comment"
    }
);

//Export Comment model
module.exports = Comment;