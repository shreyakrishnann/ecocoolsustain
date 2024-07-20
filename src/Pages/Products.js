import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom';
import Starts from '../components/Starts';
import Loader from '../components/Loader'

const Products = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [fetchTime, setFetchTime] = useState(false);
    const [ac, setAc] = useState('');


    const fetchdata = async () => {
        setFetchTime(true);
        const api = 'https://fypproject-backend.onrender.com/ac-details';
        try {
            const response = await fetch(api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.msg || 'Something went wrong, please try again.');
                setFetchTime(false);
            }
            else {
                const data = await response.json();
                setData(data);
                console.log(data)
                setFetchTime(false);
            }

        } catch (error) {
            console.error('Error:', error);
            setFetchTime(false);

        }
    }


    useEffect(() => {
        const loginData = localStorage.getItem('login');
        if (!loginData || loginData.length === 0 || loginData === 'undefined') {
            alert("Please Login...");
            navigate('/signin');
            return;
        }
        else {
            fetchdata();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <div className='container mx-auto p-4'>
                <Navbar categories={false} />
                <div className="bg-white py-6 sm:py-8 lg:py-12">
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                        <div className="mb-6 flex items-end justify-between gap-4">
                            <h2 className="text-2xl font-bold text-green-500 lg:text-3xl">
                                Product List
                            </h2>

                            <div className='flex flex-row gap-4 items-center justify-center '>
                                <button className='bg-green-500 text-white font-semibold px-4 py-1  rounded ' onClick={() => { setAc('LG') }}>LG</button>
                                <button className='bg-green-500 text-white font-semibold px-4 py-1  rounded ' onClick={() => { setAc('Daikin') }}>Daikin</button>
                            </div>


                        </div>
                        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                            {/* product - start */}

                            {!ac && data.length > 0 && data.map((item) => {
                                return (
                                    <div key={item._id}>
                                        <div
                                            className="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                                        >
                                            <img
                                                src={item.image}
                                                loading="lazy"
                                                alt={item.brandName}
                                                className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <div className='truncate hover:text-clip'>
                                                {item.AcConditioner}
                                            </div>
                                            <div className="flex flex-row items-center justify-between">
                                                {/* <span className="text-gray-500"></span> */}
                                                <Link
                                                    href="#"
                                                    className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                                                >
                                                    {item.brandName}
                                                </Link>
                                                <span className='font-semibold'>
                                                    <Starts rating={item.rating} />
                                                </span>
                                            </div>
                                            <Link to={`/products/${item._id}`} className='inline-block rounded-lg bg-green-500 px-8 py-3 mt-2 text-center text-sm font-semibold text-white outline-none ring-green-300 transition duration-100 hover:bg-green-600 focus-visible:ring active:bg-green-700 md:text-base'>
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                            {ac &&
                                data.length > 0 && data.filter(x => x.brandName === ac).map((item) => {
                                    return (
                                        <div key={item._id}>
                                            <div
                                                className="group mb-2 block h-96 overflow-hidden rounded-lg bg-gray-100 shadow-lg lg:mb-3"
                                            >
                                                <img
                                                    src={item.image}
                                                    loading="lazy"
                                                    alt={item.brandName}
                                                    className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className='truncate hover:text-clip'>
                                                    {item.AcConditioner}
                                                </div>
                                                <div className="flex flex-row items-center justify-between">
                                                    {/* <span className="text-gray-500"></span> */}
                                                    <Link
                                                        href="#"
                                                        className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                                                    >
                                                        {item.brandName}
                                                    </Link>
                                                    <span className='font-semibold'>
                                                        <Starts rating={item.rating} />
                                                    </span>

                                                </div>
                                                <Link to={`/products/${item._id}`} className='inline-block rounded-lg bg-green-500 px-8 py-3 mt-2 text-center text-sm font-semibold text-white outline-none ring-green-300 transition duration-100 hover:bg-green-600 focus-visible:ring active:bg-green-700 md:text-base'>
                                                    Read More
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        {data.length === 0 && !fetchTime && <p className='text-center text-3xl font-bold '>No data found</p>}
                        {fetchTime && <p className='text-center text-3xl font-bold '>Loading... <Loader /></p>}
                        <br />


                    </div>
                </div >

            </div >
        </>
    )
}

export default Products