import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Page({ theme }) {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const params = new useParams();

  useEffect(() => {
    const handlePostPage = async (id) => {
      setIsLoading(true);
      await fetch(`https://dummyapi.io/data/v1/post/${id}`, {
        headers: {
          accept: "application/json, text/plain, */*",
          "app-id": "62a3097faef5059fdc0b3c55",
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
      setIsLoading(false);
    };
    handlePostPage(params.id);
  }, []);

  if (isLoading) {
    return <div className="loader"></div>;
  }

  return (
    <div
      className={`${
        theme == "light" ? "bg-white" : "bg-black"
      }  py-10 w-full h-[100vh] flex justify-center pb-20 `}
    >
      {data && (
        <div
          className={`flex flex-col gap-4 shadow-md md:w-1/2 w-3/4 h-min  ${
            theme == "light" ? "bg-white" : "bg-gray-700"
          }`}
        >
          <img src={data.image} alt="" />
          <span className="text-gray-500 text-lg px-8 pb-4">
            {data?.text} -{" "}
            {data?.owner?.firstName + " " + data?.owner?.lastName}
          </span>
        </div>
      )}
    </div>
  );
}
