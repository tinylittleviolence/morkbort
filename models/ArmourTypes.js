module.exports = (sequelize, DataTypes) => {
	return sequelize.define('armour_types', {
        tier: {
            type: DataTypes.INTEGER,

        },
        armour_type: {
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