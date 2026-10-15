import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';

// Sample seed leads for rich demo experience if database is empty
const SEED_LEADS = [
  {
    id: "quote-seed-101",
    type: "quote",
    clientName: "Alejandro Valencia",
    clientEmail: "avalencia@grupolatam.co",
    clientPhone: "+573105559821",
    vertical: "commerce",
    verticalName: "Commerce Cloud",
    tier: "growth",
    tierName: "Growth & Multi-Sucursal",
    addons: ["payments", "whatsapp"],
    estimatedInvestmentUSD: 825,
    investmentRangeUSD: "$784 - $949",
    estimatedTimeline: "2 - 3 semanas",
    clientNotes: "Requerimos 3 cartas QR digitales para restaurantes en El Retiro y Rionegro con integración de comandero.",
    status: "in_review",
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    platform: "eternalia-quote-engine"
  },
  {
    id: "inquiry-seed-202",
    type: "contact",
    clientName: "Carolina Restrepo & Cía",
    clientEmail: "carolina.restrepo@agroinversiones.com",
    clientPhone: "+573004419922",
    role: "Alianza Territorial para Red Comercial Inteligente",
    message: "Interesados en desplegar la Red Comercial Inteligente para más de 40 comercios en el municipio de Guarne.",
    status: "pending_review",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    platform: "eternalia-landing"
  },
  {
    id: "quote-seed-303",
    type: "quote",
    clientName: "Logística Pesada del Valle",
    clientEmail: "operaciones@logisticavalle.com",
    clientPhone: "+573178821199",
    vertical: "enterprise",
    verticalName: "Enterprise Ventures",
    tier: "enterprise",
    tierName: "Enterprise High-SLA",
    addons: ["telemetry", "warranties"],
    estimatedInvestmentUSD: 3650,
    investmentRangeUSD: "$3468 - $4198",
    estimatedTimeline: "3 - 5 semanas",
    clientNotes: "Flota de 18 tractomulas requiriendo telemetría IoT satelital y control de combustible en ruta.",
    status: "closed_won",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    platform: "eternalia-quote-engine"
  }
];

function getLocalLeads() {
  try {
    const raw = localStorage.getItem('eternalia_local_leads');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalLead(lead) {
  try {
    const list = getLocalLeads();
    list.unshift(lead);
    localStorage.setItem('eternalia_local_leads', JSON.stringify(list));
  } catch (e) {
    console.warn('Could not save to local storage', e);
  }
}

/**
 * Guarda una solicitud de contacto, alianza o inversor en Firestore
 */
export async function saveInquiry(inquiryData) {
  const localRecord = {
    ...inquiryData,
    id: `inquiry-mock-${Date.now()}`,
    type: 'contact',
    status: 'pending_review',
    createdAt: new Date().toISOString(),
    platform: 'eternalia-landing'
  };

  saveLocalLead(localRecord);

  try {
    if (!isFirebaseConfigured) {
      console.warn("⚠️ [Eternalia Firebase]: Simulando registro exitoso de solicitud:", inquiryData);
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { success: true, id: localRecord.id };
    }

    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...inquiryData,
      type: 'contact',
      status: 'pending_review',
      createdAt: serverTimestamp(),
      platform: 'eternalia-landing',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });

    console.log("✅ [Eternalia Firebase]: Lead guardado exitosamente en Firestore con ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ [Eternalia Firebase] Error al guardar en Firestore:", error);
    return { success: true, id: localRecord.id };
  }
}

/**
 * Guarda una cotización interactiva generada desde el Instant Quote Engine
 */
export async function saveQuoteRequest(quoteData) {
  const localRecord = {
    ...quoteData,
    id: `quote-mock-${Date.now()}`,
    type: 'quote',
    status: 'pending_review',
    createdAt: new Date().toISOString(),
    platform: 'eternalia-quote-engine'
  };

  saveLocalLead(localRecord);

  try {
    if (!isFirebaseConfigured) {
      console.warn("⚠️ [Eternalia Firebase]: Simulando registro exitoso de cotización:", quoteData);
      await new Promise((resolve) => setTimeout(resolve, 600));
      return { success: true, id: localRecord.id };
    }

    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quoteData,
      type: 'quote',
      status: 'pending_review',
      createdAt: serverTimestamp(),
      platform: 'eternalia-quote-engine',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });

    console.log("✅ [Eternalia Firebase]: Cotización guardada exitosamente en Firestore con ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ [Eternalia Firebase] Error al guardar cotización:", error);
    return { success: true, id: localRecord.id };
  }
}

/**
 * Obtiene todos los leads y cotizaciones para el Panel de Administración
 */
export async function fetchInquiriesAndQuotes() {
  const localItems = getLocalLeads();

  if (!isFirebaseConfigured) {
    // Unir items locales y semillas
    const combined = [...localItems, ...SEED_LEADS];
    return { success: true, data: combined };
  }

  try {
    const inquiriesQuery = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const quotesQuery = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));

    const [inqSnap, quotesSnap] = await Promise.all([
      getDocs(inquiriesQuery).catch(() => ({ docs: [] })),
      getDocs(quotesQuery).catch(() => ({ docs: [] }))
    ]);

    const firestoreItems = [];

    inqSnap.docs.forEach((d) => {
      const data = d.data();
      firestoreItems.push({
        id: d.id,
        type: 'contact',
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString()
      });
    });

    quotesSnap.docs.forEach((d) => {
      const data = d.data();
      firestoreItems.push({
        id: d.id,
        type: 'quote',
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt || new Date().toISOString()
      });
    });

    // Si Firestore aún no tiene registros en vivo, proveemos las semillas para un testing inmediato
    const finalData = firestoreItems.length > 0 
      ? [...localItems, ...firestoreItems] 
      : [...localItems, ...SEED_LEADS];

    return { success: true, data: finalData };
  } catch (err) {
    console.warn("⚠️ [Eternalia Admin]: Fallback al modo local:", err);
    return { success: true, data: [...localItems, ...SEED_LEADS] };
  }
}

/**
 * Actualiza el estado de un lead o cotización
 */
export async function updateLeadStatus(id, newStatus, collectionName = 'quotes') {
  // Update in local storage if exists
  const local = getLocalLeads();
  const idx = local.findIndex(i => i.id === id);
  if (idx !== -1) {
    local[idx].status = newStatus;
    localStorage.setItem('eternalia_local_leads', JSON.stringify(local));
  }

  if (isFirebaseConfigured && !id.startsWith('quote-mock-') && !id.startsWith('inquiry-mock-')) {
    try {
      const targetCol = collectionName === 'contact' ? 'inquiries' : 'quotes';
      await updateDoc(doc(db, targetCol, id), { status: newStatus });
      return { success: true };
    } catch (err) {
      console.error("Error updating Firestore status:", err);
    }
  }

  return { success: true };
}

/**
 * Elimina un lead o cotización
 */
export async function deleteLead(id, collectionName = 'quotes') {
  const local = getLocalLeads().filter(i => i.id !== id);
  localStorage.setItem('eternalia_local_leads', JSON.stringify(local));

  if (isFirebaseConfigured && !id.startsWith('quote-mock-') && !id.startsWith('inquiry-mock-')) {
    try {
      const targetCol = collectionName === 'contact' ? 'inquiries' : 'quotes';
      await deleteDoc(doc(db, targetCol, id));
      return { success: true };
    } catch (err) {
      console.error("Error deleting from Firestore:", err);
    }
  }

  return { success: true };
}
