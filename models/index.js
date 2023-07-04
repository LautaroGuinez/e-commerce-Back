const User = require("./Users")
const Product = require("./Product")
const Cars = require("./Cars")

User.hasMany(Product)
Product.belongsTo(User)

User.hasOne(Cars, {
    foreignKey: "userId",
    as: "cars"
})
Cars.belongsTo(User,{
    foreignKey: "userId"
})