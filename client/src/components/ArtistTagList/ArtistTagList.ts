import { useState, SetStateAction, Dispatch, KeyboardEvent } from 'react';
import { createTag } from '../../ApiService';
import { tagArtist } from '../../ApiService';
import { Artist } from '../../@types/Artist';
import Tag from '../../@types/Tag';
import ArtistTag from '../ArtistTag/ArtistTag';

type ArtistTagListProps = {
  artistTags: Tag[],
  setArtistTags: Dispatch<SetStateAction<Tag[]>>,
  artistInfo: Artist,
  setArtistInfo: Dispatch<SetStateAction<Artist | null>>,
  tags: Tag[],
  setTags: Dispatch<SetStateAction<Tag[]>>,
  artistList: Artist[],
  setArtistList: Dispatch<SetStateAction<Artist[]>>
}

function ArtistTagList({artistTags, setArtistTags, artistInfo, setArtistInfo, tags, setTags, artistList, setArtistList}: ArtistTagListProps) {

  const [inputState, setInputClass] = useState("");
  const [buttonState, setButtonClass] = useState("full");

  function renderTags(tags: Tag[]) {
    if (tags && tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <ArtistTag
            tag={tag}
            key={tag.name}
            artistTags={artistTags}
            artistInfo={artistInfo}
            setArtistInfo={setArtistInfo}
            setArtistTags={setArtistTags}
            artistList={artistList}
            setArtistList={setArtistList}
            />
      })
    }
    else {
      return "";
    }
  }

  function renderOptions(tags: Tag[]) {
    if (tags && tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <option value={tag.name} key={tag.name}></option>
      })
    }
    else {
      return "";
    }
  }

  function submitTag(event: KeyboardEvent<HTMLInputElement>) {
    // if (event.keyCode === 13) {
    if (event.key === "Enter") {
      const input = (event.target as HTMLTextAreaElement).value;
      // Prevent tagging artist twice with same tag
      if (artistTags.some(tag => tag.name === input.toLowerCase())) {
        alert("The tag already exists on profile")
      }
      else {
        const newArtistTags = [...artistInfo.tags, {name: input}];
        // Update DB and update artist tag list
        tagArtist(artistInfo.id, input);
        setArtistTags(newArtistTags);
        const artistInfoCopy = JSON.parse(JSON.stringify(artistInfo))
        artistInfoCopy.artistTags = newArtistTags;
        setArtistInfo(artistInfoCopy);
        // setting ArtistList need to recheck - should not be necessary
        const artistListCopy = JSON.parse(JSON.stringify(artistList));
        const index = artistListCopy.findIndex((artist: { id: string }) => artist.id === artistInfoCopy.id)
        artistListCopy[index] = artistInfoCopy;
        setArtistList(artistListCopy);
        // Clear input
        (event.target as HTMLTextAreaElement).value = "";
        // Create new tag 'global' tag if it doesn't exist
        if (tags.every(tag => tag.name !== input.toLowerCase())) {
          const newList = [...tags, {name: input, status: 'inactive'}]
          setTags(newList);
          createTag(input);
        }
      }
    }
  }

  function toggleExpand() {
    if (inputState === "") {
      setInputClass("expanded");
      setButtonClass("sliced");
    }
    else {
      setInputClass("")
      setButtonClass("full");
    }
  }

  return (
    <div className="artistTagList">
      <div className="tag-header">Current tags:</div>
      <div className="tag-container">
        {renderTags(artistTags)}
      </div>
      <div className="tag-input">
        <button className={buttonState} onClick={toggleExpand}>Tag Artist</button>
        <input className={inputState} list="avail-tags" placeholder="...add tag" onKeyUp={submitTag} />
        <datalist id="avail-tags">
          {renderOptions(tags)}
        </datalist>
      </div>
    </div>
  );
}

export default ArtistTagList;