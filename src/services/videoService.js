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

const LOCAL_STORAGE_KEY = 'eternalia_custom_videos';

export const defaultVideos = [
  {
    id: "video-workforce-demo",
    title: "Workforce OS • Demo de Liquidación Escrow & Garantías Digitales",
    description: "Recorrido paso a paso por la interfaz de emisión de cotizaciones algorítmicas, validación biométrica y retención segura de fondos.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Standard embeddable video URL format
    thumbnailUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80",
    category: "workforce",
    categoryLabel: "Workforce OS & Fintech",
    duration: "2:45 min",
    badge: "Plataforma Core",
    featured: true,
    views: "1.4k"
  },
  {
    id: "video-commerce-cloud",
    title: "Commerce Cloud • Micro-Frontends & Pedidos en <18ms",
    description: "Demostración de velocidad Lighthouse 99/100, carta QR dinámica y sincronización instantánea con comanderos de cocina.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
    category: "commerce",
    categoryLabel: "Commerce Cloud",
    duration: "1:35 min",
    badge: "Alta Conversión",
    featured: true,
    views: "2.8k"
  },
  {
    id: "video-iot-telematics",
    title: "Enterprise Ventures • Telemetría Satelital IoT y Control de Flotas",
    description: "Auditoría en vivo de sensores de combustible, diagnóstico del motor por CAN bus y alertas predictivas de ruta para transporte pesado.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=800&auto=format&fit=crop&q=80",
    category: "ventures",
    categoryLabel: "Industrial IoT",
    duration: "3:12 min",
    badge: "Misión Crítica",
    featured: false,
    views: "980"
  },
  {
    id: "video-hyperlocal-mesh",
    title: "Red Comercial Inteligente • Geolocalización y Conexión WhatsApp Directa",
    description: "Prueba de campo del directorio interactivo de Marinilla: mapas oscuros Leaflet, conexión directa sin comisiones y ficha de negocios.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://images.unsplash.com/photo-1524850011238-e3d235c7d4c9?w=800&auto=format&fit=crop&q=80",
    category: "directories",
    categoryLabel: "Red Territorial",
    duration: "2:10 min",
    badge: "Hiperlocal",
    featured: false,
    views: "3.2k"
  }
];

function getCustomLocalVideos() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_err) {
    return null;
  }
}

function saveCustomLocalVideos(list) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('eternalia_videos_updated'));
  } catch (err) {
    console.warn('Could not save videos to local storage:', err);
  }
}

/**
 * Obtiene la lista completa de videos corporativos
 */
export async function getVideos() {
  const localList = getCustomLocalVideos();
  if (localList && localList.length > 0) {
    return localList;
  }

  if (!isFirebaseConfigured) {
    saveCustomLocalVideos(defaultVideos);
    return defaultVideos;
  }

  try {
    const snap = await getDocs(collection(db, 'videos'));
    if (!snap.empty) {
      const items = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      saveCustomLocalVideos(items);
      return items;
    } else {
      saveCustomLocalVideos(defaultVideos);
      return defaultVideos;
    }
  } catch (err) {
    console.warn("⚠️ [Eternalia Firestore]: Fallback a videos locales:", err);
    saveCustomLocalVideos(defaultVideos);
    return defaultVideos;
  }
}

/**
 * Agrega un nuevo video corporativo
 */
export async function addVideo(newVideoData) {
  const id = `video-${Date.now()}`;
  const videoRecord = {
    ...newVideoData,
    id,
    duration: newVideoData.duration || '2:00 min',
    badge: newVideoData.badge || 'Demo en Vivo',
    category: newVideoData.category || 'workforce',
    thumbnailUrl: newVideoData.thumbnailUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    views: '1',
    createdAt: new Date().toISOString(),
  };

  const currentList = await getVideos();
  const updatedList = [videoRecord, ...currentList];
  saveCustomLocalVideos(updatedList);

  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, 'videos'), {
        ...videoRecord,
        createdAt: serverTimestamp(),
      });
      videoRecord.firestoreId = docRef.id;
    } catch (err) {
      console.warn("Error saving to Firestore videos:", err);
    }
  }

  return { success: true, video: videoRecord };
}

/**
 * Actualiza un video existente
 */
export async function updateVideo(id, updatedFields) {
  const currentList = await getVideos();
  const index = currentList.findIndex(v => v.id === id);

  if (index === -1) {
    return { success: false, error: 'Video no encontrado' };
  }

  currentList[index] = {
    ...currentList[index],
    ...updatedFields,
    updatedAt: new Date().toISOString(),
  };

  saveCustomLocalVideos(currentList);

  if (isFirebaseConfigured && currentList[index].firestoreId) {
    try {
      await updateDoc(doc(db, 'videos', currentList[index].firestoreId), currentList[index]);
    } catch (err) {
      console.warn("Error updating in Firestore:", err);
    }
  }

  return { success: true, video: currentList[index] };
}

/**
 * Elimina un video del hub
 */
export async function deleteVideo(id) {
  const currentList = await getVideos();
  const target = currentList.find(v => v.id === id);
  const filtered = currentList.filter(v => v.id !== id);

  saveCustomLocalVideos(filtered);

  if (isFirebaseConfigured && target?.firestoreId) {
    try {
      await deleteDoc(doc(db, 'videos', target.firestoreId));
    } catch (err) {
      console.warn("Error deleting from Firestore:", err);
    }
  }

  return { success: true };
}
