module.exports = (sequelize, DataTypes) => {
	return sequelize.define('inventory', {

        player_id: DataTypes.STRING,
        item_id: DataTypes.STRING,
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        }
            
}, {
    timestamps: false,
});
};