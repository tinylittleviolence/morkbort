module.exports = (sequelize, DataTypes) => {
	return sequelize.define('class_innates', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        },
        description: {
            type: DataTypes.TEXT,
        },
       
}, {
    timestamps: false,
});
};