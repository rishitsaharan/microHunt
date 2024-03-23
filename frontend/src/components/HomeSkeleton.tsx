export const HomeSkeleton = () => {
    return (
        <>
        {/* <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div> */}
        <div className="flex flex-row justify-around mt-10">
            <div className="flex flex-col">
                <AllTimeGainers />
                <AllTimeGainers />
                <AllTimeGainers />
                <AllTimeGainers />
                <AllTimeGainers />
            </div>
            <div className="border border-slate-200 shadow-lg rounded-lg w-96 flex flex-col p-5 h-fit">
                <div className="bg-gray-200 rounded-full w-48 mb-4">
                </div>
                <TopGainers />
                <TopGainers />
                <TopGainers />
                <TopGainers />
                <TopGainers />
            </div>
        </div>
        </>
    )
}

const AllTimeGainers = () => {
     return (
        <div className="max-w-6xl">
                <div className="mb-3">
                    <div className="flex flex-row h-40 w-full max-w-6xl border border-gray-200 rounded-xl p-4 justify-between">
                        <div className="flex flex-row items-center">
                            <div className="flex flex-row items-center w-96 mr-3">
                                <div className="h-2.5 bg-gray-200 rounded-full w-10 mb-4">
                                </div>
                                <div className="flex flex-col flex-grow-3 px-2 py-1">
                                    <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-4">
                                    </div>
                                    <div className="h-2.5 bg-gray-200 rounded-full w-64 mb-4">
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col px-2 py-1 w-64 items-center justify-center mr-10">
                                <div className="h-2.5 bg-gray-200 rounded-full w-36 mb-4">
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full w-36 mb-4">
                                </div>
                                <div className="h-2.5 bg-gray-200 rounded-full w-36 mb-4">
                                </div>
                            </div>
                            <div className="flex flex-col w-64 justify-center mr-3">
                                <dl className="h-2.5 bg-gray-200 rounded-full w-36 mb-4">
                                
                                </dl>
                                <dl className="h-2.5 bg-gray-200 rounded-full w-36 mb-4">
                                </dl>
                                <dl className="h-2.5 bg-gray-200 rounded-full w-36 mb-4">
                                </dl>
                            </div>
                        </div>
                        <div className="flex flex-col px-2 py-1 items-center justify-center">
                            <div className="h-2.5 bg-gray-200 rounded-full w-20 mb-4">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
     )
}

const TopGainers = () => {
    return (
            <div className="flex flex-row mb-3 cursor-pointer w-full justify-between">
                <div className="flex flex-row">
                    <div className="h-2.5 bg-gray-200 rounded-full w-5 mb-4 mr-5">
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-4">
                    </div>
                </div>
                <div className="h-2.5 bg-gray-200 rounded-full w-2 mb-4">
                </div>
            </div>
    )
}