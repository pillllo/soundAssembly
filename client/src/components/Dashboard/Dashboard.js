import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router';

import UseAuth from '../UseAuth/UseAuth';
import SideBar from '../SideBar/SideBar';
import Logout from '../Logout/Logout';
import ArtistList from "../ArtistList/ArtistList";
import ArtistPage from "../ArtistPage/ArtistPage";
import { getLibrary } from '../../ApiService';

function Dashboard(props) {
  // const accessToken = UseAuth(props.code)

  const [artistList, setArtistList] = useState([]);
  const [tags, setTags] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // if account has existing library
    getLibrary().then(account => {
      if (account.length > 0) {
        setArtistList(account[0].artists);
        setUsername(account[0].username);
        account[0].tags.forEach(tag => tag.status = "inactive");
        if (account[0]) {
          setTags(account[0].tags);
        }
      }
    })
  },[setArtistList, setUsername, setTags])

  return (
    <div className="dashboard">
      <div>
        <SideBar
          setTags={setTags}
          tags={tags}
        >
        </SideBar>
      </div>
      <div>
        <Logout
          setArtistList={setArtistList}
          setTags={setTags}
          setUsername={setUsername}
          username={username}
          tags={tags}
        />
        <Routes>
          <Route path="/" exact element={<ArtistList
          artistList={artistList}
          tags={tags}
          />} />
          <Route path="/artist/:artistId" exact element={<ArtistPage
            tags={tags}
            setTags={setTags}
            artistList={artistList}
            setArtistList={setArtistList}
            />}
          />
        </Routes>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashboard;