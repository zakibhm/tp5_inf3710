//import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
//import { Router } from "@angular/router";
//import { CommunicationService } from "./services/communication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public route: string;

    public constructor(
      //location: Location, 
      //router: Router,
      //private communicationService: CommunicationService
        ) 
    {
        // router.events.subscribe((_val: any) => {
        //     if (location.path() !== "") {
        //       this.route = location.path();
        //     } else {
        //       this.route = "";
        //     }
        //   });
    }
    medecins: any[] = []; // Replace 'any[]' with your Medecin interface/type

    //constructor(private communicationService: CommunicationService) {}


    public readonly title: string = "INF3710 TP4";
    public ngOnInit(): void {
      // Subscribe to changes from the communication service to update the medecins list
    // this.communicationService.getAllMedecins().subscribe(
    //   (medecins: any[]) => {
    //     this.medecins = medecins;
    //   },
    //   (error) => {
    //     console.error("Error fetching Medecins:", error);
    //   }
    // );
     }
}
