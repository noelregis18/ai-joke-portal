
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-6 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-2 md:mb-0">
            © {new Date().getFullYear()} AI Joke Portal - All Rights Reserved
          </p>
          <p className="text-sm flex items-center text-muted-foreground">
            Made with <Heart className="h-3 w-3 mx-1 text-teal" /> by Noel Regis
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
