import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Welcome to Fengshui Master! These terms and conditions outline the rules and regulations for the use of
            Fengshui Master's Website.
          </p>
          <p>
            By accessing this website we assume you accept these terms and conditions. Do not continue to use Fengshui Master
            if you do not agree to take all of the terms and conditions stated on this page.
          </p>
          <p>
            <strong>Use of Service:</strong> The information and services provided (Ba Zi calculation, Feng Shui dashboard,
            AI art recommendations) are for informational and entertainment purposes. While based on traditional principles,
            results and interpretations may vary. The purchase of artwork involves a transaction for a custom-made product.
          </p>
          <p>
            <strong>Intellectual Property:</strong> The Service and its original content (excluding User Content), features and
            functionality are and will remain the exclusive property of Fengshui Master and its licensors. The generated
            artwork images provided as recommendations are illustrative; the final commissioned piece will be a unique
            interpretation by the chosen artist.
          </p>
          <p>
            <strong>Orders and Payment:</strong> By placing an order, you agree to provide current, complete, and accurate
            purchase and account information. All payments are subject to validation checks and authorization by the card issuer.
          </p>
          <p>
            <strong>Disclaimer:</strong> The Feng Shui information provided is not a substitute for professional advice (financial,
            medical, legal, etc.). Fengshui Master makes no guarantees regarding specific outcomes or improvements in luck.
            The effectiveness of Feng Shui is subjective and based on belief systems.
          </p>
          <p>
            <strong>Limitation of Liability:</strong> In no event shall Fengshui Master, nor its directors, employees, partners,
            agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages,
            including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from
            your access to or use of or inability to access or use the Service.
          </p>
           <p>
            <strong>Governing Law:</strong> These Terms shall be governed and construed in accordance with the laws of
            [Your Jurisdiction Placeholder], without regard to its conflict of law provisions.
          </p>
          <p>
            <strong>Changes:</strong> We reserve the right, at our sole discretion, to modify or replace these Terms at any time.
          </p>
           <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
