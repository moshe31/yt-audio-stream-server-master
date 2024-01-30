$(function() {
  const audioElement = document.getElementById("audioElement");

  //loading event listeners
  audioElement.onloadstart = () => showLoader(true);
  audioElement.onwaiting = () => showLoader(true);
  audioElement.oncanplay = () => showLoader(false);
  audioElement.onerror = () => showLoader(false);

  const inputField = $("#vid-input-field");
  const submitAction = $("#url-submit");
  const errorResp = $("#error-resp");

  inputField.focus(function(e) {
    errorResp.empty();
  });

  submitAction.click(function(e) {
    const url = inputField.val();

    if (url) {
      showLoader(true);
      $.ajax({
        type: "POST",
        url: `https://yt-audio-stream.glitch.me/api/stream/audio`,
        data: {
          url
        },
        success: function(data) {
          if (data.success) {
            const { title, url } = data;

            $("#title-scroller").html(`Now Playing: ${title}`);

            audioElement.src = url;
            audioElement.play();

            showLoader(false);
          }
        },
        error: function(error, textStatus, errorThrown) {
          errorResp.html(
            `${textStatus}: ${
              error.responseJSON ? error.responseJSON.error : error.statusText
            }`
          );
          showLoader(false);
        }
      });
      e.preventDefault();
    } else {
      errorResp.html("url is required");
    }
  });

  function showLoader(show) {
    if (show) {
      $(".loader").removeClass("hide");
    } else {
      $(".loader").addClass("hide");
    }
  }
});
