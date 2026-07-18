import apiClient from './apiClient';

/**
 * Upload a PDF file to the backend.
 *
 * @param {FormData} formData - Must contain a field named "pdf" with the File object.
 *                              Optionally include "chatId" to associate the doc with a chat.
 * @param {object}   config   - Axios request config overrides (e.g. onUploadProgress, signal)
 */
export function uploadPdf(formData, config = {}) {
  return apiClient.post('/documents/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    ...config,
  });
}

/**
 * Fetch all documents uploaded by the current user.
 * Prepared for Phase 2+ document history UI.
 */
export function getDocuments() {
  return apiClient.get('/documents');
}
