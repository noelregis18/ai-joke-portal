
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Send, Loader2 } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using Email.js to send emails directly from the frontend
      // This is the simplest approach since we don't have a backend
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          service_id: "default_service", // Replace with your Email.js service ID
          template_id: "template_contact", // Replace with your Email.js template ID
          user_id: "your_emailjs_user_id", // Replace with your Email.js user ID
          template_params: {
            to_email: "noel.regis04@gmail.com",
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Show success toast
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Fallback method - open mail client
      const mailtoUrl = `mailto:noel.regis04@gmail.com?subject=Contact from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`;
      window.open(mailtoUrl, "_blank");
      
      toast({
        title: "Direct email opened",
        description: "We've opened your email client as a fallback. Please send the email to complete your message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="glass dark:glass bg-background/50 border border-border">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows={4}
              required
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-teal hover:bg-teal/90 text-white" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactForm;
