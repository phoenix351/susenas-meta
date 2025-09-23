// src/features/mak/api.ts
import axios from "axios";

export const api = {
    saveBlok1_2: (values: any) =>
        axios.patch(route("entri.mak.update"), values, {
            headers: { "Content-Type": "application/json" },
        }),

    saveArt: (values: any) =>
        axios.patch(route("entri.mak.art.update"), values, {
            headers: { "Content-Type": "application/json" },
        }),

    saveKonsumsi: (values: any) =>
        axios.patch(route("entri.mak.konsumsi.store"), values, {
            headers: { "Content-Type": "application/json" },
        }),

    saveBlok41Art: (values: any) => axios.get(route("api.entri.inti", values)),

    revalidasi: (id_ruta: string) =>
        axios.get(route("api.mak.revalidasi", { id_ruta })),

    calcQC: (id_ruta: string) =>
        axios.get(route("api.mak.calculate_qc", { id_ruta })),

    kaloriKomoditas: (id: string) =>
        axios.get(route("api.mak.komoditas.kalori.fetch", { id })),
};
