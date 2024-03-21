import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useParams } from "react-router-dom";

export const Vote = () => {
    const {id} = useParams();
    
    return <div>
        <div>
            <Header />
        </div>
        
    </div>
}