module.exports = (sequelize, DataTypes) => {
	return sequelize.define('brokenbodies', {
        roll: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0
		},
		name: {
			type: DataTypes.STRING,
			unique: true,
		},

	}, {
		timestamps: false,
	});
};