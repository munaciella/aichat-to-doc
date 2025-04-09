export default function CookiePolicyPage() {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
  
        <p className="mb-4">
          This Cookie Policy explains how we use cookies and similar technologies on our website.
          By using our site, you consent to our use of cookies in accordance with this policy.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">1. What are cookies?</h2>
        <p className="mb-4">
          Cookies are small text files stored on your device when you visit a website. They help
          the site remember information about your visit to improve your experience.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">2. Types of cookies we use</h2>
        <ul className="list-disc list-inside mb-4 space-y-2">
          <li>
            <strong>Essential Cookies:</strong> Required for the website to function properly.
          </li>
          <li>
            <strong>Analytics Cookies:</strong> Help us understand how users interact with the site.
          </li>
          <li>
            <strong>Marketing Cookies:</strong> Used to deliver personalized advertisements and track user behavior.
          </li>
        </ul>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">3. Managing your preferences</h2>
        <p className="mb-4">
          You can manage your cookie preferences at any time via our cookie banner or by adjusting
          settings in your browser.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">4. Third-party cookies</h2>
        <p className="mb-4">
          We may use services like Google Analytics or similar tools that set their own cookies
          to collect usage data. Please refer to their policies for more information.
        </p>
  
        <h2 className="text-xl font-semibold mt-8 mb-2">5. Changes to this policy</h2>
        <p className="mb-4">
          We may update this Cookie Policy occasionally. Any changes will be posted on this page
          with an updated effective date.
        </p>
  
        <p className="text-sm text-indigo-600 dark:text-indigo-400 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </main>
    );
  }
  