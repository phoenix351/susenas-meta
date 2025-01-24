import { Rule } from "antd/es/form";
import { ValidateStatus } from "antd/es/form/FormItem";
import { SelectProps } from "antd/es/select";

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

interface RincianWorksheet {
    id: number;
    nomor?: number | null | string;
    rincian?: JSX.Element | string;
    type: string;
    options?: SelectProps["options"] | undefined;
    dependentValues?: string[] | number[];
    children?: RincianWorksheet[];
    dependencies?: string[];
    rules?: any;
    changes?: any;
}

interface WorksheetRuleProps {
    ruleName: "less" | "greater" | "less equal" | "greater equal" | "equal";
    message: string;
    status: ValidateStatus;
    dependentName?: string;
    dependentValue?: number;
}

interface KomoditasDataType {
    id: number;
    nama_komoditas: string;
    id_kelompok: number;
    nama_kelompok: string;
    satuan: string;
    kalori: number;
    flag_basket: number | boolean;
    type: string;
    nomor_urut: number;
}

interface ProgressData {
    name: string;
    target: number;
    error: number;
    warning: number;
    clean: number;
}
