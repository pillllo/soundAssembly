import { useNavigate } from 'react-router-dom';

import { importLibrary } from '../../ApiService';

import Tag from '../../@types/Tag';

type TopBarProps = {
  username: string,
  onUpdateUserData(spotifyData: {}): void,
};

function TopBar ({ username, onUpdateUserData } : TopBarProps) {

  const importArtists = () => {
    importLibrary()
      .then(userData => {
        const newTagList = userData.tags.map((tag: Tag) => {
          return {name:tag.name, status: "inactive"}
        });
        onUpdateUserData({
          ...userData,
          tags: newTagList,
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  const navigate = useNavigate();

  return (
    <div>
      <div className="top-bar">
        <div className="top-bar__navigation">
          <button
            className="top-bar__navigation-button"
            id="back-btn"
            onClick={() => navigate(-1)}
          >
            <i className="fa fa-arrow-left"/>
          </button>
          <button
            className="top-bar__navigation-button"
            id="forward-btn"
            onClick={() => navigate(+1)}
          >
            <i className="fa fa-arrow-right"/>
          </button>
        </div>
        <div className="top-bar__user">
          <button
            data-testid="updateLibraryBtn"
            onClick={importArtists}
          >Update library
          </button>
          <button id="user">Username: <span>{username}</span>
            <div className="user-dropdown-content">
              <a href="/login">Logout</a>
            </div>
          </button>
        </div>
      </div>
      <div className="logout buffer"></div>
    </div>
  );
}

export default TopBar;