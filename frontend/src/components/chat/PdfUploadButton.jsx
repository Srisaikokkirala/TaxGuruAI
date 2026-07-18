import { useRef, useState } from 'react';
import { Paperclip, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { uploadPdf } from '@/services/documentService';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Self-contained PDF upload button for the chat composer toolbar.
 *
 * Props:
 *   chatId         {string}   (optional) Active chat ID to associate the PDF with a conversation.
 *   onUploadSuccess {function} (optional) Called with the uploaded document object on success.
 */
export default function PdfUploadButton({ chatId, onUploadSuccess }) {
  const inputRef = useRef(null);

  // 'idle' | 'uploading' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [progress, setProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null); // { name, size }
  const [errorMsg, setErrorMsg] = useState('');

  function handleButtonClick() {
    // Reset to idle so the user can upload again after success/error
    if (status === 'success' || status === 'error') {
      setStatus('idle');
      setUploadedFile(null);
      setErrorMsg('');
      setProgress(0);
    }
    inputRef.current?.click();
  }

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    // Reset input so the same file can be re-selected after clearing
    event.target.value = '';

    if (!file) return;

    // Client-side MIME type guard
    if (file.type !== 'application/pdf') {
      setStatus('error');
      setErrorMsg('Only PDF files are accepted.');
      toast.error('Only PDF files are accepted.');
      return;
    }

    // Client-side size guard (matches backend 10 MB limit)
    if (file.size > MAX_FILE_SIZE) {
      setStatus('error');
      setErrorMsg('File exceeds the 10 MB limit.');
      toast.error('File exceeds the 10 MB limit.');
      return;
    }

    const formData = new FormData();
    formData.append('pdf', file);
    if (chatId) formData.append('chatId', chatId);

    setStatus('uploading');
    setProgress(0);
    setUploadedFile({ name: file.name, size: file.size });
    setErrorMsg('');

    try {
      const response = await uploadPdf(formData, {
        onUploadProgress: (evt) => {
          if (evt.total) {
            setProgress(Math.round((evt.loaded / evt.total) * 100));
          }
        },
      });

      setStatus('success');
      setProgress(100);
      toast.success('PDF uploaded successfully!');
      onUploadSuccess?.(response.data.document);
    } catch (err) {
      const message =
        err?.response?.data?.message || 'Upload failed. Please try again.';
      setStatus('error');
      setErrorMsg(message);
      toast.error(message);
    }
  }

  return (
    <div className="relative flex items-center gap-2">
      {/* Hidden file input — PDF only */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Trigger button */}
      <button
        type="button"
        title="Upload a Tax PDF"
        onClick={handleButtonClick}
        disabled={status === 'uploading'}
        className={clsx(
          'inline-flex items-center justify-center gap-1.5 rounded-xl border px-3.5 py-2 text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50',
          status === 'success' &&
            'border-emerald-700/50 bg-emerald-950/30 text-emerald-400 hover:bg-emerald-950/50',
          status === 'error' &&
            'border-rose-700/50 bg-rose-950/30 text-rose-400 hover:bg-rose-950/50',
          status === 'uploading' &&
            'border-accent-700/50 bg-accent-950/20 text-accent-400',
          (status === 'idle') &&
            'border-ink-800 bg-ink-850 text-slate-100 hover:bg-ink-800 hover:text-white'
        )}
      >
        {status === 'uploading' ? (
          <Loader2 size={14} className="animate-spin" />
        ) : status === 'success' ? (
          <CheckCircle size={14} />
        ) : status === 'error' ? (
          <XCircle size={14} />
        ) : (
          <Paperclip size={14} />
        )}
        <span className="hidden sm:inline">
          {status === 'uploading' ? 'Uploading…' : 'Upload PDF'}
        </span>
      </button>

      {/* Inline status indicator shown after a file is chosen */}
      {uploadedFile && (
        <div
          className={clsx(
            'flex max-w-[220px] flex-col rounded-xl border px-3 py-2 text-xs leading-5 transition-all duration-200',
            status === 'success' &&
              'border-emerald-800/50 bg-emerald-950/20 text-emerald-300',
            status === 'error' &&
              'border-rose-800/50 bg-rose-950/20 text-rose-300',
            status === 'uploading' &&
              'border-accent-800/50 bg-accent-950/20 text-accent-300'
          )}
        >
          {/* File name — truncated */}
          <span
            className="max-w-full truncate font-medium"
            title={uploadedFile.name}
          >
            {uploadedFile.name}
          </span>

          <span className="text-[11px] opacity-75">
            {formatFileSize(uploadedFile.size)}
          </span>

          {/* Progress bar */}
          {status === 'uploading' && (
            <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-ink-800">
              <div
                className="h-full rounded-full bg-accent-500 transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Status label */}
          {status === 'success' && (
            <span className="mt-0.5 text-[11px] font-semibold text-emerald-400">
              ✓ Uploaded
            </span>
          )}
          {status === 'error' && (
            <span
              className="mt-0.5 max-w-full truncate text-[11px] font-semibold text-rose-400"
              title={errorMsg}
            >
              ✕ {errorMsg}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
