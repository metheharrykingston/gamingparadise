import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, MessageCircle, X } from "lucide-react";
import { whatsappLink } from "./config";

export default function ContactHandoff({ message, onClose }) {
  const [copied,setCopied]=useState(false);
  const [copyError,setCopyError]=useState(false);
  const textareaRef=useRef(null);
  useEffect(()=>{
    const onEscape=e=>{if(e.key==="Escape")onClose();};
    document.addEventListener("keydown",onEscape);
    return ()=>document.removeEventListener("keydown",onEscape);
  },[onClose]);
  async function copy() {
    try {await navigator.clipboard.writeText(message);setCopied(true);setCopyError(false);}
    catch {textareaRef.current?.select();setCopyError(true);}
  }
  return <div className="modal-backdrop" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <div className="booking-modal contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <button className="modal-close" onClick={onClose} aria-label="Close message"><X size={22}/></button>
      <div className="section-label"><span className="label-dash"/> PIXEL PARADISE / CONTACT</div>
      <h2 id="contact-title">READY TO<br/><em>MESSAGE.</em></h2>
      <p>We've prepared your enquiry for <strong>+91 87459 98333</strong>. Tap Open WhatsApp and press <b>Send</b> in the chat. No message is sent automatically.</p>
      <label className="draft-label" htmlFor="enquiry-message">PRE-FILLED MESSAGE</label>
      <textarea ref={textareaRef} readOnly id="enquiry-message" rows={8} value={message} onFocus={e=>e.target.select()}/>
      <div className="contact-buttons">
        <a className="btn btn-acid" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> OPEN WHATSAPP <ArrowUpRight size={17}/></a>
        <button className="btn btn-dark" onClick={copy}>{copied?<Check size={18}/>:<Copy size={18}/>} {copied?"COPIED":"COPY MESSAGE"}</button>
      </div>
      {copyError&&<p className="copy-help" role="status">Clipboard permission unavailable. Copy the selected text manually if needed.</p>}
      <small>Memberships and gaming sessions are only enquiries until the café confirms them.</small>
    </div>
  </div>;
}
