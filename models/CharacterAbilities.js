module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character_ability', {
        user_id: DataTypes.STRING,
        ability_id: DataTypes.STRING,
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }

    }, {
		timestamps: false,
	});
};