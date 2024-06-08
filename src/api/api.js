import axios from 'axios';


const accessToken = localStorage.getItem("accessToken")
const refreshToken = localStorage.getItem("refreshToken")

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Replace with your actual API base URL
  headers: { Authorization: `Bearer ${accessToken}` },
});


// Video Comments
export const getVideoComments = (videoId) => api.get(`/comments/${videoId}`);
export const addComment = (videoId, commentData) => api.post(`/comments/${videoId}`, commentData);

// Comment Actions
export const deleteComment = (commentId) => api.delete(`/comments/c/${commentId}`);
export const updateComment = (commentId, commentData) => api.patch(`/comments/c/${commentId}`, commentData);

// Channel Stats and Videos
export const getChannelStats = () => api.get('/dashboard/stats');
export const getChannelVideos = () => api.get('/dashboard/videos');

// Health Check
export const healthcheck = () => api.get('/healthcheck/');

// Toggle Likes
export const toggleVideoLike = (videoId) => api.post(`/toggle/v/${videoId}`);
export const toggleCommentLike = (commentId) => api.post(`/toggle/c/${commentId}`);
export const toggleTweetLike = (tweetId) => api.post(`/toggle/t/${tweetId}`);

// Playlist
export const createPlaylist = (playlistData) => api.post('/playlist/', playlistData);
export const getPlaylistById = (playlistId) => api.get(`/playlist/${playlistId}`);
export const updatePlaylist = (playlistId, playlistData) => api.patch(`/playlist/${playlistId}`, playlistData);
export const deletePlaylist = (playlistId) => api.delete(`/playlist/${playlistId}`);
export const addVideoToPlaylist = (videoId, playlistId) => api.patch(`/playlist/add/${videoId}/${playlistId}`);
export const removeVideoFromPlaylist = (videoId, playlistId) => api.patch(`/playlist/remove/${videoId}/${playlistId}`);

// Subscription
export const getSubscribedChannels = (channelId) => api.get(`/subscriptions/c/${channelId}`);
export const toggleSubscription = (channelId) => api.post(`/subscriptions/c/${channelId}`);
export const getUserChannelSubscribers = (subscriberId) => api.get(`/subscriptions/u/${subscriberId}`);

// Tweet
export const createTweet = (tweetData) => api.post('/tweet/', tweetData);
export const getUserTweets = (userId) => api.get(`/tweet/user/${userId}`);
export const updateTweet = (tweetId, tweetData) => api.patch(`/tweet/${tweetId}`, tweetData);
export const deleteTweet = (tweetId) => api.delete(`/tweet/${tweetId}`);

// User Registration and Login
export const registerUser = (formData) =>
  api.post('/users/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const loginUser = (loginData) => api.post('/users/login', loginData);

// Secured Routes
export const logoutUser = () => api.post('/users/logout', {});
export const refreshAccessToken = () => api.post('/users/refresh-token', { refreshToken });
export const changeCurrentPassword = (passwordData) =>
  api.post('/users/change-password', passwordData);
export const getCurrentUser = () => api.get('/users/current-user');
export const updateAccountDetails = ( accountData) =>
  api.patch('/users/update-account', accountData);
export const updateUserAvatar = ( formData) =>
  api.patch('/users/avatar', formData, { headers: {  'Content-Type': 'multipart/form-data' } });
export const updateUserCoverImage = ( formData) =>
  api.patch('/users/cover-image', formData, { headers: {  'Content-Type': 'multipart/form-data' } });

// User Channel Profile and History
export const getUserChannelProfile = ( username) =>
  api.get(`/users/c/${username}`);
export const getWatchHistory = () => api.get('/users/history');

// Videos
export const getAllVideos = () => api.get('/videos/');
export const uploadAVideo = (formData) =>
  api.post('/videos', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getVideoById = (videoId) => api.get(`/videos/${videoId}`);
export const deleteVideo = (videoId) => api.delete(`/videos/${videoId}`);
export const updateVideo = (videoId, formData) =>
  api.patch(`/videos/${videoId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const togglePublishStatus = (videoId) => api.patch(`/videos/toggle/publish/${videoId}`);
