import { useState, useEffect } from "react";
import { onSnapshot, collection, doc, arrayUnion, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import './AppliedJobs.css';
import NavbarJobList from "../jobListing/navbarJobList/NavbarJobList";

const AppliedJobs = () => {
    const { currUserId } = useSelector((state) => state.users.value); // use this to get the current user's id
    const [data, setData] = useState([]);

    //fetch
    let tempArr = [];
    let arr = [];
    useEffect(() => {
        onSnapshot(collection(db, 'users'), (users) => {
            users.forEach((user) => {
                if (user.id === currUserId)
                    tempArr.push(...user.data().appliedJobs)
            });
        })
        onSnapshot(collection(db, 'jobs'), (totalJobs) => {
            
            totalJobs.forEach((item) => {
                tempArr.forEach(job => {
                    if (item.id === job) {
                        arr.push({ ...item.data(), id: item.id });
                    }
                });
            })
            setData(arr);
        })
    }, [arr])

    const calculateTime = (time) => {
        const givenTime = new Date(time);
        const currTime = new Date(Date.now())
        const diffDays = parseInt((currTime - givenTime) / (1000 * 60 * 60 * 24), 10);
        return diffDays;
    }
    const handleSaveJobs = (jobId) => {
        updateDoc(doc(db, 'users', currUserId), {
            savedJobs: arrayUnion(jobId)
        }).then((res) => {
            console.log("job added to saved job array");
            alert("Job added to saved job")
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleRemoveJobs = (jobId) => {
        updateDoc(doc(db, 'users', currUserId), {
            appliedJobs: arrayRemove(jobId)
        }).then((res) => {
            console.log("job removed from applied job array");
            alert("Job removed from applied jobs")
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
       <>
       <NavbarJobList></NavbarJobList>
        <div className="applied-job-parent-container">
            {/* ************************New card UI ********************************************/}
            <h1>Applied Jobs</h1>
            <div className='applied-job-container row text-center'>
                {
                    data.map((item) => (
                        < div className="col-10 col-md-4 mt-5"  >
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
                                            <button className='btn btn-success d-flex' onClick={() => handleSaveJobs(item.id)}>Save for later</button>
                                            <button className='btn btn-success d-flex' onClick={() => handleRemoveJobs(item.id)}>Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))

                }
            </div>
            {/* ************************New card UI ********************************************/}
        </div>
       </>
    )
}
export default AppliedJobs