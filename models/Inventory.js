module.exports = (sequelize, DataTypes) => {
	return sequelize.define('inventory', {

        player_id: DataTypes.STRING,

        item_id: DataTypes.STRING,

        item_description: DataTypes.TEXT,
      
              
}, {
    timestamps: false,
});
};