import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blog from '../components/BlogHomePage';
import { useParams } from 'react-router';


const Home = () => {
    const [BlogPosts, setBlogPosts] = useState([]);
    const [highestPage, setHighestPage] = useState('');
    const params = useParams();
    let { page } = params;
    if (page == undefined) {
        page = 1;
    }
    page = parseInt(page);

    useEffect(() => {
        const getBlogPosts = async () => {
            const { data } = await axios.get(`/api/blogs/getblogposts?page=${page}`);
            setBlogPosts(data);
            const highest = await axios.get('/api/blogs/gethighestpage');
            setHighestPage(highest.data);
        }
        getBlogPosts();
    }, []);

    return (
        <div>
            <h1>Blog Site</h1>
            {BlogPosts.map(bp => <Blog BlogPost={bp} key={bp.id} />)}
            <ul className="pagination justify-content-center mb-4">
                {page < highestPage && <li className="page-item">
                    <a className="page-link" href={`/page/${page + 1}`}>← Older</a>
                </li>}
                {page != 1 && <li className="page-item">
                    <a className="page-link" href={`/page/${page - 1}`}>Newer →</a>
                </li>}
            </ul>
        </div>
    );
}

export default Home;