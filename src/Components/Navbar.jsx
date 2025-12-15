import React from 'react'
import './navBar.css'

const Navbar = () => {
  return (
    <>
    <nav>
        <div className='nav-left'>
        <i className="fa-solid fa-arrow-left fa-2xl"></i>
            <img src="https://resumeworded.com/linkedin-review/img/lir-testimonial.jpeg" alt="" />
            <h2>UserName</h2>
        </div>
        <div >
        <ul className='nav-right'>
            <li><i className="fa-solid fa-phone  fa-xl"></i></li>
            <li><i className="fa-solid fa-video  fa-xl"></i></li>
            <li><i className="fa-solid fa-ellipsis-vertical  fa-xl"></i></li>
        </ul>
        </div>
    </nav>
    </>
  )
}

export default Navbar