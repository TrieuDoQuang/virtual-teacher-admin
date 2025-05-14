import Link from "next/link";
import { Button } from "@/components/ui/button";
import Thee3d from "@/components/thee3d";
import { ArrowRight, BookOpen, MessageCircle, BarChart } from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="">
      {/* Hero Section */}
      <section className="w-full h-screen overflow-hidden flex items-center bg-no-repeat bg-full-screen bg-center-center relative">
        <div className="absolute inset-0  z-10"></div>
        <div className="container mx-auto px-4 z-20">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-white font-italiana text-[3.5rem] font-normal leading-[5rem]">
              The best <span className="text-[#62c5ff]">English Learning</span>{" "}
              system for you
            </h1>
            
            <p className="text-white/90 text-xl">
              Master English effortlessly with our interactive virtual teaching platform.
              Personalized lessons, real-time feedback, and AI-powered learning.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Button asChild size="lg" className="bg-[#62c5ff] hover:bg-[#4ba8e0] text-white">
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
                <Link href="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            {[
              {
                icon: <BookOpen className="h-6 w-6 text-[#62c5ff]" />,
                title: "Interactive Lessons",
                description: "Engage with dynamic content tailored to your learning style"
              },
              {
                icon: <MessageCircle className="h-6 w-6 text-[#62c5ff]" />,
                title: "AI-Powered Feedback",
                description: "Receive instant corrections and improvements on your English"
              },
              {
                icon: <BarChart className="h-6 w-6 text-[#62c5ff]" />,
                title: "Progress Tracking",
                description: "Monitor your improvement with detailed analytics and insights"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg text-white">
                <div className="flex items-center gap-3 mb-3">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="text-white/80">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-italiana mb-4 text-white">Key Features</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Our platform leverages advanced technology to provide a comprehensive English learning experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white/10 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-white">Speech Recognition</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Accurate pronunciation assessment with detailed feedback</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Real-time correction of common pronunciation errors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Customized exercises based on your accent and difficulties</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-white">Writing Assistant</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Grammar and spelling correction with explanations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Vocabulary enhancement suggestions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Style and tone improvements for different contexts</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-white">Conversation Practice</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Interactive dialogues with AI conversation partners</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Role-playing scenarios for business, travel, and academics</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Adaptive discussions that match your proficiency level</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-4 text-white">Personalized Learning</h3>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Custom curriculum based on your goals and interests</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Adaptive difficulty that grows with your skills</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#62c5ff] mr-2">•</span>
                  <span>Regular assessment to identify areas for improvement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-italiana mb-4 text-white">Your Learning Journey</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              We've designed a structured approach to help you achieve fluency efficiently
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-[#62c5ff]/30"></div>
            
            {[
              {
                step: "Step 1",
                title: "Assessment",
                description: "Begin with a comprehensive evaluation to determine your current proficiency level, strengths, and areas for improvement.",
                details: "Our assessment covers reading, writing, listening, and speaking skills to create your personalized learning profile."
              },
              {
                step: "Step 2",
                title: "Personalized Curriculum",
                description: "Receive a tailored learning plan designed specifically for your goals, whether for business, academic, or everyday communication.",
                details: "Your curriculum adapts based on your progress, ensuring you're always challenged but never overwhelmed."
              },
              {
                step: "Step 3",
                title: "Interactive Learning",
                description: "Engage with diverse lesson formats including dialogues, reading exercises, writing prompts, and pronunciation practice.",
                details: "Our AI-powered system provides immediate feedback, helping you correct mistakes in real-time."
              },
              {
                step: "Step 4",
                title: "Progress Tracking",
                description: "Monitor your improvement through detailed analytics that show your growth in vocabulary, grammar, pronunciation, and fluency.",
                details: "Regular mini-assessments help adjust your learning path for optimal results."
              }
            ].map((item, index) => (
              <div key={index} className={`relative flex mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#62c5ff] border-4 border-[#0f172a] z-10`}></div>
                <div className="bg-white/10 rounded-lg p-6 max-w-lg relative">
                  <div className="text-[#62c5ff] font-semibold mb-1">{item.step}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                  <p className="text-white/80 mb-3">{item.description}</p>
                  <p className="text-white/60 text-sm">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Language Skills Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-italiana mb-4 text-white">Comprehensive Skill Development</h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Our platform helps you master all aspects of English proficiency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-white">Listening</h3>
              <p className="text-white/80 mb-4">
                Improve your comprehension through diverse audio materials including:
              </p>
              <ul className="space-y-2 text-white/80">
                <li>• Authentic conversations at various speeds</li>
                <li>• Podcasts on contemporary topics</li>
                <li>• Academic lectures and presentations</li>
                <li>• Interactive listening exercises with comprehension checks</li>
              </ul>
            </div>
            
            <div className="bg-white/10 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-white">Speaking</h3>
              <p className="text-white/80 mb-4">
                Develop natural, fluent speech through:
              </p>
              <ul className="space-y-2 text-white/80">
                <li>• Pronunciation drills with audio feedback</li>
                <li>• Conversation practice with AI partners</li>
                <li>• Situational role-plays for real-world contexts</li>
                <li>• Speech rhythm and intonation exercises</li>
              </ul>
            </div>
            
            <div className="bg-white/10 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-white">Reading</h3>
              <p className="text-white/80 mb-4">
                Enhance your reading skills with:
              </p>
              <ul className="space-y-2 text-white/80">
                <li>• Graded texts that match your level</li>
                <li>• Interactive articles with vocabulary explanations</li>
                <li>• Comprehension-building exercises</li>
                <li>• Speed reading techniques and practice</li>
              </ul>
            </div>
            
            <div className="bg-white/10 p-8 rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-white">Writing</h3>
              <p className="text-white/80 mb-4">
                Perfect your written expression through:
              </p>
              <ul className="space-y-2 text-white/80">
                <li>• Guided writing tasks with detailed feedback</li>
                <li>• Grammar and vocabulary enhancement tools</li>
                <li>• Email, essay, and report writing practice</li>
                <li>• Style and tone guidance for different contexts</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#4ba8e0] to-[#5546ff] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-italiana mb-4">Start Your English Learning Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience the most effective way to achieve English fluency with our comprehensive virtual learning environment
          </p>
          <Button asChild size="lg" className="bg-white text-[#4ba8e0] hover:bg-white/90">
            <Link href="/login">
              Begin Learning <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0f172a] text-white/70">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="font-italiana text-xl text-white">Virtual English Teacher</h3>
              <p className="mt-1">© {new Date().getFullYear()} All rights reserved</p>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/courses" className="hover:text-white transition-colors">Courses</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
