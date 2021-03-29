module.exports = (sequelize, DataTypes) => {
	return sequelize.define('origin', {
        class: {
            type: DataTypes.STRING,
            unique: true,
        },
        roll: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

        description: {
            type: DataTypes.TEXT,
            unique: true,

        },

        
}, {
    timestamps: false,
});
};