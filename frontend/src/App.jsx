import React, { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import RecipeDetails from './pages/RecipeDetails';
import EditRecipe from './pages/EditRecipe';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MyRecipes from './pages/MyRecipes';
import './App.css'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user'));

  return (
    <Router>
      <div className="app-container">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-recipe" element={<AddRecipe />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
            <Route path="/edit-recipe/:id" element={<EditRecipe />} />
            
            <Route path="/signin" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;