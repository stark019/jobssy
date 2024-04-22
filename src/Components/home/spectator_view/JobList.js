import React, { useState } from 'react';
import "./joblist.css";
import jobListData from "./jobListData";

const JobList = () => {
  const [items, setItems] = useState(jobListData)
  const [query, setQuery] = useState("");

  const filterItem = (categItem) => {
    const updatedItems = jobListData.filter((curElem) => {
      return curElem.category === categItem;
    });
    setItems(updatedItems);

  }


  return (
    <>
      <hr />
      <h1 className='mt-5 text-center '>View Recent Job Postings</h1>
      <hr />

      <div className='menu-tabs container mt-2'>

        <div className='menu-tab d-flex justify-content-around'>

          <button className='btn btn-warning w-20 button-73' onClick={() => filterItem('WebDev')}>Web Dev</button>
          <button className='btn btn-warning w-20 button-73' onClick={() => filterItem('SDE')}>SDE</button>
          <button className='btn btn-warning w-10 button-73' onClick={() => filterItem('testing')}>Testing</button>
          <button className='btn btn-warning w-10 button-73' onClick={() => filterItem('ios')}>IOS</button>


        </div>

      </div>

      <div className='jobDescContainer row text-center'>
        {
          items.map((elem) => {
            const { id, image, role, company, location, experience } = elem;
            return (
              < div className="col-10 col-md-4 mt-5" >
                <div className="card p-2">
                  <div className="d-flex align-items-center">
                    <div className="image"> <img src="" className="rounded" /></div>
                    <div className="ml-3 w-100"  >
                      <h4 className="mb-0 mt-0 textLeft">{role}</h4>
                      <span className="text-left">{company}</span>
                      <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                        <div className="d-flex flex-column">
                          <span className="number3">Location</span> <span className="articles">{location}</span> </div>
                        <div className="d-flex flex-column">
                          <span className="number3">Experience</span> <span className="followers">{experience}</span> </div>
                        <div className="d-flex flex-column">
                        </div>
                        <button className='btn btn-success d-flex adminButtons' >View</button>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            )
          })
        }
      </div>

      {/* ---------------------------------------------------------JOB SEARCH */}


      <div className='jobSearch'>
        <hr />
        <div className='text-center'>
          <div className="search-box">
            <button className="btn-search"><i className="fa fas fa-search"></i></button>
            <input type="text" className="input-search" placeholder="Type to Search..." onChange={e => setQuery(e.target.value)} />
            <p> Search by location or company</p>
          </div>
        </div>
        {/* <div className='text-center'>
          <input type="text" placeholder='search...' onChange={e => setQuery(e.target.value)} />
          <p> Search by location or company</p>
        </div> */}
        <hr />

        <div className='jobDescContainer row text-center'>
          {
            items.filter(item => item.location.includes(query) || item.company.includes(query)).map((item) => {
              const { id, role, company, location, experience } = item;
              return (
                < div className="col-10 col-md-4 mt-5" key={id} >
                  <div className="card p-2">
                    <div className="d-flex align-items-center">
                      <div className="image"> <img src="" className="rounded" /></div>
                      <div className="ml-3 w-100" key={id} >
                        <h4 className="mb-0 mt-0 textLeft">{role}</h4>
                        <span className="text-left">{company}</span>
                        <div className="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                          <div className="d-flex flex-column">
                            <span className="number3">Location</span> <span className="articles">{location}</span> </div>
                          <div className="d-flex flex-column">
                            <span className="number3">Experience</span> <span className="followers">{experience}</span> </div>
                          <div className="d-flex flex-column">
                          </div>
                          <button className='btn btn-success d-flex adminButtons' >View</button>
                        </div>

                      </div>
                    </div>

                  </div>
                </div>
              )
            })
          }
        </div>
        <hr />
      </div>

    </>
  )
}

export default JobList