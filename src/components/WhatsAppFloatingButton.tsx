import React, { useState } from 'react';
import { Language, SiteSettings } from '../types';
import { MessageCircle, Users, X, Send } from 'lucide-react';
import { buildGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';

interface WhatsAppFloatingButtonProps {
  settings: SiteSettings;
  lang: Language;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ settings, lang }) => {
  const [isOpen, setIsOpen] = useState(false);

  const directChatUrl = buildGeneralInquiryWhatsAppUrl(settings.whatsapp_admin_phone, lang);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="bg-[#24130A] border-2 border-[#D4AF37]/50 rounded-2xl p-4 shadow-2xl text-[#FDF8F0] w-72 space-y-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#3D251A]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="font-bold text-sm text-[#FFFDF9]">
                {lang === 'fr' ? 'Support WhatsApp CMN' : 'CMN WhatsApp Support'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#A8907E] hover:text-[#FFFDF9] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#C5B3A2]">
            {lang === 'fr' 
              ? 'Discutez directement avec la formatrice ou rejoignez notre groupe de producteurs.' 
              : 'Chat directly with the instructor or join our production alumni group.'}
          </p>

          <div className="space-y-2 pt-1">
            {/* Direct Admin DM */}
            <a
              id="floating-direct-chat-link"
              href={directChatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
            >
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Écrire à la Formatrice' : 'Message Instructor (DM)'}</span>
              </span>
              <span className="text-[10px] bg-emerald-800/60 px-1.5 py-0.5 rounded">Online</span>
            </a>

            {/* Community Group Link */}
            <a
              id="floating-community-group-link"
              href={settings.whatsapp_community_link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#3D2214] hover:bg-[#522E1B] border border-[#D4AF37]/40 text-[#D4AF37] hover:text-[#FFFDF9] font-bold text-xs transition-colors"
            >
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Groupe Communauté (500+)' : 'Join Community (500+)'}</span>
              </span>
            </a>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        id="floating-whatsapp-main-btn"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-2xl hover:shadow-emerald-600/50 transition-all transform hover:scale-105 active:scale-95 border-2 border-white/20"
        aria-label="WhatsApp Assistance"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="hidden sm:inline font-semibold">
          {lang === 'fr' ? 'WhatsApp Direct' : 'Chat WhatsApp'}
        </span>
      </button>
    </div>
  );
};
