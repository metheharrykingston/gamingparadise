import { useEffect, useState } from "react";
import { Link, NavLink, Route, Routes, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2, ChevronDown, Clock3, Copy, Gamepad2, Gift, Instagram, MapPin, Menu, MessageCircle, Minus, Phone, Plus, ShieldCheck, Sparkles, Swords, Ticket, Trophy, Users, X, Zap } from "lucide-react";
import { cafe, plans } from "./config";
import { useRef } from "react";
import ContactHandoff from "./ContactHandoff";
import { useSiteMotion } from "./useSiteMotion";

const heroImage = "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1800&q=85";
const consoleImage = "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&w=1100&q=85";
const loungeImage = "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1300&q=85";
const STORE_KEY = "pixel-paradise-member-request-v2";

function storedRequest() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "null"); }
  catch { return null; }
}

function Brand({ small = false }) {
  return <Link to="/" className={"brand " + (small ? "brand-small" : "")} aria-label="Pixel Paradise home">
    <span className="brand-mark" aria-hidden="true"><span/><span/><span/><span/></span>
    <span className="brand-word">PIXEL<span>PARADISE</span><small>GAMING CAFE</small></span>
  </Link>;
}

function SiteHeader({ onBook, member }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return <header className="site-header">
    <div className="site-header-inner container">
      <Brand />
      <nav className={"nav-links " + (open ? "nav-open" : "")} aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <a href="/#experience" onClick={() => setOpen(false)}>The experience</a>
        <NavLink to="/membership">Membership</NavLink>
        <a href="/#location" onClick={() => setOpen(false)}>Find us</a>
        <NavLink to="/my-pass">{member ? "My pass" : "Member access"}</NavLink>
        <button className="mobile-book" onClick={() => {setOpen(false); onBook();}}>Book a session <ArrowUpRight size={17}/></button>
      </nav>
      <div className="header-actions">
        <button className="nav-cta" onClick={onBook}>BOOK A SESSION <ArrowUpRight size={17}/></button>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
      </div>
    </div>
  </header>;
}

function SectionLabel({ children }) { return <div className="section-label"><span className="label-dash"/> {children}</div>; }

