import { Navigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

const ProtectAdmin = ({children}) =>{
  const {user, loading} = useAuth();

  if(loading) return <h1>Loading...</h1>;

  if(user.role !== "admin") return <Navigate to="/" />

  return children;
}
export default ProtectAdmin;