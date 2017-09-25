const API_KEY = "AIzaSyB6RQPxv-X6aojxx9IKh0Nc4twyqlMnitI";

class Video{
      constructor() {
            this.videos= [];
            this.selectedVideo=null;
            this.searchTerm="music";
            this.youtubeSearch(this.searchTerm);
      }

      getVideoList(videos) {
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
      }

      youtubeSearch(Term) {
            console.log(Term);
            $("#root").html("");
            $("#video").html("");
            YTSearch({ key: API_KEY, term: Term }, data => {
                  console.log("result", data);
                  this.result = {
                        videos: data,
                        selectedVideo: data[0],
                        searchTerm: Term,
                        title: data[0].snippet.title,
                        descr: data[0].snippet.description
                  };
                  var list = this.getVideoList(this.result.videos);
                  console.log("lis: ", list);
                  $("#root").append(list);
                  $("#video").append(list[0]);
                  $("#video").append(`<h1>"${this.result.title}"</h1>`);
                  $("#video").append(`<div class="description">
                                          <p>"${this.result.descr}"</p>
                                     </div>`);

            });
      }
}

var video = new Video();
$("#btnSearch").click(function () {
      let termSearch = $("#inputSearch").val();
      video.youtubeSearch(termSearch);
});