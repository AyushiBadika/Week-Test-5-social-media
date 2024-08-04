import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Page() {
  const [data, setData] = useState({});
  const params = new useParams();

  useEffect(() => {
    const handlePostPage = async (id) => {
      await fetch(`https://dummyapi.io/data/v1/post/${id}`, {
        headers: {
          accept: "application/json, text/plain, */*",
          "app-id": "62a3097faef5059fdc0b3c55",
        },
      })
        .then((res) => res.json())
        .then((data) => setData(data));
    };
    handlePostPage(params.id);
  }, []);

  return (
    <div className="w-1/2 shadow-md">
      {data && (
        <div className="flex flex-col gap-4">
          <img src={data.image} alt="" />
          <span className="text-gray-500 text-lg p-8">
            {data?.text} -{" "}
            {data?.owner?.firstName + " " + data?.owner?.lastName}
          </span>
        </div>
      )}
    </div>
  );
}
