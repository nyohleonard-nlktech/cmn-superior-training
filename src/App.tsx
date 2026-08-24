/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Language, Product, SiteSettings, TrainingAnnouncement } from './types';
import { INITIAL_ANNOUNCEMENT, INITIAL_PRODUCTS, INITIAL_SETTINGS } from './data/trainingData';
import { api } from './services/api';
import { Navbar } from './components/Navbar';
import { AnnouncementBanner } from './components/AnnouncementBanner';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HomeView } from './views/HomeView';
import { TrainingsView } from './views/TrainingsView';
import { ProductsView } from './views/ProductsView';
import { AboutContactView } from './views/AboutContactView';
import { AdminView } from './views/AdminView';

export default function App() {
  // Language State
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('cmn_lang');
    return (saved === 'fr' || saved === 'en') ? saved : 'en';
  });

  useEffect(() => {
    localStorage.setItem('cmn_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  // Route / Tab State
  const [currentTab, setCurrentTab] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    if (['home', 'trainings', 'products', 'about', 'admin'].includes(hash)) {
      return hash;
    }
    const path = window.location.pathname.replace('/', '');
    if (['admin'].includes(path)) {
      return 'admin';
    }
    return 'home';
  });

  const [selectedTrainingId, setSelectedTrainingId] = useState<string | undefined>(undefined);

  // Core Dynamic Data
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [announcement, setAnnouncement] = useState<TrainingAnnouncement>(INITIAL_ANNOUNCEMENT);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS as Product[]);

  // Hash route listener
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'trainings', 'products', 'about', 'admin'].includes(hash)) {
        setCurrentTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update hash on tab change
  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    window.location.hash = tab;
  };

  // Initial data fetch from server API
  useEffect(() => {
    async function loadData() {
      try {
        const [loadedSettings, loadedAnnouncement, loadedProducts] = await Promise.all([
          api.getSettings(),
          api.getAnnouncement(),
          api.getProducts()
        ]);
        if (loadedSettings) setSettings(loadedSettings);
        if (loadedAnnouncement) setAnnouncement(loadedAnnouncement);
        if (loadedProducts) setProducts(loadedProducts);
      } catch (err) {
        console.error('Data initialization error:', err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#241711]">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        lang={lang}
        setLang={setLang}
        settings={settings}
      />

      {/* Upcoming Training Banner (shown on public pages when active) */}
      {currentTab !== 'admin' && (
        <AnnouncementBanner
          announcement={announcement}
          lang={lang}
          onRegisterClick={() => {
            handleTabChange('trainings');
            setTimeout(() => {
              const el = document.getElementById('registration-form-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
          }}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          <HomeView
            lang={lang}
            setCurrentTab={handleTabChange}
            setSelectedTrainingId={setSelectedTrainingId}
            settings={settings}
            announcement={announcement}
          />
        )}

        {currentTab === 'trainings' && (
          <TrainingsView
            lang={lang}
            settings={settings}
            announcement={announcement}
            selectedTrainingId={selectedTrainingId}
          />
        )}

        {currentTab === 'products' && (
          <ProductsView
            lang={lang}
            products={products}
            settings={settings}
          />
        )}

        {currentTab === 'about' && (
          <AboutContactView
            lang={lang}
            settings={settings}
          />
        )}

        {currentTab === 'admin' && (
          <AdminView
            lang={lang}
            settings={settings}
            setSettings={setSettings}
            announcement={announcement}
            setAnnouncement={setAnnouncement}
            products={products}
            setProducts={setProducts}
          />
        )}
      </main>

      {/* Floating WhatsApp Quick Action Button */}
      <WhatsAppFloatingButton settings={settings} lang={lang} />

      {/* Bottom Footer */}
      <Footer
        lang={lang}
        setCurrentTab={handleTabChange}
        settings={settings}
      />
    </div>
  );
}
