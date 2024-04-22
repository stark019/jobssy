import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import './UserList.css'
import Navbar from "../admin-panel/adminComponents/navbar/Navbar";
import Sidebar from "../admin-panel/adminComponents/sidebar/Sidebar";
const UserList = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    console.log(params.id);

    let tempArr = [];
    let arr = [];
    useEffect(() => {
        onSnapshot(collection(db, 'users'), (users) => {
            users.docs.forEach((user) => {
                //tempArr.push(user)
                //console.log(`${user.data()}`)
                if (user.data().role === "user") {
                    tempArr.push(user.data())
                    console.log('the user found')
                }
            })
            setData(tempArr)
        })
    }, [])
    console.log('got data')

    return (
        <>
            <div className="userlistHome">
                <Navbar></Navbar>
                <div className="userListContainer">
                <Sidebar></Sidebar>
                    <div className="container applicants-div">
                        <div className="applicants-divContainer">
                            <table class="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Title</th>
                                        <th>Experience</th>
                                        <th>Education</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        // console.log(data[0])
                                        data.map((item) => (
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.title}</td>
                                                <td>{item.exp}</td>
                                                <td>{item.edu}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default UserList