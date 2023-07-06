const express = require("express");
const Category = require("../models/Category");
const Product = require('../models/Product');
const routerCategory = express.Router();

routerCategory.post("/create", async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    return res.status(201).send(category);
  } catch (error) {
    return res.status(500).json({ error: 'Error adding the category' });
  }
});

routerCategory.delete('/remove/:name', async (req, res) => {
    const { name } = req.params;
    try {
      const category = await Category.findOne({ where: { name } });
  
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
  
      await category.destroy();
      return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  

routerCategory.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.update(name,{where: {id:id}});
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.send(category);
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
});

routerCategory.post('/:productId/addCategory/:categoryId', async (req, res) => {
  const { productId, categoryId } = req.params;

  try {
    const product = await Product.findByPk(productId);
    const catt = await Category.findByPk(categoryId);

    if (!product || !catt) {
      return res.status(404).json({ error: 'Product or category not found' });
    }
    await product.addCategory(catt);

    return res.status(200).json({ message: 'Category added to product successfully' });
  } catch (error) {
    console.error('Error adding category to product:', error);
    return res.status(500).json({ error: 'Error adding category to product' });
  }
});

  
routerCategory.get('/productsByCategory/:categoryName', async (req, res) => {
    const { categoryName } = req.params;
  
    try {
      const products = await Product.findAll({
        include: [
          {
            model: Category,
            through: {
              model: ProductCategory,
              where: { name: categoryName },
            },
          },
        ],
      });
  
      res.status(200).json({ products });
    } catch (error) {
      res.status(500).json({ error: 'Error getting products by category' });
    }
});

routerCategory.get("/", async (req,res)=>{
    try{
    const categories = await Category.findAll(req.body)
    res.send(categories)
    }
    catch{
        res.status(500).json({ error: 'Error getting  category' });
    }
})

module.exports = routerCategory;
