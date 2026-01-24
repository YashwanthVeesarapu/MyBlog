import MainLayout from "@/layouts/MainLayout";
import React from "react";

import "./styles.scss";

const page = () => {
  return (
    <MainLayout>
      <div className="about">
        <h2>About</h2>
        <p>
          Welcome to Redsols Blog, the official knowledge hub from Redsols. We
          share practical insights, research-driven perspectives, and guidance
          designed to help teams and professionals navigate modern technology
          and digital work.
        </p>
        <p>
          Our goal is to deliver clear, actionable content across software
          engineering, product thinking, and productivity. We focus on topics
          that help readers make better decisions, build reliable solutions, and
          stay current in a fast-moving industry.
        </p>
        <p>
          Every article is shaped by real-world experience and a commitment to
          quality. We prioritize clarity over hype and aim to provide resources
          you can apply immediately, whether you&apos;re leading a team or
          sharpening your own skills.
        </p>

        <p>
          Redsols Blog is also a space for thoughtful dialogue. We welcome
          feedback, questions, and collaboration from our readers and partners
          as we continue to expand the content and areas we cover.{" "}
        </p>

        <p>
          Whether you&apos;re a product leader, a developer, or a business
          stakeholder, our aim is to provide a trusted source of perspective and
          practical guidance.{" "}
        </p>
        <p>
          Thank you for reading and for being part of the Redsols community. We
          look forward to connecting and sharing what we learn.
        </p>

        <br />
        <h3>Contact Us</h3>

        <p>
          You can reach out to us via{" "}
          <a href="mailto:blog@redsols.com">blog@redsols.com</a>. We are always
          open to collaborations, suggestions, and discussions.
        </p>
      </div>
    </MainLayout>
  );
};

export default page;
