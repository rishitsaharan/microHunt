import { Header } from "../components/Header";
import { Leaderboard } from "../components/Leaderboard";
import { TopGainerBoard } from "../components/TopGainerBoard";
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { voteCountState } from '../atoms/atom';
import { HomeSkeleton } from "../components/HomeSkeleton";

export const Home = () => {
    const [products, setProducts] = useState< any []>([]);
    const [topGainers, setTopGainers] = useState<any []>([]);
    const voteCount = useRecoilValue(voteCountState);
    const [loading, setLoading] = useState(true);

    async function getProducts() {
        const response = await axios.get(`${BACKEND_URL}/api/v1/product/leaderboard`, {
            headers: {
                Authorization: `Bearer ` + localStorage.getItem("token")
            }
        });
        setProducts(response.data.allTimeGainers);
        setTopGainers(response.data.topGainers)
        setLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, [voteCount]);
    
    return (
        <div className="">
            <div className="">
                <Header />
            </div>
            {loading && <HomeSkeleton />}
            {!loading && products.length!=0 && 
                <div className="flex flex-col-6 justify-around">
                    <div className="hidden md:block max-w-6xl">
                        <Leaderboard products={products}/>
                    </div>
                    <div className="hidden lg:block">
                        <TopGainerBoard topGainers={topGainers}/>
                    </div>
                </div>
            }
        </div>
    )
};