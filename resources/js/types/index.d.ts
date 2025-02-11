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
    kode_kabkot: string;
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
    hidden?: boolean;
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
    dependentName: string;
    dependentValue: number;
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
    tipe: string;
    kode: string;
    fullcode: string;
}
interface ModalProps {
    title: string;
    openModal: boolean;
    handleOk: () => void;
    confirmLoadingModal: boolean;
    handleCancel: () => void;
    okText?: string;
    cancelText?: string;
    maskClosable?: boolean;
    width?: number | string;
    noFooter?: boolean;
}
interface KomoditasSummary {
    average_harga: number;
    created_at: Date;
    flag_basket: number;
    id: number;
    id_kelompok: number;
    id_komoditas: number;
    kalori: number;
    kode_coicop: string;
    kode_kabkot: string;
    nama_kelompok: string;
    nama_komoditas: string;
    nomor_urut: number;
    satuan: string;
    sum_kalori: number;
    sum_volume: number;
    type: string;
    updated_at: Date;
}
