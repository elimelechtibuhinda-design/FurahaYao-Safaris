import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Section,
  Text,
} from "@react-email/components";

interface SafariFormData {
  firstName: string;
  lastName: string;
  email: string;
  heardFrom: string;
  language: string;
  travelWith: string;
  occasion: string;
  exactDates: string;
  startDate: string;
  endDate: string;
  departurePeriod: string;
  duration: string;
  extras: string[];
  zanzibarDuration: string;
  parks: string[];
  additionalActivities: string;
  activities: string[];
  accommodation: string;
  accommodationCategory: string;
  locationPreference: string;
  dreamSafari: string;
  budget: string;
  contactAgain: string;
}

interface SafariEnquiryProps {
  data: SafariFormData;
}

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | string[];
}) => {
  const val = Array.isArray(value) ? value.join(", ") : value;
  if (!val) return null;

  return (
    <div style={rowContainerStyle}>
      <div style={rowLabelStyle}>{label}</div>
      <div style={rowValueStyle}>{val}</div>
    </div>
  );
};

const SectionCustom = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) => (
  <div style={sectionContainerStyle}>
    <div style={sectionHeaderStyle}>
      <span style={iconStyle}>{icon}</span>
      <span style={sectionTitleStyle}>{title}</span>
    </div>
    <div style={sectionBodyStyle}>{children}</div>
  </div>
);

