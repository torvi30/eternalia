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
import { projectsConfig as defaultProjects } from '../data/projectsConfig';

const LOCAL_STORAGE_KEY = 'eternalia_custom_projects';

function getCustomLocalProjects() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (_err) {
    return null;
  }
}

function saveCustomLocalProjects(list) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    window.dispatchEvent(new Event('eternalia_projects_updated'));
  } catch (err) {
    console.warn('Could not save projects to local storage:', err);
  }
}

/**
 * Obtiene la lista completa de proyectos del holding y catálogo gastronómico/comercial.
 * La fuente única y directa de verdad es src/data/projectsConfig.js.
 */
export async function getProjects() {
  return defaultProjects;
}

/**
 * Agrega un nuevo proyecto al portafolio
 */
export async function addProject(newProjData) {
  const id = `proj-${Date.now()}`;
  const projectRecord = {
    ...newProjData,
    id,
    status: newProjData.status || 'live',
    badge: newProjData.badge || 'En Vivo',
    category: newProjData.category || 'commerce',
    logoColor: newProjData.logoColor || 'from-indigo-500 to-cyan-500',
    techStack: Array.isArray(newProjData.techStack) 
      ? newProjData.techStack 
      : (newProjData.techStack || 'React, Tailwind, Cloud').split(',').map(s => s.trim()),
    createdAt: new Date().toISOString(),
  };

  const currentList = await getProjects();
  const updatedList = [projectRecord, ...currentList];
  saveCustomLocalProjects(updatedList);

  if (isFirebaseConfigured) {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectRecord,
        createdAt: serverTimestamp(),
      });
      projectRecord.firestoreId = docRef.id;
    } catch (err) {
      console.warn("Error saving to Firestore projects:", err);
    }
  }

  return { success: true, project: projectRecord };
}

/**
 * Actualiza un proyecto existente
 */
export async function updateProject(id, updatedFields) {
  const currentList = await getProjects();
  const index = currentList.findIndex(p => p.id === id);

  if (index === -1) {
    return { success: false, error: 'Proyecto no encontrado' };
  }

  const processedTech = updatedFields.techStack 
    ? (Array.isArray(updatedFields.techStack) 
        ? updatedFields.techStack 
        : updatedFields.techStack.split(',').map(s => s.trim()))
    : currentList[index].techStack;

  currentList[index] = {
    ...currentList[index],
    ...updatedFields,
    techStack: processedTech,
    updatedAt: new Date().toISOString(),
  };

  saveCustomLocalProjects(currentList);

  if (isFirebaseConfigured && currentList[index].firestoreId) {
    try {
      await updateDoc(doc(db, 'projects', currentList[index].firestoreId), currentList[index]);
    } catch (err) {
      console.warn("Error updating in Firestore:", err);
    }
  }

  return { success: true, project: currentList[index] };
}

/**
 * Elimina un proyecto del portafolio
 */
export async function deleteProject(id) {
  const currentList = await getProjects();
  const target = currentList.find(p => p.id === id);
  const filtered = currentList.filter(p => p.id !== id);

  saveCustomLocalProjects(filtered);

  if (isFirebaseConfigured && target?.firestoreId) {
    try {
      await deleteDoc(doc(db, 'projects', target.firestoreId));
    } catch (err) {
      console.warn("Error deleting from Firestore:", err);
    }
  }

  return { success: true };
}
