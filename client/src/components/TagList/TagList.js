import React, { useState } from 'react';
import { createTag } from "../../ApiService";
import Tag from "../Tag/Tag";

function TagList(props) {

  const [newTag, setNewTag] = useState('');

  function handleInputChange (e) {
    const val = e.target.value;
    setNewTag(val);
  }

  async function handleSubmit (e) {
      e.preventDefault();
      try {
        const updatedTags = await createTag(newTag);
        const newList = [...props.tags, { name: newTag, status: "inactive" }];
        props.setTags(newList);
      } catch (err) {
        console.error(err);
      }
      setNewTag('');
      e.target.value = "";
  }

  // async function submitTag(event) {
  //   if (event.keyCode === 13) {
  //     const input = event.target.value;
  //     console.log('submitTag() event.target.value: ', event.target.value)
  //     const newList = [...props.tags, {name: input, status: 'inactive'}]
  //     props.setTags(newList);
  //     await createTag(input);
  //     event.target.value = "";
  //   }
  // }

  // RENDER TAGS

  const renderTags = (tags) => {
    if (tags && tags.length > 0) {
      return tags
        .sort(function (a, b) {
          return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        })
        .map((tag, idx) => {
          return (
            <Tag
              tag={tag}
              key={`tag-${idx}`}
              tags={props.tags}
              setTags={props.setTags}
            />
          );
        });
    } else {
      return "";
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
        <form id="taglist-form" onSubmit={ (e) => handleSubmit(e) }>
          <input
            data-testid="taglist-input"
            onChange={(e) => handleInputChange(e) }
            placeholder="add tag..."
            type="text"
            />
          <button onClick={ (e) => handleSubmit(e) }>Submit tag</button>
        </form>
        {/* <input type="text" onKeyUp={submitTag} placeholder="add tag..." /> */}
      </div>
    </div>
  );
}

export default TagList;
