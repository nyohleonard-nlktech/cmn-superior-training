import React from 'react';
import { Language, SiteSettings, TrainingAnnouncement } from '../types';
import { translations } from '../translations';
import { TRAINING_PROGRAMS } from '../data/trainingData';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Package, 
  Truck, 
  DollarSign, 
  Users, 
  Award, 
  Flame, 
  MessageCircle, 
  ShoppingBag, 
  BookOpen,
  Phone
} from 'lucide-react';
import { buildGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';
import { APP_IMAGES } from '../assets/images';
import { getOptimizedImageUrl } from '../utils/imageUrl';

interface HomeViewProps {
  lang: Language;
  setCurrentTab: (tab: string) => void;
  setSelectedTrainingId?: (id: string) => void;
  settings: SiteSettings;
  announcement: TrainingAnnouncement;
}

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  setCurrentTab,
  setSelectedTrainingId,
  settings,
  announcement
}) => {
  const t = translations[lang];

  const handleExploreTraining = (id?: string) => {
    if (id && setSelectedTrainingId) {
      setSelectedTrainingId(id);
    }
    setCurrentTab('trainings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#24130A] via-[#2D180D] to-[#1F0E07] text-[#FFFDF9] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-[#D4AF37]/30">
        {/* Subtle decorative background circles */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#D4AF37]/5 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#A8622A]/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D2214] border border-[#D4AF37]/40 text-[#E5C158] text-xs sm:text-sm font-semibold shadow-inner">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                <span>{t.hero.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-brand font-extrabold text-3xl sm:text-5xl lg:text-5xl tracking-tight leading-tight text-[#FFFDF9]">
                {t.hero.title_start}{' '}
                <span className="gold-gradient-text block sm:inline">
                  {t.hero.title_accent}
                </span>{' '}
                <span className="text-[#E0D3C3] font-normal text-2xl sm:text-4xl block mt-1">
                  {t.hero.title_end}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#D8C7B5] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {t.hero.subtitle}
              </p>

              {/* Prominent USP Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#3B1F13] to-[#2B160C] border-2 border-[#D4AF37] shadow-xl text-left">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#D4AF37] text-[#24140D] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                    <Flame className="w-5 h-5 font-bold" />
                  </div>
                  <div>
                    <h3 className="font-brand font-bold text-[#E5C158] text-base sm:text-lg">
                      {t.hero.usp_title}
                    </h3>
                    <p className="text-[#FFFDF9] text-sm font-medium mt-0.5 leading-snug">
                      {t.hero.usp_desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  id="hero-explore-trainings-btn"
                  type="button"
                  onClick={() => handleExploreTraining()}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#E5C158] to-[#C59B27] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#24140D] font-extrabold text-sm shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#24140D]" />
                  <span>{t.hero.cta_trainings}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-buy-products-btn"
                  type="button"
                  onClick={() => { setCurrentTab('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="px-6 py-3.5 rounded-xl bg-[#3D2214] hover:bg-[#4E2B1A] border border-[#D4AF37]/50 text-[#FFFDF9] font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t.hero.cta_products}</span>
                </button>

                <a
                  id="hero-whatsapp-admin-btn"
                  href={buildGeneralInquiryWhatsAppUrl(settings.whatsapp_admin_phone || '237654785642', lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 border border-emerald-400/40 text-white font-bold text-sm transition-all flex items-center gap-2 shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.hero.cta_whatsapp}</span>
                </a>

                <a
                  id="hero-call-admin-btn"
                  href={`tel:${settings.whatsapp_admin_phone || '237654785642'}`}
                  className="px-5 py-3.5 rounded-xl bg-[#2A150C] hover:bg-[#3D2013] border-2 border-[#D4AF37] text-[#E5C158] hover:text-[#FFFDF9] font-bold text-sm transition-all flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>{t.hero.cta_call || (lang === 'fr' ? 'Appelez-nous' : 'Call Us')}</span>
                </a>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main featured photo frame */}
                <div className="rounded-3xl overflow-hidden border-3 border-[#D4AF37] shadow-2xl bg-[#2B1810]">
                  <img
                    src={APP_IMAGES.soap_production}
                    alt="Soap and Manufacturing Workshop"
                    className="w-full h-72 sm:h-84 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-4 bg-[#24140D] border-t border-[#3D251A] flex items-center justify-between text-xs text-[#D8C7B5]">
                    <span className="font-semibold text-[#D4AF37]">{lang === 'fr' ? 'Atelier Pratique à Yaoundé' : 'Hands-On Yaoundé Workshop'}</span>
                    <span>100% Practical Practice</span>
                  </div>
                </div>

                {/* Floating Micro Badge */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#1A0D08]/95 backdrop-blur border-2 border-[#D4AF37] rounded-2xl p-3.5 shadow-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-600/30 border border-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#FFFDF9]">
                      {lang === 'fr' ? 'Matériel & Ingrédients Fournis' : 'Supplies & Materials Included'}
                    </div>
                    <div className="text-[11px] text-[#C5AB96]">
                      {lang === 'fr' ? 'Démarrage immédiat sans blocage' : 'Start your enterprise immediately'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md text-center">
            <Users className="w-6 h-6 text-[#C59B27] mx-auto mb-2" />
            <div className="font-brand font-bold text-xl sm:text-2xl text-[#24140D]">500+</div>
            <div className="text-xs sm:text-sm text-[#735A4A] font-medium">{t.stats.graduates}</div>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md text-center">
            <Award className="w-6 h-6 text-[#C59B27] mx-auto mb-2" />
            <div className="font-brand font-bold text-xl sm:text-2xl text-[#24140D]">100%</div>
            <div className="text-xs sm:text-sm text-[#735A4A] font-medium">{t.stats.success_rate}</div>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md text-center">
            <Truck className="w-6 h-6 text-[#C59B27] mx-auto mb-2" />
            <div className="font-brand font-bold text-xl sm:text-2xl text-[#24140D]">Yaoundé +</div>
            <div className="text-xs sm:text-sm text-[#735A4A] font-medium">{t.stats.cities}</div>
          </div>

          <div className="bg-[#FFFDF9] p-5 rounded-2xl border border-[#D4AF37]/30 shadow-md text-center">
            <Package className="w-6 h-6 text-[#C59B27] mx-auto mb-2" />
            <div className="font-brand font-bold text-xl sm:text-2xl text-[#24140D]">Direct</div>
            <div className="text-xs sm:text-sm text-[#735A4A] font-medium">{t.stats.supplies}</div>
          </div>
        </div>
      </section>

      {/* Company Description & Direct Contact Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E8D9C8] p-6 sm:p-10 lg:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF5EE] border border-[#D9C4B0] text-[#8A5B18] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{lang === 'fr' ? 'À Propos de CMN Superior Quality Training' : 'About CMN Superior Quality Training'}</span>
            </div>

            <h2 className="font-brand font-bold text-2xl sm:text-3xl text-[#24140D] leading-tight">
              {lang === 'fr' 
                ? 'Leader de la Formation Pratique en Production & Fournisseur de Matières Premières' 
                : 'Leader in Practical Manufacturing Training & Direct Raw Materials Supply'}
            </h2>

            <p className="text-sm sm:text-base text-[#634E3F] leading-relaxed">
              {lang === 'fr'
                ? 'Basée à Yaoundé et active sur tout le Cameroun, CMN Superior Quality Training forme les entrepreneurs, artisans et porteurs de projet à la fabrication de savon (ménage, liquide, morceaux), chocolat pur cacao, boisson maltée Ovaltine et spaghettis. Nous fournissons également les produits finis et les matières premières certifiées pour vous permettre de lancer votre activité en toute autonomie.'
                : 'Headquartered in Yaoundé and operating nationwide across Cameroon, CMN Superior Quality Training trains aspiring entrepreneurs, artisans, and manufacturers in soap production (laundry, liquid, bar soap), authentic chocolate, Ovaltine malt powder, and spaghetti. We also provide direct wholesale of raw materials and finished goods to empower your business.'}
            </p>

            {/* Direct Contact Buttons (Call Us + WhatsApp) */}
            <div className="pt-3 flex flex-wrap items-center gap-3.5">
              <a
                id="company-call-btn"
                href={`tel:${settings.whatsapp_admin_phone || '237654785642'}`}
                className="px-6 py-3.5 rounded-xl bg-[#24140D] hover:bg-[#3D2214] text-[#E5C158] hover:text-[#FFFDF9] font-extrabold text-sm shadow-md transition-all flex items-center gap-2 border-2 border-[#D4AF37] cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>{lang === 'fr' ? 'Appelez-nous : +237 654 78 56 42' : 'Call Us: +237 654 78 56 42'}</span>
              </a>

              <a
                id="company-whatsapp-btn"
                href={buildGeneralInquiryWhatsAppUrl(settings.whatsapp_admin_phone || '237654785642', lang)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Écrivez-nous sur WhatsApp' : 'Chat on WhatsApp'}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="rounded-2xl overflow-hidden border-2 border-[#D4AF37]/50 shadow-lg bg-[#24140D]">
              <img
                src={APP_IMAGES.chocolate_production}
                alt="Production Workshop"
                className="w-full h-56 sm:h-64 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-[#1C0F08] text-center text-xs text-[#E5C158] font-bold">
                {lang === 'fr' ? 'Ateliers Pratiques à 100%' : '100% Practical & Guided'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Flagship Training Programs Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#B8860B]">
            <Sparkles className="w-4 h-4" />
            <span>{lang === 'fr' ? 'Nos Formations Professionnelles' : 'Our Flagship Masterclasses'}</span>
          </div>
          <h2 className="font-brand font-bold text-2xl sm:text-4xl text-[#24140D]">
            {t.pillars.title}
          </h2>
          <p className="text-sm sm:text-base text-[#6E5545]">
            {t.pillars.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TRAINING_PROGRAMS.map(program => {
            const name = lang === 'fr' ? program.name_fr : program.name_en;
            const desc = lang === 'fr' ? program.description_fr : program.description_en;
            const highlights = lang === 'fr' ? program.highlights_fr : program.highlights_en;

            return (
              <div
                key={program.id}
                id={`program-card-${program.id}`}
                className="bg-[#FFFDF9] rounded-3xl border-2 border-[#EADBCB] hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Card Image */}
                  <div className="relative h-56 overflow-hidden bg-[#24140D]">
                    <img
                      src={program.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-[#24140D]/90 backdrop-blur border border-[#D4AF37] text-[#E5C158] text-xs font-bold px-3 py-1 rounded-full">
                      {program.total_steps} {t.trainings_page.steps_count}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <h3 className="font-brand font-bold text-xl sm:text-2xl text-[#24140D] group-hover:text-[#8A5B18] transition-colors">
                      {name}
                    </h3>
                    <p className="text-sm text-[#634E3F] leading-relaxed">
                      {desc}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[#F0E5D8]">
                      <div className="text-xs font-bold text-[#8A5B18] uppercase tracking-wider">
                        {t.trainings_page.module_highlights}
                      </div>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-[#4E3B2F]">
                        {highlights.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-6 pt-0">
                  <button
                    id={`view-process-btn-${program.id}`}
                    type="button"
                    onClick={() => handleExploreTraining(program.id)}
                    className="w-full py-3 rounded-xl bg-[#24140D] hover:bg-[#3D2214] text-[#E5C158] hover:text-[#FFFDF9] font-bold text-sm transition-colors flex items-center justify-center gap-2 border border-[#D4AF37]/30"
                  >
                    <span>{t.pillars.view_process}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why Choose CMN / USP Section */}
      <section className="bg-gradient-to-b from-[#2B1810] to-[#1E0F09] text-[#FFFDF9] py-16 sm:py-20 border-y border-[#D4AF37]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37]">
              {lang === 'fr' ? 'La Garantie CMN' : 'The CMN Guarantee'}
            </span>
            <h2 className="font-brand font-bold text-2xl sm:text-4xl text-[#FFFDF9]">
              {t.usp_section.title}
            </h2>
            <p className="text-sm sm:text-base text-[#D8C7B5]">
              {t.usp_section.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.usp_section.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#351E14]/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#24140D] font-extrabold flex items-center justify-center text-sm shadow-md">
                  0{idx + 1}
                </div>
                <h3 className="font-brand font-bold text-base sm:text-lg text-[#E5C158]">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#D4C3B2] leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing Highlight Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#24130A] border-2 border-[#D4AF37] shadow-2xl max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                {t.trainings_page.pricing_title}
              </div>
              <div className="text-xl sm:text-2xl font-brand font-bold text-[#FFFDF9]">
                {t.trainings_page.reg_fee_label}: <span className="text-[#E5C158]">{t.trainings_page.reg_fee_amount}</span> | {t.trainings_page.training_fee_label}: <span className="text-[#E5C158]">{t.trainings_page.training_fee_amount}</span>
              </div>
              <p className="text-xs text-[#B9A392]">
                {t.trainings_page.negotiable_note}
              </p>
            </div>

            <button
              id="pricing-cta-register-btn"
              type="button"
              onClick={() => handleExploreTraining()}
              className="px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#24140D] font-extrabold text-sm shadow-lg whitespace-nowrap transition-all transform hover:scale-105"
            >
              {lang === 'fr' ? 'S’inscrire Maintenant' : 'Register for Session'}
            </button>
          </div>
        </div>
      </section>

      {/* Raw Materials & Finished Store Teaser */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37]/40 p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#B8860B]">
              <Package className="w-4 h-4" />
              <span>{lang === 'fr' ? 'Boutique & Approvisionnement' : 'Direct Supply & Store'}</span>
            </div>
            <h2 className="font-brand font-bold text-2xl sm:text-3xl text-[#24140D]">
              {t.products_page.direct_supply_banner.title}
            </h2>
            <p className="text-sm sm:text-base text-[#6E5545] leading-relaxed">
              {t.products_page.direct_supply_banner.desc}
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                id="home-visit-shop-btn"
                type="button"
                onClick={() => { setCurrentTab('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3.5 rounded-xl bg-[#24140D] hover:bg-[#3D2214] text-[#E5C158] font-bold text-sm shadow-md transition-colors flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{lang === 'fr' ? 'Voir le Catalogue de Produits' : 'Browse Products & Raw Materials'}</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border-2 border-[#D4AF37]/60 shadow-lg">
              <img
                src={APP_IMAGES.raw_materials}
                alt="Raw Materials and Chemicals"
                className="w-full h-64 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
