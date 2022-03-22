import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../Interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial:string[]=[];
  private _apiKey:string='wI8gKr38xm44soINLLt4TQJIyNAaNyH9';
  private servicioURL:string='https://api.giphy.com/v1/gifs';
  //TODO cambiar any por su tipo correspondiente.
  public resultado:Gif[]=[];
  get historial() {return [...this._historial];}

  constructor(private http:HttpClient) {
    //Forma corta de hacer persistencia de datos: 
    this._historial=JSON.parse(localStorage.getItem("Historial")!) || [];
    this.resultado=JSON.parse(localStorage.getItem("query")!) || [];
    /*
    if(localStorage.getItem('Historial')) {
      this._historial= JSON.parse(localStorage.getItem('Historial')!);
    } */
  }

  buscarGifs(query:string):void {
    query=query.trim().toLowerCase();
    if(!this._historial.includes(query))
    {
      this._historial.unshift(query);
      this._historial=this._historial.slice(0,10);
      localStorage.setItem('Historial',JSON.stringify(this._historial)); //Convierte objetos en string por medio de JSON.
    }
    //Para mejores prácticas, usamos este módulo para definir los parámetros.
    const params = new HttpParams()
    .set('api_key',this._apiKey)
    .set('limit','10')
    .set('q',query);
    //Hago una petición http, luego le digo que hará después de hacerla con el .subscribe()
    this.http.get<SearchGIFResponse>(`${this.servicioURL}/search`,{params})
    .subscribe((resp) => {
   //   console.log(resp.data);
      this.resultado=resp.data;
      localStorage.setItem('query',JSON.stringify(this.resultado))
    })
    //console.log(this._historial);

  }
}



