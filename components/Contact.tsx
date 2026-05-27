"use client";

import React, { useState } from "react";
import { Mail, GraduationCap, Github, Send } from "lucide-react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!name || !email || !message) {
      setFeedback({ text: "Please fill out all fields. Every connection is important!", type: "error" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFeedback({ text: "Please provide a valid email address so I can respond back.", type: "error" });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      // Also backup locally in localStorage for fun tracking!
      const submissions = JSON.parse(localStorage.getItem("portfolio_submissions") || "[]");
      submissions.push({ name, email, message, date: new Date().toISOString() });
      localStorage.setItem("portfolio_submissions", JSON.stringify(submissions));

      setFeedback({ text: `Thank you, ${name}! Your message has been successfully sent to my inbox!`, type: "success" });
      
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      console.error(err);
      setFeedback({ text: err.message || "Failed to send email. Please try again.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-border-light dark:border-border-dark">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-16 items-start">
        {/* Left Information */}
        <div className="flex flex-col items-start gap-8">
          <div>
            <span className="font-heading uppercase text-xs tracking-widest text-accent-light dark:text-accent-dark font-medium mb-3">
              Connect
            </span>
            <h2 className="text-3xl font-heading font-bold text-primary-light dark:text-primary-dark tracking-tight mb-4">
              Let's discuss opportunities.
            </h2>
            <p className="text-secondary-light dark:text-secondary-dark text-[0.95rem] leading-relaxed">
              I am actively seeking software development and engineering internships. If you are looking for a dedicated, quick-learning student who is excited about growing and contributing, let's get in touch!
            </p>
          </div>

          <div className="flex flex-col gap-6 w-full">
            {/* Email */}
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-accent-light dark:text-accent-dark flex items-center justify-center group-hover:border-primary-light dark:group-hover:border-primary-dark transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-tertiary-light dark:text-tertiary-dark font-medium mb-0.5">
                  Academic Email
                </h4>
                <a
                  href="mailto:randelf.amper@jmc.edu.ph"
                  className="font-medium text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark transition-colors duration-200"
                >
                  randelf.amper@jmc.edu.ph
                </a>
              </div>
            </div>

            {/* School */}
            <div className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-lg border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-accent-light dark:text-accent-dark flex items-center justify-center group-hover:border-primary-light dark:group-hover:border-primary-dark transition-all duration-300">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs text-tertiary-light dark:text-tertiary-dark font-medium mb-0.5">
                  Current Campus
                </h4>
                <p className="font-medium text-primary-light dark:text-primary-dark">
                  Jose Maria College Foundation Inc.
                </p>
              </div>
            </div>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            <a
              href="https://github.com/miggy06"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 rounded-full border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-primary-light dark:text-primary-dark hover:text-accent-light dark:hover:text-accent-dark hover:border-primary-light dark:hover:border-primary-dark flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6 p-8 sm:p-10 border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark rounded-2xl"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <label
              htmlFor="form-name"
              className="text-xs font-heading font-semibold text-secondary-light dark:text-secondary-dark uppercase tracking-wider"
            >
              Your Name
            </label>
            <input
              type="text"
              id="form-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-transparent bg-input-light dark:bg-input-dark text-primary-light dark:text-primary-dark focus:bg-card-light dark:focus:bg-card-dark focus:border-accent-light dark:focus:border-accent-dark focus:outline-none transition-all duration-200 placeholder-tertiary-light dark:placeholder-tertiary-dark"
              placeholder="e.g. Alex Johnson"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="form-email"
              className="text-xs font-heading font-semibold text-secondary-light dark:text-secondary-dark uppercase tracking-wider"
            >
              Your Email
            </label>
            <input
              type="email"
              id="form-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-transparent bg-input-light dark:bg-input-dark text-primary-light dark:text-primary-dark focus:bg-card-light dark:focus:bg-card-dark focus:border-accent-light dark:focus:border-accent-dark focus:outline-none transition-all duration-200 placeholder-tertiary-light dark:placeholder-tertiary-dark"
              placeholder="e.g. alex@example.com"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="form-message"
              className="text-xs font-heading font-semibold text-secondary-light dark:text-secondary-dark uppercase tracking-wider"
            >
              Message
            </label>
            <textarea
              id="form-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-transparent bg-input-light dark:bg-input-dark text-primary-light dark:text-primary-dark focus:bg-card-light dark:focus:bg-card-dark focus:border-accent-light dark:focus:border-accent-dark focus:outline-none transition-all duration-200 placeholder-tertiary-light dark:placeholder-tertiary-dark resize-y min-h-[120px]"
              placeholder="Hi Randelf, we would love to discuss a developer internship..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3 border border-transparent rounded-lg bg-primary-light dark:bg-primary-dark text-bg-light dark:text-bg-dark font-medium hover:brightness-110 active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 transition-all duration-200 cursor-pointer"
          >
            {isSubmitting ? (
              <>Sending...</>
            ) : (
              <>
                Send Message
                <Send className="w-4 h-4 ml-1" />
              </>
            )}
          </button>

          {/* Feedback message overlay */}
          {feedback && (
            <div
              className={`p-4 border rounded-lg text-sm font-medium text-center animate-fade-in ${
                feedback.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  : "bg-red-500/10 border-red-500/20 text-red-500"
              }`}
            >
              {feedback.text}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
