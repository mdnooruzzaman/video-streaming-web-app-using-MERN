import React from 'react'
import  "./newuser.scss";

const NewUser = () => {
    return (
        <div className='newUser'>
            <h1 className="newUserTitle">New User</h1>
            <form  className="newUserForm">
                <div className="newUserItem">
                    <label>Username</label>
                    <input type="text" placeholder='Username' className="newUserInput" />
                </div>
                
                <div className="newUserItem">
                    <label>Email</label>
                    <input type="email" placeholder='noor@gmail.com' className="newUserInput" />
                </div>
                <div className="newUserItem">
                    <label>Password</label>
                    <input type="password" className="newUserInput" />
                </div>
                
                <button className="newUserButton">
                    Create
                </button>
            </form>
        </div>
    )
}

export default NewUser
