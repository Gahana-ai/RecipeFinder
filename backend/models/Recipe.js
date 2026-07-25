import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        title: { type: String },
        description: { type: String, default: '' },
        image: { type: String, default: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=600&q=80' },
        ingredients: { type: [String], required: true },
        steps: { type: [String], required: true },
        cookTime: { type: String, required: true },
        category: { type: String, required: true },
        isCustom: { type: Boolean, default: true },
        isSeed: { type: Boolean, default: false },
        userId: { type: String },
        userEmail: { type: String, default: '' },
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Recipe', recipeSchema);