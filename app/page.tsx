"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import VibeLab from "@/components/VibeLab";
import Sandbox from "@/components/Sandbox";
import Skills from "@/components/Skills";
import Setup from "@/components/Setup";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-6">
        <Hero />
        <About />
        <VibeLab />
        <Sandbox />
        <Skills />
        <Setup />
        <Contact />
      </main>
      
      {/* Elegant Footer */}
      <footer className="border-t border-border-light dark:border-border-dark py-12 bg-card-light dark:bg-card-dark transition-colors duration-200">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-tertiary-light dark:text-tertiary-dark">
          <div>
            &copy; {new Date().getFullYear()} Randelf Amper. Built with Next.js, Framer Motion & Tailwind.
          </div>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-accent-light dark:hover:text-accent-dark transition-colors">
              Back to Top
            </a>
            <span className="text-border-light dark:text-border-dark">|</span>
            <a
              href="https://github.com/miggy06"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-light dark:hover:text-accent-dark transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
