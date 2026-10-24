# Pixel Paradise Gaming Café

A responsive React + Vite website for **Pixel Paradise**, a console gaming café in Bareilly, Uttar Pradesh.

## What's included

- Cinematic, mobile-first landing page featuring the PlayStation gaming experience
- PS5 / PS4 booking **enquiry** form (date, time, player count, contact details)
- Pixel Club membership enquiry plans with editable tiers
- WhatsApp membership request handoff and local "My Pass" request summary
- FAQs, Maps, Instagram and contact links
- Local privacy notice, accessible navigation and Vercel SPA route rewrites
- GitHub Actions production-build check

## Run locally

Requires Node 20+.

    npm install
    npm run dev

Production:

    npm run build
    npm run preview

## Edit business details

Edit **src/config.js** to update the venue location, phone, Instagram, Google Maps link, and membership plans.

**Important:** Plan prices, benefits and activation must be confirmed by Pixel Paradise management before being displayed as official offers. Current plans are enquiry categories, not active subscriptions.

The listed phone number is used as a WhatsApp target. Confirm it accepts WhatsApp messages before publishing; otherwise replace it with the business WhatsApp number.

## Membership / booking architecture

This version does **not** include backend authentication, payments, station inventory or confirmed online booking:

1. Guest browses membership options.
2. Guest fills out the membership form; a local request ID and details are saved using localStorage in that browser.
3. WhatsApp opens with a prepared message. **The guest must press Send** to contact the café.
4. The café confirms current plan terms and activates offline; the site does not assert activated status.
5. Guest can revisit the My Pass page on the same browser to see or delete their locally saved request.

Bookings also generate a WhatsApp enquiry and depend on staff confirmation.

### To support production memberships

Add authentication, a server database, secure staff confirmation, centrally managed member IDs, booking availability, payment handling (if needed) and appropriate privacy/security controls. Do not use localStorage as the source of truth for active memberships.

## Deploy on Vercel

Import this GitHub repository, select Vite, run npm run build and use **dist** as the output directory. Client-side routing is handled by vercel.json.

## Content note

Hero, console and gamer images are illustrative Unsplash photography, **not pictures of the actual café**. Replace them with photos you own or have permission to use.

## Business reference

Pixel Paradise, near Bishop Conrad School, Green Park Colony, Bareilly, UP 243001. Confirm operating details with management before launch.

## 2026 Noida update

Pixel Paradise Gaming Cafe is in **Sector 56, Noida**, open **10:00 AM to 10:00 PM**, and offers PS5, PS4 and G29 wheel experiences. Official maps: https://maps.app.goo.gl/6YoTHVMyBQz8kLqk7

The site now uses GSAP 3.15 / @gsap/react with accessible reduced-motion fallbacks, Tailwind CSS v4 utilities alongside existing branded styles, and Vercel security headers.

**Contact workflow:** The previous Bareilly number must not be used. Until a verified Noida business WhatsApp number is supplied, enquiry messages are prepared to copy into Instagram DMs. Users must manually send them, and no booking or membership is confirmed by submitting a draft.

Blocking right-click and image dragging is only a casual deterrent. It cannot hide public client-side HTML, CSS, JavaScript or media. Do not put secrets or authorization logic into the frontend.

## Official logo, colour palette and gaming session rates

- Brand logo recreated as a scalable SVG from the supplied Pixel Paradise image: `public/pixel-paradise-logo.svg`.
- Palette: black `#050608`, purple `#6e3f9b`, hot pink `#e91e93`, white `#fff`.
- Venue address: Shop No. E4/7, 1st Floor, Sai Market, near Mother Dairy, Block E, Sector 56, Noida, Uttar Pradesh.
- PS5: 30 minutes ₹60, 1 hour ₹100.
- PS4: 30 minutes ₹40, 1 hour ₹80.
- G29 racing wheel: 30 minutes ₹100, 1 hour ₹150.
- The landing-page Pricing section is powered by `src/config.js` and opens an enquiry form preselected for the requested setup.
- **Membership package prices are not yet set.** The session prices are not presented as membership subscription prices.


## Immersive multi-step booking and official WhatsApp

The gaming booking flow now runs in four stages: Choose Arena (PS5 / PS4 / G29), Session (30 or 60 minutes plus date/time), Player Details, and Ready to Play. GSAP animates stage transitions with reduced-motion support. The chosen setup from pricing cards is preselected.

Official café WhatsApp: +91 87459 98333. After reviewing a request, the player taps OPEN WHATSAPP. The browser navigates to wa.me/918745998333 with an encoded prefilled message. The user MUST tap Send in WhatsApp; the site does not auto-send or claim booking confirmation.

Displayed prices are per selected setup/session, not a final quotation for all players. Time options fall between 10 AM and 10 PM India time, in half-hour increments. They are enquiry times only, not a real-time reservation inventory. No backend stores gaming enquiries.
