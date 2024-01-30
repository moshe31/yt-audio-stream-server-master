const express = require("express");
const router = express.Router();
const ytdl = require("ytdl-core");
const { PassThrough } = require("stream");

//@route  POST /api/stream/audio
//@return meta data and stream url
//@access Public

router.post("/audio", function(req, res) {
  const { url } = req.body;

  if (!url) {
    return res.status(500).json({ success: false, error: "Url cant be blank" });
  }

  ytdl.getInfo(url, (err, info) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }

    try {
      const { title, video_id } = info;

      const port = process.env.PORT;
      const baseUrl =
        process.env.ENVIRONMENT === "production"
          ? process.env.BASE_PATH
          : `http://localhost:${port || 5000}`;

      return res.status(200).json({
        success: true,
        url: `${baseUrl}/api/stream/audio/${video_id}`,
        title,
        video_id
      });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  });
});

//@route  GET /api/stream/audio/:videoId
//@return Audio stream
//@access Public

router.get("/audio/:videoId", function(req, res) {
  try {
    const requestUrl = "http://youtube.com/watch?v=" + req.params.videoId;
    const passThrough = new PassThrough();

    ytdl(requestUrl, { filter: "audioonly", quality: "lowest" })
      .pipe(passThrough)
      .pipe(res);
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
