import { useEffect, useRef, useState } from 'react'

const contactEmail = 'kevyang386@gmail.com'

function ContactDialog({ onClose }) {
  const dialogRef = useRef(null)
  const copyButtonRef = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement
    const dialog = dialogRef.current

    copyButtonRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialog) return

      const focusableElements = Array.from(
        dialog.querySelectorAll('button:not([disabled])'),
      )
      const firstElement = focusableElements[0]
      const lastElement = focusableElements.at(-1)

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement?.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement?.focus()
      }
    }

    function keepFocusInDialog(event) {
      if (!dialog?.contains(event.target)) copyButtonRef.current?.focus()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('focusin', keepFocusInDialog)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('focusin', keepFocusInDialog)
      previouslyFocusedElement?.focus()
    }
  }, [onClose])

  async function copyEmail() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(contactEmail)
      } else {
        const copyField = document.createElement('textarea')
        copyField.value = contactEmail
        copyField.setAttribute('readonly', '')
        copyField.style.position = 'fixed'
        copyField.style.opacity = '0'
        document.body.appendChild(copyField)
        copyField.select()
        document.execCommand('copy')
        copyField.remove()
      }
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      className="contact-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        className="contact-dialog"
        role="dialog"
        aria-modal="true"
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
            <button ref={copyButtonRef} type="button" onClick={copyEmail}>
              {copied ? 'Copied!' : 'Copy email'}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactDialog
