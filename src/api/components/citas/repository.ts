import { db } from "../../../config/database"
import { Appointment, AppointmentReq, AppointmentResDB } from "./model"
import logger from '../../../utils/logger'
import { CreationError, DeleteError, GetAllError, RecordNotFoundError, UpdateError } from '../../../utils/customErrors'

export class AppointmentRepository {
    public async createAppointment(appointment: AppointmentReq): Promise<AppointmentResDB> {
        try {
            //appointment.created_at = new Date().toISOString()
            const [createdAppointment] = await db('citas').insert(appointment).returning('*')
            return createdAppointment
        } catch (error) {
            console.log(error)
            logger.error('Failed to create appointment dubt: ', error)
            throw new CreationError("Appointment creation failed in repository", "Appointment")
        }
    }

    public async getAllAppointment(): Promise<Appointment[]> {
        try {
            return  db.select('*').from('citas')
        } catch (error) {
            
            throw new GetAllError("Failed getting all appointments from repository", "appointment")
        }
    }

    public async getAppointmentById(id: number): Promise<AppointmentResDB> {
        try{
            const appointment = await db('citas').where({ id_cita: id }).first()
            return appointment
        } catch (error){
            logger.error( 'Failed get appointment by id in repository', {error})
            throw new RecordNotFoundError()
        }
    }
}