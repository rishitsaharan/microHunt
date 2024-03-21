import { Header } from "../components/Header"
import { useParams } from "react-router-dom";
import { Info } from "../components/Info";

export const ProductInfo = () => {
    const {id} = useParams();

    return <div>
        <div>
            <Header />
        </div>
        <div>
            <Info productId = {id}/>
        </div>
    </div>
}