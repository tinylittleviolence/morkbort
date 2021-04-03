module.exports = (sequelize, DataTypes) => {
	return sequelize.define('character', {
        user_id: {
            type: DataTypes.STRING,
        },
		name: {
			type: DataTypes.STRING,
			defaultValue: 'Nameless',
			allowNull: false,
		},
        class: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
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
        max_hp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        current_hp: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },
        power_uses: {
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
        traits: { 
            type: DataTypes.TEXT,
        },
        broken_bodies: { 
            type: DataTypes.TEXT,
        },
        habits: { 
            type: DataTypes.TEXT,
        },
        origin: {
            type: DataTypes.TEXT,
        },

	}, {
		timestamps: false,
	});
};