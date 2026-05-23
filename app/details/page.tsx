import config from "@/lib/config";
import BotanicalDivider from "@/components/BotanicalDivider";

type DetailCardProps = {
  title: string;
  children: React.ReactNode;
};

function DetailCard({ title, children }: DetailCardProps) {
  return (
    <div className="text-center space-y-3">
      <h2 className="font-display text-2xl text-bark font-light">{title}</h2>
      <div className="w-6 border-t border-rattan mx-auto" />
      <div className="text-driftwood leading-relaxed">{children}</div>
    </div>
  );
}

export default function Details() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <h1 className="font-display text-5xl text-bark mb-4 text-center font-light">
        Wedding Details
      </h1>
      <BotanicalDivider className="w-64 mx-auto mb-16" />

      <div className="grid md:grid-cols-3 gap-16">
        <DetailCard title="Ceremony">
          <p>{config.weddingDateDisplay}</p>
          <p className="mt-1">[Ceremony Time]</p>
          <p className="mt-3 text-sm">Venue TBA</p>
        </DetailCard>

        <DetailCard title="Reception">
          <p>[Reception Time]</p>
          <p className="mt-3 font-medium">[Reception Venue]</p>
          <p>[Reception Address]</p>
        </DetailCard>

        <DetailCard title="More Info">
          <p className="text-sm">[Accommodations, dress code, travel info, etc.]</p>
        </DetailCard>
      </div>
    </div>
  );
}
