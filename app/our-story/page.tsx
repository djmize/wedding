import config from "@/lib/config";
import BotanicalDivider from "@/components/BotanicalDivider";

export default function OurStory() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <h1 className="font-display text-5xl text-bark mb-4 text-center font-light">
        Our Story
      </h1>
      <BotanicalDivider className="w-64 mx-auto mb-12" />

      <div className="space-y-6 text-driftwood leading-relaxed text-lg">
        <p>
          {config.partner1} and {config.partner2} met [how you met]. This is a
          placeholder — replace it with your story.
        </p>
        <p>[Add more paragraphs about your relationship, proposal, etc.]</p>
      </div>
    </div>
  );
}
