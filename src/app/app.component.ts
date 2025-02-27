import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from './_services/supabase.service';
import { Invitee } from './_models/types';
import { SearchNameComponent } from "./search-name/search-name.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [SearchNameComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private supabaseService = inject(SupabaseService);
  invitees: Invitee[] = [];

  async ngOnInit(): Promise<void> {
    try {
      this.invitees = await this.supabaseService.getTable('WeddingInvitees');
      console.log(this.invitees);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

}
