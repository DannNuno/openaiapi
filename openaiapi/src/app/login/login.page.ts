import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonItem, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from '../auth.service'; // Asegúrate de que el servicio sea importado correctamente

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonItem, IonLabel]
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para el inicio de sesión
  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/home']); // Redirige a la página principal si el login es exitoso
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
      alert('Error en el inicio de sesión. Verifica tu correo y contraseña.');
    }
  }

  // Método para redirigir a la página de registro (sign-up)
  register() {
    this.router.navigate(['/sign-up']); // Redirige a la página de registro
  }
}
