import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Send from "../../images/send.svg";
import {
  addLike,
  deleteLike,
  deletePost,
  getPosts,
} from "../../redux/actions/postAction";
import Loading from "../../layoutes/Loading";
import CreateComment from "./comments/CreateComment";
import DisplayComments from "./comments/DisplayComments";
import LikeButton from "../../layoutes/LikeButton";
export const Post = ({ post }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [readMore, setReadMore] = useState(false);
  const [displayComment, setDisplayComment] = useState(false);
  const [displayLike, setDisplayLike] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postDelete = useSelector((state) => state.postDelete);
  const { success, loading } = postDelete;

  const likeCreate = useSelector((state) => state.likeCreate);
  const { error } = likeCreate;

  const handleLike = () => {
    setDisplayLike(true);
    dispatch(addLike(post._id));
    //dispatch(getPosts())
    setDisplayLike(true);
  };
  const handleDeleteLike = () => {
    setDisplayLike(false);
    dispatch(deleteLike(post._id));
    setDisplayLike(false);
  };
  const handleEditPost = () => {};
  const handleDeletePost = () => {
    if (post.user._id === userInfo.user._id) {
      dispatch(deletePost(post._id));
      dispatch(getPosts());
    } else {
      console.log("user not authorized");
    }
  };
  const handleCopyLink = () => {};
  const handleDisplayComment = () => {
    setDisplayComment(false);
  };
  const handleHideComment = () => {
    setDisplayComment(true);
  };

  return (
    <>
      {error && <h6>{error}</h6>}
      <div
        className="card my3 container"
        style={{ margin: "10px", padding: "10px" }}
      >
        {loading && <Loading />}
        <div className="card_header">
          <div className="d-flex">
            <img src={post.user && post.user.avatar} className="big-avatar" />

            <div className="card_name">
              <h6 className="m-0">
                <Link to={`/profile/${post.user._id}`} className="text-dark">
                  {post.user.name}
                </Link>
              </h6>
              <small className="text-muted">
                {moment(post.createdAt).fromNow()}
              </small>
            </div>
          </div>

          <div class="dropdown">
            <button
              className="btn btn-dark dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            ></button>
            {userInfo.user._id === post.user._id ? (
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={handleEditPost}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={handleDeletePost}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={handleCopyLink}
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </li>
              </ul>
            ) : (
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={handleCopyLink}
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>

        <div className="card_body">
          <div className="card_body-content">
            <span>
              {post.content.length < 60
                ? post.content
                : readMore
                ? post.content + " "
                : post.content.slice(0, 60) + "....."}
            </span>
            {post.content.length > 60 && (
              <span className="readMore" onClick={() => setReadMore(!readMore)}>
                {readMore ? "Hide content" : "Read more"}
              </span>
            )}
          </div>
          {post.image && <img src={post.image} className="supper-avatar" />}
        </div>
        <div className="card_footer container">
          <div className="card_icon_menu" style={{ display: "flex" }}>
            <span style={{ display: "flex" }}>
              <LikeButton
                handleDeleteLike={handleDeleteLike}
                handleLike={handleLike}
                displayLike={displayLike}
              />

              {displayComment ? (
                <i className="fas fa-comment" onClick={handleDisplayComment} />
              ) : (
                <i className="far fa-comment" onClick={handleHideComment} />
              )}
              <i className="far fa-bookmark" />
            </span>
          </div>
          <div className="d-flex justify-content-between">
            <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
              {post.likes.length} likes
            </h6>
            <h6 style={{ padding: "0 25px", cursor: "pointer" }}>
              {post.comments.length} comments
            </h6>
          </div>
        </div>
        {displayComment && <DisplayComments post={post} />}
        <CreateComment post={post} key={post._id} />
      </div>
    </>
  );
};
export default Post;
