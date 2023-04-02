import './commentsection.css'

function CommentSection({ handleCommentSubmit, handleCommentChange, comment, commentText }) {

    console.log(comment);
    return (
        <div className="comment-section">
            <h2>Comments</h2>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    className="comment-input"
                    value={commentText}
                    onChange={handleCommentChange}
                    placeholder="Write a comment..."
                />
                <button type="submit" className="comment-button">
                    Comment
                </button>
            </form>
            <div className="comment-container">
                {comment.map((singleComment, index) => (
                    <div className="comment" key={index}>
                        <img src={singleComment.profilePicture} />
                        <span className="comment-username">{singleComment.username}</span>:
                        <span className="comment-text">{singleComment.text}</span>
                    </div>
                ))}
            </div>
        </div >
    );
}



export default CommentSection;
