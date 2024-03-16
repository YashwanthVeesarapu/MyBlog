import MainLayout from "@/layouts/MainLayout";
import React from "react";

import "./styles.scss";

const page = () => {
  return (
    <MainLayout>
      <div className="about">
        <h2>About</h2>
        <h3>Hi, I&apos;m Yashwanth Veesarapu!</h3>

        <p>
          Welcome to Redsols blog, where I share my thoughts, experiences, and
          passions. I started this blog with the aim to make lives easier.
        </p>

        <p>
          On this platform, you&apos;ll find content that relates to my daily
          life and what I find valuable to share with you. I&apos;m passionate
          about Technology, Daily hacks & Software Development, and I hope to
          educate my readers through my posts.
        </p>

        <p>
          Feel free to connect with me on social media or leave a comment. I
          appreciate your feedback and look forward to building a community
          around shared interests.
        </p>

        <p>Thanks for visiting Redsols blog!</p>

        <br />
        <h3>Contact Me</h3>

        <p>
          You can reach out to me via{" "}
          <a href="mailto:yash@redsols.us">yash@redsols.us</a>. I&apos;m always
          open to collaborations, suggestions, and discussions.
        </p>
      </div>
    </MainLayout>
  );
};

export default page;
