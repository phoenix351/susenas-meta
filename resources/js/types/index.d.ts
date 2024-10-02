import { Rule } from "antd/es/form";

export interface User {
    id: number;
    nama_lengkap: string;
    username: string;
    email: string;
    email_verified_at: string;
    nip: string;
    posisi: string;
    bidang: string;
    role: string;
    jabatan: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

interface SubTotal {
    beli: number;
    produksi: number;
    total: number;
}
interface Rincian {
    id: number;
    nomor?: number;
    subKey?: string;
    rincian: string;
    type?: string;
    dataType?: string;
    rules?: Rule[];
    value?: number | string | undefined;
    editable?: boolean;
}
interface RekapMak {
    beli: number;
    produksi: number;
    total: number;
    sub?: string;
}
interface AnggotaRumahTangga {
    id: string;
    id_ruta: string;
    nama: string;
    rekap: any;
    nomor_art: number;
}

interface RekapMak {
    beli: number;
    produksi: number;
    total: number;
}
