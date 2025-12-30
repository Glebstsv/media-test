import { parseCoordinates } from './validation.js';

export class CoordinateModal {
    constructor() {
        this.modal = this.createModal();
        this.resolve = null;
        this.reject = null;
        this.isShowing = false;
    }

    show() {
        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            
            this.modal.style.display = 'flex';
            this.isShowing = true;
            
            const input = this.modal.querySelector('#coord-input');
            setTimeout(() => input.focus(), 100);
        });
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'none'; 
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Введите координаты вручную</h3>
                <p>Разрешите доступ к геолокации или введите координаты вручную</p>
                <p>Формат: широта, долгота<br>Пример: 51.50851, -0.12572</p>
                <input type="text" id="coord-input" 
                       placeholder="51.50851, -0.12572"
                       autocomplete="off"/>
                <div class="modal-actions">
                    <button class="btn-ok">OK</button>
                    <button class="btn-cancel">Отмена</button>
                </div>
                <div class="error-message" id="modal-error"></div>
            </div>
        `;

        document.body.append(modal);
        
        modal.querySelector('.btn-ok').onclick = () => this.handleOk();
        modal.querySelector('.btn-cancel').onclick = () => this.handleCancel();
        modal.querySelector('#coord-input').onkeydown = (e) => {
            if (e.key === 'Enter') this.handleOk();
        };
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.handleCancel();
            }
        });

        return modal;
    }

    handleOk() {
        const input = this.modal.querySelector('#coord-input');
        const errorDiv = this.modal.querySelector('#modal-error');

        try {
            const coords = parseCoordinates(input.value);
            if (this.resolve) {
                this.resolve(coords);
            }
            this.close();
        } catch (error) {
            errorDiv.textContent = error.message;
            errorDiv.style.display = 'block';
            input.classList.add('error');
            input.focus();
        }
    }

    handleCancel() {
        if (this.reject) {
            this.reject(new Error('Пользователь отменил ввод'));
        }
        this.close();
    }

    close() {
        this.modal.style.display = 'none';
        this.isShowing = false;
        this.resolve = null;
        this.reject = null;
        
        const input = this.modal.querySelector('#coord-input');
        const errorDiv = this.modal.querySelector('#modal-error');
        input.value = '';
        input.classList.remove('error');
        errorDiv.textContent = '';
        errorDiv.style.display = 'none';
    }
}