function Home({ onBook }) {
  const [faq, setFaq] = useState(0);
  const faqs = [
    ["Can I come without a membership?", "Absolutely. Walk-ins are welcome to enquire about a session. Booking ahead is recommended if you are coming with friends. All sessions depend on station availability."],
    ["How do memberships work?", "Choose a membership interest, fill in a quick request and send it to the café on WhatsApp. The team will confirm current pricing, benefits and activation. Submitting a request does not activate a paid membership."],
    ["Can I choose PS5 or PS4?", "Yes. You can request your preferred console when enquiring. Final availability and the game catalogue are confirmed by the café."],
    ["Where is Pixel Paradise?", "Find us in Sector 56, Noida, Uttar Pradesh. Tap Get Directions for the official map location."]
  ];
  return <main>
    <section className="hero">
      <div className="hero-grid container">
        <div className="hero-content">
          <div className="eyebrow"><span className="live-dot"/> SECTOR 56, NOIDA <span className="eyebrow-divider"/> ULTIMATE GAMING HEAVEN</div>
          <h1>YOUR SPACE.<br/><span>YOUR SQUAD.</span><br/><em>YOUR GAME.</em></h1>
          <p className="hero-sub">Your ultimate gaming heaven in Noida. <b>PS5, PS4 and the G29 racing wheel experience.</b> Big games, better company and one more round.</p>
          <div className="hero-actions">
            <button className="btn btn-acid" onClick={onBook}>BOOK YOUR SESSION <ArrowUpRight size={19}/></button>
            <Link to="/membership" className="btn btn-outline">EXPLORE MEMBERSHIPS <ArrowRight size={18}/></Link>
          </div>
          <div className="hero-trust"><div className="avatar-stack"><span>PX</span><span>05</span><span>GG</span></div><div><strong>THE PLACE TO PRESS PLAY</strong><small>PS5 • PS4 • G29 RACING WHEEL</small></div></div>
        </div>
        <div className="hero-visual">
          <img src={heroImage} alt="Neon gaming setup representing the Pixel Paradise gaming atmosphere" className="hero-photo"/>
          <div className="photo-gradient"/>
          <span className="visual-index">01 / THE PARADISE EXPERIENCE</span>
          <div className="floating-play"><span className="play-icon"><Gamepad2 size={27}/></span><span><small>PLAYER STATUS</small><strong>READY TO PLAY <span className="green-dot">●</span></strong></span></div>
          <div className="hero-corner">P<span>×</span>P</div>
        </div>
      </div>
      <div className="hero-bottom container"><span>GOOD GAMES. GREAT PEOPLE. NO PAUSE BUTTON.</span><span className="scroll-cue">SCROLL TO EXPLORE <ArrowDownRight size={18}/></span></div>
    </section>

    <div className="ticker" aria-hidden="true"><div className="ticker-track">{Array.from({length: 4}, (_, i) => <span key={i}>PLAY YOUR WAY <span>✳</span> SQUAD UP <span>✳</span> GAME ON <span>✳</span> REPEAT <span>✳</span> </span>)}</div></div>

    <section className="section experience-section" id="experience">
      <div className="container">
        <div className="section-head"><div><SectionLabel>01 / THE EXPERIENCE</SectionLabel><h2>NOT JUST A GAME.<br/><span>IT'S A WHOLE VIBE.</span></h2></div><p>Drop in, plug in and disappear into your next favourite game. Whether you're a solo player or rolling deep with your crew, there's a spot for you.</p></div>
        <div className="experience-grid">
          <article className="experience-card experience-card-main"><img src={consoleImage} alt="PlayStation gaming controller" loading="lazy"/><div className="experience-overlay"/><div className="experience-top"><span>01 / CONSOLE ZONE</span><Gamepad2 size={25}/></div><div className="experience-copy"><span className="pill">PS5 + PS4</span><h3>CONSOLE<br/>CULTURE.</h3><p>Your next gaming session, upgraded. Ask about your favourite titles and available stations.</p></div></article>
          <article className="experience-card experience-card-social"><img src={loungeImage} alt="Gamers enjoying a competitive gaming event" loading="lazy"/><div className="experience-overlay"/><div className="experience-top"><span>02 / THE COMMUNITY</span><Users size={25}/></div><div className="experience-copy"><span className="pill">BETTER TOGETHER</span><h3>BRING YOUR<br/>PEOPLE.</h3><p>Rivalries, rematches and unbeatable hangouts. The squad is the whole point.</p></div></article>
          <article className="experience-card experience-card-text"><div className="starburst">🏁</div><div><span>03 / RACING EXPERIENCE</span><h3>G29 WHEEL.<br/>RACING<br/><em>FEELS REAL.</em></h3><p className="racing-description">Get behind the wheel and experience the thrill of racing. Ask about availability.</p></div><ArrowUpRight size={35}/></article>
        </div>
      </div>
    </section>

    <section className="membership-teaser section">
      <div className="container teaser-layout"><div className="teaser-left"><SectionLabel>02 / PIXEL CLUB</SectionLabel><h2>YOUR GAME.<br/><span>YOUR PERKS.</span></h2><p>For the regulars, the challengers and the “just one more match” crowd. Make the Paradise your home base.</p><Link className="btn btn-dark" to="/membership">DISCOVER PIXEL CLUB <ArrowUpRight size={19}/></Link></div><div className="teaser-right"><div className="member-card-graphic"><div className="member-card-top"><span>PIXEL<span>PARADISE</span></span><span>✳</span></div><div className="member-card-center"><span className="member-card-mark">P<span>×</span>P</span><small>THE PLAYER'S CLUB</small></div><div className="member-card-bottom"><span>ACCESS YOUR NEXT LEVEL</span><span>EST. FOR PLAYERS</span></div></div><div className="teaser-deco deco-one">✳</div><div className="teaser-deco deco-two">+</div></div></div>
    </section>

    <section className="section how-section"><div className="container"><div className="section-head compact"><div><SectionLabel>03 / YOUR NEXT SESSION</SectionLabel><h2>THREE STEPS.<br/><span>ENDLESS ROUNDS.</span></h2></div></div><div className="steps-grid">{[
      {n:"01",icon:<Gamepad2/>,title:"PICK YOUR PLAY",text:"Choose PS5 or PS4 and let us know when you want to play."},
      {n:"02",icon:<CalendarDays/>,title:"REQUEST YOUR SPOT",text:"Send a quick booking request on WhatsApp. We'll confirm availability."},
      {n:"03",icon:<Zap/>,title:"SHOW UP & GAME",text:"Bring your crew, settle in, and let the good games begin."}
    ].map(step => <div className="step-card" key={step.n}><span className="step-n">{step.n}</span><span className="step-icon">{step.icon}</span><h3>{step.title}</h3><p>{step.text}</p></div>)}</div><div className="centered-action"><button className="text-link" onClick={onBook}>LET'S BOOK A SESSION <ArrowUpRight size={18}/></button></div></div></section>

    <section className="faq-section section"><div className="container faq-layout"><div><SectionLabel>04 / QUICK ANSWERS</SectionLabel><h2>GOT<br/><span>QUESTIONS?</span></h2><p>We've got the essentials. Need more? A real human at the café is just a message away.</p><a className="text-link" href={cafe.instagram} target="_blank" rel="noopener noreferrer">ASK US ON INSTAGRAM <ArrowUpRight size={18}/></a></div><div className="faqs">{faqs.map(([q,a], i) => <div className={"faq-item " + (faq === i ? "expanded" : "")} key={q}><button aria-expanded={faq === i} onClick={() => setFaq(faq === i ? -1 : i)}><span>{q}</span>{faq === i ? <Minus size={19}/> : <Plus size={19}/>}</button>{faq === i && <p>{a}</p>}</div>)}</div></div></section>

    <section className="location-section" id="location"><div className="container location-layout"><div><SectionLabel>05 / FIND THE PARADISE</SectionLabel><h2>YOUR NEXT<br/><span>HANGOUT IS HERE.</span></h2><p>Come find your people. Your controller is calling.</p><div className="location-meta"><div><MapPin size={21}/><span>{cafe.address}</span></div><div><Clock3 size={21}/><span>10:00 AM – 10:00 PM, as listed by the café.</span></div><div><Instagram size={21}/><a href={cafe.instagram} target="_blank" rel="noopener noreferrer">@pixelparadise.cafe</a></div></div><div className="location-buttons"><a className="btn btn-acid" href={cafe.mapsUrl} target="_blank" rel="noreferrer">GET DIRECTIONS <ArrowUpRight size={18}/></a><a href={cafe.instagram} target="_blank" rel="noreferrer" className="btn btn-outline"><Instagram size={18}/> INSTAGRAM</a></div></div><div className="location-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><div className="map-pin-graphic"><MapPin size={62}/></div><span>SECTOR 56 / NOIDA</span><div className="grid-plus plus-a">+</div><div className="grid-plus plus-b">+</div></div></div></section>
  </main>;
}

function Membership({ onJoin }) {
  return <main className="membership-page"><section className="inner-hero container"><div className="eyebrow"><span className="live-dot"/> PIXEL PARADISE MEMBERSHIPS</div><div className="inner-hero-row"><h1>PLAY MORE.<br/><em>BELONG MORE.</em></h1><div><p>Not just another membership. Your entry into the Pixel Paradise community.</p><span className="tag tag-outline">THE PIXEL CLUB / 001</span></div></div></section>
    <section className="plans-section"><div className="container"><div className="plans-intro"><SectionLabel>CHOOSE YOUR MODE</SectionLabel><p>These are membership enquiry options. Current prices and exact benefits are confirmed directly by the café before activation.</p></div><div className="plans-grid">{plans.map((plan, i) => <article className={"plan-card " + (plan.featured ? "featured" : "")} key={plan.id}><div className="plan-topline"><span>0{i+1} / {plan.label}</span>{plan.featured && <span className="popular-tag"><Sparkles size={13}/> FOR REGULARS</span>}</div><div className="plan-heading"><div className="plan-icon">{i===0 ? <Gamepad2 size={27}/> : i===1 ? <Zap size={27}/> : <Users size={27}/>}</div><h2>{plan.title}</h2><p>{plan.description}</p></div><div className="price-label"><strong>{plan.price}</strong><span>{plan.priceNote}</span></div><div className="plan-divider"/><div className="plan-benefits">{plan.features.map(f => <div key={f}><Check size={17}/><span>{f}</span></div>)}</div><button className={plan.featured ? "btn btn-acid" : "btn btn-plan"} onClick={() => onJoin(plan.id)}>{plan.action} <ArrowUpRight size={18}/></button></article>)}</div><p className="pricing-note"><ShieldCheck size={17}/> No payment is collected on this website. The café confirms all rates, eligibility, inclusions and availability before any membership begins.</p></div></section>
    <section className="member-banner"><div className="container member-banner-inner"><div><SectionLabel>ALREADY REQUESTED ACCESS?</SectionLabel><h2>YOUR PLAYER PASS<br/><em>IS RIGHT HERE.</em></h2><p>Check your saved request or ask our team for an update.</p></div><Link to="/my-pass" className="btn btn-acid">VIEW MY PASS <ArrowUpRight size={19}/></Link></div></section>
    <section className="perks-section section"><div className="container"><SectionLabel>WHAT'S THE POINT?</SectionLabel><div className="perks-grid">{[{icon:<Gift/>,title:"MORE REASONS TO PLAY",text:"Ask the team about their current membership offers and specials."},{icon:<Users/>,title:"FIND YOUR PEOPLE",text:"Turn gaming buddies into a regular squad, on and off the console."},{icon:<Trophy/>,title:"GAME NIGHT ENERGY",text:"Interested in match nights or group events? Let us know."}].map(x=><div className="perk" key={x.title}><span>{x.icon}</span><h3>{x.title}</h3><p>{x.text}</p></div>)}</div></div></section>
  </main>;
}

