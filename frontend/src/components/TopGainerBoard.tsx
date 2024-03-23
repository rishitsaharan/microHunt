import { useNavigate } from "react-router-dom"

export const TopGainerBoard = ({topGainers} : any) => {
    const navigate = useNavigate();
    return(
        <div className="mt-10 border border-slate-200 shadow-lg rounded-lg w-96 flex flex-col p-5">
            <div className="border-b-2 text-lg font-semibold mb-4">
                Top Gainers
            </div>
            <div>
                {topGainers.map((product:any) => {
                    return (
                        <div className="flex flex-row mb-3 cursor-pointer w-full justify-between" onClick={()=> navigate(`/${product.id}`)}>
                            <div className="flex flex-row">
                                <div className="flex flex-row items-center mr-2">
                                    <img src={product.logoFileUrl} className="w-8 h-8"/>
                                </div>
                                <div className=" flex flex-row items-center text-sm font-semibold mr-2">
                                    {product.codeName}
                                </div>
                            </div>
                            <div className=" flex flex-row items-center text-sm font-semibold text-green-500">
                                ↑{product.numberVotes}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}