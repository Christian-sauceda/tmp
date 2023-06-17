import { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Skeleton from '../components/Alerts/Skeletor'
//components

import Sidebar from "../components/Sidebar/Sidebar.jsx";
import Sidebar2 from "../components/Sidebar/Sidebar2.jsx";
import Header from "../components//Headers/Header.jsx";


//importar css
import "./AuthLayout.css";
const AdminLayout = () => {
    const { auth, cargando } = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    if (cargando) return <Skeleton />
    return (
        <>
            <div className="flex h-screen overflow-hidden">
                {/* Sidebar */}
                {auth?.TYPE === '0' ?
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> :
                    <Sidebar2 sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                }


                {/* Content area */}
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {/*  Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            {auth?.COD ? <Outlet /> : <Navigate to="/" />}

                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}

export default AdminLayout;