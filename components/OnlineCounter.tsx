
import React, { useState, useEffect } from 'react';
/* FIX: Using modular imports for Firebase v9+ compatibility as the environment uses the modern SDK structure */
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, push, set, onValue, onDisconnect, serverTimestamp, DatabaseReference } from 'firebase/database';

interface OnlineCounterProps {
  label: string;
}

/**
 * ВНИМАНИЕ: Для работы счетчика вставьте ваши ключи Firebase.
 * Если ключи не указаны, компонент будет использовать демонстрационный режим.
 */
const firebaseConfig = {
  apiKey: "AIzaSyAs-DEMO-ONLY-REPLACE-THIS",
  authDomain: "walkers-madrid-demo.firebaseapp.com",
  databaseURL: "https://walkers-madrid-demo-default-rtdb.firebaseio.com",
  projectId: "walkers-madrid-demo",
  storageBucket: "walkers-madrid-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

export const OnlineCounter: React.FC<OnlineCounterProps> = ({ label }) => {
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let dbRef: DatabaseReference | null = null;
    let userStatusRef: DatabaseReference | null = null;
    let unsubscribe: (() => void) | null = null;

    try {
      // Инициализация Firebase (Modular style)
      /* FIX: Using getApps() and initializeApp() from 'firebase/app' to avoid property access errors on default export */
      const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
      
      const db = getDatabase(app);
      dbRef = ref(db, 'online_users');

      // 1. Создаем временную сессию для текущего пользователя
      /* FIX: Using push() modular function */
      userStatusRef = push(dbRef);

      // 2. Устанавливаем статус при входе
      /* FIX: Using serverTimestamp() for server-side timestamp and modular set() function */
      set(userStatusRef, {
        last_active: serverTimestamp(),
        id: userStatusRef.key
      });

      // 3. ПРАВИЛО КРИТИЧЕСКОЙ ВАЖНОСТИ: 
      // При отключении (закрытии вкладки) Firebase САМ удалит этот узел на сервере.
      /* FIX: Using onDisconnect() modular function */
      onDisconnect(userStatusRef).remove();

      // 4. Слушаем изменения общего количества пользователей
      /* FIX: Using onValue() modular function instead of legacy .on() method */
      unsubscribe = onValue(dbRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const countValue = Object.keys(data).length;
          setOnlineCount(countValue);
        } else {
          setOnlineCount(0);
        }
        setIsSyncing(false);
        setError(false);
      }, (err) => {
        console.warn("Firebase error (likely permissions/config):", err);
        setError(true);
        setIsSyncing(false);
      });

      return () => {
        /* FIX: Proper cleanup using the unsubscribe function returned by onValue */
        if (unsubscribe) unsubscribe();
        if (userStatusRef) {
          set(userStatusRef, null);
        }
      };
    } catch (e) {
      console.error("Failed to init Realtime Online Counter:", e);
      setError(true);
      setIsSyncing(false);
    }
  }, []);

  // Демонстрационный режим, если Firebase не настроен или выдал ошибку
  const displayCount = error ? Math.floor(Math.random() * 50) + 1200 : onlineCount;

  return (
    <div className={`flex items-center gap-3 bg-black/40 backdrop-blur-md border border-white/5 px-4 py-2 rounded-full shadow-lg transition-all hover:border-[#bf953f]/50 group ${isSyncing ? 'opacity-50' : 'opacity-100'}`}>
      <div className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${error ? 'bg-orange-400' : 'bg-green-400'}`}></span>
        <span className={`relative inline-flex rounded-full h-2 w-2 ${error ? 'bg-orange-500' : 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]'}`}></span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-[11px] font-mono font-black text-white group-hover:gold-text-gradient transition-all">
          {displayCount.toLocaleString()}
        </span>
        <span className="text-[8px] font-black uppercase tracking-[0.1em] text-gray-500 group-hover:text-gray-300">
          {label} {error && "(DEMO)"}
        </span>
      </div>
      
      {/* Маленький индикатор живого соединения */}
      {!error && !isSyncing && (
        <div className="w-1 h-1 bg-[#bf953f] rounded-full animate-pulse ml-1 opacity-40"></div>
      )}
    </div>
  );
};
