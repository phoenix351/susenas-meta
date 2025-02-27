import axios from "axios";

const cekNomorSampel = async (
    value: any,
    currentRecordId: any,
    kode_kabkot: any,
    nks: any,
    semester : number |string
) => {
    try {
        const response = await axios.post(route("api.cekNomorSampel"), {
            value,
            currentRecordId,
            kode_kabkot,
            nks,
            semester
        });

        return !response.data.exists;
    } catch (error) {
        console.error("Error checking unique value:", error);
        return false; // Handle the error appropriately
    }
};

export default cekNomorSampel;
