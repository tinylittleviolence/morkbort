module.exports = (sequelize, DataTypes) => {
	return sequelize.define('innate', {
        name: {
            type: DataTypes.STRING,
            unique: true,

        },
        roll: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }

}, {
    timestamps: false,
});
};