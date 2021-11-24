import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import AlbumList from '../AlbumList/AlbumList';
import ArtistDetails from '../ArtistDetails/ArtistDetails';
import ArtistTagList from '../ArtistTagList/ArtistTagList'
import { getAlbums, getArtist } from '../../ApiService';
import Tag from '../../@types/Tag';
import { Artist } from '../../@types/Artist';
import Album from '../../@types/Album';

type ArtistPageProps = {
  tags: Tag[],
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>,
  artistList: Artist[],
  setArtistList: React.Dispatch<React.SetStateAction<Artist[]>>,
}

function ArtistPage({tags, setTags, artistList, setArtistList}: ArtistPageProps) {

  const [albumList, setAlbumList] = useState<Album[]>([]);
  const [artistInfo, setArtistInfo] = useState<Artist>(undefined);
  const [artistTags, setArtistTags] = useState<Tag[]>([]);

  const {artistId} = useParams();

  useEffect(() => {
    getAlbums(artistId).then(albums => {
      console.log(albums)
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
          tags={tags}
          setTags={setTags}
          artistList={artistList}
          setArtistList={setArtistList}
        />
      </div>
      <AlbumList albumList={albumList}></AlbumList>
    </div>
  );
}

export default ArtistPage;