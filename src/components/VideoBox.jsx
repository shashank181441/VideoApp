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
        <Link to={`/videoPage/${video._id}`} className="max-w-lg w-64 mt-10 bg-white rounded-lg shadow-md overflow-hidden p-2 m-2">
            <div className="relative pb-56">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src={video.thumbnail}
                    alt={video.title}
                />
                <span className='absolute bottom-2 right-2 bg-black opacity-60 text-white font-bold text-xs px-1 py-0.5 rounded'>
                {formatDuration(video.duration)}
                </span>
            </div>
            <div className="p-4">
                <div className="flex items-center mb-4">
                    <img
                        className="w-10 h-10 rounded-full mr-4"
                        src={video.ownerDetails.avatar}
                        alt={`${video.ownerDetails.username} Avatar`}
                    />
                    <div className="text-sm">
                        {/* <p className="text-gray-900 leading-none">{video.ownerDetails.username}</p> */}
                        <p className="text-gray-600 font-bold">{video.ownerDetails.fullName}</p>
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold text-gray-900">{video.title}</h2>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                    <span>Views: {video.views}</span>
                </div>
            </div>
        </Link>
    );
};

export default VideoCard;
