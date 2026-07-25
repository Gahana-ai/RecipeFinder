import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Clock, BookOpen } from 'lucide-react';

const MyRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyRecipes = async () => {
            try {
                const userRaw = localStorage.getItem('user');
                const parsedUser = userRaw ? JSON.parse(userRaw) : null;

                const userId = 
                    parsedUser?.userId || 
                    parsedUser?._id || 
                    parsedUser?.id || 
                    localStorage.getItem('userId');

                if (!userId) {
                    setError('User session not found. Please log in again.');
                    setLoading(false);
                    return;
                }

                const data = await api.getUserRecipes(userId);
                setRecipes(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch your published recipes.');
            } finally {
                setLoading(false);
            }
        };

        fetchMyRecipes();
    }, []);

    if (loading) return <div className="center-text">Loading your custom catalog...</div>;
    if (error) return <div className="center-text" style={{ color: '#ef4444' }}>{error}</div>;

    return (
        <div className="my-recipes-container">
            <h2 className="dashboard-title">My Published Recipes Dashboard</h2>

            {recipes.length === 0 ? (
                <div className="empty-state">
                    <p>You haven't created any custom recipes yet.</p>
                </div>
            ) : (
                <div className="recipe-grid">
                    {recipes.map((recipe) => {
                        const recipeId = recipe._id || recipe.id;
                        const ingCount = recipe.ingredients ? recipe.ingredients.length : 0;
                        const displayTime = recipe.cookTime || (recipe.cookingTime ? `${recipe.cookingTime} mins` : 'N/A');

                        return (
                            <div key={recipeId} className="catalog-card">
                                <div className="catalog-card-image-box">
                                    <img 
                                        src={recipe.image || recipe.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'} 
                                        alt={recipe.title || recipe.name} 
                                        className="catalog-card-image" 
                                    />
                                    {recipe.category && (
                                        <span className="catalog-card-badge">
                                            {recipe.category.toUpperCase()}
                                        </span>
                                    )}
                                </div>

                                <div className="catalog-card-body">
                                    <h3 className="catalog-card-title">{recipe.title || recipe.name}</h3>
                                    
                                    <p className="catalog-card-desc">
                                        {recipe.description || 'No summary description provided for this recipe.'}
                                    </p>

                                    <div className="catalog-card-meta">
                                        <span>
                                            <Clock size={14} /> {displayTime}
                                        </span>
                                        <span>
                                            <BookOpen size={14} /> {ingCount} Ingredients
                                        </span>
                                    </div>

                                    <button 
                                        onClick={() => navigate(`/recipe/${recipeId}`, { state: { from: 'my-recipes', allowManage: true } })} 
                                        className="catalog-card-btn"
                                    >
                                        View Recipe
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MyRecipes;