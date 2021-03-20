module.exports = (sequelize, DataTypes) => {
	return sequelize.define('ability', {
		name: {
            type: DataTypes.STRING,
            unique: true,
        },
        minRoll: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        maxRoll: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
	}, {
		timestamps: false,
	});
};