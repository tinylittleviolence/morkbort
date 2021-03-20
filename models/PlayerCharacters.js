module.exports = (sequelize, DataTypes) => {
	return sequelize.define('player_character', {

        user_id: DataTypes.STRING,
        character_id: DataTypes.STRING,

    }, {
		timestamps: false,
	});
};