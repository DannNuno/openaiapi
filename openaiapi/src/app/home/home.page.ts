import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonSpinner, IonButtons } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';
import { OpenAIService } from '../openai.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    IonButton,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonSpinner,
    IonButtons
  ],
  providers: [OpenAIService]
})
export class HomePage implements OnInit {
  question: string = '';
  response: string = '';
  loading: boolean = false;
  userSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private openAIService: OpenAIService, private router: Router) {}

  ngOnInit() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    const user = await this.authService.getCurrentUser();  // Verifica si el usuario está autenticado
    if (!user) {
      this.router.navigate(['/login']);  // Redirige a login si no hay sesión activa
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirige al login después de cerrar sesión
  }

  async sendQuestion() {
    if (!this.question.trim()) return;
    
    this.loading = true;
    this.response = '';

    try {
      this.response = await this.openAIService.askQuestion(this.question);
    } catch (error) {
      this.response = 'Error al obtener respuesta de la IA.';
      console.error(error);
    }

    this.loading = false;
  }
}
