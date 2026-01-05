import { Timeline } from './timeline.js';
import { GeolocationService } from './geolocation.js';
import { CoordinateModal } from './modal.js';
import '../main.css';

document.addEventListener('DOMContentLoaded', () => {
    const timeline = new Timeline('timeline-container');
    const modal = new CoordinateModal();
    const textarea = document.getElementById('post-input');
    const errorElement = document.getElementById('input-error');
    
    textarea.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            await handleNewPost(timeline, modal, textarea, errorElement);
        }
    });
});

async function handleNewPost(timeline, modal, textarea, errorElement) {
    const text = textarea.value.trim();
    
    if (!text) {
        showError(errorElement, 'Введите текст сообщения');
        textarea.focus();
        return;
    }
    
    hideError(errorElement);
    
    try {
        const coords = await GeolocationService.getCurrentPosition();
        
        timeline.addPost(text, coords);
        
        textarea.value = '';
        
    } catch (error) {
        console.warn('Геолокация недоступна:', error.message);
        
        try {
            const manualCoords = await modal.show();
            timeline.addPost(text, manualCoords);
            textarea.value = '';
            
        } catch (modalError) {
            console.log('Пользователь отменил ввод координат:', modalError.message);
            showError(errorElement, 'Не удалось получить координаты. Сообщение не отправлено.');
        }
    }
}

function showError(element, message) {
    element.textContent = message;
    element.style.display = 'block';
}

function hideError(element) {
    element.textContent = '';
    element.style.display = 'none';
}