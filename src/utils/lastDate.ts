/**
 * Interface Generik Dasar untuk tipe data apa pun yang mungkin memiliki properti string (seperti tanggal ISO).
 */
interface HasStringProperties {
    [key: string]: any;
}

/**
 * Mencari string waktu paling terbaru dari sebuah array objek.
 *
 * Fungsi ini menggunakan Generics (<T>) untuk fleksibilitas, memungkinkan
 * penggunaan pada array Dokter, Spesialis, Rumah Sakit, atau lainnya.
 *
 * @param dataList Array objek dari tipe T. Menerima null/undefined karena umum dari hasil fetching data (useQuery/useFetch).
 * @param dateKey Kunci (nama properti) yang berisi string tanggal (Contoh: "updated_at").
 * @returns String waktu paling terbaru (format ISO, mis. "2025-10-13T18:27:00.000000Z"), atau undefined.
 */
export const getLatestDateString = <T extends HasStringProperties>(
    dataList: T[] | null | undefined,
    dateKey: keyof T
): string | undefined => {
    // 1. Periksa array kosong, null, atau undefined
    if (!dataList || dataList.length === 0) {
        return undefined;
    }

    // 2. Gunakan reduce untuk membandingkan semua tanggal dalam array
    const latestDate = dataList.reduce((currentLatest: string | undefined, currentObject) => {
        // Ambil nilai string tanggal dari objek saat ini menggunakan key generik
        const currentObjectDateString = currentObject[dateKey] as string | undefined;

        // Skip jika nilai saat ini tidak ada atau bukan string
        if (!currentObjectDateString || typeof currentObjectDateString !== 'string') {
            return currentLatest;
        }

        // Jika ini adalah tanggal pertama yang valid yang kita temukan
        if (!currentLatest) {
            return currentObjectDateString;
        }

        // Konversi kedua string ke objek Date untuk perbandingan yang akurat
        const dateA = new Date(currentLatest);
        const dateB = new Date(currentObjectDateString);

        // Bandingkan: jika dateB lebih baru (> dateA), kembalikan string dateB
        return dateB > dateA ? currentObjectDateString : currentLatest;

    }, undefined as string | undefined);

    return latestDate;
};