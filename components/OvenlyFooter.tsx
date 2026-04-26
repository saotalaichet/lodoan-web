'use client';

import Link from 'next/link';

interface OvenlyFooterProps {
  lang: 'vi' | 'en';
}

const PRIMARY = '#9B1C1C';

export default function OvenlyFooter({ lang }: OvenlyFooterProps) {
  const t = {
    companyName: { 
      vi: 'CÔNG TY TNHH MTV OVENLY SOFTWARE', 
      en: 'Ovenly Software Co Limited' 
    },
    brandName: { 
      vi: 'Nền tảng LÒ ĐỒ ĂN', 
      en: 'LÒ ĐỒ ĂN Platform' 
    },
    email: 'hello@ovenly.io',
    website: 'www.ovenly.io',
    marketplace: 'lodoan.vn',
    
    legal: { vi: 'Pháp Lý', en: 'Legal' },
    terms: { vi: 'Điều Khoản Dịch Vụ', en: 'Terms of Service' },
    privacy: { vi: 'Chính Sách Bảo Mật', en: 'Privacy Policy' },
    
    contact: { vi: 'Liên Hệ', en: 'Contact' },
    
    copyright: {
      vi: '© 2026 Ovenly Software. Bảo lưu mọi quyền.',
      en: '© 2026 Ovenly Software. All rights reserved.'
    }
  };

  return (
    <footer style={{ 
      background: '#FAFAF9', 
      borderTop: '1px solid #E7E5E4',
      padding: '48px 20px 24px'
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Main Footer Content */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '40px',
          marginBottom: '40px'
        }}>
          
          {/* Company Info */}
          <div>
            <h3 style={{ 
              fontSize: 18, 
              fontWeight: 700, 
              color: PRIMARY, 
              marginBottom: 16 
            }}>
              Ovenly
            </h3>
            <p style={{ 
              fontSize: 14, 
              color: '#57534E', 
              marginBottom: 8,
              fontWeight: 600 
            }}>
              {t.companyName[lang]}
            </p>
            <p style={{ 
              fontSize: 14, 
              color: '#78716C', 
              marginBottom: 16 
            }}>
              {t.brandName[lang]}
            </p>
          </div>

          {/* Legal Links */}
          <div>
            <h3 style={{ 
              fontSize: 16, 
              fontWeight: 700, 
              color: '#292524', 
              marginBottom: 16 
            }}>
              {t.legal[lang]}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a 
                href="https://www.ovenly.io/company/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  fontSize: 14, 
                  color: '#57534E',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = PRIMARY}
                onMouseLeave={(e) => e.currentTarget.style.color = '#57534E'}
              >
                {t.terms[lang]} ↗
              </a>
              <a 
                href="https://www.ovenly.io/company/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  fontSize: 14, 
                  color: '#57534E',
                  textDecoration: 'none',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = PRIMARY}
                onMouseLeave={(e) => e.currentTarget.style.color = '#57534E'}
              >
                {t.privacy[lang]} ↗
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{ 
              fontSize: 16, 
              fontWeight: 700, 
              color: '#292524', 
              marginBottom: 16 
            }}>
              {t.contact[lang]}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <a 
                href={`mailto:${t.email}`}
                style={{ 
                  fontSize: 14, 
                  color: PRIMARY,
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                {t.email}
              </a>
              <a 
                href={`https://${t.website}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  fontSize: 14, 
                  color: '#57534E',
                  textDecoration: 'none'
                }}
              >
                {t.website}
              </a>
              <a 
                href={`https://${t.marketplace}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  fontSize: 14, 
                  color: '#57534E',
                  textDecoration: 'none'
                }}
              >
                {t.marketplace}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid #E7E5E4',
          paddingTop: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12
        }}>
          <p style={{ 
            fontSize: 13, 
            color: '#A8A29E',
            textAlign: 'center'
          }}>
            {t.copyright[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}