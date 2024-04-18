const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const SPOONACULAR_API_KEY = process.env.REACT_APP_SPOONACULAR_API_KEY;

// Fetch personalized health advice using OpenAI's GPT model with the chat completions endpoint
export async function fetchAdvice(userData) {
  const prompt = `Provide health advice for someone with these details: Age ${userData.age}, Weight ${userData.weight}, Height ${userData.height}, Goal ${userData.goal}.`;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": prompt }]
    }),
  });

  const data = await response.json();
  console.log("API Response from OpenAI:", data); // Debugging line

  if (!response.ok) {
    if (response.status === 429) {
      console.error("Rate limit exceeded. Please try again later.");
      return "Rate limit exceeded. Please wait a moment and try again.";
    }
    console.error("API Error from OpenAI:", data);
    throw new Error(`API responded with status ${response.status}: ${data.error ? data.error.message : 'Unknown error'}`);
  }

  if (data.choices && data.choices.length > 0) {
    return data.choices[0].message.content;
  } else {
    console.error('No choices returned from OpenAI API');
    return 'No advice generated. Please try again.';
  }
}

// Fetch meal suggestions using Spoonacular API
export async function fetchMeals() {
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?number=3&apiKey=${SPOONACULAR_API_KEY}`);
  const data = await response.json();
  console.log("API Response from Spoonacular:", data); // Debugging line

  if (!response.ok) {
    console.error("API Error from Spoonacular:", data);
    throw new Error(`API responded with status ${response.status}: ${data.message ? data.message : 'Unknown error'}`);
  }

  if (data.results && data.results.length > 0) {
    return data.results.map(meal => meal.title);
  } else {
    console.error('No meal data returned from Spoonacular API');
    return ['No meals found. Please try a different query.'];
  }
}
