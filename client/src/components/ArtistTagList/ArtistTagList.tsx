import {
  useState,
  SetStateAction,
  Dispatch,
  KeyboardEvent,
  useEffect,
} from "react";
import { createTag } from "../../ApiService";
import { tagArtist } from "../../ApiService";
import { Artist } from "../../@types/Artist";
import Tag from "../../@types/Tag";
import ArtistTag from "../ArtistTag/ArtistTag";

type ArtistTagListProps = {
  artistTags: Tag[];
  setArtistTags: Dispatch<SetStateAction<Tag[]>>;
  artistInfo: Artist;
  setArtistInfo: Dispatch<SetStateAction<Artist | null>>;
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  artistList: Artist[];
  setArtistList: Dispatch<SetStateAction<Artist[]>>;
};

function ArtistTagList({
  artistTags,
  setArtistTags,
  artistInfo,
  setArtistInfo,
  tags,
  setTags,
  artistList,
  setArtistList,
}: ArtistTagListProps) {
  const [inputClass, setInputClass] = useState("");
  const [buttonClass, setButtonClass] = useState("full");
  const [sortedTags, setSortedTags] = useState<Tag[]>([]);

  useEffect(() => {
    const sortedArtistTags = sortTags(artistTags);
    setSortedTags(sortedArtistTags);
  }, [artistTags]);

  function sortTags(tags: Tag[]) {
    const sortedTags = [...tags];
    return sortedTags.sort(function (a, b) {
      return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
    });
  }

  function submitTag(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      const input = (event.target as HTMLTextAreaElement).value;
      // Prevent tagging artist twice with same tag
      if (artistTags.some((tag) => tag.name === input.toLowerCase())) {
        alert("The tag already exists on this artist.");
      } else {
        const newArtistTags = [...artistInfo.tags, { name: input }];
        // Update DB and update artist tag list
        tagArtist(artistInfo.id, input);
        setArtistTags(newArtistTags);

        // Update artist info with new tag list
        const artistInfoCopy = JSON.parse(JSON.stringify(artistInfo));
        artistInfoCopy.tags = newArtistTags;
        setArtistInfo(artistInfoCopy);

        // setting ArtistList need to recheck - should not be necessary
        const artistListCopy = JSON.parse(JSON.stringify(artistList));
        const index = artistListCopy.findIndex(
          (artist: { id: string }) => artist.id === artistInfoCopy.id
        );
        artistListCopy[index] = artistInfoCopy;
        setArtistList(artistListCopy);

        // Clear input
        (event.target as HTMLTextAreaElement).value = "";

        // Create new tag in user tags if it doesn't exist yet
        if (tags.every((tag) => tag.name !== input.toLowerCase())) {
          const newTag: Tag = { name: input, status: "inactive" };
          const newTags = [...tags, newTag];
          setTags(newTags);
          createTag(input);
        }
      }
    }
  }

  function toggleExpand() {
    if (inputClass === "") {
      setInputClass("expanded");
      setButtonClass("sliced");
    } else {
      setInputClass("");
      setButtonClass("full");
    }
  }

  return (
    <div className="artistTagList">
      <div className="tag-header">Current tags:</div>
      <div className="tag-container">
        {artistTags &&
          artistTags.length > 0 &&
          sortedTags.map((tag) => {
            return (
              <ArtistTag
                tag={tag}
                key={tag.name}
                artistTags={artistTags}
                artistInfo={artistInfo}
                setArtistInfo={setArtistInfo}
                setArtistTags={setArtistTags}
                artistList={artistList}
                setArtistList={setArtistList}
              />
            );
          })}
      </div>
      <div className="tag-input">
        <button className={buttonClass} onClick={toggleExpand}>
          Tag Artist
        </button>
        <input
          className={inputClass}
          list="avail-tags"
          placeholder="...add tag"
          onKeyUp={submitTag}
        />
        <datalist id="avail-tags">
          {tags.length > 0 &&
            sortedTags.map((tag) => {
              return <option value={tag.name} key={tag.name}></option>;
            })}
        </datalist>
      </div>
    </div>
  );
}

export default ArtistTagList;
