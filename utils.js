/**
 * utils.js
 * --------
 * Kumpulan fungsi helper umum yang digunakan di seluruh aplikasi:
 * format mata uang, tanggal, badge status, toast, confirm dialog,
 * serta lookup nama relasi dari DB.
 */

const Utils = {

  /** Format angka ke mata uang Rupiah */
  currency(value) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0
    }).format(value || 0);
  },

  /** Format tanggal ISO ke tampilan id-ID (dd MMM yyyy) */
  date(d) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', {
      day: '2-digit', month: 'short', year: 'numeric'
    });
  },

  /** Render badge HTML berdasarkan status */
  badge(status) {
    const map = {
      'Baik':            'badge-baik',
      'Rusak Ringan':    'badge-rusak-ringan',
      'Rusak Berat':     'badge-rusak-berat',
      'Dalam Perbaikan': 'badge-perbaikan',
      'Selesai':         'badge-selesai',
      'Proses':          'badge-proses',
      'Aktif':           'badge-aktif',
      'Tidak Aktif':     'badge-tidak-aktif',
      'Dibatalkan':      'badge-dibatalkan',
    };
    return `<span class="badge ${map[status] || ''}">${status || '-'}</span>`;
  },

  /** Escape HTML untuk mencegah XSS */
  esc(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  },

  /** Tampilkan toast notification sementara */
  toast(msg = '✅ Data berhasil disimpan!', duration = 2800) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.remove('hidden');
    clearTimeout(Utils._toastTimer);
    Utils._toastTimer = setTimeout(() => el.classList.add('hidden'), duration);
  },

  /** Tampilkan dialog konfirmasi kustom sebelum aksi hapus */
  confirm(message, onYes) {
    const overlay = document.createElement('div');
    overlay.className = 'confirm-overlay';
    overlay.innerHTML = `
      <div class="confirm-box">
        <div class="confirm-icon">🗑️</div>
        <div class="confirm-text">Hapus Data?</div>
        <div class="confirm-sub">${message}</div>
        <div class="confirm-btns">
          <button class="btn btn-outline" id="conf-no">Batal</button>
          <button class="btn btn-danger"  id="conf-yes">Hapus</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    overlay.querySelector('#conf-no').onclick  = () => overlay.remove();
    overlay.querySelector('#conf-yes').onclick = () => { overlay.remove(); onYes(); };
  },

  /* ─── Lookup helpers ─── */

  itemName(item_id) {
    const it = DB.items.find(i => i.item_id === item_id);
    return it ? it.item_name : '-';
  },
  roomName(room_id) {
    const r = DB.rooms.find(r => r.room_id === room_id);
    return r ? r.room_name : '-';
  },
  buildingName(building_id) {
    const b = DB.buildings.find(b => b.building_id === building_id);
    return b ? b.building_name : '-';
  },
  itemTypeName(item_type_id) {
    const t = DB.item_types.find(t => t.item_type_id === item_type_id);
    return t ? t.item_type_name : '-';
  },
  txTypeName(transaction_type_id) {
    const t = DB.transaction_types.find(t => t.transaction_type_id === transaction_type_id);
    return t ? t.transaction_type_name : '-';
  },
};
