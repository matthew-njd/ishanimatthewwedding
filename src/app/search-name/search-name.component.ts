import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from '../_services/supabase.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {AsyncPipe} from '@angular/common';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-search-name',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
  ],
  templateUrl: './search-name.component.html',
  styleUrl: './search-name.component.css'
})
export class SearchNameComponent implements OnInit {
  private supabaseService = inject(SupabaseService);
  searchControl = new FormControl();
  names: string[] = [];
  filteredNames!: Observable<string[]>;

  async ngOnInit() {
    this.names = (await this.supabaseService.getNames('WeddingInvitees')).map(x => x.Name);
    this.filteredNames = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.names.filter(option => option.toLowerCase().includes(filterValue));
  }
}
