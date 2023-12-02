import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../services/communication.service';

@Component({
  selector: 'app-delete-medecin',
  templateUrl: './delete-medecin.component.html',
  styleUrls: ['./delete-medecin.component.css']
})
export class DeleteMedecinComponent implements OnInit {
  isDeleted: boolean = false;
  private medecinId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.medecinId = params['id']; // Fetch the 'id' parameter from the route
    });
  }
  deleteMedecin(): void {
    if(this.medecinId) {
      this.communicationService.deleteMedecin(this.medecinId).subscribe(
        () => {
          this.isDeleted = true;
          setTimeout(() => {
            this.router.navigate(['/medecins']);
          }, 1500);
        },
        (error) => {
          console.error("Error deleting Medecin:", error);
        } 
      );
    }
  }

}
