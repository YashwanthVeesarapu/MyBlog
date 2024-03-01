const SERVER_URL = "https://api.redash.us/blogs/";

export default async function sitemap() {
  const call = await fetch(SERVER_URL);
  const blogs = await call.json();

  const URL = "https://blog.redsols.us/";

  // const currentDate = new Date();
  // const formattedDate = currentDate.toISOString().split("T")[0];

  const blogsSitemap = blogs.map(({ title }: any) => {
    return {
      url: URL + "blog/" + title.split(" ").join("-") + "/",
      lastModified: new Date(),
      priority: 0.8,
      changeFrequency: "weekly",
    };
  });

  return [
    {
      url: URL,
      lastModified: new Date(),
      changeFrequency: "daily",
    },
    ...blogsSitemap,
  ];
}
