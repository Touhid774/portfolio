import { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import LinkButton from '../components/LinkButton.jsx';
import ResumeButton from '../components/ResumeButton.jsx';
import { GithubIcon, LinkedinIcon } from '../components/Icons.jsx';
import { personalInfo } from '../data/personalInfo.js';
import { MESSAGE_MAX, validateContact } from '../utils/validation.js';

const EMPTY = { name: '', email: '', subject: '', message: '', company: '' }; // `company` = honeypot
const FIELD_ORDER = ['name', 'email', 'subject', 'message'];

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 flex items-center gap-1.5 text-sm text-red-500">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | mailto | error
  const [errorMessage, setErrorMessage] = useState('');
  const formRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
    if (status !== 'idle' && status !== 'loading') setStatus('idle');
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (status === 'loading') return;

    // Bots fill the hidden field; humans never see it. Pretend success and send nothing.
    if (values.company) {
      setStatus('success');
      setValues(EMPTY);
      return;
    }

    const found = validateContact(values);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus();
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    // 1) Real delivery through a configured endpoint (e.g. Formspree).
    if (personalInfo.contactEndpoint) {
      setStatus('loading');
      try {
        const response = await fetch(personalInfo.contactEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        setStatus('success');
        setValues(EMPTY);
      } catch {
        setErrorMessage(
          personalInfo.email
            ? `Something went wrong and your message wasn't sent. Please try again or email me at ${personalInfo.email}.`
            : "Something went wrong and your message wasn't sent. Please try again in a moment.",
        );
        setStatus('error');
      }
      return;
    }

    // 2) No endpoint: fall back to the visitor's email app (nothing is claimed as "sent").
    if (personalInfo.email) {
      const body = `${payload.message}\n\n— ${payload.name} (${payload.email})`;
      window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('mailto');
      return;
    }

    // 3) Nothing configured yet – be honest about it.
    setErrorMessage('The contact form is not configured yet, so this message could not be delivered.');
    setStatus('error');
  }

  const describedBy = (field) => (errors[field] ? `${field}-error` : undefined);

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-pad">
      <div className="container-page">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Let's work together"
          description="Have a role, project or question in mind? Send me a message and I'll get back to you."
        />

        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal className="space-y-6">
            <div className="flex flex-col items-start gap-3">
              <LinkButton
                href={personalInfo.email ? `mailto:${personalInfo.email}` : ''}
                icon={Mail}
                external={false}
                unavailableHint="Email address not added yet"
              >
                {personalInfo.email || 'Email'}
              </LinkButton>
              <LinkButton href={personalInfo.github} icon={GithubIcon} unavailableHint="GitHub link not added yet">
                GitHub
              </LinkButton>
              <LinkButton href={personalInfo.linkedin} icon={LinkedinIcon} unavailableHint="LinkedIn link not added yet">
                LinkedIn
              </LinkButton>
              <ResumeButton />
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-muted">Based in {personalInfo.location}.</p>
          </Reveal>

          <Reveal delay={0.08}>
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="card space-y-5 p-6 sm:p-8" aria-label="Contact form">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={handleChange}
                    className="field"
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy('name')}
                  />
                  <FieldError id="name-error" message={errors.name} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    className="field"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy('email')}
                  />
                  <FieldError id="email-error" message={errors.email} />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={values.subject}
                  onChange={handleChange}
                  className="field"
                  placeholder="What is this about?"
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={describedBy('subject')}
                />
                <FieldError id="subject-error" message={errors.subject} />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  maxLength={MESSAGE_MAX + 200}
                  value={values.message}
                  onChange={handleChange}
                  className="field resize-y"
                  placeholder="Tell me a little about your project or role…"
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={describedBy('message')}
                />
                <div className="mt-1.5 flex items-start justify-between gap-4">
                  <FieldError id="message-error" message={errors.message} />
                  <span className="ml-auto text-xs text-muted">
                    {values.message.length}/{MESSAGE_MAX}
                  </span>
                </div>
              </div>

              {/* Honeypot: hidden from people and assistive tech, bots tend to fill it. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company (leave blank)</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={handleChange} />
              </div>

              <button type="submit" disabled={status === 'loading'} className="btn btn-primary w-full sm:w-auto">
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </button>

              <div aria-live="polite">
                {status === 'success' && (
                  <p role="status" className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    Thanks! Your message was sent. I'll get back to you soon.
                  </p>
                )}
                {status === 'mailto' && (
                  <p role="status" className="flex items-start gap-2 rounded-xl border border-accent/30 bg-accent/10 p-4 text-sm text-ink">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    Your email app should now open with the message filled in. Press send there to deliver it.
                  </p>
                )}
                {status === 'error' && (
                  <p role="alert" className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                    {errorMessage}
                  </p>
                )}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
