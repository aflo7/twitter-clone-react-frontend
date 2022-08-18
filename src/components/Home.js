import React, { useState, useEffect } from "react"
import "../styles/home.css"
import axios from "axios"

const newsapikey = process.env.REACT_APP_NEWS_KEY

var url =
  "https://newsapi.org/v2/everything?" +
  "q=World&" +
  "from=2022-08-17&" +
  "sortBy=popularity&" +
  "pageSize=15&" +
  "apiKey=" +
  newsapikey
  
// this component loads when there is an active user
function Home({ user, logout, followUser, followUsers, tweets, newtweet }) {
  const [news, setNews] = useState()
  const [tweetInMiddle, setTweetInMiddle] = useState("")

  function getNews() {
    axios
      .get(url)
      .then(function (response) {
        // console.log(response.data.articles)
        setNews(response.data.articles)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function refreshPage() {
    window.location.reload()
  }

  useEffect(() => {
    getNews()
  }, [])

  return (
    <div className="homewrapper">
      <div className="content">
        <div className="left-sidebar">
          <div className="topleftsidebar">
            <div className="home-left-button">
              Home
            </div>
            <div className="notifications-left-button">Notifications</div>
          </div>

          <div className="bottomleftsidebar">
            <div className="profilewrapper">
              <div className="leftprofileinner">
                <div className="profileimg"></div>
                <div className="profileusername">
                  {user ? user.username : null}
                </div>
              </div>

              <div className="profilelogout" onClick={logout}>
                Logout
              </div>
            </div>
          </div>
        </div>
        <div className="middle-section">
          <div className="newtweetwrapper">
            <div className="newtweettitle">Tweet</div>
            <input
              onChange={(e) => setTweetInMiddle(e.target.value)}
              className="newtweettextfield"
              placeholder="whats happening?"
            />
            <button
              className="newtweetbtn"
              onClick={() => newtweet(tweetInMiddle, user.username, user._id)}
            >
              Tweet
            </button>
          </div>

          <div className="alltweetwrapper">
            <div className="alltweettitle">All tweets</div>

            <div>
              {tweets
                ? tweets.map((element, i) => {
                    return (
                      <div className="individualtweetwrapper" key={i}>
                        <div className="individualtweettext">
                          {element.text}
                        </div>
                        <div className="individualtweetauthor">
                          ---{element.author}
                        </div>
                        <div className="individualtweetlikes">
                          Likes: {element.likes}
                        </div>
                      </div>
                    )
                  })
                : null}
            </div>
          </div>
        </div>

        <div className="right-sidebar">
          <div className="news-wrapper">
            {news
              ? news.map((article, index) => {
                  return (
                    <div key={index} className="article-wrapper">
                      <div className="article-title">{article.title}</div>
                      <div className="article-text">{article.description}</div>
                    </div>
                  )
                })
              : null}
          </div>

          <div className="friends-who-to-follow-wrapper">
            <div className="followingwrapper">
              <div className="followingtitle">Following</div>
              <div className="usersyouarefollowing">
                {user
                  ? user.following.map((name, i) => {
                      return <div key={i}>{name}</div>
                    })
                  : null}
              </div>
            </div>

            <div className="whotofollowwrapper">
              <div className="whotofollowtitle">Who to Follow</div>
              <div className="userstofollow">
                {followUsers
                  ? followUsers.map((fuser, i) => {
                      return (
                        <div key={i} className="followuserindividualwrapper">
                          <div>{fuser.username}</div>
                          <button
                            className="followuserplussign"
                            onClick={() => followUser(user._id, fuser.username)}
                          >
                            +
                          </button>
                        </div>
                      )
                    })
                  : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
