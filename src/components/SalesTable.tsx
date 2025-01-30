import { FC, useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react"; // Importing real icons
import { ProductData, Sale } from "../util/Product";

interface SalesTableProps {
    productData: ProductData;
}

const SalesTable: FC<SalesTableProps> = ({ productData }) => {
    const [sortColumn, setSortColumn] = useState<keyof Sale | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const handleSort = (column: keyof Sale) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const sortedData = [...productData[0].sales].sort((a, b) => {
        if (!sortColumn) return 0;
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        // Ensure proper sorting for numbers
        return sortDirection === "asc"
            ? (valA as number) - (valB as number)
            : (valB as number) - (valA as number);
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Sales Data</h3>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b text-gray-600">
                        {["weekEnding", "retailSales", "wholesaleSales", "unitsSold", "retailerMargin"].map(
                            (col) => (
                                <th
                                    key={col}
                                    className="pb-2 px-4 cursor-pointer"
                                    onClick={() => handleSort(col as keyof Sale)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <span>
                                            {col === "weekEnding"
                                                ? "Week Ending"
                                                : col.replace(/([A-Z])/g, " $1").toUpperCase()}
                                        </span>
                                        <div>
                                            {sortColumn === col ? (
                                                sortDirection === "asc" ? (
                                                    <ArrowUp className="w-4 h-4 text-black" />
                                                ) : (
                                                    <ArrowDown className="w-4 h-4 text-black" />
                                                )
                                            ) : (
                                                <ArrowDown className="w-4 h-4 text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                </th>
                            )
                        )}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                            <td className="py-3 px-4">{row.weekEnding}</td>
                            <td className="py-3 px-4">${row.retailSales.toLocaleString()}</td>
                            <td className="py-3 px-4">${row.wholesaleSales.toLocaleString()}</td>
                            <td className="py-3 px-4">{row.unitsSold}</td>
                            <td className="py-3 px-4">${row.retailerMargin.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
