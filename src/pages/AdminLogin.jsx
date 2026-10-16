import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowRight, 
  AlertCircle, 
  Eye, 
  EyeOff,
  Zap
} from 'lucide-react';

export default function AdminLogin() {
  const { login, loginWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // If already logged in, redirect to admin
  if (user) {
    navigate('/admin', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setErrorMessage(result.error || 'Credenciales incorrectas');
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setLoading(true);

    const result = await loginWithGoogle();
    setLoading(false);

    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setErrorMessage(result.error || 'Error al autenticar con Google');
    }
  };

  const handleDemoFill = async () => {
    setEmail('admin@eternalia.io');
    setPassword('Eternalia2026!');
    setErrorMessage('');
    setLoading(true);

    const result = await login('admin@eternalia.io', 'Eternalia2026!');
    setLoading(false);

    if (result.success) {
      navigate('/admin', { replace: true });
    } else {
      setErrorMessage(result.error || 'Error al autenticar modo demo');
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 flex flex-col justify-center items-center px-4 relative overflow-hidden selection:bg-indigo-500/30">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top back navigation */}
      <div className="absolute top-6 left-6 z-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-xl bg-zinc-900/60 border border-white/5 hover:border-white/15"
        >
          <span>← Volver al Portal Público</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-zinc-950/85 border border-white/10 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.8)] relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[2px] shadow-[0_0_25px_rgba(99,102,241,0.4)] mb-4">
            <div className="w-full h-full bg-[#0d0d12] rounded-[14px] flex items-center justify-center">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            <span>ACCESO RESTRINGIDO • NIVEL 1</span>
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Clúster Administrativo
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Gestión interna de leads, cotizaciones y directorio comercial
          </p>
        </div>

        {/* Error message */}
        {errorMessage && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 px-4 rounded-xl font-medium text-xs sm:text-sm text-zinc-100 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 shadow-sm active:scale-[0.99] mb-5"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{loading ? 'Conectando con Google...' : 'Continuar con cuenta de Google'}</span>
        </button>

        <div className="relative flex items-center justify-center mb-5">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#0e0e14] px-3 text-[11px] font-mono text-zinc-500 uppercase tracking-wider shrink-0">
            o con credenciales
          </span>
          <div className="border-t border-white/10 w-full" />
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-medium">
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@eternalia.io"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-300 block mb-1.5 font-medium">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900/80 border border-white/10 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-zinc-500 hover:text-zinc-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 transition-all shadow-[0_0_25px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
          >
            <span>{loading ? 'Validando Claves...' : 'Ingresar al Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Login Box */}
        <div className="mt-6 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-zinc-500 font-mono mb-3">
            ¿Probando el sistema localmente?
          </p>
          <button
            type="button"
            onClick={handleDemoFill}
            disabled={loading}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-indigo-500/30 hover:border-indigo-500/60 text-indigo-300 text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
          >
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Acceso Rápido Demo Admin (1-Clic)</span>
          </button>
          <div className="mt-2 text-[10px] text-zinc-600 font-mono">
            <code>admin@eternalia.io</code> • <code>Eternalia2026!</code>
          </div>
        </div>

      </div>

      {/* Footer watermark */}
      <div className="mt-8 text-center text-[11px] font-mono text-zinc-600 relative z-10">
        © 2026 Eternalia Tech Holding • Security Protocol SOC-2 Compliant
      </div>

    </div>
  );
}
