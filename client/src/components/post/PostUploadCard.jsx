import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { FileUploaderSingleUpload } from "../FileUploaderSingleUpload";
import { useToast } from "@/components/ui/use-toast";
import axios from "../axiosInstance";

export default function DialogDemo() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [tags, setTags] = useState("");
	const [isPublished, setIsPublished] = useState(true);
	const [files, setFiles] = useState([]);
	const { toast } = useToast();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("title", title);
		formData.append("description", description);
		formData.append("tags", tags);

		files.forEach((file) => {
			formData.append("notes", file);
		});

		try {
			const response = await axios.post("/api/posts/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			if (response.status === 201) {
				toast({
					title: "Success",
					description:
						response.data.message || "Post created successfully",
					variant: "success",
				});

				// Reset form
				setTitle("");
				setDescription("");
				setTags("");
				setFiles([]);
				setIsPublished(true);
			}
		} catch (error) {
			console.error("Error creating post:", error);

			toast({
				title: "Error",
				description:
					error.response?.data?.message ||
					"Failed to create post. Please try again.",
				variant: "destructive",
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="default">New Post</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-4xl">
				<form onSubmit={handleSubmit}>
					<DialogHeader>
						<DialogTitle>Add a new post</DialogTitle>
						<DialogDescription>
							Fill in the details for your new post.
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-4 py-4">
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="title" className="text-right">
								Title
							</Label>
							<Input
								id="title"
								className="col-span-3"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="description" className="text-right">
								Description
							</Label>
							<Textarea
								id="description"
								className="col-span-3"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="tags" className="text-right">
								Tags
							</Label>
							<Input
								id="tags"
								className="col-span-3"
								value={tags}
								onChange={(e) => setTags(e.target.value)}
								placeholder="Enter tags separated by commas"
							/>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="notes" className="text-right">
								Notes
							</Label>
							<div className="col-span-3">
								<FileUploaderSingleUpload
									onChange={(files) => setFiles(files)}
								/>
							</div>
						</div>
						<div className="grid grid-cols-4 items-center gap-4">
							<Label htmlFor="isPublished" className="text-right">
								Publish
							</Label>
							<Switch
								id="isPublished"
								checked={isPublished}
								onCheckedChange={setIsPublished}
							/>
						</div>
					</div>
					<DialogFooter>
						<Button type="submit">Add Post</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
