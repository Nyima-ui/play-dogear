import React from "react";

const AIMessage = () => {
  return (
    <p className="max-w-xl mt-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
      dolorem mollitia et aut quidem labore libero. Adipisci in odio delectus!
    </p>
  );
};

const HumanMessage = () => {
  return (
    <p className="mt-5 bg-gray-800 max-w-md ml-auto px-2 py-1">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, numquam!
    </p>
  );
};

const Chat = () => {
  return (
    <div className="h-80 w-200 border mt-20 px-5 py-7 relative overflow-auto flex flex-col">
      <div className="flex-1">

      </div>
      <button className="border px-2 py-1 rounded-md sticky bottom-0 float-right grow-0 cursor-pointer hover:scale-102 transition-transform ease-in duration-100 bg-black self-end">
        Speak
      </button>
    </div>
  );
};

export default Chat;
