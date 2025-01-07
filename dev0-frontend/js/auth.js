function switchTab(tab) {
    document.querySelectorAll('.auth-form').forEach(form => form.classList.add('hidden'));
    document.getElementById(`${tab}-form`).classList.remove('hidden');
    
    document.querySelectorAll('.auth-tabs button').forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
}

async function handleLogin(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;

    try {
        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = 'index.html';
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Login failed');
    }
}