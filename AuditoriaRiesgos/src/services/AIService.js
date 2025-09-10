// Servicio de IA para evaluación de riesgos bancarios
export class AIService {
  static evaluateBankingAsset(assetName) {
    // Mapeo inteligente de activos bancarios con evaluaciones específicas
    const riskProfiles = {
      // Base de datos
      'base de datos': {
        riesgo: 'Exfiltración de datos sensibles de clientes',
        impacto: 'Pérdida de información confidencial, multas regulatorias GDPR/LFPDPPP y daño reputacional severo',
        tratamiento: 'Implementar cifrado AES-256 para datos en reposo y tránsito, controles de acceso basados en roles (RBAC), y monitoreo continuo de acceso a datos sensibles',
        probabilidad: 'Media'
      },
      'servidor de base de datos': {
        riesgo: 'Exfiltración de datos sensibles de clientes', 
        impacto: 'Pérdida de información confidencial, multas regulatorias GDPR/LFPDPPP y daño reputacional severo',
        tratamiento: 'Implementar cifrado AES-256 para datos en reposo y tránsito, controles de acceso basados en roles (RBAC), y monitoreo continuo de acceso a datos sensibles',
        probabilidad: 'Media'
      },

      // API Transacciones
      'api transacciones': {
        riesgo: 'Manipulación de transacciones financieras y fraudes',
        impacto: 'Pérdidas económicas directas, incumplimiento regulatorio PCI DSS y daño a la confianza del cliente',
        tratamiento: 'Implementar autenticación multifactor (MFA), validación de entradas OWASP, limitación de tasa (rate limiting) y firma digital de transacciones',
        probabilidad: 'Alta'
      },
      'api bancaria': {
        riesgo: 'Manipulación de transacciones financieras y fraudes',
        impacto: 'Pérdidas económicas directas, incumplimiento regulatorio PCI DSS y daño a la confianza del cliente', 
        tratamiento: 'Implementar autenticación multifactor (MFA), validación de entradas OWASP, limitación de tasa (rate limiting) y firma digital de transacciones',
        probabilidad: 'Alta'
      },

      // Aplicación Web
      'aplicación web': {
        riesgo: 'Vulnerabilidades XSS, CSRF y inyección de código',
        impacto: 'Robo de credenciales, suplantación de identidad de clientes y acceso no autorizado a cuentas',
        tratamiento: 'Implementar Content Security Policy (CSP), sanitización de entradas, cookies con flags Secure/HttpOnly/SameSite, y WAF (Web Application Firewall)',
        probabilidad: 'Media'
      },
      'banca en línea': {
        riesgo: 'Vulnerabilidades XSS, CSRF y inyección de código',
        impacto: 'Robo de credenciales, suplantación de identidad de clientes y acceso no autorizado a cuentas',
        tratamiento: 'Implementar Content Security Policy (CSP), sanitización de entradas, cookies con flags Secure/HttpOnly/SameSite, y WAF (Web Application Firewall)',
        probabilidad: 'Media'
      },

      // Servidor de Correo
      'servidor de correo': {
        riesgo: 'Ataques de phishing, compromiso de cuentas y exfiltración de información',
        impacto: 'Suplantación de identidad institucional, robo de información confidencial y propagación de malware',
        tratamiento: 'Configurar DMARC/DKIM/SPF, implementar filtrado antiphishing avanzado, políticas de contraseñas robustas y capacitación contra phishing',
        probabilidad: 'Alta'
      },
      'correo electrónico': {
        riesgo: 'Ataques de phishing, compromiso de cuentas y exfiltración de información',
        impacto: 'Suplantación de identidad institucional, robo de información confidencial y propagación de malware',
        tratamiento: 'Configurar DMARC/DKIM/SPF, implementar filtrado antiphishing avanzado, políticas de contraseñas robustas y capacitación contra phishing',
        probabilidad: 'Alta'
      },

      // Firewall
      'firewall': {
        riesgo: 'Accesos no autorizados a la red interna y bypass de controles de seguridad',
        impacto: 'Exposición de sistemas críticos a amenazas externas, robo de información y compromiso de infraestructura',
        tratamiento: 'Revisar y actualizar regularmente las reglas, implementar segregación de redes (network segmentation), monitoreo continuo de tráfico y pruebas de penetración periódicas',
        probabilidad: 'Media'
      },
      'firewall perimetral': {
        riesgo: 'Accesos no autorizados a la red interna y bypass de controles de seguridad',
        impacto: 'Exposición de sistemas críticos a amenazas externas, robo de información y compromiso de infraestructura',
        tratamiento: 'Revisar y actualizar regularmente las reglas, implementar segregación de redes (network segmentation), monitoreo continuo de tráfico y pruebas de penetración periódicas',
        probabilidad: 'Media'
      }
    };

    // Buscar coincidencia inteligente
    const lowerAsset = assetName.toLowerCase();
    for (const [key, value] of Object.entries(riskProfiles)) {
      if (lowerAsset.includes(key)) {
        return value;
      }
    }

    // Evaluación por defecto para activos no reconocidos
    return {
      riesgo: `Pérdida o compromiso de ${assetName}`,
      impacto: `Impacto operacional y financiero significativo debido a la indisponibilidad o compromiso de ${assetName}`,
      tratamiento: 'Realizar análisis de riesgo detallado, implementar controles de seguridad basados en ISO 27001 y establecer plan de recuperación ante desastres',
      probabilidad: 'Media'
    };
  }
}

export default AIService;