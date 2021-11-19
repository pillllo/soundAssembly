import { createTag } from "../../ApiService";
import Tag from "../SideBar/tag";

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
      const input = event.target.value;
      const newList = [...props.tags, { name: input, status: "inactive" }];
      try {
        // TODO: createTag should return a response
        await createTag(input);
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
      <div data-testid="taglist" className="tagList">
        {renderTags(props.tags)}
        <input type="text" onKeyUp={submitTag} placeholder="add tag..." />
      </div>
    </div>
  );
}

export default TagList;
