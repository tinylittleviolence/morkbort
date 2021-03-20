module.exports = (sequelize, DataTypes) => {
	return sequelize.define('player', {
        user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
        
	}, {
		timestamps: false,
	});
};