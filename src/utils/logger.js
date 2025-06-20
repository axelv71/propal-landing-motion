const LOG_COLORS = {
    INFO: '#2196f3',    // bleu
    WARN: '#ff9800',    // orange
    ERROR: '#f44336',   // rouge
    DEBUG: '#9e9e9e',   // gris
    INIT: '#7f5af0',    // violet
    SUCCESS: '#4caf50', // vert
  };
  
  export function logStyled(type = 'INFO', message = '', colorOverride = null) {
    const upperType = type.toUpperCase();
    const color = colorOverride || LOG_COLORS[upperType] || '#333';
  
    console.log(
      `%c${upperType}%c ${message}`,
      `background: ${color}; color: white; padding: 2px 6px; border-radius: 4px; font-weight: bold;`,
      'color: #333; font-weight: normal;'
    );
  }