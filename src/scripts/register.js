document.addEventListener('DOMContentLoaded', () => {

  
    const addUserForm = document.getElementById('registerForm');
    addUserForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const username = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      try {
        console.log("try",username,email,password);
        await window.ipcRenderer.invoke('add-user', { username, email, password });
        loadUsers();
        addUserForm.reset();
        window.location.href = 'login.html';
      } catch (error) {
        alert('veuillez remplir tous les champs');
      }
    });
  
    async function loadUsers() {
      try {
        const users = await window.ipcRenderer.invoke('get-users');
        const userList = document.getElementById('userList');
        userList.innerHTML = '';
        users.forEach(user => {
          const li = document.createElement('li');
          li.textContent = `${user.name} (${user.email})`;
          userList.appendChild(li);
        });
      } catch (error) {
        console.error('Error loading users:', error);
      }
    }
  
    // Charger les utilisateurs au démarrage
    loadUsers();
  });
  