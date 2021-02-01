import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = 'https://prueba-app-4ec88-default-rtdb.firebaseio.com';

  constructor( private httt: HttpClient) { }


  crearCliente( cliente: any){

    return this.httt.post(`${this.url}/clientes.json`, cliente).pipe(
      map( resp => {

        return resp;

      })
    );

  }

  obtenerClientes(){

    return this.httt.get(`${this.url}/clientes.json`).pipe(
      map( this.crearArreglo )
    );

  }

  private crearArreglo( clientesObj: object){

    const clientes = [];

    if ( clientesObj === null ){ return []; }

    Object.keys( clientesObj).forEach( key => {
      
      const cliente = clientesObj[key];
      cliente.id = key;

      clientes.push(cliente);

    });

    return clientes;

  }

}
