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
        damage_dice_number: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,

        },
        damage_modifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            
        },
        attack_dr_modifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            
        },
        defence_dr_modifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            
        },
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        is_ranged: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }

}, {
    timestamps: false,
});
};