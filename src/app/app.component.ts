import { Component, inject, OnInit } from '@angular/core';
import { SupabaseService } from './_services/supabase.service';
import { InvitedEvents } from './_models/types';
import { StepperComponent } from "./stepper/stepper.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ StepperComponent ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private supabaseService = inject(SupabaseService);
  invitedEvents: InvitedEvents[] = []

  async ngOnInit(): Promise<void> {
    try {
      this.invitedEvents = await this.supabaseService.getInvitedEvents("Rosella and Tony Armenti + Family");
      console.log(this.invitedEvents);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
