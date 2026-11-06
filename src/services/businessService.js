import { 
  collection, 
  getDocs, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';
import { marinillaBusinesses as defaultBusinesses } from '../data/marinillaBusinesses';

const LOCAL_STORAGE_KEY = 'eternalia_custom_businesses';

function getCustomLocalBusinesses() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (err) {
    return null;
  }
}

function saveCustomLocalBusinesses(list, emitEvent = true) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    // Dispatch custom event ONLY if emitEvent is true (e.g. on add/edit/delete), preventing infinite loops
    if (emitEvent && typeof window !== 'undefined') {
      window.dispatchEvent(new Event('eternalia_businesses_updated'));
    }
  } catch (err) {
    console.warn('Could not save businesses to local storage:', err);
  }
}

/**
 * Obtiene la lista completa de negocios del directorio (Firestore o fallback local)
 */
export async function getBusinesses() {
  const localList = getCustomLocalBusinesses();
  if (localList && localList.length > 0) {
    return localList;
  }

  if (!isFirebaseConfigured) {
    saveCustomLocalBusinesses(defaultBusinesses, false);
    return defaultBusinesses;
  }

  try {
    const snap = await getDocs(collection(db, 'businesses'));
    if (!snap.empty) {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      saveCustomLocalBusinesses(items, false);
      return items;
    } else {
      // Si la colección de Firestore está vacía, inicializamos con los comercios por defecto
      saveCustomLocalBusinesses(defaultBusinesses, false);
      return defaultBusinesses;
    }
  } catch (err) {
    console.warn("⚠️ [Eternalia Firestore]: Fallback a comercios locales:", err);
    saveCustomLocalBusinesses(defaultBusinesses, false);
    return defaultBusinesses;
  }
}

/**
 * Agrega un nuevo negocio comercial al directorio hiperlocal
 */
export async function addBusiness(newBizData) {
  const id = `biz-${Date.now()}`;
  const businessRecord = {
    ...newBizData,
    id,
    rating: newBizData.rating || 5.0,
    reviews: newBizData.reviews || 1,
    statusType: 'open',
    statusEs: 'Abierto ahora',
    statusEn: 'Open now',
    createdAt: new Date().toISOString(),
  };

  const currentList = await getBusinesses();
  const updatedList = [businessRecord, ...currentList];
  saveCustomLocalBusinesses(updatedList);

  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, 'businesses'), {
        ...businessRecord,
        createdAt: serverTimestamp(),
      });
      businessRecord.firestoreId = docRef.id;
    } catch (err) {
      console.warn("Error saving to Firestore businesses:", err);
    }
  }

  return { success: true, business: businessRecord };
}

/**
 * Actualiza un comercio existente
 */
export async function updateBusiness(id, updatedFields) {
  const currentList = await getBusinesses();
  const index = currentList.findIndex(b => b.id === id);

  if (index === -1) {
    return { success: false, error: 'Negocio no encontrado' };
  }

  currentList[index] = {
    ...currentList[index],
    ...updatedFields,
    updatedAt: new Date().toISOString(),
  };

  saveCustomLocalBusinesses(currentList);

  if (isFirebaseConfigured && currentList[index].firestoreId) {
    try {
      await updateDoc(doc(db, 'businesses', currentList[index].firestoreId), updatedFields);
    } catch (err) {
      console.warn("Error updating in Firestore:", err);
    }
  }

  return { success: true, business: currentList[index] };
}

/**
 * Elimina un comercio del directorio
 */
export async function deleteBusiness(id) {
  const currentList = await getBusinesses();
  const target = currentList.find(b => b.id === id);
  const filtered = currentList.filter(b => b.id !== id);

  saveCustomLocalBusinesses(filtered);

  if (isFirebaseConfigured && target?.firestoreId) {
    try {
      await deleteDoc(doc(db, 'businesses', target.firestoreId));
    } catch (err) {
      console.warn("Error deleting from Firestore:", err);
    }
  }

  return { success: true };
}

/**
 * Consulta en vivo el endpoint de auth-foundattion para obtener los comercios
 * visibles en el directorio con sus nombres, logos en Cloudinary y tags de landing.
 */
export async function fetchDirectoryCompaniesFromEndpoint() {
  const endpoint = "https://firestore.googleapis.com/v1/projects/auth-foundattion/databases/(default)/documents/companies";
  
  try {
    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    const docs = data.documents || [];

    const gradientPresets = [
      "from-orange-500 to-amber-500",
      "from-red-600 to-orange-500",
      "from-amber-600 to-red-600",
      "from-emerald-500 to-teal-600",
      "from-cyan-500 to-blue-600",
      "from-indigo-600 to-purple-600",
      "from-rose-500 to-amber-600",
      "from-purple-600 to-pink-500",
      "from-pink-500 to-rose-400"
    ];

    const mapped = docs
      .map((docItem, idx) => {
        const id = docItem.name.split("/").pop();
        const fields = docItem.fields || {};
        const name = fields.name?.stringValue?.trim() || "";
        const logo = fields.logo?.stringValue?.trim() || null;
        const tag = fields.companyTag?.stringValue?.trim() || "";
        const visible = fields.directoryVisible?.booleanValue ?? false;
        const mun = fields.municipality?.stringValue?.trim() || "Marinilla";
        const dept = fields.department?.stringValue?.trim() || "Antioquia";
        const industry = fields.industry?.stringValue?.trim() || "";

        if (!name || !logo || !visible) return null;

        const url = tag 
          ? `https://auth-foundattion.web.app/${tag}/landing` 
          : "https://auth-foundattion.web.app/directorio";

        const words = name.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean);
        const initials = words.length > 1 
          ? (words[0][0] + words[1][0]).toUpperCase() 
          : (words[0]?.slice(0, 2).toUpperCase() || 'ET');

        return {
          id,
          name,
          logo,
          url,
          companyTag: tag,
          municipality: mun,
          department: dept,
          categoryEs: industry || (name.toLowerCase().match(/(comida|burger|food|king|sazon|alitas|empanada|pizza|pastel|restaurante|brosty)/) ? "Gastronomía & Restaurante" : "Comercio Verificado"),
          categoryEn: "Verified Merchant",
          taglineEs: `${mun}, ${dept}`,
          taglineEn: `${mun}, ${dept}`,
          logoColor: gradientPresets[idx % gradientPresets.length],
          initials
        };
      })
      .filter(Boolean);

    return mapped;
  } catch (err) {
    console.warn("Could not fetch directory companies from auth-foundattion endpoint:", err);
    return null;
  }
}
