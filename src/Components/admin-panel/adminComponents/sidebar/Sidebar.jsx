import { NavLink } from 'react-router-dom';
import './sidebar.scss'
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setUserRole } from '../../../../useSlice';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const logOut = (e) => {
        e.preventDefault()
        dispatch(setUserRole(""))
        navigate("/")
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <span className="logo">Apple</span>
            </div>
            <hr />
            <div className="center">
                <ul>
                    <p className="title">MAIN</p>
                    <li>
                        <i class="fa fa-solid fa-desktop icon"></i>
                        <NavLink className="nav-link" to="/"><span>Home</span></NavLink>
                    </li>
                    <p className="title">LISTS</p>
                    <li>
                        <i className="fa fa-solid fa-briefcase icon"></i>
                        <NavLink className="nav-link" to="/jobadmin"><span>Job Lists</span></NavLink>

                    </li>
                    <li>
                        <i class="fa fa-solid fa-plus icon"></i>
                        <NavLink className="nav-link" to="/addjob"><span>Add Job</span></NavLink>
                    </li>
                    <li>
                        <i className="fa fa-solid fa-user icon"></i>
                        <NavLink className="nav-link" to="/userlist"><span>List of users</span></NavLink>

                    </li>


                    <li>
                        <i class="fa fa-solid fa-plus icon"></i>
                        <NavLink className="nav-link" to="/bulkupload"><span>Bulk Upload</span></NavLink>
                    </li>
                    {/* <li>
                        <i className="fa fa-solid fa-bookmark icon"></i>
                        <span>Orders</span>
                    </li>
                    <li>
                        <i className="fa fa-solid fa-truck icon"></i>
                        <span>Delivery</span>
                    </li>
                    <p className="title">USEFUL</p>
                    <li>
                    <i class="fa fa-solid fa-chart-line icon"></i>
                        <span>Stats</span>
                    </li>
                    <li>
                        <i className="fa fa-solid fa-bell icon"></i>
                        <span>Notifications</span>
                    </li>
                    <p className="title">SERVICE</p>
                    <li>
                    <i class="fa fa-solid fa-desktop icon"></i>
                        <span>System Health</span>
                    </li>
                    <li>
                    <i class="fa fa-solid fa-gear icon"></i>
                        <span>Logs</span>
                    </li>
                    <li>
                    <i class="fa fa-solid fa-gear icon"></i>
                        <span>Settings</span>
                    </li> */}
                    <p className="title">ADMIN</p>
                    <li>
                        <i className="fa fa-solid fa-right-from-bracket icon"></i>
                        <NavLink className="nav-link" to="/adminpanel"><span>Admin Panel</span></NavLink>
                    </li>
                    <li>
                        <i className="fa fa-solid fa-right-from-bracket icon"></i>
                        <span onClick={logOut}>Logout</span>

                    </li>
                </ul>
            </div>
            <div className="bottom">
                <div className="colorOptions"></div>
                <div className="colorOptions"></div>
            </div>
        </div>
    )
}

export default Sidebar