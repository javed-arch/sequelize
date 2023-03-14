module.exports = (sequelize, DataTypes) => {
    const Comments = sequelize.define('Comments', {
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_id:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Comments;
}