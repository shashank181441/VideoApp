import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllVideos } from '../api/api'
import VideoBox from '../components/VideoBox'

function Home() {
    const {data: videos, error, isLoading} = useQuery({
        queryKey: ['videos'],
        queryFn: async () => {
            const response = await getAllVideos()
            return response
        }
    })
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error.message}</div>
  return (
    <div className='flex flex-wrap'>
        {/* {console.log(videos.data.data)} */}
        {videos.data.data.map(video => (
            <VideoBox video={video} key={video._id}/>
        ))}
    </div>
  )
}

export default Home