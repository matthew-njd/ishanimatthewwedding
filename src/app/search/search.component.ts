import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { SupabaseService } from '../_services/supabase.service';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
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


