import React, { useState } from 'react';
import { Language, SiteSettings } from '../types';
import { translations } from '../translations';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Send, 
  Users, 
  Compass
} from 'lucide-react';
import { buildGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

interface AboutContactViewProps {
  lang: Language;
  settings: SiteSettings;
}

export const AboutContactView: React.FC<AboutContactViewProps> = ({ lang, settings }) => {
  const t = translations[lang];

  // FAQ open/close states
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Quick Message Box State
  const [inquiryTopic, setInquiryTopic] = useState('');
  const [inquiryName, setInquiryName] = useState('');

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const topic = inquiryTopic.trim() || (lang === 'fr' ? 'Demande générale' : 'General inquiry');
    const nameStr = inquiryName.trim() ? ` (${inquiryName.trim()})` : '';
    const fullTopic = `${topic}${nameStr}`;
    const url = buildGeneralInquiryWhatsAppUrl(settings.whatsapp_admin_phone, lang, fullTopic);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B2013] text-[#D4AF37] border border-[#D4AF37]/30 text-xs sm:text-sm font-bold">
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'fr' ? 'Notre Histoire & Engagement' : 'Our Story & Commitment'}</span>
        </div>
        <h1 className="font-brand font-extrabold text-3xl sm:text-5xl text-[#24140D] tracking-tight">
          {t.about_page.title}
        </h1>
        <p className="text-base sm:text-lg text-[#6B5242] leading-relaxed">
          {t.about_page.subtitle}
        </p>
      </div>

      {/* Story & Travel Model */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E8D9C8] p-6 sm:p-8 shadow-lg space-y-4">
            <h2 className="font-brand font-bold text-2xl text-[#24140D] flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#D4AF37]"></span>
              {t.about_page.story_title}
            </h2>
            <p className="text-sm sm:text-base text-[#634E3F] leading-relaxed">
              {t.about_page.story_p1}
            </p>
            <p className="text-sm sm:text-base text-[#634E3F] leading-relaxed">
              {t.about_page.story_p2}
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#24130A] to-[#1B0D07] text-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37] p-6 sm:p-8 shadow-xl space-y-3">
            <div className="flex items-center gap-2 text-[#E5C158] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'fr' ? 'Couverture Nationale' : 'Nationwide Workshops'}</span>
            </div>
            <h3 className="font-brand font-bold text-xl sm:text-2xl text-[#FFFDF9]">
              {t.about_page.travel_title}
            </h3>
            <p className="text-xs sm:text-sm text-[#D8C7B5] leading-relaxed">
              {t.about_page.travel_desc}
            </p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl overflow-hidden border-3 border-[#D4AF37] shadow-2xl bg-[#24140D]">
            <img
              src="/images/cmn_logo_1787567055631.jpg"
              alt="CMN Crest"
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="p-4 bg-[#1E0F09] text-center text-xs text-[#D8C7B5] font-semibold border-t border-[#3D251A]">
              CMN Superior Quality Training • Yaoundé, Cameroon
            </div>
          </div>
        </div>
      </div>

      {/* Contact Cards & Quick WhatsApp Message Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Details */}
        <div className="lg:col-span-6 bg-[#FFFDF9] rounded-3xl border-2 border-[#E8D9C8] p-6 sm:p-8 shadow-xl space-y-6">
          <h3 className="font-brand font-bold text-2xl text-[#24140D]">
            {t.about_page.contact_card_title}
          </h3>

          <div className="space-y-4 text-sm text-[#5C4537]">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDF8F0] border border-[#EDE0D2]">
              <div className="w-10 h-10 rounded-xl bg-[#24140D] text-[#E5C158] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#8A5B18] uppercase">
                  {t.about_page.address_label}
                </div>
                <div className="text-sm font-semibold text-[#24140D] mt-0.5">
                  {lang === 'fr' ? settings.address_fr : settings.address_en}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDF8F0] border border-[#EDE0D2]">
              <div className="w-10 h-10 rounded-xl bg-[#24140D] text-[#E5C158] flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#8A5B18] uppercase">
                  {t.about_page.phone_label}
                </div>
                <div className="text-sm font-semibold text-[#24140D] mt-0.5">
                  +{settings.whatsapp_admin_phone}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDF8F0] border border-[#EDE0D2]">
              <div className="w-10 h-10 rounded-xl bg-[#24140D] text-[#E5C158] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#8A5B18] uppercase">
                  {t.about_page.email_label}
                </div>
                <div className="text-sm font-semibold text-[#24140D] mt-0.5">
                  {settings.email}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#FDF8F0] border border-[#EDE0D2]">
              <div className="w-10 h-10 rounded-xl bg-[#24140D] text-[#E5C158] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#8A5B18] uppercase">
                  {t.about_page.hours_label}
                </div>
                <div className="text-sm font-semibold text-[#24140D] mt-0.5">
                  {t.about_page.hours_value}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick WhatsApp Inquiry Form */}
        <div className="lg:col-span-6 bg-gradient-to-br from-[#24130A] to-[#1A0C06] text-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37] p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#E5C158] uppercase tracking-wider">
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'fr' ? 'Contact Direct WhatsApp' : 'Direct WhatsApp Line'}</span>
            </div>
            <h3 className="font-brand font-bold text-2xl text-[#FFFDF9]">
              {lang === 'fr' ? 'Une Question Spécifique ? Écrivez-nous' : 'Have a Question? Message Us'}
            </h3>
            <p className="text-xs sm:text-sm text-[#D8C7B5]">
              {lang === 'fr' 
                ? 'Tapez votre nom et votre question pour ouvrir directement une conversation WhatsApp pré-rédigée avec la formatrice.' 
                : 'Enter your details below to open a pre-filled WhatsApp message directly with our lead instructor.'}
            </p>
          </div>

          <form onSubmit={handleSendInquiry} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#E5C158]">
                {lang === 'fr' ? 'Votre Nom' : 'Your Name'}
              </label>
              <input
                type="text"
                value={inquiryName}
                onChange={e => setInquiryName(e.target.value)}
                placeholder={lang === 'fr' ? 'ex: Paul Mbida' : 'e.g. Paul Mbida'}
                className="w-full px-4 py-2.5 rounded-xl bg-[#170C06] border border-[#4D2E1F] focus:border-[#D4AF37] text-white text-sm outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#E5C158]">
                {lang === 'fr' ? 'Votre Question ou Demande' : 'Your Question / Subject'}
              </label>
              <textarea
                rows={3}
                value={inquiryTopic}
                onChange={e => setInquiryTopic(e.target.value)}
                placeholder={lang === 'fr' ? 'ex: Je souhaite savoir si vous formez également aux détergents liquides et quelle est la prochaine session à Douala...' : 'e.g. I want to inquire about upcoming session dates in Douala and raw materials delivery...'}
                className="w-full px-4 py-2.5 rounded-xl bg-[#170C06] border border-[#4D2E1F] focus:border-[#D4AF37] text-white text-sm outline-none resize-none"
              ></textarea>
            </div>

            <button
              id="quick-whatsapp-send-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-102 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Ouvrir sur WhatsApp' : 'Open in WhatsApp'}</span>
            </button>
          </form>
        </div>
      </div>

      {/* WhatsApp Community Join Card */}
      <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37] p-8 sm:p-10 shadow-xl text-center space-y-4 max-w-4xl mx-auto">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
          <Users className="w-7 h-7" />
        </div>
        <h3 className="font-brand font-bold text-2xl sm:text-3xl text-[#24140D]">
          {t.about_page.community_card_title}
        </h3>
        <p className="text-sm sm:text-base text-[#634E3F] max-w-xl mx-auto leading-relaxed">
          {t.about_page.community_card_desc}
        </p>
        <div className="pt-2">
          <a
            id="about-join-community-btn"
            href={settings.whatsapp_community_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-extrabold text-base shadow-xl transition-all transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5" />
            <span>{t.about_page.join_now}</span>
          </a>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h3 className="font-brand font-bold text-2xl sm:text-3xl text-[#24140D]">
            {t.about_page.faq_title}
          </h3>
        </div>

        <div className="space-y-3">
          {t.about_page.faqs.map((faq, index) => {
            const isExpanded = openFaq === index;
            return (
              <div
                key={index}
                className="bg-[#FFFDF9] rounded-2xl border border-[#E8D9C8] overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isExpanded ? null : index)}
                  className="w-full p-5 text-left font-brand font-bold text-base sm:text-lg text-[#24140D] flex items-center justify-between gap-4 hover:bg-[#FDF8F0] transition-colors"
                >
                  <span>{faq.q}</span>
                  <div className="w-8 h-8 rounded-full bg-[#24140D] text-[#E5C158] flex items-center justify-center shrink-0">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#5C4537] leading-relaxed border-t border-[#F0E4D8]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
