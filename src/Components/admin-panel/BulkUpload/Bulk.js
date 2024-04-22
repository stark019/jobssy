import { useState } from 'react'
import { Data } from './Data';
import * as XLSX from 'xlsx'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import Navbar from '../adminComponents/navbar/Navbar';
import Sidebar from '../adminComponents/sidebar/Sidebar';
import './bulk.css'

function Bulk() {

  // on change states
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);

  // submit
  const [excelData, setExcelData] = useState(null);
  // it will contain array of objects

  // handle File
  const fileType = ['application/vnd.ms-excel'];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      // console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
        }
      }
      else {
        setExcelFileError('Please select only excel file types');
        setExcelFile(null);
      }
    }
    else {
      console.log('plz select your file');
    }
  }

  // submit function
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
    else {
      setExcelData(null);
    }
  }

  const addJobs = () => {
    console.log(excelData)
    excelData.forEach(async (item) => {
      const res = await addDoc(collection(db, "jobs"), {
        title: item.title,
        company: item.company,
        ctc: item.ctc,
        exp: item.exp,
        desc: item.desc,
        location: item.location,
        postedOn: Date.now()
      });
    });
  }

  return (
    <>
      <div className='bulkuploadHome'>
        <Navbar></Navbar>
        <div className='bulkuploadcontainer'>
          <Sidebar></Sidebar>
          <div className="container  bulkuploadbox">
            {/* upload file section */}
            <div className='form'>
              <form className='form-group' autoComplete="off"
                onSubmit={handleSubmit}>
                <label><h5>Upload Excel file</h5></label>
                <br></br>
                <input type='file' className='form-control'
                  onChange={handleFile} required></input>
                {excelFileError && <div className='text-danger'
                  style={{ marginTop: 5 + 'px' }}>{excelFileError}</div>}
                <button type='submit' className='btn btn-success adminButtons'
                  style={{ marginTop: 5 + 'px' }}>Submit</button>
              </form>
            </div>

            <br></br>
            <hr></hr>

            {/* view file section */}
            <h5>Preview</h5>
            <div className='viewer'>
              {excelData === null && <>No file selected</>}
              {excelData !== null && (
                <div className='table-responsive'>
                  <table className='table'>
                    <thead>
                      <tr>
                        <th scope='col'>Company</th>
                        <th scope='col'>CTC</th>
                        <th scope='col'>Experience</th>
                        <th scope='col'>Location</th>
                        <th scope='col'>Title</th>
                        <th scope='col'>Description</th>

                      </tr>
                    </thead>
                    <tbody>
                      <Data excelData={excelData} />
                    </tbody>
                  </table>
                  <button className='btn btn-success adminButtons' onClick={addJobs}>Add Job</button>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </>
  );
}

export default Bulk;