import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Admin = ({ child }) => {
    const {currRole} = useSelector((state)=>state.users.value); // taking curr role from global state
    console.log(currRole);
    if (currRole !== 'admin') { // if roles does not match, we'll not permit the user
        return <Navigate to="/" replace />;
    }
    return child // else render the expected component
};
export default Admin;