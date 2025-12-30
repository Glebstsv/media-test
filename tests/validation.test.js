// tests/validation.test.js
const { parseCoordinates } = require('../src/scripts/validation');

describe('parseCoordinates', () => {
    test('корректно парсит координаты с пробелом', () => {
        expect(parseCoordinates('51.50851, −0.12572')).toEqual({
            latitude: 51.50851,
            longitude: -0.12572
        });
    });

    test('корректно парсит координаты без пробела', () => {
        expect(parseCoordinates('51.50851,−0.12572')).toEqual({
            latitude: 51.50851,
            longitude: -0.12572
        });
    });

    test('корректно парсит координаты в квадратных скобках', () => {
        expect(parseCoordinates('[51.50851, −0.12572]')).toEqual({
            latitude: 51.50851,
            longitude: -0.12572
        });
    });

    test('выбрасывает ошибку при неверном формате', () => {
        expect(() => parseCoordinates('invalid')).toThrow('Неверный формат координат');
    });

    test('выбрасывает ошибку при пустой строке', () => {
        expect(() => parseCoordinates('')).toThrow('Введите координаты');
    });

    test('выбрасывает ошибку при null', () => {
        expect(() => parseCoordinates(null)).toThrow('Введите координаты');
    });
});