function Join({ onSave, onContact }) {
  const [search] = useSearchParams();
  const navigate = useNavigate();
  const selected = plans.find(x => x.id === search.get("plan")) || plans[1];
  const [form, setForm] = useState({name:"",phone:"",email:"",handle:"",plan:selected.id,consent:false});
  const [error, setError] = useState("");
  useEffect(() => setForm(v => ({...v,plan:selected.id})),[selected.id]);
  const plan = plans.find(x=>x.id===form.plan) || plans[1];
  function submit(e) {
    e.preventDefault();
    if (!form.consent) { setError("Please accept the privacy notice to continue."); return; }
    const phone = form.phone.replace(/\D/g,"");
    if (phone.length < 10 || phone.length > 13) { setError("Please enter a valid phone number."); return; }
    const request = { id:"PX-" + Date.now().toString(36).toUpperCase(), name:form.name.trim(), phone:form.phone.trim(), email:form.email.trim(), handle:form.handle.trim(), plan:plan.id, createdAt:new Date().toISOString(), status:"Awaiting café confirmation" };
    onSave({id:request.id,name:request.name,plan:request.plan,createdAt:request.createdAt,status:request.status});
    const msg = ["Hi Pixel Paradise! I'd like to enquire about Pixel Club membership.","","Request ID: "+request.id,"Name: "+request.name,"Phone: "+request.phone,"Plan: "+plan.title,request.handle ? "Gamer tag: "+request.handle : "",request.email ? "Email: "+request.email : "","","Please confirm the latest pricing, benefits and how to activate."].filter(Boolean).join("\n");
    onContact(msg);
    navigate("/my-pass");
  }
  return <main className="form-page"><div className="container form-layout"><div className="form-intro"><Link to="/membership" className="back-link"><ArrowLeft size={18}/> BACK TO MEMBERSHIPS</Link><SectionLabel>PLAYER REGISTRATION / 001</SectionLabel><h1>WELCOME<br/>TO THE <em>CLUB.</em></h1><p>Ready to make it official? Tell us a little about yourself. We'll prepare an Instagram enquiry for you to copy and send to the café team.</p><div className="form-aside-card"><div className="form-aside-icon"><ShieldCheck size={24}/></div><div><strong>NO CHARGES. NO SURPRISES.</strong><span>This is a request, not an active or paid membership. The café confirms everything with you.</span></div></div></div><div className="form-box"><div className="form-box-head"><div><span>MEMBERSHIP REQUEST</span><h2>CREATE YOUR PLAYER PROFILE</h2></div><Ticket size={30}/></div><form onSubmit={submit}><div className="field"><label htmlFor="join-name">FULL NAME *</label><input id="join-name" autoComplete="name" maxLength={80} placeholder="Your name" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div><div className="field-row"><div className="field"><label htmlFor="join-phone">PHONE NUMBER *</label><input id="join-phone" type="tel" autoComplete="tel" maxLength={18} placeholder="+91 98765 43210" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div><div className="field"><label htmlFor="join-email">EMAIL (OPTIONAL)</label><input id="join-email" type="email" autoComplete="email" maxLength={120} placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div></div><div className="field"><label htmlFor="join-handle">GAMER TAG (OPTIONAL)</label><input id="join-handle" maxLength={40} placeholder="What should we call you in-game?" value={form.handle} onChange={e=>setForm({...form,handle:e.target.value})}/></div><div className="field"><label htmlFor="join-plan">I'M INTERESTED IN *</label><select id="join-plan" value={form.plan} onChange={e=>setForm({...form,plan:e.target.value})}>{plans.map(p=><option value={p.id} key={p.id}>{p.title} — {p.price}</option>)}</select></div><div className="notice-block"><MessageCircle size={22}/><span>We prepare a message for you to copy and paste into an Instagram DM. <b>You must send the DM yourself</b> for the café to receive it.</span></div><label className="consent"><input type="checkbox" checked={form.consent} onChange={e=>setForm({...form,consent:e.target.checked})}/><span>I understand my name, plan, request ID and date are stored on this browser, and my contact details are shared with the café only if I send the Instagram message myself. I have read the <Link to="/privacy" target="_blank">privacy note</Link>.</span></label>{error && <p className="form-error" role="alert">{error}</p>}<button type="submit" className="btn btn-acid btn-full">PREPARE INSTAGRAM ENQUIRY <ArrowUpRight size={19}/></button><small className="under-submit">Membership activation and payment, if applicable, happen directly with the café.</small></form></div></div></main>;
}

