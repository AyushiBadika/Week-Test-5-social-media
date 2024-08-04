import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export default function Posts({ theme }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let page = 0;
  const [like, setLike] = useState(false);
  async function fetchPostData() {
    setIsLoading(true);
    const response = await fetch(
      `https://dummyapi.io/data/v1/post?page=${page}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "app-id": "62a3097faef5059fdc0b3c55",
        },
      }
    ).then((res) => res.json());
    console.log(response.data);
    setData(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchPostData();
  }, []);

  const handleLike = () => {
    setLike(!like);
  };
  const handleMoreData = async () => {
    page += 1;
    const response = await fetch(
      `https://dummyapi.io/data/v1/post?page=${page}`,
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "app-id": "62a3097faef5059fdc0b3c55",
        },
      }
    ).then((res) => res.json());
    console.log(response.data);
    setData((prev) => [...prev, ...response.data]);
  };
  console.log(theme);

  if (isLoading) {
    return <div className="loader"></div>;
  }
  return (
    <div
      className={`${
        theme == "light" ? "bg-white" : "bg-black"
      }  w-full flex flex-col gap-4 items-center pt-20`}
    >
      {data?.length > 0 &&
        data.map((dataEl) => {
          return (
            <div
              key={dataEl.id}
              className={`shadow-md rounded-sm md:w-1/2 w-3/4 ${
                theme == "light" ? "bg-white" : "bg-gray-700"
              }`}
            >
              <div className="flex gap-8 items-center p-3">
                <img
                  src={dataEl.owner.picture}
                  alt=""
                  className="w-14 h-14 rounded-full"
                />
                <div
                  className={`flex flex-col ${
                    theme === "light" ? "text-black" : "text-white"
                  } `}
                >
                  <span>{dataEl.owner.firstName + dataEl.owner.lastName}</span>
                  <span className="text-gray-400 text-sm">
                    {dataEl.publishDate}
                  </span>
                </div>
              </div>
              <img src={dataEl.image} alt="" />
              <div className="flex flex-col gap-4 p-4">
                <span className="text-gray-500">{dataEl.text}</span>
                <div className="flex  gap-4 flex-wrap">
                  {dataEl.tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`border rounded-xl px-4  ${
                        theme === "light" ? "text-black" : "text-white"
                      } `}
                    >
                      #{tag}
                    </div>
                  ))}
                </div>
                <div className="flex  justify-between items-center">
                  <div className="flex gap-4 items-center">
                    {like ? (
                      <img
                        src="../src/assets/likedHeart.png"
                        className="w-5 h-5"
                        onClick={handleLike}
                      />
                    ) : (
                      <img
                        src="../src/assets/heart.png"
                        alt=""
                        className="w-5 h-5"
                        onClick={handleLike}
                      />
                    )}
                    <span
                      className={`${
                        theme === "light" ? "text-black" : "text-white"
                      } `}
                    >
                      {like ? dataEl.likes + 1 : dataEl.likes} likes
                    </span>
                  </div>
                  <Link to={`/${dataEl.id}`}>
                    <img
                      src="../src/assets/comment.png"
                      alt=""
                      className="w-5 h-5"
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleMoreData}
      >
        Load More
      </button>
    </div>
  );
}
