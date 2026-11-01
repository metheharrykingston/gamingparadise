// Confirm all operating details with café management before going live.
export const cafe = {
  name: "Pixel Paradise Gaming Cafe",
  address: "Shop No. E4/7, 1st Floor, Sai Market, near Mother Dairy, Block E, Sector 56, Noida, Uttar Pradesh",
  hours: "10:00 AM – 10:00 PM",
  instagram: "https://www.instagram.com/pixelparadise.cafe/",
  mapsUrl: "https://maps.app.goo.gl/6YoTHVMyBQz8kLqk7",
  whatsappNumber: "918745998333" // Verified for booking enquiries by café owner.
};
export const plans = [
  {
    id:"basic",label:"THE EVERYDAY PLAYER",title:"BASIC PASS",
    description:"Easy entry into a month of more play.",
    price:"₹1,499",actualValue:"₹2,000",hours:20,bonusHours:0,priceNote:"per month",
    features:["20 hours of gaming time","Advance booking not included (confirm with café)","Setup and hours subject to café terms"],
    action:"REQUEST BASIC PASS",featured:false
  },
  {
    id:"pro",label:"MOST POPULAR",title:"PRO PASS",
    description:"More hours. More matches. More reasons to come back.",
    price:"₹2,799",actualValue:"₹4,000",hours:40,bonusHours:3,priceNote:"per month",
    features:["40 hours + 3 bonus hours","43 total promotional play hours","Bonus-hour and setup terms confirmed by café"],
    action:"REQUEST PRO PASS",featured:true
  },
  {
    id:"elite",label:"PREMIUM PLAYER",title:"ELITE PASS",
    description:"The top-tier monthly play package.",
    price:"₹3,999",actualValue:"₹6,000",hours:60,bonusHours:0,priceNote:"per month",
    features:["60 hours of gaming time","Premium setups: racing and big screen","Premium equipment is subject to availability"],
    action:"REQUEST ELITE PASS",featured:false
  }
];
// These are the monthly-pass offers transcribed from the café poster.
// GTA VI-specific sessions, purchases and launch-day pricing are NOT included in these prices.

export function whatsappLink(message) {
  return "https://wa.me/" + cafe.whatsappNumber + "?text=" + encodeURIComponent(message);
}
export function contactLink() { return "https://wa.me/" + cafe.whatsappNumber; }

export const sessions = [
  { id: "ps5", category: "PLAYSTATION 5", title: "PS5 GAMING", subtitle: "Next-gen console sessions", console: "PS5", halfHour: 60, hour: 100 },
  { id: "ps4", category: "PLAYSTATION 4", title: "PS4 GAMING", subtitle: "Your favourites, your squad", console: "PS4", halfHour: 40, hour: 80 },
  { id: "g29", category: "RACING SIMULATOR", title: "G29 RACING", subtitle: "Get behind the wheel", console: "G29 Racing Wheel", halfHour: 100, hour: 150 }
];
