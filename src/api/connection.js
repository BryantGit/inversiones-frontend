const API_URL = 'http://localhost:3000/api';

export async function getInversiones() {
  const res = await fetch(`${API_URL}/inversiones`);
  if (!res.ok) throw new Error('Error al obtener inversiones');
  return res.json();
}

export async function getInversion(id) {
  const res = await fetch(`${API_URL}/inversiones/${id}`);
  if (!res.ok) throw new Error('Error al obtener inversión');
  return res.json();
}

export async function createInversion(data) {
  console.log('Enviando a la API:', data); // ver valor de data
  const res = await fetch(`${API_URL}/inversiones`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al crear inversión');
  return res.json();
}
