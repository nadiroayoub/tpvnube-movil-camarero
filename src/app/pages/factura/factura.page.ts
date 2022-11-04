import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  public todo: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.todo = this.formBuilder.group({
      nombreEmpresa: [''],
      // Validators.required
      cif: [''],
      direccion: [''],
      telefono: [''],
      correoElectronico: [''],
    });
  }

  ngOnInit() {}

  logForm() {
    console.log(this.todo.value);
  }
}
