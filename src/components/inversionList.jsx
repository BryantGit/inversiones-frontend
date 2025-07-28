import React, { useEffect, useState } from 'react';
import { getInversiones } from '../api/connection.js';
export default function InversionList({ onSelect }) {
  const [inversiones, setInversiones] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getInversiones()
      .then(setInversiones)
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Lista de Inversiones</h2>
      <ul>
        {inversiones.map(inv => (
          <li key={inv.id}>
            <button onClick={() => onSelect(inv.id)}>
              Inversión #{inv.id} - Monto: ${inv.montoinicial}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
