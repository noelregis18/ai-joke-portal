
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
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ""}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a comedian. Your task is to generate a funny joke based on the user's prompt. If no specific prompt is given, create a random joke. Keep it clean and appropriate for all audiences."
            },
            {
              role: "user",
              content: prompt ? `Tell me a joke about ${prompt}` : "Tell me a random joke"
            }
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to generate joke");
      }

      const data = await response.json();
      const generatedJoke = data.choices[0].message.content.trim();
      setJoke(generatedJoke);
    } catch (error) {
      console.error("Error generating joke:", error);
      
      // Fallback to joke if API fails
      const fallbackJokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "I told my wife she was drawing her eyebrows too high. She looked surprised.",
        "What do you call a fake noodle? An impasta!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "I'm on a seafood diet. I see food and I eat it!",
      ];
      
      setJoke(fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)]);
      
      toast({
        title: "API Key Required",
        description: "To get real-time AI-generated jokes, please add your OpenAI API key.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
              placeholder="Enter a topic (optional)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
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
          
          <p className="text-sm text-muted-foreground mt-4 text-center">
            Note: You'll need to provide your OpenAI API key for real-time joke generation.
          </p>
        </div>
      </div>
    </section>
  );
};

export default JokeGenerator;
