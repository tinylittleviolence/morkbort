module.exports = (sequelize, DataTypes) => {
	return sequelize.define('game_misery', {
        game_id: DataTypes.STRING,
        psalm_number: DataTypes.INTEGER

}, {
    timestamps: false,
});
};