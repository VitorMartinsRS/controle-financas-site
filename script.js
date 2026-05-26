document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer para animações
const observerOptions = { 
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .category-box, .step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
// Exemplo de uso da API de fact-check
async function verificarFato(query) {
    try {
        const response = await fetch(`http://localhost:5000/verificar?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        console.log('Resultado:', data);
        return data;
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Exemplo de envio do formulário de contato
async function enviarContato(nome, email, mensagem) {
    try {
        const response = await fetch('http://localhost:5000/contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome, email, mensagem })
        });
        const data = await response.json();
        console.log('Resposta:', data);
        return data;
    } catch (error) {
        console.error('Erro:', error);
    }
}

// Verificar status do sistema
async function verificarStatus() {
    const response = await fetch('http://localhost:5000/status');
    const data = await response.json();
    console.log('Status do sistema:', data);
}