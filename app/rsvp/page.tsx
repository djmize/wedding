import config from "@/lib/config";
import BotanicalDivider from "@/components/BotanicalDivider";

export default function SaveTheDate() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24">
      <h1 className="font-display text-5xl text-bark mb-4 text-center font-light">
        Save the Date
      </h1>
      <BotanicalDivider className="w-64 mx-auto mb-4" />
      <p className="text-center text-mist text-sm mb-2">{config.weddingDateDisplay}</p>
      <p className="text-center text-lagoon text-xs tracking-widest uppercase mb-12">
        {config.venueAddress}
      </p>

      <form className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs tracking-widest uppercase text-mist mb-2">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              required
              className="w-full border-b border-sand bg-transparent py-2 text-bark focus:outline-none focus:border-rattan transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs tracking-widest uppercase text-mist mb-2">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              required
              className="w-full border-b border-sand bg-transparent py-2 text-bark focus:outline-none focus:border-rattan transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase text-mist mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="w-full border-b border-sand bg-transparent py-2 text-bark focus:outline-none focus:border-rattan transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs tracking-widest uppercase text-mist mb-2">
            Mailing Address <span className="normal-case tracking-normal">(optional)</span>
          </label>
          <input
            type="text"
            name="address"
            placeholder="Street, City, State, Zip"
            className="w-full border-b border-sand bg-transparent py-2 text-bark placeholder:text-sand focus:outline-none focus:border-rattan transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <button
            type="submit"
            name="attending"
            value="yes"
            className="bg-paradise text-cream py-3 text-xs tracking-widest uppercase hover:bg-bark transition-colors"
          >
            Planning to be there
          </button>
          <button
            type="submit"
            name="attending"
            value="no"
            className="border border-sand text-mist py-3 text-xs tracking-widest uppercase hover:bg-sand hover:text-driftwood transition-colors"
          >
            Can&apos;t make it
          </button>
        </div>
      </form>
    </div>
  );
}
