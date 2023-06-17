import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// components

export default function CardFileAddMovieAdult() {
    return (
        <>
            <div className="w-full flex flex-col sm:flex-row flex-grow overflow-hidden">
                <div className="sm:w-1/3 md:1/4 w-full flex-shrink flex-grow-0 p-4">
                    <div className="sticky top-0 p-4 w-full">
                        <ul className="flex sm:flex-col overflow-hidden content-center ">
                            <Skeleton direction="ltr" width="300px" height="900px" borderRadius="35px" />
                        </ul>
                    </div>
                </div>
                <main role="main" className="w-auto h-auto flex-grow pt-10 ">

                    <p className="mb-0 borde"> <Skeleton direction="ltr" width="1500px" height="150px" borderRadius="25px" /></p>
                    <div className=" p-8 grid grid-rows-2 grid-flow-col gap-3 auto-cols-fr">

                        <div className="p-4 bg-slate-100 flex gap-2">
                            <p className="mb-4"> <Skeleton direction="ltr" width="100px" height="100px" borderRadius="100px" /></p>
                            <div className='align-middle'>
                                <Skeleton direction="ltr" width="200px" height="85px" borderRadius="10px" />
                                <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                            </div>
                        </div>
                        <div className="p-4 bg-slate-100 flex gap-2">
                            <p className="mb-4"> <Skeleton direction="ltr" width="100px" height="100px" borderRadius="100px" /></p>
                            <div className='align-middle'>
                                <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                                <Skeleton direction="ltr" width="170px" height="45px" borderRadius="10px" />
                            </div>
                        </div>
                        <div className="p-4 bg-slate-100 flex gap-2 ">
                            <p className="mb-4"> <Skeleton direction="ltr" width="100px" height="100px" borderRadius="100px" /></p>
                            <div className='align-middle'>
                                <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                                <Skeleton direction="ltr" width="100px" height="45px" borderRadius="10px" />
                            </div>
                        </div>
                        <div className="p-4 bg-slate-100 flex gap-2 ">
                            <p className="mb-4"> <Skeleton direction="ltr" width="100px" height="100px" borderRadius="100px" /></p>
                            <div className='align-middle'>
                                <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                                <Skeleton direction="ltr" width="200px" height="85px" borderRadius="10px" />
                            </div>
                        </div>
                        <div className="p-4 bg-slate-100 flex gap-2 ">
                            <p className="mb-4"> <Skeleton direction="ltr" width="100px" height="100px" borderRadius="100px" /></p>
                            <div className='align-middle'>
                                <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                                <Skeleton direction="ltr" width="150px" height="45px" borderRadius="px" />
                            </div>
                        </div>
                        <div className="p-4 bg-slate-100 flex gap-2 ">
                            <p className="mb-4"> <Skeleton direction="ltr" width="100px" height="100px" borderRadius="100px" /></p>
                            <div className='align-middle'>
                                <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                                <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                            </div>
                        </div>
                        <div className="p-4 bg-slate-100 flex gap-2">
                            <p className="mb-4"> <Skeleton direction="ltr" width="100px" height="100px" borderRadius="100px" /></p>
                            <div className='align-middle'>
                                <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                                <Skeleton direction="ltr" width="200px" height="85px" borderRadius="10px" />
                            </div>
                        </div>
                    </div>
                    <div className="p-3 bg-slate-100 flex gap-1">
                        <div className='align-middle flex gap-4'>
                            <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                            <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                            <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                            <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                            <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                            <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                        </div>
                    </div>
                    <div className='grid grid-cols-2'>
                        <div className=" p-8 flex gap-2">

                            <div className="p-4 bg-slate-100 flex gap-2 ">
                                <p className="mb-4"> <Skeleton direction="ltr" width="100px" height="100px" borderRadius="100px" /></p>
                                <div className='align-middle'>
                                    <Skeleton direction="ltr" width="300px" height="45px" borderRadius="10px" />
                                    <Skeleton direction="ltr" width="200px" height="45px" borderRadius="10px" />
                                </div>
                            </div>
                            <div className="p-4 bg-slate-100 flex gap-2">
                                <p className="mb-4"> <Skeleton direction="ltr" width="100px" height="100px" borderRadius="100px" /></p>
                                <div className='align-middle'>
                                    <Skeleton direction="ltr" width="400px" height="95px" borderRadius="10px" />
                                    <Skeleton direction="ltr" width="170px" height="45px" borderRadius="10px" />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <p className="mb-0"> <Skeleton direction="ltr" width="1500px" height="200px" baseColor='000' /></p>
            </div>
        </>
    );
}
