module.exports = (sequelize, DataTypes) => {
	return sequelize.define('game_player', {
        game_id: DataTypes.STRING,
        player_id: DataTypes.STRING,
        isDM: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false,
        },

}, {
    timestamps: false,
});
};