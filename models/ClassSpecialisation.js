module.exports = (sequelize, DataTypes) => {
	return sequelize.define('class_specialisation', {
        class_id: DataTypes.STRING,
        specialisation_id: DataTypes.STRING
       
}, {
    timestamps: false,
});
};