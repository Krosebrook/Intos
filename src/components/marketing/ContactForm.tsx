import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner@2.0.3';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    interest: '',
    message: '',
    gdprConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gdprConsent) {
      toast.error('Please accept the privacy policy to continue');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to backend
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'contact_form'
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success('Thank you! We\'ll be in touch soon.');
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          interest: '',
          message: '',
          gdprConsent: false
        });

        // Reset success message after 5 seconds
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-[#46A57B] mx-auto mb-4" />
          <h3 className="text-2xl text-white mb-2">Thank You!</h3>
          <p className="text-gray-400">
            We've received your message and will get back to you within 24 hours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Contact Info */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl text-white mb-4">Get in Touch</h3>
          <p className="text-gray-400">
            Have questions? We're here to help. Reach out to our team and we'll respond as soon as possible.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#529ADB]/20 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-[#529ADB]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <a href="mailto:hello@intinc.com" className="text-white hover:text-[#529ADB] transition-colors">
                hello@intinc.com
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#E27305]/20 flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-[#E27305]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <a href="tel:+15551234567" className="text-white hover:text-[#E27305] transition-colors">
                +1 (555) 123-4567
              </a>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#46A57B]/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-[#46A57B]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Office</p>
              <p className="text-white">
                123 Business Ave<br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10">
          <p className="text-sm text-gray-400 mb-2">Response Time</p>
          <p className="text-white">We typically respond within 24 hours during business days.</p>
        </div>
      </div>

      {/* Contact Form */}
      <Card className="bg-white/5 border-white/10 lg:col-span-2">
        <CardHeader>
          <h3 className="text-2xl text-white">Send us a Message</h3>
          <p className="text-gray-400">Fill out the form below and we'll get back to you shortly.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-white mb-2 block">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="bg-white/5 border-white/10 text-white"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-white mb-2 block">
                  Work Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@company.com"
                  required
                  className="bg-white/5 border-white/10 text-white"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="company" className="text-white mb-2 block">
                  Company
                </Label>
                <Input
                  id="company"
                  type="text"
                  placeholder="Acme Inc."
                  className="bg-white/5 border-white/10 text-white"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-white mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="bg-white/5 border-white/10 text-white"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="interest" className="text-white mb-2 block">
                I'm interested in *
              </Label>
              <Select 
                required
                value={formData.interest}
                onValueChange={(value) => setFormData({ ...formData, interest: value })}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="demo">Scheduling a Demo</SelectItem>
                  <SelectItem value="trial">Starting a Free Trial</SelectItem>
                  <SelectItem value="pricing">Enterprise Pricing</SelectItem>
                  <SelectItem value="integration">Integration Support</SelectItem>
                  <SelectItem value="partnership">Partnership Opportunities</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="message" className="text-white mb-2 block">
                Message *
              </Label>
              <Textarea
                id="message"
                placeholder="Tell us about your needs..."
                required
                rows={5}
                className="bg-white/5 border-white/10 text-white resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <div className="flex items-start gap-2">
              <Checkbox 
                id="gdpr" 
                checked={formData.gdprConsent}
                onCheckedChange={(checked) => setFormData({ ...formData, gdprConsent: checked as boolean })}
                className="mt-1"
              />
              <Label htmlFor="gdpr" className="text-sm text-gray-400 cursor-pointer">
                I agree to the{' '}
                <a href="/privacy" className="text-[#529ADB] hover:underline">Privacy Policy</a>
                {' '}and consent to being contacted by INT Inc. regarding my inquiry. *
              </Label>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full bg-[#E27305] hover:bg-[#F08515] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                'Sending...'
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              * Required fields
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
