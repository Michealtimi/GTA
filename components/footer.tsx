'use client';

import { motion } from 'framer-motion';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-black/50 glass-effect-dark">
      <div className="absolute inset-0 grid-pattern opacity-5" />

      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-xs font-bold text-white">VI</span>
              </div>
              <span className="font-bold text-lg text-glow">Vice Navigator</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your gateway to exploring Vice City and checking your PC's gaming capabilities.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#hero"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#audit"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  PC Audit
                </a>
              </li>
              <li>
                <a
                  href="#map"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Map
                </a>
              </li>
              <li>
                <a
                  href="#garage"
                  className="text-muted-foreground hover:text-primary transition"
                >
                  Garage
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-foreground mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground hover:text-primary transition cursor-pointer">
                GPU Analysis
              </li>
              <li className="text-muted-foreground hover:text-primary transition cursor-pointer">
                Vehicle Database
              </li>
              <li className="text-muted-foreground hover:text-primary transition cursor-pointer">
                Interactive Map
              </li>
              <li className="text-muted-foreground hover:text-primary transition cursor-pointer">
                Performance Score
              </li>
            </ul>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-foreground mb-4">Connect</h3>
            <div className="flex gap-4">
              {['Twitter', 'Discord', 'GitHub'].map((social) => (
                <button
                  key={social}
                  className="w-10 h-10 bg-secondary rounded-lg hover:bg-primary/20 transition flex items-center justify-center text-sm"
                  title={social}
                >
                  {social.charAt(0)}
                </button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} Vice City Navigator. All rights reserved. Grand Theft Auto is a registered trademark
            of Rockstar Games.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
