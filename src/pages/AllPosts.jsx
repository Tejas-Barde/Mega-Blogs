import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container } from 'postcss';
import { PostCard } from '../components';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(() => { }, []);
    appwriteService.getPost([]).then((posts) => {
        if (posts) {
            setPosts(posts);
        }
    })
    return (
        <div className='w-full py-8'>
            <Container>
                <div>
                    {posts.map(post => {
                        <PostCard
                            key={post.$id}

                        />
                    })}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
