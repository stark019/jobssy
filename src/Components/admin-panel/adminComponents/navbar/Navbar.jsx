import './navbar.scss'

const Navbar = () => {
  return (
    <div className='adminnNavbar'>
      <div className="wrapper">
        <div >
          {/* <input type="text" placeholder="Search.."/>
          <i className="fa fa-solid fa-magnifying-glass icon"></i> */}
        </div>
        <div className="items">
          {/* <div className="item">
          <i className="fa fa-duotone fa-language icon"></i>
            English
          </div> */}
          <div className="item">
          <i className="fa fa-regular fa-moon icon"></i>
          </div>
          {/* <div className="item">
          <i className="fa fa-solid fa-bell icon"></i>
            <div className="counter">1</div>
          </div>
          <div className="item">
          <i className="fa fa-sharp fa-solid fa-comment icon"></i>
            <div className="counter">2</div>
          </div>
          <div className="item">
          <i className="fa fa-solid fa-list icon"></i>
          </div> */}
          {/* <div className="item">
          <i className="fa fa-solid fa-list icon"></i>
          </div> */}
          <div className="item">
           <img
           src='https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8='
           alt=''
           className='avatar'
           />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar