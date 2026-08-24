import { Product, Registration, SiteSettings, TrainingAnnouncement } from '../types';
import { INITIAL_ANNOUNCEMENT, INITIAL_PRODUCTS, INITIAL_SETTINGS } from '../data/trainingData';

const STORAGE_KEYS = {
  SETTINGS: 'cmn_settings_cache',
  ANNOUNCEMENT: 'cmn_announcement_cache',
  PRODUCTS: 'cmn_products_cache',
  REGISTRATIONS: 'cmn_registrations_cache',
  AUTH_TOKEN: 'cmn_admin_token'
};

export const api = {
  // Settings
  async getSettings(): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings');
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
        return data;
      }
    } catch {
      // ignore, fallback
    }
    const cached = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return cached ? JSON.parse(cached) : INITIAL_SETTINGS;
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(data));
        return data;
      }
    } catch {
      // fallback
    }
    const current = await this.getSettings();
    const updated = { ...current, ...settings, updated_at: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  },

  // Announcements
  async getAnnouncement(): Promise<TrainingAnnouncement> {
    try {
      const res = await fetch('/api/announcements');
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(data));
        return data;
      }
    } catch {
      // fallback
    }
    const cached = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENT);
    return cached ? JSON.parse(cached) : INITIAL_ANNOUNCEMENT;
  },

  async updateAnnouncement(announcement: Partial<TrainingAnnouncement>): Promise<TrainingAnnouncement> {
    try {
      const res = await fetch('/api/announcements', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(announcement)
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(data));
        return data;
      }
    } catch {
      // fallback
    }
    const current = await this.getAnnouncement();
    const updated = { ...current, ...announcement };
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENT, JSON.stringify(updated));
    return updated;
  },

  // Products
  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(data));
        return data;
      }
    } catch {
      // fallback
    }
    const cached = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const prods: Product[] = cached ? JSON.parse(cached) : (INITIAL_PRODUCTS as Product[]);
    return prods.map(p => ({
      ...p,
      photo_url: p.photo_url ? p.photo_url.replace(/^\/?src\/assets\/images\//, '/images/') : '/images/raw_materials_1787567125868.jpg'
    }));
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        const data = await res.json();
        return data;
      }
    } catch {
      // fallback
    }
    const newProd: Product = {
      ...product,
      id: `prod-${Date.now()}`
    };
    const current = await this.getProducts();
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify([newProd, ...current]));
    return newProd;
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }
    const current = await this.getProducts();
    const updated = current.map(p => p.id === id ? { ...p, ...product } : p);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
    return updated.find(p => p.id === id)!;
  },

  async deleteProduct(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {
      // fallback
    }
    const current = await this.getProducts();
    const filtered = current.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(filtered));
    return true;
  },

  // Registrations
  async getRegistrations(): Promise<Registration[]> {
    try {
      const res = await fetch('/api/registrations');
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(data));
        return data;
      }
    } catch {
      // fallback
    }
    const cached = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    return cached ? JSON.parse(cached) : [];
  },

  async createRegistration(reg: Omit<Registration, 'id' | 'paid' | 'created_at'>): Promise<Registration> {
    try {
      const res = await fetch('/api/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reg)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }
    const newReg: Registration = {
      ...reg,
      id: `reg-${Date.now()}`,
      paid: false,
      completed: false,
      created_at: new Date().toISOString()
    };
    const current = await this.getRegistrations();
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify([newReg, ...current]));
    return newReg;
  },

  async updateRegistration(id: string, updates: Partial<Registration>): Promise<Registration> {
    try {
      const res = await fetch(`/api/registrations/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }
    const current = await this.getRegistrations();
    const updated = current.map(r => r.id === id ? { ...r, ...updates } : r);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));
    return updated.find(r => r.id === id)!;
  },

  async togglePaidStatus(id: string, paid: boolean, notes?: string): Promise<Registration> {
    try {
      const res = await fetch(`/api/registrations/${id}/paid`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paid, notes })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }
    const current = await this.getRegistrations();
    const updated = current.map(r => r.id === id ? { ...r, paid, notes: notes !== undefined ? notes : r.notes } : r);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));
    return updated.find(r => r.id === id)!;
  },

  async toggleCompletedStatus(id: string, completed: boolean, notes?: string): Promise<Registration> {
    try {
      const res = await fetch(`/api/registrations/${id}/completed`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed, notes })
      });
      if (res.ok) {
        return await res.json();
      }
    } catch {
      // fallback
    }
    const current = await this.getRegistrations();
    const updated = current.map(r => r.id === id ? { ...r, completed, notes: notes !== undefined ? notes : r.notes } : r);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(updated));
    return updated.find(r => r.id === id)!;
  },

  async deleteRegistration(id: string): Promise<boolean> {
    try {
      const res = await fetch(`/api/registrations/${id}`, { method: 'DELETE' });
      if (res.ok) return true;
    } catch {
      // fallback
    }
    const current = await this.getRegistrations();
    const filtered = current.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(filtered));
    return true;
  },

  // Admin Auth
  async loginAdmin(password: string): Promise<boolean> {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
          return true;
        }
      }
    } catch {
      // fallback check
    }
    if (password === 'cmn2026' || password === 'admin') {
      sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'authenticated');
      return true;
    }
    return false;
  },

  isAdminAuthenticated(): boolean {
    return Boolean(sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN));
  },

  logoutAdmin(): void {
    sessionStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }
};
