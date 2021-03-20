module.exports = (sequelize, DataTypes) => {
	return sequelize.define('class', {   
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        description: {
            type: DataTypes.STRING
        },
        strengthGenModifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        presenceGenModifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        agilityGenModifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        toughnessGenModifier: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        omenDice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        hitDice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        startingSilverd6Quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        weaponDice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        armourDice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        originDice: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        originDescription: {
            type: DataTypes.STRING,
        },
        specialisationRolls: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }

}, {
    timestamps: false,
});
};