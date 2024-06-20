import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiEndpoint = 'https://api.apify.com/v2/actor-tasks';
  private token = 'apify_api_Q4q60TiTquK8bxxcJe1luBgwoce66X0fNM5W';

  constructor(private http: HttpClient) { }

  getActorTasks(offset: number, limit: number): Observable<any> {
    const url = `${this.apiEndpoint}?token=${this.token}&offset=${offset}&limit=${limit}&desc=true`;
    return this.http.get(url);
  }

  runTaskUpdater(data: any, urlTask: string): Observable<any> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(urlTask, JSON.stringify(data), { headers });

  }
}
