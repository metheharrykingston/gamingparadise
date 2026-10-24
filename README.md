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
