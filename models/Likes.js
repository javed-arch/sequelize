module.exports = (sequelize, DataTypes) => {
    const Likes = sequelize.define('Likes', {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_id:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Likes;
}