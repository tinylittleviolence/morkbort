module.exports = (sequelize, DataTypes) => {
	return sequelize.define('origin', {
        class_roll: {
            type: DataTypes.INTEGER,

                },
        roll: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

        description: {
            type: DataTypes.TEXT,


        },

        
}, {
    timestamps: false,
});
};