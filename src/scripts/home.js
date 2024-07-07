document.addEventListener('DOMContentLoaded', async() => {
  const user = await window.ipcRenderer.invoke('check-user');
  const navMenu = document.getElementById('navMenu');
  if (user) {
    navMenu.innerHTML = `
      <a href="profile.html">Profil</a>
    `;
  }else{
    navMenu.innerHTML = `
      <a href="register.html">S'inscrire</a>
      <a href="login.html">Se connecter</a>
    `;
  }

  

  if (document.getElementById('checkSoftware')) {
    const checkSoftwareButton = document.getElementById('checkSoftware');
    checkSoftwareButton.addEventListener('click', async () => {
      const softwareInfo = await window.ipcRenderer.invoke('check-software');
      const infoDiv = document.getElementById('softwareInfo');
      infoDiv.innerHTML = `
        <p>Python: ${softwareInfo.python || 'Not installed'}</p>
        <p>Visual Studio Code: ${softwareInfo.vscode || 'Not installed'}</p>
        <p>MySQL: ${softwareInfo.mysql || 'Not installed'}</p>
      `;
    });
  }
});
