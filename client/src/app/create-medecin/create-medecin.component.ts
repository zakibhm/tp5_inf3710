import { Component} from '@angular/core';
import { Medecin } from '../interface/medecin';
import { Router } from '@angular/router';
import { CommunicationService } from '../services/communication.service';
import { Service } from '../interface/service';

@Component({
  selector: 'app-create-medecin',
  templateUrl: './create-medecin.component.html',
  styleUrls: ['./create-medecin.component.css']
})
export class CreateMedecinComponent {
  
  //private medecinId: number;
  public medecins: Medecin[] = [];
  public medecin: Medecin = {
    prenom: '',
    nom: '',
    specialite: '',
    anneesExperience: 0,
    idService: 0
  }; 
  public specialites: string[] = [];
  public services: Service[] = [];
  public selectedService: Service ;


  constructor(
    private router: Router,
    private medecinService: CommunicationService 
  ) {}

  ngOnInit(): void {
    this.getMedecinsSpecilities();
    this.getServices();
}


  getMedecinsSpecilities(): void {
    this.medecinService.getMedecinsSpecilities().subscribe(
      (specialites: any[]) => {
        this.specialites = specialites.map((specialtyObj: any) => specialtyObj.specialite);
      },
      (error) => {
        console.error("Error fetching Medecins specialities:", error);
      }
    );
  }

  getServices(): void {
    this.medecinService.getServices().subscribe(
      (services: Service[]) => {
        this.services = services
        console.log(this.services);
      },
      (error) => {
        console.error("Error fetching Services:", error);
      }
    );
  }

  

  addMedecin(): void {
    this.medecin.idService = this.selectedService.idService as number;
    this.medecinService.addMedecin(this.medecin).subscribe(
      () => {
        
        this.router.navigate(['/medecins']);
      },
      (error) => {
        // Error: Log the error message or display an error alert/message
        console.error('Error adding Medecin:', error);
        // Show an error message to the user, e.g., using an alert or notification
        // You can also set a variable in your component to display an error message in the template
      }
    );
  }
  

}
