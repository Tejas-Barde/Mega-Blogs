import React, { useCallback } from 'react'
import { RTE, Button } from '../index'
import Input from '../Input'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import authWriteService from '../../appwrite/config'
import { set, useForm } from 'react-hook-form'
import Select from '../Select'
import { ID } from 'appwrite'

export default function PostForm({ post }) {

	const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
		defaultValues: {
			title: post?.title || "",
			slug: post?.slug || "",
			content: post?.content || "",
			status: post?.status || "active"
		}
	})

	const navigate = useNavigate()
	const userData = useSelector(state => state.auth.userData);

	console.log("User data error - ", userData);

	const submit = async (data) => {
		console.log(`data after submit - ${data}`);
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
				console.log(post)
				navigate(`/post/${post.$id}`)
			}
		}
		else {
			const file = data.image[0] ? await authWriteService.uploadFile(data.image[0]) : null;
			if (file) {
				const fileId = file.$id;
				data.featuredImage = fileId
				console.log(`data to be create post - ${data}`);
				console.log(data);
				console.log(`userId - ${userData.$id}`);
				console.log(data.slug)
				const dbPost = await authWriteService.createPost({
					...data,
					userId:userData.$id
				})

				if (dbPost) navigate(`/post/${data.slug}`);
			}
		}


	}
	const slugTransform = useCallback((value) => {
		if (value && typeof value === "string") {
			return value
				.trim()
				.toLowerCase()
				.replace(/[^\w\s-]/g, "")       
				.replace(/\s+/g, "-")           
				.replace(/--+/g, "-")           
				.replace(/^-+|-+$/g, "");       
		}
		return "";
	}, []);


	React.useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === 'title') {
				setValue("slug", slugTransform(value.title), { shouldValidate: true })
			}
		})
		return () => { subscription.unsubscribe() }
	}, [watch, slugTransform, setValue])

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
							src={authWriteService.getPreview(post.featuredImage)}
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
