import React, { useState } from 'react';
import './App.css'; 
import './App.js'; 


function UserForm({ onSubmit }) {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goal, setGoal] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ age, weight, height, goal });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" placeholder="Age" value={age} onChange={e => setAge(e.target.value)} />
      <input type="number" placeholder="Weight in kg" value={weight} onChange={e => setWeight(e.target.value)} />
      <input type="number" placeholder="Height in cm" value={height} onChange={e => setHeight(e.target.value)} />
      <input type="text" placeholder="Health Goal" value={goal} onChange={e => setGoal(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default UserForm;
