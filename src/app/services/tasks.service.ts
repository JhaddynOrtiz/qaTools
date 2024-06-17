import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiEndpoint = 'https://api.apify.com/v2/actor-tasks';
  private token = 'apify_api_Werr6LibpMwYbet1YDdjCZyt18ZZNX4h22SS';

  constructor(private http: HttpClient) { }

  getActorTasks(offset: number, limit: number): Observable<any> {
    const url = `${this.apiEndpoint}?token=${this.token}&offset=${offset}&limit=${limit}&desc=true`;
    return this.http.get(url);
  }

  runTaskUpdater(data: any, urlTask: string)/* : Observable<any> */ {

    /* this.http.post("https://api.apify.com/v2/actor-tasks/jhaddynortiz~cheerio-scraper-task-2/runs?token=apify_api_1tREUSLFPhwjUdv5dJ1e0hwmGq0SRd1b3jUs", JSON.stringify(data))
      .subscribe(response => {
        console.log('Tarea Cheerio ejecutada con éxito:', response);
      }, error => {
        console.error('Error al ejecutar la tarea Cheerio:', error);
      }); */
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(urlTask, JSON.stringify(data), { headers });
  }
}
