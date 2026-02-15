import { useState } from "react";
import React from "react";
export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "What is the possession date of the project?",
      a: "The expected possession date is December 2026, subject to government approvals and construction progress."
    },
    {
      q: "Are there any hidden charges?",
      a: "No. All pricing is transparent. Government taxes and registration charges will be informed clearly before booking."
    },
    {
      q: "Is home loan facility available?",
      a: "Yes, we are partnered with major banks like HDFC, SBI, and ICICI for easy home loan approvals."
    },
    {
      q: "What amenities are included?",
      a: "The project includes swimming pool, gym, clubhouse, landscaped gardens, jogging track, children's play area, and 24/7 security."
    },
    {
      q: "Is parking included?",
      a: "Yes, one dedicated parking space is included with every apartment."
    }
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 md:px-12 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex justify-between items-center p-5 text-left font-semibold text-lg hover:bg-gray-50"
              >
                {item.q}
                <span className="text-2xl">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>

              {openIndex === i && (
                <div className="px-5 pb-5 text-gray-600">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
