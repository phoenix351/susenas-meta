import { SortOrder } from "antd/es/table/interface";

type Sorter<T> = (a: T, b: T, sortOrder?: SortOrder) => number;

export function createSorter<T>(property: keyof T): Sorter<T> {
    return (a: T, b: T, sortOrder?: SortOrder): number => {
        const valueA = String(a[property]);
        const valueB = String(b[property]);

        if (sortOrder === "ascend") {
            return valueA.localeCompare(valueB);
        }

        if (sortOrder === "descend") {
            return -valueB.localeCompare(valueA);
        }

        return 0;
    };
}
export function createNumberSorter<T>(
    property: keyof T
): (a: T, b: T) => number {
    return (a: T, b: T): number => {
        const valueA = a[property] !== undefined ? Number(a[property]) : 0;
        const valueB = b[property] !== undefined ? Number(b[property]) : 0;
        return valueA - valueB;

        return 0;
    };
}
