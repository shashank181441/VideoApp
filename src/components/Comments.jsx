import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { addComment, deleteComment, getVideoComments, updateComment } from "../api/api";
import LikeComment from "./LikeComment";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";

function Comments({ video }) {
  const queryClient = useQueryClient();
  const {userData} = useSelector(store=>store.auth.userData)
  const userId = userData._id

  const { register, handleSubmit, reset, setValue } = useForm({});
  const { status } = useSelector((store) => store.auth);
  const [editingCommentId, setEditingCommentId] = useState(null); // Track the editing comment

  const {
    data: comments,
    isLoading,
    error: loadError,
  } = useQuery({
    queryKey: ["comments", video._id],
    queryFn: async () => {
      const response = await getVideoComments(video, 1, 20);
      return response;
    },
  });

  const {
    isPending,
    error,
    mutate: addMutate,
  } = useMutation({
    mutationKey: ["addComment"],
    mutationFn: async (data) => {
      const response = await addComment(video, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", video._id] });
      reset();
    },
  });

  const {
    isPending: updatePending,
    error: updateError,
    mutate: updateMutate,
  } = useMutation({
    mutationKey: ["updateComment"],
    mutationFn: async ({ commentId, content }) => {
      const response = await updateComment(commentId, {content});
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", video._id] });
      setEditingCommentId(null); // Clear editing state
      reset();
    },
  });

  const {
    isPending: deletePending,
    error: deleteError,
    mutate: deleteMutate,
  } = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: async (commentId) => {
      const response = await deleteComment(commentId);
      console.log(response.data.message);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", video._id] });
    },
  });

  const onSubmit = async (data) => {
    if (editingCommentId) {
      updateMutate({ commentId: editingCommentId, content: data.content });
    } else {
      addMutate(data.content);
    }
  };

  const handleEdit = (comment) => {
    setValue("content", comment.content); // Set the input value to the comment content
    setEditingCommentId(comment._id); // Set the editing comment ID
  };

  if (isLoading) return <div>Loading...</div>;
  if (loadError) return <div>Error: {loadError.message}</div>;
  if (isPending) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex items-center space-x-4 mt-4"
      >
        <input
          type="text"
          {...register("content")}
          className="flex-grow border border-gray-300 rounded px-3 py-2"
          placeholder="Add a comment..."
        />
        <button
          type="submit"
          disabled={!status}
          className={`bg-green-500 text-white px-4 py-2 rounded ${
            !status
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-600 transition duration-200"
          }`}
        >
          {editingCommentId ? "Update" : "Send"} {/* Change button text based on editing state */}
        </button>
      </form>
      <div>
        {console.log(comments.data.data.docs)}
        {comments.data.data.docs.map((comment) => (
          <div
            key={comment._id}
            className="flex items-start space-x-4 py-4 border-b border-gray-200"
          >
            {/* Avatar */}
            <img
              src={comment.owner.avatar}
              alt={`${comment.owner.username}'s avatar`}
              className="rounded-full w-10 h-10"
            />
            {/* Comment Content */}
            <div className="flex-1">
              <div className="text-sm font-semibold text-gray-900">
                {comment.owner.fullName}
                <span className="text-gray-600 ml-2">
                  @{comment.owner.username}
                </span>
              </div>
              <p className="text-sm text-gray-800">{comment.content}</p>
              <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
                <LikeComment
                  commentId={comment._id}
                  initialIsLiked={comment.isLiked}
                />
              </div>
            </div>
            { comment.owner._id === userId ? 
            (<DropdownMenu>
              <DropdownMenuTrigger>
                <div className="p-2 rounded-full">:</div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  <button
                    className="dropdown-item"
                    onClick={() => handleEdit(comment)} // Call handleEdit with the comment
                  >
                    Edit
                  </button>
                </DropdownMenuLabel>
                <DropdownMenuLabel>
                  <button
                    className="dropdown-item"
                    onClick={() => deleteMutate(comment._id)}
                  >
                    Delete
                  </button>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
            ) : <div></div>
}   
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
