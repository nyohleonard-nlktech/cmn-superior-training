import React, { useState, useEffect } from 'react';
import { Language, Registration, SiteSettings, TrainingAnnouncement } from '../types';
import { translations } from '../translations';
import { TRAINING_PROGRAMS } from '../data/trainingData';
import { 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  Send, 
  ShieldCheck, 
  Clock, 
  FileText, 
  DollarSign, 
  AlertCircle,
  Phone,
  User,
  MapPinHouse
} from 'lucide-react';
import { buildRegistrationWhatsAppUrl } from '../utils/whatsapp';
import { api } from '../services/api';

interface TrainingsViewProps {
  lang: Language;
  settings: SiteSettings;
  announcement: TrainingAnnouncement;
  selectedTrainingId?: string;
}

export const TrainingsView: React.FC<TrainingsViewProps> = ({
  lang,
  settings,
  announcement,
  selectedTrainingId
}) => {
  const t = translations[lang];

  // Accordion state for step-by-step processes
  const [openPrograms, setOpenPrograms] = useState<Record<string, boolean>>({
    soap: true,
    chocolate: true,
    ovaltine: false,
    spaghetti: false
  });

  useEffect(() => {
    if (selectedTrainingId) {
      setOpenPrograms(prev => ({
        ...prev,
        [selectedTrainingId]: true
      }));
      const el = document.getElementById(`training-module-${selectedTrainingId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedTrainingId]);

  const toggleProgram = (id: string) => {
    setOpenPrograms(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    about: '',
    training_interest: 'All 4 Modules (Soap, Chocolate, Ovaltine, Spaghetti)',
    preferred_month: '',
    preferred_location: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim()) {
      setFormError(lang === 'fr' ? 'Veuillez renseigner votre nom complet.' : 'Please enter your full name.');
      return;
    }
    if (!formData.phone.trim()) {
      setFormError(lang === 'fr' ? 'Veuillez renseigner votre numéro de téléphone WhatsApp.' : 'Please enter your WhatsApp phone number.');
      return;
    }
    if (!formData.location.trim()) {
      setFormError(lang === 'fr' ? 'Veuillez préciser votre ville ou localité actuelle.' : 'Please enter your current city or location.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Save to backend database for the Admin Panel records
      await api.createRegistration({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        location: formData.location.trim(),
        about: formData.about.trim(),
        preferred_month: formData.preferred_month.trim() || (lang === 'fr' ? 'Prochaine session annoncée' : 'Next upcoming session'),
        preferred_location: formData.preferred_location.trim() || formData.location.trim(),
        training_interest: formData.training_interest,
        notes: ''
      });

      setSubmitSuccess(true);

      // 2. Build pre-filled WhatsApp deep link
      const whatsappUrl = buildRegistrationWhatsAppUrl(
        settings.whatsapp_admin_phone,
        formData,
        lang
      );

      // 3. Open WhatsApp in new tab / app
      setTimeout(() => {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        setIsSubmitting(false);
      }, 600);

    } catch (err) {
      console.error('Registration submit error:', err);
      // Even if server fails, always provide the deep link
      const whatsappUrl = buildRegistrationWhatsAppUrl(
        settings.whatsapp_admin_phone,
        formData,
        lang
      );
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }
  };

  const currentPeriod = lang === 'fr' ? announcement.period_text_fr : announcement.period_text_en;
  const currentLocation = lang === 'fr' ? announcement.location_fr : announcement.location_en;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header & Overview */}
      <div className="text-center space-y-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B2013] text-[#D4AF37] border border-[#D4AF37]/30 text-xs sm:text-sm font-bold">
          <Sparkles className="w-4 h-4" />
          <span>{lang === 'fr' ? 'Programmes Complets & Fourniture Directe' : 'Complete Programs & Direct Supply'}</span>
        </div>
        <h1 className="font-brand font-extrabold text-3xl sm:text-5xl text-[#24140D] tracking-tight">
          {t.trainings_page.title}
        </h1>
        <p className="text-base sm:text-lg text-[#6B5242] leading-relaxed">
          {t.trainings_page.subtitle}
        </p>
      </div>

      {/* Upcoming Session Announcement Box */}
      {announcement && announcement.active && (
        <div id="upcoming-session-card" className="bg-gradient-to-r from-[#2B160C] via-[#381D10] to-[#2B160C] text-[#FFFDF9] rounded-3xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#4D2D1D] pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                {t.trainings_page.upcoming_session_title}
              </span>
            </div>
            <div className="text-xs bg-[#4A2818] border border-[#D4AF37]/40 text-[#E5C158] px-3 py-1 rounded-full font-semibold self-start sm:self-auto">
              {t.trainings_page.upcoming_badge}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="flex items-start gap-3.5 bg-[#1F0E07]/60 p-4 rounded-2xl border border-[#3D251A]">
              <Calendar className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-[#B9A392] font-semibold">{t.trainings_page.period_label}</div>
                <div className="text-base sm:text-lg font-bold text-[#FFFDF9] mt-0.5">{currentPeriod}</div>
              </div>
            </div>

            <div className="flex items-start gap-3.5 bg-[#1F0E07]/60 p-4 rounded-2xl border border-[#3D251A]">
              <MapPin className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
              <div>
                <div className="text-xs text-[#B9A392] font-semibold">{t.trainings_page.location_label}</div>
                <div className="text-base sm:text-lg font-bold text-[#FFFDF9] mt-0.5">{currentLocation}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 text-xs sm:text-sm text-[#D8C7B5]">
            <p className="italic text-center sm:text-left">
              {t.trainings_page.custom_dates_note}
            </p>
            <a
              href="#registration-form-section"
              className="px-5 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#24140D] font-extrabold text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
            >
              {lang === 'fr' ? 'Réserver ma Place' : 'Reserve My Spot'}
            </a>
          </div>
        </div>
      )}

      {/* Pricing & Value Breakdown Card */}
      <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37]/50 p-6 sm:p-8 shadow-xl space-y-6">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="font-brand font-bold text-2xl sm:text-3xl text-[#24140D]">
            {t.trainings_page.pricing_title}
          </h2>
          <p className="text-xs sm:text-sm text-[#735A4A]">
            {lang === 'fr' 
              ? 'Une tarification claire et sans frais cachés pour vous lancer en toute confiance.'
              : 'Clear, transparent pricing so you can budget and launch with complete confidence.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Registration Fee */}
          <div className="p-6 rounded-2xl bg-[#FDF8F0] border-2 border-[#E3D1BE] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A5B18]">
                {t.trainings_page.reg_fee_label}
              </span>
              <span className="text-xs bg-[#EAD6C0] text-[#4A2F13] px-2.5 py-0.5 rounded-full font-bold">
                Mandatory
              </span>
            </div>
            <div className="text-3xl font-brand font-extrabold text-[#24140D]">
              {t.trainings_page.reg_fee_amount}
            </div>
            <p className="text-xs sm:text-sm text-[#634E3F] leading-relaxed">
              {t.trainings_page.reg_fee_desc}
            </p>
          </div>

          {/* Full Training Fee */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#2B160C] to-[#1E0F07] text-[#FFFDF9] border-2 border-[#D4AF37] space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E5C158]">
                {t.trainings_page.training_fee_label}
              </span>
              <span className="text-xs bg-[#D4AF37] text-[#24140D] px-2.5 py-0.5 rounded-full font-extrabold">
                100% Practical
              </span>
            </div>
            <div className="text-3xl font-brand font-extrabold text-[#E5C158]">
              {t.trainings_page.training_fee_amount}
            </div>
            <p className="text-xs sm:text-sm text-[#D8C7B5] leading-relaxed">
              {t.trainings_page.training_fee_desc}
            </p>
          </div>
        </div>

        {/* Pricing Note */}
        <div className="p-4 rounded-xl bg-[#F7EFE4] border border-[#D4AF37]/30 text-xs sm:text-sm text-[#4E3B2F] flex items-start gap-2.5">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <span>{t.trainings_page.negotiable_note}</span>
        </div>
      </div>

      {/* 4 Step-by-Step Interactive Training Modules */}
      <div className="space-y-8">
        <div className="text-center space-y-2 max-w-3xl mx-auto">
          <div className="text-xs font-extrabold uppercase tracking-widest text-[#B8860B]">
            {lang === 'fr' ? 'Programme Pédagogique Détaillé' : 'Detailed Curriculum & Steps'}
          </div>
          <h2 className="font-brand font-bold text-2xl sm:text-3xl text-[#24140D]">
            {t.trainings_page.process_steps_title}
          </h2>
          <p className="text-sm text-[#6E5545]">
            {t.trainings_page.process_steps_subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {TRAINING_PROGRAMS.map((program, pIndex) => {
            const isOpen = Boolean(openPrograms[program.id]);
            const name = lang === 'fr' ? program.name_fr : program.name_en;
            const tagline = lang === 'fr' ? program.tagline_fr : program.tagline_en;
            const desc = lang === 'fr' ? program.description_fr : program.description_en;
            const highlights = lang === 'fr' ? program.highlights_fr : program.highlights_en;

            return (
              <div
                key={program.id}
                id={`training-module-${program.id}`}
                className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E5D5C5] overflow-hidden shadow-lg transition-all"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleProgram(program.id)}
                  className="w-full p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-left bg-gradient-to-r from-[#FAF6F0] to-[#FFFDF9] hover:bg-[#F5ECE0] transition-colors border-b border-[#EDE0D2]"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-[#D4AF37] shrink-0 shadow-md">
                      <img
                        src={program.image}
                        alt={name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-[#24140D] text-[#E5C158]">
                          Module 0{pIndex + 1}
                        </span>
                        <span className="text-xs text-[#8A5B18] font-bold">
                          {program.total_steps} {t.trainings_page.steps_count}
                        </span>
                      </div>
                      <h3 className="font-brand font-bold text-xl sm:text-2xl text-[#24140D] mt-1">
                        {name}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#735A4A] mt-0.5">
                        {tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
                    <span className="text-xs font-bold text-[#8A5B18] hidden sm:inline">
                      {isOpen ? (lang === 'fr' ? 'Masquer les étapes' : 'Hide Steps') : (lang === 'fr' ? 'Voir les 7 étapes' : 'View All Steps')}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-[#24140D] text-[#E5C158] flex items-center justify-center shadow">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </button>

                {/* Accordion Expanded Content */}
                {isOpen && (
                  <div className="p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
                    {/* Description & Key Highlights */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#FDF8F0] p-6 rounded-2xl border border-[#E8D9C8]">
                      <div className="lg:col-span-6 space-y-3">
                        <h4 className="font-brand font-bold text-lg text-[#24140D]">
                          {lang === 'fr' ? 'Présentation de la Formation' : 'Module Overview & Objectives'}
                        </h4>
                        <p className="text-sm text-[#5C4537] leading-relaxed">
                          {desc}
                        </p>
                      </div>

                      <div className="lg:col-span-6 space-y-3">
                        <h4 className="font-brand font-bold text-lg text-[#24140D]">
                          {t.trainings_page.module_highlights}
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-[#4E3B2F]">
                          {highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Step by Step Timeline */}
                    <div className="space-y-4">
                      <h4 className="font-brand font-bold text-lg text-[#24140D] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <span>{lang === 'fr' ? 'Les Étapes Pratiques Réelles (De A à Z)' : 'Exact Production Steps (A to Z)'}</span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {program.steps.map((stepItem) => {
                          const stepTitle = lang === 'fr' ? stepItem.title_fr : stepItem.title_en;
                          const stepDesc = lang === 'fr' ? stepItem.description_fr : stepItem.description_en;

                          return (
                            <div
                              key={stepItem.step}
                              className="p-5 rounded-2xl bg-[#FFFFFF] border-2 border-[#EFE5DA] hover:border-[#D4AF37] transition-colors space-y-2.5 shadow-sm"
                            >
                              <div className="flex items-center justify-between">
                                <span className="w-7 h-7 rounded-full bg-[#24140D] text-[#E5C158] text-xs font-extrabold flex items-center justify-center shadow">
                                  {stepItem.step}
                                </span>
                                <span className="text-[11px] font-semibold text-[#A8907E]">
                                  Step {stepItem.step} of {program.total_steps}
                                </span>
                              </div>
                              <h5 className="font-brand font-bold text-sm sm:text-base text-[#24140D]">
                                {stepTitle}
                              </h5>
                              <p className="text-xs sm:text-sm text-[#634E3F] leading-relaxed">
                                {stepDesc}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared Registration Form Section */}
      <section id="registration-form-section" className="scroll-mt-24">
        <div className="bg-gradient-to-br from-[#24130A] via-[#2E180E] to-[#1E0E08] text-[#FFFDF9] rounded-3xl p-6 sm:p-10 border-3 border-[#D4AF37] shadow-2xl max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3D2214] border border-[#D4AF37]/40 text-[#E5C158] text-xs font-bold">
              <FileText className="w-4 h-4 text-[#D4AF37]" />
              <span>{lang === 'fr' ? 'Formulaire d’Inscription Officiel' : 'Official Registration Form'}</span>
            </div>
            <h2 className="font-brand font-bold text-2xl sm:text-4xl text-[#FFFDF9]">
              {t.registration.title}
            </h2>
            <p className="text-sm sm:text-base text-[#D8C7B5] max-w-2xl mx-auto">
              {t.registration.subtitle}
            </p>
          </div>

          {/* Form Error or Success Banner */}
          {formError && (
            <div className="p-4 rounded-xl bg-red-900/60 border border-red-500 text-red-100 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {submitSuccess && (
            <div className="p-4 rounded-xl bg-emerald-900/70 border border-emerald-500 text-emerald-100 text-sm flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
              <span>{t.registration.success_message}</span>
            </div>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-[#E5C158]">
                  {t.registration.name_label}
                </label>
                <div className="relative">
                  <User className="w-5 h-5 text-[#A8907E] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t.registration.name_placeholder}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#170C06] border border-[#4D2E1F] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm placeholder-[#7E6554] outline-none transition-all"
                  />
                </div>
              </div>

              {/* WhatsApp Phone */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-[#E5C158]">
                  {t.registration.phone_label}
                </label>
                <div className="relative">
                  <Phone className="w-5 h-5 text-[#A8907E] absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t.registration.phone_placeholder}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#170C06] border border-[#4D2E1F] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm placeholder-[#7E6554] outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Current Location */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-[#E5C158]">
                  {t.registration.location_label}
                </label>
                <div className="relative">
                  <MapPin className="w-5 h-5 text-[#A8907E] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder={t.registration.location_placeholder}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#170C06] border border-[#4D2E1F] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm placeholder-[#7E6554] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Training Interest Selection */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-[#E5C158]">
                  {t.registration.training_interest_label}
                </label>
                <select
                  name="training_interest"
                  value={formData.training_interest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-[#170C06] border border-[#4D2E1F] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm outline-none transition-all"
                >
                  <option value="All 4 Modules (Soap, Chocolate, Ovaltine, Spaghetti)">
                    {t.registration.training_interest_options.all}
                  </option>
                  <option value="Soap Production Only">
                    {t.registration.training_interest_options.soap}
                  </option>
                  <option value="Chocolate Production Only">
                    {t.registration.training_interest_options.chocolate}
                  </option>
                  <option value="Ovaltine Production Only">
                    {t.registration.training_interest_options.ovaltine}
                  </option>
                  <option value="Spaghetti Production Only">
                    {t.registration.training_interest_options.spaghetti}
                  </option>
                  <option value="Soap + Chocolate">
                    {t.registration.training_interest_options.soap_and_chocolate}
                  </option>
                  <option value="Custom Combination">
                    {t.registration.training_interest_options.custom}
                  </option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Preferred Month */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-[#E5C158]">
                  {t.registration.preferred_month_label}
                </label>
                <div className="relative">
                  <Calendar className="w-5 h-5 text-[#A8907E] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="preferred_month"
                    value={formData.preferred_month}
                    onChange={handleInputChange}
                    placeholder={t.registration.preferred_month_placeholder}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#170C06] border border-[#4D2E1F] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm placeholder-[#7E6554] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Preferred Location (if different) */}
              <div className="space-y-2">
                <label className="block text-xs sm:text-sm font-bold text-[#E5C158]">
                  {t.registration.preferred_location_label}
                </label>
                <div className="relative">
                  <MapPinHouse className="w-5 h-5 text-[#A8907E] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    name="preferred_location"
                    value={formData.preferred_location}
                    onChange={handleInputChange}
                    placeholder={t.registration.preferred_location_placeholder}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#170C06] border border-[#4D2E1F] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm placeholder-[#7E6554] outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-[#A8907E]">
                  {t.registration.help_text}
                </p>
              </div>
            </div>

            {/* About You */}
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold text-[#E5C158]">
                {t.registration.about_label}
              </label>
              <textarea
                name="about"
                rows={3}
                value={formData.about}
                onChange={handleInputChange}
                placeholder={t.registration.about_placeholder}
                className="w-full px-4 py-3 rounded-xl bg-[#170C06] border border-[#4D2E1F] focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] text-white text-sm placeholder-[#7E6554] outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Privacy & No Online Payment Note */}
            <div className="p-4 rounded-xl bg-[#1A0C06] border border-[#3D251A] text-xs text-[#B9A392] flex items-start gap-2.5">
              <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>{t.registration.privacy_note}</span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                id="registration-submit-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#24140D] font-extrabold text-base shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-75 cursor-pointer"
              >
                <Send className="w-5 h-5 text-[#24140D]" />
                <span>
                  {isSubmitting ? t.registration.submitting : t.registration.submit_button}
                </span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
