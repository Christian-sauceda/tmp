
//importar css
import "./AdminLayout";

//simulacion de autenticacion
import { Outlet, Navigate} from 'react-router-dom'

const auth = { COD: true };
const AuthLayout = () => {
    //const { auth } = useAuth()
    return (

    
        <>
            <main className="container mx-auto md:grid md:grid-cols-2 mt-24 gap-10 p-5 items-center">
            {auth?.COD ? <Navigate to="/admin" /> : <Outlet />}

            </main>

        </>
    )
}

export default AuthLayout;