import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonItem, IonInput, IonButton, IonSpinner } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service';  // Asegúrate de que el servicio esté correctamente importado

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonLabel,
    IonItem,
    IonInput,
    IonButton,
    IonSpinner
  ]
})
export class SignUpPage {
  email: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  async signUp() {
    if (!this.email || !this.password) {
      alert("Por favor ingresa todos los campos.");
      return;
    }

    this.loading = true;

    try {
      await this.authService.register(this.email, this.password); // Usamos el servicio de 
      console.log(this.email);
      console.log(this.password);
      this.router.navigate(['/home']); // Redirige a la página principal después de registrarse
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Hubo un error al crear tu cuenta.");
    }

    this.loading = false;
  }

  goToLogin() {
    this.router.navigate(['/login']); // Redirige a la página de login
  }
}