export const SafariEnquiry = ({ data }: SafariEnquiryProps) => {
  const fullName = `${data.firstName} ${data.lastName}`.trim();
  const datesLine =
    data.exactDates === "Yes"
      ? `${data.startDate || "—"} → ${data.endDate || "—"}`
      : data.departurePeriod || "Flexible";

  return (
    <Html lang="en">
      <Head />
      <Body style={bodyStyle}>
        <Container style={containerStyle}>
          <Section style={headerStyle}>
            <Text style={headerBadgeStyle}>✦ &nbsp; FurahaYao Safaris &nbsp; ✦</Text>
            <Text style={headerTitleStyle}>
              New Safari <span style={accentStyle}>Enquiry</span>
            </Text>
            <Hr style={dividerStyle} />
            <Text style={headerSubtitleStyle}>A traveller is ready to begin their journey</Text>
          </Section>

          <Section style={travellersStyle}>
            <div style={travellersCardStyle}>
              <div style={travellersLeftCell}>
                <Text style={travellersLabelStyle}>Traveller</Text>
                <Text style={travellersNameStyle}>{fullName}</Text>
                <Link href={`mailto:${data.email}`} style={emailLinkStyle}>
                  {data.email}
                </Link>
                {data.language && (
                  <div style={languageBadgeStyle}>{data.language}</div>
                )}
              </div>
              <div style={travellersRightCell}>
                <Text style={heardFromLabelStyle}>Heard via</Text>
                <Text style={heardFromValueStyle}>{data.heardFrom || "—"}</Text>
              </div>
            </div>
          </Section>

          <Section style={contentStyle}>
            <SectionCustom title="Travel Plans" icon="◈">
              <InfoRow label="Going with" value={data.travelWith} />
              <InfoRow label="Occasion" value={data.occasion} />
            </SectionCustom>

            <SectionCustom title="Safari Timing" icon="◎">
              <InfoRow label="Exact dates?" value={data.exactDates} />
              <InfoRow label="Dates / Period" value={datesLine} />
              <InfoRow label="Duration" value={data.duration} />
            </SectionCustom>

            <SectionCustom title="Zanzibar & Extras" icon="◇">
              <InfoRow label="Additional services" value={data.extras} />
              <InfoRow label="Zanzibar duration" value={data.zanzibarDuration} />
            </SectionCustom>

            <SectionCustom title="Destinations" icon="▲">
              <InfoRow label="Parks" value={data.parks} />
            </SectionCustom>

            <SectionCustom title="Experiences" icon="❋">
              <InfoRow label="Additional activities?" value={data.additionalActivities} />
              <InfoRow label="Selected activities" value={data.activities} />
            </SectionCustom>

            <SectionCustom title="Accommodation" icon="⬡">
              <InfoRow label="Type" value={data.accommodation} />
              <InfoRow label="Category" value={data.accommodationCategory} />
              <InfoRow label="Location preference" value={data.locationPreference} />
            </SectionCustom>

            <SectionCustom title="Budget & Follow-up" icon="◉">
              <InfoRow label="Budget per person" value={data.budget} />
              <InfoRow label="Contact preference" value={data.contactAgain} />
            </SectionCustom>

            {data.dreamSafari && (
              <div style={dreamSafariContainerStyle}>
                <div style={dreamSafariHeaderStyle}>
                  <span style={iconStyle}>🌅</span>
                  <span style={dreamSafariTitleStyle}>Dream Safari</span>
                </div>
                <div style={dreamSafariBodyCell}>
                  <p style={dreamSafariTextStyle}>"{data.dreamSafari}"</p>
                </div>
              </div>
            )}
          </Section>

          <Section style={footerStyle}>
            <Text style={footerBadgeStyle}>FurahaYao Safaris · Tanzania</Text>
            <Text style={footerTextStyle}>
              Reply directly to this email to contact the traveller at{" "}
              <Link href={`mailto:${data.email}`} style={emailLinkStyle}>
                {data.email}
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

/* ─── Styles ─────────────────────────────────────────── */
const bodyStyle = {
  margin: 0,
  padding: 0,
  background: "#0A0703",
  fontFamily: '"DM Sans", Arial, sans-serif',
};

const containerStyle = {
  maxWidth: "620px",
  margin: "40px auto",
  padding: "0 20px",
};

const headerStyle = {
  background: "linear-gradient(160deg, #2C1810 0%, #1A1208 60%, #0C1A0E 100%)",
  padding: "48px 40px 40px",
  textAlign: "center" as const,
  borderRadius: "20px 20px 0 0",
};

const headerBadgeStyle = {
  fontSize: "11px",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: "#C9A96E",
  margin: 0,
};

const headerTitleStyle = {
  fontFamily: '"Georgia", serif',
  fontSize: "32px",
  fontWeight: 400,
  color: "#F5ECD7",
  lineHeight: "1.1",
  margin: "16px 0 8px",
};

const accentStyle = {
  color: "#C9A96E",
};

const dividerStyle = {
  width: "48px",
  height: "1px",
  background: "#C9A96E",
  margin: "16px auto",
  opacity: 0.4,
  border: "none",
};

const headerSubtitleStyle = {
  fontSize: "14px",
  color: "rgba(245, 236, 215, 0.5)",
  margin: 0,
};

const travellersStyle = {
  background: "#0E0A05",
  padding: "24px 32px",
};

const travellersCardStyle = {
  background: "linear-gradient(135deg, rgba(201, 169, 110, 0.1), rgba(41, 175, 203, 0.07))",
  border: "1px solid rgba(201, 169, 110, 0.25)",
  borderRadius: "14px",
  display: "grid" as const,
  gridTemplateColumns: "1fr 1fr",
  gap: 0,
};

const travellersLeftCell = {
  padding: "20px 24px",
};

const travellersRightCell = {
  padding: "20px 24px",
  textAlign: "right" as const,
};

const travellersLabelStyle = {
  fontSize: "10px",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "rgba(201, 169, 110, 0.6)",
  margin: 0,
};

const travellersNameStyle = {
  fontFamily: '"Georgia", serif',
  fontSize: "22px",
  color: "#F5ECD7",
  fontWeight: 400,
  margin: "6px 0 6px",
};

const emailLinkStyle = {
  fontSize: "13px",
  color: "#29AFCB",
  textDecoration: "none",
};

const languageBadgeStyle = {
  marginTop: "8px",
  display: "inline-block" as const,
  padding: "4px 12px",
  borderRadius: "50px",
  background: "rgba(201, 169, 110, 0.12)",
  border: "1px solid rgba(201, 169, 110, 0.25)",
  fontSize: "11px",
  color: "#C9A96E",
  letterSpacing: "0.08em",
};

const heardFromLabelStyle = {
  fontSize: "11px",
  color: "rgba(245, 236, 215, 0.3)",
  margin: 0,
};

const heardFromValueStyle = {
  fontSize: "13px",
  color: "rgba(245, 236, 215, 0.6)",
  margin: 0,
};

const contentStyle = {
  background: "#0E0A05",
  padding: "8px 32px 32px",
};

const sectionContainerStyle = {
  margin: "0 0 20px",
};

const sectionHeaderStyle = {
  background: "linear-gradient(135deg, #2C1810, #1A1208)",
  padding: "14px 16px",
  display: "flex" as const,
  alignItems: "center" as const,
  borderRadius: "12px 12px 0 0",
  border: "1px solid rgba(201, 169, 110, 0.15)",
};

const iconStyle = {
  fontSize: "18px",
  marginRight: "10px",
};

const sectionTitleStyle = {
  fontFamily: '"Georgia", serif',
  fontSize: "15px",
  fontWeight: 400,
  color: "#C9A96E",
  letterSpacing: "0.05em",
};

const sectionBodyStyle = {
  background: "#0E0A05",
  padding: "0",
  borderRadius: "0 0 12px 12px",
  border: "1px solid rgba(201, 169, 110, 0.15)",
  borderTop: "none",
};

const rowContainerStyle = {
  display: "grid" as const,
  gridTemplateColumns: "38% 1fr",
  gap: 0,
  borderBottom: "1px solid #2C1810",
};

const rowLabelStyle = {
  padding: "10px 16px",
  fontSize: "10px",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "#C9A96E",
  fontWeight: 500,
};

const rowValueStyle = {
  padding: "10px 16px",
  fontSize: "14px",
  color: "#F5ECD7",
};

const dreamSafariContainerStyle = {
  marginTop: "20px",
};

const dreamSafariHeaderStyle = {
  background: "linear-gradient(135deg, #2C1810, #1A1208)",
  padding: "14px 16px",
  display: "flex" as const,
  alignItems: "center" as const,
  borderRadius: "12px 12px 0 0",
  border: "1px solid rgba(201, 169, 110, 0.15)",
};

const dreamSafariTitleStyle = {
  fontFamily: '"Georgia", serif',
  fontSize: "15px",
  color: "#C9A96E",
};

const dreamSafariBodyCell = {
  background: "#0E0A05",
  padding: "18px 20px",
  borderRadius: "0 0 12px 12px",
  border: "1px solid rgba(201, 169, 110, 0.15)",
  borderTop: "none",
};

const dreamSafariTextStyle = {
  fontSize: "14px",
  color: "rgba(245, 236, 215, 0.75)",
  lineHeight: "1.7",
  margin: 0,
  fontStyle: "italic" as const,
};

const footerStyle = {
  background: "#050300",
  padding: "28px 32px",
  textAlign: "center" as const,
  borderTop: "1px solid rgba(201, 169, 110, 0.1)",
  borderRadius: "0 0 20px 20px",
};

const footerBadgeStyle = {
  fontSize: "10px",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  color: "rgba(201, 169, 110, 0.4)",
  margin: 0,
};

const footerTextStyle = {
  fontSize: "12px",
  color: "rgba(245, 236, 215, 0.2)",
  margin: 0,
};
