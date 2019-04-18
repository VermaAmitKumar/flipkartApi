const Category = require('../Model/categoryModel')
const SubCategory = require('../Model/SubCategoryModel')
const Product = require('../model/ProductModel')
const FeedBack = require('../model/FeedbackModel')
const PrdouctImage = require('../model/ProductImageModel')
const Register = require('../model/RegisterModel')
const Cart = require('../model/cartModel')

SubCategory.belongsTo(Category, { foreignKey: 'CategoryId' });

PrdouctImage.belongsTo(Product, { foreignKey: 'ProductId' })

Product.belongsTo(Category, { foreignKey: 'CategoryId', as: "category" });
Product.belongsTo(SubCategory, { foreignKey: 'SubCategoryId', as: "SUbCategory" });
Product.hasMany(PrdouctImage, { foreignKey: 'ProductId', as: "productIMAGE" })

Category.hasMany(SubCategory, { foreignKey: 'CategoryId', as: "cat" });
SubCategory.hasOne(Category, { foreignKey: 'CategoryId', as: "subcat" });

Cart.belongsTo(Product, { foreignKey: 'ProductId' })

Cart.belongsTo(Register, { foreignKey: 'Id' })

module.exports = { Category, SubCategory, Product, FeedBack, PrdouctImage, Register, Cart }