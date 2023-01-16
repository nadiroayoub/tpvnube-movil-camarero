import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { Factura } from 'src/app/model/Factura';
import { ApiClienteService } from 'src/app/services/apiCliente/api-cliente.service';
import { ApiFacturaService } from 'src/app/services/apiFactura/api-factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  public todo: FormGroup;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private apiClienteService: ApiClienteService,
    private apiFacturaService: ApiFacturaService
  ) {
    this.todo = this.formBuilder.group({
      nombre: [''],
      dni: ['', [Validators.required, Validators.pattern(this.nifNieRegex)]],
      apellidos: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex)]],
      numero: [Math.floor(100000 + Math.random() * 900000)],
      descripcion: [''],
    });
  }

  ngOnInit() {}

  logForm() {
    console.log(this.todo.value);
  }

  imprimirFactura() {
    // TODO: await until factura loaded
    var cliente: Cliente = {
      Id: 0,
      Dni: '',
      Nombre: '',
      Apellidos: '',
      Email: '',
      Negocio_oid: 0,
      Cobro_oid: [],
      Factura_oid: [],
    };
    // TODO: create cuenta
    this.apiClienteService.add(cliente).subscribe((res) => {
      var factura: Factura = {
        Id: 0,
        Descripcion: '',
        Fecha: '',
        Numero: '',
        Precio: 0,
        Cliente_oid: 0,
        Comanda_oid: 0,
      };
      // TODO: create factura
      this.apiFacturaService.add(factura).subscribe((res) => {
        // TODO: imprimir factura
        // this.apiFacturaService
        //   .createFactura(this.precioTotal, this.listaComanda)
        //   .subscribe((filename: string) => {
        //     //TODO: redirect to factura page and send filename to it
        //   });
      });
    });
    this.router.navigate(['/home']);
  }
}
