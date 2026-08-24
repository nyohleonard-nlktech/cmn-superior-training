import fs from 'fs';
import path from 'path';

export interface SiteDb {
  admin: {
    password: string;
    username: string;
  };
  settings: {
    id: string;
    whatsapp_community_link: string;
    whatsapp_admin_phone: string;
    company_name: string;
    email: string;
    address_en: string;
    address_fr: string;
    updated_at: string;
  };
  announcement: {
    id: string;
    period_text_en: string;
    period_text_fr: string;
    location_en: string;
    location_fr: string;
    active: boolean;
    created_at: string;
    updated_at?: string;
  };
  registrations: Array<{
    id: string;
    name: string;
    phone: string;
    location: string;
    about: string;
    preferred_month: string;
    preferred_location: string;
    training_interest: string;
    paid: boolean;
    completed?: boolean;
    notes: string;
    created_at: string;
  }>;
  products: Array<{
    id: string;
    name_en: string;
    name_fr: string;
    price: number;
    description_en: string;
    description_fr: string;
    photo_url: string;
    category: string;
    in_stock: boolean;
    unit: string;
  }>;
}

export const defaultDb: SiteDb = {
  admin: {
    password: process.env.ADMIN_PASSWORD || 'cmn2026',
    username: 'admin'
  },
  settings: {
    id: 'settings-1',
    whatsapp_community_link: 'https://chat.whatsapp.com/CMNTrainingCommunityYaounde2026',
    whatsapp_admin_phone: '237654785642',
    company_name: 'CMN Superior Quality Training',
    email: 'contact@cmntraining.cm',
    address_en: 'Biyem-Assi / Acacia, Yaoundé, Cameroon (Travels to Douala, Bafoussam, Bertoua)',
    address_fr: 'Biyem-Assi / Acacia, Yaoundé, Cameroun (Déplacements à Douala, Bafoussam, Bertoua)',
    updated_at: new Date().toISOString()
  },
  announcement: {
    id: 'announcement-1',
    period_text_en: 'Next Session: September 15 – 20, 2026 (Morning & Evening Sessions Available)',
    period_text_fr: 'Prochaine Session : 15 – 20 Septembre 2026 (Groupes du matin et du soir disponibles)',
    location_en: 'Yaoundé, Cameroon (Main Training Workshop - Biyem-Assi)',
    location_fr: 'Yaoundé, Cameroun (Atelier Principal - Biyem-Assi)',
    active: true,
    created_at: new Date().toISOString()
  },
  registrations: [
    {
      id: 'reg-sample-1',
      name: 'Marie Claire Kemgne',
      phone: '237677894512',
      location: 'Yaoundé (Biyem-Assi)',
      about: 'Looking to start a local boutique hotel soap manufacturing and liquid detergent business.',
      preferred_month: 'September 2026',
      preferred_location: 'Yaoundé',
      training_interest: 'Soap + Chocolate',
      paid: true,
      completed: false,
      notes: 'Paid 2,100 XAF via Orange Money on 2026-08-20.',
      created_at: new Date(Date.now() - 3600 * 1000 * 48).toISOString()
    },
    {
      id: 'reg-sample-2',
      name: 'Emmanuel Tchakounte',
      phone: '237699123456',
      location: 'Douala (Akwa)',
      about: 'Cocoa farmer wanting to process own cocoa into chocolate bars and Ovaltine powder.',
      preferred_month: 'October 2026',
      preferred_location: 'Douala (Requesting session in Douala)',
      training_interest: 'All 4 Modules',
      paid: false,
      completed: false,
      notes: 'Wants Douala cohort dates.',
      created_at: new Date(Date.now() - 3600 * 1000 * 24).toISOString()
    }
  ],
  products: [
    {
      id: 'prod-soap-01',
      name_en: 'CMN Superior Laundry & Multipurpose Soap (Pack of 5)',
      name_fr: 'Savon de Ménage & Polyvalent Supérieur CMN (Lot de 5)',
      price: 2500,
      description_en: 'High-foaming, durable, premium cold-process laundry soap bars made with refined palm kernel oil.',
      description_fr: 'Pain de savon de ménage saponifié à froid, riche en mousse, très résistant.',
      photo_url: '/images/soap_production_1787567070599.jpg',
      category: 'soap',
      in_stock: true,
      unit: 'Pack of 5 bars (200g each)'
    },
    {
      id: 'prod-soap-02',
      name_en: 'CMN Medicated Antiseptic Herbal Body Soap',
      name_fr: 'Savon de Toilette Antiseptique & Plantes Médicinales CMN',
      price: 1500,
      description_en: 'Formulated with pure shea butter, neem, turmeric, and tea tree extracts. Deeply cleanses and moisturizes.',
      description_fr: 'Formulé au pur beurre de karité, neem, curcuma et extrait d’arbre à thé. Purifie et hydrate.',
      photo_url: '/images/soap_production_1787567070599.jpg',
      category: 'soap',
      in_stock: true,
      unit: '150g bar'
    },
    {
      id: 'prod-raw-01',
      name_en: 'Pure Sodium Hydroxide (Caustic Soda Flakes) 99%',
      name_fr: 'Soude Caustique Pure en Écailles 99% (NaOH)',
      price: 3500,
      description_en: 'Laboratory grade high-purity caustic soda flakes for soap manufacturing. Guaranteed 99% purity.',
      description_fr: 'Soude caustique en écailles de qualité industrielle supérieure 99% de pureté pour savonnerie.',
      photo_url: '/images/raw_materials_1787567125868.jpg',
      category: 'raw_material',
      in_stock: true,
      unit: '1 kg container'
    },
    {
      id: 'prod-raw-02',
      name_en: 'Refined Palm Kernel Oil (PKO) for Soap Making',
      name_fr: 'Huile de Palmiste Raffinée (PKO) Spécial Savonnerie',
      price: 7500,
      description_en: 'High lauric acid content oil essential for intense foaming and rock-hard soap bars.',
      description_fr: 'Huile riche en acide laurique indispensable pour obtenir un savon dur et ultra moussant.',
      photo_url: '/images/raw_materials_1787567125868.jpg',
      category: 'raw_material',
      in_stock: true,
      unit: '5 Litres Bidon'
    },
    {
      id: 'prod-raw-03',
      name_en: 'Pure Unrefined Cocoa Butter (Raw Cacao)',
      name_fr: 'Beurre de Cacao Pur Non Raffiné',
      price: 6000,
      description_en: 'Aromatic food and cosmetic grade 100% natural cocoa butter extracted from select Cameroonian cocoa beans.',
      description_fr: 'Beurre de cacao 100% naturel pressé à partir de fèves camerounaises sélectionnées.',
      photo_url: '/images/chocolate_craft_1787567084584.jpg',
      category: 'food_ingredients',
      in_stock: true,
      unit: '1 kg block'
    },
    {
      id: 'prod-raw-04',
      name_en: 'Natural Essential Oils & Fragrances Kit (Lavender, Lemon, Mint)',
      name_fr: 'Kit Parfums & Huiles Essentielles pour Savon (Lavande, Citron, Menthe)',
      price: 4500,
      description_en: 'Concentrated cosmetic fragrances resistant to high lye pH for long-lasting luxury aroma.',
      description_fr: 'Parfums cosmétiques concentrés résistant au pH de la soude pour une fragrance durable.',
      photo_url: '/images/raw_materials_1787567125868.jpg',
      category: 'raw_material',
      in_stock: true,
      unit: '3 x 100ml bottles'
    },
    {
      id: 'prod-eq-01',
      name_en: 'Professional Wooden Log Mold with Silicone Liner + Wire Cutter',
      name_fr: 'Moule à Savon en Bois avec Doublure Silicone + Coupeur au Fil',
      price: 18000,
      description_en: 'Heavy-duty 1.5kg capacity soap mold with food-grade silicone insert and stainless steel adjustable wire cutter.',
      description_fr: 'Moule professionnel 1,5 kg avec insert silicone alimentaire et coupeur réglable en fil inox.',
      photo_url: '/images/soap_production_1787567070599.jpg',
      category: 'equipment',
      in_stock: true,
      unit: 'Complete Set'
    }
  ]
};

