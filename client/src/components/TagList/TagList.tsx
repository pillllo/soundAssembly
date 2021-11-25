import React, { ChangeEvent, FormEvent, useState } from 'react';

import TagListItem from '../TagListItem/TagListItem';
import { createTag } from "../../ApiService";

import Tag from '../../@types/Tag';

type TagListProps = {
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>,
  tags: Tag[],
};

function TagList({ setTags, tags }: TagListProps) {

  const [newTagName, setNewTagName] = useState('');

  function handleInputChange (event: ChangeEvent<HTMLInputElement>) {
    const val = event.currentTarget.value;
    setNewTagName(val);
  }

  async function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
      try {
        const updatedTags = await createTag(newTagName);
        const newTag: Tag = { name: newTagName, status: "inactive" };
        const newList = [...tags, newTag ];
        setTags(newList);
      } catch (err) {
        console.error(err);
      }
      setNewTagName('');
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

  const renderTags = (tags: Tag[]) => {
    if (tags && tags.length > 0) {
      return tags
        .sort(function (a, b) {
          return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1;
        })
        .map((tag, idx) => {
          return (
            <TagListItem
              tag={tag}
              key={`tag-${idx}`}
              tags={tags}
              setTags={setTags}
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
          renderTags(tags)
        }
        <form id="taglist-form" onSubmit={handleSubmit}>
          <input
            data-testid="taglist-input"
            onChange={(e) => handleInputChange(e) }
            placeholder="add tag..."
            type="text"
            />
          <button type="submit">Submit tag</button>
        </form>
        {/* <input type="text" onKeyUp={submitTag} placeholder="add tag..." /> */}
      </div>
    </div>
  );
}

export default TagList;
