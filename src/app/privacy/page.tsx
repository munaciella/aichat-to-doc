export default function PrivacyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-20 text-gray-800 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Effective Date: 26/03/2025</p>

      <p className="mb-4">
        At Paperly, your privacy is important to us. This policy explains how we
        collect, use, and protect your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Information We Collect
      </h2>
      <p className="mb-4">
        We collect personal information you provide (like your email) and usage
        data to improve our services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. How We Use Information
      </h2>
      <p className="mb-4">
        We use your information to operate, maintain, and improve Paperly.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Sharing</h2>
      <p className="mb-4">
        We do not sell or share your personal information with third parties,
        except as required by law or to operate our services (e.g., Clerk for
        authentication, Stripe for payments).
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
      <p className="mb-4">
        We only use essential cookies for authentication and session management.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <p className="mb-4">
        You may contact us to access, correct, or delete your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Contact</h2>
      <p>
        If you have any questions, contact us{" "}
        <a
          href="mailto:francesco.vurchio82@gmail.com"
          className="text-indigo-600 dark:text-indigo-400 underline"
        >
          here
        </a>
        .
      </p>
    </main>
  );
}
