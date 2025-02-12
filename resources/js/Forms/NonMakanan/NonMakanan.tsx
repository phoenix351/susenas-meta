import { Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import NonMakananTable from "./NonMakananTable";

const BlokNonMakanan = ({ id_ruta }: { id_ruta: string }) => {
    // console.log({id_ruta});

    const [loadingData, setLoadingData] = useState(false);
    const [dataSource, setDataSource] = useState<any[]>([]);

    
    async function fetchData(id_ruta: string) {
        try {
            const { data } = await axios.get(
                route("api.non_mak.komoditas.list")
            );

            setDataSource(
                data.map((element: any) => ({ ...element, harga: 0 }))
            );
        } catch (error) {
            console.log("error fetch data", error);
        } 
    }
    useEffect(() => {
        fetchData(id_ruta);
    }, []);

    return <NonMakananTable dataSource={dataSource} id_ruta={id_ruta} />;
};

export default BlokNonMakanan;
