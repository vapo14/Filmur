import { React, useState } from "react";
import "../css/likeAndSave.css";

export default function LikeAndSave() {
  const [Liked, setLiked] = useState(false);

  const handleLikeButton = () => {
    setLiked(!Liked);
  };

  return (
    <div className="like-and-save-container">
      <button
        className={`like-button  ${Liked ? "liked" : ""}`}
        onClick={handleLikeButton}
      >
        <span className="like-icon">
          <div className="heart-animation-1"></div>
          <div className="heart-animation-2"></div>
        </span>
        Like
      </button>
    </div>
  );
}
