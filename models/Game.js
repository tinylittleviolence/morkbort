module.exports = (sequelize, DataTypes) => {
	return sequelize.define('game', {
        channel: {
            type: DataTypes.STRING,
            unique: true,

        },
        misery_dice: {
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