function MyPass({ member, onClear, onBook, onContact }) {
  const navigate=useNavigate();
  const plan=plans.find(x=>x.id===member?.plan);
  const [copied,setCopied] = useState(false);
  return <main className="pass-page"><div className="container pass-container"><SectionLabel>PIXEL CLUB / MEMBER ACCESS</SectionLabel><h1>{member ? "HEY, PLAYER." : "YOUR PASS AWAITS."}<br/><em>{member ? "GOOD TO SEE YOU." : "LET'S FIX THAT."}</em></h1>{!member ? <div className="empty-pass"><span className="empty-pass-icon"><Ticket size={54}/></span><h2>NO REQUEST ON THIS DEVICE YET</h2><p>Your player pass appears here after you fill out a membership enquiry. Requests are saved only in the browser where they were created.</p><Link to="/membership" className="btn btn-acid">EXPLORE MEMBERSHIPS <ArrowUpRight size={18}/></Link></div> : <div className="pass-layout"><div className="pass-card"><div className="pass-card-top"><span>PIXEL<span>PARADISE</span></span><span>CLUB / 001</span></div><div className="pass-card-badge">P<span>×</span>P</div><div className="pass-card-bottom"><div><small>PLAYER</small><strong>{member.name}</strong></div><div><small>INTEREST</small><strong>{plan?.title || "Pixel Club"}</strong></div><div className="pass-id">{member.id}</div></div></div><div className="pass-details"><div className="pending-status"><span className="pending-dot"/> REQUEST SAVED • NOT AN ACTIVE MEMBERSHIP</div><h2>ONE STEP CLOSER<br/>TO PARADISE.</h2><p>Your enquiry was prepared on {new Date(member.createdAt).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})}. Please ensure you've sent the WhatsApp message, then wait for the café to confirm plan details and activation.</p><div className="detail-row"><span>PLAYER NAME</span><strong>{member.name}</strong></div><div className="detail-row"><span>PLAN INTEREST</span><strong>{plan?.title}</strong></div><div className="detail-row"><span>REQUEST ID</span><strong>{member.id}</strong></div><div className="pass-actions"><button className="btn btn-acid" onClick={() => onContact("Hi Pixel Paradise! Can you check my membership enquiry? Request ID: "+member.id+". Name: "+member.name+". Plan: "+(plan?.title||member.plan))}>CONTACT THE CAFÉ <ArrowUpRight size={18}/></button><button className="btn btn-outline" onClick={async()=>{try {await navigator.clipboard.writeText(member.id); setCopied(true);} catch {setCopied(false);}}}>{copied?<Check size={17}/>:<Copy size={17}/>} {copied?"COPIED":"COPY ID"}</button></div><div className="pass-footer-actions"><button onClick={()=>navigate("/membership")}>Browse other plans <ArrowRight size={15}/></button><button onClick={() => {if(window.confirm("Remove this saved membership enquiry from this browser?"))onClear();}}>Delete local request</button></div></div></div>}<div className="pass-help"><span>JUST HERE TO PLAY?</span><button className="text-link" onClick={onBook}>BOOK A GAMING SESSION <ArrowUpRight size={18}/></button></div></div></main>;
}

