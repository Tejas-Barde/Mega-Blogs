import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import {Container} from '../components';
import { PostForm } from '../components';


function EditPost() {
	const navigate = useNavigate()
	const [post, setPost] = useState(null);
	const { slug } = useParams()
	useEffect(()=> {
		console.log(`slug inside edit post `)
		console.log(slug)
		if (slug) {
			appwriteService.getPost(slug).then(post => {
				if (post) {
					console.log(`innside editpost slug`);
					setPost(post);
				}
				else {
					navigate("/")
				}
			})
		}
	}, [navigate, slug]);

	return post ? (
		<div className='py-8'>
			<Container>
				<PostForm
					post={post}
				/>
			</Container>
		</div>
	) : null
}

export default EditPost
