const apiUrl = 'http://localhost:3000';

function loadLoginPage(container) {
    container.innerHTML = `
        <h2>Login</h2>
        <form id="loginForm">
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Login</button>
        </form>
        <p id="loginMessage"></p>
    `;

    document.getElementById('loginForm').onsubmit = async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('authToken', data.session.access_token);
                document.getElementById('loginMessage').innerText = 'Login successful!';
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            document.getElementById('loginMessage').innerText = error.message;
        }
    };
}

function loadRegisterPage(container) {
    container.innerHTML = `
        <h2>Register</h2>
        <form id="registerForm">
            <input type="text" id="firstName" placeholder="First Name" required>
            <input type="text" id="lastName" placeholder="Last Name" required>
            <input type="email" id="email" placeholder="Email" required>
            <input type="password" id="password" placeholder="Password" required>
            <button type="submit">Register</button>
        </form>
        <p id="registerMessage"></p>
    `;

    document.getElementById('registerForm').onsubmit = async (event) => {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ first_name: firstName, last_name: lastName, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                document.getElementById('registerMessage').innerText = 'Registration successful!';
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            document.getElementById('registerMessage').innerText = error.message;
        }
    };
}
