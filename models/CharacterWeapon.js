module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_weapon', {
		character_id: DataTypes.STRING,
		weapon_id: DataTypes.STRING,

    }, {
		timestamps: false,
	});
};