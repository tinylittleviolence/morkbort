module.exports = (sequelize, DataTypes) => {
	return sequelize.define('lore', {
        tag: DataTypes.STRING,
        description: DataTypes.TEXT

}, {
    timestamps: false,
});
};