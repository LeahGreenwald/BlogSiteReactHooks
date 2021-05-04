import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

const MostRecent = () => {
    const history = useHistory();
    useEffect(() => {
        const mostRecent = async () => {
            const { data } = await axios.get('/api/blogs/getmostrecentblogid');
            history.push(`/viewBlog/${data}`)
        };

        mostRecent();
    });
    return (
        <> </>
    );
};

export default MostRecent;