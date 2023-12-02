import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunicationService } from '../services/communication.service';
import { Medecin } from '../interface/medecin';
import { Service } from '../interface/service';

@Component({
  selector: 'app-update-medecin',
  templateUrl: './update-medecin.component.html',
  styleUrls: ['./update-medecin.component.css']
})
export class UpdateMedecinComponent {
  public medecinId: number;
  public medecin: Medecin = {
    idMedecin: 0,
    prenom: '',
    nom: '',
    specialite: '',
    anneesExperience: 0,
    idService: 0
  }; // Initialize an empty Medecin object
  public specialites: string[] = [];
  public services: Service[] = [];
  public selectedService: Service ;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private medecinService: CommunicationService // Inject your service here
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.medecinId = params['id'];
      this.getMedecinById(this.medecinId);
    });
    this.getMedecinsSpecilities();
    this.getServices();
  }
  getMedecinById(id: number): void {
    this.medecinService.getMedecinById(id).subscribe(
      (medecin: Medecin) => {
        this.medecin = medecin ; // Set the received doctor 
      },
      (error) => {
        console.error("Error fetching Medecin:", error);
      }
    );
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

  updateMedecin(): void {
    console.log(this.medecin);
    this.medecinService.updateMedecin(this.medecinId,this.medecin).subscribe(() => {
      this.router.navigate(['/medecins']); // Redirect to the medecins list after update
    });
  }
}
