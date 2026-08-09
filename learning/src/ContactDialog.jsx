import { useState } from 'react'
import Modal from './Modal.jsx'

const contactEmail = 'kevyang386@gmail.com'

function ContactDialog({ onClose }) {
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contactEmail)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <Modal
      className="contact-backdrop"
      onClose={onClose}
    >
      <div
        className="contact-dialog"
        aria-labelledby="contact-title"
      >
        <header className="contact-header">
          <div>
            <h1 id="contact-title">YIPPPPPPPEEEEEE</h1>
          </div>
        </header>
        <div className="contact-profile">
          <img src="https://i.pinimg.com/originals/6b/f0/63/6bf063b0a6b5985b8a812385a53d24af.gif"/>
          <div>
            <p>
              Have a role, project, or internship in mind? Send me an email and
              let's talk.
            </p>
          </div>

          <div className="contact-email">
            <span>EMAIL</span>
            <strong>{contactEmail}</strong>
            <button autoFocus type="button" onClick={copyEmail}>
              {copied ? 'Copied!' : 'Copy email'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default ContactDialog
