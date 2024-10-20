import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. It is our policy to respect your privacy
        regarding any information we may collect from you across our website,
        and other sites we own and operate.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Information We Collect</h2>
      <p className="mb-4">
        We may collect personal information from you in a variety of ways,
        including when you visit our site, register on the site, place an order,
        subscribe to the newsletter, respond to a survey, or fill out a form.
      </p>
      <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
      <p className="mb-4">
        We may use the information we collect from you in the following ways:
      </p>
      <ul className="list-disc ml-6 mb-4">
        <p>To improve customer service</p>
        <p>To personalize user experience</p>
        <p>To process transactions</p>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify you
        about significant changes in the way we treat personal information by
        sending a notice to the primary email address specified in your account
        or by placing a prominent notice on our site.
      </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
