import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import AlbumList from '../AlbumList/AlbumList';
import ArtistDetails from '../ArtistDetails/ArtistDetails';
import ArtistTagList from '../ArtistTagList/ArtistTagList'
import { getAlbums, getArtist } from '../../ApiService';

function ArtistPage(props) {

  const [albumList, setAlbumList] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);
  const [artistTags, setArtistTags] = useState([]);

  const {artistId} = useParams();

  useEffect(() => {
    getAlbums(artistId).then(albums => {
      setAlbumList([...albums.items])
    });
    getArtist(artistId).then(artist => {
      setArtistInfo(artist)
      setArtistTags(artist.artistTags)
    })
  },[artistId])

  return (
    <div className="artistPage">
      <div className="artistInfo-container">
        <ArtistDetails artistInfo={artistInfo} />
        <ArtistTagList
          artistTags={artistTags}
          setArtistTags={setArtistTags}
          artistInfo={artistInfo}
          setArtistInfo={setArtistInfo}
          tags={props.tags}
          setTags={props.setTags}
          artistList={props.artistList}
          setArtistList={props.setArtistList}
        />
      </div>
      <AlbumList albumList={albumList}></AlbumList>
    </div>
  );
}

export default ArtistPage;