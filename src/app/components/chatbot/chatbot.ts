import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatbotService } from '../../services/chatbot.service';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.html',
  styleUrl: './chatbot.css'
})
export class ChatbotComponent implements AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer!: ElementRef;

  isOpen = false;
  saisieUtilisateur = '';
  isTyping = false;

  messages: Message[] = [
    {
      sender: 'bot',
      text: 'مرحباً بك! أنا المساعد الافتراضي بالذكاء الاصطناعي. كيف يمكنني مساعدتك؟',
      time: this.getHeureActuelle()
    }
  ];

  questionsRapides: string[] = [
    'كيف أسجل في دورة؟',
    'كيف ألغي تسجيلي؟',
    'أين أجد الدورات السابقة؟'
  ];

  constructor(private chatbotService: ChatbotService) {}

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  envoyerMessage(texte?: string): void {
    const msg = texte || this.saisieUtilisateur.trim();
    if (!msg) return;

    this.messages.push({
      sender: 'user',
      text: msg,
      time: this.getHeureActuelle()
    });

    if (!texte) this.saisieUtilisateur = '';

    this.isTyping = true;

    this.chatbotService.poserQuestion(msg).subscribe({
      next: (res) => {
        this.isTyping = false;
        this.messages.push({
          sender: 'bot',
          text: res.response,
          time: this.getHeureActuelle()
        });
      },
      error: () => {
        this.isTyping = false;
        this.messages.push({
          sender: 'bot',
          text: 'عذراً، حدث خطأ في الاتصال بالخادم',
          time: this.getHeureActuelle()
        });
      }
    });
  }

  private getHeureActuelle(): string {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  private scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
}
