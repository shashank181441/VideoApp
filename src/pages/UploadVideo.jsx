import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadAVideo } from '../api/api';
import { useNavigate } from 'react-router-dom';

function UploadVideo() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [videoPreview, setVideoPreview] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const onSubmit = async (data) => {
        setLoading(true); // Show loading overlay
        setErrorMessage(null); // Clear any previous errors

        const formData = new FormData();
        formData.append("videoFile", data.videoFile[0]);
        formData.append("thumbnail", data.thumbnail[0]);
        formData.append("title", data.title);
        formData.append("description", data.description);

        try {
            const res = await uploadAVideo(formData);
            console.log(res);
            navigate("/");
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while uploading the video. Please try again.");
        } finally {
            setLoading(false); // Hide loading overlay
        }
    };

    // Function to handle video file change and display preview
    const handleVideoFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setVideoPreview(URL.createObjectURL(file));
        }
    };

    // Function to handle thumbnail file change and display preview
    const handleThumbnailChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setThumbnailPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-semibold mb-4">Upload Video</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
                {/* Video File Input */}
                <div className="mb-4">
                    <label htmlFor="videoFile" className="block mb-2">Video File</label>
                    <input 
                        type="file" 
                        id="videoFile" 
                        {...register("videoFile", { required: true })} 
                        onChange={handleVideoFileChange}
                        className="block w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.videoFile && <p className="text-red-500">Video file is required.</p>}
                    {videoPreview && (
                        <video src={videoPreview} controls className="mt-2 max-w-full h-auto" />
                    )}
                </div>
                
                {/* Thumbnail File Input */}
                <div className="mb-4">
                    <label htmlFor="thumbnail" className="block mb-2">Thumbnail</label>
                    <input 
                        type="file" 
                        id="thumbnail" 
                        {...register("thumbnail", { required: true })} 
                        onChange={handleThumbnailChange}
                        className="block w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.thumbnail && <p className="text-red-500">Thumbnail is required.</p>}
                    {thumbnailPreview && (
                        <img src={thumbnailPreview} alt="Thumbnail Preview" className="mt-2 max-w-full h-auto" />
                    )}
                </div>

                {/* Title Input */}
                <div className="mb-4">
                    <label htmlFor="title" className="block mb-2">Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        {...register("title", { required: true })} 
                        className="block w-full border border-gray-300 p-2 rounded"
                    />
                    {errors.title && <p className="text-red-500">Title is required.</p>}
                </div>

                {/* Description Input */}
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <textarea 
                        id="description" 
                        {...register("description", { required: true })} 
                        className="block w-full border border-gray-300 p-2 rounded"
                    ></textarea>
                    {errors.description && <p className="text-red-500">Description is required.</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        disabled={loading} // Disable button while loading
                    >
                        {loading ? 'Uploading...' : 'Upload Video'}
                    </button>
                </div>
            </form>

            {/* Error Message */}
            {errorMessage && (
                <div className="mt-4 text-red-500 text-center">
                    {errorMessage}
                </div>
            )}

            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="spinner-border text-white" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UploadVideo;
