const User = require("./Users")
const Product = require("./Product")
const Cars = require("./Cars")
const Category = require("./Category")

User.hasMany(Product)
Product.belongsTo(User)

User.hasOne(Cars)
Cars.belongsTo(User)

Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });