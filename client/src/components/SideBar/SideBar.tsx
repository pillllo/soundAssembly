import * as React from 'react';

import TagList from '../TagList/TagList';
import logo from '../../assets/logoWhite.png';

import Tag from '../../@types/Tag';

type SideBarProps = {
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>,
  tags: Tag[],
};

function SideBar({ setTags, tags }: SideBarProps) {

  return (
    <div>
      <div className="sideBar">
        <header>
          <img src={logo} alt="logo" />
        </header>
        <div>
          <TagList
            tags={tags}
            setTags={setTags}
          />
        </div>
      </div>
      <div className="sideBar extra">
      </div>
    </div>
  );
}

export default SideBar;