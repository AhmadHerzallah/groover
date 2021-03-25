if (localStorage.getItem("ArtistsHistory") !== null) {
    let artistlist = localStorage.getItem("ArtistsHistory");
    artistlist = JSON.parse(artistlist);
    artistlist = JSON.stringify(artistlist);
    local