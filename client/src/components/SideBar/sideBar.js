import TagList from './tagList';
// TODO: #25 move assets to assets folder
import logo from '../../logoWhite.png';

function SideBar(props) {

  return (
    <div>
      <div className="sideBar">
        <header>
          <img src={logo} alt="logo" />
        </header>
        <div>
          <TagList
          tags={props.tags}
          setTags={props.setTags}
          />
        </div>
      </div>
      <div className="sideBar extra">
      </div>
    </div>
  );
}

export default SideBar;