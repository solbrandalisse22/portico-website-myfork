import { getI18N } from "@/shared/i18n";

interface FooterEmailTemplateProps {
  showSocialNetworks?: boolean;
  showGreatings?: boolean;
  language: string;
}

export default function FooterEmailTemplate({ showSocialNetworks, showGreatings, language } : FooterEmailTemplateProps) {
  const i18n = getI18N({ language });
  return (
    <footer
      style={{
        marginTop: "20px",
        borderTop: "1px solid white",
        padding: "1rem 0",
        textAlign: "center",
        color: "white",
      }}
    >
      {showGreatings && (
        <p>{i18n.CLIENT_SUBJECT_EMAIL.GREATINGS}</p>
      )}
      <small>{i18n.CLIENT_SUBJECT_EMAIL.SIGNATURE}</small>
      {showSocialNetworks && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
          }}
        >
          <li>
            <a href="https://www.facebook.com/porticosport">
              <img
                src="http://porticogestion.com/templates/assets/facebook.svg"
                alt="Facebook"
              />
            </a>
          </li>
          <li>
            <a href="https://twitter.com/portico_sport">
              <img
                src="http://porticogestion.com/templates/assets/x.svg"
                alt="x"
              />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/portico.sport">
              <img
                src="http://porticogestion.com/templates/assets/instagram.svg"
                alt="Instagram"
              />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/portico-sport">
              <img
                src="http://porticogestion.com/templates/assets/linkedin.svg"
                alt="Linkedin"
              />
            </a>
          </li>
        </ul>
      )}
    </footer>
  );
}
