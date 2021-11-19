import { createTag } from "../../ApiService";
import Tag from "../Tag/Tag";

function TagList(props) {
  function renderTags(tags) {
    if (tags && tags.length > 0) {
      return tags
        .sort(function (a, b) {
          return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        })
        .map((tag) => {
          return (
            <Tag
              tag={tag}
              key={tag.name}
              tags={props.tags}
              setTags={props.setTags}
            />
          );
        });
    } else {
      return "";
    }
  }

  async function submitTag(event) {
    if (event.keyCode === 13) {
      console.log('****** submitTag() Enter detected in input')
      const input = event.target.value;
      const newList = [...props.tags, { name: input, status: "inactive" }];
      try {
        // TODO: createTag should return a response
        const updatedTags = await createTag(input);
        props.setTags(newList);
      } catch (err) {
        console.error();
      }
      event.target.value = "";
    }
  }

  return (
    <div className="tagList-container">
      <p>Filter via tag:</p>
      <div
        className="tagList"
        data-testid="taglist"
      >
        {
          renderTags(props.tags)
        }
        <input
          data-testid="taglist-input"
          onKeyUp={submitTag}
          placeholder="add tag..."
          type="text"
        />
      </div>
    </div>
  );
}

export default TagList;
