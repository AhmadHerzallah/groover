import React from "react";

const VideoBackground = ({ video }) => {
  return (
    <div className="fullscreen-bg">
      <iframe
        src={video}
        frameBorder="0"
        className="fullscreen-bg__video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="bg"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
