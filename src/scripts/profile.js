document.addEventListener('DOMContentLoaded', async () => {
    const user = await window.ipcRenderer.invoke('check-user');
    if (!user) {
        window.location.href = 'login.html';
    }
    const profileInfo = document.getElementById('profileInfo');
    profileInfo.innerHTML = `
      <p>Name: ${user.name}</p>
      <p>Email: ${user.email}</p>
    `;
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', async () => {
        await window.ipcRenderer.invoke('logout');
        window.location.href = 'login.html';
    });
})