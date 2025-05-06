import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Welcome to Fengshui Master's Privacy Policy. This page informs you of our policies regarding the collection,
            use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
          </p>
          <p>
            <strong>Information Collection and Use:</strong> We collect several different types of information for various purposes
            to provide and improve our Service to you. This may include birthdate information solely for the purpose of
            generating your Ba Zi chart and Feng Shui recommendations. We do not store your full birthdate after processing.
            If you proceed to checkout, we will collect necessary shipping and payment information to fulfill your order.
          </p>
          <p>
            <strong>Data Usage:</strong> Your Ba Zi information is used anonymously to power the AI recommendations. Shipping and
            payment data are used solely for order processing and fulfillment. We do not sell or share your personal
            information with third parties for marketing purposes.
          </p>
           <p>
            <strong>Security:</strong> The security of your data is important to us, but remember that no method of transmission over
            the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable
            means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
          <p>
            <strong>Changes to This Privacy Policy:</strong> We may update our Privacy Policy from time to time. We will notify you
            of any changes by posting the new Privacy Policy on this page.
          </p>
          <p>
            <strong>Contact Us:</strong> If you have any questions about this Privacy Policy, please contact us.
            [Contact Information Placeholder]
          </p>
           <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
