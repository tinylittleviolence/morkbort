module.exports = (sequelize, DataTypes) => {
	return sequelize.define('class', {   
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        roll: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        description: {
            type: DataTypes.TEXT
        },
        strength_gen_modifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        presence_gen_modifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        agility_gen_modifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        toughness_gen_modifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        omen_dice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        hit_dice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        starting_silver_d6_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        weapon_dice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        armour_dice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        origin_dice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        origin_description: {
            type: DataTypes.STRING,
        },
        specialisation_rolls: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }

}, {
    timestamps: false,
});
};