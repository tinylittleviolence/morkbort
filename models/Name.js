module.exports = (sequelize, DataTypes) => {
	return sequelize.define('name', {
        roll_one: {
            type: DataTypes.INTEGER,

                },
        roll_two: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

        name: {
            type: DataTypes.TEXT,
            unique: true,


        },

        
}, {
    timestamps: false,
});
};