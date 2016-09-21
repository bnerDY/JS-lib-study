/**
 * Created by dy on 9/21/16.
 */
import React from 'react';


const Comments = React.createClass({
    renderComments(comments, i){
        console.log(comments);
        return(
            <div className="comment" key={i}>
                <p>
                    <strong>{comments.user}</strong>
                    {comments.text}
                    <button className="remove-comment"
                            onClick={this.props.removeComment.bind(null, this.props.params.postId, i)}>&times;</button>
                </p>
            </div>
        )
    },
    handleSubmit(e) {
        e.preventDefault();
        const { postId } = this.props.params;
        const author = this.refs.author.value;
        const comment = this.refs.comment.value;
        this.props.addComment(postId, author, comment);
        this.refs.commentForm.reset();
    },
    render(){
        return(
            <div className="comments">
                {this.props.postComments.map(this.renderComments)}
                <form ref="commentForm" className="comment-form" onSubmit={this.handleSubmit}>
                    <input type="text" ref="author" placeholder="author"/>
                    <input type="text" ref="comment" placeholder="comment"/>
                    <input type="button" hidden/>
                </form>
            </div>
        )
    }
});

export default Comments;