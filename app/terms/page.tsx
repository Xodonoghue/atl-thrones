import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SMS Terms & Conditions — ATL Throne Chairs",
  description:
    "Terms and conditions for the ATL Throne Chairs text-messaging customer-care program, including message frequency, rates, support contact, and opt-out instructions.",
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
          SMS Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm text-neutral-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-neutral-300">
          <Section title="Program name &amp; description">
            <p>
              <strong className="text-white">ATL Throne Chairs Customer Care</strong> is a text
              messaging program operated by ATL Throne Chairs. The program lets customers and
              prospective customers send text messages to ask questions about our throne chair
              rentals — availability, pricing, delivery, setup, and general booking support — and
              receive replies from us.
            </p>
          </Section>

          <Section title="How to opt in">
            <p>
              You opt in to receive text messages by sending a message to our number or by
              providing your mobile number and agreeing to be contacted by text when you submit a
              booking or availability request. Consent to receive text messages is not a condition
              of any purchase.
            </p>
          </Section>

          <Section title="Message frequency">
            <p>
              Message frequency varies. This is a conversational program: we send messages in
              reply to the questions you text us. You may also receive messages related to a
              booking you have started or confirmed.
            </p>
          </Section>

          <Section title="Message &amp; data rates">
            <p>
              <strong className="text-white">Message and data rates may apply.</strong> Any
              charges are billed by and payable to your mobile service provider. Please contact
              your wireless carrier for details about your messaging and data plan.
            </p>
          </Section>

          <Section title="Opt-out instructions">
            <p>
              You can cancel the text messaging service at any time. To opt out, text{" "}
              <strong className="text-white">STOP</strong> to the number you are messaging with.
              After you send <strong className="text-white">STOP</strong>, we will send you a
              one-time message to confirm that you have been unsubscribed. After this, you will no
              longer receive messages from us. If you want to rejoin, sign up again as you did the
              first time and we will resume sending messages to you.
            </p>
          </Section>

          <Section title="Help instructions">
            <p>
              If you are experiencing issues with the messaging program, reply with the keyword{" "}
              <strong className="text-white">HELP</strong> for assistance, or reach us directly at{" "}
              <a
                href="mailto:contact@atlthronechairs.com"
                className="text-gold-400 hover:text-gold-300"
              >
                contact@atlthronechairs.com
              </a>
              . Replying <strong className="text-white">HELP</strong> will return contact
              information for customer support.
            </p>
          </Section>

          <Section title="Carriers">
            <p>
              Carriers are not liable for delayed or undelivered messages. Delivery of messages is
              subject to effective transmission by your wireless service provider and is not
              guaranteed.
            </p>
          </Section>

          <Section title="Privacy">
            <p>
              We respect your privacy. We will only use the information you provide through the
              text messaging program to respond to your questions and assist with your booking. We
              do not share your mobile information or message content with third parties or
              affiliates for marketing or promotional purposes. For full details on how we handle
              your information, please review our Privacy Policy.
            </p>
          </Section>

          <Section title="Support contact">
            <p>
              For all support inquiries, email us at{" "}
              <a
                href="mailto:contact@atlthronechairs.com"
                className="text-gold-400 hover:text-gold-300"
              >
                contact@atlthronechairs.com
              </a>
              .
            </p>
          </Section>

          <Section title="Changes to these terms">
            <p>
              We may update these Terms &amp; Conditions from time to time. Changes take effect
              when posted on this page, and we will update the &ldquo;Last updated&rdquo; date
              above.
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
