import WorksheetRow from "@/Components/WorksheetRow";
import { Form, FormInstance, message, Space, Typography } from "antd";
import { values } from "lodash";

const { Text, Title } = Typography;

const cellStyle = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    padding: "5px",
};
const centerCell: React.CSSProperties = {
    borderStyle: "solid",
    border: "solid 1px black",
    // width: "100%",
    textAlign: "center",
    padding: "5px",
};

const getRules = (
    { getFieldValue }: { getFieldValue: (arg0: string) => any },
    dependentName: string,
    ruleName: "less" | "greater" | "less equal" | "greater equal" | "equal",
    message: string
) => ({
    validator(rule: any, value: number, callback: any) {
        const dependentValue = getFieldValue(dependentName);
        let test = true;
        if (ruleName == "less") {
            test = value < dependentValue;
        } else if (ruleName == "equal") {
            test = value == dependentValue;
        } else if (ruleName == "greater") {
            test = value > dependentValue;
        } else if (ruleName == "less equal") {
            test = value <= dependentValue;
        } else if (ruleName == "greater equal") {
            test = value >= dependentValue;
        }

        if (!test) {
            return Promise.reject(message);
        }
        return Promise.resolve();
    },
});

const daftarRincian = [
    {
        id: 1,
        nomor: 1,
        rincian: "Jumlah ART (Blok III Rincian 301)",
        type: "number",
        rules: {
            ruleName: "greater equal",
            message: "Jumlah ART minimal satu",
            status: "error",
            dependentValue: 1,
        },
    },
    {
        id: 2,
        nomor: 2,
        rincian: "Jumlah Balita (R302)",
        type: "number",

        dependencies: ["wtf_1"],
        rules: {
            ruleName: "less",
            message:
                "Jumlah Balita tidak boleh sama atau lebih dari jumlah ART",
            status: "error",
            dependentName: "wtf_1",
        },
    },
    {
        id: 3,
        nomor: 3,
        rincian: "Jumlah ART yang masih bersekolah (R611=2)",
        type: "number",

        rules: {
            ruleName: "less equal",
            message:
                "Jumlah ART yang bersekolah tidak bisa melebihi jumlah ART",
            status: "error",
            dependentName: "wtf_1",
        },
    },

    {
        id: 4,
        nomor: 4,
        rincian:
            "Apakah ART pernah mendapat Program Makan Siang Gratis? (R618)",
        type: "multi",
        dependencies: ["wtf_3"],
        rules: {
            ruleName: "required if",
            message:
                "Isian ini diisi apabila Jumlah ART Bersekolah lebih dari 0",
            status: "error",
            dependentName: "wtf_3",
            dependentValue: 1,
        },
        options: [
            { label: "Ya, Program MBG", value: 1 },
            { label: "Ya, Program selain MBG", value: 2 },
            { label: "tidak mendapatkan", value: 3 },
        ],
        children: [
            {
                id: 9,
                nomor: 9,
                rincian:
                    "Menu Makan Siang Gratis yang paling disukai RT? (Blok Catatan)",
                type: "multi",
                dependentValues: [1],
                options: [
                    { label: "A", value: 1 },
                    { label: "B", value: 2 },
                    { label: "C", value: 3 },
                    { label: "D", value: 4 },
                    { label: "E", value: 5 },
                    { label: "F", value: 6 },
                    { label: "G", value: 7 },
                ],
            },
        ],
    },
    {
        id: 5,
        nomor: 5,
        rincian: (
            <span>
                Luas Lantai Bangunan Utama (m<sup>2</sup>) (R1604)
            </span>
        ),
        type: "number",
    },
    {
        id: 6,
        nomor: 6,
        rincian: "Sumber air minum (R1610)",
        type: "multi",
        options: [
            { label: "Air kemasan bermerk/isi ulang", value: 1 },
            { label: "Leding", value: 2 },
            { label: "Sumur bor/pompa/mata air", value: 3 },
            { label: "Air sungai/danau/kolam/air hujan/lainnya", value: 4 },
        ],
    },
    {
        id: 7,
        nomor: 7,
        rincian: "Sumber air mandi/cuci/dll (R1614A)",
        type: "multi",
        options: [
            { label: "Air kemasan bermerk/isi ulang", value: 1 },
            { label: "Leding", value: 2 },
            { label: "Sumur bor/pompa/mata air", value: 3 },
            { label: "Air sungai/danau/kolam/air hujan/lainnya", value: 4 },
        ],
    },

    {
        id: 8,
        nomor: 8,
        rincian: "Apakah tercatat sebagai menerima PKH? (R2003a)",
        type: "binary",
        // children: [
        //     {
        //         id: 9,
        //         nomor: 9,
        //         rincian: "Penggunaan PKH (R2003b)",
        //         type: "multi",
        //         dependentValues: [1],
        //         options: [
        //             { label: "Belanja Pangan", value: 1 },
        //             { label: "Biaya Sekolah", value: 2 },
        //             { label: "Pembayaran Utang/Kredit", value: 3 },
        //             { label: "Lainnya", value: 99 },
        //         ],
        //     },
        // ],
    },

    {
        id: 26,
        nomor: "10",
        rincian: "Garis Kemiskinan Maret 2024",
        type: "rupiah",
    },
];
const Worksheet: React.FC<{
    form: FormInstance;
    onFinish: (values: any) => void;
    tabContentStyle: React.CSSProperties;
    // record: any;
}> = ({ form, onFinish, tabContentStyle }) => {
    const tableStyle: React.CSSProperties = {
        borderCollapse: "collapse",
        width: "100%",
    };
    const cellStyle = {
        borderStyle: "solid",
        border: "solid 1px black",

        padding: "5px",
    };

    return (
        <Space direction="vertical" style={tabContentStyle}>
            <Space
                style={{ width: "100%", justifyContent: "space-between" }}
                direction="horizontal"
            ></Space>
            <Form
                form={form}
                name="Worksheet"
                onFinish={onFinish}
                autoComplete="off"
                layout="vertical"
                onValuesChange={(changedValues, values) => {
                    if (Object.keys(changedValues).includes("wtf_3")) {
                        if (
                            changedValues["wtf_3"] == null ||
                            changedValues["wtf_3"] < 1
                        ) {
                            form.setFieldsValue({
                                wtf_9: "",
                                wtf_4: "",
                            });
                        }
                    }
                    if (Object.keys(changedValues).includes("wtf_4")) {
                        if (changedValues["wtf_4"] == 1) return;
                        form.setFieldsValue({
                            wtf_9: "",
                            // wtf_4:null,
                        });
                    }
                }}
            >
                <table style={tableStyle}>
                    <thead
                        style={{
                            backgroundColor: "#fc0",
                            textAlign: "center",
                        }}
                    >
                        <tr>
                            <td style={cellStyle} colSpan={3}>
                                <Space direction="vertical">
                                    <Title
                                        level={4}
                                        style={{ textTransform: "uppercase" }}
                                    >
                                        Isian Worksheet Template{" "}
                                    </Title>
                                    <Text>
                                        RINCIAN (Lihat Dokumen VSEN24.K)
                                    </Text>
                                </Space>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {/* render rows */}
                        {daftarRincian.map((rincian, index) => (
                            <WorksheetRow
                                key={index}
                                props={rincian}
                                defaultValue={form.getFieldValue(
                                    `wtf_${rincian.id}`
                                )}
                            />
                        ))}
                    </tbody>
                </table>
            </Form>
        </Space>
    );
};

export default Worksheet;
