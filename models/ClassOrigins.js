module.exports = (sequelize, DataTypes) => {
	return sequelize.define('class_origin', {
        class_id: DataTypes.STRING,
        origin_id: DataTypes.STRING
       
}, {
    timestamps: false,
});
};