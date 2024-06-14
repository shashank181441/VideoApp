import { getWatchHistoryVideos } from '@/api/api';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useSelector } from 'react-redux';
import WatchHistoryCard from '../components/WatchHistoryCard';

function WatchHistory() {
    const { data: watchHistoryList, isLoading, error } = useQuery({
        queryKey: ['watchHistory'],
        queryFn: async () => {
            const response = await getWatchHistoryVideos();
            return response.data.data;
        }
    });

    if (isLoading) return <h1>Loading...</h1>;
    if (error) return <h1>Error: {error.message}</h1>;

    return (
        <div className="flex flex-wrap justify-center">
            {watchHistoryList.map((video) => (
                <WatchHistoryCard key={video._id} video={video} />
            ))}
        </div>
    );
}

export default WatchHistory;
