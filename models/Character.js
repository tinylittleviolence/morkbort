module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character', {
		name: {
			type: DataTypes.STRING,
			defaultValue: 'Nameless',
			allowNull: false,
		},
        omens: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        silver: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        maxHp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        currentHp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        powerUses: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        infected: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        broken: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        dead: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },

	}, {
		timestamps: false,
	});
};