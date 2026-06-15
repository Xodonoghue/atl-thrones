import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ATL Throne Chairs",
  description:
    "How ATL Throne Chairs collects, uses, and protects your information, including SMS/text messaging data. We never share your information with third parties or for marketing.",
};

const LAST_UPDATED = "June 15, 2026";

export default function Page() {
  return (
    <main className="bg-neutral-950 text-neutral-100">
      <section className="mx-auto max-w-3xl px-5 pt-20 pb-16 sm:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold text-gold-400">
          Legal
        </span>

        <h1 className="mt-8 text-4xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: {LAST_UPDATED}</p>

        <div className="prose-legal mt-10 space-y-8 text-[15px] leading-relaxed text-neutral-300">
          <p>
            This Privacy Policy explains how <strong className="text-white">ATL Throne Chairs</strong>{" "}
            (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, and protects
            your information when you use our website, book a rental, or message our
            text-messaging customer-care service. By using our services you agree to the
            practices described below.
          </p>

          <Section title="Information we collect">
            <p>We collect only the information needed to respond to you and fulfill your booking:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white">Contact details</strong> — your name, email
                address, and mobile phone number.
              </li>
              <li>
                <strong className="text-white">Booking details</strong> — event date and time,
                number of chairs, delivery address, and any setup notes you provide.
              </li>
              <li>
                <strong className="text-white">Message content</strong> — the text messages you
                send to and receive from our customer-care service.
              </li>
              <li>
                <strong className="text-white">Payment information</strong> — processed securely
                by Stripe. We do not store your full card number on our systems.
              </li>
              <li>
                <strong className="text-white">Usage data</strong> — basic, anonymized website
                analytics (e.g., pages visited) collected via Google Analytics.
              </li>
            </ul>
          </Section>

          <Section title="How we use your information">
            <p>We use your information only to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Respond to your questions sent through our text-messaging service.</li>
              <li>Schedule, confirm, and fulfill your throne chair rental.</li>
              <li>Send booking-related notifications such as confirmations and reminders.</li>
              <li>Process payments and provide customer support.</li>
            </ul>
          </Section>

          <Section title="SMS / text messaging">
            <p>
              When you contact our SMS customer-care service, we use your phone number and the
              content of your messages solely to answer your inquiries and assist with your
              booking.
            </p>
            <p className="mt-3">
              <strong className="text-white">
                No mobile information will be shared with third parties or affiliates for
                marketing or promotional purposes.
              </strong>{" "}
              Text messaging originator opt-in data and consent are not shared with any third
              parties.
            </p>
            <p className="mt-3">
              You can opt out of text messages at any time by replying{" "}
              <strong className="text-white">STOP</strong>. For help, reply{" "}
              <strong className="text-white">HELP</strong>. See our SMS Terms &amp; Conditions
              for full details.
            </p>
          </Section>

          <Section title="We do not sell or share your information">
            <p>
              <strong className="text-white">
                We do not sell, rent, or share your personal information with third parties for
                their marketing purposes.
              </strong>{" "}
              We share information only with the service providers that help us operate, and only
              to the extent needed to deliver our service:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li><strong className="text-white">Stripe</strong> — secure payment processing.</li>
              <li>
                <strong className="text-white">Google</strong> — calendar scheduling and website
                analytics.
              </li>
              <li>
                <strong className="text-white">Resend</strong> — sending transactional booking
                emails.
              </li>
              <li>
                Our SMS provider — delivering and receiving text messages you exchange with us.
              </li>
            </ul>
            <p className="mt-3">
              These providers are bound to use your information only to perform services on our
              behalf. We may also disclose information if required by law.
            </p>
          </Section>

          <Section title="Data retention &amp; security">
            <p>
              We keep your information only as long as needed to provide our services and meet
              legal or accounting obligations, then delete or anonymize it. We use reasonable
              administrative and technical safeguards to protect your information, though no
              method of transmission over the internet is 100% secure.
            </p>
          </Section>

          <Section title="Your choices">
            <p>
              You may request access to, correction of, or deletion of your personal information,
              and you may opt out of text messages at any time by replying{" "}
              <strong className="text-white">STOP</strong>. To make a request, contact us at the
              email below.
            </p>
          </Section>

          <Section title="Children&rsquo;s privacy">
            <p>
              Our services are intended for adults. We do not knowingly collect personal
              information from anyone under 18.
            </p>
          </Section>

          <Section title="Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time. Changes take effect when posted
              on this page, and we will update the &ldquo;Last updated&rdquo; date above.
            </p>
          </Section>

          <Section title="Contact us">
            <p>
              Questions about this Privacy Policy? Email us at{" "}
              <a
                href="mailto:contact@atlthronechairs.com"
                className="text-gold-400 hover:text-gold-300"
              >
                contact@atlthronechairs.com
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight text-white">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
