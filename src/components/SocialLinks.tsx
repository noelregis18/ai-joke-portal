import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
const SocialLinks = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:noel.regis04@gmail.com";
  };
  const handlePhoneClick = () => {
    window.location.href = "tel:+1234567890"; // Replace with actual phone number
  };
  const handleLocationClick = () => {
    window.open("https://maps.google.com/?q=San+Francisco", "_blank");
  };
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Button variant="outline" className="flex justify-start gap-2" onClick={handleEmailClick}>
        <Mail className="h-4 w-4" />
        <span>noel.regis04@gmail.com</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2" onClick={handlePhoneClick}>
        <Phone className="h-4 w-4" />
        <span>7319546900</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2" onClick={handleLocationClick}>
        <MapPin className="h-4 w-4" />
        <span>Asansol , West Bengal</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2" as="a" href="https://github.com" target="_blank">
        <Github className="h-4 w-4" />
        <span>GitHub</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2" as="a" href="https://linkedin.com" target="_blank">
        <Linkedin className="h-4 w-4" />
        <span>LinkedIn</span>
      </Button>
      
      <Button variant="outline" className="flex justify-start gap-2" as="a" href="https://twitter.com" target="_blank">
        <Twitter className="h-4 w-4" />
        <span>Twitter</span>
      </Button>
    </div>;
};
export default SocialLinks;