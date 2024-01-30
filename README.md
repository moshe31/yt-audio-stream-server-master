### Youtube Audio Stream API

A simple wrapper around [`ytdl-core`](https://github.com/fent/node-ytdl-core#readme) library, for quickly streaming audio from YouTube videos.

- **POST**

  `/api/stream/audio`

  Make a post request with Youtube video `url` in body eg..
  `{url: https://www.youtube.com/watch?v=Ouz4JGzXruI }`

  Returns the following JSON response with the meta data and stream url

  `{ "success": true, "title": "Echos of swing", "video_id": "Ouz4JGzXruI" "url": "https://yt-audio-stream.glitch.me/api/stream/audio/Ouz4JGzXruI" }`

- **GET**

  `/api/stream/audio/{videoId}`

  Returns an Audio stream.

To test the API visit: [_https://yt-audio-stream.glitch.me/_](https://yt-audio-stream.glitch.me/)

#### See it in action: [https://farhankk360.github.io/js-visualize](https://farhankk360.github.io/js-visualize)

---
