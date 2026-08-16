/**
 * Site-wide configuration and verified organisation facts.
 *
 * Every value here is from BRIEF.md §2 (verified) or is an explicit
 * placeholder. Never add an unverified fact to this file — use the
 * `PENDING` convention and render it via <Placeholder />.
 */

export const SITE = {
  name: 'APSEDEC',
  legalName: 'Acholi Private Sector Development Company Limited',
  formerName: 'Kitgum Private Sector Promotion Centre',
  registrationNo: '62106',
  established: 1999,
  tagline:
    'Promoting business excellence that sustainably meets the needs of private-sector growth and development in Uganda',
  vision:
    'To be a centre of business excellence that sustainably meets the needs of private sector growth and development.',
  mission:
    'To offer client-oriented capacity-building services in enterprise and entrepreneurship growth and development, business development service & management, microfinance support services, research & advocacy, and fostering strategic alliances with development partners for increased incomes and sustainable livelihoods.',
  url: 'https://apsedec.com',
  description:
    'APSEDEC is a national capacity-building and business development organisation headquartered in Kitgum, Uganda, working in agricultural value chains, VSLAs and SACCOs, microfinance and women’s economic empowerment.',
} as const;

export const CONTACT = {
  /** ▶ Client to confirm: info@apsedec.org vs info@apsedec.com (see PENDING_INPUTS.md) */
  email: 'info@apsedec.org',
  legacyEmails: ['apsedec2006@yahoo.co.uk', 'apsedec2006@gmail.com'],
  phones: ['0774505904', '0782525228'],
  hq: {
    label: 'Head office — Kitgum',
    street: 'Awich Road (opposite Kitgum District Post Office)',
    postal: 'P.O. Box 374',
    town: 'Kitgum, Uganda',
  },
} as const;

/**
 * Offices, as marked on the profile's coverage map and confirmed by the client
 * on 15 Aug 2026. `district` must match a district name in the boundary data —
 * it places the office marker on the map.
 */
export const OFFICES = [
  {
    town: 'Kitgum',
    district: 'Kitgum',
    type: 'head',
    address: 'Awich Road (opposite Kitgum District Post Office), P.O. Box 374',
    phone: '0774505904 / 0782525228',
  },
  {
    town: 'Gulu',
    district: 'Gulu',
    type: 'field',
    address: 'Plot 4, Onono Road, Senior Quarters, Gulu City',
    phone: '0772330292',
  },
  { town: 'Pader', district: 'Pader', type: 'field' },
  // The 2020 boundaries predate the city split, so the marker sits on Lira district.
  { town: 'Lira City', district: 'Lira', type: 'field' },
  { town: 'Kaabong', district: 'Kaabong', type: 'field' },
  {
    town: 'Kasese',
    district: 'Kasese',
    type: 'field',
    address: 'Plot 57 Kijongo Road, Muyenga, Kasese Municipality',
    phone: '0772076627',
  },
  { town: 'Iganga', district: 'Iganga', type: 'field' },
  { town: 'Mayuge', district: 'Mayuge', type: 'field', phone: '0788234895 / 0701916527' },
  {
    town: 'Buvuma',
    district: 'Buvuma',
    type: 'field',
    address: 'NOPP Hub, Buvuma Town Council',
    phone: '0778046923',
  },
  { town: 'Kalangala', district: 'Kalangala', type: 'field' },
  {
    town: 'Kampala',
    district: 'Kampala',
    type: 'liaison',
    phone: '0774505904 / 0782525228',
  },
] as const;

/**
 * Districts shown as coverage on the profile's map that no project in the
 * collection accounts for yet. They colour the map but have no project list.
 * ▶ Client to confirm which programme covered each (see PENDING_INPUTS.md).
 */
export const COVERAGE_ONLY = ['Hoima'] as const;

export const NAV = [
  { href: '/about/', label: 'About' },
  { href: '/what-we-do/', label: 'What We Do' },
  { href: '/projects/', label: 'Projects' },
  { href: '/where-we-work/', label: 'Where We Work' },
  { href: '/partners/', label: 'Partners' },
  { href: '/resources/', label: 'Resources' },
  { href: '/news/', label: 'News' },
  { href: '/contact/', label: 'Contact' },
] as const;

/**
 * Donation flow gate (BRIEF.md §8.1).
 * false -> online section renders in a "coming soon" state; direct bank /
 * mobile money transfer details stay live. Flip to true only once the
 * Flutterwave merchant account exists AND the public key is supplied.
 */
export const DONATIONS_LIVE = false;

/** ▶ Client to supply after APSEDEC merchant onboarding. */
export const FLW_PUBLIC_KEY = '';

/** ▶ Client to create a Web3Forms account and supply. */
export const WEB3FORMS_ACCESS_KEY = '';
