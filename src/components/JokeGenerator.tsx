
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
    setJoke("");
    
    try {
      // Direct joke generation without API key
      const topic = prompt.trim() ? prompt : "random";
      
      // Use fallback jokes based on topics
      const fallbackJokes = {
        random: [
          "Why don't scientists trust atoms? Because they make up everything!",
          "I told my wife she was drawing her eyebrows too high. She looked surprised.",
          "What do you call a fake noodle? An impasta!",
          "Why did the scarecrow win an award? Because he was outstanding in his field!",
          "I'm on a seafood diet. I see food and I eat it!",
        ],
        dog: [
          "What do you call a dog magician? A labracadabrador!",
          "Why did the dog sit in the shade? Because he didn't want to be a hot dog!",
          "What do you call a cold dog? A chili dog!",
          "Why don't dogs make good dancers? Because they have two left feet!",
          "What's a dog's favorite breakfast? Woofles!",
        ],
        cat: [
          "What's a cat's favorite color? Purr-ple!",
          "What do you call a cat that gets anything it wants? Paw-suasive!",
          "Why don't cats play poker in the jungle? Too many cheetahs!",
          "What do you call a cat wearing shoes? Puss in boots!",
          "Why was the cat sitting on the computer? To keep an eye on the mouse!",
        ],
        food: [
          "Why did the tomato blush? Because it saw the salad dressing!",
          "What do you call a fake noodle? An impasta!",
          "Why don't eggs tell jokes? They'd crack each other up!",
          "What's a vampire's favorite fruit? A blood orange!",
          "Why did the cookie go to the doctor? Because it felt crummy!",
        ],
        work: [
          "Why don't some couples go to the gym? Because some relationships don't work out!",
          "My boss told me to have a good day. So I went home!",
          "I'd tell you a joke about construction, but I'm still working on it!",
          "What did one ocean say to the other ocean? Nothing, they just waved!",
          "Why is 6 afraid of 7? Because 7, 8, 9!",
        ],
      };
      
      // Find a relevant joke category or use random
      let category = 'random';
      const topicLower = topic.toLowerCase();
      if (Object.keys(fallbackJokes).some(cat => topicLower.includes(cat) && cat !== 'random')) {
        for (const cat of Object.keys(fallbackJokes)) {
          if (cat !== 'random' && topicLower.includes(cat)) {
            category = cat;
            break;
          }
        }
      }
      
      // Get a random joke from the appropriate category
      const jokes = fallbackJokes[category] || fallbackJokes.random;
      const generatedJoke = jokes[Math.floor(Math.random() * jokes.length)];
      
      // Add a slight delay to simulate API call
      setTimeout(() => {
        setJoke(generatedJoke);
        setIsLoading(false);
      }, 800);
      
    } catch (error) {
      console.error("Error generating joke:", error);
      
      toast({
        title: "Error",
        description: "There was an error generating your joke. Please try again.",
        variant: "destructive",
      });
      
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
              placeholder="Enter a topic (e.g., cats, food, work)"
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
