"use strict";

const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

let app = {
      result: {
            videos: [],
            selectedVideo: null,
            searchTerm: "music"
      },

      init: function () {
            app.youtubeSearch(app.result.searchTerm);

      },
      //<iframe className="embed-responsive-item" src={url}> </iframe>
      getVideoList: function (videos) {
            return videos.map((video, index) => {
                  const imageUrl = video.snippet.thumbnails.default.url;
                  const url = `https://www.youtube.com/embed/${video.id.videoId}`;
                  return `<li> 
                    <!--<img class="media-object" src=${imageUrl} /> -->
                    <div class="embed-container">
                        <iframe width="560" height="315" class="embed-responsive-item" src=${url} allowfullscreen> </iframe>
                    </div>
               </li>`;
            });
      },

      youtubeSearch: function (searchTerm) {
            console.log(searchTerm);
            $("#root").html("");
            $("#video").html("");
            YTSearch({ key: API_KEY, term: searchTerm }, data => {
                  console.log("result", data);
                  app.result = {
                        videos: data,
                        selectedVideo: data[0],
                        searchTerm: searchTerm,
                        title: data[0].snippet.title,
                        descr: data[0].snippet.description
                  };
                  var list = app.getVideoList(app.result.videos);
                  console.log("lis: ", list);
                  $("#root").append(list);
                  $("#video").append(list[0]);
                  $("#video").append(`<h1>"${app.result.title}"</h1>`);
                  $("#video").append(`<div>
                                          <p>"${app.result.descr}"</p>
                                     </div>`);

            });
      },
};

$(document).ready(app.init);
$("#btnSearch").click(function () {
      let termSearch = $("#inputSearch").val();
      app.youtubeSearch(termSearch);
});