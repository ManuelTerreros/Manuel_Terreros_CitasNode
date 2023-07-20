import { Appointment } from './model'
import { Request, Response } from 'express'
import { AppointmentService } from './service'
import logger from '../../../utils/logger'
import { CreationError, DeleteError, GetAllError, RecordNotFoundError, UpdateError } from '../../../utils/customErrors'


export interface AppointmentController {
    getAllAppointment(req: Request, res: Response): void
    createAppointment(req: Request, res: Response): void  
    getAppointmentById(req: Request, res: Response): void  
}

export class AppointmentControllerImpl implements AppointmentController {
    private  appointmentService:  AppointmentService
    
    constructor ( appointmentService: AppointmentService ){
        this.appointmentService = appointmentService
    }
    public  async getAllAppointment(req: Request, res: Response): Promise<void> {
        try {
            const patients = await this.appointmentService.getAllAppointments()
            
            res.status(200).json(patients)
            
        } catch (error) {
            logger.error(error)
            res.status(400).json({message: "Error getting all appointments"})
        }
    }
    public async createAppointment (req: Request, res: Response): Promise <void> {
        try {
            const value = req.body
            const appointment = await this.appointmentService.createAppointment(value)
            res.status(201).json(appointment)
        } catch (error) {
            logger.error(error)
            if (error instanceof CreationError) {
                res.status(400).json({
                    error_name: error.name,
                    message: "Failed Creating appointment in controller"
                })
            }

    }
    }
       

    public async getAppointmentById (req: Request, res: Response): Promise<void> {
        try{

            const id = parseInt(req.params.id)
            if (isNaN(id)){
                throw new Error("Id must be a number") 
            }
            const appointment =  await this.appointmentService.getAppointmentById(id)
            if (appointment) {
                res.status(200).json(appointment)
            } else {
                throw new RecordNotFoundError()
            }
        } catch (error) {
            logger.error(error)
            if (error instanceof RecordNotFoundError){
                res.status(400).json({error: error.message})
            } else {
                res.status(400).json({error: "Failed to retrieve patient"})
            }
        }
    }

}