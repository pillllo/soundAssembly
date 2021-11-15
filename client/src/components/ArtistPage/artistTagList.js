import { createTag } from '../../ApiService';
import { tagArtist } from '../../ApiService';
import ArtistTag from './artistTag'

function ArtistTagList(props) {

  function renderTags(tags) {
    if (tags && tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <ArtistTag
            tag={tag}
            key={tag.name}
            artistTags={props.artistTags}
            artistInfo={props.artistInfo}
            setArtistTags={props.setArtistTags}
            />
      })
    }
    else {
      return "";
    }
  }

  function renderOptions(tags) {
    if (tags && tags.length > 0) {
      return tags
        .sort(function(a,b) {
          return (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1;
        })
        .map(tag => {
          return <option value={tag.name} key={tag.name}>{tag.name}</option>
      })
    }
    else {
      return "";
    }
  }

  function submitTag(event) {
    if (event.keyCode === 13) {
      const input = event.target.value;
      // Prevent tagging artist twice with same tag
      if (props.artistTags.some(tag => tag.name === input.toLowerCase())) {
        alert("The tag already exists on profile")
      }
      else {
        const newArtistTags = [...props.artistInfo.artistTags, {name: input}];
        // Update DB and update artist tag list
        tagArtist(props.artistInfo.id, input);
        props.setArtistTags(newArtistTags);
        // Clear input
        event.target.value = "";
        // Create new tag 'global' tag if it doesn't exist
        if (props.tags.every(tag => tag.name !== input.toLowerCase())) {
          const newList = [...props.tags, {name: input, status: 'inactive'}]
          props.setTags(newList);
          createTag(input);
        }
      }
    }
  }

  return (
    <div className="artistTagList">
      {renderTags(props.artistTags)}
      <label>Tag Artist:
        <input list="avail-tags" onKeyUp={submitTag} />
      </label>
      <datalist id="avail-tags">
        {renderOptions(props.tags)}
      </datalist>
    </div>
  );
}

export default ArtistTagList;