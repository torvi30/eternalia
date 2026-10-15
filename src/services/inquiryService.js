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

/**
 * Guarda una cotización interactiva generada desde el Instant Quote Engine
 * @param {Object} quoteData
 * @returns {Promise<{success: boolean, id?: string}>}
 */
export async function saveQuoteRequest(quoteData) {
  try {
    if (!isFirebaseConfigured) {
      console.warn(
        "⚠️ [Eternalia Firebase]: Simulando registro exitoso de cotización:",
        quoteData
      );
      await new Promise((resolve) => setTimeout(resolve, 800));
      return { success: true, id: `quote-mock-${Date.now()}` };
    }

    const docRef = await addDoc(collection(db, 'quotes'), {
      ...quoteData,
      status: 'pending_review',
      createdAt: serverTimestamp(),
      platform: 'eternalia-quote-engine',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
    });

    console.log("✅ [Eternalia Firebase]: Cotización guardada exitosamente en Firestore con ID:", docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("❌ [Eternalia Firebase] Error al guardar cotización:", error);
    return { success: false, error: error.message };
  }
}

