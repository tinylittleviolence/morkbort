module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_armour', {
		character_id: DataTypes.INTEGER,
		armour_id: DataTypes.STRING,
		worn: DataTypes.INTEGER,

    }, {
		timestamps: false,
	});
};