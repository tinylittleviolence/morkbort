module.exports = (sequelize, DataTypes) => {
	return sequelize.define('innate', {
        class_roll: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            
        },
        description: {
            type: DataTypes.TEXT,
            
        },

}, {
    timestamps: false,
});
};