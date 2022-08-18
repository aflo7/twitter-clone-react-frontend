import React from "react"
import "../styles/guest.css"
import { useState, useEffect } from "react"
import "../styles/login-modal.css"
import "../styles/signup-modal.css"
import axios from "axios"

function Guest({ login }) {
  const [loginUsername, setLoginUsername] = useState(null)
  const [loginPassword, setLoginPassword] = useState(null)
  const [signuppassword, setsignuppassword] = useState("")
  const [signupusername, setsignupusername] = useState("")

  function showLogin() {
    document.getElementById("loginwrapper").style.display = "block"
  }

  function hideLogin() {
    document.getElementById("loginwrapper").style.display = "none"
  }

  function showSignup() {
    document.getElementById("signupwrapper").style.display = "block"
  }

  function hideSignup() {
    document.getElementById("signupwrapper").style.display = "none"
  }

  function signup(username, password) {

    if (!username || !password) {
      console.log('no null values!')
      return
    }
    axios
      .post(`${process.env.REACT_APP_PREFIX}api/signup`, {
        username: username,
        password: password
      })
      .then(function (response) {
        console.log(response)
        hideSignup()
        setsignuppassword('')
        setsignupusername('')
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  useEffect(() => {
    var loginmodal = document.getElementById("loginwrapper")
    var signupmodal = document.getElementById("signupwrapper")

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
      if (event.target === signupmodal) {
        signupmodal.style.display = "none"
      } else if (event.target === loginmodal) {
        loginmodal.style.display = "none"
      }
    }
  }, [])

  return (
    <div>
      <div className="guest-wrapper">
        <div className="left-side">See what's happening now</div>
        <div className="right-side">
          <div className="guest-button-wrapper">
            <div id="loginwrapper" className="modal">
              <div className="modal-content animate">
                <div className="container">
                  <label htmlFor="uname">
                    <b>Username</b>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />

                  <label htmlFor="psw">
                    <b>Password</b>
                  </label>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => {
                      setLoginPassword(e.target.value)
                    }}
                  />
                  <div className="clearfix">
                    <button
                      type="button"
                      onClick={hideLogin}
                      className="cancelbtn"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => login(loginUsername, loginPassword)}
                      className="loginbtn"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div id="signupwrapper" className="modal2">
              <div className="modal-content animate">
                <div className="container">
                  <label htmlFor="username">
                    <b>Username</b>
                  </label>
                  <input
                    type="text"
                    value={signupusername}
                    placeholder="Enter Username"
                    onChange={(e) => setsignupusername(e.target.value)}
                  />

                  <label htmlFor="psw">
                    <b>Password</b>
                  </label>
                  <input
                    value={signuppassword}
                    type="text"
                    placeholder="Enter Password"
                    onChange={(e) => setsignuppassword(e.target.value)}
                  />

                  <div className="clearfix">
                    <button
                      type="button"
                      onClick={hideSignup}
                      className="cancelbtn"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="signupbtn" onClick={()=> signup(signupusername, signuppassword)}>
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={showLogin}>Login</button>
            <button onClick={showSignup}>Signup</button>
          </div>
        </div>
      </div>

      <footer>made by andres</footer>
    </div>
  )
}

export default Guest
