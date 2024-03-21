import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useParams } from "react-router-dom";

export const ProductInfo = () => {
    const [product, setProduct] = useState<any>({});
    const {id} = useParams();

    useEffect(() => {
        async function getProduct(){
            const response = await axios.get(`${BACKEND_URL}/api/v1/product/${id}`, {
                headers: {
                    Authorization: `Bearer ` + localStorage.getItem("token")
                }
            });
            setProduct(response.data);
        }    

        getProduct();
    }, []);
    return <div>
        <div>
            <Header />
        </div>
        <div>
            {product.punchline}
        </div>
    </div>
}