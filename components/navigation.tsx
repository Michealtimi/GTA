'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'audit', label: 'PC Audit', href: '#audit' },
  { id: 'map', label: 'Map', href: '#map' },
  { id: 'garage', label: 'Garage', href: '#garage' },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const handleNavClick = (id: string, href: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className="hidden md:flex sticky top-0 z-50 glass-effect-dark border-b border-border"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <motion.div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-xs font-bold text-white">VI</span>
            </div>
            <span className="font-bold text-lg text-glow">Vice Navigator</span>
          </motion.div>

          {/* Nav Items */}
          <div className="flex gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`px-4 py-2 rounded-lg font-medium transition-all relative ${
                  activeSection === item.id
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: 'spring', bounce: 0.2 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-accent text-accent rounded-lg hover:bg-accent/10 transition">
              Connect
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden sticky top-0 z-50">
        {/* Mobile Header */}
        <motion.div
          className="glass-effect-dark border-b border-border px-6 py-4 flex items-center justify-between"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded flex items-center justify-center">
              <span className="text-xs font-bold text-white">VI</span>
            </div>
            <span className="font-bold text-sm text-glow">Vice Nav</span>
          </motion.div>

          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-white/10 rounded-lg transition"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </motion.div>

        {/* Mobile Menu */}
        <motion.div
          className={`glass-effect-dark border-b border-border overflow-hidden ${isOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0 }}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col gap-2 px-6 py-4">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id, item.href)}
                className={`px-4 py-2 rounded-lg font-medium transition-all text-left ${
                  activeSection === item.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );
}
