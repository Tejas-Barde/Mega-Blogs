import React, { useEffect ,useState} from 'react'
import appwriteService from '../appwrite/config'
import { set } from 'react-hook-form';
import Container from '../components/container/Container';
import { PostCard } from '../components';


function Home() {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		appwriteService.getPost().then(posts => {
			if (posts) {
				setPosts(posts.documents)
			}
		})
	})
	if (posts.length === 0) {
		return (
			<div className='w-full py-8 mt-4 text-center'>
				<Container>
					<div className='flex flex-wrap'>
						<div className='p-2 w-full'>
							{/* <img className='w-full' src='src\assets\download.jpeg'/> */}
						</div>
					</div>
				</Container>
			</div>
		)
	}
	return (
		<div className='w-full py-8'>
			<Container>
				<div className='flex flex-wrap'>
					{posts.map(post=>(
						<div key={post.$id} className='p-2 w-1/4'>
							<PostCard post= {post}></PostCard>
						</div>
					))}
				</div>
			</Container>
		</div>
	)
}

export default Home
