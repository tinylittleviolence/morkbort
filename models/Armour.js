module.exports = (sequelize, DataTypes) => {
	return sequelize.define('armour', {
        tier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        damage_modifier_dice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        defence_modifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        agility_test_modifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        roll: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }

}, {
    timestamps: false,
});
};