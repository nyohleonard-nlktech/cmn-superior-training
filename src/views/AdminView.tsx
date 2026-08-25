import React, { useState, useEffect } from 'react';
import { Language, Product, Registration, SiteSettings, TrainingAnnouncement } from '../types';
import { translations } from '../translations';
import { 
  ShieldCheck, 
  Lock, 
  Users, 
  Megaphone, 
  ShoppingBag, 
  Settings, 
  Key, 
  LogOut, 
  Check, 
  X, 
  Search, 
  Filter, 
  MessageCircle, 
  Trash2, 
  Edit, 
  Plus, 
  Save, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  MapPin,
  Calendar,
  DollarSign,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  Phone,
  BookOpen,
  HelpCircle,
  ArrowRight,
  UserCheck,
  CreditCard,
  GraduationCap,
  Loader2,
  UploadCloud,
  AlertTriangle
} from 'lucide-react';
import { api } from '../services/api';
import { getOptimizedImageUrl } from '../utils/imageUrl';
import { APP_IMAGES } from '../assets/images';
import { buildAdminToRegistrantWhatsAppUrl } from '../utils/whatsapp';
import { uploadProductImage, isSupabaseConfigured, BUCKET_NAME } from '../utils/storage';

interface AdminViewProps {
  lang: Language;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  announcement: TrainingAnnouncement;
  setAnnouncement: React.Dispatch<React.SetStateAction<TrainingAnnouncement>>;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const AdminView: React.FC<AdminViewProps> = ({
  lang,
  settings,
  setSettings,
  announcement,
  setAnnouncement,
  products,
  setProducts
}) => {
  const t = translations[lang].admin;

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'registrations' | 'announcements' | 'products' | 'settings' | 'security' | 'guide'>('registrations');

  // Registrations State
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [regSearch, setRegSearch] = useState('');
  const [regFilter, setRegFilter] = useState<'all' | 'paid' | 'unpaid' | 'completed' | 'adjustments'>('all');
  const [loadingRegs, setLoadingRegs] = useState(false);

  // Edit Registrant State
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [regEditForm, setRegEditForm] = useState<Partial<Registration>>({});
  const [regEditSavedAlert, setRegEditSavedAlert] = useState(false);
  const [isSavingRegEdit, setIsSavingRegEdit] = useState(false);

  // Delete Registrant State (In-App Modal)
  const [deletingRegistration, setDeletingRegistration] = useState<Registration | null>(null);
  const [isDeletingReg, setIsDeletingReg] = useState(false);

  // Announcement Form State
  const [annForm, setAnnForm] = useState<TrainingAnnouncement>(announcement);
  const [annSavedAlert, setAnnSavedAlert] = useState(false);

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(settings);
  const [settingsSavedAlert, setSettingsSavedAlert] = useState(false);

  // Product Editor State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productSavedAlert, setProductSavedAlert] = useState(false);
  const [productForm, setProductForm] = useState<Omit<Product, 'id'>>({
    name_en: '',
    name_fr: '',
    price: 3500,
    description_en: '',
    description_fr: '',
    photo_url: '/images/raw_materials_1787567125868.jpg',
    category: 'soap',
    in_stock: true,
    unit: '1 unit'
  });
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState<string | null>(null);
  const [photoUploadSuccess, setPhotoUploadSuccess] = useState(false);

  // Password Change State
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Check auth on mount
  useEffect(() => {
    if (api.isAdminAuthenticated()) {
      setIsAuthenticated(true);
      fetchRegistrations();
    }
  }, []);

  useEffect(() => {
    setAnnForm(announcement);
  }, [announcement]);

  useEffect(() => {
    setSettingsForm(settings);
  }, [settings]);

  const fetchRegistrations = async () => {
    setLoadingRegs(true);
    try {
      const data = await api.getRegistrations();
      setRegistrations(data);
    } catch (err) {
      console.error('Failed to fetch registrations:', err);
    } finally {
      setLoadingRegs(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(false);
    const success = await api.loginAdmin(passwordInput);
    if (success) {
      setIsAuthenticated(true);
      fetchRegistrations();
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    api.logoutAdmin();
    setIsAuthenticated(false);
    setPasswordInput('');
  };

  // Toggle paid status
  const handleTogglePaid = async (regId: string, currentPaid: boolean) => {
    const updated = await api.togglePaidStatus(regId, !currentPaid);
    setRegistrations(prev => prev.map(r => r.id === regId ? updated : r));
  };

  // Toggle completed training status
  const handleToggleCompleted = async (regId: string, currentCompleted: boolean | undefined) => {
    const updated = await api.toggleCompletedStatus(regId, !currentCompleted);
    setRegistrations(prev => prev.map(r => r.id === regId ? updated : r));
  };

  // Open Edit Registrant Modal
  const handleStartEditRegistration = (reg: Registration) => {
    setEditingRegistration(reg);
    setRegEditForm({
      name: reg.name || '',
      phone: reg.phone || '',
      location: reg.location || '',
      training_interest: reg.training_interest || 'All 4 Production Masterclasses',
      preferred_month: reg.preferred_month || '',
      preferred_location: reg.preferred_location || reg.location || '',
      about: reg.about || '',
      paid: reg.paid ?? false,
      completed: reg.completed ?? false,
      notes: reg.notes || ''
    });
  };

  // Save Edit Registrant Changes
  const handleSaveRegistrationEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRegistration) return;
    setIsSavingRegEdit(true);
    try {
      const updated = await api.updateRegistration(editingRegistration.id, regEditForm);
      setRegistrations(prev => prev.map(r => r.id === editingRegistration.id ? updated : r));
      setEditingRegistration(null);
      setRegEditSavedAlert(true);
      setTimeout(() => setRegEditSavedAlert(false), 4000);
    } catch (err) {
      console.error('Failed to update registration:', err);
    } finally {
      setIsSavingRegEdit(false);
    }
  };

  // Trigger Delete Confirmation Modal
  const handlePromptDeleteRegistration = (reg: Registration) => {
    setDeletingRegistration(reg);
  };

  // Confirm and Execute Permanent Deletion
  const handleConfirmDeleteRegistration = async () => {
    if (!deletingRegistration) return;
    setIsDeletingReg(true);
    try {
      await api.deleteRegistration(deletingRegistration.id);
      setRegistrations(prev => prev.filter(r => r.id !== deletingRegistration.id));
      setDeletingRegistration(null);
    } catch (err) {
      console.error('Failed to delete registration:', err);
    } finally {
      setIsDeletingReg(false);
    }
  };

  // Handle direct binary image upload via Supabase Storage
  const handlePhotoFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    setPhotoUploadError(null);
    setPhotoUploadSuccess(false);

    try {
      const publicUrl = await uploadProductImage(file);
      setProductForm(prev => ({
        ...prev,
        photo_url: publicUrl
      }));
      setPhotoUploadSuccess(true);
      setTimeout(() => setPhotoUploadSuccess(false), 5000);
    } catch (err: any) {
      console.error('Binary image upload failed:', err);
      setPhotoUploadError(err.message || 'Failed to upload image to Supabase Storage.');
    } finally {
      setIsUploadingPhoto(false);
      // Reset input value so same file can be re-selected if required
      e.target.value = '';
    }
  };

  // Save Announcement
  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await api.updateAnnouncement(annForm);
    setAnnouncement(updated);
    setAnnSavedAlert(true);
    setTimeout(() => setAnnSavedAlert(false), 4000);
  };

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await api.updateSettings(settingsForm);
    setSettings(updated);
    setSettingsSavedAlert(true);
    setTimeout(() => setSettingsSavedAlert(false), 4000);
  };

  // Save Product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const updated = await api.updateProduct(editingProduct.id, productForm);
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? updated : p));
      setEditingProduct(null);
    } else {
      const created = await api.createProduct(productForm);
      setProducts(prev => [created, ...prev]);
      setIsAddingProduct(false);
    }
    setProductSavedAlert(true);
    setTimeout(() => setProductSavedAlert(false), 4000);
  };

  // Start editing product
  const startEditProduct = (prod: Product) => {
    setProductForm({
      name_en: prod.name_en,
      name_fr: prod.name_fr,
      price: prod.price,
      description_en: prod.description_en,
      description_fr: prod.description_fr,
      photo_url: prod.photo_url,
      category: prod.category,
      in_stock: prod.in_stock,
      unit: prod.unit || '1 unit'
    });
    setEditingProduct(prod);
    setIsAddingProduct(false);
    // Scroll to form smoothly
    setTimeout(() => {
      const el = document.getElementById('product-editor-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 50);
  };

  // Delete Product
  const handleDeleteProduct = async (prodId: string) => {
    if (window.confirm(t.products_manager.delete_confirm)) {
      await api.deleteProduct(prodId);
      setProducts(prev => prev.filter(p => p.id !== prodId));
    }
  };

  // Change Password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError(t.change_password.password_mismatch);
      return;
    }

    try {
      const res = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword })
      });
      if (res.ok) {
        setPasswordSuccess(true);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setPasswordError('Failed to change password');
      }
    } catch {
      setPasswordSuccess(true);
    }
  };

  // Filter registrations
  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = 
      r.name.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.phone.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.location.toLowerCase().includes(regSearch.toLowerCase()) ||
      (r.preferred_location || '').toLowerCase().includes(regSearch.toLowerCase()) ||
      (r.training_interest || '').toLowerCase().includes(regSearch.toLowerCase());

    if (!matchesSearch) return false;

    if (regFilter === 'paid') return r.paid;
    if (regFilter === 'unpaid') return !r.paid;
    if (regFilter === 'completed') return Boolean(r.completed);
    if (regFilter === 'adjustments') {
      const hasLocAdjustment = r.preferred_location && r.preferred_location.toLowerCase() !== r.location.toLowerCase();
      const hasMonthAdjustment = r.preferred_month && !r.preferred_month.toLowerCase().includes('upcoming');
      return Boolean(hasLocAdjustment || hasMonthAdjustment);
    }

    return true;
  });

  const totalPaid = registrations.filter(r => r.paid).length;
  const totalCompleted = registrations.filter(r => r.completed).length;
  const totalPending = registrations.filter(r => !r.paid).length;
  const adjustmentRequests = registrations.filter(r => 
    (r.preferred_location && r.preferred_location.toLowerCase() !== r.location.toLowerCase()) ||
    (r.preferred_month && !r.preferred_month.toLowerCase().includes('upcoming'))
  ).length;

  const presetPhotos = [
    { label: 'Soap Bars', url: APP_IMAGES.soap_production },
    { label: 'Raw Chemicals / Oils', url: APP_IMAGES.raw_materials },
    { label: 'Chocolate Craft', url: APP_IMAGES.chocolate_craft },
    { label: 'Ovaltine Powder', url: APP_IMAGES.ovaltine_malt },
    { label: 'Spaghetti Pasta', url: APP_IMAGES.spaghetti_making }
  ];

  // If not logged in, show Password prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37] p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-[#24140D] text-[#E5C158] flex items-center justify-center mx-auto shadow-md border-2 border-[#D4AF37]">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="font-brand font-bold text-2xl text-[#24140D]">
              {t.login_title}
            </h2>
            <p className="text-xs sm:text-sm text-[#735A4A]">
              {t.login_subtitle}
            </p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{t.invalid_password}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#8A5B18] uppercase tracking-wider">
                {t.password_label}
              </label>
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder={t.password_placeholder}
                required
                className="w-full px-4 py-3 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] focus:outline-none focus:border-[#D4AF37]"
              />
              <div className="text-[11px] text-[#A8907E] italic">
                {lang === 'fr' ? 'Mot de passe par défaut : cmn2026' : 'Default password: cmn2026'}
              </div>
            </div>

            <button
              id="admin-login-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C59B27] hover:from-[#E5C158] hover:to-[#D4AF37] text-[#24140D] font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              {t.login_btn}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header Bar */}
      <div className="bg-gradient-to-r from-[#24130A] via-[#331C11] to-[#24130A] text-[#FFFDF9] rounded-3xl p-6 border-2 border-[#D4AF37] shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-xs uppercase font-extrabold text-[#D4AF37] tracking-wider">
              {lang === 'fr' ? 'Session Authentifiée' : 'Secure Admin Session'}
            </span>
          </div>
          <h1 className="font-brand font-bold text-2xl sm:text-3xl text-[#FFFDF9]">
            {t.title}
          </h1>
          <p className="text-xs sm:text-sm text-[#D8C7B5]">
            {t.subtitle}
          </p>
        </div>

        <button
          id="admin-logout-btn"
          type="button"
          onClick={handleLogout}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-[#3D2214] hover:bg-[#4D2E1F] border border-[#D4AF37]/40 text-[#FFFDF9] text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-[#D4AF37]" />
          <span>{t.logout}</span>
        </button>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8D9C8] shadow-sm">
          <div className="text-[11px] sm:text-xs text-[#735A4A] font-semibold">{t.stats.total_registrations}</div>
          <div className="font-brand font-extrabold text-xl sm:text-2xl text-[#24140D] mt-1">{registrations.length}</div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-emerald-300 shadow-sm">
          <div className="text-[11px] sm:text-xs text-emerald-800 font-semibold">{t.stats.paid_registrations}</div>
          <div className="font-brand font-extrabold text-xl sm:text-2xl text-emerald-700 mt-1">{totalPaid}</div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-teal-300 shadow-sm">
          <div className="text-[11px] sm:text-xs text-teal-800 font-semibold">{t.stats.completed_registrations}</div>
          <div className="font-brand font-extrabold text-xl sm:text-2xl text-teal-700 mt-1">{totalCompleted}</div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-amber-300 shadow-sm">
          <div className="text-[11px] sm:text-xs text-amber-800 font-semibold">{t.stats.pending_payment}</div>
          <div className="font-brand font-extrabold text-xl sm:text-2xl text-amber-700 mt-1">{totalPending}</div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-indigo-200 shadow-sm">
          <div className="text-[11px] sm:text-xs text-indigo-800 font-semibold">{t.stats.location_adjustments}</div>
          <div className="font-brand font-extrabold text-xl sm:text-2xl text-indigo-700 mt-1">{adjustmentRequests}</div>
        </div>

        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF9] border border-[#E8D9C8] shadow-sm">
          <div className="text-[11px] sm:text-xs text-[#735A4A] font-semibold">{t.stats.total_products}</div>
          <div className="font-brand font-extrabold text-xl sm:text-2xl text-[#24140D] mt-1">{products.length}</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E8D9C8] pb-2">
        <button
          id="admin-tab-registrations"
          type="button"
          onClick={() => setActiveTab('registrations')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'registrations'
              ? 'bg-[#24140D] text-[#E5C158] shadow'
              : 'bg-[#F5EDE1] text-[#634E3F] hover:bg-[#E8DAC8]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.tabs.registrations} ({registrations.length})</span>
        </button>

        <button
          id="admin-tab-announcements"
          type="button"
          onClick={() => setActiveTab('announcements')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'announcements'
              ? 'bg-[#24140D] text-[#E5C158] shadow'
              : 'bg-[#F5EDE1] text-[#634E3F] hover:bg-[#E8DAC8]'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>{t.tabs.announcements}</span>
        </button>

        <button
          id="admin-tab-products"
          type="button"
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'products'
              ? 'bg-[#24140D] text-[#E5C158] shadow'
              : 'bg-[#F5EDE1] text-[#634E3F] hover:bg-[#E8DAC8]'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>{t.tabs.products}</span>
        </button>

        <button
          id="admin-tab-settings"
          type="button"
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'settings'
              ? 'bg-[#24140D] text-[#E5C158] shadow'
              : 'bg-[#F5EDE1] text-[#634E3F] hover:bg-[#E8DAC8]'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>{t.tabs.settings}</span>
        </button>

        <button
          id="admin-tab-security"
          type="button"
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'security'
              ? 'bg-[#24140D] text-[#E5C158] shadow'
              : 'bg-[#F5EDE1] text-[#634E3F] hover:bg-[#E8DAC8]'
          }`}
        >
          <Key className="w-4 h-4" />
          <span>{t.tabs.security}</span>
        </button>

        <button
          id="admin-tab-guide"
          type="button"
          onClick={() => setActiveTab('guide')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
            activeTab === 'guide'
              ? 'bg-[#8A5B18] text-white shadow'
              : 'bg-[#FAF5EE] text-[#8A5B18] border border-[#D9C4B0] hover:bg-[#F0E5D5]'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{t.tabs.guide}</span>
        </button>
      </div>

      {/* TAB 1: REGISTRATIONS */}
      {activeTab === 'registrations' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="bg-[#FFFDF9] p-4 rounded-2xl border border-[#E8D9C8] flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <button
                type="button"
                onClick={() => setRegFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  regFilter === 'all' ? 'bg-[#24140D] text-[#E5C158]' : 'bg-[#F5EDE1] text-[#634E3F]'
                }`}
              >
                {t.reg_table.filter_all}
              </button>
              <button
                type="button"
                onClick={() => setRegFilter('paid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  regFilter === 'paid' ? 'bg-emerald-700 text-white' : 'bg-[#F5EDE1] text-[#634E3F]'
                }`}
              >
                {t.reg_table.filter_paid} ({totalPaid})
              </button>
              <button
                type="button"
                onClick={() => setRegFilter('unpaid')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  regFilter === 'unpaid' ? 'bg-amber-700 text-white' : 'bg-[#F5EDE1] text-[#634E3F]'
                }`}
              >
                {t.reg_table.filter_unpaid} ({totalPending})
              </button>
              <button
                type="button"
                onClick={() => setRegFilter('completed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  regFilter === 'completed' ? 'bg-teal-700 text-white' : 'bg-[#F5EDE1] text-[#634E3F]'
                }`}
              >
                {t.reg_table.filter_completed} ({totalCompleted})
              </button>
              <button
                type="button"
                onClick={() => setRegFilter('adjustments')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  regFilter === 'adjustments' ? 'bg-indigo-700 text-white' : 'bg-[#F5EDE1] text-[#634E3F]'
                }`}
              >
                {t.reg_table.filter_adjustments} ({adjustmentRequests})
              </button>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-[#8A7160] absolute left-3 top-3" />
              <input
                type="text"
                value={regSearch}
                onChange={e => setRegSearch(e.target.value)}
                placeholder={t.reg_table.search_placeholder}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-xs sm:text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {regEditSavedAlert && (
            <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-in fade-in shadow-sm">
              <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>{t.reg_table.edit_saved_success}</span>
            </div>
          )}

          {/* Desktop Table View (Hidden on mobile) */}
          <div className="hidden md:block bg-[#FFFDF9] rounded-3xl border border-[#E8D9C8] shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-[#24140D]">
                <thead className="bg-[#F8F1E7] border-b border-[#E8D9C8] text-[#8A5B18] uppercase tracking-wider font-extrabold text-[11px]">
                  <tr>
                    <th className="p-4">{t.reg_table.th_date}</th>
                    <th className="p-4">{t.reg_table.th_name}</th>
                    <th className="p-4">{t.reg_table.th_phone}</th>
                    <th className="p-4">{t.reg_table.th_location}</th>
                    <th className="p-4">{t.reg_table.th_interest}</th>
                    <th className="p-4">{t.reg_table.th_month} / Pref</th>
                    <th className="p-4">{t.reg_table.th_about}</th>
                    <th className="p-4">{t.reg_table.th_status}</th>
                    <th className="p-4">{t.reg_table.th_completed}</th>
                    <th className="p-4 text-right">{t.reg_table.th_actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E4D8]">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="p-8 text-center text-[#735A4A]">
                        {t.reg_table.no_registrations}
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map(reg => {
                      const chatUrl = buildAdminToRegistrantWhatsAppUrl(reg.phone, reg.name, reg.preferred_month);
                      const isAdjustment = 
                        (reg.preferred_location && reg.preferred_location.toLowerCase() !== reg.location.toLowerCase()) ||
                        (reg.preferred_month && !reg.preferred_month.toLowerCase().includes('upcoming'));

                      return (
                        <tr key={reg.id} className="hover:bg-[#FAF5EE] transition-colors">
                          {/* Date */}
                          <td className="p-4 text-xs text-[#8A7160] whitespace-nowrap">
                            {new Date(reg.created_at).toLocaleDateString()}
                          </td>

                          {/* Name */}
                          <td className="p-4 font-bold text-[#24140D] whitespace-nowrap">
                            {reg.name}
                            {isAdjustment && (
                              <span className="block text-[10px] text-indigo-700 font-bold">
                                {t.reg_table.adjustment_badge}
                              </span>
                            )}
                          </td>

                          {/* Phone / Click to chat */}
                          <td className="p-4 whitespace-nowrap">
                            <a
                              href={chatUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold hover:bg-emerald-100 transition-colors"
                              title={t.reg_table.click_to_chat}
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{reg.phone}</span>
                            </a>
                          </td>

                          {/* Location */}
                          <td className="p-4 text-xs text-[#5C4537]">
                            <div className="font-semibold">{reg.location}</div>
                            {reg.preferred_location && reg.preferred_location !== reg.location && (
                              <div className="text-[11px] text-indigo-700 font-medium">
                                Pref: {reg.preferred_location}
                              </div>
                            )}
                          </td>

                          {/* Training Interest */}
                          <td className="p-4 text-xs font-medium text-[#4E3B2F]">
                            {reg.training_interest || 'All Modules'}
                          </td>

                          {/* Preferred Month */}
                          <td className="p-4 text-xs text-[#5C4537]">
                            {reg.preferred_month || 'Next Session'}
                          </td>

                          {/* About */}
                          <td className="p-4 text-xs text-[#634E3F] max-w-xs truncate" title={reg.about}>
                            {reg.about || '—'}
                          </td>

                          {/* Paid Status Toggle */}
                          <td className="p-4 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleTogglePaid(reg.id, reg.paid)}
                              className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer ${
                                reg.paid
                                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                                  : 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                              }`}
                            >
                              {reg.paid ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>{t.reg_table.paid_label}</span>
                                </>
                              ) : (
                                <>
                                  <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                                  <span>{t.reg_table.unpaid_label}</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Training Completed Status Toggle */}
                          <td className="p-4 whitespace-nowrap">
                            <button
                              type="button"
                              onClick={() => handleToggleCompleted(reg.id, reg.completed)}
                              className={`px-3 py-1 rounded-full text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer ${
                                reg.completed
                                  ? 'bg-teal-600 text-white hover:bg-teal-700'
                                  : 'bg-stone-100 text-stone-700 border border-stone-300 hover:bg-stone-200'
                              }`}
                            >
                              {reg.completed ? (
                                <>
                                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                                  <span>{t.reg_table.completed_label}</span>
                                </>
                              ) : (
                                <>
                                  <span className="w-2 h-2 rounded-full bg-stone-400"></span>
                                  <span>{t.reg_table.in_progress_label}</span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Actions (Edit and Delete buttons) */}
                          <td className="p-4 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleStartEditRegistration(reg)}
                                className="px-2.5 py-1.5 rounded-lg bg-[#FAF5EE] hover:bg-[#F0E5D5] border border-[#D9C4B0] text-[#24140D] hover:text-[#8A5B18] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                                title={t.reg_table.edit_btn}
                              >
                                <Edit className="w-3.5 h-3.5 text-[#8A5B18]" />
                                <span>{t.reg_table.edit_btn}</span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handlePromptDeleteRegistration(reg)}
                                className="p-1.5 rounded-lg text-[#A8907E] hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
                                title={t.reg_table.delete_btn}
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Registration Cards (Optimized for phones) */}
          <div className="block md:hidden space-y-4">
            {filteredRegistrations.length === 0 ? (
              <div className="p-8 text-center text-[#735A4A] bg-[#FFFDF9] rounded-2xl border border-[#E8D9C8]">
                {t.reg_table.no_registrations}
              </div>
            ) : (
              filteredRegistrations.map(reg => {
                const chatUrl = buildAdminToRegistrantWhatsAppUrl(reg.phone, reg.name, reg.preferred_month);
                const isAdjustment = 
                  (reg.preferred_location && reg.preferred_location.toLowerCase() !== reg.location.toLowerCase()) ||
                  (reg.preferred_month && !reg.preferred_month.toLowerCase().includes('upcoming'));

                return (
                  <div
                    key={reg.id}
                    className="p-5 rounded-2xl bg-[#FFFDF9] border border-[#E8D9C8] shadow-md space-y-4"
                  >
                    {/* Header: Name, date, badge, action buttons */}
                    <div className="flex items-start justify-between gap-2 border-b border-[#F0E4D8] pb-3">
                      <div>
                        <h4 className="font-bold text-base text-[#24140D]">{reg.name}</h4>
                        <div className="text-xs text-[#8A7160] mt-0.5">
                          {new Date(reg.created_at).toLocaleDateString()}
                        </div>
                        {isAdjustment && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                            {t.reg_table.adjustment_badge}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleStartEditRegistration(reg)}
                          className="px-2.5 py-1.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-[#24140D] hover:text-[#8A5B18] transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                          title={t.reg_table.edit_btn}
                        >
                          <Edit className="w-3.5 h-3.5 text-[#8A5B18]" />
                          <span>{t.reg_table.edit_btn}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handlePromptDeleteRegistration(reg)}
                          className="p-1.5 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 transition-colors flex items-center justify-center text-xs font-bold cursor-pointer"
                          title={t.reg_table.delete_btn}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 text-xs text-[#5C4537]">
                      <div>
                        <span className="font-bold text-[#8A5B18]">{t.reg_table.th_interest}: </span>
                        <span className="font-semibold text-[#24140D]">{reg.training_interest || 'All Modules'}</span>
                      </div>
                      <div>
                        <span className="font-bold text-[#8A5B18]">{t.reg_table.th_location}: </span>
                        <span>{reg.location}</span>
                        {reg.preferred_location && reg.preferred_location !== reg.location && (
                          <span className="text-indigo-700 font-semibold block">
                            Pref: {reg.preferred_location}
                          </span>
                        )}
                      </div>
                      <div>
                        <span className="font-bold text-[#8A5B18]">{t.reg_table.th_month}: </span>
                        <span>{reg.preferred_month || 'Next Session'}</span>
                      </div>
                      {reg.about && (
                        <div>
                          <span className="font-bold text-[#8A5B18]">{t.reg_table.th_about}: </span>
                          <span className="italic">{reg.about}</span>
                        </div>
                      )}
                    </div>

                    {/* Direct Contact Action */}
                    <div className="flex items-center gap-2 pt-1">
                      <a
                        href={chatUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{reg.phone} (WhatsApp)</span>
                      </a>
                      <a
                        href={`tel:${reg.phone}`}
                        className="py-2.5 px-3 rounded-xl bg-[#FAF5EE] hover:bg-[#F0E5D5] border border-[#D9C4B0] text-[#24140D] font-bold text-xs flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#8A5B18]" />
                        <span>Call</span>
                      </a>
                    </div>

                    {/* Toggles: Paid & Completed */}
                    <div className="pt-2 border-t border-[#F0E4D8] grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleTogglePaid(reg.id, reg.paid)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer ${
                          reg.paid
                            ? 'bg-emerald-600 text-white'
                            : 'bg-amber-100 text-amber-900 border border-amber-300'
                        }`}
                      >
                        {reg.paid ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.reg_table.paid_label}</span>
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                            <span>{t.reg_table.unpaid_label}</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleCompleted(reg.id, reg.completed)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95 cursor-pointer ${
                          reg.completed
                            ? 'bg-teal-600 text-white'
                            : 'bg-stone-100 text-stone-700 border border-stone-300'
                        }`}
                      >
                        {reg.completed ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            <span>{t.reg_table.completed_label}</span>
                          </>
                        ) : (
                          <>
                            <span className="w-2 h-2 rounded-full bg-stone-400"></span>
                            <span>{t.reg_table.in_progress_label}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ANNOUNCEMENT */}
      {activeTab === 'announcements' && (
        <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E8D9C8] p-6 sm:p-8 shadow-xl max-w-3xl mx-auto space-y-6">
          <div className="space-y-1">
            <h2 className="font-brand font-bold text-2xl text-[#24140D]">
              {t.announcement_form.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#735A4A]">
              {t.announcement_form.desc}
            </p>
          </div>

          {annSavedAlert && (
            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>{t.announcement_form.saved_success}</span>
            </div>
          )}

          <form onSubmit={handleSaveAnnouncement} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#8A5B18]">
                {t.announcement_form.period_en}
              </label>
              <input
                type="text"
                value={annForm.period_text_en}
                onChange={e => setAnnForm({ ...annForm, period_text_en: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#8A5B18]">
                {t.announcement_form.period_fr}
              </label>
              <input
                type="text"
                value={annForm.period_text_fr}
                onChange={e => setAnnForm({ ...annForm, period_text_fr: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#8A5B18]">
                {t.announcement_form.location_en}
              </label>
              <input
                type="text"
                value={annForm.location_en}
                onChange={e => setAnnForm({ ...annForm, location_en: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#8A5B18]">
                {t.announcement_form.location_fr}
              </label>
              <input
                type="text"
                value={annForm.location_fr}
                onChange={e => setAnnForm({ ...annForm, location_fr: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] focus:border-[#D4AF37] outline-none"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="ann-active-toggle"
                checked={annForm.active}
                onChange={e => setAnnForm({ ...annForm, active: e.target.checked })}
                className="w-4 h-4 rounded text-[#D4AF37] accent-[#D4AF37]"
              />
              <label htmlFor="ann-active-toggle" className="text-xs sm:text-sm font-semibold text-[#24140D] cursor-pointer">
                {t.announcement_form.active_label}
              </label>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#24140D] hover:bg-[#3D2214] text-[#E5C158] font-bold text-sm shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{t.announcement_form.save_btn}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 3: PRODUCTS */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="font-brand font-bold text-2xl text-[#24140D]">
                {t.products_manager.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#735A4A]">
                {t.products_manager.subtitle}
              </p>
            </div>

            {!isAddingProduct && !editingProduct && (
              <button
                type="button"
                onClick={() => {
                  setProductForm({
                    name_en: '',
                    name_fr: '',
                    price: 3500,
                    description_en: '',
                    description_fr: '',
                    photo_url: '/images/raw_materials_1787567125868.jpg',
                    category: 'soap',
                    in_stock: true,
                    unit: '1 unit'
                  });
                  setIsAddingProduct(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-[#24140D] hover:bg-[#3D2214] text-[#E5C158] font-bold text-xs sm:text-sm shadow flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>{t.products_manager.add_new}</span>
              </button>
            )}
          </div>

          {productSavedAlert && (
            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>{lang === 'fr' ? 'Article enregistré avec succès ! Mis à jour sur tout le site.' : 'Product saved successfully! Updated everywhere across the site.'}</span>
            </div>
          )}

          {/* Add / Edit Product Form Drawer */}
          {(isAddingProduct || editingProduct) && (
            <div 
              id="product-editor-form" 
              className="bg-[#FFFDF9] rounded-3xl border-2 border-[#D4AF37] p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in"
            >
              <div className="flex items-center justify-between border-b border-[#F0E4D8] pb-4">
                <div>
                  <h3 className="font-brand font-bold text-xl sm:text-2xl text-[#24140D]">
                    {editingProduct ? (lang === 'fr' ? `Modifier : ${editingProduct.name_fr || editingProduct.name_en}` : `Edit: ${editingProduct.name_en}`) : t.products_manager.add_new}
                  </h3>
                  <p className="text-xs text-[#735A4A] mt-0.5">
                    {lang === 'fr' ? 'Modifiez le nom, le prix, la description ou la photo de l’article.' : 'Update the name, price, description, or replace the photo of this product.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }}
                  className="p-2 rounded-xl text-[#735A4A] hover:bg-[#F5EDE1] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-5">
                {/* Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#8A5B18]">{t.products_manager.name_en} *</label>
                    <input
                      type="text"
                      value={productForm.name_en}
                      onChange={e => setProductForm({ ...productForm, name_en: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#8A5B18]">{t.products_manager.name_fr} *</label>
                    <input
                      type="text"
                      value={productForm.name_fr}
                      onChange={e => setProductForm({ ...productForm, name_fr: e.target.value })}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Price, Category, Unit */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#8A5B18]">{t.products_manager.price} (FCFA) *</label>
                    <input
                      type="number"
                      value={productForm.price}
                      onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      required
                      min={0}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#8A5B18]">{t.products_manager.category} *</label>
                    <select
                      value={productForm.category}
                      onChange={e => setProductForm({ ...productForm, category: e.target.value as any })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                    >
                      <option value="soap">Soap (Savon)</option>
                      <option value="raw_material">Raw Material (Matières Premières)</option>
                      <option value="food_ingredients">Food & Chocolate (Alimentaire)</option>
                      <option value="equipment">Equipment & Molds (Équipement & Moules)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#8A5B18]">{t.products_manager.unit}</label>
                    <input
                      type="text"
                      value={productForm.unit || ''}
                      onChange={e => setProductForm({ ...productForm, unit: e.target.value })}
                      placeholder="e.g. 1kg, 5L, Pack of 5"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Photo replacement & upload */}
                <div className="space-y-3 p-4 rounded-2xl bg-[#F8F2E9] border border-[#E0D0BE]">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="block text-xs font-bold text-[#8A5B18] uppercase tracking-wider">
                      {lang === 'fr' ? 'Photo de l’Article (Supabase Storage ou URL)' : 'Product Photo (Supabase Storage or CDN URL)'}
                    </label>
                    <span className="text-[11px] px-2 py-0.5 rounded-full font-medium bg-[#EAE0D2] text-[#5C4537]">
                      {isSupabaseConfigured() 
                        ? `Supabase: ${BUCKET_NAME} (Max 5MB)` 
                        : (lang === 'fr' ? 'Supabase non configuré (utilisez URL directe)' : 'Supabase not configured (use direct URL)')}
                    </span>
                  </div>

                  {/* Upload error banner */}
                  {photoUploadError && (
                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-900 space-y-1 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5 font-bold">
                        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                        <span>{photoUploadError}</span>
                      </div>
                      <p className="text-[11px] text-amber-800 leading-relaxed">
                        {lang === 'fr'
                          ? 'Vérifiez que VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont définis dans votre fichier .env et que le bucket "product-assets" autorise les téléversements publics.'
                          : 'Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are defined in your environment variables, and the "product-assets" storage bucket is created with public read access in Supabase.'}
                      </p>
                    </div>
                  )}

                  {/* Upload success banner */}
                  {photoUploadSuccess && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in duration-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-semibold">
                        {lang === 'fr'
                          ? 'Fichier binaire téléversé avec succès sur Supabase CDN !'
                          : 'Binary image uploaded to Supabase CDN successfully!'}
                      </span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Live Preview */}
                    <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#24140D] border-2 border-[#D4AF37] overflow-hidden shrink-0 shadow-md relative ${isUploadingPhoto ? 'animate-pulse' : ''}`}>
                      {productForm.photo_url ? (
                        <img
                          src={getOptimizedImageUrl(productForm.photo_url)}
                          alt="Product preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[#A8907E] text-[10px]">
                          <ImageIcon className="w-6 h-6 mb-1" />
                          <span>No Image</span>
                        </div>
                      )}
                      {isUploadingPhoto && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center text-[#E5C158]">
                          <Loader2 className="w-6 h-6 animate-spin mb-1" />
                          <span className="text-[9px] font-bold">Uploading</span>
                        </div>
                      )}
                    </div>

                    {/* Upload button & presets */}
                    <div className="space-y-2 flex-1 w-full">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className={`px-4 py-2.5 rounded-xl text-xs font-bold shadow flex items-center gap-2 transition-all ${
                          isUploadingPhoto 
                            ? 'bg-[#3D2214] text-[#E5C158]/70 cursor-not-allowed'
                            : 'bg-[#24140D] hover:bg-[#3D2214] text-[#E5C158] cursor-pointer'
                        }`}>
                          {isUploadingPhoto ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-[#E5C158]" />
                              <span>{lang === 'fr' ? 'Téléversement en cours...' : 'Uploading to Supabase...'}</span>
                            </>
                          ) : (
                            <>
                              <UploadCloud className="w-4 h-4" />
                              <span>{lang === 'fr' ? 'Téléverser Image (Supabase)' : 'Upload to Supabase'}</span>
                            </>
                          )}
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploadingPhoto}
                            onChange={handlePhotoFileUpload}
                            className="hidden"
                          />
                        </label>

                        <span className="text-xs text-[#735A4A]">
                          {lang === 'fr' ? 'ou choisissez une photo prédéfinie :' : 'or choose a preset:'}
                        </span>
                      </div>

                      {/* Presets */}
                      <div className="flex flex-wrap gap-1.5">
                        {presetPhotos.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => setProductForm({ ...productForm, photo_url: preset.url })}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
                              productForm.photo_url === preset.url
                                ? 'bg-[#24140D] text-[#E5C158] border-[#D4AF37]'
                                : 'bg-[#FFFDF9] text-[#634E3F] border-[#D9C4B0] hover:bg-[#FAF5EE]'
                            }`}
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-1">
                        <input
                          type="text"
                          value={productForm.photo_url}
                          onChange={e => setProductForm({ ...productForm, photo_url: e.target.value })}
                          placeholder={t.products_manager.photo_url}
                          className="w-full px-3 py-2 rounded-xl bg-[#FFFDF9] border border-[#D9C4B0] text-xs text-[#24140D] outline-none font-mono"
                        />
                        <p className="text-[10px] text-[#735A4A]">
                          {lang === 'fr' 
                            ? 'Lien CDN public permanent ou URL externe (ex: https://.../product-assets/...)'
                            : 'Permanent public CDN URL or external image link (e.g. https://.../product-assets/...)'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#8A5B18]">{t.products_manager.desc_en}</label>
                    <textarea
                      rows={2}
                      value={productForm.description_en}
                      onChange={e => setProductForm({ ...productForm, description_en: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none resize-none"
                    ></textarea>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#8A5B18]">{t.products_manager.desc_fr}</label>
                    <textarea
                      rows={2}
                      value={productForm.description_fr}
                      onChange={e => setProductForm({ ...productForm, description_fr: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none resize-none"
                    ></textarea>
                  </div>
                </div>

                {/* Save & Cancel */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#24140D] hover:bg-[#3D2214] text-[#E5C158] font-bold text-sm shadow-md transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>{t.products_manager.save}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditingProduct(null); setIsAddingProduct(false); }}
                    className="px-5 py-3 rounded-xl bg-[#F5EDE1] text-[#634E3F] font-bold text-sm hover:bg-[#E8DAC8] transition-colors cursor-pointer"
                  >
                    {t.products_manager.cancel}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Product Cards List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(prod => (
              <div
                key={prod.id}
                id={`admin-product-card-${prod.id}`}
                className="bg-[#FFFDF9] rounded-2xl border border-[#E8D9C8] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="h-44 bg-[#24140D] overflow-hidden relative">
                    <img src={getOptimizedImageUrl(prod.photo_url)} alt={prod.name_en} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute top-2 left-2 bg-[#24140D]/90 text-[#E5C158] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase border border-[#D4AF37]/30">
                      {prod.category}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="font-bold text-lg text-[#24140D]">
                      {prod.price.toLocaleString()} XAF
                      {prod.unit && <span className="text-xs text-[#735A4A] font-normal ml-1">/ {prod.unit}</span>}
                    </div>
                    <div className="font-semibold text-sm text-[#24140D] line-clamp-1">
                      {lang === 'fr' ? prod.name_fr : prod.name_en}
                    </div>
                    <div className="text-xs text-[#735A4A] line-clamp-2">
                      {lang === 'fr' ? prod.description_fr : prod.description_en}
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 flex items-center justify-between border-t border-[#F0E4D8] mt-2">
                  <button
                    id={`admin-edit-prod-btn-${prod.id}`}
                    type="button"
                    onClick={() => startEditProduct(prod)}
                    className="px-3.5 py-2 rounded-xl bg-[#FAF5EE] hover:bg-[#F0E5D5] text-[#24140D] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#D9C4B0]"
                  >
                    <Edit className="w-3.5 h-3.5 text-[#8A5B18]" />
                    <span>{t.products_manager.edit}</span>
                  </button>

                  <button
                    id={`admin-delete-prod-btn-${prod.id}`}
                    type="button"
                    onClick={() => handleDeleteProduct(prod.id)}
                    className="px-3.5 py-2 rounded-xl text-red-700 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.products_manager.delete}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E8D9C8] p-6 sm:p-8 shadow-xl max-w-3xl mx-auto space-y-6">
          <div className="space-y-1">
            <h2 className="font-brand font-bold text-2xl text-[#24140D]">
              {t.settings_form.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#735A4A]">
              {t.settings_form.subtitle}
            </p>
          </div>

          {settingsSavedAlert && (
            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>{t.settings_form.saved_success}</span>
            </div>
          )}

          <form onSubmit={handleSaveSettings} className="space-y-4">
            {/* WhatsApp Community Group Link */}
            <div className="space-y-1.5 bg-[#FDF8F0] p-4 rounded-2xl border border-[#E8D9C8]">
              <label className="block text-xs font-extrabold text-[#8A5B18] uppercase tracking-wider">
                {t.settings_form.community_link_label}
              </label>
              <input
                type="url"
                value={settingsForm.whatsapp_community_link}
                onChange={e => setSettingsForm({ ...settingsForm, whatsapp_community_link: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D9C4B0] text-sm text-[#24140D] focus:border-[#D4AF37] outline-none font-mono"
              />
              <p className="text-[11px] text-emerald-800 font-medium">
                {t.settings_form.community_link_help}
              </p>
            </div>

            {/* Admin WhatsApp Phone Number */}
            <div className="space-y-1.5 bg-[#FDF8F0] p-4 rounded-2xl border border-[#E8D9C8]">
              <label className="block text-xs font-extrabold text-[#8A5B18] uppercase tracking-wider">
                {t.settings_form.admin_phone_label}
              </label>
              <input
                type="text"
                value={settingsForm.whatsapp_admin_phone}
                onChange={e => setSettingsForm({ ...settingsForm, whatsapp_admin_phone: e.target.value })}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D9C4B0] text-sm text-[#24140D] focus:border-[#D4AF37] outline-none font-mono"
              />
              <p className="text-[11px] text-[#735A4A]">
                {t.settings_form.admin_phone_help}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#8A5B18]">{t.settings_form.company_name_label}</label>
                <input
                  type="text"
                  value={settingsForm.company_name}
                  onChange={e => setSettingsForm({ ...settingsForm, company_name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#8A5B18]">{t.settings_form.email_label}</label>
                <input
                  type="email"
                  value={settingsForm.email}
                  onChange={e => setSettingsForm({ ...settingsForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#8A5B18]">{t.settings_form.address_en_label}</label>
              <input
                type="text"
                value={settingsForm.address_en}
                onChange={e => setSettingsForm({ ...settingsForm, address_en: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#8A5B18]">{t.settings_form.address_fr_label}</label>
              <input
                type="text"
                value={settingsForm.address_fr}
                onChange={e => setSettingsForm({ ...settingsForm, address_fr: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none"
              />
            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#24140D] hover:bg-[#3D2214] text-[#E5C158] font-bold text-sm shadow-md transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>{t.settings_form.save_btn}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 5: SECURITY */}
      {activeTab === 'security' && (
        <div className="bg-[#FFFDF9] rounded-3xl border-2 border-[#E8D9C8] p-6 sm:p-8 shadow-xl max-w-md mx-auto space-y-6">
          <div className="space-y-1">
            <h2 className="font-brand font-bold text-2xl text-[#24140D]">
              {t.change_password.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#735A4A]">
              {t.change_password.subtitle}
            </p>
          </div>

          {passwordSuccess && (
            <div className="p-4 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 text-sm font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span>{t.change_password.password_updated}</span>
            </div>
          )}

          {passwordError && (
            <div className="p-3.5 rounded-xl bg-red-100 border border-red-300 text-red-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#8A5B18] uppercase">
                {t.change_password.new_password_label}
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#8A5B18] uppercase">
                {t.change_password.confirm_password_label}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#24140D] text-[#E5C158] font-bold text-sm shadow hover:bg-[#3D2214] transition-colors"
              >
                {t.change_password.change_btn}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 6: ADMIN GUIDE & HELP */}
      {activeTab === 'guide' && (
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Header Banner */}
          <div className="bg-[#24140D] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#D4AF37]/40 shadow-xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5C158]/20 border border-[#E5C158]/40 text-[#E5C158] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{t.admin_guide.badge}</span>
              </div>
              <h2 className="font-brand font-extrabold text-2xl sm:text-3xl text-[#E5C158]">
                {t.admin_guide.title}
              </h2>
              <p className="text-sm sm:text-base text-[#D9C4B0] max-w-2xl leading-relaxed">
                {t.admin_guide.subtitle}
              </p>
            </div>
          </div>

          {/* Quick-Reference Cheat Sheet Table */}
          <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8D9C8] p-6 sm:p-8 shadow-md space-y-4">
            <div className="flex items-center gap-3 border-b border-[#E8D9C8] pb-3">
              <div className="p-2.5 rounded-xl bg-[#FAF5EE] text-[#8A5B18] border border-[#D9C4B0]">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-brand font-bold text-lg text-[#24140D]">
                  {t.admin_guide.quick_table.title}
                </h3>
                <p className="text-xs text-[#735A4A]">
                  {t.admin_guide.quick_table.subtitle}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E8D9C8] bg-[#FAF5EE] text-[11px] font-extrabold uppercase text-[#8A5B18]">
                    <th className="p-3.5">{t.admin_guide.quick_table.th_action}</th>
                    <th className="p-3.5">{t.admin_guide.quick_table.th_tab}</th>
                    <th className="p-3.5">{t.admin_guide.quick_table.th_steps}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0E4D8] text-xs text-[#3D2B1F]">
                  {t.admin_guide.quick_table.rows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF6F0] transition-colors">
                      <td className="p-3.5 font-bold text-[#24140D]">
                        {row.action}
                      </td>
                      <td className="p-3.5 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg bg-[#EAE0D2] font-semibold text-[#5C4537] text-[11px]">
                          {row.tab}
                        </span>
                      </td>
                      <td className="p-3.5 text-[#5C4537] font-medium leading-relaxed">
                        {row.steps}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section Guide Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Section 1: Logging In & Security */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8D9C8] p-6 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-100 text-[#8A5B18] border border-amber-200">
                    <Lock className="w-5 h-5" />
                  </div>
                  <h3 className="font-brand font-bold text-base sm:text-lg text-[#24140D]">
                    {t.admin_guide.sections.login.title}
                  </h3>
                </div>
                <p className="text-xs text-[#735A4A] leading-relaxed">
                  {t.admin_guide.sections.login.desc}
                </p>
                <ul className="space-y-2 text-xs text-[#4E3B2F]">
                  {t.admin_guide.sections.login.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#8A5B18] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-[#F0E4D8]">
                <button
                  type="button"
                  onClick={() => setActiveTab('security')}
                  className="text-xs font-bold text-[#8A5B18] hover:text-[#5C3D10] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Go to Security Tab</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Section 2: Managing Registrations */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8D9C8] p-6 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-brand font-bold text-base sm:text-lg text-[#24140D]">
                    {t.admin_guide.sections.registrations.title}
                  </h3>
                </div>
                <p className="text-xs text-[#735A4A] leading-relaxed">
                  {t.admin_guide.sections.registrations.desc}
                </p>
                <ul className="space-y-2 text-xs text-[#4E3B2F]">
                  {t.admin_guide.sections.registrations.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-700 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-[#F0E4D8]">
                <button
                  type="button"
                  onClick={() => setActiveTab('registrations')}
                  className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Go to Registrations Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Section 3: Managing Products & Raw Materials */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8D9C8] p-6 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-800 border border-indigo-200">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="font-brand font-bold text-base sm:text-lg text-[#24140D]">
                    {t.admin_guide.sections.products.title}
                  </h3>
                </div>
                <p className="text-xs text-[#735A4A] leading-relaxed">
                  {t.admin_guide.sections.products.desc}
                </p>
                <ul className="space-y-2 text-xs text-[#4E3B2F]">
                  {t.admin_guide.sections.products.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-indigo-700 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-[#F0E4D8]">
                <button
                  type="button"
                  onClick={() => setActiveTab('products')}
                  className="text-xs font-bold text-indigo-800 hover:text-indigo-950 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Go to Products Manager</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Section 4: Posting Next Training Announcements */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8D9C8] p-6 shadow-md space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-100 text-purple-800 border border-purple-200">
                    <Megaphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-brand font-bold text-base sm:text-lg text-[#24140D]">
                    {t.admin_guide.sections.announcements.title}
                  </h3>
                </div>
                <p className="text-xs text-[#735A4A] leading-relaxed">
                  {t.admin_guide.sections.announcements.desc}
                </p>
                <ul className="space-y-2 text-xs text-[#4E3B2F]">
                  {t.admin_guide.sections.announcements.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-700 font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-[#F0E4D8]">
                <button
                  type="button"
                  onClick={() => setActiveTab('announcements')}
                  className="text-xs font-bold text-purple-800 hover:text-purple-950 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Go to Announcements</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Section 5: Updating WhatsApp Community Link & Site Settings */}
            <div className="bg-[#FFFDF9] rounded-3xl border border-[#E8D9C8] p-6 shadow-md space-y-4 flex flex-col justify-between md:col-span-2">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[#F5EDE1] text-[#24140D] border border-[#D9C4B0]">
                    <Settings className="w-5 h-5" />
                  </div>
                  <h3 className="font-brand font-bold text-base sm:text-lg text-[#24140D]">
                    {t.admin_guide.sections.settings.title}
                  </h3>
                </div>
                <p className="text-xs text-[#735A4A] leading-relaxed">
                  {t.admin_guide.sections.settings.desc}
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#4E3B2F]">
                  {t.admin_guide.sections.settings.bullets.map((bullet, idx) => (
                    <li key={idx} className="p-3 rounded-xl bg-[#FAF5EE] border border-[#EAE0D2] flex items-start gap-2">
                      <span className="text-[#8A5B18] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-3 border-t border-[#F0E4D8]">
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="text-xs font-bold text-[#8A5B18] hover:text-[#5C3D10] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Go to Site Settings</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT REGISTRANT MODAL */}
      {editingRegistration && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] w-full max-w-xl rounded-3xl border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden my-8">
            {/* Modal Header */}
            <div className="bg-[#24140D] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#E5C158] text-xs font-bold uppercase tracking-wider">
                  <Edit className="w-4 h-4" />
                  <span>{t.reg_table.edit_btn}</span>
                </div>
                <h3 className="font-brand font-bold text-lg sm:text-xl text-white">
                  {t.reg_table.edit_modal_title}
                </h3>
                <p className="text-xs text-[#D9C4B0]">
                  {t.reg_table.edit_modal_subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setEditingRegistration(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveRegistrationEdit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#8A5B18]">
                    {t.reg_table.th_name} *
                  </label>
                  <input
                    type="text"
                    required
                    value={regEditForm.name || ''}
                    onChange={e => setRegEditForm({ ...regEditForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Phone / WhatsApp */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#8A5B18]">
                    {t.reg_table.th_phone} *
                  </label>
                  <input
                    type="text"
                    required
                    value={regEditForm.phone || ''}
                    onChange={e => setRegEditForm({ ...regEditForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Location */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#8A5B18]">
                    {t.reg_table.th_location} *
                  </label>
                  <input
                    type="text"
                    required
                    value={regEditForm.location || ''}
                    onChange={e => setRegEditForm({ ...regEditForm, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Preferred Location */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#8A5B18]">
                    {t.reg_table.th_pref_loc}
                  </label>
                  <input
                    type="text"
                    value={regEditForm.preferred_location || ''}
                    onChange={e => setRegEditForm({ ...regEditForm, preferred_location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Preferred Month */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-bold text-[#8A5B18]">
                    {t.reg_table.th_month}
                  </label>
                  <input
                    type="text"
                    value={regEditForm.preferred_month || ''}
                    onChange={e => setRegEditForm({ ...regEditForm, preferred_month: e.target.value })}
                    placeholder="e.g. Next Upcoming Session, March 2026, April 2026..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* Training Interest */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-bold text-[#8A5B18]">
                    {t.reg_table.th_interest}
                  </label>
                  <input
                    type="text"
                    value={regEditForm.training_interest || ''}
                    onChange={e => setRegEditForm({ ...regEditForm, training_interest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                  />
                </div>

                {/* About / Description */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-bold text-[#8A5B18]">
                    {t.reg_table.th_about}
                  </label>
                  <textarea
                    rows={3}
                    value={regEditForm.about || ''}
                    onChange={e => setRegEditForm({ ...regEditForm, about: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-sm text-[#24140D] outline-none focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              {/* Status Checkboxes */}
              <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#D9C4B0] space-y-3">
                <div className="text-xs font-bold text-[#8A5B18] uppercase tracking-wide">
                  Statuses & Progress
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!regEditForm.paid}
                      onChange={e => setRegEditForm({ ...regEditForm, paid: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-600 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-[#24140D]">
                      {t.reg_table.paid_label}
                    </span>
                  </label>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!regEditForm.completed}
                      onChange={e => setRegEditForm({ ...regEditForm, completed: e.target.checked })}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500 accent-teal-600 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-[#24140D]">
                      {t.reg_table.completed_label}
                    </span>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#F0E4D8]">
                <button
                  type="button"
                  onClick={() => setEditingRegistration(null)}
                  className="px-5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-[#5C4537] text-xs font-bold hover:bg-[#F0E5D5] transition-colors cursor-pointer"
                >
                  {t.reg_table.cancel_btn}
                </button>
                <button
                  type="submit"
                  disabled={isSavingRegEdit}
                  className="px-6 py-2.5 rounded-xl bg-[#24140D] hover:bg-[#3D2214] text-[#E5C158] text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingRegEdit ? 'Saving...' : t.reg_table.save_btn}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingRegistration && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#FFFDF9] w-full max-w-md rounded-3xl border-2 border-red-300 shadow-2xl overflow-hidden">
            <div className="p-6 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1.5">
                <h3 className="font-brand font-bold text-lg text-[#24140D]">
                  {t.reg_table.delete_modal_title}
                </h3>
                <p className="text-xs text-[#735A4A] leading-relaxed">
                  {t.reg_table.delete_modal_prompt}{' '}
                  <strong className="text-[#24140D] font-extrabold">{deletingRegistration.name}</strong> ({deletingRegistration.phone}) ?
                </p>
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-[11px] font-semibold text-left">
                  {t.reg_table.delete_modal_warning}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingRegistration(null)}
                  disabled={isDeletingReg}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#FAF5EE] border border-[#D9C4B0] text-[#5C4537] text-xs font-bold hover:bg-[#F0E5D5] transition-colors cursor-pointer"
                >
                  {t.reg_table.cancel_btn}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDeleteRegistration}
                  disabled={isDeletingReg}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{isDeletingReg ? 'Deleting...' : t.reg_table.delete_modal_confirm_btn}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
