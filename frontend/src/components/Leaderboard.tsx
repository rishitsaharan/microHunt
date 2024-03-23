import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { ProductCard } from './ProductCard';
import { voteCountState } from '../atoms/atom';

export const Leaderboard =  ({products} : any) => {

    return <div className='mt-10'>
        {products.map((product : any, index : number) => {
            return (
                <div key={product.id}>
                    <ProductCard product={product} index={index}/>
                </div>
            )
        })}
    </div>
}