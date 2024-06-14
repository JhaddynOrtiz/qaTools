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
    const apiUrl = 'https://api.apify.com/v2/actor-tasks/jhaddynortiz~ar-musimundo-ppu/runs?token=apify_api_1tREUSLFPhwjUdv5dJ1e0hwmGq0SRd1b3jUs';
    const requestBody = {
      "startUrls": [
        {
          "url": "https://online.auchan.hu/shop/.p-596068",
          "userData": {
            "Manufacturer": "Diageo"
          }
        },
        {
          "url": "https://online.auchan.hu/shop/.p-165252",
          "userData": {
            "Manufacturer": "SCA"
          }
        }
      ]
    }
    this.http.post(apiUrl, JSON.stringify(requestBody))
      .subscribe(response => {
        console.log('Tarea Cheerio ejecutada con éxito:', response);
      }, error => {
        console.error('Error al ejecutar la tarea Cheerio:', error);
      });
    /* const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(urlTask, JSON.stringify(data), { headers }); */
  }
}
