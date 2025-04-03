
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const JokeGenerator = () => {
  const [joke, setJoke] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateJoke = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // If no prompt is provided, use a default topic
      const topic = prompt.trim() ? prompt : "random";
      
      // Show fallback jokes if no API key is available
      const fallbackJokes = {
        random: [
          "Why don't scientists trust atoms? Because they make up everything!",
          "I told my wife she was drawing her eyebrows too high. She looked surprised.",
          "What do you call a fake noodle? An impasta!",
          "Why did the scarecrow win an award? Because he was outstanding in his field!",
          "I'm on a seafood diet. I see food and I eat it!",
        ],
        programming: [
          "Why do programmers prefer dark mode? Because light attracts bugs!",
          "Why did the programmer quit his job? Because he didn't get arrays!",
          "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
          "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
          "Why do Java developers wear glasses? Because they don't C#!",
        ],
        animal: [
          "What do you call a parade of rabbits hopping backwards? A receding hare-line!",
          "What do you call a bear with no teeth? A gummy bear!",
          "How do you count cows? With a cowculator!",
          "What do you call a sleeping bull? A bulldozer!",
          "Why don't cats play poker in the jungle? Too many cheetahs!",
        ],
        sports: [
          "I would tell you a joke about boxing but I'm afraid it might punch line.",
          "Why can't a bicycle stand on its own? Because it's two-tired!",
          "Why don't scientists trust atoms? Because they make up everything!",
          "What do you call a fake noodle? An impasta!",
          "I'm reading a book on anti-gravity. It's impossible to put down!",
        ],
        food: [
          "What do you call a sad coffee? A depresso!",
          "Why did the tomato blush? Because it saw the salad dressing!",
          "What do you call a fake noodle? An impasta!",
          "Why don't eggs tell jokes? They'd crack each other up!",
          "What's a vampire's favorite fruit? A blood orange!",
        ],
        work: [
          "Why don't scientists trust atoms? Because they make up everything!",
          "I told my wife she was drawing her eyebrows too high. She looked surprised.",
          "What do you call a fake noodle? An impasta!",
          "Why did the scarecrow win an award? Because he was outstanding in his field!",
          "I'm on a seafood diet. I see food and I eat it!",
        ],
      };
      
      // Define a more comprehensive set of topics
      const topicCategories = {
        animal: ["animal", "dog", "cat", "pet", "wildlife", "zoo", "lion", "tiger", "bird"],
        programming: ["code", "programming", "developer", "computer", "software", "tech", "it", "javascript", "python"],
        food: ["food", "cooking", "chef", "restaurant", "eat", "cuisine", "meal", "dinner", "lunch", "breakfast"],
        sports: ["sport", "football", "basketball", "soccer", "tennis", "athlete", "game", "match", "olympic"],
        work: ["work", "job", "office", "boss", "employee", "career", "profession", "business", "corporate"],
        random: ["random"]
      };
      
      // Determine the best category for the topic
      let category = 'random';
      const topicLower = topic.toLowerCase();
      
      for (const [cat, keywords] of Object.entries(topicCategories)) {
        if (keywords.some(keyword => topicLower.includes(keyword))) {
          category = cat;
          break;
        }
      }
      
      // Generate a more topically relevant joke
      let generatedJoke;
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content: "You are a comedian specialized in creating jokes. Generate a short, funny joke on the given topic. Only respond with the joke, no additional text."
              },
              {
                role: "user",
                content: `Generate a short, funny joke about ${topic}`
              }
            ],
            max_tokens: 150,
            temperature: 0.7,
          })
        });
        
        if (response.ok) {
          const data = await response.json();
          generatedJoke = data.choices[0].message.content.trim();
        } else {
          throw new Error("Failed to fetch from OpenAI API");
        }
      } catch (apiError) {
        console.error("API error:", apiError);
        // Get a random joke from the appropriate category as fallback
        const jokes = fallbackJokes[category] || fallbackJokes.random;
        generatedJoke = jokes[Math.floor(Math.random() * jokes.length)];
      }
      
      setJoke(generatedJoke);
      
    } catch (error) {
      console.error("Error generating joke:", error);
      
      toast({
        title: "Error",
        description: "There was an error generating your joke. Please try again.",
        variant: "destructive",
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      generateJoke();
    }
  };

  return (
    <section id="joke-generator" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">AI Joke Generator</h2>
          
          <div className="flex flex-col space-y-4 mb-6">
            <Input
              type="text"
              placeholder="Enter a topic (e.g., cats, food, work, programming)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-base"
            />
            
            <Button 
              onClick={generateJoke} 
              className="w-full bg-teal hover:bg-teal/90 text-white" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Joke
                </>
              )}
            </Button>
          </div>
          
          <Card className="glass dark:glass bg-background/50 mt-8 overflow-hidden border border-border animate-fade-in">
            <CardContent className="p-6">
              {joke ? (
                <p className="text-lg leading-relaxed whitespace-pre-line">{joke}</p>
              ) : (
                <p className="text-muted-foreground text-center">Your joke will appear here</p>
              )}
            </CardContent>
          </Card>
          
        </div>
      </div>
    </section>
  );
};

export default JokeGenerator;
