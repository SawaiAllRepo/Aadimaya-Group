import { ExternalLink, MapPin } from "lucide-react";

export default function LocationMap() {
  const mapUrl =
    "https://www.google.com/maps/search/?api=1&query=Pune%2C%20Maharashtra";

  return (
    <>
      {/* LOCATION / MAP SECTION */}
      <section className="location-section" id="location">
        <div className="container-site location-grid">

          <div className="location-copy">
            <span className="projects-kicker">
              <MapPin size={13} /> OUR PRESENCE
            </span>

            <h2>
              Built around <em>Pune.</em>
            </h2>

            <p>
              Explore the Pune region where Adimaya Group's development,
              construction and redevelopment work is focused.
            </p>

            <a
              href={mapUrl}
              target="_blank"
              rel="noreferrer"
              className="location-link"
            >
              Open in Google Maps
              <ExternalLink size={14} />
            </a>

            <div className="location-points">

              <div>
                <b>Residential & Commercial</b>
                <span>Development & living spaces</span>
              </div>

              <div>
                <b>Contracting</b>
                <span>Construction execution</span>
              </div>

              <div>
                <b>Redevelopment</b>
                <span>Renewal & transformation</span>
              </div>

              <div>
                <b>Land Development</b>
                <span>Planning & development</span>
              </div>

              <div>
                <b>Industrial Development</b>
                <span>Industrial planning & development</span>
              </div>

            </div>
          </div>

          <div className="location-map-frame">
            <iframe
              title="Adimaya Group Pune location map"
              src="https://www.google.com/maps?q=Pune%2C%20Maharashtra&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

        </div>
      </section>

      {/* KNOW MORE ABOUT ADIMAYA GROUP */}
      <section className="py-16">
        <div className="container-site overflow-hidden rounded-[28px] bg-[#171b24] px-8 py-12 text-white shadow-xl md:px-14 md:py-14">
          
          <div className="max-w-4xl">
            
            <h2 className="text-3xl font-extrabold tracking-tight md:text-5xl">
              Know more about Adimaya Group
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-7 text-white/65 md:text-base">
              Adimaya Group is committed to delivering quality spaces with
              thoughtful planning and practical execution.
            </p>

            <p className="max-w-3xl text-sm leading-7 text-white/65 md:text-base">
              We focus on creating reliable, well-designed developments that
              add long-term value.
            </p>

            <p className="max-w-3xl text-sm leading-7 text-white/65 md:text-base">
              With a strong focus on quality and customer satisfaction, we turn
              ideas into lasting spaces.
            </p>

          </div>

        </div>
      </section>
    </>
  );
}