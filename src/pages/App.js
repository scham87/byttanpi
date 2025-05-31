import React, { useEffect, useState } from 'react';
import AdForm from '../components/AdForm';
import AdList from '../components/AdList';

function App() {
  const [user, setUser] = useState(null);
  const [ads, setAds] = useState(() => {
    const savedAds = localStorage.getItem('ads');
    return savedAds ? JSON.parse(savedAds) : [];
  });

  useEffect(() => {
    const loadPiSDK = async () => {
      if (window.Pi) {
        try {
          const scopes = ['username', 'payments'];
          window.Pi.init({ version: "2.0" });
          const authResult = await window.Pi.authenticate(scopes, onIncompletePaymentFound);
          setUser(authResult.user);
        } catch (error) {
          console.error('Pi authentication failed:', error);
        }
      } else {
        console.warn('Pi SDK not available. Are you running inside Pi Browser?');
      }
    };

    const onIncompletePaymentFound = (payment) => {
      console.log('Incomplete payment found:', payment);
    };

    loadPiSDK();
  }, []);

  const addAd = (ad) => {
    const newAds = [ad, ...ads];
    setAds(newAds);
    localStorage.setItem('ads', JSON.stringify(newAds));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="text-2xl font-bold mb-4 text-center">ByttanPi</header>
      <main className="max-w-xl mx-auto bg-white p-6 rounded shadow space-y-6">
        {user ? (
          <>
            <p className="text-green-600 font-semibold mb-4">Inloggad som: @{user.username}</p>
            <AdForm onAddAd={addAd} />
            <AdList ads={ads} />
          </>
        ) : (
          <p className="text-gray-700">Försöker logga in via Pi Network...</p>
        )}
      </main>
    </div>
  );
}

export default App;