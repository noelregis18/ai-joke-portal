
import { useState } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="#" className="text-xl md:text-2xl font-bold font-montserrat text-teal">
            AI Joke Portal
          </a>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="font-medium hover:text-teal transition-colors">Home</a>
          <a href="#joke-generator" className="font-medium hover:text-teal transition-colors">Joke Generator</a>
          <a href="#contact" className="font-medium hover:text-teal transition-colors">Contact</a>
          
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                {user.email}
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => signOut()} 
                title="Sign out"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Link to="/auth">
              <Button variant="outline" className="font-medium" size="sm">
                <User className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </Link>
          )}
          
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          
          {user ? (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => signOut()}
              className="ml-2"
              title="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          ) : (
            <Link to="/auth" className="ml-2">
              <Button variant="outline" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}
          
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a href="#" className="font-medium py-2 hover:text-teal transition-colors" onClick={toggleMenu}>Home</a>
            <a href="#joke-generator" className="font-medium py-2 hover:text-teal transition-colors" onClick={toggleMenu}>Joke Generator</a>
            <a href="#contact" className="font-medium py-2 hover:text-teal transition-colors" onClick={toggleMenu}>Contact</a>
            
            {user && (
              <div className="py-2 text-sm text-muted-foreground">
                Signed in as: {user.email}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;