function BookingModal({ onClose, onContact }) {
  const [form,setForm]=useState({name:"",phone:"",console:"PS5",date:"",time:"",players:"2"});
  useEffect(()=>{const before=document.body.style.overflow;document.body.style.overflow="hidden";function esc(e){if(e.key==="Escape")onClose();}window.addEventListener("keydown",esc);return()=>{document.body.style.overflow=before;window.removeEventListener("keydown",esc);};},[onClose]);
  const today = new Date();
  const localToday = new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
  function submit(e) {
    e.preventDefault();
    const message=["Hi Pixel Paradise! I'd like to request a gaming session.","","Name: "+form.name,"Contact: "+form.phone,"Console: "+form.console,"Date: "+form.date,"Preferred time: "+form.time,"Players: "+form.players,"","Please confirm availability, pricing and my booking."].join("\n");
    onContact(message);
    onClose();
  }
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}><div className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="book-title"><button className="modal-close" aria-label="Close booking" onClick={onClose}><X size={22}/></button><SectionLabel>BOOK YOUR NEXT ROUND</SectionLabel><h2 id="book-title">LET'S GET<br/><em>YOU PLAYING.</em></h2><p>Tell us when you're coming. We'll prepare an Instagram message for you to send so the café can confirm your spot.</p><form onSubmit={submit}><div className="field-row"><div className="field"><label htmlFor="book-name">YOUR NAME *</label><input id="book-name" required maxLength={80} placeholder="Player name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></div><div className="field"><label htmlFor="book-phone">PHONE NUMBER *</label><input id="book-phone" required type="tel" maxLength={18} placeholder="Your number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div></div><div className="field-row"><div className="field"><label htmlFor="book-console">CONSOLE</label><select id="book-console" value={form.console} onChange={e=>setForm({...form,console:e.target.value})}><option>PS5</option><option>PS4</option><option>G29 Racing Wheel</option><option>Either is fine</option></select></div><div className="field"><label htmlFor="book-players">PLAYERS</label><select id="book-players" value={form.players} onChange={e=>setForm({...form,players:e.target.value})}>{[1,2,3,4,5,6,7,8].map(n=><option key={n}>{n}</option>)}</select></div></div><div className="field-row"><div className="field"><label htmlFor="book-date">PREFERRED DATE *</label><input type="date" id="book-date" required min={localToday} value={form.date} onChange={e=>setForm({...form,date:e.target.value})}/></div><div className="field"><label htmlFor="book-time">PREFERRED TIME *</label><input type="time" id="book-time" required value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></div></div><button className="btn btn-acid btn-full" type="submit">PREPARE INSTAGRAM DM <ArrowUpRight size={18}/></button><small>Not a confirmed reservation. Copy your message and send it as an Instagram DM for availability and pricing.</small></form></div></div>;
}

