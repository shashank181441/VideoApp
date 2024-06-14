import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
    const formatDuration = (duration) => {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.floor(duration % 60);
        return `${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-lg sm:w-full md:w-[40vw] lg:w-[20vw] w-[350px] mt-10 bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:bg-gray-200 m-2">
            <Link to={`/videoPage/${video._id}`} className="relative pb-[56.25%] block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={video.thumbnail}
                    alt={video.title}
                />
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white font-bold text-xs px-1 py-0.5 rounded">
                    {formatDuration(video.duration)}
                </span>
            </Link>
            <div className="p-4">
                <Link to={`/channelPage/${video.owner._id}`} className="flex items-center mb-4">
                    <img
                        className="w-10 h-10 rounded-full mr-4"
                        src={video.owner.avatar}
                        alt={`${video.owner.username} Avatar`}
                    />
                    <div className="text-sm">
                        <p className="text-gray-900 font-bold">{video.owner.fullName}</p>
                    </div>
                </Link>
                <Link to={`/videoPage/${video._id}`}>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">{video.title}</h2>
                    <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                        <span>Views: {video.views}</span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default VideoCard;
