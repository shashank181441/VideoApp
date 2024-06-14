import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toggleVideoLike } from '../api/api';
import { ThumbsUp } from 'lucide-react';

function LikeVideo({ videoId, initialIsLiked }) {
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const { isLoading, error, mutate } = useMutation({
        mutationKey: ['like', videoId],
        mutationFn: async () => {
            const response = await toggleVideoLike(videoId);
            return response;
        },
        onSuccess: (data) => {
            console.log(data.data.message);
            setIsLiked((prev) => !prev);
        },
        onError: (error) => {
            console.log(error.message);
        }
    });

    return (
        <div>
            <button
                onClick={() => mutate()}
                className="flex items-center space-x-2 p-2 rounded-md border border-gray-300 shadow-sm hover:bg-gray-100 transition duration-200"
                disabled={isLoading}
            >
                <ThumbsUp
                    className={`w-6 h-6 ${isLiked ? 'fill-current text-blue-500' : 'text-gray-400'}`}
                />
                {isLoading && <span>Loading...</span>}
            </button>
            {error && <div className="text-red-500 mt-2">Error: {error.message}</div>}
        </div>
    );
}

export default LikeVideo;
