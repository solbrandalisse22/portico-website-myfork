import HeaderEmailTemplate from './HeaderEmailTemplate';
import FooterEmailTemplate from './FooterEmailTemplate';

interface EmailTemplateProps {
  title: string;
  content1: string;
  content2: string;
  language: string;
}

export default function EmailTemplate({ title, content1, content2, language }: EmailTemplateProps) {
  return (
    <div style={{
      color: 'white',
      backgroundColor: '#151a36',
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem',
        color: 'white',
      }}>
        <HeaderEmailTemplate />
        <h1>{title}</h1>
        <p>{content1}</p>
        <p>{content2}</p>
        <FooterEmailTemplate showSocialNetworks showGreatings language={language} />
      </div>
    </div>
  );
}
