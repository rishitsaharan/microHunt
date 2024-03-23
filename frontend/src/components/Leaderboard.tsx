import { ProductCard } from './ProductCard';

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