module.exports = (sequelize, DataTypes) => {
	return sequelize.define('item', {
        name: {
            type: DataTypes.STRING,
            defaultValue: 0,
            allowNull: false,
            unique: true,
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
        },
        is_scroll: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        custom_flavour_text: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        }
    
}, {
    timestamps: false,
});
};