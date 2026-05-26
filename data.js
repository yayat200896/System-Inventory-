/**
 * data.js
 * -------
 * In-memory database untuk seluruh data aplikasi inventaris.
 * Semua data disimpan di objek DB dan diakses langsung dari modul lain.
 */

const DB = {
  buildings: [
    { building_id: 1, building_name: "Gedung A", foundation_id: 1 },
    { building_id: 2, building_name: "Gedung B", foundation_id: 1 },
  ],
  rooms: [
    { room_id: 1, room_name: "Ruang Server",  floor: 1, building_id: 1 },
    { room_id: 2, room_name: "Lab Komputer",  floor: 2, building_id: 1 },
    { room_id: 3, room_name: "Ruang Rapat",   floor: 1, building_id: 2 },
  ],
  item_types: [
    { item_type_id: 1, item_type_name: "Elektronik",  description: "Perangkat elektronik", foundation_id: 1 },
    { item_type_id: 2, item_type_name: "Furnitur",     description: "Perabot kantor",       foundation_id: 1 },
    { item_type_id: 3, item_type_name: "Kendaraan",   description: "Alat transportasi",    foundation_id: 1 },
  ],
  items: [
    { item_id: 1, item_name: "Laptop",     unit: "Unit", item_type_id: 1 },
    { item_id: 2, item_name: "Proyektor",  unit: "Unit", item_type_id: 1 },
    { item_id: 3, item_name: "Meja Kerja", unit: "Buah", item_type_id: 2 },
    { item_id: 4, item_name: "Kursi",      unit: "Buah", item_type_id: 2 },
    { item_id: 5, item_name: "Printer",    unit: "Unit", item_type_id: 1 },
  ],
  transaction_types: [
    { transaction_type_id: 1, transaction_type_name: "Pengadaan",   foundation_id: 1 },
    { transaction_type_id: 2, transaction_type_name: "Penghapusan", foundation_id: 1 },
    { transaction_type_id: 3, transaction_type_name: "Mutasi",      foundation_id: 1 },
  ],
  inventory: [
    { inventory_id: 1, quantity: 10, price: 15000000, spesification: "Intel Core i7, RAM 16GB, SSD 512GB", status: "Baik",            foto: "", description: "Laptop kantor",       merk: "Lenovo",  barcode: "BC001", expired_date: "", item_id: 1, inventory_transaction_id: 1 },
    { inventory_id: 2, quantity: 3,  price:  5000000, spesification: "Full HD 1080p",                      status: "Baik",            foto: "", description: "Proyektor presentasi", merk: "Epson",   barcode: "BC002", expired_date: "", item_id: 2, inventory_transaction_id: 1 },
    { inventory_id: 3, quantity: 20, price:   800000, spesification: "Kayu solid 120x60cm",                status: "Baik",            foto: "", description: "Meja kerja standar",   merk: "Olympic", barcode: "BC003", expired_date: "", item_id: 3, inventory_transaction_id: 2 },
    { inventory_id: 4, quantity: 5,  price:   300000, spesification: "Ergonomis, bisa diatur tinggi",       status: "Rusak Ringan",    foto: "", description: "Kursi kerja",          merk: "Chitose", barcode: "BC004", expired_date: "", item_id: 4, inventory_transaction_id: 2 },
    { inventory_id: 5, quantity: 2,  price:  3500000, spesification: "Laser, A4",                          status: "Dalam Perbaikan", foto: "", description: "Printer laser",        merk: "HP",      barcode: "BC005", expired_date: "", item_id: 5, inventory_transaction_id: 1 },
  ],
  transactions: [
    { inventory_transaction_id: 1, transaction_date: "2024-01-15", transaction_number: "TRX/2024/001", status: "Selesai", start_date: "2024-01-10", end_date: "2024-01-15", evidence_file: "", source_of_founds: "APBN",       total_budget: 200000000, budget_realization: 195000000, transaction_type_id: 1 },
    { inventory_transaction_id: 2, transaction_date: "2024-02-20", transaction_number: "TRX/2024/002", status: "Selesai", start_date: "2024-02-18", end_date: "2024-02-20", evidence_file: "", source_of_founds: "APBD",       total_budget:  50000000, budget_realization:  48000000, transaction_type_id: 1 },
    { inventory_transaction_id: 3, transaction_date: "2024-03-05", transaction_number: "TRX/2024/003", status: "Proses",  start_date: "2024-03-01", end_date: "",           evidence_file: "", source_of_founds: "Dana Hibah", total_budget:  30000000, budget_realization:          0, transaction_type_id: 3 },
  ],
  inventory_rooms: [
    { inventory_room_id: 1, status: "Aktif",       inventory_date: "2024-01-20", inventory_id: 1, room_id: 1 },
    { inventory_room_id: 2, status: "Aktif",       inventory_date: "2024-01-20", inventory_id: 2, room_id: 3 },
    { inventory_room_id: 3, status: "Aktif",       inventory_date: "2024-02-25", inventory_id: 3, room_id: 2 },
    { inventory_room_id: 4, status: "Tidak Aktif", inventory_date: "2024-02-25", inventory_id: 4, room_id: 2 },
  ],
};

/**
 * Helper: generate next auto-increment ID untuk tabel tertentu.
 * @param {string} table     - nama array di DB
 * @param {string} keyField  - nama field primary key
 * @returns {number}
 */
DB._nextId = (table, keyField) => {
  const rows = DB[table];
  if (!rows.length) return 1;
  return Math.max(...rows.map(r => r[keyField])) + 1;
};
