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
        throw new Error(
            'Неверный формат координат. Используйте: "широта, долгота" или "[широта, долгота]"',
        );
    }

    const latitude = parseFloat(parts[0]);
    const longitude = parseFloat(parts[1]);

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        throw new Error('Координаты должны быть числами');
    }

    return {
        latitude,
        longitude,
    };
}
