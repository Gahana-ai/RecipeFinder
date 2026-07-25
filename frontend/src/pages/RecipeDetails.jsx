import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { api } from '../services/api';
import { Clock, Tag, ArrowLeft, Edit, Trash2 } from 'lucide-react';

const RecipeDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user came from My Recipes or is logged in
    const cameFromMyRecipes = location.state?.from === 'my-recipes';
    const isLoggedIn = !!localStorage.getItem('user');

    // Smart Back Handler
    const handleBack = () => {
        if (cameFromMyRecipes) {
            navigate('/my-recipes');
        } else if (window.history.length > 2) {
            navigate(-1); // Takes you to whatever page you were just on
        } else {
            navigate(isLoggedIn ? '/my-recipes' : '/');
        }
    };

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                let data = null;
                try {
                    data = await api.getRecipeById(id);
                } catch (err) {
                    console.log("Direct ID lookup failed, scanning catalog...");
                }

                if (!data) {
                    const allRecipes = await api.getAllRecipes();
                    data = allRecipes.find(r => 
                        String(r.id) === String(id) || 
                        String(r._id) === String(id) ||
                        r.name === decodeURIComponent(id) ||
                        r.title === decodeURIComponent(id)
                    );
                }

                if (data) {
                    data.title = data.title || data.name;
                    setRecipe(data);
                } else {
                    setError('Recipe entry not found.');
                }
            } catch (err) {
                setError(err.message || 'Could not fetch recipe details.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you completely sure you want to delete this recipe?')) {
            try {
                await api.deleteRecipe(id);
                navigate('/my-recipes');
            } catch (err) {
                alert(err.message || 'Could not remove entry.');
            }
        }
    };

    if (loading) return <div className="center-text">Loading recipe details...</div>;
    if (error) return <div className="center-text" style={{ color: '#ef4444' }}>{error}</div>;
    if (!recipe) return <div className="center-text">Recipe entry not found.</div>;

    return (
        <div className="details-container">
            <button onClick={handleBack} className="back-btn">
                <ArrowLeft size={16} /> Back
            </button>

            <div className="details-header">
                <div>
                    <span className="details-badge">
                        <Tag size={12} style={{ marginRight: '4px' }} /> {recipe.category}
                    </span>
                    <h1 className="details-title">{recipe.title}</h1>
                    <div className="details-meta">
                        <Clock size={16} />
                        <span>Cooking Time: <strong>{recipe.cookTime || (recipe.cookingTime ? `${recipe.cookingTime} mins` : 'N/A')}</strong></span>
                    </div>
                </div>

                {isLoggedIn && (
                    <div className="action-block" style={{ display: 'flex', gap: '1rem' }}>
                        <Link to={`/edit-recipe/${recipe._id || recipe.id || id}`} className="edit-action-btn">
                            <Edit size={16} /> Edit
                        </Link>
                        <button onClick={handleDelete} className="delete-action-btn">
                            <Trash2 size={16} /> Delete
                        </button>
                    </div>
                )}
            </div>

            {recipe.description && (
                <div className="description-box">
                    <p className="description-text">{recipe.description}</p>
                </div>
            )}

            <div className="split-grid">
                <div className="info-box">
                    <h3 className="box-title">Required Ingredients</h3>
                    <ul className="unordered-list">
                        {recipe.ingredients?.map((ing, i) => (
                            <li key={i} className="list-item">{ing}</li>
                        ))}
                    </ul>
                </div>

                <div className="info-box">
                    <h3 className="box-title">Preparation Instructions</h3>
                    <ol className="ordered-list">
                        {(recipe.steps && recipe.steps.length > 0) ? (
                            recipe.steps.map((ins, i) => (
                                <li key={i} className="ordered-list-item">{ins}</li>
                            ))
                        ) : (recipe.instructions && recipe.instructions.length > 0) ? (
                            recipe.instructions.map((ins, i) => (
                                <li key={i} className="ordered-list-item">{ins}</li>
                            ))
                        ) : (
                            <p className="ordered-list-item">No steps available for this recipe yet.</p>
                        )}
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetails;