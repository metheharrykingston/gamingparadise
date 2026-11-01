# Pixel Paradise Gaming Cafe

Official responsive website for Pixel Paradise, Sector 56, Noida, Uttar Pradesh.

Built with **React 18 + Vite 6 + Tailwind CSS 4 + GSAP 3.15 + React Router + Lucide**.

## Gaming setup rates

| Setup | 30 min | 1 hour |
| --- | ---: | ---: |
| PS5 | ₹60 | ₹100 |
| G29 Racing Wheel | ₹100 | ₹150 |

**G29 hourly saving:** two 30-minute sessions cost ₹200, while one continuous hour costs ₹150. The displayed ₹50 saving compares those equivalent durations, not a deduction from the ₹150 rate.

These rates are for the chosen setup and duration, **not** confirmed multi-player totals or membership subscription rates. Wheel racing is single-player per G29; PS5 multiplayer depends on the selected game and available controllers.

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

1. **Choose your arena and game:** PS5 or G29, then a compatible title (setup preselected from its pricing card).
2. **Lock your session:** 30 or 60 minutes, preferred date and time.
3. **Player details:** Name, phone, game-aware player count (G29: exactly one driver; PS5: the local multiplayer range of the selected game), and optional notes.
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


## GTA VI launch-period requests (November 2026)

The homepage and `/gta6` route feature a responsive, sporty launch-countdown experience. The release date is **19 November 2026**, as announced by Rockstar Games: https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026

- The countdown is to **00:00 on the announced launch calendar date in Asia/Kolkata**, not a guaranteed game unlock hour.
- Players may **request** 60- or 120-minute café slots, every 30 minutes during 10 AM–10 PM, beginning on the announced launch date or later within a rolling 30-day window.
- Name, phone, player count and optional notes are used to prepare a WhatsApp message. The frontend stores no GTA VI request data and does not have live slot inventory.
- A request is **not** a reservation or guarantee that GTA VI is installed, playable or accessible at the café. The café must confirm equipment, game access, price and time.
- GTA VI-specific play pricing is intentionally **unpublished** until the café chooses to release it. The advertised monthly passes do not imply GTA VI access, a game purchase or early access.
- The site is an independent café promotion and not an official Rockstar Games preorder.

To update the announced release date, adjust `GTA6_RELEASE_DATE` and `GTA6_COUNTDOWN_TARGET` in `src/gta6.js` together after checking the official announcement.

## Monthly passes from the printed flyer

| Monthly pass | Advertised hours | Poster value | Offer |
| --- | --- | ---: | ---: |
| Basic | 20 h | ₹2,000 | ₹1,499 |
| Pro (most popular) | 40 h + 3 bonus | ₹4,000 | ₹2,799 |
| Elite | 60 h | ₹6,000 | ₹3,999 |

The flyer mentions advance booking on Basic with an X icon, so the site describes it as not included **subject to café confirmation**. Elite mentions premium setups such as racing and big screen. All inclusion, booking, setup and expiry terms need café confirmation. No online payment, login, live stock or membership activation exists.

Tests for membership prices and GTA VI date, slots and WhatsApp handoff live in `test/gta6-membership.test.js`.


## Available game titles / updated session catalogue

**PS5:** GTA 5, Tekken 8, Mortal Kombat, Spider-Man, WWE 2K26, FC 26, Street Fighter, It Takes Two, Resident Evil Village, Watch Dogs, Final Fantasy XVI, Unravel Two, Wo Long, Call of Duty.

The booking wizard distinguishes solo titles and local multiplayer games. Tekken 8, Mortal Kombat and Street Fighter allow two-player requests; FC 26 and WWE 2K26 allow up to four; It Takes Two needs two; Unravel Two allows one or two. Controller count, game editions and actual availability must be confirmed by the café.

**G29 single-driver racing:** Forza Horizon 5, The Crew Motorfest, F1 26. Logitech G29 wheel with a six-gear shifter. No multi-driver selection on the same wheel.

**Pricing:** PS5 ₹60/30 minutes or ₹100/hour. G29 ₹100/30 minutes or ₹150/hour (save ₹50 against two 30-minute G29 slots). GTA VI prebooking pricing remains unpublished and unchanged by these updates.

The café provided the title names. Listings are subject to individual title availability and compatibility at the venue. All WhatsApp booking forms remain enquiries, not confirmed reservations.

## Café hours and optional snacks (November 2026)

Regular PS5/G29 and GTA VI launch-period slot requests follow a shared **10:00 AM to 10:00 PM Asia/Kolkata (IST), every day** rule. A requested session must **finish by 10:00 PM**; no 10 PM or later start times are offered. Starts are spaced at 30-minute increments. Last regular start: **9:30 PM for 30 minutes** or **9:00 PM for 60 minutes**. GTA VI also offers a 120-minute request, last start **8:00 PM**. Past/current times are excluded, and today's requests disappear after closing, while future dates remain selectable. These are requests, not live inventory or confirmed bookings.

Both booking forms include a separate **Snacks / drinks (optional)** text field under special requests. If supplied, it is included in the WhatsApp enquiry and on the regular booking review; if empty, it is omitted. Snacks are not included in the displayed gaming rate and require separate café confirmation of availability and additional pricing.
