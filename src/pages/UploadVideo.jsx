import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadAVideo } from '../api/api';
import { useNavigate } from 'react-router-dom';

function UploadVideo() {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [videoPreview, setVideoPreview] = useState(null);
    const [thumbnailPreview, setThumbnailPreview] = useState(null);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("videoFile", data.videoFile[0]);
        formData.append("thumbnail", data.thumbnail[0]);
        formData.append("title", data.title);
        formData.append("description", data.description);
        
        uploadAVideo(formData)
            .then((res) => {
                console.log(res);
                navigate("/");
            })
            .catch(error => {
                console.error(error);
            });
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
                        {...register("videoFile")} 
                        onChange={handleVideoFileChange}
                        className="block w-full border border-gray-300 p-2 rounded"
                    />
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
                        {...register("thumbnail")} 
                        onChange={handleThumbnailChange}
                        className="block w-full border border-gray-300 p-2 rounded"
                    />
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
                        {...register("title")} 
                        className="block w-full border border-gray-300 p-2 rounded"
                    />
                </div>

                {/* Description Input */}
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <textarea 
                        id="description" 
                        {...register("description")} 
                        className="block w-full border border-gray-300 p-2 rounded"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    >
                        Upload Video
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UploadVideo;
