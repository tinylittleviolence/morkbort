module.exports = (sequelize, DataTypes) => {
	return sequelize.define('misery', {
        psalm_number: {
            type: DataTypes.INTEGER,
         

        },
        psalm_text: {
            type: DataTypes.STRING,
            
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