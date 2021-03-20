module.exports = (sequelize, DataTypes) => {
	return sequelize.define('misery', {
        psalmNumber: {
            type: DataTypes.INTEGER,
         

        },
        psalmText: {
            type: DataTypes.STRING,
            
        },
        endsWorld: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }

}, {
    timestamps: false,
});
};