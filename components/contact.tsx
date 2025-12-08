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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-2 uppercase tracking-widest transition-colors duration-500">
          Get In Touch
        </h2>
        <p className="text-lg text-center text-green-600 dark:text-green-400 mb-16 uppercase tracking-wider transition-colors duration-500">
          Let's Connect & Create Something Amazing
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Contact Information
            </h3>
            <div className="space-y-6">
              {/* Email */}
              <motion.a
                href="mailto:nayeem2305341022@diu.edu.bd"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Email</p>
                  <p className="text-base text-gray-900 dark:text-gray-100 font-medium hover:text-green-500 transition-colors">
                    nayeem2305341022@diu.edu.bd
                  </p>
                </div>
              </motion.a>

              {/* Phone */}
              <motion.a
                href="tel:+8801943124216"
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Phone</p>
                  <p className="text-base text-gray-900 dark:text-gray-100 font-medium hover:text-blue-500 transition-colors">
                    +880 194 3124216
                  </p>
                </div>
              </motion.a>

              {/* Location */}
              <motion.div
                className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-300"
                whileHover={{ x: 5 }}
              >
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Location</p>
                  <p className="text-base text-gray-900 dark:text-gray-100 font-medium">
                    Mirpur, Dhaka-1206
                    <br />
                    Bangladesh
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="mt-10 pt-10 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">Follow me on</p>
              <div className="flex gap-4">
                <motion.a
                  href="https://linkedin.com/in/mohammad-alinayeem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Linkedin className="h-6 w-6" />
                </motion.a>
                <motion.a
                  href="https://github.com/kazinayeem"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                >
                  <Github className="h-6 w-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
              Send Me a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </motion.div>

              {/* Message Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or inquiry..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Send Message
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
