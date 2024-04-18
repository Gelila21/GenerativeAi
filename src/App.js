import React, { useState } from 'react';
import UserForm from './UserForm';
import { fetchAdvice, fetchMeals } from './api';
import './App.css';

function App() {
    const [advice, setAdvice] = useState('');
    const [meals, setMeals] = useState([]);

    const handleFormSubmit = async (userData) => {
        // Prevents the entire app from re-rendering in a way that could hide the header
        try {
            const adviceResult = await fetchAdvice(userData);
            const mealsResult = await fetchMeals(userData);
            setAdvice(adviceResult);
            setMeals(mealsResult);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    return (
        <div className="container">
            <h1>HealthCompanion</h1>  
            <UserForm onSubmit={handleFormSubmit} />
            {advice && <p>{advice}</p>}
            <ul>
                {meals.map((meal, index) => (
                    <li key={index}>{meal}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
