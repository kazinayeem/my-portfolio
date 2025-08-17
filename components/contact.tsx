// src/components/Contact.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert('Message sent to Telegram!');
      setFormData({ name: '', email: '', message: '' });
    } else {
      alert('Failed to send message. Try again later.');
    }
  } catch (error) {
    console.error('Error sending message:', error);
    alert('An error occurred.');
  }
};

  return (
    <motion.section
      id="contact"
      className="py-20 bg-transparent dark:bg-transparent text-gray-900 dark:text-white transition-colors duration-500"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-gray-200 mb-4">
          Get In Touch
        </h2>
        <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
          Have a question or want to work together? Feel free to reach out!
        </p>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Contact Information */}
          <motion.div
            className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 glassmorphism-card"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Contact Info
            </h3>
            <div className="space-y-6">
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Mail className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                <a href="mailto:nayeem2305341022@diu.edu.bd" className="hover:text-green-500 transition-colors">
                  nayeem2305341022@diu.edu.bd
                </a>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <Phone className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                <a href="tel:+8801943124216" className="hover:text-green-500 transition-colors">
                  +8801943124216
                </a>
              </div>
              <div className="flex items-center text-gray-700 dark:text-gray-300">
                <MapPin className="h-6 w-6 text-green-500 mr-4 flex-shrink-0" />
                <span>Mirpur, Dhaka-1206, Bangladesh</span>
              </div>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6">
              <a href="https://linkedin.com/in/mohammad-alinayeem" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <Linkedin className="h-8 w-8 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors" />
              </a>
              <a href="https://github.com/kazinayeem" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <Github className="h-8 w-8 text-gray-600 dark:text-gray-400 hover:text-green-500 transition-colors" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="lg:w-2/3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700 glassmorphism-card"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 transition-colors duration-300"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors duration-300"
              >
                Send Message
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
