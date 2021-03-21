module.exports = (sequelize, DataTypes) => {
	return sequelize.define('ability', {
		name: {
            type: DataTypes.STRING,
            unique: true,
        },
        tag: {
            type: DataTypes.STRING,
            unique: true,
        },
	}, {
		timestamps: false,
	});
};