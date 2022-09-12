import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  
  private apiKey: string = "5P6ZZM7TQQnhIwAzBZoPPvriOV72X3Rt"
  private ServicioUrl: string = "https://api.giphy.com/v1/gifs"
  private _historial: string [] = [];

  public resultados: any[] = [];

  get historial () {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs (query: string = '') {

    query=query.trim().toLocaleLowerCase();

    if(!this._historial.includes (query)) {
      this._historial.unshift (query);
      this._historial = this._historial.splice (0,10);
    }
    
    const params = new HttpParams ()
        .set('api_key', this.apiKey)
        .set('limit', '10')
        .set('q', query);
    
    this.http.get(`${ this.ServicioUrl }/search`, { params: params })
      .subscribe((resp: any) => {
        this.resultados = resp.data;
      });
  }
}
