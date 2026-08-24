import React from 'react';
import { Language, SiteSettings } from '../types';
import { translations } from '../translations';
import { MessageCircle, Phone, MapPin, Mail, Sparkles, Shield, ArrowRight } from 'lucide-react';
import { buildGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  lang: Language;
  setCurrentTab: (tab: string) => void;
  settings: SiteSettings;
}

export const Footer: React.FC<FooterProps> = ({ lang, setCurrentTab, settings }) => {
  const t = translations[lang];

  return (
    <footer id="main-footer" className="bg-[#190C06] text-[#D8C7B5] border-t-2 border-[#D4AF37]/30">
      {/* Top Banner inside Footer */}
      <div className="bg-[#24130A] border-b border-[#3D251A] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-[#D4AF37] font-bold text-sm tracking-wider uppercase">
              <Sparkles className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Rejoignez les Producteurs en Activité' : 'Join Active Manufacturers'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-brand font-bold text-[#FFFDF9]">
              {t.community_banner.title}
            </h3>
            <p className="text-[#B9A392] text-sm max-w-xl">
              {t.community_banner.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              id="footer-join-whatsapp-group-btn"
              href={settings.whatsapp_community_link}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              <span>{t.community_banner.btn}</span>
            </a>

            <a
              id="footer-direct-admin-chat-btn"
              href={buildGeneralInquiryWhatsAppUrl(settings.whatsapp_admin_phone, lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 rounded-xl bg-[#351E14] hover:bg-[#45271A] border border-[#D4AF37]/40 text-[#FFFDF9] font-bold text-sm transition-colors flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'fr' ? 'Contacter la Formatrice' : 'Chat with Instructor'}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] overflow-hidden">
                <img
                  src="/src/assets/images/cmn_logo_1787567055631.jpg"
                  alt="CMN Logo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-brand font-bold text-lg text-[#FFFDF9]">
                CMN Training
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A89382] leading-relaxed">
              {t.footer.about_cmn}
            </p>
            <div className="inline-block bg-[#28140B] text-[#D4AF37] border border-[#D4AF37]/30 text-xs px-3 py-1.5 rounded-lg font-medium">
              {t.footer.bilingual_notice}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-brand font-bold text-[#FFFDF9] text-base border-b border-[#3D251A] pb-2">
              {t.footer.quick_links}
            </h4>
            <ul className="space-y-2 text-sm text-[#C5B3A2]">
              <li>
                <button
                  type="button"
                  onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.nav.home}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setCurrentTab('trainings'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.nav.trainings}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setCurrentTab('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.nav.products}</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setCurrentTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{t.nav.about}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* 4 Flagship Trainings */}
          <div className="space-y-3">
            <h4 className="font-brand font-bold text-[#FFFDF9] text-base border-b border-[#3D251A] pb-2">
              {t.footer.trainings_list}
            </h4>
            <ul className="space-y-2 text-sm text-[#C5B3A2]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                <span>{lang === 'fr' ? 'Fabrication de Savon (Ménage & Toilette)' : 'Soap Making (Laundry & Medicated)'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                <span>{lang === 'fr' ? 'Chocolat De la Fève à la Tablette' : 'Bean-to-Bar Chocolate Crafting'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                <span>{lang === 'fr' ? 'Ovaltine & Poudre Chocolatée Maltée' : 'Ovaltine & Soluble Malted Powder'}</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                <span>{lang === 'fr' ? 'Spaghetti & Pâtes Alimentaires' : 'Spaghetti & Artisanal Pasta'}</span>
              </li>
            </ul>
          </div>

          {/* Contact & HQ */}
          <div className="space-y-3">
            <h4 className="font-brand font-bold text-[#FFFDF9] text-base border-b border-[#3D251A] pb-2">
              {t.footer.contact_us}
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#C5B3A2]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{lang === 'fr' ? settings.address_fr : settings.address_en}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>WhatsApp: +{settings.whatsapp_admin_phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>{settings.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#331B11] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A7668]">
          <div>
            © {new Date().getFullYear()} CMN Superior Quality Training. {t.footer.all_rights}
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => { setCurrentTab('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-[#8A7668] hover:text-[#D4AF37] transition-colors flex items-center gap-1 opacity-70 hover:opacity-100"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>{t.footer.admin_link}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
