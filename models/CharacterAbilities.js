module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_ability', {
        character_id: DataTypes.INTEGER,
        strength: DataTypes.INTEGER,
        presence: DataTypes.INTEGER,
        agility: DataTypes.INTEGER,
        toughness: DataTypes.INTEGER,

    }, {
		timestamps: false,
	});
};