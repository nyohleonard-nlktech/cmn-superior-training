import React, { useState } from 'react';
import { Language, SiteSettings } from '../types';
import { translations } from '../translations';
import { MessageCircle, Globe, Menu, X, Sparkles, BookOpen, ShoppingBag, Info, ShieldCheck } from 'lucide-react';
import { APP_IMAGES } from '../assets/images';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  settings: SiteSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  settings
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { id: 'home', label: t.nav.home, icon: Sparkles },
    { id: 'trainings', label: t.nav.trainings, icon: BookOpen },
    { id: 'products', label: t.nav.products, icon: ShoppingBag },
    { id: 'about', label: t.nav.about, icon: Info }
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header id="main-header" className="sticky top-0 z-50 bg-[#24140D]/95 backdrop-blur-md border-b border-[#D4AF37]/25 text-[#FDF8F0] shadow-xl">
      {/* Top micro-bar */}
      <div className="bg-[#170C07] border-b border-[#3D251A] text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-[#D4AF37]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium tracking-wide">{t.brand.location_badge}</span>
          </div>

          <div className="flex items-center gap-4 text-[#D8C7B5]">
            <span className="hidden sm:inline">WhatsApp: +237 654 78 56 42</span>
            {/* Language Switcher */}
            <div className="flex items-center bg-[#2B1810] rounded-full border border-[#D4AF37]/30 p-0.5">
              <button
                id="lang-btn-en"
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                  lang === 'en'
                    ? 'bg-[#D4AF37] text-[#24140D] shadow-sm'
                    : 'text-[#D8C7B5] hover:text-[#FFFDF9]'
                }`}
              >
                EN
              </button>
              <button
                id="lang-btn-fr"
                type="button"
                onClick={() => setLang('fr')}
                className={`px-2.5 py-0.5 rounded-full text-xs font-bold transition-all ${
                  lang === 'fr'
                    ? 'bg-[#D4AF37] text-[#24140D] shadow-sm'
                    : 'text-[#D8C7B5] hover:text-[#FFFDF9]'
                }`}
              >
                FR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <button
            id="brand-logo-btn"
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group transition-transform active:scale-98"
          >
            <div className="relative w-12 h-12 rounded-full border-2 border-[#D4AF37] overflow-hidden shadow-md group-hover:border-[#E5C158] transition-colors">
              <img
                src={APP_IMAGES.cmn_logo}
                alt="CMN Superior Quality Training Logo"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="font-brand font-bold text-lg sm:text-xl tracking-wider text-[#FFFDF9] flex items-center gap-1.5">
                <span>CMN</span>
                <span className="text-[#D4AF37] font-semibold text-sm sm:text-base tracking-normal">Superior Quality</span>
              </div>
              <p className="text-[11px] sm:text-xs text-[#C5AB96] font-medium tracking-wide">
                {lang === 'fr' ? 'Formation Pratique & Matières Premières' : 'Hands-On Training & Materials Supply'}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navItems.map(item => {
              const isActive = currentTab === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#D4AF37]/15 text-[#E5C158] border border-[#D4AF37]/40 shadow-inner'
                      : 'text-[#E0D3C3] hover:text-[#FFFDF9] hover:bg-[#382015]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#D4AF37]' : 'text-[#A8907E]'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA: Join Community WhatsApp */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              id="header-join-community-btn"
              href={settings.whatsapp_community_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs sm:text-sm font-bold shadow-lg hover:shadow-emerald-900/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.nav.join_community}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#331C12] border border-[#D4AF37]/30 text-[#E0D3C3] hover:text-[#FFFDF9]"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-[#1E0F09] border-t border-[#3D251A] px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navItems.map(item => {
            const isActive = currentTab === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-base font-semibold transition-all ${
                  isActive
                    ? 'bg-[#D4AF37]/20 text-[#E5C158] border border-[#D4AF37]/50'
                    : 'text-[#E0D3C3] hover:bg-[#2B1810]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#D4AF37]' : 'text-[#A8907E]'}`} />
                {item.label}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#3D251A] space-y-2">
            <a
              id="mobile-join-community-btn"
              href={settings.whatsapp_community_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t.nav.join_community}</span>
            </a>

            <div className="flex items-center justify-between px-2 pt-2 text-xs text-[#A8907E]">
              <span>{t.nav.language}:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-md font-bold ${lang === 'en' ? 'bg-[#D4AF37] text-[#24140D]' : 'bg-[#2B1810] text-[#D8C7B5]'}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang('fr')}
                  className={`px-3 py-1 rounded-md font-bold ${lang === 'fr' ? 'bg-[#D4AF37] text-[#24140D]' : 'bg-[#2B1810] text-[#D8C7B5]'}`}
                >
                  Français
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
