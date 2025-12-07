// import React, { useState } from "react";
import {
  Plus,
  Minus,
  HelpCircle,
  MessageCircle,
  PhoneCall,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    question: "How can I pay my insurance premium?",
    answer:
      "You can pay your premiums easily through our mobile app, website, or via digital wallets like bKash, Nagad, and Rocket. We also accept bank transfers and direct deposits at any of our branches.",
  },
  {
    question: "What is the claim settlement process?",
    answer:
      "We pride ourselves on a 7-day claim settlement policy. Simply submit your claim form along with the required documents via our app or at a branch. Once verified, the fund is transferred directly to your bank account.",
  },
  {
    question: "Can I surrender my policy before maturity?",
    answer:
      "Yes, a policy can be surrendered after it has been active for at least 2 years. However, surrendering early may result in a lower payout than the maturity value. We recommend consulting an agent first.",
  },
  {
    question: "Is my investment safe with Sonali Life?",
    answer:
      "Absolutely. We are fully regulated by the Insurance Development & Regulatory Authority (IDRA) of Bangladesh. We maintain a high solvency margin and have a transparent track record of financial stability.",
  },
  {
    question: "What happens if I miss a premium payment?",
    answer:
      "We offer a 30-day grace period for all premium payments. During this time, your policy remains active. If payment is not made within the grace period, the policy may lapse, but it can be revived within 2 years by paying the dues.",
  },
];

function FAQ() {
  return (
    <>
      <section
        className="w-full section_padding bg-slate-50 relative overflow-hidden"
        id="faq"
      >
        {/* Background Decorative Elements */}

        {/* <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-slate-200 to-transparent" /> */}
        <div className="absolute -left-[10%] top-[20%] w-[30%] h-[30%] bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -right-[10%] bottom-[20%] w-[30%] h-[30%] bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" /> Help Center
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked{" "}
              <span className="text-orange-500">Questions</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Find answers to common questions about our policies, payments, and
              protection plans.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-center">
            {/* Left: Accordion */}
            <div className="lg:col-span-8 space-y-4">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {FAQS.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-white border border-slate-200 rounded-xl px-6 data-[state=open]:border-orange-500 data-[state=open]:ring-1 data-[state=open]:ring-orange-500/20 transition-all shadow-md  hover:shadow-lg shadow-orange-500/10"
                  >
                    <AccordionTrigger className="text-left text-slate-900 cursor-pointer hover:text-orange-600 hover:no-underline py-5 text-base font-bold">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Right: Contact Box (Sticky) */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 text-center space-y-6">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-slate-900/20">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Still have questions?
                  </h3>
                  <p className="text-slate-500 mt-2 text-sm">
                    Can't find the answer you're looking for? Chat to our
                    friendly team.
                  </p>
                </div>
                <div className="space-y-3">
                  {/* <Button
                    className="w-full gap-2 bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20"
                    size="lg"
                  >
                    <MessageCircle className="w-4 h-4" /> Chat with Us
                  </Button> */}
                  <Button
                    className="w-full gap-2 bg-primary hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20 transition-all"
                    size="lg"
                  >
                    <PhoneCall className="w-4 h-4" /> 16613 Call Us
                  </Button>
                  {/* <Button
                    variant="outline"
                    className="w-full gap-2 border-2 hover:border-orange-200 hover:text-orange-600"
                    size="lg"
                  >
                    <PhoneCall className="w-4 h-4" /> 16613
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FAQ;
