module.exports = (sequelize, DataTypes) => {
	return sequelize.define('item', {
        name: {
            type: DataTypes.STRING,
            defaultValue: 0,
            allowNull: false,
            unique: true,
        },
        effect: {
            type: DataTypes.TEXT,
            
        },
        scroll_type: {
            type: DataTypes.STRING, 
        },
        roll: {
            type: DataTypes.INTEGER, 
        }
    
}, {
    timestamps: false,
});
};