import index from "@/Pages/RangeHarga";
import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import RupiahInput from "./RupiahInput";
import TextRupiah from "./TextRupiah";
import { centerCell, cellStyle, rightCell } from "@/CONSTANT";
import form, { FormInstance } from "antd/es/form";
import { RekapMak } from "@/types";

const RekapRT = ({
    rincian,
    index,
    rekapMak,
    form,
    setRekapMak,
}: {
    rincian: any;
    index: number;
    rekapMak: RekapMak[];
    form: FormInstance;
    setRekapMak: React.Dispatch<React.SetStateAction<RekapMak[]>>;
}) => {
    const handleNonMakInput = (value: any) => {
        let updatedRekap = [...rekapMak];
        updatedRekap[16].total = value;
        updatedRekap[17].total =
            updatedRekap[15].total + updatedRekap[16].total;

        updatedRekap;

        setRekapMak(updatedRekap);
    };
    const [isBeliEqual, setIsBeliEqual] = useState<boolean>(false);
    const [isProduksiEqual, setIsProduksiEqual] = useState<boolean>(false);
    const [isTotalEqual, setIsTotalEqual] = useState<boolean>(false);

    function inputCalculatedCheck() {
        const beliCalculated = rekapMak[rincian.id - 1].beli;
        const produksiCalculated = rekapMak[rincian.id - 1].produksi;
        const totalCalculated = rekapMak[rincian.id - 1].total;

        const beliInputed =
            form.getFieldValue(`blok4_32_${rincian.id - 1}_beli`) ?? 0;
        const produksiInputed =
            form.getFieldValue(`blok4_32_${rincian.id - 1}_produksi`) ?? 0;
        const totalInputed =
            form.getFieldValue(`blok4_32_${rincian.id - 1}_total`) ?? 0;

        setIsBeliEqual(beliCalculated == beliInputed);
        setIsProduksiEqual(produksiCalculated == produksiInputed);
        setIsTotalEqual(totalCalculated == totalInputed);
        if (rincian.id == 17) {
            handleNonMakInput(totalInputed);
        }
    }
    useEffect(() => {
        inputCalculatedCheck();
    }, [
        rekapMak[rincian.id - 1].beli,
        rekapMak[rincian.id - 1].produksi,
        rekapMak[rincian.id - 1].total,
    ]);

    return (
        <tr style={{backgroundColor:rincian.nomor===17?"rgb(255,255,204)":""}}>
            <td style={centerCell}>{rincian.nomor}</td>
            <td style={cellStyle}>{rincian.rincian}</td>

            <td style={rightCell}>
                {rincian.id < 16 && (
                    <>
                        <RupiahInput
                            key={index}
                            inputName={`blok4_32_${rincian.id - 1}_beli`}
                            onChange={inputCalculatedCheck}
                            validateStatus={isBeliEqual ? "" : "error"}
                        />
                        <TextRupiah
                            color={isBeliEqual ? "green" : "red"}
                            key={rincian.id}
                            value={rekapMak[rincian.id - 1].beli}
                        />
                    </>
                )}
            </td>
            <td style={rightCell}>
                {rincian.id < 16 && (
                    <>
                        <RupiahInput
                            key={index}
                            inputName={`blok4_32_${rincian.id - 1}_produksi`}
                            onChange={inputCalculatedCheck}
                            validateStatus={isProduksiEqual ? "" : "error"}
                        />
                        <TextRupiah
                            color={isProduksiEqual ? "green" : "red"}
                            key={rincian.id}
                            value={rekapMak[rincian.id - 1].produksi}
                        />
                    </>
                )}
            </td>
            <td style={rightCell}>
                <>
                    <RupiahInput
                        key={index}
                        inputName={`blok4_32_${rincian.id - 1}_total`}
                        onChange={inputCalculatedCheck}
                        validateStatus={isTotalEqual ? "" : "error"}
                    />
                    <TextRupiah
                        color={isTotalEqual ? "green" : "red"}
                        key={rincian.id}
                        value={rekapMak[rincian.id - 1].total}
                    />
                </>
            </td>
        </tr>
    );
};

export default RekapRT;
