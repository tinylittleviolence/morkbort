module.exports = (sequelize, DataTypes) => {
	return sequelize.define('lore', {
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        } ,
        description: DataTypes.TEXT

}, {
    timestamps: false,
});
};