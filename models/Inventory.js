module.exports = (sequelize, DataTypes) => {
	return sequelize.define('inventory', {

        character_id: DataTypes.STRING,

        name: {
            type: DataTypes.STRING,
            defaultValue: 0,
            allowNull: false,
        },
        flavour_text: {
            type: DataTypes.TEXT,
            
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
        is_scroll: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
      
              
}, {
    timestamps: false,
    //freezeTableName: true
});
};