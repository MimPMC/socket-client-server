import { useState } from "react";
import Comment from "../../img/comment.svg";
import Heart from "../../img/heart.svg";
import HeartFilled from "../../img/heartFilled.svg";
import Info from "../../img/info.svg";
import Share from "../../img/share.svg";
import "./card.css";



interface Post {
    id: number;
    username: string;
    fullname: string;
    userImg: string;
    postImg: string;
  }

const Card = ({ post, socket, user }: { post: Post, socket: any, user: string }) => {
  const [liked, setLiked] = useState(false);

  const handleNotification = (type: number | string) => {
    type === 1 && setLiked(true);
    socket.emit("sendNotification", {
      senderName: user,
      receiverName: post.username,
      type,
    });
  };

  return (
    <div className="card">
      <div className="info">
        <img src={post.userImg} alt="" className="userImg" />
        <span>{post.fullname}</span>
      </div>
      <img src={post.postImg} alt="" className="postImg" />
      <div className="interaction">
        {liked ? (
          <img src={HeartFilled} alt="" className="cardIcon" />
        ) : (
          <img
            src={Heart}
            alt=""
            className="cardIcon"
            onClick={() => handleNotification(1)}
          />
        )}
        <img
          src={Comment}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(2)}
        />
        <img
          src={Share}
          alt=""
          className="cardIcon"
          onClick={() => handleNotification(3)}
        />
        <img src={Info} alt="" className="cardIcon infoIcon" />
      </div>
    </div>
  );
};

export default Card;
