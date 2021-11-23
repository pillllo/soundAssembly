// Spotify API response
//
// {
//   "artists": {
//     "items": [
//       {
//         "external_urls": {
//           "spotify": "https://open.spotify.com/artist/1vCWHaC5f2uS3yhpwWbIA6"
//         },
//         "followers": {
//           "href": null,
//           "total": 20913421
//         },
//         "genres": [
//           "dance pop",
//           "edm",
//           "pop",
//           "pop dance"
//         ],
//         "href": "https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6",
//         "id": "1vCWHaC5f2uS3yhpwWbIA6",
//         "images": [
//           {
//             "height": 640,
//             "url": "https://i.scdn.co/image/ab6761610000e5eb09bf4814c6585e1f69dfeef7",
//             "width": 640
//           },
//           {
//             "height": 320,
//             "url": "https://i.scdn.co/image/ab6761610000517409bf4814c6585e1f69dfeef7",
//             "width": 320
//           },
//           {
//             "height": 160,
//             "url": "https://i.scdn.co/image/ab6761610000f17809bf4814c6585e1f69dfeef7",
//             "width": 160
//           }
//         ],
//         "name": "Avicii",
//         "popularity": 83,
//         "type": "artist",
//         "uri": "spotify:artist:1vCWHaC5f2uS3yhpwWbIA6"
//       }
//     ],
//     "next": null,
//     "total": 1,
//     "cursors": {
//       "after": null
//     },
//     "limit": 20,
//     "href": "https://api.spotify.com/v1/me/following?type=artist&limit=20&locale=en-US,en;q=0.5"
//   }
// }


type UserData = {
  username: string;
  // TODO: [Artist]
  artists: [];
  tags: [];
}

export default UserData;