import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  public todo: FormGroup;
  nifNieRegex = /^[XYZ]?\d{5,8}[A-Z]$/;
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  constructor(private formBuilder: FormBuilder, private router: Router) {
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
    this.router.navigate(['/home']);
  }
}
