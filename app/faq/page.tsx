import { notFound } from "next/navigation";
import config from "@/lib/config";
import BotanicalDivider from "@/components/BotanicalDivider";

const faqs = [
  {
    on: true,
    question: "What is the dress code?",
    answer: "[e.g. Cocktail attire, black tie, beach formal, etc.]",
  },
  {
    on: true,
    question: "Can my kids come?",
    answer: "Sorry, children are not invited",
  },
  {
    on: false,
    question: "Where should I stay?",
    answer: "[Recommended hotels, room blocks, Airbnb areas, etc.]",
  },
  {
    on: false,
    question: "Will transportation be provided?",
    answer: "[Shuttle info, ride share suggestions, etc.]",
  },
  {
    on: false,
    question: "Are you registered anywhere?",
    answer: "[Registry info or a note that your presence is the only gift needed.]",
  },
  {
    on: false,
    question: "Can I bring a plus one?",
    answer: "[Clarify your plus-one policy here.]",
  },
  {
    on: false,
    question: "What should I do if I have dietary restrictions?",
    answer: "[Let guests know when/how to share dietary needs — e.g. when the RSVP opens.]",
  },
];

export default function FAQ() {
  if (!config.features.faq) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="font-display text-5xl text-bark mb-4 text-center font-light">FAQ</h1>
      <BotanicalDivider className="w-64 mx-auto mb-16" />

      <div className="divide-y divide-sand">
        {faqs.filter((f) => f.on).map(({ question, answer }) => (
          <div key={question} className="py-8">
            <h2 className="font-display text-2xl text-bark mb-3">{question}</h2>
            <p className="text-driftwood leading-relaxed">{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
