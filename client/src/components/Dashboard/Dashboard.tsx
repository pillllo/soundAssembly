import React, { useEffect, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import { Outlet } from 'react-router';

import ArtistList from "../ArtistList/ArtistList";
import ArtistPage from "../ArtistPage/ArtistPage";
import Logout from '../Logout/Logout';
import SideBar from '../SideBar/SideBar';
import { getLibrary } from '../../ApiService';
import UseAuth from '../UseAuth/UseAuth';

import UserData from '../../@types/UserData';
import Artist from '../../@types/Artist';
import Tag from '../../@types/Tag';

type DashboardProps = {
  code: string;
}

function Dashboard ({ code }: DashboardProps) {
  // const accessToken = UseAuth(props.code)

  const [artistList, setArtistList] = useState<Artist[] | null>([]);
  const [tags, setTags] = useState<Tag[] | undefined>([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // if account has existing library
    getLibrary()
      .then((response: [UserData]) => {
        if (response.length > 0) {
          const userData: UserData = response[0];
          setArtistList(userData.artists);
          setUsername(userData.username);
          if (userData.tags) {
            userData.tags.forEach((tag: Tag) => tag.status = "inactive");
            setTags(userData.tags);
          }
        }
      })
      .catch((err) => {
        // TODO: add
        console.log(err);
      })
  }, [setArtistList, setUsername, setTags]);

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
          <Route
            path="/"
            element={
              <ArtistList
                artistList={artistList}
                tags={tags}
              />
            }
          />
          <Route
            path="/artist/:artistId"
            element={
              <ArtistPage
                tags={tags}
                setTags={setTags}
                artistList={artistList}
                setArtistList={setArtistList}
              />
            }
          />
        </Routes>
        <Outlet></Outlet>
      </div>
    </div>
  );
}

export default Dashboard;