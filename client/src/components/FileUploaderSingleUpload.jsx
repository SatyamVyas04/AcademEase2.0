import React from "react";
import { Pane, FileUploader, FileCard } from "evergreen-ui";

export function FileUploaderSingleUpload({ onChange }) {
	const [files, setFiles] = React.useState([]);
	const [fileRejections, setFileRejections] = React.useState([]);

	const handleChange = React.useCallback(
		(files) => {
			setFiles([files[0]]);
			onChange([files[0]]); // Pass the selected file to the parent component
		},
		[onChange]
	);

	const handleRejected = React.useCallback((fileRejections) => {
		setFileRejections([fileRejections[0]]);
	}, []);

	const handleRemove = React.useCallback(() => {
		setFiles([]);
		setFileRejections([]);
		onChange([]); // Inform the parent component that the file has been removed
	}, [onChange]);

	return (
		<Pane maxWidth={654}>
			<FileUploader
				label="Upload File"
				description="You can upload 1 file. File can be up to 50 MB."
				maxSizeInBytes={50 * 1024 ** 2}
				maxFiles={1}
				onChange={handleChange}
				onRejected={handleRejected}
				renderFile={(file) => {
					const { name, size, type } = file;
					const fileRejection = fileRejections.find(
						(fileRejection) => fileRejection.file === file
					);
					const { message } = fileRejection || {};
					return (
						<FileCard
							key={name}
							isInvalid={fileRejection != null}
							name={name}
							onRemove={handleRemove}
							sizeInBytes={size}
							type={type}
							validationMessage={message}
						/>
					);
				}}
				values={files}
			/>
		</Pane>
	);
}
