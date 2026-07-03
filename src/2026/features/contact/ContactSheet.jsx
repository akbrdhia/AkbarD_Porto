import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';
import { CONFIG_2026 } from '../../constants/config';
import { PERSONAL_INFO } from '../../../2025/constants/portfolioData';

const POWER_SPRING = [0.16, 1, 0.3, 1];

const projectTypes = [
  { value: 'Mobile App', label: 'Mobile App' },
  { value: 'Web App', label: 'Web App' },
  { value: 'Just Say Hi', label: 'Just Say Hi' },
  { value: 'Lainnya', label: 'Lainnya' },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.6 },
  exit: { opacity: 0 },
};

const sheetVariants = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: {
      duration: 0.7,
      ease: POWER_SPRING,
    },
  },
  exit: {
    y: '100%',
    transition: {
      duration: 0.4,
      ease: POWER_SPRING,
    },
  },
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: POWER_SPRING,
    },
  },
};

const ContactSheet = ({ isOpen, onClose }) => {
  const sheetRef = useRef(null);
  const [time, setTime] = useState('');
  const [state, handleSubmit] = useForm("xkolpzjq");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
      setTime(timeString.replace(/ [A-Z]{3,4}$/, ''));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    const sheet = sheetRef.current;
    const handleWheel = (e) => e.stopPropagation();
    sheet?.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      sheet?.removeEventListener('wheel', handleWheel);
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const socialLinks = CONFIG_2026.social.filter((s) => s.name !== 'Email');

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
          <motion.div
            key="contact-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 bg-black cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            key="contact-sheet"
            ref={sheetRef}
            variants={sheetVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-[800px] max-h-[90vh] overflow-y-auto bg-[#f5f5f0] text-[#1a1a1a] mx-4"
            role="dialog"
            aria-modal="true"
            aria-label="Contact form"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center group"
              aria-label="Close contact form"
            >
              <div className="relative w-6 h-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-full h-[1.5px] bg-[#1a1a1a] rotate-45 group-hover:rotate-[135deg] transition-transform duration-300" />
                  <div className="absolute w-full h-[1.5px] bg-[#1a1a1a] -rotate-45 group-hover:-rotate-[135deg] transition-transform duration-300" />
                </div>
              </div>
            </button>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="p-8 md:p-10 lg:p-12"
            >
              <motion.div variants={itemVariants} className="flex flex-wrap justify-between items-start mb-10 pr-10">
                <div>
                  <h2 className="text-lg font-bold tracking-tight">{PERSONAL_INFO.name}</h2>
                  <p className="text-sm text-[#666] mt-0.5">{CONFIG_2026.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{time}</p>
                  <p className="text-xs text-[#666]">{CONFIG_2026.timezone}</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8">
                <h3 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.92] text-[#1a1a1a]">
                  Let's work
                  <br />
                  together
                </h3>
                <p className="text-[#666] text-sm mt-4 max-w-md leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or
                  opportunities to be part of your vision. Feel free to reach out.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="mb-8 border-t border-[#ddd] pt-7">
                <p className="text-xs uppercase tracking-[0.25em] text-[#888] mb-2">(Mail to)</p>
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-2xl md:text-3xl font-bold text-[#1a1a1a] hover:text-[#3B82F6] transition-colors duration-300 break-all"
                >
                  {PERSONAL_INFO.email}
                </a>
              </motion.div>

              <motion.div variants={itemVariants}>
                {state.succeeded && (
                  <div className="mb-7 p-5 bg-[#e8f0e8] text-[#2a5a2a] text-sm">
                    <p className="font-bold mb-0.5">Thank you!</p>
                    <p>
                      Your message has been sent. I'll get back to you as soon as
                      possible.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <label htmlFor="contact-name" className="text-xs uppercase tracking-[0.25em] text-[#888]">
                        (Full Name)<span className="text-[#c44]">*</span>
                      </label>
                      <ValidationError prefix="Name" field="name" errors={state.errors} />
                    </div>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      className="w-full bg-white border border-[#ddd] px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#999] transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <label htmlFor="contact-email" className="text-xs uppercase tracking-[0.25em] text-[#888]">
                        (Full Email)<span className="text-[#c44]">*</span>
                      </label>
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      className="w-full bg-white border border-[#ddd] px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#999] transition-colors"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs uppercase tracking-[0.25em] text-[#888]">
                        (Project Type)<span className="text-[#c44]">*</span>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-8 gap-y-3">
                      {projectTypes.map((type) => (
                        <label
                          key={type.value}
                          className="flex items-center gap-3 cursor-pointer group"
                        >
                          <div className="relative w-[18px] h-[18px]">
                            <input
                              type="radio"
                              name="projectType"
                              value={type.value}
                              className="peer sr-only"
                              defaultChecked={false}
                            />
                            <div className="absolute inset-0 rounded-full border-2 border-[#bbb] peer-checked:border-[#1a1a1a] transition-colors group-hover:border-[#888]" />
                            <div className="absolute inset-0 rounded-full bg-[#1a1a1a] scale-0 peer-checked:scale-100 transition-transform" />
                          </div>
                          <span className="text-sm text-[#4a4a4a] group-hover:text-[#1a1a1a] transition-colors">
                            {type.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <label htmlFor="contact-message" className="text-xs uppercase tracking-[0.25em] text-[#888]">
                        (Project Details)<span className="text-[#c44]">*</span>
                      </label>
                      <ValidationError prefix="Message" field="message" errors={state.errors} />
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full bg-white border border-[#ddd] px-4 py-3 text-sm text-[#1a1a1a] placeholder:text-[#aaa] focus:outline-none focus:border-[#999] transition-colors resize-vertical"
                    />
                  </div>

                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={state.submitting}
                      className="w-full bg-[#1a1a1a] text-white py-4 px-8 text-sm font-bold uppercase tracking-[0.25em] hover:bg-[#3B82F6] hover:text-[#1a1a1a] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {state.submitting ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Message'
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-10 pt-7 border-t border-[#ddd]">
                <p className="text-xs uppercase tracking-[0.25em] text-[#888] mb-3">(Social)</p>
                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-bold text-[#4a4a4a] hover:text-[#1a1a1a] transition-colors uppercase tracking-tight"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-7 pt-6 border-t border-[#ddd]">
                <p className="text-xs text-[#888] leading-relaxed">
                  Mobile &amp; Full-Stack Developer — crafting meaningful digital
                  <br className="hidden md:block" />
                  experiences through code and design.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactSheet;
