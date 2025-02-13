import { Artist } from "../../@types/Artist";

type ArtistDetailProps = {
  artistInfo: Artist
}

function ArtistDetails({artistInfo}: ArtistDetailProps) {

  const noOfFollowers = function () {
    // format follower number with commas for thousands
    if (artistInfo.followers) {
      const followers = artistInfo.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return followers;
    }
  }

  const artistImage = function () {
    return (artistInfo.images) ? artistInfo.images[0].url : "";
  }

  return (
    <div className="artist-details">
      <div
        className="artist-img"
        style={{ backgroundImage: `linear-gradient(
          rgba(0, 0, 0, 0.6),
          rgba(0, 0, 0, 0.6)
        ), url(${artistImage()})` }}
      >
        <h2>{artistInfo.name}</h2>
        <div>Followers: {noOfFollowers()}</div>
      </div>
    </div>
  );
}

export default ArtistDetails;