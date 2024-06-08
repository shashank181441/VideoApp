import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getVideoById } from '../api/api';

function VideoPage() {
    const { videoId } = useParams();
    console.log(videoId);

    const { data: video, isLoading, error } = useQuery({
        queryKey: ['video', videoId],
        queryFn: async () => {
            const response = await getVideoById(videoId);
            return response;
        }
    });

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto py-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-3xl font-semibold mb-4">{video.data.data.title}</h1>
                    <div className="relative pb-56 h-96">
                        <video
                            src={video.data.data.videoFile}
                            controls
                            className="absolute inset-0 w-full h-full object-fit rounded-lg"
                        ></video>
                    </div>
                    <div className="mt-6 flex items-center">
                        <img
                            className="w-12 h-12 rounded-full mr-4"
                            src={video.data.data.owner.avatar}
                            alt={`${video.data.data.owner.username} Avatar`}
                        />
                        <div>
                            <p className="text-gray-900 font-semibold">{video.data.data.owner.fullName}</p>
                            <p className="text-gray-600">@{video.data.data.owner.username}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-600">{video.data.data.description}</p>
                    </div>
                    <div className="mt-4 flex justify-between text-gray-600">
                        <span>Views: {video.data.data.views}</span>
                        <span>Duration: {video.data.data.duration.toFixed(2)} mins</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoPage;
