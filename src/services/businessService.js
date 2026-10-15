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

function saveCustomLocalBusinesses(list) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    // Dispatch custom event so the public directory updates in real-time if open in same tab
    window.dispatchEvent(new Event('eternalia_businesses_updated'));
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
    saveCustomLocalBusinesses(defaultBusinesses);
    return defaultBusinesses;
  }

  try {
    const snap = await getDocs(collection(db, 'businesses'));
    if (!snap.empty) {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      saveCustomLocalBusinesses(items);
      return items;
    } else {
      // Si la colección de Firestore está vacía, inicializamos con los comercios por defecto
      saveCustomLocalBusinesses(defaultBusinesses);
      return defaultBusinesses;
    }
  } catch (err) {
    console.warn("⚠️ [Eternalia Firestore]: Fallback a comercios locales:", err);
    saveCustomLocalBusinesses(defaultBusinesses);
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
