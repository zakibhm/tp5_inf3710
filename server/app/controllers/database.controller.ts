import { Router,Request, Response } from "express";
//import { Router } from "express";
import { injectable,inject } from "inversify";
import { DatabaseService } from "../services/database.service";
import Types from "../types";
import { Medecin } from "@app/interface/medecin";
//import { Medecin } from "@app/interface/medecin";

@injectable()
export class DatabaseController {

  // constructor(private readonly databaseService: DatabaseService) {
  //   //this.initRoutes();
  // }
  public constructor(
    // @ts-ignore -- À ENLEVER LORSQUE L'IMPLÉMENTATION EST TERMINÉE
    @inject(Types.DatabaseService) private readonly databaseService: DatabaseService
  ) {}
  public get router(): Router {
    const router: Router = Router();

    router.get("/medecins", async (req: Request, res: Response) => {
      try {
        const medecins = await this.databaseService.getMedecins();
        res.status(200).json(medecins);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch Medecins" });
      }
    });


    router.get("/medecins/specialites", async (req: Request, res: Response) => {
      try {
        const medecins = await this.databaseService.getMedecinsSpecilities();
        res.status(200).json(medecins.rows);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch Medecins" });
      }
    });


    router.get("/medecins/services", async (req: Request, res: Response) => {
      try {
        const medecins = await this.databaseService.getServices();
        res.status(200).json(medecins);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch Services" });
      }
    });

    

    router.get("/medecins/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const medecin = await this.databaseService.getMedecinById(parseInt(id, 10));
        if (medecin) {
          res.status(200).json(medecin);
        } else {
          res.status(404).json({ error: "Medecin not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch Medecin" });
      }
    });


    router.delete('/medecins/delete/:id', async (req: Request, res: Response) => {
      const { id } = req.params;

      try {
        const deletedMedecin = await this.databaseService.deleteMedecinById(parseInt(id, 10));

        if (deletedMedecin) {
          res.status(200).json({ message: 'Medecin deleted successfully' });
        } else {
          res.status(404).json({ error: 'Medecin not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete Medecin' });
      }
    });

    router.post('/medecins/insert', async (req: Request, res: Response) => {
      try {
        const newMedecinData:Medecin = req.body; // Extract the new Medecin data from the request body
        const createdMedecin = await this.databaseService.addMedecin(newMedecinData); // Use DatabaseService to create a new Medecin
    
        res.status(201).json(createdMedecin ); // Respond with a status of 201 (Created) and the created Medecin data
      } catch (error) {
        res.status(500).json({ error: 'Failed to create Medecin' }); // Handle any errors during creation
      }
    });


    router.put('/medecins/update/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      
      try {
        const updatedMedecinData: Medecin = req.body; // Extract the updated Medecin data from the request body
        console.log("updatedMedecinData ",updatedMedecinData);
        const updatedMedecin = await this.databaseService.updateMedecin(parseInt(id, 10), updatedMedecinData); // Use DatabaseService to update the Medecin
      
        if (!updatedMedecin) {
          res.status(404).json({ error: 'Medecin not found' });
          return;
        }
        
        res.status(200).json(updatedMedecin); // Respond with a status of 200 (OK) and the updated Medecin data
      } catch (error) {
        res.status(500).json({ error: 'Failed to update Medecin' }); // Handle any errors during update
      }
    });
    

    return router;
  }


  
}
