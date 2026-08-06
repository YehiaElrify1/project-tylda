/**
 * AVO HealthCare - ChatView
 * View controller for the Live AI Medical Assistant widget
 */
export class ChatView {
  constructor(chatViewModel) {
    this.vm = chatViewModel;
    this.chatBody = document.getElementById('chat-body');
    this.chatInput = document.getElementById('chat-input');
    this.sendBtn = document.getElementById('chat-send-btn');
    this.promptsContainer = document.getElementById('chat-quick-prompts');

    this.bindEvents();
  }

  bindEvents() {
    // Render Quick Prompt chips
    if (this.promptsContainer) {
      this.promptsContainer.innerHTML = this.vm.quickPrompts
        .map(
          (p) => `<button class="prompt-chip" data-prompt-id="${p.id}">${p.label}</button>`
        )
        .join('');

      this.promptsContainer.addEventListener('click', (e) => {
        const chip = e.target.closest('.prompt-chip');
        if (chip) {
          const promptId = chip.getAttribute('data-prompt-id');
          this.vm.sendQuickPrompt(promptId);
        }
      });
    }

    // Input submit handling
    const handleSend = () => {
      const text = this.chatInput?.value;
      if (text && text.trim()) {
        this.vm.sendMessage(text);
        if (this.chatInput) this.chatInput.value = '';
      }
    };

    this.sendBtn?.addEventListener('click', handleSend);
    this.chatInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
      }
    });

    // Subscribe to messages changes
    this.vm.messages.subscribe((messages) => {
      this.renderMessages(messages);
    }, true);

    // Subscribe to typing state
    this.vm.isTyping.subscribe((typing) => {
      this.toggleTypingIndicator(typing);
    });
  }

  renderMessages(messages) {
    if (!this.chatBody) return;

    this.chatBody.innerHTML = messages
      .map((msg) => {
        const formattedText = msg.text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\n/g, '<br/>');

        return `
        <div class="chat-msg ${msg.sender}">
          <div class="chat-avatar">${msg.sender === 'bot' ? 'AI' : 'You'}</div>
          <div class="chat-bubble">
            ${formattedText}
            <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px; text-align: right;">
              ${msg.timestamp || ''}
            </div>
          </div>
        </div>
      `;
      })
      .join('');

    this.scrollToBottom();
  }

  toggleTypingIndicator(isTyping) {
    const existing = document.getElementById('chat-typing-indicator');
    if (isTyping && !existing) {
      const indicator = document.createElement('div');
      indicator.id = 'chat-typing-indicator';
      indicator.className = 'chat-msg bot';
      indicator.innerHTML = `
        <div class="chat-avatar">AI</div>
        <div class="chat-bubble">
          <div class="typing-dots">
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
            <span class="typing-dot"></span>
          </div>
        </div>
      `;
      this.chatBody?.appendChild(indicator);
      this.scrollToBottom();
    } else if (!isTyping && existing) {
      existing.remove();
    }
  }

  scrollToBottom() {
    if (this.chatBody) {
      this.chatBody.scrollTop = this.chatBody.scrollHeight;
    }
  }
}
