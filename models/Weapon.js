module.exports = (sequelize, DataTypes) => {
	return sequelize.define('weapon', {
        name: {
            type: DataTypes.STRING,
        },
        roll: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        damage_dice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },

}, {
    timestamps: false,
});
};