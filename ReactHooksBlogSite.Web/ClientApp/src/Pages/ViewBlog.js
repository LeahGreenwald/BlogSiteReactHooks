import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewBlog = () => {
    const [blogPost, setBlogPost] = useState({ id: '', title: '', text: '', postedBy: '', date: '', comments: [] });
    const [comment, setComment] = useState({ name: "", text: "", blogPostId: "" });
    const Params = useParams();

    useEffect(() => {
        const getBlogPostForId = async () => {
            console.log('view blog use effect');
            const { id } = Params;
            const { data } = await axios.get(`/api/blogs/getblogpostforid?id=${id}`);
            setBlogPost(data);
            setComment({ blogPostId: id });
        }
        getBlogPostForId();
    }, []);

    const { id, title, text, postedBy, date, comments } = blogPost;

    const OnTextChange = e => {
        const copy = { ...comment };
        copy[e.target.name] = e.target.value;
        setComment(copy);
    }

    const onSubmitClick = async () => {
            await axios.post("/api/blogs/newcomment", comment);
            setComment({ name: "", text: "", blogPostId: "" });
            const { id } = Params;
            const { data } = await axios.get(`/api/blogs/getblogpostforid?id=${id}`);
            setBlogPost(data);
            setComment({ blogPostId: id });
    }

    const GetComment = comment => {
        return (
            <div key={comment.id} className="media mb-4">
                <div className="media-body">
                    <h5 className="mt-0">
                        {comment.name}
                        <small className="ml-1">{date && format(new Date(comment.date), 'cccc MMMM do, yyyy')}</small>
                    </h5>
                    {comment.text}
                </div>
            </div>
        );
    }


    return (
        <div className="row">
            <div className="col-lg-8">
                <h1 className="mt-4">{title}</h1>
                <p className="lead">by {postedBy}</p>
                {date && <p>Posted on {format(new Date(date), 'cccc MMMM do, yyyy')}</p>}
                <p>{text}</p>
                <div className="card my-4">
                    <h5 className="card-header">Leave a Comment:</h5>
                    <div className="card-body">
                        <input type="hidden" name="BlogPostId" value={id} />
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Please enter your name"
                                className="form-control"
                                name="name"
                                value={comment.name}
                                onChange={OnTextChange}
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                onChange={OnTextChange}
                                placeholder="Type your comment here but remember to be be nice..."
                                name="text"
                                className="form-control"
                                rows="3"
                                value={comment.text}>
                            </textarea>
                        </div>
                        <button
                            disabled={comment.text === undefined || comment.text.length === 0 || comment.name === undefined || comment.name.length === 0}
                            className="btn btn-primary"
                            onClick={onSubmitClick}>
                            Submit
                        </button>
                    </div>
                </div>
                {comments && comments.map(c => GetComment(c))}
            </div>
        </div>
    );
}

export default ViewBlog;