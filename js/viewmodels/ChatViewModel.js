import { Observable } from '../core/Observable.js';
import { INITIAL_CHAT_MESSAGES, QUICK_PROMPTS } from '../models/ChatModel.js';

/**
 * AVO HealthCare - ChatViewModel
 * Manages the reactive chat state, prompt triggers, typing simulation, and message list
 */
export class ChatViewModel {
  constructor() {
    this.messages = new Observable([...INITIAL_CHAT_MESSAGES]);
    this.isTyping = new Observable(false);
    this.quickPrompts = QUICK_PROMPTS;
  }

  /**
   * Sends user message and generates AI response with realistic typing delay
   */
  sendMessage(userText) {
    if (!userText || !userText.trim()) return;

    const trimmed = userText.trim();
    const currentList = [...this.messages.value];
    
    // Add user message
    currentList.push({
      sender: 'user',
      text: trimmed,
      timestamp: this._formatTime()
    });
    this.messages.value = currentList;

    // Trigger typing state
    this.isTyping.value = true;

    // Find response or default fallback
    const matchedPrompt = this.quickPrompts.find(
      (p) => p.query.toLowerCase() === trimmed.toLowerCase() || trimmed.toLowerCase().includes(p.label.toLowerCase())
    );

    const botResponseText = matchedPrompt 
      ? matchedPrompt.response 
      : `Thank you for sharing. Based on "${trimmed}", our clinical AI recommends consulting a certified specialist on AVO HealthCare for a comprehensive evaluation. Would you like to view top available physicians?`;

    setTimeout(() => {
      this.isTyping.value = false;
      this.messages.value = [
        ...this.messages.value,
        {
          sender: 'bot',
          text: botResponseText,
          timestamp: this._formatTime()
        }
      ];
    }, 1100);
  }

  sendQuickPrompt(promptId) {
    const prompt = this.quickPrompts.find((p) => p.id === promptId);
    if (prompt) {
      this.sendMessage(prompt.query);
    }
  }

  clearChat() {
    this.messages.value = [...INITIAL_CHAT_MESSAGES];
    this.isTyping.value = false;
  }

  _formatTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
