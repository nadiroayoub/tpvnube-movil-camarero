import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { Factura } from 'src/app/model/Factura';
import { ApiClienteService } from 'src/app/services/apiCliente/api-cliente.service';
import { ApiFacturaService } from 'src/app/services/apiFactura/api-factura.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  public todo: FormGroup;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  dataComingFromCobrarPage;
  usuario;
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private apiClienteService: ApiClienteService,
    private apiFacturaService: ApiFacturaService,
    private apiAuthService: AuthService
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

  ngOnInit() {
    this.apiAuthService.usuario.subscribe((usuario) => {
      this.usuario = usuario;
      this.activatedRoute.queryParams.subscribe((params) => {
        if (params['data'] != undefined) {
          this.dataComingFromCobrarPage = JSON.parse(params['data']);
        }
      });
    });
  }

  logForm() {
    console.log(this.todo.value);
  }

  imprimirFactura() {
    // TODO: await until factura loaded
    var cliente: Cliente = {
      Id: 0,
      Dni: this.todo.get('dni').value,
      Nombre: this.todo.get('nombre').value,
      Apellidos: this.todo.get('apellidos').value,
      Email: this.todo.get('email').value,
      Negocio_oid: this.usuario.Negocio.Id,
      Cobro_oid: [],
      Factura_oid: [],
    };
    // TODO: create cuenta
    this.apiClienteService.add(cliente).subscribe((clienteFromBE) => {
      var factura: Factura = {
        Id: 0,
        Descripcion: this.todo.get('descripcion').value,
        Fecha: new Date(),
        Numero: this.todo.get('numero').value,
        Precio: this.dataComingFromCobrarPage.precioTotal,
        Cliente_oid: clienteFromBE.Id,
        Comanda_oid: this.dataComingFromCobrarPage.comandaId,
      };
      // TODO: create factura
      this.apiFacturaService.add(factura).subscribe((res) => {
        // TODO: imprimir factura
        var imprimirFactura = {
          Cliente_oid: factura.Cliente_oid,
          Numero: factura.Numero,
          Items: this.dataComingFromCobrarPage.listaComanda[0],
          total: factura.Precio,
        };
        this.apiFacturaService
          .createFactura(
            this.dataComingFromCobrarPage.precioTotal,
            imprimirFactura
          )
          .subscribe((filename: string) => {
            //TODO: redirect to factura pdf viewr page and send filename to it
            let navigationExtras: NavigationExtras = {
              queryParams: {
                data: JSON.stringify({
                  filename: filename,
                  comandaId: this.dataComingFromCobrarPage.listaComanda[0],
                }),
              },
            };
            this.router.navigate(['/pdf-viewer-factura'], navigationExtras);
          });
      });
    });
    // this.router.navigate(['/home']);
  }
}
