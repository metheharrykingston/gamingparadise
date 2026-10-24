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
