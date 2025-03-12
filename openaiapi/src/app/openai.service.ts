import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpenAIService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = '';
  constructor(private http: HttpClient) {}

  async askQuestion(question: string): Promise<string> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };

    const body = {
      model: 'gpt-3.5-turbo', // O usa 'gpt-4' si tienes acceso
      messages: [{ role: 'user', content: question }],
      temperature: 0.7
    };

    try {
      const response: any = await this.http.post(this.apiUrl, body, { headers }).toPromise();
      return response.choices[0].message.content.trim();
    } catch (error) {
      console.error('Error en la petición a OpenAI:', error);
      return 'Ocurrió un error al obtener la respuesta.';
    }
  }
}
