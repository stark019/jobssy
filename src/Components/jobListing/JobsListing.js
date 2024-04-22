import './JobsListing.css';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { db } from '../../firebase/config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NavbarJobList from './navbarJobList/NavbarJobList';
import Navbar from '../common/navbar/Navbar';


const JobsListing = () => {
    const [jobs, setJobs] = useState([]);
    const [data, setData] = useState([]);
    const { currUserId } = useSelector((state) => state.users.value); // use this to get the current user's id

    useEffect(() => {
        onSnapshot(collection(db, 'jobs'), (querySnapshot) => {
            let tempArr = [];
            querySnapshot.forEach((item) => {
                tempArr.push({ ...item.data(), id: item.id })
            });
            setJobs(tempArr);
            setData(tempArr);
        })

    }, [])

    //used for setting the filters
    const [experience, setExperience] = useState(0);
    const [salaryRadio, setSalaryRadio] = useState("all");
    const [location, setLocation] = useState("all");

    //utility functions
    const calculateTime = (time) => {
        const givenTime = new Date(time);
        const currTime = new Date(Date.now())
        const diffDays = parseInt((currTime - givenTime) / (1000 * 60 * 60 * 24), 10);
        return diffDays;
    }

    //Filtering functions
    const handleExperience = (e) => {
        setSalaryRadio("all"); // setting initial value for radio btn i.e., all
        setLocation("all"); // setting initial value of location i.e., all

        setExperience(e.target.value);
        const filteredJob = data.filter((item) => parseInt(item.exp, 10) >= e.target.value);
        console.log(filteredJob);
        setJobs(filteredJob);
    }
    const handleLocation = (e, key) => {
        setSalaryRadio("all"); // setting initial value for radio btn i.e., all
        setExperience(0);  // setting initial value for experience to 10

        if (key === 'remote') {
            const filteredJob = data.filter((item) => item.location === 'Remote')
            console.log(filteredJob);
            setJobs(filteredJob);
        } else if (key === 'office') {
            const filteredJob = data.filter((item) => item.location !== 'Remote')
            console.log(filteredJob);
            setJobs(filteredJob);
        } else if (key === 'all') {
            setJobs(data);
        }
    }
    const handleCheckBox = (e, key) => {
        setExperience(0);  // setting initial value for experience
        setLocation("all"); // setting initial value of location i.e., all

        if (e.target.checked) {
            if (key === "0to3") {
                const filterJob = data.filter((item) => item.ctc <= 3)
                setJobs(filterJob);
                setSalaryRadio(key);
            }
            if (key === "3to5") {
                //item.ctc === 0 --> not disclosed, between 3 and 5
                const filterJob = data.filter((item) => (item.ctc >= 3 && item.ctc <= 5) || item.ctc == 0)
                setJobs(filterJob);
                setSalaryRadio(key);
            }
            if (key === "5to10") {
                //item.ctc === 0 --> not disclosed, between 5 and 10
                const filterJob = data.filter((item) => (item.ctc >= 5 && item.ctc <= 10) || item.ctc == 0)
                setJobs(filterJob);
                setSalaryRadio(key);
            }
            if (key === "10to15") {
                //item.ctc === 0 --> not disclosed, between 10 and 15
                const filterJob = data.filter((item) => (item.ctc >= 10 && item.ctc <= 15) || item.ctc == 0)
                setJobs(filterJob);
                setSalaryRadio(key);
            }
            if (key === "15plus") {
                //item.ctc === 0 --> not disclosed
                const filterJob = data.filter((item) => item.ctc >= 15 || item.ctc == 0)
                setJobs(filterJob);
                setSalaryRadio(key);
            }
            if (key === 'all') {
                setJobs(data);
                setSalaryRadio(key);
            }
        } else {
            setJobs(jobs);
        }
    }

    const handleApply = (jobId) => {
        // add job id in users collection
        updateDoc(doc(db, 'users', currUserId), {
            appliedJobs: arrayUnion(jobId)
        }).then((res) => {
            console.log("job added to current user");
            alert("Applied job successfully")
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
    const handleSaveJobs = (jobId) => {
        console.log("save to be implemented");
        updateDoc(doc(db, 'users', currUserId), {
            savedJobs: arrayUnion(jobId)
        }).then((res) => {
            console.log("job added to saved job array");
            alert("Saved for later")
        }).catch((err) => {
            console.log(err);

        })
    }



    return (
        <div className='container'>
            <NavbarJobList></NavbarJobList>
            <div className='parent-container row'>

                <div className="filter-container col-4">
                    <h4>Filter</h4>
                    <div>
                        <h6>Location</h6>
                        <button className='filter-btn btn btn-primary' onClick={(e) => handleLocation(e, "all")}>All</button>
                        <button className='filter-btn btn btn-primary' onClick={(e) => handleLocation(e, "remote")}>Remote</button>
                        <button className='filter-btn btn btn-primary' onClick={(e) => handleLocation(e, "office")}>Office</button>
                    </div>


                    <div>
                        <h6>Experience</h6>
                        <input className='slider' type="range" min="0" max="10" value={experience} onChange={(e) => handleExperience(e)} />
                        <p>Yrs: <span id="demo">{experience}+ </span></p>
                    </div>
                    <div className='salary-div'>
                        <h6>Salary</h6>
                        <ul>
                            <li>
                                <input type='radio' name='salary' checked={salaryRadio === 'all'} value="all" onChange={(e) => handleCheckBox(e, "all")} /> <span>All</span>
                            </li>
                            <li>
                                <input type='radio' name='salary' checked={salaryRadio === '0to3'} value="0to3" onChange={(e) => handleCheckBox(e, "0to3")} /> <span>0 to 3 LPA</span>
                            </li>
                            <li>
                                <input type='radio' name='salary' checked={salaryRadio === '3to5'} value="3to5" onChange={(e) => handleCheckBox(e, "3to5")} /> 3 to 5 LPA
                            </li>
                            <li>
                                <input type='radio' name='salary' checked={salaryRadio === '5to10'} value="5to10" onChange={(e) => handleCheckBox(e, "5to10")} /> 5 to 10 LPA
                            </li>
                            <li>
                                <input type='radio' name='salary' checked={salaryRadio === '10to15'} value="10to15" onChange={(e) => handleCheckBox(e, "10to15")} /> 10 to 15 LPA
                            </li>
                            <li>
                                <input type='radio' name='salary' checked={salaryRadio === '15plus'} value="15+" onChange={(e) => handleCheckBox(e, "15plus")} /> 15+ LPA
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='joblisting col-8'>
                    {/* ****************************** NEW CARD UI ******************************* */}
                    <div className='user-job-list row text-center'>
                        {
                            jobs.map((item) => (
                                < div className="col-md-12"  >
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
                                                    <button onClick={() => handleApply(item.id)} className='btn btn-success apply-btn'>Apply</button>
                                                    <button className='btn btn-success apply-btn' onClick={() => handleSaveJobs(item.id)}>Save for later</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))

                        }
                    </div>
                    {/* ****************************** NEW CARD UI ******************************* */}
                </div>
            </div>

        </div>

    )
}
export default JobsListing;