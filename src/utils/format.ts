export const formatDate = (iso: string) => {
  const date = new Date(iso);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
};


/**
 * Memformat string tanggal ISO 8601 menjadi format tanggal Indonesia yang mudah dibaca.
 * Contoh: 2025-10-13T06:27:30.000000Z akan menjadi "13 Oktober 2025".
 *
 * @param iso String tanggal ISO 8601 (Contoh: "2025-10-13T06:27:30.000000Z").
 * @returns String tanggal dengan format Indonesia.
 */
export const formatDate2 = (iso: string): string => {
  // 1. Buat objek Date dari string ISO
  const date = new Date(iso);

  // 2. Gunakan Intl.DateTimeFormat dengan locale 'id-ID' (Indonesia)
  return new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",   // 'long' akan menghasilkan nama bulan penuh (Contoh: Februari)
    year: "numeric",
    // Hapus pengaturan zona waktu jika ingin menampilkan waktu lokal pengguna
  }).format(date);
};
