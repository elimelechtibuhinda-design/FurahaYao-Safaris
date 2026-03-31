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

interface ConfirmationEmailProps {
  firstName: string;
  email: string;
}

export const ConfirmationEmail = ({ firstName, email }: ConfirmationEmailProps) => (
  <Html lang="en">
    <Head />
    <Body style={bodyStyle}>
      <Container style={containerStyle}>
        <Section style={headerStyle}>
          <Text style={emojiStyle}>🦁</Text>
          <Text style={badgeStyle}>FurahaYao Safaris</Text>
          <Text style={titleStyle}>
            Your Journey <span style={accentStyle}>Begins</span>
          </Text>
        </Section>

        <Section style={contentStyle}>
          <Text style={greetingStyle}>Dear {firstName},</Text>
          <Text style={bodyTextStyle}>
            Thank you for reaching out. We have received your safari request and our team is
            already reviewing it. We will craft a tailored itinerary and get back to you within
            24 hours.
          </Text>
          <Text style={bodyTextStyle}>
            In the meantime, feel free to reach us at{" "}
            <Link href="mailto:info@safariyao.com" style={emailLinkStyle}>
              info@safariyao.com
            </Link>
            .
          </Text>
          <Hr style={dividerStyle} />
          <Text style={footerBadgeStyle}>FurahaYao Safaris · Tanzania</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

/* ─── Styles ─────────────────────────────────────────── */
const bodyStyle = {
  margin: 0,
  padding: 0,
  background: "#0A0703",
  fontFamily: '"DM Sans", Arial, sans-serif',
};

const containerStyle = {
  maxWidth: "560px",
  margin: "40px auto",
  padding: "0 20px",
};

const headerStyle = {
  background: "linear-gradient(160deg, #2C1810, #1A1208)",
  padding: "48px 40px",
  textAlign: "center" as const,
  borderRadius: "20px 20px 0 0",
  border: "1px solid rgba(201, 169, 110, 0.2)",
};

const emojiStyle = {
  fontSize: "42px",
  margin: "0 0 16px",
};

const badgeStyle = {
  fontSize: "10px",
  letterSpacing: "0.3em",
  color: "#C9A96E",
  textTransform: "uppercase" as const,
  margin: "0 0 12px",
};

const titleStyle = {
  fontFamily: '"Georgia", serif',
  fontSize: "28px",
  color: "#F5ECD7",
  lineHeight: "1.2",
  margin: 0,
};

const accentStyle = {
  color: "#C9A96E",
};

const contentStyle = {
  background: "#0E0A05",
  padding: "36px 40px",
  textAlign: "center" as const,
  borderRadius: "0 0 20px 20px",
  border: "1px solid rgba(201, 169, 110, 0.2)",
  borderTop: "none",
};

const greetingStyle = {
  fontSize: "15px",
  color: "rgba(245, 236, 215, 0.7)",
  lineHeight: "1.7",
  margin: "0 0 20px",
};

const bodyTextStyle = {
  fontSize: "15px",
  color: "rgba(245, 236, 215, 0.7)",
  lineHeight: "1.7",
  margin: "0 0 20px",
};

const emailLinkStyle = {
  color: "#29AFCB",
  textDecoration: "none",
};

const dividerStyle = {
  width: "40px",
  height: "1px",
  background: "#C9A96E",
  margin: "28px auto",
  opacity: 0.4,
  border: "none",
};

const footerBadgeStyle = {
  fontSize: "11px",
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "rgba(201, 169, 110, 0.5)",
  margin: 0,
};
