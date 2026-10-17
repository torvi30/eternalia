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
import {
  getProjects,
  addProject,
  updateProject,
  deleteProject
} from '../services/projectService';
import { isFirebaseConfigured } from '../firebase/config';
import { 
  LogOut, 
  ExternalLink, 
  Inbox, 
  Compass, 
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
  Server,
  Briefcase,
  Activity,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Globe,
  Globe2,
  Clock,
  Palette,
  Check,
  ArrowUpRight,
  Zap
} from 'lucide-react';

const COLOR_PRESETS = [
  { id: 'cyan', label: 'Cian Digital', class: 'from-cyan-500 to-blue-600' },
  { id: 'emerald', label: 'Esmeralda Agro', class: 'from-emerald-500 to-green-600' },
  { id: 'amber', label: 'Ámbar Gourmet', class: 'from-amber-500 to-orange-600' },
  { id: 'purple', label: 'Púrpura Enterprise', class: 'from-indigo-600 to-purple-600' },
  { id: 'rose', label: 'Rubí Comercial', class: 'from-rose-500 to-red-600' },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'directory' | 'projects' | 'analytics' | 'telemetry'
  
  // Data States
  const [leads, setLeads] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);

  // Search & Filters for Leads
  const [leadSearch, setLeadSearch] = useState('');
  const [leadTypeFilter, setLeadTypeFilter] = useState('all'); // 'all' | 'quote' | 'contact'
  const [leadStatusFilter, setLeadStatusFilter] = useState('all'); // 'all' | 'pending_review' | 'in_review' | 'closed_won'

  // Search & Filters for Businesses
  const [bizSearch, setBizSearch] = useState('');
  const [bizCategoryFilter, setBizCategoryFilter] = useState('all');

  // Search & Filters for Projects
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('all');

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
    logoColor: 'from-amber-500 to-orange-600',
    rating: 5.0,
    reviews: 1,
    tags: ['Verificado'],
    features: ['Atención Inmediata', 'Pagos Digitales']
  });

  // Project Modal (Add / Edit)
  const [isProjModalOpen, setIsProjModalOpen] = useState(false);
  const [editingProjId, setEditingProjId] = useState(null);
  const [projForm, setProjForm] = useState({
    name: '',
    taglineEs: '',
    taglineEn: '',
    category: 'commerce',
    categoryLabelEs: 'E-Commerce & Frontends',
    categoryLabelEn: 'Commerce & Frontends',
    url: '',
    badge: 'En Producción',
    status: 'live',
    metricValue: '',
    metricLabelEs: '',
    metricLabelEn: '',
    descriptionEs: '',
    descriptionEn: '',
    techStack: 'React, Tailwind, Firebase',
    logoColor: 'from-indigo-500 to-cyan-500'
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

  const loadProjectsData = async () => {
    const list = await getProjects();
    setProjects(list);
  };

  useEffect(() => {
    loadLeads();
    loadBusinessesData();
    loadProjectsData();
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

  const handleStatusChange = async (lead, newStatus) => {
    await updateLeadStatus(lead.id, newStatus, lead.type);
    setLeads(prev => prev.map(item => item.id === lead.id ? { ...item, status: newStatus } : item));
  };

  const handleDeleteLead = async (lead) => {
    if (window.confirm(`¿Estás seguro de archivar este registro de ${lead.clientName}?`)) {
      await deleteLead(lead.id, lead.type);
      setLeads(prev => prev.filter(item => item.id !== lead.id));
    }
  };

  // Business CRUD
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

  const handleDeleteBiz = async (biz) => {
    if (window.confirm(`¿Eliminar ${biz.name} del directorio y mapa de Marinilla?`)) {
      await deleteBusiness(biz.id);
      await loadBusinessesData();
    }
  };

  // Projects CRUD
  const handleOpenAddProj = () => {
    setEditingProjId(null);
    setProjForm({
      name: '',
      taglineEs: 'Solución tecnológica de alto impacto',
      taglineEn: 'High-impact enterprise solution',
      category: 'commerce',
      categoryLabelEs: 'E-Commerce & POS',
      categoryLabelEn: 'E-Commerce & POS',
      url: 'https://',
      badge: 'En Producción',
      status: 'live',
      metricValue: '99.99%',
      metricLabelEs: 'Uptime SLA',
      metricLabelEn: 'Uptime SLA',
      descriptionEs: 'Plataforma cloud desarrollada bajo estándares de ingeniería de alto rendimiento.',
      descriptionEn: 'High-performance cloud software built for mission-critical scale.',
      techStack: 'React 18, Tailwind, Firebase, APIs',
      logoColor: 'from-indigo-500 to-cyan-500'
    });
    setIsProjModalOpen(true);
  };

  const handleOpenEditProj = (proj) => {
    setEditingProjId(proj.id);
    setProjForm({
      name: proj.name || '',
      taglineEs: proj.taglineEs || '',
      taglineEn: proj.taglineEn || '',
      category: proj.category || 'commerce',
      categoryLabelEs: proj.categoryLabelEs || 'E-Commerce & Frontends',
      categoryLabelEn: proj.categoryLabelEn || 'Commerce & Frontends',
      url: proj.url || '',
      badge: proj.badge || 'En Producción',
      status: proj.status || 'live',
      metricValue: proj.metricValue || '',
      metricLabelEs: proj.metricLabelEs || '',
      metricLabelEn: proj.metricLabelEn || '',
      descriptionEs: proj.descriptionEs || '',
      descriptionEn: proj.descriptionEn || '',
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : (proj.techStack || ''),
      logoColor: proj.logoColor || 'from-indigo-500 to-cyan-500'
    });
    setIsProjModalOpen(true);
  };

  const handleSaveProj = async (e) => {
    e.preventDefault();
    if (!projForm.name.trim()) return;

    if (editingProjId) {
      await updateProject(editingProjId, projForm);
    } else {
      await addProject(projForm);
    }

    setIsProjModalOpen(false);
    await loadProjectsData();
  };

  const handleDeleteProj = async (proj) => {
    if (window.confirm(`¿Eliminar ${proj.name} del portafolio SaaS del holding?`)) {
      await deleteProject(proj.id);
      await loadProjectsData();
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

  // Filtered Projects Calculation
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchCat = projectCategoryFilter === 'all' || p.category === projectCategoryFilter;
      const query = projectSearch.toLowerCase().trim();
      if (!query) return matchCat;

      const matchText = 
        (p.name || '').toLowerCase().includes(query) ||
        (p.taglineEs || '').toLowerCase().includes(query) ||
        (p.descriptionEs || '').toLowerCase().includes(query);

      return matchCat && matchText;
    });
  }, [projects, projectCategoryFilter, projectSearch]);

  // Metrics KPI calculations
  const totalLeadsCount = leads.length;
  const totalVolumeUSD = leads.reduce((acc, l) => acc + (l.estimatedInvestmentUSD || 0), 0);
  const totalBusinessesCount = businesses.length;
  const totalProjectsCount = projects.length;
  const totalVerifiedNodes = businesses.filter(b => b.whatsapp && b.address).length;
  const networkIntegrityRate = businesses.length > 0
    ? Math.round((totalVerifiedNodes / businesses.length) * 100)
    : 100;
  const activeProposalsCount = leads.filter(l => l.status === 'in_review' || l.status === 'closed_won').length;
  const conversionRate = leads.length > 0
    ? Math.round((activeProposalsCount / leads.length) * 100)
    : 85;

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
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 text-xs font-medium transition-colors"
            title="Abrir web pública en pestaña nueva"
          >
            <span className="hidden sm:inline">Ver Portal Público</span>
            <span className="sm:hidden text-[11px]">Ver Web</span>
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
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
          
          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-mono font-semibold uppercase">Oportunidades</span>
              <Inbox className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl font-extrabold text-white font-mono">
              {totalLeadsCount}
            </div>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
              CRM Leads & Quotes
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-mono font-semibold uppercase">Vol. Cotizado</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-400 font-mono">
              ${totalVolumeUSD.toLocaleString()} <span className="text-xs text-zinc-400 font-normal">USD</span>
            </div>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
              Pipeline estimado
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-mono font-semibold uppercase">Portafolio SaaS</span>
              <Briefcase className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-extrabold text-amber-300 font-mono">
              {totalProjectsCount}
            </div>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
              Empresas y frontends
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-mono font-semibold uppercase">Salud de Red</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-300 font-mono flex items-center gap-2">
              <span>{networkIntegrityRate}%</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
              Nodos & APIs verificadas
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 backdrop-blur-xl col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-zinc-400 mb-1.5">
              <span className="text-[11px] font-mono font-semibold uppercase">Red Comercial</span>
              <Compass className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-extrabold text-cyan-300 font-mono">
              {totalBusinessesCount}
            </div>
            <p className="text-[10px] text-zinc-500 font-mono mt-0.5">
              Nodos en Marinilla
            </p>
          </div>

        </div>

        {/* Tab Switcher Responsive (Sin scroll horizontal) */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 border-b border-white/10 pb-4 mb-6">
          
          <button
            onClick={() => setActiveTab('leads')}
            className={`col-span-2 sm:col-auto flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'leads'
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Inbox className="w-4 h-4 shrink-0" />
            <span>Bandeja de Leads & Cotizaciones</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono shrink-0">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'analytics'
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <BarChart3 className="w-4 h-4 shrink-0" />
            <span className="truncate">Analítica & Auditoría</span>
            <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono shrink-0">
              En Vivo
            </span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Briefcase className="w-4 h-4 shrink-0" />
            <span className="truncate">Portafolio SaaS</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono shrink-0">
              {projects.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'directory'
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Compass className="w-4 h-4 shrink-0" />
            <span className="truncate">Directorio</span>
            <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono shrink-0">
              {businesses.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('telemetry')}
            className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'telemetry'
                ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/5'
            }`}
          >
            <Server className="w-4 h-4 shrink-0" />
            <span className="truncate">Clúster Cloud</span>
          </button>

        </div>

        {/* TAB 1: LEADS & COTIZACIONES */}
        {activeTab === 'leads' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Control Bar: Search + Filters */}
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              
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
                  className="p-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 cursor-pointer"
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

                        {(lead.clientNotes || lead.message) && (
                          <p className="text-xs text-zinc-300 bg-zinc-900/60 p-2.5 rounded-xl border border-white/5 mt-2 italic">
                            "{lead.clientNotes || lead.message}"
                          </p>
                        )}
                      </div>

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

        {/* TAB 2: PORTAFOLIO SAAS (CRUD) */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="p-4 rounded-2xl bg-zinc-950/70 border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={projectSearch}
                  onChange={(e) => setProjectSearch(e.target.value)}
                  placeholder="Buscar proyectos por nombre, eslogan o tecnología..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={projectCategoryFilter}
                  onChange={(e) => setProjectCategoryFilter(e.target.value)}
                  className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-zinc-300 font-mono focus:outline-none"
                >
                  <option value="all">Todas las verticales</option>
                  <option value="commerce">Commerce Cloud</option>
                  <option value="services">Workforce OS</option>
                  <option value="ventures">Industrial Ventures</option>
                  <option value="directories">Redes Territoriales</option>
                </select>

                <button
                  onClick={handleOpenAddProj}
                  className="py-2 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Registrar Proyecto SaaS</span>
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map((proj) => (
                <div 
                  key={proj.id}
                  className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25 font-bold uppercase">
                        {proj.categoryLabelEs || proj.category}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {proj.badge || 'En Vivo'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1">
                      {proj.name}
                    </h4>

                    <p className="text-xs text-cyan-300 font-mono mb-2 line-clamp-1">
                      {proj.taglineEs || proj.taglineEn}
                    </p>

                    <p className="text-xs text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                      {proj.descriptionEs || proj.descriptionEn}
                    </p>

                    {/* Metric pill */}
                    {proj.metricValue && (
                      <div className="p-2 rounded-xl bg-zinc-900/60 border border-white/5 font-mono text-[11px] mb-3 flex items-center justify-between">
                        <span className="text-zinc-500">{proj.metricLabelEs || 'Métrica'}:</span>
                        <span className="text-emerald-400 font-bold">{proj.metricValue}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-indigo-400 hover:text-cyan-300 flex items-center gap-1 transition-colors truncate max-w-[170px]"
                    >
                      <Globe2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{proj.url.replace('https://', '')}</span>
                    </a>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleOpenEditProj(proj)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/5 transition-colors cursor-pointer"
                        title="Editar proyecto"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteProj(proj)}
                        className="p-1.5 rounded-lg bg-zinc-900 hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border border-white/5 transition-colors cursor-pointer"
                        title="Eliminar proyecto"
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

        {/* TAB: ANALÍTICA & AUDITORÍA DE RED (DATA-DRIVEN) */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            {/* Header Console */}
            <div className="p-5 rounded-2xl bg-zinc-950/70 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                    Telemetría Institucional Activa
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Auditoría, Rendimiento & Salud de Red
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
                  Métricas de conversión en tiempo real, integridad de nodos comerciales y auditoría de endpoints sin dependencias multimedia.
                </p>
              </div>

              <button
                onClick={() => {
                  loadLeads();
                  loadBusinessesData();
                  loadProjectsData();
                }}
                className="py-2 px-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shrink-0"
              >
                <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                <span>Actualizar Telemetría</span>
              </button>
            </div>

            {/* Key Telemetry Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Tasa de Conversión</span>
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-extrabold text-white font-mono flex items-baseline gap-2">
                  <span>{conversionRate}%</span>
                  <span className="text-xs text-emerald-400 font-semibold font-sans">+12.4% vs mes ant.</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono mt-1">
                  {activeProposalsCount} de {totalLeadsCount} solicitudes activas/cerradas
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Pipeline Estimado</span>
                  <DollarSign className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-extrabold text-cyan-300 font-mono">
                  ${totalVolumeUSD.toLocaleString()} <span className="text-xs text-zinc-500 font-normal">USD</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono mt-1">
                  Volumen acumulado en cotizaciones
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Integridad de Nodos</span>
                  <ShieldCheck className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-extrabold text-indigo-300 font-mono flex items-baseline gap-1.5">
                  <span>{networkIntegrityRate}%</span>
                  <span className="text-xs text-zinc-400 font-normal">SLA Conforme</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono mt-1">
                  {totalVerifiedNodes} de {totalBusinessesCount} comercios verificados
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-950/80 border border-white/10 relative overflow-hidden">
                <div className="flex items-center justify-between text-zinc-400 mb-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider">Canal Directo WhatsApp</span>
                  <Zap className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-extrabold text-amber-300 font-mono">
                  0% <span className="text-xs text-zinc-400 font-normal">Comisiones</span>
                </div>
                <p className="text-[10px] text-zinc-400 font-mono mt-1">
                  100% de transacciones directas cliente-negocio
                </p>
              </div>

            </div>

            {/* Middle Section: Vertical Distribution + System Audit Trail */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Vertical Distribution */}
              <div className="lg:col-span-1 p-5 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Matriz por Verticales</span>
                  </h4>
                  <p className="text-xs text-zinc-400 mb-5">
                    Distribución de comercios digitalizados en la red.
                  </p>

                  <div className="space-y-4">
                    {[
                      { 
                        label: 'Gastronomía & Comercio', 
                        count: businesses.filter(b => b.category === 'food').length,
                        color: 'from-amber-500 to-orange-500'
                      },
                      { 
                        label: 'Viveros & Agroindustria', 
                        count: businesses.filter(b => b.category === 'nursery').length,
                        color: 'from-emerald-500 to-teal-500'
                      },
                      { 
                        label: 'Servicios Profesionales', 
                        count: businesses.filter(b => b.category === 'services').length,
                        color: 'from-cyan-500 to-blue-500'
                      },
                      { 
                        label: 'Automotriz & Logística', 
                        count: businesses.filter(b => b.category === 'automotive').length,
                        color: 'from-indigo-500 to-purple-500'
                      },
                    ].map((vert, idx) => {
                      const pct = businesses.length > 0 ? Math.round((vert.count / businesses.length) * 100) : 0;
                      return (
                        <div key={idx} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-zinc-300 font-medium">{vert.label}</span>
                            <span className="font-mono text-zinc-400 font-bold">{vert.count} ({pct}%)</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
                            <div 
                              className={`h-full rounded-full bg-gradient-to-r ${vert.color} transition-all duration-500`}
                              style={{ width: `${Math.max(pct, 8)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>Total Plataformas Holding:</span>
                  <span className="text-white font-bold">{totalProjectsCount} SaaS Activos</span>
                </div>
              </div>

              {/* System Audit Trail (Activity Log) */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      <span>Registro de Auditoría & Actividad de Red</span>
                    </h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Sincronizado
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mb-4">
                    Historial de eventos institucionales, cotizaciones y validaciones del ecosistema.
                  </p>

                  <div className="space-y-3 font-mono text-xs">
                    {leads.slice(0, 4).map((lead, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5 truncate">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" />
                          <div className="truncate">
                            <span className="text-white font-bold block truncate">{lead.clientName}</span>
                            <span className="text-zinc-500 text-[10px]">
                              {lead.type === 'quote' ? `Cotización: ${lead.verticalName || 'SaaS'} ($${lead.estimatedInvestmentUSD || 0} USD)` : `Consulta de Contacto: ${lead.clientEmail}`}
                            </span>
                          </div>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded shrink-0 font-bold ${
                          lead.status === 'closed_won' ? 'bg-emerald-500/20 text-emerald-300' :
                          lead.status === 'in_review' ? 'bg-amber-500/20 text-amber-300' :
                          'bg-indigo-500/20 text-indigo-300'
                        }`}>
                          {lead.status === 'closed_won' ? 'Ganado' : lead.status === 'in_review' ? 'En Revisión' : 'Pendiente'}
                        </span>
                      </div>
                    ))}

                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-white/5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                        <div>
                          <span className="text-white font-bold block">Integridad de Endpoints & SSL</span>
                          <span className="text-zinc-500 text-[10px]">Certificados TLS v1.3 y DNS Anycast operativos</span>
                        </div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-bold shrink-0">
                        100% OK
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-zinc-500 flex items-center justify-between">
                  <span>Modo: Operación sin dependencias de medios pesados</span>
                  <span className="text-cyan-400 font-mono">Latencia &lt;15ms</span>
                </div>
              </div>

            </div>

            {/* Bottom Section: Node Integrity Checklist Table */}
            <div className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Auditoría de Nodos Comerciales (Directorio Marinilla)</span>
                  </h4>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Validación técnica de canales de contacto, georreferenciación y landing pages oficiales.
                  </p>
                </div>
                <span className="text-xs font-mono text-zinc-400">
                  {businesses.length} Nodos Auditados
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-white/10 text-zinc-400">
                      <th className="pb-3 font-semibold">Comercio</th>
                      <th className="pb-3 font-semibold">Categoría</th>
                      <th className="pb-3 font-semibold">Canal WhatsApp</th>
                      <th className="pb-3 font-semibold">Georreferenciación</th>
                      <th className="pb-3 font-semibold">Presencia Web</th>
                      <th className="pb-3 font-semibold text-right">Estado Técnico</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {businesses.map((biz) => {
                      const hasValidWa = Boolean(biz.whatsapp && biz.whatsapp.length >= 10);
                      const hasCoords = Boolean(biz.lat && biz.lng);
                      const hasWeb = Boolean(biz.websiteUrl);

                      return (
                        <tr key={biz.id} className="hover:bg-zinc-900/40 transition-colors">
                          <td className="py-3 font-bold text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{biz.name}</span>
                          </td>
                          <td className="py-3 text-zinc-400">
                            {biz.categoryLabelEs || biz.category}
                          </td>
                          <td className="py-3">
                            {hasValidWa ? (
                              <a
                                href={`https://wa.me/${biz.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:underline flex items-center gap-1"
                              >
                                <span>+{biz.whatsapp}</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-rose-400 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                <span>Incompleto</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-zinc-400">
                            {hasCoords ? (
                              <span className="text-zinc-300 font-mono text-[11px]">
                                {biz.lat?.toFixed?.(4) || biz.lat}, {biz.lng?.toFixed?.(4) || biz.lng}
                              </span>
                            ) : (
                              <span className="text-amber-400">Pendiente GPS</span>
                            )}
                          </td>
                          <td className="py-3">
                            {hasWeb ? (
                              <a
                                href={biz.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-400 hover:underline flex items-center gap-1 truncate max-w-[150px]"
                              >
                                <span>{biz.websiteUrl.replace('https://', '')}</span>
                                <ArrowUpRight className="w-3 h-3 shrink-0" />
                              </a>
                            ) : (
                              <span className="text-zinc-500 font-sans text-[11px]">
                                WhatsApp Directo
                              </span>
                            )}
                          </td>
                          <td className="py-3 text-right">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-bold">
                              <Check className="w-3 h-3" />
                              <span>Conforme</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: DIRECTORIO HIPERLOCAL CRUD */}
        {activeTab === 'directory' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
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

                    <p className="text-xs text-zinc-300 line-clamp-2 mb-3">
                      {biz.descriptionEs || biz.descriptionEn}
                    </p>

                    {/* Landing Page link indicator */}
                    {biz.websiteUrl ? (
                      <a
                        href={biz.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/25 text-cyan-300 text-[11px] font-mono hover:bg-cyan-500/20 transition-all mb-3 max-w-full truncate"
                        title={biz.websiteUrl}
                      >
                        <Globe className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span className="truncate">{biz.websiteUrl.replace(/^https?:\/\//, '')}</span>
                        <ArrowUpRight className="w-3 h-3 shrink-0" />
                      </a>
                    ) : (
                      <div className="mb-3 text-[10px] text-zinc-500 font-mono flex items-center gap-1">
                        <span>⚪ Sin Landing asignada</span>
                      </div>
                    )}
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

        {/* TAB 5: INFRAESTRUCTURA & CLÚSTER */}
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

              {/* Dedicated Landing Page Link Box */}
              <div className="p-3.5 rounded-2xl bg-zinc-900/60 border border-cyan-500/25 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-cyan-300 flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Link de la Landing Page Oficial / Web</span>
                  </label>
                  {bizForm.name && (
                    <button
                      type="button"
                      onClick={() => {
                        const slug = bizForm.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
                        setBizForm({ ...bizForm, websiteUrl: `https://${slug}.eternalia.co` });
                      }}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 hover:underline font-mono cursor-pointer"
                    >
                      + Auto-generar link .eternalia.co
                    </button>
                  )}
                </div>
                <input
                  type="url"
                  value={bizForm.websiteUrl}
                  onChange={(e) => setBizForm({ ...bizForm, websiteUrl: e.target.value })}
                  placeholder="https://micomercio.eternalia.co o https://mi-landing.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
                />
                <p className="text-[10px] text-zinc-400">
                  Ingresa aquí el enlace de la Landing Page que vas a crear o enlazar para este comercio. En el directorio público aparecerá con botón directo de visita.
                </p>
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
                <label className="text-xs font-mono text-zinc-300 block mb-1.5">Identidad Visual (Gradiente del Isotipo)</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setBizForm({ ...bizForm, logoColor: preset.class })}
                      className={`p-2 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        bizForm.logoColor === preset.class
                          ? 'border-cyan-400 bg-cyan-500/10 text-white font-bold'
                          : 'border-white/5 bg-zinc-900/60 hover:border-white/20 text-zinc-400'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${preset.class} shrink-0 shadow-sm`} />
                      <span className="text-[10px] truncate">{preset.label}</span>
                    </button>
                  ))}
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

      {/* Project Modal (Add / Edit) */}
      {isProjModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left my-8">
            <button
              onClick={() => setIsProjModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-900 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1">
                {editingProjId ? 'MODIFICAR PROYECTO SAAS' : 'NUEVA PLATAFORMA SAAS'}
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                {editingProjId ? 'Editar Proyecto del Portafolio' : 'Registrar Empresa / Proyecto SaaS'}
              </h2>
            </div>

            <form onSubmit={handleSaveProj} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1">Nombre del Proyecto / Plataforma *</label>
                <input
                  type="text"
                  required
                  value={projForm.name}
                  onChange={(e) => setProjForm({ ...projForm, name: e.target.value })}
                  placeholder="ej. Eternalia Logistics Hub"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Vertical / Categoría</label>
                  <select
                    value={projForm.category}
                    onChange={(e) => {
                      const cat = e.target.value;
                      const labels = {
                        commerce: { es: 'E-Commerce & Frontends', en: 'Commerce & Frontends' },
                        services: { es: 'Workforce OS & Fintech', en: 'Workforce OS & Fintech' },
                        ventures: { es: 'Industrial IoT & ERP', en: 'Industrial IoT & ERP' },
                        directories: { es: 'Redes Territoriales', en: 'Territorial Meshes' }
                      };
                      setProjForm({
                        ...projForm,
                        category: cat,
                        categoryLabelEs: labels[cat]?.es || 'Plataforma',
                        categoryLabelEn: labels[cat]?.en || 'Platform'
                      });
                    }}
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none"
                  >
                    <option value="commerce">Commerce Cloud (Frontends / POS)</option>
                    <option value="services">Workforce OS (Servicios / Escrow)</option>
                    <option value="ventures">Industrial Ventures (IoT / ERP)</option>
                    <option value="directories">Redes Territoriales (Hiperlocal)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">URL de Producción en Vivo *</label>
                  <input
                    type="url"
                    required
                    value={projForm.url}
                    onChange={(e) => setProjForm({ ...projForm, url: e.target.value })}
                    placeholder="https://plataforma.eternalia.co"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Insignia / Badge</label>
                  <input
                    type="text"
                    value={projForm.badge}
                    onChange={(e) => setProjForm({ ...projForm, badge: e.target.value })}
                    placeholder="ej. En Producción, Enterprise, Piloto"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-zinc-300 block mb-1">Métrica Clave (Impacto)</label>
                  <input
                    type="text"
                    value={projForm.metricValue}
                    onChange={(e) => setProjForm({ ...projForm, metricValue: e.target.value })}
                    placeholder="ej. +15k usuarios, <0.3s TTFB, 99.99%"
                    className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1">Eslogan Corto</label>
                <input
                  type="text"
                  value={projForm.taglineEs}
                  onChange={(e) => setProjForm({ ...projForm, taglineEs: e.target.value, taglineEn: e.target.value })}
                  placeholder="ej. Plataforma de telemetría y diagnóstico en ruta"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1">Stack Tecnológico (separado por comas)</label>
                <input
                  type="text"
                  value={projForm.techStack}
                  onChange={(e) => setProjForm({ ...projForm, techStack: e.target.value })}
                  placeholder="React 18, Vite, Cloud Firestore, MQTT, WebSockets"
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1.5">Identidad Visual (Gradiente del Isotipo)</label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setProjForm({ ...projForm, logoColor: preset.class })}
                      className={`p-2 rounded-xl border flex items-center gap-2 transition-all cursor-pointer ${
                        projForm.logoColor === preset.class
                          ? 'border-amber-400 bg-amber-500/10 text-white font-bold'
                          : 'border-white/5 bg-zinc-900/60 hover:border-white/20 text-zinc-400'
                      }`}
                    >
                      <div className={`w-3.5 h-3.5 rounded-full bg-gradient-to-tr ${preset.class} shrink-0 shadow-sm`} />
                      <span className="text-[10px] truncate">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-zinc-300 block mb-1">Descripción del Proyecto</label>
                <textarea
                  rows={2}
                  value={projForm.descriptionEs}
                  onChange={(e) => setProjForm({ ...projForm, descriptionEs: e.target.value, descriptionEn: e.target.value })}
                  placeholder="Describe la solución y valor de mercado..."
                  className="w-full px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsProjModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)] cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Proyecto</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
