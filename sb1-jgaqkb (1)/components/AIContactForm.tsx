"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';

const services = [
  'Mix & Master',
  'Custom Tracks',
  'Instrumentals',
  'Studio Time',
  'Female & Male Vox',
  'DJ For Your Event',
  'Other'
];

const AIContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    services: [],
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckboxChange = (service: string) => {
    setFormData(prevState => ({
      ...prevState,
      services: prevState.services.includes(service)
        ? prevState.services.filter(s => s !== service)
        : [...prevState.services, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend for AI processing
    // For now, we'll just simulate a successful submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });
    setFormData({ firstName: '', lastName: '', email: '', services: [], notes: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      <Input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <div className="space-y-2">
        <p className="font-semibold">Services Interested In:</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {services.map((service) => (
            <div key={service} className="flex items-center space-x-2">
              <Checkbox
                id={service}
                checked={formData.services.includes(service)}
                onCheckedChange={() => handleCheckboxChange(service)}
                className="border-black"
              />
              <label htmlFor={service} className="text-sm">{service}</label>
            </div>
          ))}
        </div>
      </div>
      <Textarea
        name="notes"
        placeholder="Additional Notes"
        value={formData.notes}
        onChange={handleChange}
        className="h-32"
      />
      <Button type="submit">Send Message</Button>
    </form>
  );
};

export default AIContactForm;