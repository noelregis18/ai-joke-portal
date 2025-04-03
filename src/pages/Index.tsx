
import NavBar from "@/components/NavBar";
import JokeGenerator from "@/components/JokeGenerator";
import ContactForm from "@/components/ContactForm";
import SocialLinks from "@/components/SocialLinks";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col dark:gradient-bg-dark gradient-bg-light">
      <NavBar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:py-40">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              AI-Powered Joke Generator
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-slide-up" style={{animationDelay: "0.1s"}}>
              Get instant laughs with our AI joke generator – just tell us what you're looking for!
            </p>
            <div className="animate-slide-up" style={{animationDelay: "0.2s"}}>
              <a 
                href="#joke-generator" 
                className="inline-block bg-teal text-white font-medium px-6 py-3 rounded-full hover:bg-teal/90 transition-colors"
              >
                Try It Now
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Joke Generator Section */}
      <JokeGenerator />
      
      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Get In Touch</h2>
          
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-4">Contact Me</h3>
              <p className="text-muted-foreground">
                I'm always eager to learn and collaborate on new projects.
                Feel free to reach out to me 🙂
              </p>
              
              <Card className="glass dark:glass bg-background/50 border border-border overflow-hidden">
                <CardContent className="p-6">
                  <SocialLinks />
                </CardContent>
              </Card>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4">Send a Message</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
