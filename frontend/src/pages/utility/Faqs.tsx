import { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PageHeader from '../../components/common/PageHeader';

const faqs = [
  { q: 'How do I get started with pet_CRM?', a: 'Simply create an account and follow the onboarding wizard. You\'ll be up and running in less than 5 minutes. Our getting started guide covers all the basics.' },
  { q: 'Can I invite team members?', a: 'Yes! You can invite unlimited team members on all plans. Go to Settings > Team to add members and assign roles.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and bank transfers for annual plans.' },
  { q: 'Is there a free trial?', a: 'Yes, all plans come with a 14-day free trial. No credit card required. You can upgrade or cancel at any time.' },
  { q: 'How do I cancel my subscription?', a: 'You can cancel your subscription at any time from Settings > Billing. Your access will continue until the end of your current billing period.' },
  { q: 'Do you offer custom enterprise plans?', a: 'Absolutely! Contact our sales team for custom pricing, SLA agreements, and dedicated support options.' },
  { q: 'Is my data secure?', a: 'Security is our top priority. We use AES-256 encryption, SOC 2 Type II certified infrastructure, and regular third-party security audits.' },
  { q: 'Can I export my data?', a: 'Yes, you can export all your data in CSV, JSON, or PDF format from any page using the export button.' },
];

export default function Faqs() {
  const [expanded, setExpanded] = useState<string | false>('panel0');

  return (
    <Box>
      <PageHeader title="FAQs" subtitle="Frequently asked questions." breadcrumbs={[{ label: 'Utility' }, { label: 'FAQs' }]} />
      <Box sx={{ maxWidth: 800 }}>
        {faqs.map((faq, idx) => (
          <Accordion
            key={idx}
            expanded={expanded === `panel${idx}`}
            onChange={(_, isExpanded) => setExpanded(isExpanded ? `panel${idx}` : false)}
            sx={{ '&:before': { display: 'none' }, borderRadius: 2, mb: 1.5, border: '1px solid', borderColor: 'divider', boxShadow: 'none' }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>{faq.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{faq.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
