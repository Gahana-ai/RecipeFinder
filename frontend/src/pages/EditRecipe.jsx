import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';

const EditRecipe = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState(['']);
    const [cookingTime, setCookingTime] = useState('');
    const [category, setCategory] = useState('Breakfast');
    const [recipeType, setRecipeType] = useState('Veg');
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadRecipeData = async () => {
            try {
                let data = null;
                
                try {
                    data = await api.getRecipeById(id);
                } catch (err) {
                    console.log("Direct lookup failed on edit page, looking up catalog fallback...");
                }
                
                if (!data) {
                    const allRecipes = await api.getAllRecipes();
                    data = allRecipes.find(r => String(r.id) === String(id) || String(r._id) === String(id));
                }

                if (data) {
                    setError(null);
                    setTitle(data.title || data.name || '');
                    setDescription(data.description || data.desc || data.summary || '');
                    
                    const rawTime = data.cookingTime || data.cookTime || (data.details && data.details.cookTime);
                    if (rawTime) {
                        const numericTime = String(rawTime).replace(/[^0-9]/g, '');
                        setCookingTime(numericTime || rawTime);
                    } else {
                        setCookingTime('');
                    }

                    setCategory(data.category || 'Breakfast');
                    setRecipeType(data.type || data.recipeType || 'Veg');
                    setImageUrl(data.image || data.imageUrl || '');
                    setIngredients(data.ingredients && data.ingredients.length > 0 ? data.ingredients : ['']);
                    
                    const recipeSteps = data.instructions || data.steps || [''];
                    setInstructions(recipeSteps.length > 0 ? recipeSteps : ['']);
                } else {
                    setError('Could not find this recipe to edit.');
                }
            } catch (err) {
                setError('Failed to fetch recipe records.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadRecipeData();
    }, [id]);

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

    const filteredIngredients = ingredients.filter(item => item.trim() !== '');
    const filteredInstructions = instructions.filter(item => item.trim() !== '');

    if (!imageUrl) {
        setError('Please upload a Recipe Cover Photo.');
        return;
    }

    if (filteredIngredients.length === 0 || filteredInstructions.length === 0) {
        setError('Please supply at least one ingredient and one instruction step.');
        return;
    }

    try {
        setSubmitting(true);
        const updatedData = {
            title,
            name: title, 
            description,
            image: imageUrl,
            ingredients: filteredIngredients,
            instructions: filteredInstructions,
            steps: filteredInstructions, 
            cookingTime: Number(cookingTime),
            cookTime: `${cookingTime} mins`, 
            category,
            type: recipeType,
            isCustom: true 
        };

        await api.updateRecipe(id, updatedData);
        
        // ✅ Fixed navigation: replaces history entry and passes state back
        navigate(`/recipe/${id}`, { 
            replace: true, 
            state: { from: 'my-recipes', allowManage: true } 
        }); 

    } catch (err) {
        setError(err.message || 'Failed to update recipe entry.');
    } finally {
        setSubmitting(false);
    }
};

    return (
        <div style={styles.container}>
            <button onClick={() => navigate('/my-recipes')} style={styles.backBtn}>
                <ArrowLeft size={16} /> Cancel & Back
            </button>

            <h2 style={styles.title}>Edit Recipe Entry</h2>

            {error && <div style={styles.errorBanner}>{error}</div>}

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Recipe Title *</label>
                    <input 
                        type="text" required value={title} 
                        onChange={(e) => setTitle(e.target.value)} style={styles.input}
                        placeholder="e.g. Garlic Butter Shrimp"
                    />
                </div>

                <div style={styles.row}>
                    <div style={{ ...styles.fieldGroup, flex: 1 }}>
                        <label style={styles.label}>Cooking Time (Minutes) *</label>
                        <input 
                            type="number" required min="1" value={cookingTime} 
                            onChange={(e) => setCookingTime(e.target.value)} style={styles.input}
                            placeholder="30"
                        />
                    </div>
                    <div style={{ ...styles.fieldGroup, flex: 1 }}>
                        <label style={styles.label}>Category *</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Snacks">Snacks</option>
                        </select>
                    </div>
                    <div style={{ ...styles.fieldGroup, flex: 1 }}>
                        <label style={styles.label}>Type *</label>
                        <select value={recipeType} onChange={(e) => setRecipeType(e.target.value)} style={styles.select}>
                            <option value="Veg">Veg</option>
                            <option value="Non-Veg">Non-Veg</option>
                        </select>
                    </div>
                </div>

                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Brief Description</label>
                    <textarea 
                        rows="3" value={description} 
                        onChange={(e) => setDescription(e.target.value)} style={styles.textarea}
                        placeholder="Describe your dish summary..."
                    />
                </div>

                <div style={styles.fieldGroup}>
                    <label style={styles.label}>Recipe Cover Photo *</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={styles.fileInput}
                    />
                    {imageUrl && (
                        <div style={styles.previewBox}>
                            <img src={imageUrl} alt="Recipe Preview" style={styles.previewImg} />
                            <button
                                type="button"
                                onClick={() => setImageUrl('')}
                                style={styles.removePicBtn}
                            >
                                Remove Photo
                            </button>
                        </div>
                    )}
                </div>

                <div style={styles.sectionBox}>
                    <h4 style={styles.sectionHeader}>Ingredients List</h4>
                    {ingredients.map((ing, idx) => (
                        <div key={idx} style={styles.dynamicRow}>
                            <input 
                                type="text" 
                                required 
                                value={ing} 
                                onChange={(e) => handleIngredientChange(idx, e.target.value)} 
                                placeholder={`Ingredient #${idx + 1}`}
                                style={styles.input}
                            />
                            {ingredients.length > 1 && (
                                <button type="button" onClick={() => removeIngredientField(idx)} style={styles.deleteBtn}>
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addIngredientField} style={styles.addBtn}>
                        <Plus size={16} /> Add Ingredient
                    </button>
                </div>

                <div style={styles.sectionBox}>
                    <h4 style={styles.sectionHeader}>Preparation Instructions</h4>
                    {instructions.map((ins, idx) => (
                        <div key={idx} style={styles.dynamicRow}>
                            <input 
                                type="text" 
                                required 
                                value={ins} 
                                onChange={(e) => handleInstructionChange(idx, e.target.value)} 
                                placeholder={`Step #${idx + 1}`}
                                style={styles.input}
                            />
                            {instructions.length > 1 && (
                                <button type="button" onClick={() => removeInstructionField(idx)} style={styles.deleteBtn}>
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addInstructionField} style={styles.addBtn}>
                        <Plus size={16} /> Add Step
                    </button>
                </div>

                <button type="submit" disabled={submitting} style={styles.submitBtn}>
                    {submitting ? 'Saving Updates...' : 'Save Updates'}
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: { maxWidth: '700px', margin: '2rem auto', padding: '0 1rem' },
    backBtn: { display: 'flex', alignItems: 'center', gap: '0.25rem', border: 'none', background: 'none', cursor: 'pointer', color: '#64748b', fontSize: '0.9rem', marginBottom: '1rem' },
    title: { fontSize: '1.75rem', fontWeight: '700', color: '#1e293b', marginBottom: '1.5rem' },
    form: { display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#ffffff', padding: '2rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' },
    fieldGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    label: { fontSize: '0.9rem', fontWeight: '600', color: '#475569' },
    input: { padding: '0.65rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', width: '100%', boxSizing: 'border-box' },
    select: { padding: '0.65rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.95rem', backgroundColor: '#ffffff', width: '100%' },
    textarea: { padding: '0.65rem', borderRadius: '0.375rem', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical', width: '100%', boxSizing: 'border-box' },
    fileInput: { padding: '0.4rem 0', fontSize: '0.9rem' },
    previewBox: { marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' },
    previewImg: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '0.375rem', border: '1px solid #cbd5e1' },
    removePicBtn: { padding: '0.4rem 0.75rem', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontSize: '0.85rem' },
    row: { display: 'flex', gap: '1rem' },
    sectionBox: { border: '1px solid #f1f5f9', backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '0.5rem' },
    sectionHeader: { margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#334155', fontWeight: '700' },
    dynamicRow: { display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'center' },
    deleteBtn: { backgroundColor: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' },
    addBtn: { display: 'flex', alignItems: 'center', gap: '0.25rem', backgroundColor: '#ffffff', border: '1px solid #cbd5e1', padding: '0.4rem 0.75rem', borderRadius: '0.375rem', fontSize: '0.85rem', cursor: 'pointer', marginTop: '0.25rem', color: '#475569' },
    submitBtn: { backgroundColor: '#f97316', color: '#ffffff', padding: '0.75rem', border: 'none', borderRadius: '0.375rem', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem', textAlign: 'center' },
    errorBanner: { backgroundColor: '#fef2f2', border: '1px solid #fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.9rem' },
    centerText: { textAlign: 'center', padding: '4rem 1rem', color: '#64748b', fontSize: '1.1rem' }
};

export default EditRecipe;