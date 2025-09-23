// src/features/mak/constants.ts
export const daftarRincian432 = [
    { id: 1, nomor: 1, rincian: "Padi-padian (R.1)", type: "standar" },
    { id: 2, nomor: 2, rincian: "Umbi-umbian (R.8)", type: "standar" },
    {
        id: 3,
        nomor: 3,
        rincian: "Ikan/udang/cumi/kerang (R.16)",
        type: "standar",
    },
    { id: 4, nomor: 4, rincian: "Daging (R.55)", type: "standar" },
    { id: 5, nomor: 5, rincian: "Telur dan Susu (R.65)", type: "standar" },
    { id: 6, nomor: 6, rincian: "Sayur-sayuran (R.75)", type: "standar" },
    { id: 7, nomor: 7, rincian: "Kacang-kacangan (R.102)", type: "standar" },
    { id: 8, nomor: 8, rincian: "Buah-buahan (R.110)", type: "standar" },
    { id: 9, nomor: 9, rincian: "Minyak dan Kelapa (R.126)", type: "standar" },
    { id: 10, nomor: 10, rincian: "Bahan Minuman (R.131)", type: "standar" },
    { id: 11, nomor: 11, rincian: "Bumbu-bumbuan (R.139)", type: "standar" },
    {
        id: 12,
        nomor: 12,
        rincian: "Bahan Makanan Lainnya (R.154)",
        type: "standar",
    },
    {
        id: 13,
        nomor: 13,
        rincian: "Makanan & Minuman Jadi (IV.3.1, jumlah)",
        type: "standar",
    },
    {
        id: 14,
        nomor: 14,
        rincian: "Rokok & Tembakau (IV.3.1, jumlah)",
        type: "standar",
    },
    {
        id: 15,
        nomor: 15,
        rincian: "SUBJUMLAH [R.1 s.d. R.14]",
        type: "standar",
    },
    {
        id: 16,
        nomor: 16,
        rincian: "RATA2 MAKANAN [R.15 x 30/7]",
        type: "average",
    },
    {
        id: 17,
        nomor: 17,
        rincian: "RATA2 NON MAKANAN [salin IV.3.3 r.8]",
        type: "average",
    },
    {
        id: 18,
        nomor: 18,
        rincian: "RATA2 TOTAL [R.16 + R.17]",
        type: "average",
    },
];

export const defaultSubTotal = () =>
    Array.from({ length: 18 }, () => ({ beli: 0, produksi: 0, total: 0 }));
