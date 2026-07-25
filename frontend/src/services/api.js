const API_URL = 'http://localhost:5000/api/recipes';
const AUTH_URL = 'http://localhost:5000/api/auth';

export const api = {
    // ---------------- AUTHENTICATION METHODS ----------------
    // 1. User Sign In
    login: async (formData) => {
        const res = await fetch(`${AUTH_URL}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const data = await res.json();

        if (!res.ok) {
            // Catches "Invalid email or password" or 500 server errors
            throw new Error(data.message || data.error || 'Login failed');
        }

        // Standardize the returned user object for localStorage & frontend state
        return {
            user: {
                userId: data.userId,
                userName: data.userName,
                email: formData.email
            },
            message: data.message
        };
    },

    // 2. User Sign Up
    register: async (formData) => {
        // Map userName to name as required by server.js (req.body expects name)
        const payload = {
            name: formData.userName || formData.name,
            email: formData.email,
            password: formData.password
        };

        const res = await fetch(`${AUTH_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (!res.ok) {
            // Catches "Email already registered" or server errors
            throw new Error(data.message || data.error || 'Registration failed');
        }

        return data;
    },

    // ---------------- RECIPE METHODS ----------------
    getAllRecipes: async () => {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error('Failed to fetch recipes');
        return res.json();
    },

    getRecipeById: async (id) => {
        const res = await fetch(`${API_URL}/${id}`);
        if (!res.ok) throw new Error('Recipe not found');
        return res.json();
    },

    addRecipe: async (recipeData) => {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipeData)
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to add recipe');
        }
        return res.json();
    },

    updateRecipe: async (id, recipeData) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipeData)
        });
        if (!res.ok) throw new Error('Failed to update recipe');
        return res.json();
    },

    deleteRecipe: async (id) => {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) throw new Error('Failed to delete recipe');
        return res.json();
    },

    searchRecipes: async (query) => {
        const res = await fetch(`${API_URL}/search?name=${query}`);
        if (!res.ok) throw new Error('Search failed');
        return res.json();
    },

    getRecipesByCategory: async (category) => {
        const res = await fetch(`${API_URL}/category/${category}`);
        if (!res.ok) throw new Error('Failed to filter recipes');
        return res.json();
    },

    getUserRecipes: async (userId) => {
        const res = await fetch(`${API_URL}/user/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch user recipes');
        return res.json();
    }
};