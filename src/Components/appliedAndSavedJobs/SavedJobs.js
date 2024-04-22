import { useState, useEffect } from "react";
import { onSnapshot, collection, updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBriefcase, faIndianRupeeSign, faLocationDot, faFileLines, faClockRotateLeft, faRemove, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import './SavedJobs.css';
import NavbarJobList from "../jobListing/navbarJobList/NavbarJobList";
const SavedJobs = () => {
    const { currUserId } = useSelector((state) => state.users.value); // use this to get the current user's id
    const [data, setData] = useState([]);

    //fetch
    let tempArr = [];
    useEffect(() => {
        onSnapshot(collection(db, 'users'), (users) => {
            users.forEach((user) => {
                if (user.id === currUserId)
                    tempArr.push(...user.data().savedJobs)
            });
        })
        onSnapshot(collection(db, 'jobs'), (totalJobs) => {
            let arr = [];
            totalJobs.forEach((item) => {
                tempArr.forEach(job => {
                    if (item.id === job) {
                        arr.push({...item.data(), id: item.id});
                    }
                });
            })
            setData(arr);
        })
    }, [tempArr])

    const calculateTime = (time) => {
        const givenTime = new Date(time);
        const currTime = new Date(Date.now())
        const diffDays = parseInt((currTime - givenTime) / (1000 * 60 * 60 * 24), 10);
        return diffDays;
    }
    const handleApply = (jobId) => {
        // add job id in users collection
        updateDoc(doc(db, 'users', currUserId), {
            appliedJobs: arrayUnion(jobId)
        }).then((res) => {
            alert("Applied successfully")
        }).catch((err) => {
            console.log(err);
        })
        // add user id in jobs collection
        updateDoc(doc(db, 'jobs', jobId), {
            applicants: arrayUnion(currUserId)
        }).then((res) => {
            console.log("applicant added to current job");
        }).catch((err) => {
            console.log(err);
        })
    }
    const handleRemoveJobs = (jobId) => {
        updateDoc(doc(db, 'users', currUserId), {
            savedJobs: arrayRemove(jobId)
        }).then((res) => {
            console.log("job removed from saved job array");
            alert("Job removed from saved jobs")
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
       <>
       <NavbarJobList></NavbarJobList>
        <div className="saved-job-parent-container">
            <h1>Saved job</h1>
            {/* ************************New card UI ********************************************/}
            <div className='saved-job-container row text-center'>
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
                                            <button className='btn btn-success d-flex' onClick={() => handleApply(item.id)}>Apply</button>
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
export default SavedJobs