import apiClient from './apiClient';

export function getChats() {
  return apiClient.get('/chats');
}

export function getChat(chatId) {
  return apiClient.get(`/chats/${chatId}`);
}

export function sendChatMessage(payload, config = {}) {
  return apiClient.post('/chat', payload, config);
}

export function deleteChat(chatId) {
  return apiClient.delete(`/chats/${chatId}`);
}

export function clearChats() {
  return apiClient.delete('/chats');
}

export function setMessageFeedback(messageId, feedback) {
  return apiClient.patch(`/messages/${messageId}/feedback`, { feedback });
}
