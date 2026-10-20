import { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import { personalInfo } from '../data/personalInfo.js';

/**
 * Checks that the PDF really exists before downloading. Vite/Vercel can return
 * index.html with a 200 for a missing file, so the content type is verified too.
 */
export default function ResumeButton({ variant = 'secondary', className = '' }) {
  const [status, setStatus] = useState('idle'); // idle | checking | missing
  const { url, filename } = personalInfo.resume;

  async function handleClick() {
    setStatus('checking');
    try {
      const response = await fetch(url, { method: 'HEAD', cache: 'no-store' });
      const type = response.headers.get('content-type') || '';
      if (!response.ok || !type.includes('pdf')) throw new Error('Resume not found');

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setStatus('idle');
    } catch {
      setStatus('missing');
    }
  }

  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';

  return (
    <div className="inline-flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={status === 'checking'}
        className={`btn ${variantClass} ${className}`}
      >
        {status === 'checking' ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          <Download className="h-4 w-4" aria-hidden="true" />
        )}
        <span>Download Resume</span>
      </button>
      <p role="status" aria-live="polite" className="max-w-xs text-xs text-muted">
        {status === 'missing' &&
          (personalInfo.email
            ? `The resume isn't available right now. Please email me at ${personalInfo.email}.`
            : "The resume isn't available right now. Please use the contact form below.")}
      </p>
    </div>
  );
}
