import React, { useState } from 'react';
import { Language, Product, SiteSettings } from '../types';
import { translations } from '../translations';
import { 
  ShoppingBag, 
  MessageCircle, 
  Search, 
  Sparkles, 
  Check, 
  Package, 
  Layers, 
  ExternalLink,
  ShieldAlert
} from 'lucide-react';
import { buildProductOrderWhatsAppUrl, buildGeneralInquiryWhatsAppUrl } from '../utils/whatsapp';
import { getOptimizedImageUrl } from '../utils/imageUrl';

interface ProductsViewProps {
  lang: Language;
  products: Product[];
  settings: SiteSettings;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  lang,
  products,
  settings
}) => {
  const t = translations[lang];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: t.products_page.categories.all },
    { id: 'soap', label: t.products_page.categories.soap },
    { id: 'raw_material', label: t.products_page.categories.raw_material },
    { id: 'food_ingredients', label: t.products_page.categories.food_ingredients },
    { id: 'equipment', label: t.products_page.categories.equipment }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const name = lang === 'fr' ? p.name_fr : p.name_en;
    const desc = lang === 'fr' ? p.description_fr : p.description_en;
    const matchesSearch = 
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3B2013] text-[#D4AF37] border border-[#D4AF37]/30 text-xs sm:text-sm font-bold">
          <ShoppingBag className="w-4 h-4" />
          <span>{lang === 'fr' ? 'Boutique & Approvisionnement Direct' : 'Shop & Direct Supply Line'}</span>
        </div>
        <h1 className="font-brand font-extrabold text-3xl sm:text-5xl text-[#24140D] tracking-tight">
          {t.products_page.title}
        </h1>
        <p className="text-base sm:text-lg text-[#6B5242] leading-relaxed">
          {t.products_page.subtitle}
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8D9C8] shadow-md">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              id={`filter-cat-${cat.id}`}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#24140D] text-[#E5C158] shadow-md'
                  : 'bg-[#F5EDE1] text-[#634E3F] hover:bg-[#EBDDCB]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#8A7160] absolute left-3.5 top-3.5" />
          <input
            id="product-search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={lang === 'fr' ? 'Rechercher un produit...' : 'Search items...'}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] placeholder-[#9C8271] focus:outline-none focus:border-[#D4AF37]"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="p-12 text-center bg-[#FFFDF9] rounded-3xl border border-[#E8D9C8] space-y-3">
          <Package className="w-12 h-12 text-[#B8860B] mx-auto opacity-50" />
          <h3 className="font-brand font-bold text-lg text-[#24140D]">
            {lang === 'fr' ? 'Aucun article trouvé' : 'No products found'}
          </h3>
          <p className="text-xs sm:text-sm text-[#735A4A]">
            {lang === 'fr' ? 'Essayez un autre mot-clé ou filtre.' : 'Try adjusting your search query or category filter.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => {
            const name = lang === 'fr' ? product.name_fr : product.name_en;
            const desc = lang === 'fr' ? product.description_fr : product.description_en;
            const orderUrl = buildProductOrderWhatsAppUrl(settings.whatsapp_admin_phone, product, lang);

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E8D9C8] hover:border-[#D4AF37] transition-all duration-300 shadow-lg hover:shadow-xl overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo Frame */}
                  <div className="relative h-56 bg-[#24140D] overflow-hidden flex items-center justify-center">
                    <img
                      src={getOptimizedImageUrl(product.photo_url)}
                      alt={name}
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.src.includes('soap_production')) {
                          target.src = '/images/soap_production_1787567070599.jpg';
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-[#24140D]/90 backdrop-blur border border-[#D4AF37]/50 text-[#E5C158] text-[11px] font-bold px-2.5 py-1 rounded-full uppercase">
                      {product.category.replace('_', ' ')}
                    </div>
                    {product.unit && (
                      <div className="absolute bottom-3 right-3 bg-[#1A0C06]/90 backdrop-blur text-white text-[11px] font-medium px-2.5 py-1 rounded-lg">
                        {product.unit}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="font-brand font-extrabold text-2xl text-[#24140D]">
                        {product.price.toLocaleString()}{' '}
                        <span className="text-sm font-semibold text-[#8A5B18]">
                          {t.products_page.price_currency}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <Check className="w-3 h-3" />
                        {t.products_page.in_stock}
                      </span>
                    </div>

                    <h3 className="font-brand font-bold text-lg text-[#24140D] line-clamp-2">
                      {name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#634E3F] leading-relaxed line-clamp-3">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Footer / Order via WhatsApp Action */}
                <div className="p-6 pt-0">
                  <a
                    id={`order-btn-${product.id}`}
                    href={orderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 transform active:scale-95"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.products_page.order_btn}</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Direct Supply / Wholesale Inquiries Card */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#24130A] via-[#2F190F] to-[#1F0E07] text-[#FFFDF9] border-2 border-[#D4AF37] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E5C158] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{lang === 'fr' ? 'Approvisionnement de Gros' : 'Wholesale Distribution'}</span>
          </div>
          <h3 className="font-brand font-bold text-xl sm:text-2xl text-[#FFFDF9]">
            {t.products_page.direct_supply_banner.title}
          </h3>
          <p className="text-xs sm:text-sm text-[#D8C7B5] max-w-2xl leading-relaxed">
            {t.products_page.direct_supply_banner.desc}
          </p>
        </div>

        <a
          id="wholesale-inquiry-whatsapp-btn"
          href={buildGeneralInquiryWhatsAppUrl(
            settings.whatsapp_admin_phone,
            lang,
            lang === 'fr' ? 'Commande en gros de matières premières (Soude, Huile de palmiste, etc.)' : 'Bulk wholesale inquiry for raw materials (Caustic soda, Palm kernel oil, etc.)'
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#E5C158] text-[#24140D] font-extrabold text-sm shadow-xl whitespace-nowrap transition-all transform hover:scale-105"
        >
          {t.products_page.direct_supply_banner.btn}
        </a>
      </div>
    </div>
  );
};
