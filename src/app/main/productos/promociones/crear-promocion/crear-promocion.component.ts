import { Validators, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-crear-promocion',
  templateUrl: './crear-promocion.component.html',
  styles: []
})
export class CrearPromocionComponent implements OnInit {

  types: Observable<any> = of([
    {name: 'descuento', value: 1},
    {name: 'n (x) n', value: 2}
  ]);

  promotionFormGroup: FormGroup;
  toggleNameCodeFormControl = new FormControl(true);
  filterProductFormControl = new FormControl(null);

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.promotionFormGroup = this.fb.group({
      name: [null, [Validators.required]],
      type: [null, [Validators.required]],
      discount: [null],
      firstNumber: [null],
      secondNumber: [null],
      active: [true, [Validators.required]]
    });
  }

}
