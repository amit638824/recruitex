import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
const ProtectedRoute = ({ children }: any) => {
    const data = useSelector((data: any) => data?.auth);
    if (!data?.token) {
        return <Navigate to='/login' replace />
    }
    if (!data?.token) return null

    return <>{children}</>
}

export default ProtectedRoute