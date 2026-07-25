import Recipe from '../models/Recipe.js';

// 1. Add Recipe (POST /api/recipes)
export const addRecipe = async (req, res) => {
    try {
        const { 
            name, title, 
            description, desc, 
            image, imageUrl,
            ingredients, 
            steps, instructions, 
            cookTime, cookingTime,
            category, 
            type, 
            isCustom, 
            userId, 
            userEmail 
        } = req.body;
        
        const finalName = (name || title || '').trim();
        const finalDescription = (description || desc || '').trim();
        const finalImage = image || imageUrl;
        const finalIngredients = Array.isArray(ingredients) ? ingredients : (ingredients ? [ingredients] : []);
        const finalSteps = Array.isArray(steps) ? steps : (instructions ? (Array.isArray(instructions) ? instructions : [instructions]) : []);
        const finalCookTime = cookTime || cookingTime;
        
        // Ensure userId is not an empty string
        let finalUserId = (userId || req.user?._id || req.user?.id || userEmail || '').toString().trim();
        if (!finalUserId) {
            finalUserId = 'default_user';
        }

        if (!finalName || !finalDescription || !finalImage || !finalCookTime || !category) {
            return res.status(400).json({ 
                message: "Missing required fields: Name, Description, Image, Cook Time, and Category are required." 
            });
        }

        const newRecipe = new Recipe({ 
            name: finalName,
            description: finalDescription,
            image: finalImage, 
            ingredients: finalIngredients, 
            steps: finalSteps, 
            cookTime: String(finalCookTime), 
            category,
            type: type || 'Veg',
            isCustom: isCustom !== undefined ? isCustom : true,
            userId: finalUserId,
            userEmail: userEmail || ''
        });

        await newRecipe.save();
        res.status(201).json({ message: "Recipe added successfully!", recipe: newRecipe });
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to create recipe." });
    }
};

// 2. Get All Recipes (GET /api/recipes)
export const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({}).sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to fetch recipes." });
    }
};

// 3. Get User Specific Recipes (GET /api/recipes/user/:userId)
export const getUserRecipes = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "User ID parameter is required." });
        }
        
        // Exact schema query on userId & userEmail
        const userRecipes = await Recipe.find({
            $or: [
                { userId: String(userId) },
                { userEmail: String(userId) }
            ]
        }).sort({ createdAt: -1 });
        
        res.status(200).json(userRecipes);
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to fetch user recipes." });
    }
};

// 4. Get Single Recipe by ID (GET /api/recipes/:id)
export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to retrieve recipe." });
    }
};

// 5. Search Recipes by Name Only (GET /api/recipes/search?name=...)
export const searchRecipes = async (req, res) => {
    try {
        const keyword = req.query.name || req.query.query || req.query.q || "";

        if (!keyword.trim()) {
            const allRecipes = await Recipe.find({}).sort({ createdAt: -1 });
            return res.status(200).json(allRecipes);
        }

        const regex = new RegExp(keyword.trim(), "i");

        const recipes = await Recipe.find({ name: regex }).sort({ createdAt: -1 });

        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message || "Search operation failed." });
    }
};

// 6. Category Filter (GET /api/recipes/category/:category)
export const getRecipesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const regexCategory = new RegExp(`^${category.trim()}$`, "i");

        const recipes = await Recipe.find({ category: regexCategory }).sort({ createdAt: -1 });
        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to filter by category." });
    }
};

// 7. Update Recipe (PUT /api/recipes/:id)
export const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }

        res.status(200).json(updatedRecipe);
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to update recipe." });
    }
};

// 8. Delete Recipe (DELETE /api/recipes/:id)
export const deleteRecipe = async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found." });
        }
        res.status(200).json({ message: "Recipe deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message || "Failed to delete recipe." });
    }
};