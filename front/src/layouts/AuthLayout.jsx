import { Outlet, Navigate} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
//components

//importar css
import "./AuthLayout.css";
const AuthLayout = () => {
    const { auth } = useAuth()
    return (

    
        <>
            <main className="container mx-auto md:grid md:grid-cols-2 mt-24 gap-10 p-5 items-center">
            
            {auth?.COD ? <Navigate to="/admin" /> : <Outlet />}
            </main>

        </>
    )
}

export default AuthLayout;