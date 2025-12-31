import { Metadata } from "next";
import { Shield, Lock, FileText, Mail, Calendar, Clock } from "lucide-react";
import { TermSidebar } from "@/components/company/TermSidebar";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sonali Life Insurance",
  description:
    "Our commitment to protecting your personal information and your right to privacy.",
};

export default function TermsAndConditionPage() {
  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 pt-15 pb-12 lg:pt-15 lg:pb-15">
        {/* Atmospheric Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-position-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Lighting Blobs */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[100px] translate-x-1/4 -translate-y-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[80px] -translate-x-1/4 translate-y-1/3 pointer-events-none opacity-60"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl relative">
            {/* Decorative large icon watermark - Smaller and tighter positioning */}
            <div className="absolute -right-10 -top-10 text-white/3 pointer-events-none select-none hidden lg:block">
              <Shield className="w-64 h-64" />
            </div>

            {/* Glassmorphism Content Card - Reduced Padding */}
            <div className="bg-white/2 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20 rounded-3xl p-6 md:p-8 relative overflow-hidden">
              {/* Subtle inner glow */}
              <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-white/20 to-transparent"></div>

              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 ring-1 ring-orange-500/20 text-[11px] font-bold uppercase tracking-wider mb-4">
                    <Shield className="w-3 h-3" /> TERMS AND CONDITIONS
                  </div>

                  <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-transparent bg-clip-text bg-linear-to-r from-white to-slate-300">
                    Privacy Policy
                  </h1>

                  <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mb-6">
                    We are deeply committed to protecting your personal
                    information and upholding your right to privacy. Please
                    review this notice carefully.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/3 border border-white/5">
                      <Calendar className="w-3.5 h-3.5 text-orange-500/70" />
                      <span>Updated: Dec 2024</span>
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/3 border border-white/3">
                      <Clock className="w-3.5 h-3.5 text-blue-500/70" />
                      <span>~20 min read</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Sidebar (Table of Contents) */}
          <div className="lg:col-span-3">
            <TermSidebar />
          </div>

          {/* Legal Text Content */}
          <div className="lg:col-span-8 lg:col-start-5 prose prose-slate prose-lg max-w-none text-slate-600">
            {/* Introduction */}
            <div className="mb-12">
              <p className="lead text-xl text-slate-700">
                Thank you for choosing to be part of our community at{" "}
                <strong>Sonali Life Insurance Company Limited</strong>{" "}
                {/* ("Company," "we," "us," or "our"). */}
              </p>
              <p>
                We are committed to protecting your personal information and
                your right to privacy. If you have any questions or concerns
                about this privacy notice or our practices with regard to your
                personal information, please contact us at{" "}
                <a
                  href="mailto:info@sonalilife.com"
                  className="text-orange-600 no-underline hover:underline font-bold"
                >
                  info@sonalilife.com
                </a>
                .
              </p>
              <p>
                This privacy notice describes how we might use your information
                if you visit our website at{" "}
                <a
                  href="https://www.sonalilife.com"
                  className="text-orange-600 no-underline hover:underline"
                >
                  https://www.sonalilife.com
                </a>
                , or engage with us in other related ways ― including any sales,
                marketing, or events.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-16">
              {/* SECTION 1 */}
              <section id="1" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">
                    1
                  </span>
                  What Information Do We Collect?
                </h2>

                <div className="bg-orange-50/50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6">
                  <h4 className="text-orange-800 font-bold m-0 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> In Short
                  </h4>
                  <p className="text-slate-700 m-0 text-sm">
                    We collect personal information that you provide to us
                    voluntarily.
                  </p>
                </div>

                <p>
                  We collect personal information that you voluntarily provide
                  to us when you register on the Website, express an interest in
                  obtaining information about us or our products and Services,
                  when you participate in activities on the Website or otherwise
                  when you contact us.
                </p>
                <p>
                  The personal information we collect may include the following:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Personal Information Provided by You:</strong>{" "}
                    Names, phone numbers, email addresses, mailing addresses,
                    and other similar information.
                  </li>
                  <li>
                    <strong>Payment Data:</strong> We may collect data necessary
                    to process your payment if you make purchases, such as your
                    payment instrument number. All payment data is stored by{" "}
                    <strong>SSL Commerce, Nagad, and bKash</strong>.
                  </li>
                </ul>
                <p className="text-sm text-slate-500 italic">
                  Links to payment provider privacy policies:
                  <a
                    href="https://signup.sslcommerz.com/term-condition"
                    className="text-orange-600 hover:underline mx-1"
                  >
                    SSL Commerz
                  </a>
                  ,
                  <a
                    href="https://www.nagad.com.bd/pg/?n=terms-of-use"
                    className="text-orange-600 hover:underline mx-1"
                  >
                    Nagad
                  </a>
                  , and
                  <a
                    href="https://www.bkash.com/terms-and-conditions"
                    className="text-orange-600 hover:underline mx-1"
                  >
                    bKash
                  </a>
                  .
                </p>
              </section>

              {/* SECTION 2 */}
              <section id="2" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">
                    2
                  </span>
                  How Do We Use Your Information?
                </h2>

                <div className="bg-orange-50/50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6">
                  <h4 className="text-orange-800 font-bold m-0 mb-2">
                    In Short
                  </h4>
                  <p className="text-slate-700 m-0 text-sm">
                    We process your information for legitimate business
                    interests, contract fulfillment, compliance with legal
                    obligations, and/or consent.
                  </p>
                </div>

                <p>
                  We use the information we collect or receive for the following
                  purposes:
                </p>
                <div className="grid md:grid-cols-2 gap-4 not-prose">
                  {[
                    "To facilitate account creation and logon process.",
                    "To post testimonials (with your consent).",
                    "Request feedback.",
                    "To enable user-to-user communications.",
                    "To manage user accounts.",
                    "Fulfill and manage your orders.",
                    "Administer prize draws and competitions.",
                    "To deliver and facilitate delivery of services.",
                    "To respond to user inquiries/offer support.",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 3 */}
              <section id="3" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">
                    3
                  </span>
                  Will Your Information Be Shared?
                </h2>
                <div className="bg-orange-50/50 border-l-4 border-orange-500 p-6 rounded-r-xl mb-6">
                  <h4 className="text-orange-800 font-bold m-0 mb-2">
                    In Short
                  </h4>
                  <p className="text-slate-700 m-0 text-sm">
                    Only with consent, to comply with laws, to provide services,
                    to protect rights, or fulfill business obligations.
                  </p>
                </div>
                <p>We may process or share your data based on:</p>
                <ul className="space-y-2 marker:text-orange-500">
                  <li>
                    <strong>Consent:</strong> If you have given specific
                    consent.
                  </li>
                  <li>
                    <strong>Legitimate Interests:</strong> When reasonably
                    necessary for business interests.
                  </li>
                  <li>
                    <strong>Performance of a Contract:</strong> To fulfill
                    contract terms.
                  </li>
                  <li>
                    <strong>Legal Obligations:</strong> Compliance with laws,
                    court orders, or subpoenas.
                  </li>
                  <li>
                    <strong>Vital Interests:</strong> To prevent harm, fraud, or
                    illegal activities.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> During mergers, sales,
                    or acquisitions.
                  </li>
                </ul>
              </section>

              {/* SECTION 4 */}
              <section id="4" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">
                    4
                  </span>
                  How Long Do We Keep Your Information?
                </h2>
                <p>
                  We keep your information for as long as necessary to fulfill
                  the purposes outlined in this privacy notice unless otherwise
                  required by law. When we have no ongoing legitimate business
                  need, we will either delete or anonymize such information.
                </p>
              </section>

              {/* SECTION 5 */}
              <section id="5" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">
                    5
                  </span>
                  How Do We Keep Your Information Safe?
                </h2>
                <div className="flex items-start gap-4 p-6 bg-slate-50 border border-slate-100 rounded-xl">
                  <Lock className="w-6 h-6 text-orange-600 mt-1 shrink-0" />
                  <p className="m-0 text-sm text-slate-600">
                    We have implemented appropriate technical and organizational
                    security measures. However, no electronic transmission over
                    the Internet can be guaranteed to be 100% secure.
                    Transmission of personal information to and from our Website
                    is at your own risk.
                  </p>
                </div>
              </section>

              {/* SECTION 6 */}
              <section id="6" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">
                    6
                  </span>
                  Do We Collect Information From Minors?
                </h2>
                <p>
                  We do not knowingly solicit data from or market to children
                  under 18 years of age. By using the Website, you represent
                  that you are at least 18. If we learn that personal
                  information from users less than 18 has been collected, we
                  will deactivate the account.
                </p>
              </section>

              {/* SECTION 7 */}
              <section id="7" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">
                    7
                  </span>
                  What Are Your Privacy Rights?
                </h2>
                <p>
                  You may review, change, or terminate your account at any time.
                </p>
                <h4 className="font-bold text-lg mt-6">Account Information</h4>
                <p>
                  If you would at any time like to review or change the
                  information in your account or terminate your account, you can
                  log in to your account settings and update your user account.
                </p>
                <p>
                  <strong>Opting out of email marketing:</strong> You can
                  unsubscribe from our marketing email list at any time by
                  clicking on the unsubscribe link in the emails.
                </p>
              </section>

              {/* SECTION 8, 9, 10, 11, 12 grouped for brevity in display, but full text here */}
              <section id="8" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  8. Controls For Do-Not-Track Features
                </h2>
                <p className="text-sm">
                  We do not currently respond to DNT browser signals or any
                  other mechanism that automatically communicates your choice
                  not to be tracked online.
                </p>
              </section>

              <section id="9" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  9. California Residents
                </h2>
                <p className="text-sm">
                  California Civil Code Section 1798.83 permits our users who
                  are California residents to request information about
                  categories of personal information we disclosed to third
                  parties for direct marketing purposes.
                </p>
              </section>

              <section id="10" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  10. Updates To This Notice
                </h2>
                <p>
                  We may update this privacy notice from time to time. The
                  updated version will be indicated by an updated "Revised"
                  date.
                </p>
              </section>

              <section id="11" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-sm">
                    11
                  </span>
                  Contact Us
                </h2>
                <div className="bg-slate-900 text-white p-8 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 text-white">
                    Have questions about this notice?
                  </h3>
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-orange-400 mt-1" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                          Email Us
                        </p>
                        <a
                          href="mailto:care@sonalilife.com"
                          className="text-white font-bold hover:text-orange-400 transition-colors"
                        >
                          care@sonalilife.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-orange-400 mt-1" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">
                          Postal Address
                        </p>
                        <address className="not-italic text-sm text-slate-300">
                          Sonali Life Insurance Company Limited
                          <br />
                          68/B, DIT Road, Malibag Chowdhury Para
                          <br />
                          Dhaka, Dhaka 1219, Bangladesh
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="12" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">
                  12. Review, Update or Delete Data
                </h2>
                <p>
                  Based on the applicable laws of your country, you may have the
                  right to request access to the personal information we collect
                  from you, change that information, or delete it in some
                  circumstances. To make a request, please email{" "}
                  <a
                    href="mailto:info@sonalilife.com"
                    className="text-orange-600 hover:underline"
                  >
                    info@sonalilife.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
