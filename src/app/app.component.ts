import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from './_services/supabase.service';
import { Invitee } from './_models/types';
import { StepperComponent } from "./stepper/stepper.component";

@Component({
    selector: 'app-root',
    imports: [StepperComponent],
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
