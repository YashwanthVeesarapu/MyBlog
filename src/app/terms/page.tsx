import MainLayout from "@/layouts/MainLayout";
import React from "react";

import "./styles.scss";

const page = () => {
  return (
    <MainLayout>
      <div className="terms">
        <h1>Terms of Service</h1>
        <p>
          By using our services, you agree to comply with and be bound by the
          following terms and conditions. Please read these terms carefully
          before using our services.
        </p>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using our services, you agree to be bound by these
          Terms of Service. If you do not agree to all the terms and conditions,
          you must not use our services.
        </p>
        <h2>2. User Responsibilities</h2>
        <p>When using our services, you agree not to:</p>
        <ul>
          <li>Violate any applicable laws or regulations.</li>
          <li>Interfere with the proper functioning of our services.</li>
          <li>
            Engage in any activity that may compromise the security of our
            systems.
          </li>
          <li>Submit false or misleading information.</li>
        </ul>
        <h2>3. Intellectual Property</h2>
        <p>
          All content and materials available on our services, including but not
          limited to text, graphics, logos, images, and software, are the
          property of Redsols and are protected by applicable intellectual
          property laws.
        </p>
        <h2>4. Privacy</h2>
        <p>
          Your use of our services is also governed by our Privacy Policy.
          Please review our Privacy Policy to understand how we collect, use,
          and disclose your personal information.
        </p>
        <h2>5. Changes to Terms</h2>
        <p>
          We reserve the right to update or modify these Terms of Service at any
          time without prior notice. Your continued use of our services after
          any changes constitutes acceptance of the updated terms.
        </p>
        <h2>6. Contact Us</h2>
        <p>
          If you have any questions or concerns about these Terms of Service,
          please contact us at blog@redsols.com.
        </p>
      </div>
    </MainLayout>
  );
};

export default page;
