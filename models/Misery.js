module.exports = (sequelize, DataTypes) => {
	return sequelize.define('misery', {
        psalm_number: {
            type: DataTypes.INTEGER,
            unique: true,

        },
        psalm_text: {
            type: DataTypes.TEXT,
            
        },
        ends_world: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }

}, {
    timestamps: false,
});
};