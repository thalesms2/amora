import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';

import api from './api';
import promiseResults from './toastPromiseDefault';

import { Product } from '../types/types';

export default function useProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        async function getProducts() {
            try {
                const { data } = await toast.promise(
                    api.get("/product"), promiseResults) 
                setProducts(data);
            } catch (err) {
                alert("Ocorreu um erro ao buscar os produtos");
            }
        }
        getProducts();
    }, []);
    return products
}