
import "./App.css"
import { useState } from "react"
import Home from "./components/Home"
import Guest from "./components/Guest"
import axios from "axios"

const prefix = process.env.REACT_APP_PREFIX

function App() {
  const [token, setToken] = useState(null)
  const [currentUserInfo, setCurrentUserInfo] = useState()
  const [followUsers, setFollowUsers] = useState([])
  const [tweets, setTweets] = useState([])

  function newtweet(tweet, user, id) {
    if (!tweet || !user || !id) {
      return
    }

    var obj = {
      tweet: tweet,
      user: user,
      id: id
    }

    axios.post(`${prefix}api/tweet`, obj)
    .then(function (response) {
      getTweets(id)
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  // get an array of users you aren't following
  function whoToFollow(id) {
    axios
      .get(`${prefix}api/users/whotofollow/` + id)
      .then(function (response) {
        setFollowUsers(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  // get an array of tweets from users you follow, and yourself
  function getTweets(id) {
    if (!id) {
      return false
    }
    axios
      .get(`${prefix}api/tweet/selected/` + id)
      .then(function (response) {
        setTweets(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function followUser(id, userToFollow) {
    axios
      .post(`${prefix}api/follow`, {
        currentUserId: id,
        userToFollow: userToFollow
      })
      .then(function (response) {
        setCurrentUserInfo(response.data)
        whoToFollow(id)
        getTweets(id)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function login(username, password) {
    if (!username || !password) {
      return
    }
    var url = process.env.PREFIX
    console.log(url)
    axios
      .post(`${prefix}api/login`, {
        username: username,
        password: password
      })
      .then(function (response) {
        const userInfo = response.data.user[0]
        setCurrentUserInfo(userInfo)
        localStorage.setItem("token", response.data.token)
        setToken(response.data.token)
        // whoToFollow(userInfo._id)
        whoToFollow(userInfo._id)
        getTweets(userInfo._id)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function logout() {
    localStorage.clear()
    setToken(null)
  }

  return (
    <div className="App">
      {token ? (
        <Home
          user={currentUserInfo}
          logout={logout}
          followUser={followUser}
          followUsers={followUsers}
          tweets={tweets}
          newtweet={newtweet}
        />
      ) : (
        <Guest login={login} />
      )}
    </div>
  )
}

export default App
