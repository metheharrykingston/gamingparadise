# Pixel Paradise Gaming Cafe

Official responsive website for Pixel Paradise, Sector 56, Noida, Uttar Pradesh.

Built with **React 18 + Vite 6 + Tailwind CSS 4 + GSAP 3.15 + React Router + Lucide**.

## Gaming setup rates

| Setup | 30 min | 1 hour |
| --- | ---: | ---: |
| PS5 | ₹60 | ₹100 |
| PS4 | ₹40 | ₹80 |
| G29 Racing Wheel | ₹100 | ₹150 |

These rates are for the chosen setup and duration, **not** confirmed multi-player totals or membership subscription rates.

**Address:** Shop No. E4/7, 1st Floor, Sai Market, near Mother Dairy, Block E, Sector 56, Noida, UP.

**Hours:** 10 AM to 10 PM.

**Instagram:** https://www.instagram.com/pixelparadise.cafe/

**Directions:** https://maps.app.goo.gl/6YoTHVMyBQz8kLqk7

**Booking WhatsApp:** +91 87459 98333.

## Run

Requires Node.js 20+:

    npm install
    npm run dev

Verify and build:

    npm test
    npm run build

## Session booking

A neon, mobile-first, GSAP-animated four-step booking experience:

1. **Choose your arena:** PS5, PS4 or G29 (preselected when opened from its pricing card).
2. **Lock your session:** 30 or 60 minutes, preferred date and time.
3. **Player details:** Name, phone, player count and optional game preferences.
4. **Ready to play:** Review the setup and price, then open WhatsApp.

The WhatsApp button navigates to a prefilled **wa.me/918745998333?text=...** chat. **The player must press Send inside WhatsApp.** WhatsApp messages cannot be silently sent using a wa.me link.

Available request times are in 30-minute steps during café operating hours (10 AM–10 PM, Asia/Kolkata). They **do not** represent live station inventory. The café must still confirm availability and final amount; no payment or booking is processed by this frontend.

## Membership

Pixel Club membership plans are currently enquiries rather than paid subscriptions. Visitors can generate a local member enquiry ID, see My Pass on the same browser, and message the café via a prefilled WhatsApp chat. The site does not activate memberships, perform authentication, or process payments.

Browser localStorage holds only the local membership request name, plan, ID and date. Phone number and email from membership enquiry fields are not stored to localStorage. Booking form data is held temporarily in component state and is not sent to a website backend.

## Brand and media

- Recreated SVG logo at public/pixel-paradise-logo.svg from the supplied Pixel Paradise logo.
- Black #050608, purple #6E3F9B, pink #E91E93 and white #FFFFFF.
- Hero and feature images are illustrative Unsplash photography, not photographs of the actual venue.

## Safety and accessibility

GSAP motion respects reduced-motion preferences. Booking wizard has keyboard Escape support, step navigation and a focus trap. Mobile booking buttons are large touch targets.

Vercel security headers and client-side SPA rewrites are configured in vercel.json. Disabling right-click on non-form content and dragging images is a mild deterrent only, **not a security control**. Never store payment secrets or trust frontend membership IDs as proof of paid access.

## Deploy

Import the repository in Vercel with Vite framework settings, build with npm run build and output directory dist. Confirm linked project permissions before release.
