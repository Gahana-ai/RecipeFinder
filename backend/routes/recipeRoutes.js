import express from 'express';
import { 
    addRecipe, 
    getAllRecipes, 
    getRecipeById, 
    searchRecipes, 
    getRecipesByCategory, 
    getUserRecipes, 
    updateRecipe, 
    deleteRecipe 
} from '../controllers/recipeController.js';

const router = express.Router();

// Specific query and filter routes (Must stay above /:id)
router.get('/search', searchRecipes);
router.get('/category/:category', getRecipesByCategory);
router.get('/user/:userId', getUserRecipes); 

// Base collection routes
router.route('/')
    .post(addRecipe)
    .get(getAllRecipes);

// Individual resource routes by Recipe ID
router.route('/:id')
    .get(getRecipeById)
    .put(updateRecipe)
    .delete(deleteRecipe);

export default router;