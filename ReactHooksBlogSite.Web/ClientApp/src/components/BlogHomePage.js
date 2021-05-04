import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const Blog = ({ BlogPost }) => {
    const { id, title, text, date, comments } = BlogPost;

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h2 className="card-title">
                    <Link to={`/viewblog/${id}`}>
                        {title}
                    </Link>
                </h2>
                <p className="card-text">{text.length > 200 ? `${text.substring(1, 200)}...` : text}</p>
                <div className="mb-3">
                    <small>
                        {comments == null ? '0' : comments.length} comment(s)
                    </small>
                </div>
                <Link to={`/viewblog/${id}`} className="btn btn-primary">
                    Read More →
                </Link>
            </div>
            <div className="card-footer text-muted">
                Posted on {format(new Date(date), 'cccc MMMM do, yyyy')}
            </div>
        </div>
    );
}
export default Blog;



