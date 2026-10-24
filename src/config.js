// Edit confirmed venue details here. Verify pricing and benefits with café management.
export const cafe = {
  name: "Pixel Paradise",
  address: "Near Bishop Conrad School, Green Park Colony, Bareilly, Uttar Pradesh 243001",
  phone: "+917668684766",
  phoneDisplay: "+91 76686 84766",
  instagram: "https://www.instagram.com/pixelparadise.cafe/",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pixel+Paradise+near+Bishop+Conrad+School+Bareilly"
};
export const plans = [
  {id:"visitor",label:"PLAY IT CASUAL",title:"DROP-IN",description:"A quick game, a spontaneous hangout, no commitment.",price:"PAY PER VISIT",priceNote:"Ask the café for session rates",features:["Book a casual console session","PS5 or PS4 on availability","Perfect for first-time visitors"],action:"REQUEST A SESSION",featured:false},
  {id:"regular",label:"FOR THE REGULARS",title:"PIXEL PASS",description:"For players who keep coming back for one more round.",price:"PRICE ON REQUEST",priceNote:"Membership package enquiry",features:["Ask about regular-player packages","Get updates on current member offers","One easy point of contact with the team"],action:"REQUEST PIXEL PASS",featured:true},
  {id:"squad",label:"BETTER TOGETHER",title:"SQUAD PASS",description:"When your favourite game is better with your people.",price:"CUSTOM ENQUIRY",priceNote:"Group sessions and membership",features:["Enquire about group bookings","Ask about recurring squad sessions","Plan a match night with the café"],action:"ENQUIRE AS A SQUAD",featured:false}
];
export function whatsappLink(message) {
  return "https://wa.me/" + cafe.phone.replace(/\D/g, "") + "?text=" + encodeURIComponent(message);
}
