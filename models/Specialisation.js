module.exports = (sequelize, DataTypes) => {
	return sequelize.define('specialisation', {
        name: {
            type: DataTypes.STRING,
            unique: true,

        },
        description: {
            type: DataTypes.STRING,
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