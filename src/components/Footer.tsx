"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaLinkedin, FaTelegramPlane, FaTwitter } from "react-icons/fa";
import z from "zod";
import emailjs from '@emailjs/browser';

const NewsLetterSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }),
});

type NewsLetterFormSchema = z.infer<typeof NewsLetterSchema>;

function Footer() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsLetterFormSchema>({
    resolver: zodResolver(NewsLetterSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: NewsLetterFormSchema) => {
    setLoading(true);
    try {
      await emailjs.send(
        'service_5railuc',
        'template_sumtok9',
        {
          from_name: 'Newsletter Subscriber From Blogs Site',
          to_name: 'Hemanth Babu S',
          from_email: data.email,
          to_email: 'hemanth170648@gmail.com',
          message: 'I would like to subscribe to the newsletter.',
          via: 'From Blogs Site',
          subscribed: 'Yes',
        },
        'Zm3b55iaafc6m07VZ'
      );
      alert('Thank you. You have successfully subscribed to the newsletter.');
      reset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {

      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
          <div className="flex items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-2xl">HB</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl mx-8 text-center lg:text-left">
            <p className="text-lg mb-4">
              Subscribe to our newsletter to receive the latest updates, news, and offers!
            </p>
            <form
              className="flex flex-col sm:flex-row gap-4"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`flex-1 px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors?.email && 'ring-2 ring-red-400'}`}
                    required
                    autoComplete="email"
                  />
                )}
              />
              <button
                type="submit"
                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors font-medium disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              >
                {loading ? 'Subscribing' : 'Subscribe'}
              </button>
            </form>
            {errors.email && (
              <p className="mt-2 text-red-400 text-base">
                {errors.email.message}
              </p>
            )}

          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <nav className="flex space-x-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="https://www.hemanthbabu648.com/about-me" className="hover:text-white transition-colors">About Us</Link>
              <Link href="https://www.hemanthbabu648.com/#contact" className="hover:text-white transition-colors">Contact</Link>
            </nav>
            {/* Copyright */}
            <div className="text-center text-sm text-gray-500 mt-6">
              &copy; {new Date().getFullYear()} Hemanth Babu Setti. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/hemanthbabu648" className="hover:text-white transition-colors">
                  <FaLinkedin size={24} />
                </a>
                <a href="https://twitter.com/hemanthbabu648" className="hover:text-white transition-colors">
                  <FaTwitter size={24} />
                </a>
                <a href="https://t.me/hemanthbabu648" className="hover:text-white transition-colors">
                  <FaTelegramPlane size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer