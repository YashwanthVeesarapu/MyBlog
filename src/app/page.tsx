import "./page.scss";

import MainLayout from "./../layouts/MainLayout";
import { apiInstance } from "@/utils/apiInstance";
import Link from "next/link";
import { Blog } from "@/models/blog.model";

export default async function Home() {
  const data = await getData();

  return (
    <MainLayout>
      <div className="blogs">
        <p>Welcome to Blog by Redsols</p>
        {data.map((element: Blog) => (
          <Link
            key={element.title}
            href={`blog/${element.title.split(" ").join("-")}/`}
          >
            {element.title}
          </Link>
        ))}
        <div className="center"></div>
      </div>
    </MainLayout>
  );
}

const getData = async () => {
  const data = await apiInstance.get("/blogs").then((res) => res.data);

  return data;
};
