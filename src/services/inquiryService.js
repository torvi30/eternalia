import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase/config';

/**
 * Guarda una solicitud de contacto, alianza o inversor en Firestore
 * @param {Object} inquiryData { name, email, role, message }
 * @returns {Promise<{success: boolean, id?: string}>}
 */
export async function saveInquiry(inquiryData) {
  try {
    if (!isFirebaseConfigured) {
      console.warn(
        "⚠️ [Eternalia Firebase]: Credenciales reales no configuradas en .env.local. Simulando registro exitoso de solicitud:",
        inquiryData
      );
      // Simular latencia de red
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { success: true, id: `mock-${Date.now()}` };
    }

    const docRef = await addDoc(collection(db, 'inquiries'), {
      ...inquiryData,
      status: 'pending_review',
      createdAt: serverTimestamp(),
      platform: 'eternalia-landing',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });

    console.log("✅ [Eternalia Firebase]: Lead guardado exitosamente en Firestore con ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ [Eternalia Firebase] Error al guardar en Firestore:", error);
    // Devolvemos success true para no romper la experiencia de usuario si hay problema temporal de red
    return { success: false, error: error.message };
  }
}
