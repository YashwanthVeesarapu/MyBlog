import MainLayout from "@/layouts/MainLayout";
import React from "react";

import "./styles.scss";

const page = () => {
  return (
    <MainLayout>
      <div className="privacy">
        <h1>Privacy Policy</h1>

        <p>
          This Privacy Policy describes how we collect, use, and handle your
          personal information when you use our services or visit our website.
        </p>

        <h2>Information We Collect</h2>

        <p>We may collect the following types of information:</p>

        <ul>
          <li>
            Your name, email address, and other contact details when you sign up
            for our services.
          </li>
          <li>
            Information about your usage of our services, such as log data, IP
            address, and device information.
          </li>
          <li>
            Any other information you choose to provide to us voluntarily.
          </li>
        </ul>

        <h2>How We Use Your Information</h2>

        <p>We use the collected information for the following purposes:</p>

        <ul>
          <li>To provide and maintain our services.</li>
          <li>To improve, personalize, and enhance your experience.</li>
          <li>To respond to your inquiries, comments, or feedback.</li>
          <li>
            To send you updates, promotions, and other relevant information.
          </li>
        </ul>

        <h2>Data Processing on Our Servers</h2>

        <p>
          All data is processed on our servers, and we do not use third-party
          services for this purpose. We take measures to ensure the security and
          confidentiality of your information.
        </p>

        <h2>Security</h2>

        <p>
          We prioritize the security of your personal information and take
          reasonable measures to protect it. However, no method of transmission
          over the internet or electronic storage is completely secure, and we
          cannot guarantee absolute security.
        </p>

        <h2>Changes to This Privacy Policy</h2>

        <p>
          We reserve the right to update or change our Privacy Policy at any
          time. Any changes will be effective immediately upon posting the
          updated Privacy Policy on our website.
        </p>

        <p>
          If you have any questions about this Privacy Policy, please contact us
          at blog@redsols.com.
        </p>
      </div>
    </MainLayout>
  );
};

export default page;
