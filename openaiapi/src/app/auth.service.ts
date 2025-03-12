import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = getAuth();

  constructor(private router: Router) {}

  // Método para realizar el login
  async login(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  // Método para registrar un nuevo usuario
  async register(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      throw error;  // Maneja errores de Firebase si ocurren
    }
  }

  // Método para cerrar sesión
  async logout() {
    await signOut(this.auth);
    this.router.navigate(['/login']);
  }

  // Método para obtener el usuario actual
  getCurrentUser(): Observable<User | null> {
    return new Observable(observer => {
      onAuthStateChanged(this.auth, user => {
        observer.next(user);
      });
    });
  }
}
