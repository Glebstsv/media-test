export class Timeline {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.posts = [];
        this.loadPosts();
    }
    
    addPost(text, coordinates) {
        const post = {
            id: Date.now(),
            text: text.trim(),
            coordinates: coordinates,
            date: new Date(),
            formattedDate: this.formatDate(new Date())
        };
        
        this.posts.unshift(post);
        this.savePosts();
        this.render();
        return post;
    }
    
    formatDate(date) {
        return date.toLocaleString('ru-RU', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    render() {
        this.container.innerHTML = this.posts.map(post => `
            <div class="post" data-id="${post.id}">
                <div class="post-date">${post.formattedDate}</div>
                <div class="post-text">${post.text}</div>
                <div class="post-coords">
                    Широта: ${post.coordinates.latitude.toFixed(6)}, 
                    Долгота: ${post.coordinates.longitude.toFixed(6)}
                </div>
            </div>
        `).join('');
    }
    
    savePosts() {
        try {
            localStorage.setItem('timeline-posts', JSON.stringify(this.posts));
        } catch (error) {
            console.warn('Не удалось сохранить записи');
        }
    }
    
    loadPosts() {
        try {
            const saved = localStorage.getItem('timeline-posts');
            if (saved) {
                this.posts = JSON.parse(saved);
                this.render();
            }
        } catch (error) {
            console.warn('Не удалось загрузить записи');
        }
    }
}