import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import { Search, Utensils, Clock, BookOpen, AlertCircle, X } from 'lucide-react';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks'];

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setLoading(true);
                setError(null);
                let backendData = [];

                // Fetch directly from backend API service
                if (searchQuery.trim() !== '') {
                    backendData = await api.searchRecipes(searchQuery);
                } else if (selectedCategory !== '') {
                    backendData = await api.getRecipesByCategory(selectedCategory);
                } else {
                    backendData = await api.getAllRecipes();
                }

                if (!Array.isArray(backendData)) {
                    backendData = [];
                }

                // Set data strictly from backend database
                setRecipes(backendData);

            } catch (err) {
                setError(err.message || 'Failed to fetch recipes from the database.');
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchRecipes();
        }, 250);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery, selectedCategory]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setSelectedCategory('');
    };

    return (
        <div className="home-container">
            <div className="hero">
                <h1 className="hero-title">Discover & Share Incredible Recipes</h1>
                <p className="hero-subtitle">Find your next favorite meal cooked straight from the heart</p>
            </div>

            <div className="controls-bar">
                <div className="search-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1 }}>
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search recipes by name or style..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSelectedCategory('');
                            setSearchQuery(e.target.value);
                        }}
                        className="search-input"
                        style={{ paddingRight: searchQuery ? '2.5rem' : '1rem' }}
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            style={{
                                position: 'absolute',
                                right: '0.75rem',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#64748b',
                                padding: '0.2rem'
                            }}
                            title="Clear search"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>

                <div className="filter-wrapper">
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSearchQuery('');
                            setSelectedCategory(e.target.value);
                        }}
                        className="select-input"
                    >
                        <option value="">All Categories</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            </div>

            {error && (
                <div className="error-banner">
                    <AlertCircle color="#ef4444" size={24} />
                    <p className="error-text">{error}</p>
                    <button onClick={handleClearFilters} className="reset-btn">Reset</button>
                </div>
            )}

            {loading ? (
                <div className="loading-wrapper">
                    <div className="spinner"></div>
                    <p>Loading catalog entries...</p>
                </div>
            ) : (
                <div>
                    {recipes.length === 0 ? (
                        <div className="empty-state">
                            <Utensils size={48} color="#94a3b8" />
                            <h3>No recipes found</h3>
                            <p>Try modifying your filters to explore other culinary dishes.</p>
                        </div>
                    ) : (
                        <div className="recipe-grid">
                            {recipes.map((recipe) => {
                                const recipeId = recipe._id || recipe.id;
                                const title = recipe.name || recipe.title || 'Untitled Recipe';
                                const descriptionText = recipe.description || recipe.desc || recipe.summary || recipe.details || 'No description provided.';
                                const rawTime = recipe.cookTime || recipe.cookingTime;
                                const timeDisplay = rawTime ? (String(rawTime).includes('min') ? rawTime : `${rawTime} mins`) : '15 mins';

                                const ingredientCount = Array.isArray(recipe.ingredients) 
                                    ? recipe.ingredients.length 
                                    : Array.isArray(recipe.steps) 
                                    ? recipe.steps.length 
                                    : Array.isArray(recipe.instructions) 
                                    ? recipe.instructions.length 
                                    : 0;

                                return (
                                    <div key={recipeId || title} className="recipe-card">
                                        <div className="card-image-wrapper">
                                            <img 
                                                src={recipe.image || recipe.imageUrl || "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80"} 
                                                alt={title}
                                            />
                                            {recipe.category && (
                                                <span className="category-badge">
                                                    {recipe.category}
                                                </span>
                                            )}
                                        </div>
                                        
                                        <div className="card-body">
                                            <h3 className="card-title">
                                                {title}
                                            </h3>
                                        
                                            <p className="card-description">
                                                {descriptionText}
                                            </p>
                                        
                                            <div className="card-meta">
                                                <div className="meta-item">
                                                    <Clock size={16} color="#64748b" />
                                                    <span>{timeDisplay}</span>
                                                </div>
                                                <div className="meta-item">
                                                    <BookOpen size={16} color="#64748b" />
                                                    <span>
                                                        {ingredientCount} Ingredients
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <Link to={`/recipe/${recipeId || encodeURIComponent(title)}`} className="view-btn">
                                                View Recipe
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Home;