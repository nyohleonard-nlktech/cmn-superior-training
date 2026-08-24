import { Language, Product, Registration } from '../types';

/**
 * Cleans phone numbers for WhatsApp deep links
 * Ensures Cameroon / international numbers have valid numeric digits without spaces or leading +
 */
export function cleanPhoneNumber(phone: string, defaultCountryCode = '237'): string {
  const digits = phone.replace(/\D/g, '');
  if (!digits) return defaultCountryCode;
  
  // If it starts with 237, keep it
  if (digits.startsWith('237') && digits.length >= 11) {
    return digits;
  }
  
  // If it's a 9 digit Cameroon number (e.g. 654785642), prepend 237
  if (digits.length === 9) {
    return `237${digits}`;
  }
  
  // If user entered with 00237
  if (digits.startsWith('00237')) {
    return digits.substring(2);
  }

  return digits;
}

/**
 * Builds the WhatsApp DM link for student registration
 */
export function buildRegistrationWhatsAppUrl(
  adminPhone: string,
  registration: Omit<Registration, 'id' | 'paid' | 'created_at'>,
  lang: Language
): string {
  const cleanAdmin = cleanPhoneNumber(adminPhone || '237654785642');
  
  let message = '';
  if (lang === 'fr') {
    message = `Bonjour CMN Formation Supérieure,\n\n` +
      `Je viens de soumettre mon inscription sur votre site web pour la formation pratique :\n\n` +
      `👤 Nom : ${registration.name}\n` +
      `📞 Téléphone : ${registration.phone}\n` +
      `📍 Ville / Localisation actuelle : ${registration.location}\n` +
      `🎯 Formation(s) souhaitée(s) : ${registration.training_interest || 'Toutes les formations'}\n` +
      `📅 Mois / Période préférée : ${registration.preferred_month || 'Prochaine session'}\n` +
      `🏛️ Ville / Lieu souhaité : ${registration.preferred_location || registration.location}\n` +
      (registration.about ? `📝 À propos de moi / Objectifs : ${registration.about}\n\n` : `\n`) +
      `Je souhaite confirmer ma place et convenir du paiement des frais d'inscription (2 100 FCFA). Merci !`;
  } else {
    message = `Hello CMN Superior Quality Training,\n\n` +
      `I have just submitted my registration on your website for the practical training:\n\n` +
      `👤 Name: ${registration.name}\n` +
      `📞 Phone: ${registration.phone}\n` +
      `📍 Current City / Location: ${registration.location}\n` +
      `🎯 Training of Interest: ${registration.training_interest || 'All Modules'}\n` +
      `📅 Preferred Month / Time: ${registration.preferred_month || 'Next upcoming session'}\n` +
      `🏛️ Preferred City / Venue: ${registration.preferred_location || registration.location}\n` +
      (registration.about ? `📝 About Me / Goals: ${registration.about}\n\n` : `\n`) +
      `I would like to confirm my spot and arrange the 2,100 XAF registration fee payment. Thank you!`;
  }

  return `https://wa.me/${cleanAdmin}?text=${encodeURIComponent(message)}`;
}

/**
 * Builds the WhatsApp DM link for ordering products or raw materials
 */
export function buildProductOrderWhatsAppUrl(
  adminPhone: string,
  product: Product,
  lang: Language
): string {
  const cleanAdmin = cleanPhoneNumber(adminPhone || '237654785642');
  const productName = lang === 'fr' ? product.name_fr : product.name_en;
  const unitStr = product.unit ? ` (${product.unit})` : '';

  let message = '';
  if (lang === 'fr') {
    message = `Bonjour CMN Formation,\n\n` +
      `Je souhaite commander l'article suivant vu sur votre site web :\n\n` +
      `📦 Produit : ${productName}${unitStr}\n` +
      `💰 Prix unitaire : ${product.price.toLocaleString()} FCFA\n` +
      `🏷️ Catégorie : ${product.category}\n\n` +
      `Pouvez-vous m'indiquer la disponibilité et les modalités de livraison ou de retrait à Yaoundé / en région ? Merci !`;
  } else {
    message = `Hello CMN Superior Quality Training,\n\n` +
      `I would like to order the following item from your website catalog:\n\n` +
      `📦 Product: ${productName}${unitStr}\n` +
      `💰 Unit Price: ${product.price.toLocaleString()} XAF\n` +
      `🏷️ Category: ${product.category}\n\n` +
      `Please let me know about availability and pickup/dispatch options in Yaoundé or across Cameroon. Thank you!`;
  }

  return `https://wa.me/${cleanAdmin}?text=${encodeURIComponent(message)}`;
}

/**
 * General inquiry WhatsApp DM link
 */
export function buildGeneralInquiryWhatsAppUrl(
  adminPhone: string,
  lang: Language,
  customTopic?: string
): string {
  const cleanAdmin = cleanPhoneNumber(adminPhone || '237654785642');
  
  let message = '';
  if (lang === 'fr') {
    message = customTopic 
      ? `Bonjour CMN Formation, je vous contacte depuis votre site concernant : ${customTopic}.`
      : `Bonjour CMN Formation Qualité Supérieure, je vous contacte depuis votre site web pour avoir des renseignements sur vos formations et matières premières.`;
  } else {
    message = customTopic
      ? `Hello CMN Superior Quality Training, I am reaching out from your website regarding: ${customTopic}.`
      : `Hello CMN Superior Quality Training, I am reaching out from your website for information on your hands-on trainings and raw materials supply.`;
  }

  return `https://wa.me/${cleanAdmin}?text=${encodeURIComponent(message)}`;
}

/**
 * Admin click-to-chat with a registrant
 */
export function buildAdminToRegistrantWhatsAppUrl(
  registrantPhone: string,
  registrantName: string,
  preferredMonth?: string
): string {
  const cleanPhone = cleanPhoneNumber(registrantPhone);
  const message = `Hello ${registrantName}, this is CMN Superior Quality Training regarding your registration for our practical production training (${preferredMonth || 'upcoming session'}). How can we assist you today?`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
