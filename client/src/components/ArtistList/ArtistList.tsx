import Tag from "../../@types/Tag.js";
import { Artist as ArtistInt } from "../../@types/Artist.js";
import Artist from "../Artist/Artist.js";

type ArtistListProps = {
  artistList: ArtistInt[],
  tags: Tag[]
}

// function ArtistList(props) {
function ArtistList({artistList, tags}: ArtistListProps) {
  function renderArtists(list: ArtistInt[]) {
    if (list.length > 0) {
      // when no tag filters are applied show all artists
      if (tags.every((tag) => tag.status === "inactive")) {
        return list
          .sort(function (a, b) {
            return a.name < b.name ? -1 : 1;
          })
          .map((artist) => {
            return <Artist artist={artist} key={artist._id}></Artist>;
          });
      } else {
        const filteredList = list.filter((artist) =>
          artist.tags.some((artistTag) =>
            tags
              .filter((tag) => tag.status !== "inactive")
              .some((tag) => tag.name === artistTag.name)
          )
        );
        if (filteredList.length > 0) {
          return filteredList
            .sort(function (a, b) {
              return a.name < b.name ? -1 : 1;
            })
            .map((artist) => {
              return <Artist artist={artist} key={artist._id}></Artist>;
            });
        } else {
          return <p>No artists match the selected criteria.</p>;
        }
      }
    } else {
      return (
        <p>
          Your library is empty. Click on "Update Library" to import your
          followed artists.
        </p>
      );
    }
  }

  // Render buffer to left-align items in last row (flexbox)
  function renderBuffer(n: number) {
    if (artistList && artistList.length > 2) {
      const bufferList = [];
      for (let i = 0; i < n; i++) {
        const el = <div className="item buffer" key={i} />;
        bufferList.push(el);
      }
      return bufferList;
    }
  }

  return (
    <div className="artist-container">
      <h2>Artists</h2>
      <div className="artist-list">
        {renderArtists(artistList)}
        {renderBuffer(7)}
      </div>
    </div>
  );
}

export default ArtistList;
