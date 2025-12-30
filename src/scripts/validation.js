export function parseCoordinates(input) {  
    if (!input || typeof input !== 'string') {
        throw new Error('Введите координаты');
    }
    
    const cleaned = input
        .replace(/[−–—]/g, '-')
        .replace(/\[|\]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    
    const parts = cleaned.split(/\s*,\s*/);
    
    if (parts.length !== 2) {
        throw new Error('Неверный формат координат. Используйте: "широта, долгота" или "[широта, долгота]"');
    }
    
    const latitude = parseFloat(parts[0]);
    const longitude = parseFloat(parts[1]);
    
    if (isNaN(latitude) || isNaN(longitude)) {
        throw new Error('Координаты должны быть числами');
    }
    
    return {
        latitude: latitude,
        longitude: longitude
    };
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { parseCoordinates };
}