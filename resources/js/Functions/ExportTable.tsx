export default function exportTableAsCsv(columns: any[], tableData: any[]) {
    const csvContent =
        columns.map((column) => column.title).join(";") +
        "\n" +
        tableData
            .map((row) =>
                columns.map((column) => row[column.dataIndex]).join(";")
            )
            .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
