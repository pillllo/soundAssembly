// what we store on DB

// {
//   username: username,
//   artists: taggedArtists.artistList,
//   tags: taggedArtists.tags,
// }

import { Artist } from './Artist';
import Tag from './Tag';

interface UserData {
  username: string,
  artists: Artist[],
  tags?: Tag[],
}

export default UserData;