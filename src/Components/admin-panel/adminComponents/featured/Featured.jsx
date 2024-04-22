import './featured.scss'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import yearlyData from './pastData';

const Featured = () => {
  return (
    <div className='featured'>
      {
        yearlyData.map((elem) => {
          const { id, target, lastEightMonthsHires, ios, react, uiux, swift } = elem;
          return (
            <>
              <div className="top">
                <h1 className="title">Total Hires From India(Target-{target})</h1>
                <i className="fa fa-solid fa-ellipsis-vertical icon" fontSize="small"></i>
              </div>
              <div className="bottom">
                <div className="featuredChart">
                  <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
                </div>
                <p className="title">Total candidates hired in last 8 months</p>
                <p className="amount">{lastEightMonthsHires}</p>
                <p className="desc">IOS Developers-{ios}, UI/UX Designers-{uiux}, React Developers-{react},Swift Developers-{swift} </p>

              </div>
            </>
          )
        })
      }

    </div>
  )
}

export default Featured