/**
 * app.js
 * ------
 * Router utama aplikasi: menginisialisasi sidebar, menangani navigasi
 * antar halaman, dan memanggil Pages[pageId]() untuk render konten.
 */

const App = {
  currentPage: 'dashboard',

  /**
   * Navigasi ke halaman tertentu.
   * @param {string} pageId - key dari objek Pages
   */
  navigate(pageId) {
    App.currentPage = pageId;
    const container = document.getElementById('page-container');

    if (Pages[pageId]) {
      container.innerHTML = Pages[pageId]();
    } else {
      container.innerHTML = `<p style="color:red">Halaman "${pageId}" tidak ditemukan.</p>`;
    }

    // Inventaris memerlukan render terpisah karena ada filter/search
    if (pageId === 'inventory') InventoryPage.render();

    // Update active state pada tombol navigasi sidebar
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === pageId);
    });

    // Scroll ke atas setiap pindah halaman
    document.getElementById('main-content').scrollTo({ top: 0, behavior: 'smooth' });
  },

  /** Inisialisasi sidebar toggle dan event navigasi */
  init() {
    const sidebar   = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');

    // Toggle collapse sidebar
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
    });

    // Delegasi klik navigasi sidebar
    document.getElementById('sidebar-nav').addEventListener('click', e => {
      const btn = e.target.closest('.nav-btn');
      if (btn && btn.dataset.page) App.navigate(btn.dataset.page);
    });

    // Tampilkan dashboard sebagai halaman awal
    App.navigate('dashboard');
  },
};
