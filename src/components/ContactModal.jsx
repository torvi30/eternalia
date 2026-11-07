import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Building, 
  Mail, 
  User, 
  HelpCircle, 
  Loader2, 
  Paperclip, 
  FileText, 
  Trash2 
} from 'lucide-react';
import { saveInquiry } from '../services/inquiryService';

export default function ContactModal({ isOpen, onClose }) {
  const { t, language } = useLanguage();
  const fileInputRef = useRef(null);
  const backdropRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: t.contactModal.form.roles[0],
    message: '',
  });
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'

  // Lock background scroll and listen for ESC key
  useEffect(() => {
    if (!isOpen) return;

    // Apply modal-open class to both html and body
    document.documentElement.classList.add('modal-open');
    document.body.classList.add('modal-open');

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Prevent wheel and touch scrolling on the backdrop
    const backdropEl = backdropRef.current;
    const preventScroll = (e) => {
      if (e.target === backdropEl) {
        e.preventDefault();
      }
    };

    if (backdropEl) {
      backdropEl.addEventListener('wheel', preventScroll, { passive: false });
      backdropEl.addEventListener('touchmove', preventScroll, { passive: false });
    }

    return () => {
      document.documentElement.classList.remove('modal-open');
      document.body.classList.remove('modal-open');
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      if (backdropEl) {
        backdropEl.removeEventListener('wheel', preventScroll);
        backdropEl.removeEventListener('touchmove', preventScroll);
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert(language === 'es' ? 'El archivo excede el límite máximo de 15MB.' : 'File exceeds maximum 15MB size limit.');
        return;
      }
      setAttachmentFile(file);
    }
  };

  const handleRemoveFile = () => {
    setAttachmentFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    await saveInquiry(formData, attachmentFile);
    setStatus('success');
  };

  const handleReset = () => {
    setStatus('idle');
    setFormData({
      name: '',
      email: '',
      role: t.contactModal.form.roles[0],
      message: '',
    });
    setAttachmentFile(null);
    onClose();
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div 
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer overscroll-contain select-none"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#121217] text-zinc-900 dark:text-white border border-black/10 dark:border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto cursor-default overscroll-contain"
        style={{ overscrollBehavior: 'contain' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient inside dialog */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Cerrar modal de contacto"
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto mb-4 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
              {language === 'es' ? '¡Solicitud Recibida!' : 'Application Received!'}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
              {t.contactModal.form.success}
            </p>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-mono mb-6 max-w-sm mx-auto">
              ✓ {language === 'es' ? 'Sincronizado con Cloud Firestore & Storage' : 'Synced to Cloud Firestore & Storage'}
            </div>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs tracking-wide uppercase transition-colors cursor-pointer"
            >
              {t.contactModal.form.close}
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30">
                Eternalia Executive Desk
              </span>
              <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-white mt-2 mb-1">
                {t.contactModal.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {t.contactModal.subtitle}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  <span>{t.contactModal.form.name} *</span>
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t.contactModal.form.namePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/80 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  <span>{t.contactModal.form.email} *</span>
                </label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.contactModal.form.emailPlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/80 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  <span>{t.contactModal.form.role}</span>
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                >
                  {t.contactModal.form.roles.map((role, idx) => (
                    <option key={idx} value={role} className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white">
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                  <span>{t.contactModal.form.message} *</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contactModal.form.messagePlaceholder}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950/80 border border-black/10 dark:border-white/10 text-zinc-900 dark:text-white placeholder-zinc-400 text-xs sm:text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
                />
              </div>

              {/* Optional Attachment (Firebase Storage Upload) */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Paperclip className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{language === 'es' ? 'Adjuntar archivo / RFP (Opcional)' : 'Attach file / RFP (Optional)'}</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">Max 15MB (Storage)</span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                  className="hidden"
                  id="inquiry-file-upload"
                />

                {!attachmentFile ? (
                  <label
                    htmlFor="inquiry-file-upload"
                    className="w-full py-2.5 px-3.5 rounded-xl border border-dashed border-black/20 dark:border-white/15 bg-slate-50/60 dark:bg-zinc-950/40 hover:bg-slate-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400 text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Paperclip className="w-4 h-4 text-cyan-500" />
                    <span>{language === 'es' ? 'Haz clic para seleccionar PDF, documento o imagen' : 'Click to select PDF, document or image'}</span>
                  </label>
                ) : (
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2 truncate text-cyan-700 dark:text-cyan-300">
                      <FileText className="w-4 h-4 shrink-0 text-cyan-500" />
                      <span className="truncate font-semibold">{attachmentFile.name}</span>
                      <span className="text-zinc-500 text-[10px] shrink-0">({formatFileSize(attachmentFile.size)})</span>
                    </div>
                    <button
                      type="button"
                      onClick={handleRemoveFile}
                      className="p-1 rounded text-zinc-400 hover:text-rose-500 transition-colors ml-2 cursor-pointer"
                      title={language === 'es' ? 'Eliminar adjunto' : 'Remove attachment'}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t.contactModal.form.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.contactModal.form.send}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
