import { TrainingProgram, TrainingAnnouncement, SiteSettings } from '../types';

export const TRAINING_PROGRAMS: TrainingProgram[] = [
  {
    id: 'soap',
    name_en: 'Artisanal & Commercial Soap Production',
    name_fr: 'Production de Savon Artisanal et Commercial',
    tagline_en: 'Master cold-process, hot-process, laundry & antiseptic medicated soap manufacturing',
    tagline_fr: 'Maîtrisez la fabrication de savon à froid, à chaud, de ménage et antiseptique médicamenteux',
    description_en: 'Complete hands-on training covering formulation chemistry, safe lye handling, saponification calculations, essential oils, and packaging for direct commercial sale.',
    description_fr: 'Formation pratique complète couvrant la chimie des formulations, la manipulation sécurisée de la soude, les calculs de saponification, les huiles essentielles et l’emballage commercial.',
    image: '/images/soap_production_1787567070599.jpg',
    total_steps: 7,
    highlights_en: [
      'Laundry soap bars, transparent toilet soap & liquid soap',
      'Safe caustic soda measurement & precise chemical safety',
      'Direct access to raw materials (soda, oils, molds, colorants)',
      'High-profit production cost breakdown and pricing guide'
    ],
    highlights_fr: [
      'Savon de ménage, savon de toilette transparent & savon liquide',
      'Dosage précis de la soude caustique et sécurité chimique',
      'Accès direct aux matières premières (soude, huiles, moules, colorants)',
      'Étude de rentabilité détaillée et guide de tarification'
    ],
    steps: [
      {
        step: 1,
        title_en: '1. Ingredients Selection',
        title_fr: '1. Sélection des Ingrédients',
        description_en: 'Selecting superior quality base oils (palm kernel oil, coconut oil, shea butter), sodium hydroxide (caustic soda), distilled water, fragrances, and skin-safe colorants.',
        description_fr: 'Sélection des huiles végétales de qualité supérieure (huile de palmiste, coco, karité), de l’hydroxyde de sodium (soude caustique), eau déminéralisée, parfums et colorants certifiés.'
      },
      {
        step: 2,
        title_en: '2. Precision Measuring & Lye Preparation',
        title_fr: '2. Mesure de Précision et Préparation de la Lessive',
        description_en: 'Exact gram-level weighing using digital scales, calculating lye-to-water ratios, and safely dissolving caustic soda while controlling exothermic heat and safety PPE.',
        description_fr: 'Pesée exacte au gramme près, calcul des ratios eau-soude et dissolution sécurisée de la soude avec gestion de la chaleur exothermique et port des EPI.'
      },
      {
        step: 3,
        title_en: '3. Mixing & Emulsification (Trace Stage)',
        title_fr: '3. Mélange et Émulsification (Phase de Trace)',
        description_en: 'Blends oils and lye solution at optimal reaction temperature, mechanical blending until achieving stable light/medium trace, incorporating active additives.',
        description_fr: 'Mélange des huiles et de la solution de soude à température idéale, émulsion mécanique jusqu’à la trace stable, ajout des principes actifs et parfums.'
      },
      {
        step: 4,
        title_en: '4. Pouring into Professional Molds',
        title_fr: '4. Coulage dans les Moules Professionnels',
        description_en: 'Pouring the smooth soap batter into silicone or wooden log molds, tapping to remove air bubbles, and thermal insulating for saponification completion.',
        description_fr: 'Coulage de la pâte homogène dans les moules en bois ou silicone, tapotage pour chasser les bulles d’air et mise en isolation thermique pour la saponification.'
      },
      {
        step: 5,
        title_en: '5. Demolding & Precision Cutting',
        title_fr: '5. Démoulage et Découpe de Précision',
        description_en: 'Unmolding solid soap blocks after 24–48 hours, wire or blade cutting into standardized commercial weights (150g, 200g, 250g).',
        description_fr: 'Démoulage des blocs après 24 à 48 heures, découpe nette au fil d’acier ou lame aux formats commerciaux standardisés (150g, 200g, 250g).'
      },
      {
        step: 6,
        title_en: '6. Stamping & Initial Drying',
        title_fr: '6. Estampillage & Séchage Initial',
        description_en: 'Embossing the CMN quality stamp and brand logo, arranging bars on ventilated wooden curing racks with optimal airflow.',
        description_fr: 'Marquage avec le logo et tampon de qualité CMN, disposition espacée sur claies de séchage aérées.'
      },
      {
        step: 7,
        title_en: '7. Curing & Quality Maturation',
        title_fr: '7. Cure et Maturation de Qualité',
        description_en: 'Allowing 3 to 4 weeks of cold cure to achieve mild pH, maximum bar hardness, long-lasting lather, followed by airtight moisture-resistant packaging.',
        description_fr: 'Cure de 3 à 4 semaines pour parfaire le pH neutre, garantir la dureté du savon et une mousse onctueuse, puis emballage protecteur.'
      }
    ]
  },
  {
    id: 'chocolate',
    name_en: 'Bean-to-Bar Artisanal Chocolate Production',
    name_fr: 'Production de Chocolat Artisanal (De la Fève à la Tablette)',
    tagline_en: 'Transform premium Cameroonian cocoa into rich dark chocolate, milk chocolate & gourmet spreads',
    tagline_fr: 'Transformez le cacao camerounais d’exception en chocolat noir raffiné, au lait et pâtes à tartiner',
    description_en: 'Learn the complete post-harvest and chocolate making chemistry: fermentation control, roasting profiles, winnowing, conching, tempering, and luxury bar molding.',
    description_fr: 'Apprenez la chaîne complète de transformation du cacao : fermentation, profils de torréfaction, concassage-vannage, conchage, tempérage et moulage de luxe.',
    image: '/images/chocolate_craft_1787567084584.jpg',
    total_steps: 7,
    highlights_en: [
      'Premium Cameroonian cocoa bean processing',
      'Artisanal conching & micro-refining techniques',
      'Tempering formulas for glossy finish & snap',
      'Recipe formulations: 70% Dark, Milk, White & Hazelnut'
    ],
    highlights_fr: [
      'Valorisation du cacao d’excellence camerounais',
      'Techniques de conchage et micro-raffinage artisanal',
      'Courbes de tempérage pour une brillance et un croquant parfaits',
      'Formulations de recettes : Noir 70%, Lait, Blanc et Praliné'
    ],
    steps: [
      {
        step: 1,
        title_en: '1. Harvesting & Pod Selection',
        title_fr: '1. Récolte et Sélection des Cabosses',
        description_en: 'Selecting fully ripe healthy cocoa pods, hygienic pod cracking without damaging fresh beans, and sorting beans by grade.',
        description_fr: 'Sélection rigoureuse des cabosses à maturité optimale, écabossage soigné sans endommager les fèves et tri par calibre.'
      },
      {
        step: 2,
        title_en: '2. Controlled Fermentation',
        title_fr: '2. Fermentation Contrôlée',
        description_en: 'Wooden box fermentation for 5–7 days with precise turning schedule to develop rich chocolate precursor flavor compounds and reduce astringency.',
        description_fr: 'Fermentation en caisses de bois pendant 5 à 7 jours avec brassages réguliers pour développer les précurseurs d’arômes et atténuer l’amertume.'
      },
      {
        step: 3,
        title_en: '3. Sun Drying & Moisture Testing',
        title_fr: '3. Séchage Solaire et Contrôle d’Humidité',
        description_en: 'Even solar drying on raised wooden beds until beans reach standard 7% moisture level, preventing mold and preserving aromatics.',
        description_fr: 'Séchage solaire homogène sur claies surélevées jusqu’à atteindre un taux d’humidité idéal de 7%, sans moisissures.'
      },
      {
        step: 4,
        title_en: '4. Precision Roasting',
        title_fr: '4. Torréfaction de Précision',
        description_en: 'Calibrated thermal roasting to sterilize beans, loosen the husk, caramelize sugars, and unlock complex deep cocoa aromas.',
        description_fr: 'Torréfaction thermique contrôlée pour stériliser, décoller la coque, caraméliser les sucres et libérer les arômes profonds.'
      },
      {
        step: 5,
        title_en: '5. Cracking & Air Winnowing',
        title_fr: '5. Concassage et Vannage Pneumatique',
        description_en: 'Cracking roasted beans into nibs and utilizing airflow separation to separate 100% of fibrous husks from pure cocoa nibs.',
        description_fr: 'Concassage des fèves torréfiées en grué et séparation par flux d’air pour éliminer totalement la coque non digestible.'
      },
      {
        step: 6,
        title_en: '6. Conching & Stone Refining',
        title_fr: '6. Conchage et Broyage à la Meule',
        description_en: 'Stone grinding nibs with pure cocoa butter and unrefined sugar for 24+ hours down to silky 20-micron smoothness, aerating off volatile acids.',
        description_fr: 'Broyage fin à la meule de pierre avec beurre de cacao et sucre pendant 24h+ jusqu’à une texture soyeuse de 20 microns.'
      },
      {
        step: 7,
        title_en: '7. Tempering, Molding & Packaging',
        title_fr: '7. Tempérage, Moulage et Conditionnement',
        description_en: 'Thermal crystallization (tempering) for shiny sheen and crisp snap, pouring into bar molds, cooling, and vacuum gold foil wrapping.',
        description_fr: 'Courbe de cristallisation (tempérage) pour un éclat brillant et un son sec à la cassure, coulage en moules et emballage aluminium or sous étui.'
      }
    ]
  },
  {
    id: 'ovaltine',
    name_en: 'Artisanal Ovaltine & Malted Chocolate Powder',
    name_fr: 'Fabrication d’Ovaltine & Poudre Chocolatée Maltée',
    tagline_en: 'Formulate nutritious, vitamin-enriched soluble malted breakfast drink powders',
    tagline_fr: 'Formulez des poudres de boisson maltée chocolatée petit-déjeuner enrichies et solubles',
    description_en: 'Master the formulation of soluble breakfast malt drinks: barley/grain malting, natural cocoa blending, vitamin fortification, moisture vacuum processing, and airtight canister packaging.',
    description_fr: 'Maîtrisez la formulation de boissons maltées solubles : maltage de céréales, mélange au cacao naturel, enrichissement vitaminé et conditionnement hermétique.',
    image: '/images/ovaltine_malt_1787567096754.jpg',
    total_steps: 5,
    highlights_en: [
      'Natural malt extract preparation & enzymatic activation',
      'High-solubility grain & cocoa blending ratios',
      'Fortification with essential vitamins and calcium',
      'Anti-caking drying secrets for long shelf-life in humid climates'
    ],
    highlights_fr: [
      'Préparation d’extrait de malt naturel et activation enzymatique',
      'Dosages optimisés pour une solubilité instantanée dans l’eau/lait',
      'Enrichissement en vitamines essentielles, fer et calcium',
      'Secrets de séchage anti-mottant adaptés au climat tropical'
    ],
    steps: [
      {
        step: 1,
        title_en: '1. Selecting & Preparing Ingredients',
        title_fr: '1. Sélection et Préparation des Ingrédients',
        description_en: 'Sourcing malted grains, alkalized natural cocoa powder, whey/milk powders, minerals, and natural sweetening complexes.',
        description_fr: 'Approvisionnement en céréales maltées, poudre de cacao pur, dérivés laitiers, minéraux et édulcorants naturels.'
      },
      {
        step: 2,
        title_en: '2. Micro-Mixing & Homogeneous Blending',
        title_fr: '2. Micro-Mélange et Homogénéisation',
        description_en: 'Dry batch blending in food-grade ribbon mixers to distribute micronutrients evenly throughout the cocoa and malt matrix.',
        description_fr: 'Mélange à sec en mélangeur ruban alimentaire pour disperser parfaitement les micronutriments dans la matrice cacao-malt.'
      },
      {
        step: 3,
        title_en: '3. Cooking, Wet Granulation & Stabilising',
        title_fr: '3. Cuisson, Granulation Humide et Stabilisation',
        description_en: 'Controlled thermal stabilization of starches and moisture binding to create uniform micro-granules with instant solubility.',
        description_fr: 'Stabilisation thermique contrôlée des amidons et agglomération en micro-granulés assurant une dissolution instantanée.'
      },
      {
        step: 4,
        title_en: '4. Low-Temperature Drying & Fine Processing',
        title_fr: '4. Séchage Basse Température et Tamisage Fin',
        description_en: 'Dehydrating under strictly monitored heat to preserve heat-sensitive vitamins, followed by precision mesh classification.',
        description_fr: 'Déshydratation à température maîtrisée pour préserver les vitamines, suivie d’un tamisage fin calibré.'
      },
      {
        step: 5,
        title_en: '5. Packing, Storage & Preservation',
        title_fr: '5. Conditionnement, Stockage et Conservation',
        description_en: 'Sealing in moisture-barrier pouches and aluminum foil-lined containers with food-grade desiccant security for 18-month shelf stability.',
        description_fr: 'Scellage sous sachets barrière d’humidité et boîtes doublées alu garantissant une conservation optimale de 18 mois.'
      }
    ]
  },
  {
    id: 'spaghetti',
    name_en: 'Artisanal Spaghetti & Pasta Production',
    name_fr: 'Production de Spaghetti & Pâtes Alimentaires Artisanales',
    tagline_en: 'Produce firm, golden durum semolina spaghetti, noodles & macaroni with industrial texture',
    tagline_fr: 'Produisez des spaghettis, nouilles et macaronis dorés en semoule de blé dur de qualité industrielle',
    description_en: 'Learn commercial pasta processing: 100% durum semolina hydration, vacuum extrusion through brass dies, slow low-temperature static drying, and moisture-proof packaging.',
    description_fr: 'Apprenez la production de pâtes alimentaires : hydratation de la semoule, extrusion sous vide à travers filières bronze, séchage statique et ensachage protecteur.',
    image: '/images/spaghetti_making_1787567110671.jpg',
    total_steps: 6,
    highlights_en: [
      'Durum semolina & fortification flour blends',
      'Extrusion machine operation, die maintenance & noodle cutting',
      'Static chamber low-temperature drying protocols',
      'Packaging standards for retail supermarkets and markets'
    ],
    highlights_fr: [
      'Mélanges semoule de blé dur et farines enrichies',
      'Utilisation des extrudeuses, filières bronze et coupe-pâtes',
      'Protocoles de séchage en chambre à basse température',
      'Conditionnement aux normes pour supermarchés et grossistes'
    ],
    steps: [
      {
        step: 1,
        title_en: '1. Selecting & Preparing Ingredients',
        title_fr: '1. Sélection et Préparation des Ingrédients',
        description_en: 'Selecting premium coarse durum wheat semolina, purified mineral water, and optional egg/vegetable color enhancements.',
        description_fr: 'Sélection de semoule de blé dur de premier choix, eau purifiée et enrichissements éventuels (œufs, légumes).'
      },
      {
        step: 2,
        title_en: '2. Hydration, Mixing & Kneading',
        title_fr: '2. Hydratation, Mélange et Pétrissage',
        description_en: 'Controlled 30% hydration and high-torque mechanical kneading to develop a resilient gluten network without overheating.',
        description_fr: 'Hydratation précise à 30% et pétrissage mécanique intensif pour développer un réseau glutineux élastique sans chauffer la pâte.'
      },
      {
        step: 3,
        title_en: '3. Vacuum Extrusion, Shaping & Cutting',
        title_fr: '3. Extrusion sous Vide, Façonnage et Coupe',
        description_en: 'Pushing dough through bronze dies for porous sauce-holding texture, cutting to exact 25cm spaghetti length or pasta shapes.',
        description_fr: 'Passage sous vide dans filières en bronze pour un rendu rugueux qui accroche la sauce, et découpe au format 25 cm standard.'
      },
      {
        step: 4,
        title_en: '4. Controlled Drying & Processing Cycles',
        title_fr: '4. Cycles de Séchage et Traitement Contrôlé',
        description_en: 'Slow multi-phase pre-drying and final static drying (45°C - 55°C) to prevent cracking, bend breakage, or moisture retention.',
        description_fr: 'Pré-séchage et séchage statique progressif (45°C - 55°C) pour éviter les fissures et garantir la tenue "al dente".'
      },
      {
        step: 5,
        title_en: '5. Weight Calibration & Packing',
        title_fr: '5. Calibrage du Poids et Ensachage',
        description_en: 'Batch weighing into 250g, 500g, and 1kg bundles, feeding into branded BOPP printed pouches with thermal heat sealing.',
        description_fr: 'Pesage précis en paquets de 250g, 500g et 1kg, et scellage thermique dans des sachets imprimés hermétiques.'
      },
      {
        step: 6,
        title_en: '6. Storage & Moisture-Proof Preservation',
        title_fr: '6. Stockage et Conservation Anti-Humidité',
        description_en: 'Palletizing in dry, rodent-proof, climate-controlled warehousing with minimum 24-month ambient shelf life.',
        description_fr: 'Entreposage sur palettes dans un local sec et ventilé garantissant une durée de vie minimale de 24 mois.'
      }
    ]
  }
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-soap-01',
    name_en: 'CMN Superior Laundry & Multipurpose Soap (Pack of 5)',
    name_fr: 'Savon de Ménage & Polyvalent Supérieur CMN (Lot de 5)',
    price: 2500,
    description_en: 'High-foaming, durable, premium cold-process laundry soap bars made with refined palm kernel oil. Highly effective on stubborn stains, gentle on hands.',
    description_fr: 'Pain de savon de ménage saponifié à froid, riche en mousse, très résistant. Élimine les taches tenaces tout en restant doux pour la peau.',
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
    description_en: 'Formulated with pure shea butter, neem, turmeric, and tea tree extracts. Clarifies blemishes, fights body odor, and deeply moisturizes.',
    description_fr: 'Formulé au pur beurre de karité, neem, curcuma et extrait d’arbre à thé. Purifie le teint, combat les imperfections et hydrate intensément.',
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
    description_en: 'Laboratory grade high-purity caustic soda flakes for soap manufacturing. Guaranteed 99% purity for reliable saponification and zero free lye.',
    description_fr: 'Soude caustique en écailles de qualité industrielle supérieure 99% de pureté. Idéale pour une saponification parfaite sans résidu caustique.',
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
    description_en: 'High lauric acid content oil essential for intense foaming, rock-hard soap bars, and rapid trace formation in commercial soap production.',
    description_fr: 'Huile riche en acide laurique indispensable pour obtenir un savon dur, résistant à l’eau et doté d’un pouvoir moussant exceptionnel.',
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
    description_en: 'Aromatic food and cosmetic grade 100% natural cocoa butter extracted from select Cameroonian cocoa beans. Perfect for chocolate & skincare.',
    description_fr: 'Beurre de cacao 100% naturel pressé à partir de fèves camerounaises sélectionnées. Grade alimentaire et cosmétique haut de gamme.',
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
    description_en: 'Concentrated cosmetic fragrances resistant to high lye pH. Gives your soaps a long-lasting, luxury commercial fragrance.',
    description_fr: 'Parfums cosmétiques concentrés résistant au pH de la soude. Procure une fragrance durable et luxueuse à vos créations.',
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
    description_en: 'Heavy-duty 1.5kg capacity soap mold with food-grade silicone insert and stainless steel adjustable wire soap cutter for clean, even bars.',
    description_fr: 'Moule professionnel 1,5 kg avec insert silicone alimentaire et coupeur réglable en fil inox pour des découpes nettes et uniformes.',
    photo_url: '/images/soap_production_1787567070599.jpg',
    category: 'equipment',
    in_stock: true,
    unit: 'Complete Set'
  }
];

