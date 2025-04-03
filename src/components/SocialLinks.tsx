
import { Github, Linkedin, Mail, Phone, MapPin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const SocialLinks = () => {
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/in/noel-regis-aa07081b1/",
    },
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/noelregis18",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: "https://x.com/NoelRegis8",
    },
    {
      name: "Email",
      icon: Mail,
      url: "mailto:noel.regis04@gmail.com",
    },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "noel.regis04@gmail.com",
    },
    {
      icon: Phone,
      text: "+91 7319546900",
    },
    {
      icon: MapPin,
      text: "Asansol, West Bengal, India",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3 justify-center md:justify-start">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button
              variant="outline"
              size="icon"
              className="rounded-full hover:bg-teal hover:text-white transition-colors"
            >
              <link.icon className="h-5 w-5" />
              <span className="sr-only">{link.name}</span>
            </Button>
          </a>
        ))}
        <a 
          href="http://topmate.io/noel_regis" 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm border border-border rounded-full px-3 py-1.5 hover:bg-teal hover:text-white hover:border-teal transition-colors"
        >
          Topmate
        </a>
      </div>

      <div className="space-y-3">
        {contactInfo.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <item.icon className="h-4 w-4 text-teal" />
            <span className="text-sm">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialLinks;
