import { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  fetchInquiriesAndQuotes, 
  updateLeadStatus, 
  deleteLead 
} from '../services/inquiryService';
import { 
  getBusinesses, 
  addBusiness, 
  updateBusiness, 
  deleteBusiness 
} from '../services/businessService';
import { isFirebaseConfigured } from '../firebase/config';
import { 
  LogOut, 
  ExternalLink, 
  Inbox, 
  Compass, 
  Activity, 
  Search, 
  MessageCircle, 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit3, 
  MapPin, 
  X, 
  Save, 
  Phone, 
  RefreshCw, 
  Mail, 
  Server
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'directory' | 'telemetry'
  const [leads, setLeads] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);

  // Search & Filters for Leads
  const [leadSearch, setLeadSearch] = useState('');
  const [leadTypeFilter, setLeadTypeFilter] = useState('all'); // 'all' | 'quote' | 'contact'
  const [leadStatusFilter, setLeadStatusFilter] = useState('all'); // 'all' | 'pending_review' | 'in_review' | 'closed_won'

  // Search & Filters for Businesses
  const [bizSearch, setBizSearch] = useState('');
  const [bizCategoryFilter, setBizCategoryFilter] = useState('all');

  // Business Modal (Add / Edit)
  const [isBizModalOpen, setIsBizModalOpen] = useState(false);
  const [editingBizId, setEditingBizId] = useState(null);
  const [bizForm, setBizForm] = useState({
    name: '',
    category: 'food',
    categoryLabelEs: 'Comercio & Gastronomía',
    categoryLabelEn: 'Commerce & Gastronomy',
    whatsapp: '573147809921',
    phone: '+57 314 780 9921',
    address: 'Sector Parque Principal, Marinilla',
    lat: 6.1725,
    lng: -75.3340,
    descriptionEs: '',
    descriptionEn: '',
    websiteUrl: '',
    badge: 'Nodo Verificado',
    rating: 5.0,
    reviews: 1,
    tags: ['Verificado'],
    features: ['Atención Inmediata', 'Pagos Digitales']
  });

  // Load Data
  const loadLeads = async () => {
    setLoadingLeads(true);
    const res = await fetchInquiriesAndQuotes();
    if (res.success) {
      setLeads(res.data);
    }
    setLoadingLeads(false);
  };

  const loadBusinessesData = async () => {
    const list = await getBusinesses();
    setBusinesses(list);
  };

  useEffect(() => {
    loadLeads();
    loadBusinessesData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  // WhatsApp reply handler
  const handleWhatsAppReply = (lead) => {
    const rawPhone = (lead.clientPhone || '').replace(/[^0-9]/g, '');
    const clientName = lead.clientName || 'Estimado(a)';

    let msg = '';
    if (lead.type === 'quote') {
      msg = `¡Hola ${clientName}! 👋 Te saluda la Dirección Ejecutiva de Eternalia Tech Holding respecto a tu cotización para la vertical *${lead.verticalName || 'Tecnológica'}* (Estimado: $${lead.estimatedInvestmentUSD || '0'} USD). Deseamos coordinar una breve sesión para revisar el alcance de tu proyecto. ¿Qué horario te queda cómodo?`;
    } else {
      msg = `¡Hola ${clientName}! 👋 Te saluda la Dirección Ejecutiva de Eternalia Tech Holding. Recibimos tu consulta institucional a través de nuestro portal y deseamos darte atención prioritaria. ¿Podemos conversar unos minutos?`;
    }

    const url = `https://wa.me/${rawPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Toggle / Update lead status
  const handleStatusChange = async (lead, newStatus) => {
    await updateLeadStatus(lead.id, newStatus, lead.type);
    setLeads(prev => prev.map(item => item.id === lead.id ? { ...item, status: newStatus } : item));
  };

  // Delete lead
  const handleDeleteLead = async (lead) => {
    if (window.confirm(`¿Estás seguro de archivar este registro de ${lead.clientName}?`)) {
      await deleteLead(lead.id, lead.type);
      setLeads(prev => prev.filter(item => item.id !== lead.id));
    }
  };

  // Open modal to add business
  const handleOpenAddBiz = () => {
    setEditingBizId(null);
    setBizForm({
      name: '',
      category: 'food',
      categoryLabelEs: 'Comercio & Gastronomía',
      categoryLabelEn: 'Commerce & Gastronomy',
      whatsapp: '573147809921',
      phone: '+57 314 780 9921',
      address: 'Sector Parque Principal, Marinilla',
      lat: 6.1725,
      lng: -75.3340,
      descriptionEs: 'Servicio comercial verificado en la red de Marinilla.',
      descriptionEn: 'Verified commercial node in Marinilla mesh.',
      websiteUrl: '',
      badge: 'Nodo Verificado',
      rating: 5.0,
      reviews: 1,
      tags: ['Verificado', 'Marinilla'],
      features: ['Atención Inmediata', 'Pagos Digitales']
    });
    setIsBizModalOpen(true);
  };

  // Open modal to edit business
  const handleOpenEditBiz = (biz) => {
    setEditingBizId(biz.id);
    setBizForm({
      name: biz.name || '',
      category: biz.category || 'food',
      categoryLabelEs: biz.categoryLabelEs || 'Comercio & Gastronomía',
      categoryLabelEn: biz.categoryLabelEn || 'Commerce & Gastronomy',
      whatsapp: biz.whatsapp || '',
      phone: biz.phone || '',
      address: biz.address || '',
      lat: biz.lat || 6.1725,
      lng: biz.lng || -75.3340,
      descriptionEs: biz.descriptionEs || '',
      descriptionEn: biz.descriptionEn || '',
      websiteUrl: biz.websiteUrl || '',
      badge: biz.badge || 'Nodo Verificado',
      rating: biz.rating || 5.0,
      reviews: biz.reviews || 1,
      tags: biz.tags || ['Verificado'],
      features: biz.features || ['Atención Inmediata']
    });
    setIsBizModalOpen(true);
  };

  // Save business (Add or Edit)
  const handleSaveBiz = async (e) => {
    e.preventDefault();
    if (!bizForm.name.trim()) return;

    if (editingBizId) {
      await updateBusiness(editingBizId, bizForm);
    } else {
      await addBusiness(bizForm);
    }

    setIsBizModalOpen(false);
    await loadBusinessesData();
  };

  // Delete business
  const handleDeleteBiz = async (biz) => {
    if (window.confirm(`¿Eliminar ${biz.name} del directorio y mapa de Marinilla?`)) {
      await deleteBusiness(biz.id);
      await loadBusinessesData();
    }
  };

  // Filtered Leads Calculation
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const matchType = leadTypeFilter === 'all' || l.type === leadTypeFilter;
      const matchStatus = leadStatusFilter === 'all' || l.status === leadStatusFilter;
      const query = leadSearch.toLowerCase().trim();
      if (!query) return matchType && matchStatus;

      const matchText = 
        (l.clientName || '').toLowerCase().includes(query) ||
        (l.clientEmail || '').toLowerCase().includes(query) ||
        (l.clientPhone || '').toLowerCase().includes(query) ||
        (l.verticalName || '').toLowerCase().includes(query) ||
        (l.clientNotes || '').toLowerCase().includes(query) ||
        (l.message || '').toLowerCase().includes(query);

      return matchType && matchStatus && matchText;
    });
  }, [leads, leadTypeFilter, leadStatusFilter, leadSearch]);

  // Filtered Businesses Calculation
  const filteredBusinesses = useMemo(() => {
    return businesses.filter(b => {
      const matchCat = bizCategoryFilter === 'all' || b.category === bizCategoryFilter;
      const query = bizSearch.toLowerCase().trim();
      if (!query) return matchCat;

      const matchText = 
        (b.name || '').toLowerCase().includes(query) ||
        (b.address || '').toLowerCase().includes(query) ||
        (b.descriptionEs || '').toLowerCase().includes(query);

      return matchCat && matchText;
    });
  }, [businesses, bizCategoryFilter, bizSearch]);

  // Metrics KPI calculations
  const totalLeadsCount = leads.length;
  const totalVolumeUSD = leads.reduce((acc, l) => acc + (l.estimatedInvestmentUSD || 0), 0);
  const totalBusinessesCount = businesses.length;

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 flex flex-col font-sans selection:bg-indigo-500/30">
      
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#09090d]/90 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        
        {/* Left Brand Identifier */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1.5px] shadow-[0_0_15px_rgba(99,102,241,0.35)]">
              <div className="w-full h-full bg-[#0d0d12] rounded-[10px] flex items-center justify-center">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base text-white tracking-tight">Eternalia</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold uppercase">
                  Admin OS
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Center / Right Quick Actions */}
        <div className="flex items-center gap-3">
          
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/5 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-200 truncate max-w-[160px]">{user?.email}</span>
            <span className="text-zinc-600">|</span>
            <span className="text-cyan-400">{isFirebaseConfigured ? 'Firebase Cloud' : 'Dev Local Mesh'}</span>
          </div>

          <Link
            to="/"
            target="_blank"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-colors"
            title="Abrir web pública en pestaña nueva"
          >
            <span>Ver Portal Público</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/25 text-xs font-medium transition-colors cursor-pointer"
            title="Cerrar sesión de administrador"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cerrar Sesión</span>
          </button>

        </div>
      </header>

      {/* Main Admin Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          
          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-mono font-semibold uppercase">Total Oportunidades</span>
              <Inbox className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {totalLeadsCount}
            </div>
            <p className="text-[11px] text-zinc-500 font-mono mt-1">
              Cotizaciones & Consultas CRM
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-mono font-semibold uppercase">Volumen Cotizado</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              ${totalVolumeUSD.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">USD</span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono mt-1">
              Estimaciones instantáneas
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-mono font-semibold uppercase">Comercios en Red</span>
              <Compass className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
              {totalBusinessesCount}
            </div>
            <p className="text-[11px] text-zinc-500 font-mono mt-1">
              Nodos activos en Marinilla
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-2">
              <span className="text-xs font-mono font-semibold uppercase">SLA de Respuesta</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono flex items-center gap-1.5">
              <span>&lt; 2 hrs</span>
              <span className="text-xs font-bold text-emerald-400">99.8%</span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono mt-1">
              Objetivo de conversión ejecutiva
            </p>
          </div>

        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
          
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>Bandeja de Leads & Cotizaciones</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'directory'
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Directorio Hiperlocal (Marinilla)</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">
              {businesses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Server className="w-4 h-4" />
            <span>Infraestructura & Clúster</span>
          </button>

        </div>

        {/* TAB 1: LEADS & COTIZACIONES */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Control Bar: Search + Filters */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={leadSearch}
                  onChange={(e) => setLeadSearch(e.target.value)}
                  placeholder="Buscar por cliente, correo, teléfono, vertical o mensaje..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              {/* Type Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                <span className="text-zinc-500 font-mono text-[10px] uppercase font-bold shrink-0">Tipo:</span>
                <button
                  onClick={() => setLeadTypeFilter('all')}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs cursor-pointer ${
                    leadTypeFilter === 'all' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setLeadTypeFilter('quote')}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs cursor-pointer ${
                    leadTypeFilter === 'quote' ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/30' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Cotizaciones
                </button>
                <button
                  onClick={() => setLeadTypeFilter('contact')}
                  className={`px-2.5 py-1 rounded-lg font-mono text-xs cursor-pointer ${
                    leadTypeFilter === 'contact' ? 'bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-500/30' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  Consultas
                </button>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
                <span className="text-zinc-500 font-mono text-[10px] uppercase font-bold shrink-0">Estado:</span>
                <select
                  value={leadStatusFilter}
                  onChange={(e) => setLeadStatusFilter(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-zinc-300 font-mono focus:outline-none"
                >
                  <option value="all">Todos los estados</option>
                  <option value="pending_review">Pendientes</option>
                  <option value="in_review">En Negociación</option>
                  <option value="closed_won">Cerrados / Ganados</option>
                </select>
                <button
                  onClick={loadLeads}
                  className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5"
                  title="Recargar bandeja"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingLeads ? 'animate-spin' : ''}`} />
                </button>
              </div>

            </div>

            {/* Leads List */}
            {loadingLeads ? (
              <div className="p-12 text-center text-zinc-400 font-mono text-xs">
                Cargando oportunidades del CRM...
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="p-12 rounded-2xl bg-zinc-950/40 border border-white/5 text-center text-zinc-400">
                <Inbox className="w-10 h-10 text-zinc-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">No se encontraron registros con los filtros actuales</p>
                <p className="text-xs text-zinc-500 mt-1">Intenta cambiar el término de búsqueda o el filtro de estado.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredLeads.map((lead) => {
                  const isQuote = lead.type === 'quote';
                  return (
                    <div 
                      key={lead.id}
                      className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 hover:border-white/20 transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
                    >
                      {/* Left: Client info and details */}
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                            isQuote 
                              ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' 
                              : 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30'
                          }`}>
                            {isQuote ? 'Cotización Instantánea' : 'Consulta Corporativa'}
                          </span>

                          <span className="text-xs font-mono text-zinc-500">
                            #{lead.id.slice(-8)}
                          </span>

                          <span className="text-[11px] text-zinc-400 font-mono">
                            • {new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <span>{lead.clientName}</span>
                          {lead.estimatedInvestmentUSD && (
                            <span className="text-sm font-mono font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
                              ${lead.estimatedInvestmentUSD.toLocaleString()} USD
                            </span>
                          )}
                        </h3>

                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                          {lead.clientEmail && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5 text-zinc-500" />
                              <a href={`mailto:${lead.clientEmail}`} className="hover:text-cyan-400 transition-colors">
                                {lead.clientEmail}
                              </a>
                            </span>
                          )}
                          {lead.clientPhone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3.5 h-3.5 text-zinc-500" />
                              <span>{lead.clientPhone}</span>
                            </span>
                          )}
                          {isQuote && lead.verticalName && (
                            <span className="text-indigo-300 font-semibold">
                              Vertical: {lead.verticalName} ({lead.tierName})
                            </span>
                          )}
                        </div>

                        {/* Notes or Message */}
                        {(lead.clientNotes || lead.message) && (
                          <p className="text-xs text-zinc-300 bg-zinc-900/60 p-2.5 rounded-xl border border-white/5 mt-2 italic">
                            "{lead.clientNotes || lead.message}"
                          </p>
                        )}
                      </div>

                      {/* Right: Status selector and actions */}
                      <div className="flex flex-wrap lg:flex-col items-end gap-2 shrink-0 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-white/5">
                        
                        <div className="flex items-center gap-2">
                          <select
                            value={lead.status || 'pending_review'}
                            onChange={(e) => handleStatusChange(lead, e.target.value)}
                            className={`text-xs font-mono font-semibold rounded-xl px-2.5 py-1.5 border focus:outline-none cursor-pointer ${
                              lead.status === 'closed_won' 
                                ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                : lead.status === 'in_review'
                                ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                                : 'bg-zinc-900 text-zinc-300 border-white/10'
                            }`}
                          >
                            <option value="pending_review">🟡 Pendiente</option>
                            <option value="in_review">🔵 En Negociación</option>
                            <option value="closed_won">🟢 Cerrado / Ganado</option>
                          </select>

                          <button
                            onClick={() => handleDeleteLead(lead)}
                            className="p-1.5 rounded-xl bg-zinc-900 hover:bg-rose-500/20 text-zinc-500 hover:text-rose-400 border border-white/5 transition-colors cursor-pointer"
                            title="Archivar lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {lead.clientPhone && (
                          <button
                            onClick={() => handleWhatsAppReply(lead)}
                            className="w-full lg:w-auto py-2 px-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Responder por WhatsApp</span>
                          </button>
                        )}

                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* TAB 2: DIRECTORIO HIPERLOCAL CRUD */}
        {activeTab === 'directory' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Control Bar: Search + Add Button */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={bizSearch}
                  onChange={(e) => setBizSearch(e.target.value)}
                  placeholder="Buscar comercio por nombre o dirección en Marinilla..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={bizCategoryFilter}
                  onChange={(e) => setBizCategoryFilter(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 font-mono focus:outline-none"
                >
                  <option value="all">Todas las categorías</option>
                  <option value="food">Gastronomía</option>
                  <option value="nursery">Viveros & Agro</option>
                  <option value="services">Servicios</option>
                  <option value="automotive">Automotriz</option>
                </select>

                <button
                  onClick={handleOpenAddBiz}
                  className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Agregar Comercio</span>
                </button>
              </div>

            </div>

            {/* Businesses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredBusinesses.map((biz) => (
                <div 
                  key={biz.id}
                  className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/25">
                        {biz.categoryLabelEs || biz.category}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        Lat: {biz.lat}, Lng: {biz.lng}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">
                      {biz.name}
                    </h4>

                    <p className="text-xs text-zinc-400 mb-2 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{biz.address}</span>
                    </p>

                    <p className="text-xs text-zinc-300 line-clamp-2 mb-4">
                      {biz.descriptionEs || biz.descriptionEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{biz.whatsapp}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenEditBiz(biz)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/5 transition-colors cursor-pointer"
                        title="Editar comercio"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteBiz(biz)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border border-white/5 transition-colors cursor-pointer"
                        title="Eliminar comercio"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: INFRAESTRUCTURA & CLÚSTER */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-3xl bg-zinc-950/70 border border-white/10">
              <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
                <Server className="w-4 h-4 text-cyan-400" />
                <span>Estado de Conexión del Clúster</span>
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Parámetros de conexión a la nube y auditoría de la sesión administrativa.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
                <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Base de Datos</span>
                  <span className="text-white font-bold text-sm block mt-1">
                    {isFirebaseConfigured ? 'Firebase Cloud Firestore' : 'Modo Simulación Activo'}
                  </span>
                  <span className="text-emerald-400 text-[10px] mt-1 block">● Conexión Estable</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Autenticación</span>
                  <span className="text-white font-bold text-sm block mt-1">
                    {user?.email}
                  </span>
                  <span className="text-cyan-400 text-[10px] mt-1 block">Rol: Super Administrador</span>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/50 border border-white/5">
                  <span className="text-zinc-500 block text-[10px] uppercase font-bold">Hosting & Despliegue</span>
                  <span className="text-white font-bold text-sm block mt-1">
                    Firebase Hosting / Vercel
                  </span>
                  <span className="text-indigo-400 text-[10px] mt-1 block">Dominio: SPA Routing Ready</span>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Business Modal (Add / Edit) */}
      {isBizModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-8">
            
            <button
              onClick={() => setIsBizModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-wider block mb-1">
                {editingBizId ? 'MODIFICAR REGISTRO' : 'NUEVO NODO COMERCIAL'}
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                {editingBizId ? 'Editar Comercio en Marinilla' : 'Agregar Comercio a la Red'}
              </h2>
            </div>

            <form onSubmit={handleSaveBiz} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1">Nombre Comercial *</label>
                <input
                  type="text"
                  required
                  value={bizForm.name}
                  onChange={(e) => setBizForm({ ...bizForm, name: e.target.value })}
                  placeholder="ej. Restaurante El Balcón de Marinilla"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Categoría</label>
                  <select
                    value={bizForm.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const labels = {
                        food: { es: 'Comercio & Gastronomía', en: 'Commerce & Gastronomy' },
                        nursery: { es: 'Viveros & Agro', en: 'Nurseries & Agro' },
                        services: { es: 'Servicios Profesionales', en: 'Professional Services' },
                        automotive: { es: 'Automotriz & Logística', en: 'Automotive & Logistics' }
                      };
                      setBizForm({
                        ...bizForm,
                        category: cat,
                        categoryLabelEs: labels[cat]?.es || 'Comercio',
                        categoryLabelEn: labels[cat]?.en || 'Commerce'
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none"
                  >
                    <option value="food">Comercio & Gastronomía</option>
                    <option value="nursery">Viveros & Agro</option>
                    <option value="services">Servicios Profesionales</option>
                    <option value="automotive">Automotriz & Logística</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">WhatsApp (con código país)</label>
                  <input
                    type="text"
                    required
                    value={bizForm.whatsapp}
                    onChange={(e) => setBizForm({ ...bizForm, whatsapp: e.target.value })}
                    placeholder="573147809921"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Dirección Física</label>
                  <input
                    type="text"
                    value={bizForm.address}
                    onChange={(e) => setBizForm({ ...bizForm, address: e.target.value })}
                    placeholder="Cra 30 #28-15, Marinilla"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Web / Landing Page (opcional)</label>
                  <input
                    type="url"
                    value={bizForm.websiteUrl}
                    onChange={(e) => setBizForm({ ...bizForm, websiteUrl: e.target.value })}
                    placeholder="https://micomerio.eternalia.co"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Latitud (Mapa)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={bizForm.lat}
                    onChange={(e) => setBizForm({ ...bizForm, lat: parseFloat(e.target.value) || 6.1725 })}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Longitud (Mapa)</label>
                  <input
                    type="number"
                    step="0.0001"
                    value={bizForm.lng}
                    onChange={(e) => setBizForm({ ...bizForm, lng: parseFloat(e.target.value) || -75.3340 })}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1">Descripción del Comercio</label>
                <textarea
                  rows={2}
                  value={bizForm.descriptionEs}
                  onChange={(e) => setBizForm({ ...bizForm, descriptionEs: e.target.value, descriptionEn: e.target.value })}
                  placeholder="Describe la propuesta gastronómica, productos o servicios..."
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsBizModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.4)] cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar en Directorio</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}
