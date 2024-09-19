import index from "@/Pages/RangeHarga";
import { Form, FormInstance, Input } from "antd";
import React, { useEffect, useState } from "react";
import RupiahInput from "./RupiahInput";
import TextRupiah from "./TextRupiah";
import { centerCell, cellStyle, rightCell } from "@/CONSTANT";

const RekapArt = ({
    art,
    index,
    form,
    tipe,
}: {
    art: any;
    index: number;
    form: FormInstance;
    tipe: "individu" | "jumlah";
}) => {
    const [isMakananBeliEqual, setIsMakananBeliEqual] =
        useState<boolean>(false);
    const [isMakananProduksiEqual, setIsMakananProduksiEqual] =
        useState<boolean>(false);

    const [isRokokBeliEqual, setIsRokokBeliEqual] = useState<boolean>(false);
    const [isRokokProduksiEqual, setIsRokokProduksiEqual] =
        useState<boolean>(false);

    function inputCalculatedCheck() {
        const rokokBeliCalculated = art.rekap[13]["beli"];
        const rokokProduksiCalculated = art.rekap[13]["produksi"];

        const makananBeliCalculated = art.rekap[12]["beli"];
        const makananProduksiCalculated = art.rekap[12]["produksi"];

        const makananBeliInputed =
            form.getFieldValue(
                `blok4_31_${tipe == "individu" ? index : "jumlah"}_mak_beli`
            ) ?? 0;
        const makananProduksiInputed =
            form.getFieldValue(
                `blok4_31_${tipe == "individu" ? index : "jumlah"}_mak_produksi`
            ) ?? 0;

        const rokokBeliInputed =
            form.getFieldValue(
                `blok4_31_${tipe == "individu" ? index : "jumlah"}_rokok_beli`
            ) ?? 0;
        const rokokProduksiInputed =
            form.getFieldValue(
                `blok4_31_${
                    tipe == "individu" ? index : "jumlah"
                }_rokok_produksi`
            ) ?? 0;

        setIsRokokBeliEqual(rokokBeliCalculated == rokokBeliInputed);
        setIsRokokProduksiEqual(
            rokokProduksiCalculated == rokokProduksiInputed
        );

        setIsMakananBeliEqual(makananBeliCalculated == makananBeliInputed);
        setIsMakananProduksiEqual(
            makananProduksiCalculated == makananProduksiInputed
        );
    }
    useEffect(() => {
        inputCalculatedCheck();
    }, [
        art.rekap[12]["beli"],
        art.rekap[12]["produksi"],
        art.rekap[13]["beli"],
        art.rekap[13]["produksi"],
    ]);
    return (
        <tr>
            <td style={centerCell}>{tipe == "individu" ? index + 1 : ""}</td>
            <td style={cellStyle}>
                {tipe == "individu" ? (
                    <>
                        {art.nama}
                        <Form.Item
                            key={`form-item-${index}`} // Add a unique key here
                            name={
                                tipe == "individu"
                                    ? `blok4_31_${index}_id_art`
                                    : ""
                            }
                            label={null}
                            initialValue={tipe == "individu" ? art.id : ""}
                            hidden
                        >
                            <Input readOnly />
                        </Form.Item>{" "}
                    </>
                ) : (
                    "JUMLAH"
                )}
            </td>

            <td style={rightCell}>
                <RupiahInput
                    inputName={`blok4_31_${
                        tipe == "individu" ? index : "jumlah"
                    }_mak_beli`}
                    initialValue={art.mak_beli}
                    onChange={inputCalculatedCheck}
                    validateStatus={!isMakananBeliEqual ? "error" : ""}
                />
                <TextRupiah
                    color={isMakananBeliEqual ? "green" : "red"}
                    // value={0}
                    value={art.rekap[12]["beli"]}
                />
            </td>
            <td style={rightCell}>
                <RupiahInput
                    inputName={`blok4_31_${
                        tipe == "individu" ? index : "jumlah"
                    }_mak_produksi`}
                    initialValue={art.mak_produksi}
                    onChange={inputCalculatedCheck}
                    validateStatus={!isMakananProduksiEqual ? "error" : ""}
                />
                <TextRupiah
                    color={isMakananProduksiEqual ? "green" : "red"}
                    // value={0}
                    value={art.rekap[12]["produksi"]}
                />
            </td>
            <td style={rightCell}>
                <RupiahInput
                    inputName={`blok4_31_${
                        tipe == "individu" ? index : "jumlah"
                    }_rokok_beli`}
                    initialValue={art.rokok_beli}
                    onChange={inputCalculatedCheck}
                    validateStatus={!isRokokBeliEqual ? "error" : ""}
                />
                <TextRupiah
                    color={isRokokBeliEqual ? "green" : "red"}
                    value={art.rekap[13]["beli"]}
                />
            </td>
            <td style={rightCell}>
                <RupiahInput
                    inputName={`blok4_31_${
                        tipe == "individu" ? index : "jumlah"
                    }_rokok_produksi`}
                    initialValue={art.rokok_produksi}
                    onChange={inputCalculatedCheck}
                    validateStatus={!isRokokProduksiEqual ? "error" : ""}
                />
                <TextRupiah
                    color={isRokokProduksiEqual ? "green" : "red"}
                    // value={0}
                    value={art.rekap[13]["produksi"]}
                />
            </td>
        </tr>
    );
};

export default RekapArt;
