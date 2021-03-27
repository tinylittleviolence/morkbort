module.exports = (sequelize, DataTypes) => {
	return sequelize.define('item', {
        name: {
            type: DataTypes.STRING,
            defaultValue: 0,
            allowNull: false,
            unique: true,
        },
        flavour_text: {
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
        class_affinity: {
            type: DataTypes.INTEGER
        },
        class_roll: {
            type: DataTypes.INTEGER
        },
        starter_table: {
            type: DataTypes.INTEGER
        },
        starter_roll: {
            type: DataTypes.INTEGER
        }
    
}, {
    timestamps: false,
});
};