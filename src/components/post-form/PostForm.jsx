import React, { useCallback } from 'react'
import { Select, RTE, Input, Button } from '../index'
import { useSelector } from 'react-redux'
import { useLinkClickHandler, useNavigate } from 'react-router-dom'
import authWriteService from '../../appwrite/config'
import { set, useForm } from 'react-hook-form'

export default function PostForm({ post }) {
	const { register, handleSubmit, watch, setValue, control } = useForm({
		defaultValues: {
			title: post?.title || "",
			slug: post?.slug || "",
			content: post?.content || "",
			status: post?.status || "active"
		}
	})

	const navigate = useNavigate()
	const useData = useSelector(state => state.user.userData);

	const submit = async (data) => {
		if (post) {
			const file = data.image[0] ? authWriteService.uploadFile(data.image[0]) : null;
			if (file) {
				authWriteService.deleteFile(post.featuredImage)
			}

			const dbpost = await authWriteService.updatePost(post.$id, {
				...data,
				featuredImage: file ? file.$id : undefined,
			})
			if (dbpost) {
				navigate(`/post/${post.$id}`)
			}
		}
		else {
			const file = data.image[0] ? await authWriteService.uploadFile() : null;
			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId
				const dbPost = await authWriteService.createPost({
					...data,
					userId: userData.$id
				})

				if (dbPost) navigate(`/post/${dbPost.$id}`);
			}
		}

		const slugTransform = useCallback((data) => {
			if (data && typeof data === 'string') {
				return data
					.trim()
					.toLowerCase()
					.replace(/^[a-zA-z\d\s]+/g, '-');
			}
			return ""
		})

		React.useEffect(() => {
			const subscription = watch((value, { name }) => {
				setValue(slug, slugTransform(value.title, {
					shouldValidate: true
				}))
			})
			return () => { subscription.unsubscribe() }
		}, [watch, slugTransform, setValue])
	}
	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title :"
					placeholder="Title"
					className="mb-4"
					{...register("title", { required: true })}
				/>
				<Input
					label="Slug :"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", { required: true })}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
					}}
				/>
				<RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Featured Image :"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("image", { required: !post })}
				/>
				{post && (
					<div className="w-full mb-4">
						<img
							src={authWriteService.getFilePreview(post.featuredImage)}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Select
					options={["active", "inactive"]}
					label="Status"
					className="mb-4"
					{...register("status", { required: true })}
				/>
				<Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
					{post ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	)
}
