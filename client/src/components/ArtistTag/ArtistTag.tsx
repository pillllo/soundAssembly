import { Dispatch, SetStateAction } from "react";
import { Artist } from "../../@types/Artist";
import Tag from "../../@types/Tag";
import { untagArtist } from "../../ApiService";

type ArtistTagProps = {
  tag: Tag;
  artistTags: Tag[];
  setArtistTags: Dispatch<SetStateAction<Tag[]>>;
  artistInfo: Artist;
  setArtistInfo: Dispatch<SetStateAction<Artist | null>>;
  artistList: Artist[];
  setArtistList: Dispatch<SetStateAction<Artist[]>>;
};

function ArtistTag({
  tag,
  artistTags,
  setArtistTags,
  artistInfo,
  setArtistInfo,
  artistList,
  setArtistList,
}: ArtistTagProps) {
  function removeTag() {
    // Remove tag from artist in DB
    untagArtist(artistInfo.id, tag.name);

    // Remove tag from list of artistTags
    const artistTagsCopy = JSON.parse(JSON.stringify(artistTags));
    const newArtistTags = artistTagsCopy.filter(
      (oldTag: Tag) => oldTag.name !== tag.name
    );
    // const newArtistTags = artistTags
    //   .map(tag => {return {...tag}})
    //   .filter(tag => tag.name !== tag.name);
    setArtistTags(newArtistTags);


    // Remove tag from artistInfo
    const artistInfoCopy = JSON.parse(JSON.stringify(artistInfo));
    artistInfoCopy.tags = newArtistTags;
    setArtistInfo(artistInfoCopy);

    const artistListCopy = JSON.parse(JSON.stringify(artistList));
    const index = artistListCopy.findIndex(
      (artist: { id: string }) => artist.id === artistInfoCopy.id
    );
    artistListCopy[index] = artistInfoCopy;
    setArtistList(artistListCopy);
  }

  return (
    <div className="artistTag">
      {tag.name}
      <i onClick={removeTag} className="fa fa-times" aria-hidden="true" />
    </div>
  );
}

export default ArtistTag;
