import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api/v1', // Replace with your actual API base URL
});

const accessToken = localStorage.getItem("accessToken")
const refreshToken = localStorage.getItem("refreshToken")

// Video Comments
export const getVideoComments = (videoId) => api.get(`/comments/${videoId}`);
export const addComment = (videoId, commentData) => api.post(`/comments/${videoId}`, commentData);

// Comment Actions
export const deleteComment = (commentId) => api.delete(`/comments/c/${commentId}`);
export const updateComment = (commentId, commentData) => api.patch(`/comments/c/${commentId}`, commentData);

// Channel Stats and Videos
export const getChannelStats = () => api.get('/stats');
export const getChannelVideos = () => api.get('/videos');

// Health Check
export const healthcheck = () => api.get('/');

// Toggle Likes
export const toggleVideoLike = (videoId) => api.post(`/toggle/v/${videoId}`);
export const toggleCommentLike = (commentId) => api.post(`/toggle/c/${commentId}`);
export const toggleTweetLike = (tweetId) => api.post(`/toggle/t/${tweetId}`);

// Playlist
export const createPlaylist = (playlistData) => api.post('/', playlistData);
export const getPlaylistById = (playlistId) => api.get(`/${playlistId}`);
export const updatePlaylist = (playlistId, playlistData) => api.patch(`/${playlistId}`, playlistData);
export const deletePlaylist = (playlistId) => api.delete(`/${playlistId}`);
export const addVideoToPlaylist = (videoId, playlistId) => api.patch(`/add/${videoId}/${playlistId}`);
export const removeVideoFromPlaylist = (videoId, playlistId) => api.patch(`/remove/${videoId}/${playlistId}`);

// Subscription
export const getSubscribedChannels = (channelId) => api.get(`/c/${channelId}`);
export const toggleSubscription = (channelId) => api.post(`/c/${channelId}`);
export const getUserChannelSubscribers = (subscriberId) => api.get(`/u/${subscriberId}`);

// Tweet
export const createTweet = (tweetData) => api.post('/', tweetData);
export const getUserTweets = (userId) => api.get(`/user/${userId}`);
export const updateTweet = (tweetId, tweetData) => api.patch(`/${tweetId}`, tweetData);
export const deleteTweet = (tweetId) => api.delete(`/${tweetId}`);

// User Registration and Login
export const registerUser = (formData) =>
  api.post('/users/register', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const loginUser = (loginData) => api.post('/users/login', loginData);

// Secured Routes
export const logoutUser = () => api.post('/users/logout', null, { headers: { Authorization: `Bearer ${accessToken}` } });
export const refreshAccessToken = () => api.post('/users/refresh-token', { refreshToken });
export const changeCurrentPassword = (passwordData) =>
  api.post('/users/change-password', passwordData, { headers: { Authorization: `Bearer ${accessToken}` } });
export const getCurrentUser = () => api.get('/users/current-user', { headers: { Authorization: `Bearer ${accessToken}` } });
export const updateAccountDetails = ( accountData) =>
  api.patch('/users/update-account', accountData, { headers: { Authorization: `Bearer ${accessToken}` } });
export const updateUserAvatar = ( formData) =>
  api.patch('/users/avatar', formData, { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' } });
export const updateUserCoverImage = ( formData) =>
  api.patch('/users/cover-image', formData, { headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'multipart/form-data' } });

// User Channel Profile and History
export const getUserChannelProfile = ( username) =>
  api.get(`/c/${username}`, { headers: { Authorization: `Bearer ${accessToken}` } });
export const getWatchHistory = () => api.get('/history', { headers: { Authorization: `Bearer ${accessToken}` } });

// Videos
export const getAllVideos = () => api.get('/');
export const publishAVideo = (formData) =>
  api.post('/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getVideoById = (videoId) => api.get(`/${videoId}`);
export const deleteVideo = (videoId) => api.delete(`/${videoId}`);
export const updateVideo = (videoId, formData) =>
  api.patch(`/${videoId}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const togglePublishStatus = (videoId) => api.patch(`/toggle/publish/${videoId}`);
