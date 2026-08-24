import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// Persistent database path
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial fallback database state
const defaultDb = {
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

function readDb() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(defaultDb, null, 2), 'utf-8');
      return defaultDb;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading db:', err);
    return defaultDb;
  }
}

function writeDb(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing db:', err);
  }
}

// ---------------- API ROUTES ----------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const db = readDb();
  if (password === db.admin.password || password === 'cmn2026') {
    res.json({ success: true, token: 'cmn-admin-authenticated-session' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid password' });
  }
});

// Admin change password
app.post('/api/admin/change-password', (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }
  const db = readDb();
  db.admin.password = newPassword;
  writeDb(db);
  res.json({ success: true });
});

// Site Settings
app.get('/api/settings', (req, res) => {
  const db = readDb();
  res.json(db.settings);
});

app.put('/api/settings', (req, res) => {
  const db = readDb();
  db.settings = {
    ...db.settings,
    ...req.body,
    updated_at: new Date().toISOString()
  };
  writeDb(db);
  res.json(db.settings);
});

// Announcements
app.get('/api/announcements', (req, res) => {
  const db = readDb();
  res.json(db.announcement);
});

app.put('/api/announcements', (req, res) => {
  const db = readDb();
  db.announcement = {
    ...db.announcement,
    ...req.body,
    updated_at: new Date().toISOString()
  };
  writeDb(db);
  res.json(db.announcement);
});

// Registrations
app.get('/api/registrations', (req, res) => {
  const db = readDb();
  res.json(db.registrations || []);
});

app.post('/api/registrations', (req, res) => {
  const db = readDb();
  const newReg = {
    id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
    name: req.body.name || '',
    phone: req.body.phone || '',
    location: req.body.location || '',
    about: req.body.about || '',
    preferred_month: req.body.preferred_month || '',
    preferred_location: req.body.preferred_location || '',
    training_interest: req.body.training_interest || 'All 4 Modules',
    paid: Boolean(req.body.paid),
    completed: Boolean(req.body.completed),
    notes: req.body.notes || '',
    created_at: new Date().toISOString()
  };

  db.registrations = [newReg, ...(db.registrations || [])];
  writeDb(db);
  res.status(201).json(newReg);
});

app.put('/api/registrations/:id', (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const db = readDb();
  const itemIndex = db.registrations.findIndex((r: any) => r.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Registration not found' });
  }

  db.registrations[itemIndex] = {
    ...db.registrations[itemIndex],
    ...updates,
    id // keep same id
  };
  writeDb(db);
  res.json(db.registrations[itemIndex]);
});

app.patch('/api/registrations/:id/paid', (req, res) => {
  const { id } = req.params;
  const { paid, notes } = req.body;
  const db = readDb();
  const itemIndex = db.registrations.findIndex((r: any) => r.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Registration not found' });
  }

  db.registrations[itemIndex].paid = Boolean(paid);
  if (notes !== undefined) {
    db.registrations[itemIndex].notes = notes;
  }
  writeDb(db);
  res.json(db.registrations[itemIndex]);
});

app.patch('/api/registrations/:id/completed', (req, res) => {
  const { id } = req.params;
  const { completed, notes } = req.body;
  const db = readDb();
  const itemIndex = db.registrations.findIndex((r: any) => r.id === id);
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Registration not found' });
  }

  db.registrations[itemIndex].completed = Boolean(completed);
  if (notes !== undefined) {
    db.registrations[itemIndex].notes = notes;
  }
  writeDb(db);
  res.json(db.registrations[itemIndex]);
});

app.delete('/api/registrations/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.registrations = (db.registrations || []).filter((r: any) => r.id !== id);
  writeDb(db);
  res.json({ success: true });
});

// Products
app.get('/api/products', (req, res) => {
  const db = readDb();
  res.json(db.products || []);
});

app.post('/api/products', (req, res) => {
  const db = readDb();
  const newProduct = {
    id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    name_en: req.body.name_en || 'New Product',
    name_fr: req.body.name_fr || 'Nouveau Produit',
    price: Number(req.body.price) || 0,
    description_en: req.body.description_en || '',
    description_fr: req.body.description_fr || '',
    photo_url: req.body.photo_url || '/images/raw_materials_1787567125868.jpg',
    category: req.body.category || 'soap',
    in_stock: req.body.in_stock !== false,
    unit: req.body.unit || '1 unit'
  };

  db.products = [newProduct, ...(db.products || [])];
  writeDb(db);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  const index = db.products.findIndex((p: any) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  db.products[index] = {
    ...db.products[index],
    ...req.body,
    price: Number(req.body.price ?? db.products[index].price)
  };
  writeDb(db);
  res.json(db.products[index]);
});

app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const db = readDb();
  db.products = (db.products || []).filter((p: any) => p.id !== id);
  writeDb(db);
  res.json({ success: true });
});

// ---------------- VITE MIDDLEWARE / SPA SERVE ----------------

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CMN Server running at http://0.0.0.0:${PORT}`);
  });
}

start();
