import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes = [];
  edad = 0;
  promedio = 0;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private serviceCliente: ClientesService
    ) {
    
      this.crearFormulario();
      this.obtenerClientes();
      // this.obtenerPromedio(this.clientes);
      // this.crearListeners();

   }

  ngOnInit(): void {
  }

  get nombreNoValido(): boolean{
    return this.form.get('nombre').invalid && this.form.get('nombre').touched;
  }

  get apellidoNoValido(): boolean{
    return this.form.get('apellido').invalid && this.form.get('apellido').touched;
  }

  get edadNoValido(): boolean{
    return this.form.get('edad').invalid && this.form.get('edad').touched;
  }

  get fechaNacNoValido(): boolean{
    return this.form.get('fechaNacimiento').invalid && this.form.get('fechaNacimiento').touched;
  }

  crearFormulario(){

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)] ],
      apellido: ['', [Validators.required, Validators.minLength(5)] ],
      edad: ['', [Validators.required, Validators.pattern("^[0-9]*$")] ],
      fechaNacimiento: ['', [Validators.required, Validators.minLength(5)] ]
    });

  }

  crearListeners(){
    this.form.valueChanges.subscribe(cambio => {
      console.log(cambio);
    });
    this.form.statusChanges.subscribe(status => {
      console.log(status);
     }); 
   }

  guardar(){  

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach( control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach( controlAnidado => {
            controlAnidado.markAsTouched();
          });
        }else{
          control.markAsTouched();  
        }
      });
    }else{

      const cliente = this.form.value;
  
      this.serviceCliente.crearCliente(cliente).subscribe( resp => {
  
        console.log(resp);
  
      });
      
    }



  }

  obtenerClientes(){

    this.serviceCliente.obtenerClientes().subscribe( resp => {
      this.clientes = resp;
      this.promedio = this.obtenerPromedio(this.clientes);
      console.log(this.promedio);
    });
    
  }

  obtenerPromedio(clientes: any): number{

    const cantidad = this.clientes.length;
    
    for (const cliente of clientes) {
      this.edad += cliente.edad;
    }

    const promedio = this.edad / cantidad; 

    return promedio;

  }

}
