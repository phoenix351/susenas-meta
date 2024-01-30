import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";

import {
    ReactElement,
    JSXElementConstructor,
    ReactPortal,
    useRef,
    useEffect,
    useState,
} from "react";
import {
    Input,
    Space,
    // Table,
    message,
    MenuProps,
    Menu,
    Card,
    Spin,
    Form,
    Divider,
} from "antd";

import UserPengajuanCard from "@/Components/UserPengajuanCard";
import PemeliharaanForm from "@/Forms/EntriIntiSearch";
import MyModal from "@/Components/Modal";

const { Search } = Input;

const KelolaPengajuanPage = () => {
    // console.log({ maintenance_list });

    const csrfMetaTag = document.querySelector('meta[name="csrf-token"]');
    const csrfToken = csrfMetaTag ? csrfMetaTag.getAttribute("content") : "";
    // console.log({ csrfTokenRef, csrfToken });
    const [searchText, setSearchText] = useState("");
    const [searchLoading, setSearchLoading] = useState(false);

    const [items, setItems] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a fetch request to your API endpoint
                setSearchLoading(true);
                const response = await fetch(
                    route("admin.pengajuan.fetch", { type: "99", isUser: "1" })
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                // Parse the JSON response
                const dataPengajuan = await response.json();

                // Update the state with the fetched items
                setItems(dataPengajuan.data);
                setSearchLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        // Call the fetch function when the component mounts
        fetchData();
    }, []);

    const verticalMenuItems: MenuProps["items"] = [
        {
            label: "Semua",
            key: "99",
        },
        {
            label: "Menunggu Persetujuan",
            key: "0",
        },
        // {
        //     label: "Diperiksa",
        //     key: "1",
        // },

        {
            label: "Menunggu Penyedia",
            key: "3",
        },
        {
            label: "Diproses Penyedia",
            key: "4",
        },
        {
            label: "Diperiksa Kembali",
            key: "5",
        },
        {
            label: "Selesai",
            key: "6",
        },
    ];
    const [selectedVerticalMenu, setSelectedVerticalMenu] = useState("99");

    // data for current barang bast
    const fetchDataByType = async (type: string) => {
        try {
            // Make a fetch request to your API endpoint
            setSearchLoading(true);
            const response = await fetch(
                route("admin.pengajuan.fetch", { type: type, isUser: "1" })
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Parse the JSON response
            const dataPengajuan = await response.json();
            console.log({ dataPengajuan });
            // Update the state with the fetched items
            setItems(dataPengajuan.data);
            setSearchLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchDataByQuery = async (querySearch: string, type: string) => {
        try {
            // Make a fetch request to your API endpoint
            setSearchLoading(true);
            const response = await fetch(
                route("admin.pengajuan.fetch", {
                    querySearch: querySearch ? querySearch : "",
                    type: type,
                    isUser: "1",
                })
            );
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            // Parse the JSON response
            const dataHasilSearch = await response.json();
            setSearchLoading(false);
            // Update the state with the fetched items
            setItems(dataHasilSearch.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const onSearch = async (value: string) => {
        // setSearchLoading(true);
        setSearchText(value);

        fetchDataByQuery(value, selectedVerticalMenu);
        // setSearchLoading(false);
    };

    // function handleVerticalMenuClick(event: any): MenuProps['onClick'] {

    // }
    const handleVerticalMenuClick: MenuProps["onClick"] = (e: any) => {
        setSelectedVerticalMenu(e.key);
        fetchDataByType(e.key);
    };
    const renderContent = () => {
        return <UserPengajuanCard items={items} csrfToken={csrfToken} />;
    };

    const Loading = () => (
        <Card
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Spin />
        </Card>
    );

    function pengajuanFinish(values: any): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div>
            <Head title="History Barang" />

            <h1 style={{ marginBottom: "10px" }}>Daftar Pengajuan Pegawai</h1>

            <Menu
                selectedKeys={[selectedVerticalMenu]}
                mode="horizontal"
                items={verticalMenuItems}
                style={{ display: "flex" }} // This makes the Menu take up all available space
                onClick={handleVerticalMenuClick}
            />

            {/* <Divider /> */}
            <Space
                style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    width: "100%",
                }}
                direction="vertical"
            >
                <Search
                    placeholder="Cari berdasarakan  nama barang / nomor urut pendaftaran"
                    allowClear
                    onSearch={onSearch}
                    loading={searchLoading}
                    style={{ width: "100%" }}
                />
            </Space>
            {searchLoading ? Loading() : renderContent()}
        </div>
    );
};

KelolaPengajuanPage.layout = (
    page: ReactElement<any, JSXElementConstructor<any>> | ReactPortal
) => (
    <AuthenticatedLayout
        user={page.props.auth.user}
        header={<h2 className="">Pengajuan Saya</h2>}
        selectedKey="pengajuan"
        children={page}
    ></AuthenticatedLayout>
);
export default KelolaPengajuanPage;
