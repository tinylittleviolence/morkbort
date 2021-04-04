module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_weapon', {
		character_id: DataTypes.INTEGER,
		weapon_id: DataTypes.STRING,
		worn: DataTypes.INTEGER,
		
    }, {
		timestamps: false,
	});
};