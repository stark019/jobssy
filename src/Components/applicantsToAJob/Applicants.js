import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { onSnapshot, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import './Applicants.css'
import Sidebar from "../admin-panel/adminComponents/sidebar/Sidebar";
import Navbar from "../admin-panel/adminComponents/navbar/Navbar";
const Applicants = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    console.log(params.id);

    let tempArr = [];
    let arr = [];
    useEffect(() => {
        onSnapshot(collection(db, 'jobs'), (jobs) => {
            jobs.docs.forEach((job) => {
                // console.log(job);
                if (job.id === params.id)
                    tempArr.push(...job.data().applicants)
            });
        })
        onSnapshot(collection(db, 'users'), (users) => {
            users.docs.forEach((user) => {
                tempArr.forEach(id => {
                    if (user.id === id) {
                        arr.push(user.data());
                    }
                });
            })
            setData(arr);
        })
    }, [])

    return (
       <>
       <div className="applicantsHome">
        <Navbar></Navbar>
        <div className="applicantsContainer">
            <Sidebar></Sidebar>
        <div className="container applicants-div">
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
       </>
    )
}
export default Applicants