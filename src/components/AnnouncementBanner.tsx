import React from 'react';
import { Language, TrainingAnnouncement } from '../types';
import { translations } from '../translations';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';

interface AnnouncementBannerProps {
  announcement: TrainingAnnouncement;
  lang: Language;
  onRegisterClick: () => void;
}

export const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({
  announcement,
  lang,
  onRegisterClick
}) => {
  if (!announcement || !announcement.active) return null;

  const t = translations[lang];
  const period = lang === 'fr' ? announcement.period_text_fr : announcement.period_text_en;
  const location = lang === 'fr' ? announcement.location_fr : announcement.location_en;

  return (
    <div id="upcoming-session-banner" className="bg-gradient-to-r from-[#3B1F13] via-[#4A2818] to-[#3B1F13] border-y border-[#D4AF37]/40 text-[#FDF8F0] py-4 px-4 sm:px-6 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-[#E5C158]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#D4AF37] text-[#24140D] text-[10px] sm:text-xs uppercase font-extrabold px-2 py-0.5 rounded-full">
                {t.trainings_page.upcoming_badge}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#D4AF37]">
                {t.trainings_page.upcoming_session_title}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-[#F0E6DA] mt-0.5">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                {period}
              </span>
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                {location}
              </span>
            </div>
          </div>
        </div>

        <button
          id="banner-register-now-btn"
          type="button"
          onClick={onRegisterClick}
          className="whitespace-nowrap px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#E5C158] text-[#24140D] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-1.5 transform hover:scale-105 active:scale-95"
        >
          <span>{lang === 'fr' ? 'S’inscrire Maintenant' : 'Register Now'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
