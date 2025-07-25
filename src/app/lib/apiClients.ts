export async function getParagraph() {
  const apiKey = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
  
  if (!apiKey) {
    throw new Error("API key not configured. Please set NEXT_PUBLIC_RAPIDAPI_KEY in your .env.local file");
  }
  
  // Sample texts for typing practice
  const sampleTexts = [
    "The future of technology is rapidly evolving with artificial intelligence and machine learning at the forefront. Companies like Google, Microsoft, and Amazon are investing billions in research and development.",
    "Climate change is one of the most pressing issues of our time. Scientists around the world, including those at NASA and the United Nations, are working together to find sustainable solutions.",
    "The global economy has seen significant changes in recent years. Wall Street analysts predict that emerging markets in Asia and Africa will play a crucial role in the next decade.",
    "Education is transforming in the digital age. Universities like Harvard, MIT, and Stanford are offering online courses that reach millions of students worldwide.",
    "Healthcare innovation is saving lives every day. Organizations like the WHO and CDC are collaborating with tech companies to develop new treatments and improve patient care.",
  ];
  
  // For now, return a random sample text since the TextAPIs endpoint you showed
  // is for Named Entity Recognition, not text generation
  // You can update this with the proper TextAPIs endpoint for text generation
  const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  
  // If TextAPIs has a text generation endpoint, you can use:
  /*
  const url = "https://textapis.p.rapidapi.com/[text-generation-endpoint]";
  
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-rapidapi-host": "textapis.p.rapidapi.com",
        "x-rapidapi-key": apiKey,
      },
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const result = await response.json();
    return { text: result.text || result };
  } catch (error) {
    console.error("Error fetching paragraph:", error);
    throw error;
  }
  */
  
  return { text: randomText };
}
