import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getUserChannelDetails, getVideoById, toggleSubscription } from '../api/api';
import Comments from '../components/Comments';
import { useSelector } from 'react-redux';
import LikeVideo from '../components/LikeVideo';
import SubscribeButton from '@/components/SubscribeButton';

function VideoPage() {
    const { videoId } = useParams();

    const { data: video, isLoading, error } = useQuery({
        queryKey: ['video', videoId],
        queryFn: async () => {
            const response = await getVideoById(videoId);
            return response;
        }
    });

    const {data: user, isLoading: isUserLoading, error: userError, refetch: userRefetch} = useQuery({
        queryKey:['user'],
        queryFn: ()=> getUserChannelDetails(video?.data.data.owner.username),
        enabled: !!video?.data.data.owner.username
    })
    const subToggle = ()=>{
        toggleSubscription(video?.data?.data.owner._id)
        .then((res)=>{
            console.log(res.data.message)
            userRefetch()
        })
        .catch(err=>console.log(err))
    }
    

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
                    {isUserLoading ? <div>Loading...</div> : (
                    <div className='justify-between flex items-center'>
                    <Link to={`/channelPage/${user.data.data._id}`} className="mt-6 flex items-center">
                        <img
                            className="w-12 h-12 rounded-full mr-4"
                            src={user.data.data.avatar}
                            alt={`${user.data.data.username} Avatar`}
                        />
                        <div>
                            <p className="text-gray-900 font-semibold">{user.data.data.fullName}</p>
                            <p className="text-gray-600">@{user.data.data.username}</p>
                        </div>
                    </Link>
                    <div className='items-center justify-center'>
                        <LikeVideo videoId={video.data.data._id} initialIsLiked={video.data.data.isLiked}/>
                    </div>
                    {/* <button 
                        disabled={!status}
                        onClick={subToggle}
                        className={`bg-gray-500 text-white px-4 py-1 my-4 rounded ${!status ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600 transition duration-200'}`}>
                            {user.data.data.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                    </button> */}
                    <SubscribeButton 
                    channelId={video.data.data.owner._id} 
                    user={user.data.data}
                    userRefetch={userRefetch    }
                    />
                    </div>
                    )}
                    
                    <div className="mt-4">
                        <p className="text-gray-600">{video.data.data.description}</p>
                    </div>
                    <div className="mt-4 flex justify-between text-gray-600">
                        <span>Views: {video.data.data.views}</span>
                        <span>Duration: {video.data.data.duration.toFixed(2)} mins</span>
                    </div>
                    <hr className='my-4' />
                    <Comments video={video.data.data._id}/>
                </div>

            </div>
        </div>
    );
}

export default VideoPage;
