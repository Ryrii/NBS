document.addEventListener('DOMContentLoaded', () => {
  
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        await window.ipcRenderer.invoke('login', { email, password });
        loginForm.reset();
        // go to profile page
        window.location.href = 'profile.html';
      } catch (error) {
        alert('Invalid email or password');
      }
    });
})