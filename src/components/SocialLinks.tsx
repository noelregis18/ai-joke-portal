
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialLinks = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:noel.regis04@gmail.com";
  };
  
  const handlePhoneClick = () => {
    window.location.href = "tel:+917319546900";
  };
  
  const handleLocationClick = () => {
    window.open("https://maps.google.com/?q=Asansol,+West+Bengal,+India", "_blank");
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Button variant="outline" className="flex justify-start gap-2" onClick={handleEmailClick}>
        <Mail className="h-4 w-4" />
        <span>noel.regis04@gmail.com</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2" onClick={handlePhoneClick}>
        <Phone className="h-4 w-4" />
        <span>+91 7319546900</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2" onClick={handleLocationClick}>
        <MapPin className="h-4 w-4" />
        <span>Asansol, West Bengal, India</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2" onClick={() => window.open("https://github.com/noelregis18", "_blank")}>
        <Github className="h-4 w-4" />
        <span>GitHub</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2" onClick={() => window.open("https://www.linkedin.com/in/noel-regis-aa07081b1/", "_blank")}>
        <Linkedin className="h-4 w-4" />
        <span>LinkedIn</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2" onClick={() => window.open("https://x.com/NoelRegis8", "_blank")}>
        <Twitter className="h-4 w-4" />
        <span>Twitter</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2 col-span-1 md:col-span-2" onClick={() => window.open("http://topmate.io/noel_regis", "_blank")}>
        <ExternalLink className="h-4 w-4" />
        <span>Topmate</span>
      </Button>
    </div>
  );
};

export default SocialLinks;
