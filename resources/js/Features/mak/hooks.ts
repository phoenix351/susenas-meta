// src/features/mak/hooks.ts
import { useEffect } from "react";
import { message } from "antd";
import { api } from "./api";
import { calculateQc, recalcRekapMak, sumHargaByPattern } from "./qc";

export function useCtrlSSubmit(form: any) {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key.toLowerCase() === "s") {
                e.preventDefault();
                form?.submit();
            }
        };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [form]);
}

export function useSubTotalCalculator(blok41Form: any, setRekapMak: any) {
    return () => {
        const all = blok41Form.getFieldsValue();
        const subs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 14, 15, 16, 17];

        setRekapMak((prev: any[]) => {
            const next = [...prev];
            subs.forEach((sub) => {
                next[sub].beli = sumHargaByPattern(all, `beli_harga${sub}`);
                next[sub].produksi = sumHargaByPattern(
                    all,
                    `produksi_harga${sub}`
                );
                if (sub <= 14)
                    next[sub].total = next[sub].beli + next[sub].produksi;
            });
            // subtotal/averages
            next[14] = next
                .slice(0, 14)
                .reduce(
                    (p, c) => ({
                        beli: p.beli + (c?.beli || 0),
                        produksi: p.produksi + (c?.produksi || 0),
                        total: p.total + (c?.total || 0),
                    }),
                    { beli: 0, produksi: 0, total: 0 }
                );
            next[15].total = Math.round((next[14].total * 30) / 7);
            next[17].total = next[15].total + next[16].total;
            return next;
        });
    };
}

export function useSimpanAll({
    form,
    artForm,
    blok41Form,
    daftarArt,
    daftarQc,
    setDaftarQc,
    setLastSaved,
    messageApi,
}: any) {
    return async () => {
        messageApi.loading({
            content: "Menyimpan data",
            type: "loading",
            key: "simpan",
        });
        try {
            await Promise.all([
                artForm.submit(),
                form.submit(),
                blok41Form.submit(),
            ]);

            if (form.getFieldValue("r203") > 1) {
                messageApi.open({
                    content: "Data berhasil tersimpan",
                    type: "success",
                    key: "simpan",
                    duration: 2,
                });
                return;
            }

            const newQc = await calculateQc(
                form.getFieldValue("id"),
                daftarArt.length,
                daftarQc,
                form.getFieldValue("blokqc_3")
            );

            setDaftarQc(newQc);
            form.setFieldsValue({
                blokqc_0: newQc[0].value,
                blokqc_1: newQc[1].value,
                blokqc_2: newQc[2].value,
                blokqc_4: newQc[4].value,
                blokqc_5: newQc[5].value,
                blokqc_6: newQc[6].value,
            });
            setLastSaved(new Date());
            messageApi.open({
                content: "Data berhasil tersimpan",
                type: "success",
                key: "simpan",
                duration: 2,
            });
        } catch (err: any) {
            const msg = err?.response?.data?.error ?? "Data gagal tersimpan";
            message.error(msg);
        }
    };
}

export async function doRevalidasi(
    id_ruta: string,
    setLoading: any,
    setLists: (x: { err: any[]; warn: any[]; warnRH: any[] }) => void,
    messageApi: any
) {
    try {
        setLoading(true);
        const { data } = await api.revalidasi(id_ruta);
        setLists({
            err: data.daftar_error,
            warn: data.daftar_warning,
            warnRH: data.evaluasi_rh,
        });
        messageApi.open({
            content: "Revalidasi selesai",
            type: "success",
            key: "revalidasi",
        });
    } finally {
        setLoading(false);
    }
}
