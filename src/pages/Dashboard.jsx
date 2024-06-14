import { getChannelStats } from '@/api/api'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

function Dashboard() {
    const { data: dashContent, isLoading, error } = useQuery({
        queryKey: ['dashContent'],
        queryFn: () =>
            getChannelStats()
                .then((res) => {
                    console.log(res.data.data)
                    return res.data.data
                })
                .catch((err) => {
                    console.log(err)
                    throw new Error(err)
                })
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Total Subscribers</h2>
                    <p className="text-3xl">{dashContent.totalSubscribers}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Total Likes</h2>
                    <p className="text-3xl">{dashContent.totalLikes}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Total Views</h2>
                    <p className="text-3xl">{dashContent.totalViews}</p>
                </div>
                <div className="bg-white shadow rounded-lg p-4">
                    <h2 className="text-xl font-semibold">Total Videos</h2>
                    <p className="text-3xl">{dashContent.totalVideos}</p>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
