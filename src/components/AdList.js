import React from 'react';

function AdList({ ads }) {
  if (ads.length === 0) {
    return <p className="text-gray-500">Inga annonser ännu.</p>;
  }

  return (
    <div className="space-y-4">
      {ads.map((ad, index) => (
        <div key={index} className="border p-4 rounded shadow">
          {ad.image && (
            <img src={ad.image} alt={ad.title} className="mb-2 w-full h-48 object-cover rounded" />
          )}
          <h2 className="text-xl font-semibold">{ad.title}</h2>
          <p className="text-gray-700">{ad.description}</p>
          <p className="text-purple-700 font-bold mt-2">{ad.price} Pi</p>
        </div>
      ))}
    </div>
  );
}

export default AdList;