import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {
  //Decorador para recibir valor de un input: Esto es similar al DOM en JavaScript
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
 
  constructor(private gifsService:GifsService) {

  }
 
  buscar() {
  //Obtenemos el valor del input con ID txtBuscar:
  const busqueda=this.txtBuscar.nativeElement.value;  
  //Controlar vacíos:
  if(busqueda.trim().length==0) return;
  this.gifsService.buscarGifs(busqueda);
  //Limpiamos la caja de texto luego de capturar el evento enter del usuario:
  this.txtBuscar.nativeElement.value='';
}

}
