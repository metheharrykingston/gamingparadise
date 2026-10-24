import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy, Instagram, X } from "lucide-react";
import { cafe } from "./config";

export default function ContactHandoff({ message, onClose }) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const textareaRef = useRef(null);
  useEffect(() => {
    const onEscape = e => { if(e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [onClose]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setCopyError(false);
    } catch {
      textareaRef.current?.select();
      setCopyError(true);
    }
  }
  return <div className="modal-backdrop" onMouseDown={e => { if(e.target === e.currentTarget) onClose(); }}>
    <div className="booking-modal contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <button className="modal-close" onClick={onClose} aria-label="Close message"><X size={22}/></button>
      <div className="section-label"><span className="label-dash"/> READY FOR YOUR NEXT ROUND?</div>
      <h2 id="contact-title">SEND YOUR<br/><em>ENQUIRY.</em></h2>
      <p>We've prepared your request below. <b>Copy it and paste it into a DM</b> to <strong>@pixelparadise.cafe</strong>. Nothing has been sent automatically.</p>
      <label className="draft-label" htmlFor="enquiry-message">YOUR MESSAGE</label>
      <textarea ref={textareaRef} readOnly id="enquiry-message" rows={8} value={message} onFocus={e=>e.target.select()}/>
      <div className="contact-buttons">
        <button className="btn btn-dark" onClick={copy}>{copied ? <Check size={18}/> : <Copy size={18}/>} {copied ? "MESSAGE COPIED" : "COPY MESSAGE"}</button>
        <a className="btn btn-acid" href={cafe.instagram} target="_blank" rel="noopener noreferrer"><Instagram size={18}/> OPEN INSTAGRAM <ArrowUpRight size={17}/></a>
      </div>
      {copyError && <p className="copy-help" role="status">Clipboard permission is unavailable. The message is selected so you can copy it manually.</p>}
      <small>Your request is not an active membership or a confirmed booking until the café verifies it.</small>
    </div>
  </div>;
}
