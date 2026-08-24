import { Language } from './types';

export const translations = {
  en: {
    brand: {
      name: 'CMN Superior Quality Training',
      tagline: 'Practical Vocational Excellence & Production Mastery',
      location_badge: 'Yaoundé, Cameroon • Regional Workshops Available'
    },
    nav: {
      home: 'Home',
      trainings: 'Trainings',
      products: 'Products & Raw Materials',
      about: 'About & Contact',
      join_community: 'Join WhatsApp Community',
      admin: 'Admin Portal',
      language: 'Language',
      switch_fr: 'Français',
      switch_en: 'English'
    },
    hero: {
      badge: 'Transforming Knowledge into Profitable Businesses',
      title_start: 'Learn to Produce',
      title_accent: 'Soap, Chocolate, Ovaltine & Spaghetti',
      title_end: 'with Complete Hands-On Mastery',
      subtitle: 'Based in Yaoundé, CMN provides intensive hands-on practical training for aspiring manufacturers and entrepreneurs across Cameroon (Yaoundé, Bamenda, Douala, Bafoussam, Bertoua, etc.). Unlike standard theoretical courses, we supply the exact raw materials, formulation secrets, and equipment access to launch your profitable enterprise right away.',
      usp_title: 'The CMN Difference:',
      usp_desc: 'We don’t just teach theory — WE SUPPLY THE BUSINESS AND RAW MATERIALS to get you started immediately!',
      cta_trainings: 'Explore 4 Production Trainings',
      cta_products: 'Buy Soaps & Raw Materials',
      cta_whatsapp: 'Message Admin on WhatsApp',
      cta_call: 'Call Us Now'
    },
    stats: {
      graduates: '500+ Entrepreneurs Trained',
      success_rate: '100% Practical & Tested Formulations',
      cities: 'Nationwide: Yaoundé, Bamenda, Douala, Bafoussam & More',
      supplies: 'Direct Raw Material Supply Chain'
    },
    pillars: {
      title: 'Our 4 Flagship Hands-On Production Modules',
      subtitle: 'Complete A-to-Z production techniques from raw ingredients to commercial packaging.',
      soap: {
        title: 'Artisanal & Laundry Soap',
        desc: 'Learn solid laundry bars, medicated herbal soaps, liquid detergents, and precision cold-process saponification.'
      },
      chocolate: {
        title: 'Bean-to-Bar Chocolate',
        desc: 'Fermenting, roasting, stone conching, tempering, and molding luxury dark & milk chocolate from Cameroonian cocoa.'
      },
      ovaltine: {
        title: 'Ovaltine & Malted Drinks',
        desc: 'Formulate soluble, vitamin-fortified malt and cocoa breakfast powder drinks with long ambient shelf stability.'
      },
      spaghetti: {
        title: 'Spaghetti & Pasta Making',
        desc: 'Master semolina hydration, vacuum extrusion through bronze dies, low-temperature static drying, and retail bagging.'
      },
      materials: {
        title: 'Raw Materials & Starter Kits',
        desc: 'Direct wholesale access to caustic soda, palm kernel oil, molds, cutters, fragrances, and packaging.'
      },
      view_process: 'View Step-by-Step Process'
    },
    usp_section: {
      title: 'Why Choose CMN Superior Quality Training?',
      subtitle: 'Most training centers give you a notebook and send you home to struggle. Here is how CMN empowers you for real-world commercial success:',
      points: [
        {
          title: 'Direct Raw Material Supply Chain',
          desc: 'Never worry about where to find high-grade caustic soda, pure palm kernel oil, cocoa butter, or molds. We supply all the raw materials our trainees need to start producing from day one.'
        },
        {
          title: '100% Physical Hands-On Batches',
          desc: 'You measure, mix, pour, cut, stamp, conch, and extrude yourself. Every student leaves having personally produced real, commercial-grade finished products.'
        },
        {
          title: 'Direct Business & Costing Breakdown',
          desc: 'We calculate the exact unit cost of production in XAF, markup margins, distribution channels in Cameroonian markets, and packaging standards.'
        },
        {
          title: 'Nationwide Reach & Demand-Driven Workshops',
          desc: 'Headquartered in Yaoundé, we regularly conduct workshops across Cameroon including Bamenda, Douala, Bafoussam, Bertoua, and beyond. New regional training sessions are scheduled directly in response to student registration demand in your area.'
        }
      ]
    },
    trainings_page: {
      title: 'Practical Hands-On Production Trainings',
      subtitle: 'Master the craft of commercial manufacturing in our comprehensive workshops. Available across Cameroon (Yaoundé, Bamenda, Douala, Bafoussam, etc.) with new cohorts opening wherever student registrations demand.',
      pricing_title: 'Transparent Pricing Structure',
      reg_fee_label: 'Registration Fee',
      reg_fee_amount: '2,100 XAF',
      reg_fee_desc: 'Covers workshop logistics, safety wear, formulation booklet & Certificate of Completion.',
      training_fee_label: 'Full Practical Training Fee',
      training_fee_amount: '30,000 XAF',
      training_fee_desc: 'Covers all production ingredients, intensive coaching, hands-on batch practice & lifetime formulation support.',
      negotiable_note: 'Note: Training fee is negotiable with special group discounts available for teams, associations, or multi-module enrollment.',
      upcoming_session_title: 'Upcoming Training Schedule & Location',
      upcoming_badge: 'Confirmed Session',
      location_label: 'Location:',
      period_label: 'Period / Dates:',
      custom_dates_note: 'Cannot make these dates or in another city? We organize sessions across Yaoundé, Bamenda, Douala, Bafoussam, and other towns based on registrations. Specify your preferred month and city below!',
      process_steps_title: 'Comprehensive Step-by-Step Production Process',
      process_steps_subtitle: 'Click any module below to inspect the exact industrial & artisanal steps you will master during the workshop.',
      steps_count: 'Steps',
      module_highlights: 'Key Workshop Highlights:'
    },
    registration: {
      title: 'Register for Next Training Session',
      subtitle: 'Fill out this quick form. Clicking "Contact Admin" will save your spot and directly open a pre-filled WhatsApp message to our lead instructor to finalize your enrollment.',
      name_label: 'Full Name *',
      name_placeholder: 'e.g. Marie Claire Kemgne',
      phone_label: 'WhatsApp Phone Number *',
      phone_placeholder: 'e.g. 675123456 or +237 654 78 56 42',
      location_label: 'Your Current City / Region *',
      location_placeholder: 'e.g. Yaoundé (Biyem-Assi), Douala (Akwa), Bafoussam, etc.',
      about_label: 'Short About You & Goals',
      about_placeholder: 'Tell us briefly about your background and what you want to achieve with this training (e.g. starting a soap business, learning for home use, adding products to existing shop)...',
      training_interest_label: 'Training Programs of Interest',
      training_interest_options: {
        all: 'All 4 Modules (Soap, Chocolate, Ovaltine, Spaghetti)',
        soap: 'Soap Production Only',
        chocolate: 'Chocolate Production Only',
        ovaltine: 'Ovaltine Production Only',
        spaghetti: 'Spaghetti Production Only',
        soap_and_chocolate: 'Soap + Chocolate',
        custom: 'Custom Combination'
      },
      preferred_month_label: 'Preferred Training Month / Timeframe',
      preferred_month_placeholder: 'e.g. Next upcoming session, or October 2026, or Weekend only',
      preferred_location_label: 'Preferred Training City / Location (if different from posted)',
      preferred_location_placeholder: 'e.g. Douala, Bafoussam, Yaoundé, Bertoua...',
      submit_button: 'Contact Admin & Finalize on WhatsApp',
      submitting: 'Saving registration...',
      success_message: 'Registration captured! Opening WhatsApp to connect with the Admin...',
      privacy_note: 'No online payment required now. All payments (2,100 XAF registration) are arranged safely via MoMo/OM or cash directly with Admin.',
      help_text: 'We travel to other cities once enough people register in your area.'
    },
    products_page: {
      title: 'Finished Soaps & Production Raw Materials',
      subtitle: 'Order premium handcrafted soaps or supply your manufacturing workshop with certified high-purity raw materials and molds.',
      categories: {
        all: 'All Items',
        soap: 'Finished Soaps',
        raw_material: 'Soap Raw Materials',
        food_ingredients: 'Food & Chocolate Ingredients',
        equipment: 'Equipment & Molds'
      },
      in_stock: 'In Stock',
      out_of_stock: 'Order on Request',
      order_btn: 'Order via WhatsApp',
      price_currency: 'XAF',
      direct_supply_banner: {
        title: 'Need Bulk Wholesale Quantities or Special Ingredients?',
        desc: 'We supply aspiring soapmakers and past students with bulk caustic soda, 25L/200L palm kernel oil, custom molds, and concentrated fragrances at wholesale rates in Yaoundé and nationwide dispatch.',
        btn: 'Inquire for Bulk Order'
      }
    },
    about_page: {
      title: 'About CMN Superior Quality Training',
      subtitle: 'Empowering Cameroonian and African entrepreneurs through practical skills and sustainable supply chains.',
      story_title: 'Our Story & Philosophy',
      story_p1: 'CMN Superior Quality Training was founded in Yaoundé, Cameroon, with a clear mission: to eradicate the gap between theoretical vocational certificates and real, profitable manufacturing businesses.',
      story_p2: 'Too often, trainees attend seminars only to find themselves stranded without raw materials, proper equipment, or accurate unit formulations. CMN solves this completely by serving as both your practical master instructor and your reliable local supplier.',
      travel_title: 'Regional Travel Across Cameroon',
      travel_desc: 'Headquartered in Yaoundé, CMN regularly organizes intensive regional training caravans in Douala, Bafoussam, Bertoua, and beyond as soon as regional cohorts form. If you have a group of friends, church group, or community association, we bring the workshop to your doorstep!',
      contact_card_title: 'Contact Information',
      phone_label: 'WhatsApp / Call:',
      email_label: 'Email Address:',
      address_label: 'Headquarters:',
      hours_label: 'Operating Hours:',
      hours_value: 'Monday – Saturday: 8:00 AM – 6:00 PM',
      community_card_title: 'Join Our Official WhatsApp Community',
      community_card_desc: 'Connect with over 500+ past trainees, ask formulation questions, share your production photos, and get first access to upcoming session dates.',
      join_now: 'Join WhatsApp Group Now',
      faq_title: 'Frequently Asked Questions',
      faqs: [
        {
          q: 'How much does the training cost and what is included?',
          a: 'Registration is 2,100 XAF (covers booklet, safety gear & certificate). The full practical training fee is 30,000 XAF (negotiable, with special group discounts). All raw materials for hands-on practice are provided.'
        },
        {
          q: 'Do I need prior chemistry or manufacturing experience?',
          a: 'None whatsoever! We teach in simple, step-by-step language in both English and French, with practical hands-on demonstrations.'
        },
        {
          q: 'Where will I get raw materials after the training is over?',
          a: 'Right here from CMN! We stock caustic soda, palm kernel oil, fragrances, essential oils, and molds at student wholesale prices with delivery across Cameroon.'
        },
        {
          q: 'Can CMN come to my city (Douala, Bafoussam, etc.)?',
          a: 'Yes! Once we reach a minimum threshold of registrants in a given town, we schedule and announce a local training session.'
        }
      ]
    },
    community_banner: {
      title: 'Join the CMN Production WhatsApp Community',
      desc: 'Get live announcements, formulation updates, raw material arrivals, and direct mentorship from our master trainers.',
      btn: 'Join Community on WhatsApp'
    },
    admin: {
      title: 'CMN Administrative Portal',
      subtitle: 'Manage student registrations, upcoming sessions, product catalog, and WhatsApp settings.',
      login_title: 'Admin Access Login',
      login_subtitle: 'Enter your administrative password to access the control center.',
      password_label: 'Master Password',
      password_placeholder: 'Enter admin password',
      login_btn: 'Unlock Admin Panel',
      logout: 'Log Out',
      invalid_password: 'Password incorrect. Please verify and try again.',
      tabs: {
        registrations: 'Registrations',
        announcements: 'Session Announcements',
        products: 'Products & Materials',
        settings: 'Site Settings',
        security: 'Security',
        guide: 'Admin Guide & Help'
      },
      stats: {
        total_registrations: 'Total Registrations',
        paid_registrations: 'Confirmed Paid',
        completed_registrations: 'Training Completed',
        pending_payment: 'Pending Payment',
        total_products: 'Catalog Products',
        location_adjustments: 'Adjustment Requests'
      },
      reg_table: {
        title: 'Student Registrations Table',
        search_placeholder: 'Search by name, phone, town...',
        filter_all: 'All Registrations',
        filter_paid: 'Paid Only',
        filter_unpaid: 'Pending Payment Only',
        filter_completed: 'Completed Only',
        filter_adjustments: 'Adjustment Requests Only',
        th_date: 'Date',
        th_name: 'Name',
        th_phone: 'Phone / WhatsApp',
        th_location: 'Location',
        th_interest: 'Training Interest',
        th_month: 'Preferred Month',
        th_pref_loc: 'Preferred Location',
        th_about: 'About Student',
        th_status: 'Payment Status',
        th_completed: 'Training Status',
        th_actions: 'Actions',
        paid_label: 'Paid (2,100 XAF)',
        unpaid_label: 'Unpaid',
        completed_label: 'Completed',
        in_progress_label: 'In Training',
        click_to_chat: 'Chat on WhatsApp',
        edit_btn: 'Edit',
        edit_modal_title: 'Edit Trainee Registration',
        edit_modal_subtitle: 'Correct trainee information, update location, change phone number, or adjust notes.',
        edit_saved_success: 'Registrant information updated successfully!',
        delete_btn: 'Delete',
        delete_confirm: 'Are you sure you want to remove this registration?',
        delete_modal_title: 'Confirm Permanent Deletion',
        delete_modal_prompt: 'Are you sure you want to permanently delete the registration record for',
        delete_modal_warning: 'This action will immediately remove the trainee from your database and cannot be undone.',
        delete_modal_confirm_btn: 'Yes, Delete Permanently',
        cancel_btn: 'Cancel',
        save_btn: 'Save Changes',
        adjustment_badge: 'Adjustment Requested',
        no_registrations: 'No registrations found matching your criteria.'
      },
      announcement_form: {
        title: 'Upcoming Training Schedule Banner',
        desc: 'This announcement is displayed prominently on the public Trainings and Home pages.',
        period_en: 'Session Period / Dates (English)',
        period_fr: 'Session Period / Dates (French)',
        location_en: 'Session Location / Venue (English)',
        location_fr: 'Session Location / Venue (French)',
        active_label: 'Display this announcement actively on the public website',
        save_btn: 'Save Announcement',
        saved_success: 'Upcoming announcement updated successfully!'
      },
      products_manager: {
        title: 'Products & Raw Materials Catalog Manager',
        subtitle: 'Add, edit, or remove finished soaps, raw materials, food ingredients, and molds.',
        add_new: 'Add New Product / Material',
        name_en: 'Item Name (English)',
        name_fr: 'Item Name (French)',
        price: 'Price in XAF',
        category: 'Category',
        unit: 'Unit / Packaging (e.g. 1kg, 5L, Pack of 5)',
        photo_url: 'Photo URL or Preset',
        preset_label: 'Select Built-in Photo Preset:',
        desc_en: 'Description (English)',
        desc_fr: 'Description (French)',
        in_stock_label: 'In Stock and Available for Order',
        save: 'Save Product',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        delete_confirm: 'Are you sure you want to delete this product from the catalog?'
      },
      settings_form: {
        title: 'Live Site Configuration',
        subtitle: 'Update your official WhatsApp links and company contact details.',
        community_link_label: 'WhatsApp Community Group Link (chat.whatsapp.com/...)',
        community_link_help: 'Changes the "Join Community" button across all public pages instantly.',
        admin_phone_label: 'Admin WhatsApp Phone Number (with 237 country code)',
        admin_phone_help: 'Used for all direct WhatsApp order and registration links (e.g. 237654785642).',
        company_name_label: 'Company Official Name',
        email_label: 'Official Email',
        address_en_label: 'Physical Address / Headquarters (English)',
        address_fr_label: 'Physical Address / Headquarters (French)',
        save_btn: 'Save Site Settings',
        saved_success: 'Site settings updated successfully!'
      },
      change_password: {
        title: 'Change Admin Master Password',
        subtitle: 'Update your private password used to access this admin portal.',
        new_password_label: 'New Master Password',
        confirm_password_label: 'Confirm New Password',
        change_btn: 'Update Password',
        password_mismatch: 'Passwords do not match!',
        password_updated: 'Master password updated successfully!'
      },
      admin_guide: {
        title: 'CMN Admin Portal Manual & Help Guide',
        subtitle: 'Plain-language instructions for managing registrations, products, announcements, and site settings.',
        badge: 'Admin Reference Guide',
        sections: {
          login: {
            title: '1. Logging In & Session Security',
            desc: 'Access the admin dashboard anytime by navigating to /admin in your browser or clicking "Staff Portal" in the website footer.',
            bullets: [
              'Enter your master administrator password and click "Unlock Panel".',
              'Your session stays active while you work. Click "Logout" at the top right when you are finished to lock the dashboard.',
              'To change your master password, switch to the "Security" tab, enter your new desired password, confirm it, and click "Update Password".'
            ]
          },
          registrations: {
            title: '2. Managing Registrations & Trainees',
            desc: 'The "Registrations" tab is your live roster of students signing up for training sessions.',
            bullets: [
              'Marking Paid (2,100 XAF): When a student pays their registration fee via Orange Money, MTN MoMo, or cash, click the amber "Unpaid" badge. It instantly turns into a green "Paid (2,100 XAF)" badge and updates all stats.',
              'Marking Completed: When a student finishes their 4 hands-on training modules, click the "In Training" badge to mark them as "Completed" (teal badge).',
              'Editing a Registrant: Click the "Edit" button on any row. A pre-filled window opens allowing you to fix phone numbers, correct spelling, adjust their preferred town/dates, or add internal notes.',
              'Deleting a Registrant: Click the "Delete" trash icon. A confirmation box will appear to prevent accidents. Once confirmed, the trainee is permanently removed from the database.',
              '1-Click WhatsApp Messaging: Click the student’s phone number or WhatsApp button to directly launch WhatsApp with a pre-written message greeting them and confirming their requested month/city.'
            ]
          },
          products: {
            title: '3. Managing Products & Raw Materials',
            desc: 'Control the catalog of finished goods, raw materials (caustic soda, palm kernel oil, molds, cocoa beans) that customers can browse and order.',
            bullets: [
              'Adding a Product: Click "+ Add New Product / Material" in the Products tab. Fill in the English & French names, unit price in FCFA, packaging size (e.g. 1kg, 5L), category, and photo.',
              'Editing & Changing Photos: Click "Edit" on any product card. You can upload a new photo directly from your device, choose from high-resolution presets, or paste an image link.',
              'Deleting a Product: Click "Delete" on any product card to permanently remove it from the public catalog.'
            ]
          },
          announcements: {
            title: '4. Posting Next Training Announcements',
            desc: 'Keep the public website updated with your confirmed upcoming batch dates and locations.',
            bullets: [
              'Go to the "Session Announcements" tab.',
              'Enter the session dates (e.g. "March 15 – 22, 2026" / "15 – 22 Mars 2026") and location (e.g. "Yaoundé Workshop & Regional Batches").',
              'Make sure "Display this announcement actively" is checked and click "Save Announcement". It will instantly show on the homepage banner and trainings page.'
            ]
          },
          settings: {
            title: '5. Updating WhatsApp Community & Contact Info',
            desc: 'Manage global links and phone numbers that power the entire site.',
            bullets: [
              'Go to the "Site Settings" tab.',
              'WhatsApp Community Link: Paste your new group invite link (e.g. chat.whatsapp.com/...). This updates all "Join Community" buttons across the public website.',
              'Admin WhatsApp Phone: Enter your official phone number with Cameroon country code (e.g. 237654785642). All direct WhatsApp inquiry and call buttons route to this number.',
              'Click "Save Site Settings" to deploy updates across the entire site.'
            ]
          }
        },
        quick_table: {
          title: 'Quick-Reference Action Cheat Sheet',
          subtitle: 'Find where and how to perform everyday admin tasks at a glance.',
          th_action: 'Task / Goal',
          th_tab: 'Admin Tab',
          th_steps: 'Quick Steps',
          rows: [
            {
              action: 'Confirm Trainee Payment (2,100 XAF)',
              tab: 'Registrations',
              steps: 'Find student row → Click the amber "Unpaid" badge to toggle to green "Paid".'
            },
            {
              action: 'Mark Trainee as Graduated / Completed',
              tab: 'Registrations',
              steps: 'Find student row → Click the "In Training" badge to toggle to teal "Completed".'
            },
            {
              action: 'Fix Wrong Phone Number or Name',
              tab: 'Registrations',
              steps: 'Click "Edit" on student row → Update phone or name → Click "Save Changes".'
            },
            {
              action: 'Delete Spam or Cancelled Registrant',
              tab: 'Registrations',
              steps: 'Click the red "Delete" trash icon → Click "Yes, Delete Permanently" in confirmation box.'
            },
            {
              action: 'Message Student Directly on WhatsApp',
              tab: 'Registrations',
              steps: 'Click the green phone badge or "Chat on WhatsApp" button on their row.'
            },
            {
              action: 'Add New Product or Raw Material',
              tab: 'Products & Materials',
              steps: 'Click "+ Add New Product" → Fill names, price in FCFA, upload photo → Click "Save Product".'
            },
            {
              action: 'Change Product Price or Photo',
              tab: 'Products & Materials',
              steps: 'Click "Edit" on product card → Change price or upload new photo → Click "Save Product".'
            },
            {
              action: 'Change Next Training Dates / Location',
              tab: 'Session Announcements',
              steps: 'Enter new dates and venue in English & French → Click "Save Announcement".'
            },
            {
              action: 'Update WhatsApp Community Link',
              tab: 'Site Settings',
              steps: 'Paste new chat.whatsapp.com link into the field → Click "Save Site Settings".'
            },
            {
              action: 'Change Admin Login Password',
              tab: 'Security',
              steps: 'Enter new password in both fields → Click "Update Password".'
            }
          ]
        }
      }
    },
    footer: {
      about_cmn: 'CMN Superior Quality Training is Yaoundé’s premier hands-on vocational training institute for soap manufacturing, artisanal chocolate, Ovaltine malted drinks, and spaghetti production. We supply the raw materials to turn training into sustainable business.',
      quick_links: 'Quick Navigation',
      trainings_list: 'Our 4 Masterclasses',
      contact_us: 'Headquarters & Inquiries',
      all_rights: 'All rights reserved.',
      bilingual_notice: 'Bilingual Training Available in English & French.',
      admin_link: 'Staff Portal'
    }
  },
  fr: {
    brand: {
      name: 'CMN Formation Qualité Supérieure',
      tagline: 'Excellence Pratique et Maîtrise de la Production',
      location_badge: 'Yaoundé, Cameroun • Formations Régionales Disponibles'
    },
    nav: {
      home: 'Accueil',
      trainings: 'Formations',
      products: 'Produits & Matières Premières',
      about: 'À Propos & Contact',
      join_community: 'Rejoindre la Communauté WhatsApp',
      admin: 'Portail Admin',
      language: 'Langue',
      switch_fr: 'Français',
      switch_en: 'English'
    },
    hero: {
      badge: 'Transformer les Compétences en Entreprises Rentables',
      title_start: 'Apprenez à Produire du',
      title_accent: 'Savon, Chocolat, Ovaltine & Spaghetti',
      title_end: 'avec une Pratique 100% Réelle',
      subtitle: 'Basée à Yaoundé, CMN propose des formations intensives et pratiques pour futurs fabricants et entrepreneurs dans tout le Cameroun (Yaoundé, Bamenda, Douala, Bafoussam, Bertoua, etc.). Contrairement aux formations purement théoriques, nous vous fournissons directement les matières premières, les secrets de formulation et l’équipement pour lancer votre activité sans attendre.',
      usp_title: 'La Différence CMN :',
      usp_desc: 'Nous n’enseignons pas seulement la théorie — NOUS FOURNISSONS LE BUSINESS ET LES MATIÈRES PREMIÈRES pour démarrer immédiatement !',
      cta_trainings: 'Découvrir les 4 Formations',
      cta_products: 'Acheter Savons & Matières Premières',
      cta_whatsapp: 'Écrire à l’Admin sur WhatsApp',
      cta_call: 'Appelez-nous Directement'
    },
    stats: {
      graduates: '500+ Entrepreneurs Formés',
      success_rate: '100% Formulations Pratiques & Testées',
      cities: 'Partout au Cameroun : Yaoundé, Bamenda, Douala, Bafoussam...',
      supplies: 'Approvisionnement Direct en Matières Premières'
    },
    pillars: {
      title: 'Nos 4 Filières de Formation Pratique',
      subtitle: 'Apprenez la fabrication complète de A à Z, du choix des ingrédients au conditionnement commercial.',
      soap: {
        title: 'Savon Artisanal & Ménage',
        desc: 'Savons solides de ménage, savons antiseptiques de toilette, détergents liquides et saponification à froid maîtrisée.'
      },
      chocolate: {
        title: 'Chocolat De la Fève à la Tablette',
        desc: 'Fermentation, torréfaction, conchage à la meule, tempérage et moulage de tablettes de chocolat haut de gamme à partir du cacao camerounais.'
      },
      ovaltine: {
        title: 'Ovaltine & Boissons Maltées',
        desc: 'Formulez des poudres de boisson maltée et chocolatée solubles, enrichies en vitamines, avec une longue conservation.'
      },
      spaghetti: {
        title: 'Spaghetti & Pâtes Alimentaires',
        desc: 'Hydratation de la semoule de blé dur, extrusion sous vide avec filières bronze, séchage basse température et ensachage.'
      },
      materials: {
        title: 'Matières Premières & Équipements',
        desc: 'Accès direct en gros à la soude caustique, huile de palmiste, moules, coupeurs, parfums et emballages.'
      },
      view_process: 'Voir le Processus Étape par Étape'
    },
    usp_section: {
      title: 'Pourquoi Choisir CMN Formation Qualité Supérieure ?',
      subtitle: 'La plupart des centres vous remettent un cahier et vous laissent vous débrouiller. Voici comment CMN garantit votre réussite commerciale réelle :',
      points: [
        {
          title: 'Approvisionnement Direct en Matières Premières',
          desc: 'Ne cherchez plus où acheter de la soude caustique pure, de l’huile de palmiste raffinée, du beurre de cacao ou des moules. Nous fournissons toutes les matières premières nécessaires pour produire dès le premier jour.'
        },
        {
          title: 'Pratique Réelle à 100%',
          desc: 'Vous pesez, mélangez, coulez, découpez, estampillez, conchez et extrudez vous-même. Chaque apprenant repart en ayant fabriqué de véritables produits finis prêts pour la vente.'
        },
        {
          title: 'Calcul des Coûts de Revient & Rentabilité',
          desc: 'Nous calculons le coût de production unitaire en FCFA, les marges bénéficiaires, les circuits de distribution au Cameroun et les normes de conditionnement.'
        },
        {
          title: 'Rayonnement National & Sessions sur Demande',
          desc: 'Basée à Yaoundé, nous formons à travers toutes les régions du Cameroun (Yaoundé, Bamenda, Douala, Bafoussam, Bertoua, etc.). De nouvelles sessions régionales s’ouvrent directement dès qu’assez d’apprenants s’enregistrent dans votre zone.'
        }
      ]
    },
    trainings_page: {
      title: 'Formations Pratiques de Production',
      subtitle: 'Maîtrisez l’art de la fabrication commerciale lors de nos ateliers intensifs. Disponibles dans tout le Cameroun (Yaoundé, Bamenda, Douala, Bafoussam...) avec de nouvelles promotions créées selon les inscriptions.',
      pricing_title: 'Grille Tarifaire Transparente',
      reg_fee_label: 'Frais d’Inscription',
      reg_fee_amount: '2 100 FCFA',
      reg_fee_desc: 'Couvre la logistique de l’atelier, les équipements de protection, le livret de formulation et le Certificat de Fin de Formation.',
      training_fee_label: 'Frais de Formation Pratique',
      training_fee_amount: '30 000 FCFA',
      training_fee_desc: 'Couvre l’ensemble des ingrédients de production, le coaching personnalisé, les lots pratiques et le suivi post-formation.',
      negotiable_note: 'Note : Les frais de formation sont négociables avec réductions spéciales pour les groupes, associations ou inscriptions multi-modules.',
      upcoming_session_title: 'Prochaine Session & Lieu de Formation',
      upcoming_badge: 'Session Confirmée',
      location_label: 'Lieu :',
      period_label: 'Période / Dates :',
      custom_dates_note: 'Vous n’êtes pas disponible à ces dates ou vous êtes dans une autre ville ? Nous organisons des sessions à Yaoundé, Bamenda, Douala, Bafoussam et ailleurs selon les demandes. Précisez votre ville ci-dessous !',
      process_steps_title: 'Processus de Fabrication Détaillé Étape par Étape',
      process_steps_subtitle: 'Cliquez sur chaque module pour découvrir les étapes artisanales et industrielles exactes que vous maîtriserez pendant la formation.',
      steps_count: 'Étapes',
      module_highlights: 'Points Clés de l’Atelier :'
    },
    registration: {
      title: 'S’inscrire à la Prochaine Session',
      subtitle: 'Remplissez ce formulaire rapide. En cliquant sur "Contacter l’Administrateur", votre inscription est enregistrée et un message WhatsApp pré-rempli s’ouvre directement pour finaliser avec la formatrice.',
      name_label: 'Nom Complet *',
      name_placeholder: 'ex: Marie Claire Kemgne',
      phone_label: 'Numéro de Téléphone WhatsApp *',
      phone_placeholder: 'ex: 675123456 ou +237 654 78 56 42',
      location_label: 'Votre Ville / Région Actuelle *',
      location_placeholder: 'ex: Yaoundé (Biyem-Assi), Douala (Akwa), Bafoussam, etc.',
      about_label: 'Courte Présentation & Objectifs',
      about_placeholder: 'Parlez-nous brièvement de vos motivations et de vos objectifs (ex: lancer une savonnerie, apprendre pour la maison, diversifier une boutique existante)...',
      training_interest_label: 'Modules de Formation Souhaités',
      training_interest_options: {
        all: 'Les 4 Modules (Savon, Chocolat, Ovaltine, Spaghetti)',
        soap: 'Fabrication de Savon Uniquement',
        chocolate: 'Fabrication de Chocolat Uniquement',
        ovaltine: 'Fabrication d’Ovaltine Uniquement',
        spaghetti: 'Fabrication de Spaghetti Uniquement',
        soap_and_chocolate: 'Savon + Chocolat',
        custom: 'Combinaison Personnalisée'
      },
      preferred_month_label: 'Mois / Période Souhaitée',
      preferred_month_placeholder: 'ex: Prochaine session annoncée, ou Octobre 2026, ou Week-end',
      preferred_location_label: 'Ville / Lieu Souhaité (si différent du lieu affiché)',
      preferred_location_placeholder: 'ex: Douala, Bafoussam, Yaoundé, Bertoua...',
      submit_button: 'Contacter l’Administrateur sur WhatsApp',
      submitting: 'Enregistrement de l’inscription...',
      success_message: 'Inscription enregistrée ! Ouverture de WhatsApp pour échanger avec l’Administrateur...',
      privacy_note: 'Aucun paiement en ligne requis. Tous les règlements (frais d’inscription 2 100 FCFA) s’effectuent en toute sécurité par MoMo/OM ou en espèces avec la direction.',
      help_text: 'Nous nous déplaçons dans d’autres villes dès qu’un groupe suffisant est constitué.'
    },
    products_page: {
      title: 'Savons Finis & Matières Premières de Production',
      subtitle: 'Commandez nos savons artisanaux de qualité supérieure ou approvisionnez votre atelier en matières premières certifiées et moules professionnels.',
      categories: {
        all: 'Tous les Articles',
        soap: 'Savons Finis',
        raw_material: 'Matières Premières Savon',
        food_ingredients: 'Ingrédients Chocolat & Alimentaire',
        equipment: 'Équipements & Moules'
      },
      in_stock: 'En Stock',
      out_of_stock: 'Sur Commande',
      order_btn: 'Commander via WhatsApp',
      price_currency: 'FCFA',
      direct_supply_banner: {
        title: 'Besoin de Grandes Quantités en Gros ou d’Ingrédients Spécifiques ?',
        desc: 'Nous fournissons les savonniers et anciens élèves en soude caustique par sacs, huile de palmiste par bidons de 25L/200L, moules sur mesure et parfums concentrés à prix de gros avec expédition partout au Cameroun.',
        btn: 'Demander un Devis de Gros'
      }
    },
    about_page: {
      title: 'À Propos de CMN Formation Qualité Supérieure',
      subtitle: 'Donner aux entrepreneurs camerounais et africains les compétences pratiques et l’approvisionnement durable nécessaires pour réussir.',
      story_title: 'Notre Histoire & Philosophie',
      story_p1: 'CMN Formation Qualité Supérieure a été créée à Yaoundé avec une vision claire : combler le fossé entre les diplômes théoriques et la création réelle d’unités de production rentables.',
      story_p2: 'Trop souvent, les apprenants suivent des séminaires mais se retrouvent bloqués faute de matières premières fiables ou de recettes adaptées. CMN résout cela en étant à la fois votre formatrice experte et votre fournisseur attitré.',
      travel_title: 'Déplacements Régionaux au Cameroun',
      travel_desc: 'Basée à Yaoundé, CMN organise régulièrement des caravanes de formation à Douala, Bafoussam, Bertoua et dans d’autres villes dès qu’un effectif suffisant est réuni. Vous représentez une association, une église ou un groupe ? Nous venons à vous !',
      contact_card_title: 'Coordonnées & Siège',
      phone_label: 'WhatsApp / Téléphone :',
      email_label: 'Adresse Email :',
      address_label: 'Siège & Atelier :',
      hours_label: 'Heures d’Ouverture :',
      hours_value: 'Lundi – Samedi : 08h00 – 18h00',
      community_card_title: 'Rejoignez la Communauté Officielle WhatsApp',
      community_card_desc: 'Échangez avec plus de 500 anciens apprenants, posez vos questions techniques, partagez vos réalisations et soyez informé des prochaines dates en priorité.',
      join_now: 'Rejoindre le Groupe WhatsApp',
      faq_title: 'Questions Fréquemment Posées',
      faqs: [
        {
          q: 'Combien coûte la formation et qu’est-ce qui est inclus ?',
          a: 'L’inscription est de 2 100 FCFA (couvre livret, matériel de protection et certificat). La formation pratique complète est de 30 000 FCFA (négociable pour les groupes). Tous les ingrédients de pratique sont fournis.'
        },
        {
          q: 'Faut-il des prérequis en chimie ou en fabrication ?',
          a: 'Aucun prérequis ! Nous expliquons pas à pas dans un langage simple et accessible en français et en anglais.'
        },
        {
          q: 'Où pourrai-je trouver les matières premières après la formation ?',
          a: 'Directement auprès de CMN ! Nous fournissons soude caustique, huile de palmiste, parfums, huiles essentielles et moules aux tarifs réservés aux apprenants avec expédition partout au Cameroun.'
        },
        {
          q: 'CMN peut-elle venir dans ma ville (Douala, Bafoussam...) ?',
          a: 'Absolument ! Dès qu’un groupe de personnes s’inscrit pour une localité, nous fixons une date et venons animer la session.'
        }
      ]
    },
    community_banner: {
      title: 'Rejoignez la Communauté WhatsApp des Producteurs CMN',
      desc: 'Recevez les annonces des sessions, les astuces de formulation, les arrivages de matières premières et le soutien direct de la formatrice.',
      btn: 'Rejoindre la Communauté sur WhatsApp'
    },
    admin: {
      title: 'Portail d’Administration CMN',
      subtitle: 'Gérez les inscriptions des élèves, les sessions de formation, le catalogue de produits et les paramètres WhatsApp.',
      login_title: 'Accès Sécurisé Administrateur',
      login_subtitle: 'Veuillez saisir votre mot de passe pour accéder au panneau de contrôle.',
      password_label: 'Mot de Passe Principal',
      password_placeholder: 'Entrez le mot de passe admin',
      login_btn: 'Déverrouiller le Panneau',
      logout: 'Déconnexion',
      invalid_password: 'Mot de passe incorrect. Veuillez vérifier et réessayer.',
      tabs: {
        registrations: 'Inscriptions',
        announcements: 'Annonces de Sessions',
        products: 'Produits & Matières',
        settings: 'Paramètres du Site',
        security: 'Sécurité',
        guide: 'Guide Admin & Aide'
      },
      stats: {
        total_registrations: 'Total Inscriptions',
        paid_registrations: 'Payés Confirmés',
        completed_registrations: 'Formations Terminées',
        pending_payment: 'En Attente de Paiement',
        total_products: 'Articles au Catalogue',
        location_adjustments: 'Demandes d’Ajustement'
      },
      reg_table: {
        title: 'Tableau des Inscriptions',
        search_placeholder: 'Rechercher par nom, téléphone, ville...',
        filter_all: 'Toutes les Inscriptions',
        filter_paid: 'Payés Uniquement',
        filter_unpaid: 'En Attente Uniquement',
        filter_completed: 'Terminés Uniquement',
        filter_adjustments: 'Ajustements Demandés',
        th_date: 'Date',
        th_name: 'Nom',
        th_phone: 'Téléphone / WhatsApp',
        th_location: 'Localisation',
        th_interest: 'Intérêt de Formation',
        th_month: 'Mois Souhaité',
        th_pref_loc: 'Lieu Souhaité',
        th_about: 'À Propos de l’Élève',
        th_status: 'Statut Paiement',
        th_completed: 'Statut Formation',
        th_actions: 'Actions',
        paid_label: 'Payé (2 100 FCFA)',
        unpaid_label: 'Non Payé',
        completed_label: 'Terminé',
        in_progress_label: 'En cours',
        click_to_chat: 'Discuter sur WhatsApp',
        edit_btn: 'Modifier',
        edit_modal_title: 'Modifier l’Inscription du Stagiaire',
        edit_modal_subtitle: 'Corrigez le numéro de téléphone, l’orthographe du nom, la ville de formation ou les notes.',
        edit_saved_success: 'Informations du stagiaire mises à jour avec succès !',
        delete_btn: 'Supprimer',
        delete_confirm: 'Êtes-vous sûr de vouloir supprimer cette inscription ?',
        delete_modal_title: 'Confirmer la Suppression Définitive',
        delete_modal_prompt: 'Êtes-vous sûr de vouloir supprimer définitivement le dossier d’inscription de',
        delete_modal_warning: 'Cette action supprimera immédiatement le stagiaire de la base de données et ne peut être annulée.',
        delete_modal_confirm_btn: 'Oui, Supprimer Définitivement',
        cancel_btn: 'Annuler',
        save_btn: 'Enregistrer les Modifications',
        adjustment_badge: 'Ajustement Demandé',
        no_registrations: 'Aucune inscription trouvée selon vos critères.'
      },
      announcement_form: {
        title: 'Bannière de la Prochaine Session de Formation',
        desc: 'Cette annonce s’affiche en haut des pages Formations et Accueil pour informer les visiteurs.',
        period_en: 'Période / Dates de Session (Anglais)',
        period_fr: 'Période / Dates de Session (Français)',
        location_en: 'Lieu de la Session (Anglais)',
        location_fr: 'Lieu de la Session (Français)',
        active_label: 'Afficher activement cette annonce sur le site public',
        save_btn: 'Enregistrer l’Annonce',
        saved_success: 'Annonce mise à jour avec succès !'
      },
      products_manager: {
        title: 'Gestionnaire des Produits & Matières Premières',
        subtitle: 'Ajoutez, modifiez ou retirez des savons, matières premières, ingrédients et moules.',
        add_new: 'Ajouter un Produit / Matière',
        name_en: 'Nom de l’Article (Anglais)',
        name_fr: 'Nom de l’Article (Français)',
        price: 'Prix en FCFA',
        category: 'Catégorie',
        unit: 'Unité / Conditionnement (ex: 1kg, 5L, Lot de 5)',
        photo_url: 'URL ou Photo Prédéfinie',
        preset_label: 'Choisir une Photo Prédéfinie :',
        desc_en: 'Description (Anglais)',
        desc_fr: 'Description (Français)',
        in_stock_label: 'En Stock et Disponible à la Commande',
        save: 'Enregistrer l’Article',
        cancel: 'Annuler',
        edit: 'Modifier',
        delete: 'Supprimer',
        delete_confirm: 'Êtes-vous sûr de vouloir supprimer cet article du catalogue ?'
      },
      settings_form: {
        title: 'Configuration en Direct du Site',
        subtitle: 'Mettez à jour vos liens WhatsApp officiels et les coordonnées de l’entreprise.',
        community_link_label: 'Lien du Groupe Communauté WhatsApp (chat.whatsapp.com/...)',
        community_link_help: 'Met à jour instantanément le bouton "Rejoindre la Communauté" sur toutes les pages publiques.',
        admin_phone_label: 'Numéro WhatsApp de l’Administrateur (avec indicatif 237)',
        admin_phone_help: 'Utilisé pour tous les liens WhatsApp de commande et d’inscription (ex: 237654785642).',
        company_name_label: 'Nom Officiel de l’Entreprise',
        email_label: 'Email Officiel',
        address_en_label: 'Adresse Physique / Siège (Anglais)',
        address_fr_label: 'Adresse Physique / Siège (Français)',
        save_btn: 'Enregistrer les Paramètres',
        saved_success: 'Paramètres du site mis à jour avec succès !'
      },
      change_password: {
        title: 'Modifier le Mot de Passe Admin',
        subtitle: 'Mettez à jour votre mot de passe secret d’accès au portail d’administration.',
        new_password_label: 'Nouveau Mot de Passe',
        confirm_password_label: 'Confirmer le Mot de Passe',
        change_btn: 'Mettre à Jour le Mot de Passe',
        password_mismatch: 'Les mots de passe ne correspondent pas !',
        password_updated: 'Mot de passe mis à jour avec succès !'
      },
      admin_guide: {
        title: 'Manuel & Guide d’Utilisation du Portail Admin CMN',
        subtitle: 'Instructions claires et simples pour gérer les inscriptions, les produits, les annonces et les réglages du site.',
        badge: 'Guide Pratique Administrateur',
        sections: {
          login: {
            title: '1. Connexion & Sécurité de Session',
            desc: 'Accédez au panneau d’administration à tout moment en tapant /admin dans la barre d’adresse ou en cliquant sur "Espace Personnel" en bas du site.',
            bullets: [
              'Saisissez votre mot de passe administrateur principal et cliquez sur "Déverrouiller le Panneau".',
              'Votre session reste active pendant votre travail. Cliquez sur "Déconnexion" en haut à droite lorsque vous avez terminé pour verrouiller l’accès.',
              'Pour modifier votre mot de passe principal, rendez-vous dans l’onglet "Sécurité", tapez le nouveau mot de passe, confirmez-le et cliquez sur "Mettre à Jour le Mot de Passe".'
            ]
          },
          registrations: {
            title: '2. Gestion des Inscriptions & Stagiaires',
            desc: 'L’onglet "Inscriptions" est votre registre en direct des personnes inscrites aux sessions de formation.',
            bullets: [
              'Valider le Paiement (2 100 FCFA) : Dès qu’un apprenant règle ses frais d’inscription par Orange Money, MTN MoMo ou espèces, cliquez sur le bouton orange "Non Payé". Il devient instantanément un badge vert "Payé (2 100 FCFA)" et met à jour les compteurs.',
              'Valider la Fin de Formation : Dès qu’un apprenant termine avec succès ses 4 modules pratiques, cliquez sur "En cours" pour le marquer comme "Terminé" (badge sarcelle).',
              'Modifier un Stagiaire : Cliquez sur le bouton "Modifier" sur la ligne concernée. Une fenêtre s’ouvre pour corriger un numéro de téléphone erroné, rectifier le nom, ajuster la ville souhaitée ou ajouter une note.',
              'Supprimer une Inscription : Cliquez sur l’icône de corbeille rouge "Supprimer". Une fenêtre de confirmation s’affiche pour éviter toute suppression accidentelle. Après confirmation, l’élève est définitivement retiré de la base de données.',
              'Contact WhatsApp en 1 Clic : Cliquez sur le numéro de téléphone ou le bouton WhatsApp d’un élève pour ouvrir immédiatement WhatsApp avec un message pré-rédigé personnalisé mentionnant sa ville et sa session.'
            ]
          },
          products: {
            title: '3. Gestion des Produits & Matières Premières',
            desc: 'Gérez le catalogue des savons finis, matières premières (soude caustique, huile de palmiste, moules, fèves de cacao) disponibles à la commande.',
            bullets: [
              'Ajouter un Produit : Cliquez sur "+ Ajouter un Produit / Matière" dans l’onglet Produits. Renseignez les noms en français et anglais, le prix en FCFA, le conditionnement (ex: 1kg, 5L), la catégorie et la photo.',
              'Modifier & Changer la Photo : Cliquez sur "Modifier" sur la fiche d’un produit. Vous pouvez téléverser directement une photo depuis votre téléphone ou ordinateur, choisir parmi les photos prédéfinies ou coller un lien image.',
              'Supprimer un Produit : Cliquez sur "Supprimer" sur la fiche d’un article pour le retirer du catalogue public.'
            ]
          },
          announcements: {
            title: '4. Publication des Annonces de Prochaines Sessions',
            desc: 'Informez les visiteurs du site des dates et villes confirmées pour les prochaines cohortes.',
            bullets: [
              'Rendez-vous dans l’onglet "Annonces de Sessions".',
              'Saisissez les dates de la session (ex: "15 – 22 Mars 2026" / "March 15 – 22, 2026") et le lieu (ex: "Atelier Yaoundé & Sessions Régionales").',
              'Vérifiez que la case "Afficher activement cette annonce" est cochée, puis cliquez sur "Enregistrer l’Annonce". La bannière sera immédiatement visible sur tout le site.'
            ]
          },
          settings: {
            title: '5. Mise à Jour du Groupe WhatsApp & Coordonnées',
            desc: 'Contrôlez les coordonnées et liens WhatsApp globaux qui alimentent tout le site internet.',
            bullets: [
              'Rendez-vous dans l’onglet "Paramètres du Site".',
              'Lien du Groupe Communauté WhatsApp : Collez votre lien d’invitation (ex: chat.whatsapp.com/...). Cela met à jour immédiatement le bouton "Rejoindre la Communauté" sur toutes les pages.',
              'Numéro WhatsApp Admin : Indiquez le numéro de téléphone officiel avec l’indicatif 237 (ex: 237654785642). Tous les boutons de contact et d’appel direct renvoient vers ce numéro.',
              'Cliquez sur "Enregistrer les Paramètres" pour appliquer les modifications.'
            ]
          }
        },
        quick_table: {
          title: 'Tableau Récapitulatif : Action Rapide',
          subtitle: 'Retrouvez en un coup d’œil où et comment effectuer chaque tâche courante.',
          th_action: 'Tâche / Objectif',
          th_tab: 'Onglet Admin',
          th_steps: 'Étapes Rapides',
          rows: [
            {
              action: 'Confirmer le Paiement d’un Élève (2 100 FCFA)',
              tab: 'Inscriptions',
              steps: 'Trouver la ligne de l’élève → Cliquer sur le bouton orange "Non Payé" pour le passer au vert "Payé".'
            },
            {
              action: 'Marquer un Élève comme Diplômé / Terminé',
              tab: 'Inscriptions',
              steps: 'Trouver la ligne de l’élève → Cliquer sur "En cours" pour le passer à "Terminé".'
            },
            {
              action: 'Corriger un Numéro de Téléphone ou Nom',
              tab: 'Inscriptions',
              steps: 'Cliquer sur "Modifier" sur la ligne de l’élève → Corriger le numéro ou le nom → Cliquer sur "Enregistrer".'
            },
            {
              action: 'Supprimer une Inscription Erronée ou Annulée',
              tab: 'Inscriptions',
              steps: 'Cliquer sur l’icône rouge "Supprimer" → Confirmer en cliquant sur "Oui, Supprimer Définitivement".'
            },
            {
              action: 'Écrire Directement à un Élève sur WhatsApp',
              tab: 'Inscriptions',
              steps: 'Cliquer sur le numéro vert ou le bouton "Discuter sur WhatsApp" de sa ligne.'
            },
            {
              action: 'Ajouter un Nouveau Produit ou Matière Première',
              tab: 'Produits & Matières',
              steps: 'Cliquer sur "+ Ajouter un Produit" → Remplir nom, prix en FCFA, photo → "Enregistrer".'
            },
            {
              action: 'Changer le Prix ou la Photo d’un Produit',
              tab: 'Produits & Matières',
              steps: 'Cliquer sur "Modifier" sur l’article → Ajuster le prix ou téléverser une photo → "Enregistrer".'
            },
            {
              action: 'Modifier les Dates / Villes de la Prochaine Session',
              tab: 'Annonces de Sessions',
              steps: 'Saisir les nouvelles dates et le lieu en FR & EN → Cliquer sur "Enregistrer l’Annonce".'
            },
            {
              action: 'Mettre à Jour le Lien du Groupe WhatsApp',
              tab: 'Paramètres du Site',
              steps: 'Coller le nouveau lien chat.whatsapp.com dans le champ → Cliquer sur "Enregistrer".'
            },
            {
              action: 'Changer le Mot de Passe de Connexion Admin',
              tab: 'Sécurité',
              steps: 'Saisir le nouveau mot de passe dans les deux champs → Cliquer sur "Mettre à Jour".'
            }
          ]
        }
      }
    },
    footer: {
      about_cmn: 'CMN Formation Qualité Supérieure est le centre de référence à Yaoundé pour l’apprentissage pratique de la savonnerie, du chocolat artisanal, des boissons maltées Ovaltine et des pâtes alimentaires. Nous fournissons les matières premières pour transformer la formation en entreprise rentable.',
      quick_links: 'Navigation Rapide',
      trainings_list: 'Nos 4 Formations Phares',
      contact_us: 'Siège & Informations',
      all_rights: 'Tous droits réservés.',
      bilingual_notice: 'Formations Bilingues Dispensées en Français et en Anglais.',
      admin_link: 'Espace Personnel'
    }
  }
};
