import React from 'react'
import { Link } from 'react-router-dom'
import authWriteService from '../appwrite/config'
import { AppwriteException } from 'appwrite'

function PostCard({ $id, title, featuredImage, status }) {
  const getPath = (featuredImage) => {
    const path = authWriteService.getPreview(featuredImage);
    console.log(`Path inside postcard`)
    console.log(path);
    return path;
  }

  const slugTransform = (value => {
    return value
      .trim()
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-+|-+$/g, "");
  });
  return (
    <Link to={`/post/${slugTransform(title)}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={getPath(featuredImage)}
            alt={title}
            className='rounded-xl' />
        </div>
        <h2
          className='text-xl font-bold'>
          {title}
        </h2>
      </div>
    </Link>
  )
}

export default PostCard
