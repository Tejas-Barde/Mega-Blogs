import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from '../appwrite/config';
import { Container } from 'postcss';
import { PostForm } from '../components';


function EditPosts() {
	const navigate = useNavigate()
  const [post, setPost] = useState(null);
	const {slug} = useParams()
	useEffect((slug) => {
		if(slug){
			appwriteService.getPost().then(post=>{
				if(post){
					setPost(post);
				}
				else{
					navigate("/")
				}
			})
		}
	}, [navigate,slug]);
	
  return post?(
		<div className='py-8'>
			<Container>
				<PostForm
					post={post}
				/>
			</Container>
		</div>
	):null
}

export default EditPosts
