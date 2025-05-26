import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config'
import { Container } from '../components';
import { PostCard } from '../components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const loginStatus = useSelector(state => state.auth.status);
    const location = useLocation()
    useEffect(() => {
        appwriteService.listPosts([]).then((posts) => {
            console.log(`inside all posts - `)
            if (posts) {
                setPosts(posts.documents);
                console.log('Posts data type - ')
                console.log(posts)
            }
        })
    }, [loginStatus, location]);

    return (
        <div className='w-full py-8'>
            <Container>
                <div>
                    {posts.map(post => (
                        <div className='flex flex-wrap' key={post.$id}>
                            <PostCard
                                key={post.userId}
                                $id={post.userId}
                                featuredImage={post.featuredImage}
                                status={post.status}
                                title={post.title}
                                
                            />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts
