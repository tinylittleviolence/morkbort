module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_armour', {
		character_id: DataTypes.STRING,
		armour_id: DataTypes.STRING,

    }, {
		timestamps: false,
	});
};