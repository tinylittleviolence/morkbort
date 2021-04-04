module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_specialisation', {
		character_id: DataTypes.INTEGER,
		specialisation_id: DataTypes.STRING,

		
    }, {
		timestamps: false,
	});
};