module.exports = (sequelize, DataTypes) => {
	return sequelize.define('item', {
        name: {
            type: DataTypes.STRING,
            defaultValue: 0,
            allowNull: false,
            unique: true,
        },
        flavourText: {
            type: DataTypes.STRING,
            
        },
        value: {
            type: DataTypes.STRING,
            defaultValue: 0,
            allowNull: false,
        },
        size: {
            type: DataTypes.STRING,
            defaultValue: 'Normal',
            allowNull: false,
        },

    
}, {
    timestamps: false,
});
};