import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Terminal as TerminalIcon, 
  CornerDownLeft, 
  Trash2
} from 'lucide-react';

export default function HeroTerminal({ onOpenContact, onNavigateSection }) {
  const { t, language } = useLanguage();
  const [inputVal, setInputVal] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);
  const terminalEndRef = useRef(null);
  const inputRef = useRef(null);

  const initialHistory = [
    {
      type: 'system',
      text: language === 'es'
        ? '⚡ ETERNALIA CLOUD ENGINE • v2.6.4 [Production Ready]\nConectado a la malla distribuida de baja latencia (SLA 99.99%).\nEscribe "help" o pulsa los accesos rápidos inferiores.'
        : '⚡ ETERNALIA CLOUD ENGINE • v2.6.4 [Production Ready]\nConnected to distributed edge mesh (SLA 99.99%).\nType "help" or click the quick action pills below.'
    }
  ];

  const [history, setHistory] = useState(initialHistory);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const cmd = raw.toLowerCase();
    const newEntry = { type: 'user', text: raw };

    let responseEntry = null;

    switch (cmd) {
      case 'help':
        responseEntry = {
          type: 'output',
          content: (
            <div className="space-y-1 text-xs text-zinc-300">
              <p className="text-cyan-400 font-bold mb-1">
                {language === 'es' ? 'COMANDOS DISPONIBLES:' : 'AVAILABLE COMMANDS:'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-2">
                <div><span className="text-emerald-400 font-bold">status</span> — {language === 'es' ? 'Salud del clúster y disponibilidad' : 'Cluster health & live uptime'}</div>
                <div><span className="text-indigo-400 font-bold">ventures</span> — {language === 'es' ? 'Verticales tecnológicas de Eternalia' : 'Eternalia core tech verticals'}</div>
                <div><span className="text-amber-400 font-bold">deploy</span> — {language === 'es' ? 'Simular despliegue perimetral en <180ms' : 'Simulate edge deployment in <180ms'}</div>
                <div><span className="text-cyan-400 font-bold">quote</span> — {language === 'es' ? 'Abrir cotizador instantáneo' : 'Open instant quote estimator'}</div>
                <div><span className="text-pink-400 font-bold">contact</span> — {language === 'es' ? 'Abrir formulario ejecutivo' : 'Open leadership contact modal'}</div>
                <div><span className="text-zinc-400 font-bold">clear</span> — {language === 'es' ? 'Limpiar historial de la consola' : 'Clear terminal console history'}</div>
              </div>
            </div>
          )
        };
        break;

      case 'status':
        responseEntry = {
          type: 'output',
          content: (
            <div className="space-y-1.5 text-xs text-zinc-300 border-l-2 border-emerald-500 pl-3 py-1">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>CLÚSTER ETERNALIA: 100% OPERACIONAL</span>
              </div>
              <div className="text-[11px] text-zinc-400 space-y-0.5 font-mono">
                <p>• Uptime: <span className="text-white font-bold">99.994%</span> (SLA de grado bancario)</p>
                <p>• Latencia en borde: <span className="text-cyan-300 font-bold">12ms avg</span> (PoP Bogotá & Virginia)</p>
                <p>• Encriptación: <span className="text-indigo-300 font-bold">AES-256 GCM</span> con rotación de claves</p>
                <p>• Malla local: <span className="text-amber-300 font-bold">Marinilla activa</span> (+10 nodos verificados)</p>
              </div>
            </div>
          )
        };
        break;

      case 'ventures':
        responseEntry = {
          type: 'output',
          content: (
            <div className="space-y-1.5 text-xs text-zinc-300 border-l-2 border-indigo-500 pl-3 py-1">
              <p className="text-indigo-400 font-bold">
                {language === 'es' ? 'HOLDING MATRIX — 4 VERTICALES STRATEGIC:' : 'HOLDING MATRIX — 4 STRATEGIC VERTICALS:'}
              </p>
              <div className="space-y-1 text-[11px] font-mono">
                <p><span className="text-amber-400 font-bold">[1] Commerce Cloud:</span> Frontends de ultra-conversión, catálogos QR y checkout sin intermediarios.</p>
                <p><span className="text-emerald-400 font-bold">[2] Workforce OS:</span> Sistema operativo laboral, split payments y garantías digitales en custodia.</p>
                <p><span className="text-cyan-400 font-bold">[3] Commercial Mesh:</span> Malla de descubrimiento local georreferenciada con enlaces directos WhatsApp.</p>
                <p><span className="text-purple-400 font-bold">[4] Enterprise Ventures:</span> Telemetría IoT satelital de flotas y ERP masivo para eventos de alta cocina.</p>
              </div>
            </div>
          )
        };
        break;

      case 'deploy':
        setIsDeploying(true);
        responseEntry = {
          type: 'output',
          content: (
            <div className="space-y-1 text-xs font-mono text-zinc-300 border-l-2 border-amber-500 pl-3 py-1 animate-pulse">
              <p className="text-amber-300">⚙️ [DEPLOY TRIGGERED] Iniciando empaquetado de micro-frontend en borde...</p>
              <p className="text-zinc-400">→ Analizando módulos Vite + Tailwind... OK</p>
              <p className="text-zinc-400">→ Replicando hacia 12 PoPs globales... OK (&lt;140ms)</p>
              <p className="text-emerald-400 font-bold">🚀 [SUCCESS] Despliegue en vivo confirmado en edge.eternalia.io</p>
            </div>
          )
        };
        setTimeout(() => setIsDeploying(false), 1200);
        break;

      case 'quote':
        if (onNavigateSection) {
          onNavigateSection('cotizador');
        }
        responseEntry = {
          type: 'output',
          content: (
            <p className="text-xs text-cyan-300 border-l-2 border-cyan-500 pl-3 py-1 font-mono">
              🎯 {language === 'es' 
                ? 'Navegando al Cotizador Interactivo de Soluciones en vivo...' 
                : 'Scrolling down to Interactive Solution Estimator...'}
            </p>
          )
        };
        break;

      case 'contact':
        onOpenContact();
        responseEntry = {
          type: 'output',
          content: (
            <p className="text-xs text-indigo-300 border-l-2 border-indigo-500 pl-3 py-1 font-mono">
              📨 {language === 'es' ? 'Abriendo canal institucional con Dirección Ejecutiva...' : 'Opening corporate inquiry desk...'}
            </p>
          )
        };
        break;

      case 'clear':
        setHistory(initialHistory);
        setInputVal('');
        return;

      default:
        responseEntry = {
          type: 'output',
          content: (
            <p className="text-xs text-rose-400 font-mono">
              {language === 'es' 
                ? `Comando no reconocido: "${raw}". Escribe "help" para ver los comandos válidos.` 
                : `Command not found: "${raw}". Type "help" to see available commands.`}
            </p>
          )
        };
    }

    setHistory((prev) => [...prev, newEntry, responseEntry]);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  const handlePillClick = (cmd) => {
    executeCommand(cmd);
    inputRef.current?.focus();
  };

  return (
    <div className="w-full rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden text-left font-mono">
      
      {/* Terminal Title Bar with macOS dots */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block shadow-[0_0_8px_rgba(244,63,94,0.4)]" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
          </div>
          <div className="h-3 w-px bg-zinc-700 mx-1" />
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-300">
            <TerminalIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>{t.terminal?.title || "ETERNALIA CLOUD CLI • v2.6.4"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            ONLINE
          </span>
          <button
            onClick={() => {
              setHistory(initialHistory);
              setInputVal('');
            }}
            title={language === 'es' ? 'Limpiar terminal' : 'Clear terminal'}
            className="p-1 rounded text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 max-h-64 sm:max-h-72 overflow-y-auto space-y-3 text-xs scrollbar-thin scrollbar-thumb-zinc-800">
        {history.map((item, index) => {
          if (item.type === 'system') {
            return (
              <div key={index} className="text-zinc-400 whitespace-pre-line border-l border-zinc-700 pl-2 py-0.5">
                {item.text}
              </div>
            );
          }
          if (item.type === 'user') {
            return (
              <div key={index} className="flex items-center gap-2 text-cyan-300">
                <span className="text-indigo-400 font-bold select-none">{t.terminal?.promptUser || 'guest@eternalia'} ~ %</span>
                <span className="font-semibold">{item.text}</span>
              </div>
            );
          }
          if (item.type === 'output') {
            return (
              <div key={index} className="pl-4">
                {item.content}
              </div>
            );
          }
          return null;
        })}
        <div ref={terminalEndRef} />
      </div>

      {/* Command Pills for Fast Interaction */}
      <div className="px-4 py-2 bg-zinc-900/40 border-t border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px]">
        <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider shrink-0 mr-1">
          {language === 'es' ? 'RÁPIDO:' : 'QUICK:'}
        </span>
        {(t.terminal?.pills || ['status', 'ventures', 'deploy', 'quote', 'contact', 'clear']).map((cmd) => (
          <button
            key={cmd}
            type="button"
            onClick={() => handlePillClick(cmd)}
            className="px-2 py-0.5 rounded-md bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-white/10 hover:border-indigo-500/50 transition-all shrink-0 cursor-pointer active:scale-95"
          >
            ${cmd}
          </button>
        ))}
      </div>

      {/* Interactive Command Input Form */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/90 border-t border-white/5">
        <span className="text-indigo-400 font-bold text-xs select-none">
          {t.terminal?.promptUser || 'guest@eternalia'} ~ %
        </span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={t.terminal?.placeholder || "Escribe 'help' o un comando..."}
          className="flex-1 bg-transparent text-white placeholder-zinc-500 text-xs focus:outline-none font-mono"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isDeploying}
          className="px-2.5 py-1 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
        >
          <CornerDownLeft className="w-3 h-3" />
        </button>
      </form>

    </div>
  );
}
