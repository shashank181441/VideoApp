import { toggleSubscription } from "@/api/api";
import React from "react";
import { useSelector } from "react-redux";

function SubscribeButton({ channelId, user, userRefetch }) {
  const { status } = useSelector((store) => store.auth);

  const subToggle = () => {
    toggleSubscription(channelId)
      .then((res) => {
        console.log(res.data.message);
        userRefetch();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="overflow-hidden">
      <button
        onClick={subToggle}
        disabled={!status}
        className="inline-flex items-center py-2 px-4 bg-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-white rounded-xl transition duration-300"
      >
        <svg className="w-6 h-6 fill-current mr-2" viewBox="0 0 24 24">
          <path d="M21.9 5.9c-.2-.7-.7-1.2-1.4-1.4C18.3 4 12 4 12 4s-6.3 0-8.5.5c-.7.2-1.2.7-1.4 1.4C2 8.1 2 12 2 12s0 3.9.5 5.1c.2.7.7 1.2 1.4 1.4 2.2.5 8.5.5 8.5.5s6.3 0 8.5-.5c.7-.2 1.2-.7 1.4-1.4.5-1.2.5-5.1.5-5.1s0-3.9-.5-5.1zM9.5 15.5V8.5l6.5 3z" />
        </svg>
        <span>{user.isSubscribed ? "Unsubscribe" : "Subscribe"}</span>
      </button>
    </div>
  );
}

export default SubscribeButton;
