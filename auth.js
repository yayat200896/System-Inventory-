/**
 * auth.js
 * -------
 * Modul autentikasi: menangani login, logout, dan validasi kredensial.
 * Kredensial bersifat statis (demo) — ganti dengan API call pada produksi.
 */

const CREDENTIALS = {
  email:    'admin@inventaris.id',
  password: 'admin123',
};

/** Proses login: validasi input, animasi transisi, lalu init App */
function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  const errEl = document.getElementById('login-error');

  if (email === CREDENTIALS.email && pass === CREDENTIALS.password) {
    errEl.classList.remove('show');

    const loginScreen = document.getElementById('login-screen');
    loginScreen.classList.add('fade-out');

    setTimeout(() => {
      loginScreen.style.display = 'none';
      const appEl = document.getElementById('app-screen');
      appEl.classList.add('show');
      App.init();
    }, 400);

  } else {
    errEl.classList.add('show');
    document.getElementById('login-pass').value = '';
    document.getElementById('login-pass').focus();
  }
}

/** Proses logout: konfirmasi lalu kembali ke halaman login */
function doLogout() {
  if (!confirm('Yakin ingin keluar dari sistem?')) return;

  const appEl = document.getElementById('app-screen');
  appEl.classList.remove('show');

  const loginScreen = document.getElementById('login-screen');
  loginScreen.style.display  = 'flex';
  loginScreen.classList.remove('fade-out');
  // Reset animasi
  loginScreen.style.animation = 'none';
  void loginScreen.offsetWidth;
  loginScreen.style.animation = '';

  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value  = '';
}

/** Aktifkan tombol Enter pada form login */
document.addEventListener('DOMContentLoaded', () => {
  ['login-email', 'login-pass'].forEach(id => {
    document.getElementById(id).addEventListener('keydown', e => {
      if (e.key === 'Enter') doLogin();
    });
  });
});
