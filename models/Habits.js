module.exports = (sequelize, DataTypes) => {
	return sequelize.define('habit', {
        roll: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		name: {
			type: DataTypes.TEXT,
			unique: true,
		},

	}, {
		timestamps: false,
	});
};