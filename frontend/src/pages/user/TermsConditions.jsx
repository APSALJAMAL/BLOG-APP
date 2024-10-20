import React from 'react';

const TermsConditions = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
      <h1 className="text-4xl font-bold mb-4 text-center">Terms & Conditions</h1>
        <p className="mb-4">
          Welcome to Jamal's Blog! By accessing or using our website, you agree to be bound by these terms and conditions.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Use of Content</h2>
        <p className="mb-4">
          The content on Jamal's Blog is for informational purposes only. You may not reproduce, distribute, or exploit our content without prior permission.
        </p>
        <h2 className="text-2xl font-semibold mb-2">User Conduct</h2>
        <p className="mb-4">
          You agree to use our blog in a lawful manner. Any attempt to harm our website or interfere with its functionality will result in termination of access.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Disclaimer</h2>
        <p className="mb-4">
          The views expressed on this blog are the opinions of the author and do not reflect official positions. Jamal's Blog is not responsible for any errors or omissions in the content.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Changes to the Terms</h2>
        <p className="mb-4">
          We reserve the right to update these terms at any time. Continued use of our blog after changes will constitute acceptance of the new terms.
        </p>
        <p className="mb-4">Thank you for visiting Jamal's Blog!</p>
      </div>
    </div>
  );
};

export default TermsConditions;
