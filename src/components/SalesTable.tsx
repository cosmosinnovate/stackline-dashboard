import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react"; // Importing real icons

interface SalesData {
    weekEnding: string;
    retailSales: number;
    wholesaleSales: number;
    unitsSold: number;
    retailerMargin: number;
}

interface ProductData {
    sales: SalesData[];
}

const SalesTable = ({ productData }: { productData: ProductData[] }) => {
    const [sortColumn, setSortColumn] = useState(null);
    const [sortDirection, setSortDirection] = useState("asc");

    const handleSort = (column) => {
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

        return sortDirection === "asc" ? valA - valB : valB - valA;
    });

    return (
        <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Sales Data</h3>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b text-gray-600">
                        {["weekEnding", "retailSales", "wholesaleSales", "unitsSold", "retailerMargin"].map((col) => (
                            <th
                                key={col}
                                className="pb-2 cursor-pointer flex-col align-center"
                                onClick={() => handleSort(col)}
                            >
                                <div className="flex flex-row">
                                    <span>
                                        {col === "weekEnding"
                                            ? "Week Ending"
                                            : col.replace(/([A-Z])/g, " $1").toUpperCase()}
                                    </span>
                                    <div className="flex justify-center space-y-1">
                                        {sortColumn === col ? (
                                            sortDirection === "asc" ? (
                                                <ArrowUp
                                                    className={`w-6 h-6 ${sortColumn === col && sortDirection === "asc"
                                                        ? "text-black"
                                                        : "text-gray-400"
                                                        }`}
                                                />
                                            ) : (
                                                <ArrowDown
                                                    className={`w- h-6 ${sortColumn === col && sortDirection === "desc"
                                                        ? "text-black"
                                                        : "text-gray-400"
                                                        }`}
                                                />
                                            )
                                        ) : (
                                            <ArrowDown
                                                className={`w- h-6 ${sortColumn === col && sortDirection === "desc"
                                                    ? "text-black"
                                                    : "text-gray-400"
                                                    }`}
                                            />
                                        )}
                                    </div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((row, index) => (
                        <tr key={index} className="border-b last:border-b-0">
                            <td className="py-3">{row.weekEnding}</td>
                            <td className="py-3">${row.retailSales.toLocaleString()}</td>
                            <td className="py-3">${row.wholesaleSales.toLocaleString()}</td>
                            <td className="py-3">{row.unitsSold}</td>
                            <td className="py-3">${row.retailerMargin.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SalesTable;
