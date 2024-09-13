import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import React, {
    JSXElementConstructor,
    ReactElement,
    ReactPortal,
    useEffect,
    useState,
} from "react";
import Pengguna from "../Pengguna";
import axios from "axios";
import { Button, Form, Input, InputNumber, Select, Space, Table } from "antd";
import RupiahInput from "@/Components/RupiahInput";
import { EditOutlined, FilterOutlined } from "@ant-design/icons";
interface Komoditas {
    id: number;
    nama_komoditas: string;
    id_kelompok: number;
    nama_kelompok: string;
    satuan?: string | null;
    kode_coicop?: string | null;
    kalori?: number;
    flag_basket?: boolean;
    type?: string;
}

interface RangeHarga {
    komoditas_id: number | string;
    min: number;
    max: number;
    kode_kabkot: number | string;
    komoditas: Komoditas;
}
interface RangeHargaFilterProps {
    nama_komoditas: number | string;
    min: number;
    max: number;
    kode_kabkot: number | string;
    id_kelompok?: number | string;
    kelompok_id?: number | string;
}
interface Kelompok {
    nama_kelompok: string;
    id_kelompok: number | string;
}
interface Kabkot {
    kabkot: string;
    kode_kabkot: number | string;
}

const index = ({
    kelompok,
    kabkot,
}: {
    kelompok: Kelompok[];
    kabkot: Kabkot[];
}) => {
    // console.log({ kabkot });

    const [daftarRangeHarga, setDaftarRangeHarga] = useState<RangeHarga[]>([]);
    const [loadingData, setLoadingData] = useState<boolean>(false);
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const [filterForm] = Form.useForm();
    const fetchDaftarRangeHarga = async () => {
        setLoadingData(true);
        let { data } = await axios.get(route("range_harga.fetch"));

        data = data.map(
            ({
                id_komoditas,
                min,
                max,
                kode_kabkot,
                komoditas,
            }: {
                id_komoditas: number | string;
                min: number;
                max: number;
                kode_kabkot: string | number;
                komoditas: Komoditas;
            }) => ({
                komoditas_id: id_komoditas,
                min,
                max,
                kode_kabkot,
                komoditas,
            })
        );
        // console.log({ data });

        setDaftarRangeHarga(data);
        setLoadingData(false);
    };
    useEffect(() => {
        fetchDaftarRangeHarga();
        filterForm.setFieldsValue({
            nama_komoditas: "beras",
            kelompok_id: 0,
            kode_kabkot: "02",
            min: 1000,
            max: 100000,
        });
        // console.log({ kelompok });
    }, []);

    const rangeHargaColumns = [
        {
            title: "Komoditas",
            dataIndex: "komoditas.nama_komoditas",
            key: "komoditas.nama_komoditas",
            render: (_: any, record: RangeHarga) =>
                record.komoditas.nama_komoditas,
        },
        {
            title: "Kelompok",
            dataIndex: "komoditas.nama_kelompok",
            key: "komoditas.nama_kelompok",
            render: (_: any, record: RangeHarga) =>
                record.komoditas.nama_kelompok,
        },

        {
            title: "Kabupaten/Kota",
            dataIndex: "kode_kabkot",
            key: "kode_kabkot",
        },
        {
            title: "Harga Minimum",
            dataIndex: "min",
            key: "min",
        },
        {
            title: "Harga Maksimum",
            dataIndex: "max",
            key: "max",
        },
        {
            title: "Kalori",
            dataIndex: "komoditas.kalori",
            key: "komoditas.kalori",
            render: (_: any, record: RangeHarga) => record.komoditas.kalori,
        },
        {
            title: "Aksi",
            key: "aksi",
            dataIndex: "aksi",
            render: (_: any, record: RangeHarga) => (
                <Button onClick={() => handleEdit(record.komoditas_id)}>
                    <EditOutlined /> Ubah
                </Button>
            ),
        },
    ];
    const handleFilter = async (values: RangeHargaFilterProps) => {
        setLoadingData(true);
        let processedValues = {
            nama_komoditas: values.nama_komoditas,
            kode_kabkot: values.kode_kabkot,
            min: values.min,
            max: values.max,
            id_kelompok: values.kelompok_id,
        };

        const { data } = await axios.get(route("range_harga.fetch"), {
            params: processedValues,
        });
        setDaftarRangeHarga(data);
        setLoadingData(false);
    };

    return (
        <>
            <Button
                onClick={() => setShowFilter(!showFilter)}
                style={{ marginBottom: showFilter ? 0 : 20 }}
            >
                <FilterOutlined /> Filter Data
            </Button>
            <Form
                form={filterForm}
                layout="vertical"
                style={{
                    width: 400,
                    margin: "20px 0px 20px 0px",
                    backgroundColor: "#fff",
                    padding: 20,
                    borderRadius: 20,
                    display: showFilter ? "" : "none",
                }}
                onFinish={handleFilter}
                onKeyDown={(event: React.KeyboardEvent) => {
                    if (event.code === "Enter") {
                        filterForm.submit();
                    }
                }}
            >
                <Form.Item
                    label="Komoditas"
                    name="nama_komoditas"
                    style={{ marginBottom: "4px" }}
                >
                    <Input placeholder="Kopi Luwak" allowClear />
                </Form.Item>
                <Form.Item
                    label="kelompok"
                    name="kelompok_id"
                    style={{ marginBottom: "4px" }}
                >
                    <Select
                        allowClear
                        showSearch
                        showArrow
                        optionFilterProp="label"
                        options={kelompok.map((item) => ({
                            label: item.nama_kelompok,
                            value: item.id_kelompok,
                        }))}
                    />
                </Form.Item>
                <Form.Item
                    label="kabupaten/kota"
                    name="kode_kabkot"
                    style={{ marginBottom: "4px" }}
                >
                    <Select
                        allowClear
                        showSearch
                        showArrow
                        optionFilterProp="label"
                        options={kabkot.map((item) => ({
                            label: `[${item.kode_kabkot}] ${item.kabkot}`,
                            value: item.kode_kabkot,
                        }))}
                    />
                </Form.Item>

                <RupiahInput label="Harga Minimum" inputName="min" />

                <RupiahInput label="Harga Maksimum" inputName="max" />
                <Form.Item>
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => filterForm.submit()}
                        >
                            Apply
                        </Button>
                        <Button
                            type="default"
                            onClick={() => {
                                filterForm.resetFields();
                                filterForm.submit();
                            }}
                        >
                            Clear
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            <Table
                dataSource={daftarRangeHarga}
                columns={rangeHargaColumns}
                loading={loadingData}
            />
        </>
    );
};

index.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Kelola Range Harga</h2>}
        selectedKey="range_harga"
        children={page}
    ></AuthenticatedLayout>
);
// export default Pengguna;

export default index;
function handleEdit(id: any): void {
    throw new Error("Function not implemented.");
}