function Privacy() {return <main className="privacy-page container"><SectionLabel>PRIVACY / THE ESSENTIALS</SectionLabel><h1>YOUR DATA.<br/><em>YOUR CONTROL.</em></h1><div className="privacy-copy"><h2>What happens to your information?</h2><p>Membership request names, plan interests, request IDs and dates are stored in this browser using localStorage. Phone numbers and email addresses are not stored in localStorage. No request is sent to a website server. The saved request can be removed at any time from My Pass.</p><p>You may copy the prepared message and paste it into an Instagram DM. Your details are shared only if you send that message yourself. Instagram's privacy terms apply.</p><p>Booking enquiries use Instagram DM drafts as well. We do not verify or confirm memberships, accept payments, store bookings in a central database, or provide login accounts in this version.</p><h2>Need help?</h2><p>Reach Pixel Paradise on <a href={cafe.instagram} target="_blank" rel="noopener noreferrer">Instagram</a> or visit the café in Sector 56, Noida.</p><Link to="/" className="text-link">BACK HOME <ArrowRight size={18}/></Link></div></main>;}

function SiteFooter({onBook}) {return <footer className="site-footer"><div className="container"><div className="footer-main"><div><Brand/><p>More than a gaming café.<br/>A place to call your second home.</p></div><div><span>EXPLORE</span><Link to="/">Home</Link><Link to="/membership">Pixel Club</Link><Link to="/my-pass">My Pass</Link></div><div><span>CONNECT</span><a href={cafe.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/></a><button onClick={onBook}>Book a session <ArrowUpRight size={14}/></button><a href={cafe.instagram} target="_blank" rel="noopener noreferrer">Message us <ArrowUpRight size={14}/></a></div><div><span>FIND US</span><p>{cafe.address}</p><a href={cafe.mapsUrl} target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={14}/></a></div></div><div className="footer-big">KEEP PLAYING<span>✳</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} PIXEL PARADISE. MADE FOR PLAYERS.</span><div><span>Photography illustrates the gaming vibe, not the actual venue.</span><Link to="/privacy">PRIVACY</Link></div></div></div></footer>;}

export default function App() {
  const [member,setMember]=useState(storedRequest);
  const [booking,setBooking]=useState(false);
  const [contactDraft,setContactDraft]=useState(null);
  const appRef=useRef(null);
  const location=useLocation();
  const navigate=useNavigate();
  useSiteMotion(appRef,location.pathname);
  useEffect(()=>{window.scrollTo({top:0,behavior:"instant"});},[location.pathname]);
  useEffect(() => {
    const onContextMenu = e => { if (!e.target.closest?.("input, textarea, select, [contenteditable]")) e.preventDefault(); };
    const onDragStart = e => { if (e.target.closest?.("img")) e.preventDefault(); };
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("dragstart", onDragStart);
    return () => { document.removeEventListener("contextmenu", onContextMenu); document.removeEventListener("dragstart", onDragStart); };
  }, []);
  function save(v){try {localStorage.setItem(STORE_KEY,JSON.stringify(v));} catch { /* Storage can be disabled. */ } setMember(v);}
  function clear(){try {localStorage.removeItem(STORE_KEY);} catch { /* Storage can be disabled. */ } setMember(null);}
  return <div className="app-shell" ref={appRef}><SiteHeader onBook={()=>setBooking(true)} member={member}/><Routes><Route path="/" element={<Home onBook={()=>setBooking(true)}/>}/><Route path="/membership" element={<Membership onJoin={id=>navigate("/join?plan="+id)}/>}/><Route path="/join" element={<Join onSave={save} onContact={setContactDraft}/>}/><Route path="/my-pass" element={<MyPass member={member} onClear={clear} onBook={()=>setBooking(true)} onContact={setContactDraft}/>}/><Route path="/privacy" element={<Privacy/>}/><Route path="*" element={<Home onBook={()=>setBooking(true)}/>}/></Routes><SiteFooter onBook={()=>setBooking(true)}/>{booking&&<BookingModal onClose={()=>setBooking(false)} onContact={setContactDraft}/>} {contactDraft&&<ContactHandoff message={contactDraft} onClose={()=>setContactDraft(null)}/>}</div>;
}
