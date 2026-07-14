import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import SectionWrapper  from '@/components/SectionWrapper';
import SectionTitle    from '@/components/SectionTitle';
import ContactForm     from '@/components/sections/ContactForm';
import CommandeForm    from '@/components/sections/CommandeForm';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  return {
    title: 'Contact',
    description: locale === 'fr'
      ? 'Contactez Congo Food Process à Brazzaville : formulaire de contact, commande B2B et coordonnées.'
      : 'Contact Congo Food Process in Brazzaville: contact form, B2B order and coordinates.',
  };
}

const CONTACT_INFO = [
  { icon: MapPin, label: 'Adresse', value: 'N° 7 rue Lifou Mpila abattoir (zone SIASIC), Brazzaville, Congo', href: null },
  { icon: Phone,  label: 'Téléphone', value: '+242 06 515 82 96', href: 'tel:+242065158296' },
  { icon: Mail,   label: 'Email', value: 'contact@congofoodprocess.cg', href: 'mailto:contact@congofoodprocess.cg' },
  { icon: Clock,  label: 'Horaires', value: 'Lun-Ven : 8h00 – 17h00', href: null },
];

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = useTranslations('contact');

  return (
    <>
      {/* Hero minimal */}
      <div className="bg-[var(--color-dark)] pt-[80px] pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="font-label text-xs text-[var(--color-primary)] uppercase tracking-widest mb-3">Brazzaville, Congo</p>
          <h1 className="font-heading text-white text-4xl md:text-5xl font-black leading-tight mb-3">
            {t('title')}
          </h1>
          <p className="text-white/70 text-lg max-w-xl">{t('subtitle')}</p>
        </div>
      </div>

      {/* Contact principal */}
      <SectionWrapper bg="cream" py="lg">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Infos + Map */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div>
              <h2 className="font-heading font-bold text-[var(--color-dark)] text-xl mb-5">Nos coordonnées</h2>
              <ul className="flex flex-col gap-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 bg-[var(--color-primary)]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon size={16} color="var(--color-primary)" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-label uppercase tracking-wide mb-0.5">{label}</p>
                      {href ? (
                        <a href={href} className="text-[var(--color-dark)] font-medium text-sm hover:text-[var(--color-primary)] transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-[var(--color-dark)] font-medium text-sm">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* WhatsApp */}
            <a
              href="https://wa.me/242065158296"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl text-white font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t('whatsapp')}
            </a>

            {/* Google Maps */}
            <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card)]">
              <iframe
                src="https://maps.google.com/maps?q=Mpila,+Brazzaville,+Congo&output=embed"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Congo Food Process, Zone SIASIC Mpila, Brazzaville"
                aria-label="Carte Google Maps, Usine CFP à Mpila, Brazzaville"
              />
            </div>
          </div>

          {/* Formulaire contact */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 shadow-[var(--shadow-card)]">
            <h2 className="font-heading font-bold text-[var(--color-dark)] text-xl mb-6">
              {t('title')}
            </h2>
            <ContactForm locale={locale} />
          </div>
        </div>
      </SectionWrapper>

      {/* Formulaire commande B2B */}
      <SectionWrapper bg="dark" py="lg">
        <div className="max-w-3xl mx-auto">
          <SectionTitle
            tag="Professionnels"
            title="Commande B2B"
            subtitle="Distributeurs, importateurs, restaurateurs : soumettez votre demande de devis."
            theme="light"
            className="mb-10"
          />
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <CommandeForm locale={locale} />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
