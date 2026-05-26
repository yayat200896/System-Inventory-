/**
 * modal.js
 * --------
 * Komponen modal reusable: open, close, generate field/input/select HTML,
 * baca nilai form, dan pasang listener tombol Simpan/Batal.
 */

const Modal = {
  _onSave: null,

  /** Buka modal dengan judul, isi HTML, dan callback saat simpan */
  open(title, bodyHTML, onSave) {
    document.getElementById('modal-title').textContent   = title;
    document.getElementById('modal-body').innerHTML      = bodyHTML;
    document.getElementById('modal-overlay').classList.remove('hidden');
    Modal._onSave = onSave;
  },

  /** Tutup modal dan bersihkan isi */
  close() {
    document.getElementById('modal-overlay').classList.add('hidden');
    document.getElementById('modal-body').innerHTML = '';
    Modal._onSave = null;
  },

  /** Wrapper HTML untuk satu field form */
  field(label, inputHTML) {
    return `<div class="form-field">
      <label class="form-label">${label}</label>
      ${inputHTML}
    </div>`;
  },

  /** Generate elemen <input> */
  input(name, value = '', type = 'text', extra = '') {
    return `<input class="form-input" type="${type}" name="${name}" value="${Utils.esc(value)}" ${extra} />`;
  },

  /** Generate elemen <select> dengan options */
  select(name, options, selected) {
    const opts = options.map(o =>
      `<option value="${Utils.esc(o.value)}" ${String(o.value) === String(selected) ? 'selected' : ''}>${Utils.esc(o.label)}</option>`
    ).join('');
    return `<select class="form-select" name="${name}">${opts}</select>`;
  },

  /** Baca semua nilai input/select di dalam modal ke object */
  readForm(containerSelector = '#modal-body') {
    const out = {};
    document.querySelector(containerSelector)
      .querySelectorAll('input, select, textarea')
      .forEach(el => {
        if (!el.name) return;
        out[el.name] = el.type === 'number' ? (parseFloat(el.value) || 0) : el.value;
      });
    return out;
  },

  /** Generate HTML footer tombol Batal & Simpan */
  footer() {
    return `<div class="modal-footer">
      <button class="btn btn-outline" id="btn-cancel">Batal</button>
      <button class="btn btn-success" id="btn-save">💾 Simpan</button>
    </div>`;
  },

  /** Pasang event listener ke tombol Simpan dan Batal */
  attachListeners() {
    const saveBtn   = document.getElementById('btn-save');
    const cancelBtn = document.getElementById('btn-cancel');
    if (saveBtn)   saveBtn.onclick   = () => { if (Modal._onSave) Modal._onSave(); };
    if (cancelBtn) cancelBtn.onclick = () => Modal.close();
  },
};

/* Tutup modal saat klik tombol × */
document.getElementById('modal-close').addEventListener('click', () => Modal.close());

/* Tutup modal saat klik backdrop (area luar modal) */
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === document.getElementById('modal-overlay')) Modal.close();
});
