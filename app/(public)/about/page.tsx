"use client";

import React from "react";
import { MessageSquare, Mic, Volume2, Award, Brain, Sparkles, ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const features = [
  {
    icon: <Volume2 className="w-8 h-8" />,
    title: "Text to Speech",
    description: "Advanced AI voice technology that provides natural pronunciation and intonation for optimal language learning.",
    gradient: "from-[#FF3CAC] to-[#784BA0]"
  },
  {
    icon: <Mic className="w-8 h-8" />,
    title: "Speech Recognition",
    description: "Real-time speech recognition that helps learners improve their pronunciation and speaking skills.",
    gradient: "from-[#FA8BFF] to-[#2BD2FF]"
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Instant Feedback",
    description: "Get immediate feedback on pronunciation, grammar, and vocabulary usage to accelerate learning.",
    gradient: "from-[#21D4FD] to-[#B721FF]"
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "CEFR Aligned",
    description: "Structured learning paths following CEFR levels from A1 to C2 for systematic progress.",
    gradient: "from-[#08AEEA] to-[#2AF598]"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Adaptive Learning",
    description: "AI-powered system that adapts to your learning pace and style for personalized education.",
    gradient: "from-[#FEE140] to-[#FA709A]"
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: "Interactive Practice",
    description: "Engaging exercises and real-world scenarios for practical language application.",
    gradient: "from-[#4158D0] to-[#C850C0]"
  },
];

const levels = [
  { name: "A1", title: "Beginner", description: "Basic interactions and everyday expressions" },
  { name: "A2", title: "Elementary", description: "Familiar situations and simple communication" },
  { name: "B1", title: "Intermediate", description: "Main points of clear standard input" },
  { name: "B2", title: "Upper Intermediate", description: "Complex texts and technical discussions" },
  { name: "C1", title: "Advanced", description: "Effective language use for social and professional purposes" },
  { name: "C2", title: "Mastery", description: "Near-native level of language comprehension and expression" },
];

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div className="relative w-full h-full bg-black text-white overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-black to-black opacity-70" />
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-full"
        >
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-20" />
        </motion.div>
        <div className="relative z-10 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          >
            Virtual Teacher
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of language learning with our AI-powered platform
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </motion.div>
      </div>

      {/* Features Grid */}
      <div className="relative z-10 py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          >
            Empowering Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group relative"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />
                <div className="relative backdrop-blur-3xl bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300">
                  <div className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-2xl w-fit mb-6`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CEFR Levels */}
      <div className="relative z-10 py-32 bg-gradient-to-b from-black to-blue-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold text-center mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          >
            Learning Journey
          </motion.h2>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
            <div className="space-y-16">
              {levels.map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} items-center`}
                >
                  <div className="w-full md:w-5/12 backdrop-blur-3xl bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center gap-6 mb-4">
                      <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                        {level.name}
                      </span>
                      <div className="h-12 w-[1px] bg-gradient-to-b from-blue-500 to-purple-500" />
                      <h3 className="text-2xl font-semibold text-white">
                        {level.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-lg">
                      {level.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 py-32 bg-gradient-to-b from-blue-900/50 to-black">
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-3xl bg-white/5 p-12 rounded-3xl border border-white/10 shadow-2xl"
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Join thousands of learners who are achieving their language goals with Virtual Teacher
            </p>
            <button className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <div className="relative px-8 py-4 bg-black rounded-lg leading-none">
                <span className="text-white text-lg font-semibold">Get Started Now</span>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 