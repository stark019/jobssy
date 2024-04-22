import './JobsAdmin.css';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Navbar from '../admin-panel/adminComponents/navbar/Navbar';
import Sidebar from '../admin-panel/adminComponents/sidebar/Sidebar';


const JobsAdmin = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const { currUserId } = useSelector((state) => state.users.value); // use this to get the current user's id
    console.log(currUserId);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'jobs'), (querySnapshot) => {
            let tempArr = [];
            querySnapshot.forEach((item) => {
                tempArr.push({ ...item.data(), id: item.id })
            });
            setJobs(tempArr);
        })

    }, [])



    const handleDelete = (id) => {
        deleteDoc(doc(db, 'jobs', id)).then((res) => {
            alert("job has been deleted");
        })
    }

    const handleUpdate = (id) => {
        navigate('/updatejob/' + id)
    }
    

   

    //utility functions
    const calculateTime = (time) => {
        const givenTime = new Date(time);
        const currTime = new Date(Date.now())
        const diffDays = parseInt((currTime - givenTime) / (1000 * 60 * 60 * 24), 10);
        return diffDays;
    }
    
    const viewApplicants = (id) => {
        navigate('/applicants/' + id);
    }

    return (
        <>

            <div className='joblistHome'>
                <Navbar></Navbar>
                <div className='joblistcontainer'>
                    <Sidebar></Sidebar>
                    <div className='container joblistbox'>
                        <h1 className='text-center'>Job List</h1>
                        <div className='joblisting'>
                            {/* ***************** NEW CARD UI ******************* */}
            <div className='admin-job-list row text-center'>
                {
                    jobs.map((item) => (
                        < div className="col-10 col-md-6 mt-5"  >
                            <div className="card p-2">
                                <div className="d-flex align-items-center">

                                    <div className="ml-3 w-100"  >
                                        <div className="heading-timestamp">
                                            <h4 className="mb-0 mt-0 textLeft">{item.title}</h4>
                                            <span className="timestamp">{calculateTime(item.postedOn)} DAYS AGO</span>
                                        </div>
                                        <span className="text-left">{item.company}</span>
                                        <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                            <div className="d-flex flex-column">
                                                <span className="number3">Location</span> <span className="articles">{item.location}</span>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span className="number3">Experience</span> <span className="followers">{item.exp} + </span>
                                            </div>
                                            <div className="d-flex flex-column">
                                                <span className="number3">Salary</span> <span className="followers">₹ {item.ctc} LPA</span>
                                            </div>
                                        </div>
                                        <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                            <div className="d-flex flex-column">
                                                <span className="number3">Description</span> <span className="followers">{item.desc.slice(0, 20)}...</span>
                                            </div>
                                            <button className='btn btn-success apply-btn adminButtons' onClick={() => handleUpdate(item.id)}>Update</button>
                                            <button className='btn btn-success apply-btn adminButtons' onClick={() => viewApplicants(item.id)}>View Applicants</button>
                                            <button className='btn btn-success apply-btn adminButtons' onClick={() => handleDelete(item.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))

                }
            </div>
            {/* ***************** NEW CARD UI ******************* */}
                        </div>



                    </div>
                </div>
            </div>
        </>


    )
}
export default JobsAdmin;