export interface Product {
    id: number;
    description: string;
    cost: number;
    measurement: string;
    price: number;
    profit: number;
}

export interface Client {
    id: string;
    name: string;
    cpf: string;
    cityId: number;
    adress: string;
    neighborhood: string;
    cep: string;
    priceTable: number;
    status: string;
}

export interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: "right" | "center" | "left";
}