import './commentsection.css'

function CommentSection({ handleCommentSubmit, handleCommentChange, comment, commentText }) {


    return (
        <div>
            <h2>Comments</h2>
            <form className="comment-form" onSubmit={handleCommentSubmit}>
                <input type="text" className='comment-input' value={commentText} onChange={handleCommentChange} />
                <button type="submit">Add Comment</button>
            </form>
            <div className="comment-container">
                <p>No comments</p>
                {comment.map((singleComment, index) => (
                    <div key={index}>
                        <p>{singleComment.username}</p>:<p>{singleComment.text}</p>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default CommentSection;
