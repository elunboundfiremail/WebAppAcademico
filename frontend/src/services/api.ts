// frontend/src/services/api.ts

const API_BASE_URL = 'http://localhost:3000/api'; // URL de nuestro backend

export const api = {
  // Método para obtener datos (GET)
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        // Aquí luego enviaremos el token JWT del login de Jonathan
      }
    });
    if (!response.ok) throw new Error('Error en la petición GET');
    return response.json();
  },

  // Método para enviar datos (POST) - Ej: Crear curso, Inscribir alumno
  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Error en la petición POST');
    return result;
  }
};