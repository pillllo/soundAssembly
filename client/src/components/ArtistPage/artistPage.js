import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getAlbums, getArtist } from '../../ApiService';
import AlbumList from './albumList';
import ArtistDetails from './artistDetails';
import ArtistTagList from './artistTagList'

function ArtistPage(props) {

  const [albumList, setAlbumlist] = useState([]);
  const [artistInfo, setArtistInfo] = useState([]);
  const [artistTags, setArtistTags] = useState([]);


  const {artistId} = useParams();

  useEffect(() => {
    getAlbums(artistId).then(albums => {
      setAlbumlist([...albums.items])
    });
    getArtist(artistId).then(artist => {
      setArtistInfo(artist)
      setArtistTags(artist.artistTags)
    })
  },[artistId])

  return (
    <div className="artistPage">
      <div>
        <ArtistDetails artistInfo={artistInfo} />
        <ArtistTagList
          artistTags={artistTags}
          artistInfo={artistInfo}
          tags={props.tags}
          setArtistTags={setArtistTags}
          setArtistInfo={setArtistInfo}
        />
      </div>
      <AlbumList albumList={albumList}></AlbumList>
    </div>
  );
}

export default ArtistPage;