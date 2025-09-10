// Servicio de autenticación mejorado con más funcionalidades
const credentials = {
  username: "admin",
  password: "123456"
};

// Simular diferentes roles de usuario
const userRoles = {
  "admin": ["admin", "auditor", "user"],
  "auditor": ["auditor", "user"],
  "user": ["user"]
};

// Login function que simula mejor una API real
export const login = (username, password) => {
  return new Promise((resolve, reject) => {
    // Simular delay de red variable (más realista)
    const networkDelay = Math.random() * 800 + 200;
    
    setTimeout(() => {
      if (username === credentials.username && password === credentials.password) {
        // Crear token más realista
        const token = btoa(`mock-token-${username}-${Date.now()}-${Math.random().toString(36).substr(2)}`);
        
        // Almacenar información de sesión
        const userData = {
          username,
          token,
          roles: userRoles[username] || ["user"],
          loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', username);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        resolve({ 
          success: true, 
          user: username, 
          token,
          roles: userRoles[username] || ["user"],
          message: "Inicio de sesión exitoso"
        });
      } else {
        // Simular diferentes mensajes de error
        const errors = [
          "Credenciales inválidas",
          "Usuario o contraseña incorrectos",
          "Acceso denegado. Verifique sus credenciales"
        ];
        
        reject({ 
          success: false, 
          message: errors[Math.floor(Math.random() * errors.length)],
          code: "AUTH_FAILED"
        });
      }
    }, networkDelay);
  });
};

// Verificar autenticación con validación de token
export const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  const user = localStorage.getItem('user');
  
  if (!token || !user) return false;
  
  // Verificar que el token "simulado" tenga el formato esperado
  try {
    const tokenParts = atob(token).split('-');
    if (tokenParts.length >= 3 && tokenParts[1] === user) {
      return true;
    }
  } catch (e) {
    console.error("Error decoding token:", e);
  }
  
  // Token inválido, limpiar almacenamiento
  logout();
  return false;
};

// Obtener datos del usuario
export const getUserData = () => {
  if (!isAuthenticated()) return null;
  
  try {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (e) {
    console.error("Error parsing user data:", e);
    return null;
  }
};

// Cerrar sesión mejorado
export const logout = () => {
  // Guardar registro del logout
  const logoutTime = new Date().toISOString();
  const user = localStorage.getItem('user');
  
  console.log(`User ${user} logged out at ${logoutTime}`);
  
  // Limpiar todo el almacenamiento relacionado con la sesión
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  localStorage.removeItem('userData');
  
  return { success: true, message: "Sesión cerrada correctamente" };
};

// Verificar expiración de sesión (simulada)
export const checkSessionExpiry = () => {
  const userData = getUserData();
  if (!userData) return true;
  
  const loginTime = new Date(userData.loginTime);
  const currentTime = new Date();
  const sessionDuration = 8 * 60 * 60 * 1000; // 8 horas de sesión
  
  return (currentTime - loginTime) > sessionDuration;
};

export default {
  login,
  isAuthenticated,
  getUserData,
  logout,
  checkSessionExpiry
};