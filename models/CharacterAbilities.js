module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_ability', {
        character_id: DataTypes.STRING,
        strength: DataTypes.INTEGER,
        presence: DataTypes.INTEGER,
        agility: DataTypes.INTEGER,
        toughness: DataTypes.INTEGER,

    }, {
		timestamps: false,
	});
};