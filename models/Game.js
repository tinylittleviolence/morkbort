module.exports = (sequelize, DataTypes) => {
	return sequelize.define('game', {
        userId: {
            type: DataTypes.STRING,
            unique: true,

        },
        channel: {
            type: DataTypes.STRING,
            unique: true,

        },
        miseryDice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        miseries: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }

}, {
    timestamps: false,
});
};