import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { SearchNameComponent } from '../search-name/search-name.component';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SearchNameComponent
],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css'
})
export class StepperComponent {
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = true;

  @ViewChild(SearchNameComponent) searchNameComponent!: SearchNameComponent;
  
  ngAfterViewInit() {
    // Connect the search component's control to the stepper's form
    this.firstFormGroup.setControl('firstCtrl', this.searchNameComponent.searchControl);
  }
  
  onNameSelected(name: string) {
    this.firstFormGroup.get('firstCtrl')?.setValue(name);
  }
}