// In serverless, memory or /tmp can be used
let memoryDb: SiteDb | null = null;

function getDbFilePath(): string {
  const localPath = path.join(process.cwd(), 'data', 'db.json');
  if (fs.existsSync(localPath)) {
    return localPath;
  }
  const tmpPath = path.join('/tmp', 'cmn_db.json');
  return tmpPath;
}

export function readDb(): SiteDb {
  if (memoryDb) {
    return memoryDb;
  }

  try {
    const localDataPath = path.join(process.cwd(), 'data', 'db.json');
    if (fs.existsSync(localDataPath)) {
      const raw = fs.readFileSync(localDataPath, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb!;
    }

    const tmpPath = path.join('/tmp', 'cmn_db.json');
    if (fs.existsSync(tmpPath)) {
      const raw = fs.readFileSync(tmpPath, 'utf-8');
      memoryDb = JSON.parse(raw);
      return memoryDb!;
    }
  } catch (err) {
    console.error('Error reading db in serverless:', err);
  }

  memoryDb = JSON.parse(JSON.stringify(defaultDb));
  return memoryDb!;
}

export function writeDb(data: SiteDb) {
  memoryDb = data;
  try {
    const localDataDir = path.join(process.cwd(), 'data');
    if (fs.existsSync(localDataDir)) {
      fs.writeFileSync(path.join(localDataDir, 'db.json'), JSON.stringify(data, null, 2), 'utf-8');
      return;
    }
  } catch {
    // Read-only filesystem in cloud serverless
  }

  try {
    const tmpPath = path.join('/tmp', 'cmn_db.json');
    fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to /tmp/cmn_db.json:', err);
  }
}

export function parseBody(req: any): any {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

export function setCors(res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );
}