export const INITIAL_ANNOUNCEMENT: TrainingAnnouncement = {
  id: 'announcement-1',
  period_text_en: 'Next Session: September 15 – 20, 2026 (Morning & Evening Sessions Available)',
  period_text_fr: 'Prochaine Session : 15 – 20 Septembre 2026 (Groupes du matin et du soir disponibles)',
  location_en: 'Yaoundé, Cameroon (Main Training Workshop - Biyem-Assi)',
  location_fr: 'Yaoundé, Cameroun (Atelier Principal - Biyem-Assi)',
  active: true,
  created_at: new Date().toISOString()
};

export const INITIAL_SETTINGS: SiteSettings = {
  id: 'settings-1',
  whatsapp_community_link: 'https://chat.whatsapp.com/CMNTrainingCommunityYaounde2026',
  whatsapp_admin_phone: '237654785642',
  company_name: 'CMN Superior Quality Training',
  email: 'contact@cmntraining.cm',
  address_en: 'Biyem-Assi / Acacia, Yaoundé, Cameroon (Travels to Douala, Bafoussam, Bertoua on schedule)',
  address_fr: 'Biyem-Assi / Acacia, Yaoundé, Cameroun (Déplacements réguliers à Douala, Bafoussam, Bertoua)',
  updated_at: new Date().toISOString()
};
