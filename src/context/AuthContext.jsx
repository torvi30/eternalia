import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';

const AuthContext = createContext(null);

export const DEMO_ADMIN = {
  email: 'admin@eternalia.io',
  uid: 'eternalia-admin-dev-01',
  displayName: 'Admin Ejecutivo Eternalia',
  role: 'admin',
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persistent mock session
    const localSession = localStorage.getItem('eternalia_admin_session');
    if (localSession) {
      try {
        const parsed = JSON.parse(localSession);
        setUser(parsed);
      } catch (err) {
        localStorage.removeItem('eternalia_admin_session');
      }
    }

    if (isFirebaseConfigured) {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser({
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName || 'Admin Eternalia',
            role: 'admin',
          });
        } else if (!localStorage.getItem('eternalia_admin_session')) {
          setUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    // 1. Check Demo / Dev Credentials
    if (
      email.toLowerCase().trim() === 'admin@eternalia.io' && 
      password === 'Eternalia2026!'
    ) {
      setUser(DEMO_ADMIN);
      localStorage.setItem('eternalia_admin_session', JSON.stringify(DEMO_ADMIN));
      return { success: true, user: DEMO_ADMIN };
    }

    // 2. Real Firebase Auth
    if (isFirebaseConfigured) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const adminUser = {
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          displayName: userCredential.user.displayName || 'Admin Eternalia',
          role: 'admin',
        };
        setUser(adminUser);
        localStorage.setItem('eternalia_admin_session', JSON.stringify(adminUser));
        return { success: true, user: adminUser };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }

    // 3. Fallback for custom credentials in dev mode
    if (email && password.length >= 6) {
      const customDevAdmin = {
        email: email.trim(),
        uid: `dev-admin-${Date.now()}`,
        displayName: 'Administrador Autorizado',
        role: 'admin',
      };
      setUser(customDevAdmin);
      localStorage.setItem('eternalia_admin_session', JSON.stringify(customDevAdmin));
      return { success: true, user: customDevAdmin };
    }

    return { 
      success: false, 
      error: 'Credenciales inválidas. Usa admin@eternalia.io / Eternalia2026! o ingresa una contraseña de al menos 6 caracteres.' 
    };
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn('Firebase signout error:', err);
      }
    }
    localStorage.removeItem('eternalia_admin_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
