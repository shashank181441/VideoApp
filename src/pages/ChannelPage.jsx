import { getChannelVideos, getUserChannelDetails, getUserChannelVideos } from "@/api/api";
import SubscribeButton from "@/components/SubscribeButton";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

function ChannelPage() {
    const { channelId } = useParams();
    const { userData } = useSelector((store) => store.auth);
    const [userId, setUserId] = useState(channelId || userData?.userData?._id);

    useEffect(() => {
        if (channelId) {
            setUserId(channelId);
        } else {
            setUserId(userData?.userData?._id);
        }
    }, [channelId, userData]);

    const channelFn = () => {
        if (userId) {
            return getUserChannelVideos(userId);
        } else {
            return getChannelVideos();
        }
    };

    const {
        data: channelVideos,
        isLoading: isVideosLoading,
        error: videosError,
    } = useQuery({
        queryKey: ["channelVideos", userId],
        queryFn: () =>
            channelFn()
                .then((res) => res.data.data)
                .catch((err) => {
                    console.error(err);
                    throw new Error(err);
                }),
        enabled: !!userId,
    });

    const {
        data: user,
        isLoading: isUserLoading,
        error: userError, refetch: userRefetch,
    } = useQuery({
        queryKey: ["user", userId],
        queryFn: () =>
            getUserChannelDetails(userId)
                .then((res) => res.data.data)
                .catch((err) => {
                    console.error(err);
                    throw new Error(err);
                }),
        enabled: !!userId,
    });

    if (isVideosLoading || isUserLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Loading...
            </div>
        );
    }

    if (videosError || userError) {
        return (
            <div className="flex items-center justify-center h-screen">
                Error: {videosError?.message || userError?.message}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="relative">
                <img
                    src={user.coverImage}
                    alt="Cover Image"
                    className="w-full h-60 object-cover"
                />
                <div className="absolute bottom-0 left-0 ml-4 mb-4">
                    <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full border-4 border-white"
                    />
                </div>
            </div>
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">{user.fullName}</h1>
                        <p className="text-gray-600">@{user.username}</p>
                    </div>
                    <div>
                        {/* <button className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition duration-200">
                            {user.isSubscribed ? 'Subscribed' : 'Subscribe'}
                        </button> */}

                    <SubscribeButton
                    channelId={userId} 
                    user={user}
                    userRefetch={userRefetch}
                    />
                    </div>
                </div>
                <div className="mt-4 flex space-x-6 text-gray-600">
                    <div>
                        <span className="font-semibold">{user.subscribersCount}</span> Subscribers
                    </div>
                    <div>
                        <span className="font-semibold">{user.channelsSubscribedToCount}</span> Subscribed
                    </div>
                </div>
            </div>
        </div>
        <hr className="p-4"/>
            <h1 className="text-2xl font-bold mb-8">Channel Videos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {channelVideos?.length !== 0 ? (
                    channelVideos.map((video) => (
                        <div key={video._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                            <img src={video.thumbnail} alt={video.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">{video.title}</h2>
                                <p className="text-gray-600 mb-4">{video.description}</p>
                                <div className="flex items-center justify-between text-gray-600 text-sm">
                                    <div>
                                        <span>
                                            {video.createdAt.day}/{video.createdAt.month}/{video.createdAt.year}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                        </svg>
                                        <span>{video.likesCount}</span>
                                    </div>
                                </div>
                                <Link
                                    to={`/videoPage/${video._id}`}
                                    rel="noopener noreferrer"
                                    className="block mt-4 text-center bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                                >
                                    Watch Video
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <h1>No videos uploaded</h1>
                )}
            </div>
        </div>
    );
}

export default ChannelPage;
