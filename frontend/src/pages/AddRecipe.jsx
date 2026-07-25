import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Plus, Trash2, ArrowLeft, Trash } from 'lucide-react';

const AddRecipe = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState(['']);
    const [cookingTime, setCookingTime] = useState('');
    const [category, setCategory] = useState('Breakfast');
    const [recipeType, setRecipeType] = useState('Veg');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClearForm = () => {
        setTitle('');
        setDescription('');
        setIngredients(['']);
        setInstructions(['']);
        setCookingTime('');
        setCategory('Breakfast');
        setRecipeType('Veg');
        setImageUrl('');
        setError(null);
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please pick a valid image format file.');
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleIngredientChange = (index, value) => {
        const updated = [...ingredients];
        updated[index] = value;
        setIngredients(updated);
    };

    const addIngredientField = () => setIngredients([...ingredients, '']);
    const removeIngredientField = (index) => {
        if (ingredients.length > 1) {
            setIngredients(ingredients.filter((_, i) => i !== index));
        }
    };

    const handleInstructionChange = (index, value) => {
        const updated = [...instructions];
        updated[index] = value;
        setInstructions(updated);
    };

    const addInstructionField = () => setInstructions([...instructions, '']);
    const removeInstructionField = (index) => {
        if (instructions.length > 1) {
            setInstructions(instructions.filter((_, i) => i !== index));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // 1. Sanitize Form State Inputs
        const trimmedTitle = title ? title.trim() : '';
        const trimmedDesc = description ? description.trim() : '';
        const trimmedCookTime = cookingTime ? String(cookingTime).trim() : '';
        const filteredIngredients = ingredients.filter(item => item && item.trim() !== '');
        const filteredInstructions = instructions.filter(item => item && item.trim() !== '');

        // 2. Validate Inputs BEFORE submitting
        if (!trimmedTitle) {
            setError('Please enter a Recipe Title.');
            return;
        }
        if (!trimmedDesc) {
            setError('Please enter a Brief Description.');
            return;
        }
        if (!trimmedCookTime) {
            setError('Please enter the Cooking Time.');
            return;
        }
        if (!imageUrl) {
            setError('Please upload a Recipe Cover Photo.');
            return;
        }
        if (filteredIngredients.length === 0) {
            setError('Please add at least one valid ingredient.');
            return;
        }
        if (filteredInstructions.length === 0) {
            setError('Please add at least one instruction step.');
            return;
        }

        // 3. DYNAMIC USER RETRIEVAL
        // Checks common localStorage keys dynamically without hardcoding any values
        let currentUserId = '';
        let currentUserEmail = '';

        const possibleStorageKeys = ['user', 'userInfo', 'authUser', 'currentUser'];
        
        for (const key of possibleStorageKeys) {
            const item = localStorage.getItem(key);
            if (item) {
                try {
                    const parsed = JSON.parse(item);
                    if (typeof parsed === 'object' && parsed !== null) {
                        currentUserId = parsed.userId || parsed._id || parsed.id || currentUserId;
                        currentUserEmail = parsed.email || parsed.userEmail || currentUserEmail;
                    } else if (typeof parsed === 'string') {
                        currentUserId = parsed;
                    }
                } catch (err) {
                    currentUserId = item;
                }
            }
            if (currentUserId) break; // Stop as soon as we find the logged-in user
        }

        if (!currentUserId) {
            setError('User session not found. Please log in again.');
            return;
        }

        // 4. Build Dynamic Payload
        const recipeData = {
            name: trimmedTitle,
            description: trimmedDesc, // User-provided description from textarea
            image: imageUrl,
            ingredients: filteredIngredients,
            steps: filteredInstructions,
            cookTime: `${trimmedCookTime} mins`,
            category: category,
            type: recipeType,
            isCustom: true,
            userId: String(currentUserId).trim(),
            userEmail: String(currentUserEmail).trim()
        };

        // 5. Submit to API
        try {
            setLoading(true);
            await api.addRecipe(recipeData);
            navigate('/my-recipes');
        } catch (err) {
            setError(err.message || 'Failed to create recipe entry.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-container">
            <button type="button" onClick={() => navigate(-1)} className="back-btn">
                <ArrowLeft size={16} /> Back
            </button>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem',
                    flexWrap: 'wrap',
                    gap: '1rem',
                }}
            >
                <h2 className="form-title" style={{ margin: 0, flex: 1 }}>
                    Create New Recipe Entry
                </h2>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        type="button"
                        onClick={handleClearForm}
                        className="delete-btn"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            padding: '0.5rem 1rem',
                            borderRadius: '6px',
                            border: '1px solid #ff4d4f',
                            background: '#fff',
                            color: '#ff4d4f',
                            cursor: 'pointer',
                        }}
                    >
                        <Trash size={16} /> Reset Form
                    </button>
                </div>
            </div>

            {error && (
                <div className="error-banner">
                    <p className="error-text">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="recipe-form">
                <div className="field-group">
                    <label className="form-label">Recipe Title *</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Garlic Butter Shrimp"
                        className="form-input"
                    />
                </div>

                <div className="form-row" style={{ display: 'flex', gap: '1rem' }}>
                    <div className="field-group" style={{ flex: 1 }}>
                        <label className="form-label">Cooking Time (Minutes) *</label>
                        <input
                            type="number"
                            required
                            min="1"
                            value={cookingTime}
                            onChange={(e) => setCookingTime(e.target.value)}
                            placeholder="30"
                            className="form-input"
                        />
                    </div>
                    <div className="field-group" style={{ flex: 1 }}>
                        <label className="form-label">Category *</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="form-select"
                        >
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Beverages">Beverages</option>
                        </select>
                    </div>
                    <div className="field-group" style={{ flex: 1 }}>
                        <label className="form-label">Type *</label>
                        <select
                            value={recipeType}
                            onChange={(e) => setRecipeType(e.target.value)}
                            className="form-select"
                        >
                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>
                        </select>
                    </div>
                </div>

                <div className="field-group">
                    <label className="form-label">Brief Description *</label>
                    <textarea 
                        rows="3" 
                        required
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        placeholder="Describe your dish summary..." 
                        className="form-textarea"
                    />
                </div>

                <div className="upload-wrapper">
                    <label className="form-label">Recipe Cover Photo *</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="file-input"
                    />

                    {imageUrl && (
                        <div className="preview-box">
                            <img
                                src={imageUrl}
                                alt="Recipe Cover Preview"
                                className="preview-img"
                            />
                            <button
                                type="button"
                                onClick={() => setImageUrl('')}
                                className="remove-pic-btn"
                            >
                                Remove Photo
                            </button>
                        </div>
                    )}
                </div>

                <div className="section-box">
                    <h4 className="section-header">Ingredients List</h4>
                    {ingredients.map((ing, idx) => (
                        <div key={idx} className="dynamic-row">
                            <input
                                type="text"
                                required
                                value={ing}
                                onChange={(e) => handleIngredientChange(idx, e.target.value)}
                                placeholder={`Ingredient #${idx + 1}`}
                                className="form-input"
                            />
                            {ingredients.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeIngredientField(idx)}
                                    className="delete-field-btn"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addIngredientField} className="add-field-btn">
                        <Plus size={16} /> Add Ingredient
                    </button>
                </div>

                <div className="section-box" style={{ marginTop: '0.25rem' }}>
                    <h4 className="section-header">Preparation Instructions</h4>
                    {instructions.map((ins, idx) => (
                        <div key={idx} className="dynamic-row">
                            <input
                                type="text"
                                required
                                value={ins}
                                onChange={(e) => handleInstructionChange(idx, e.target.value)}
                                placeholder={`Step #${idx + 1}`}
                                className="form-input"
                            />
                            {instructions.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeInstructionField(idx)}
                                    className="delete-field-btn"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addInstructionField} className="add-field-btn">
                        <Plus size={16} /> Add Step
                    </button>
                </div>

                <button type="submit" disabled={loading} className="submit-btn">
                    {loading ? 'Publishing Entry...' : 'Publish Recipe'}
                </button>
            </form>
        </div>
    );
};

export default AddRecipe;