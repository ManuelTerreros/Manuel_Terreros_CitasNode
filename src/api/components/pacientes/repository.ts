import { db } from "../../../config/database"
import { Patient, PatientReq,  } from "./model"
import logger from '../../../utils/logger'
import { CreationError, DeleteError, GetAllError, RecordNotFoundError, UpdateError } from '../../../utils/customErrors'

export class PatientRepository {
    public async createPatient(patient: PatientReq): Promise<Patient> {
        try {
            const [createdPatient] =  await db('pacientes').insert(patient).returning('*') 
            return createdPatient
        } catch (error) {
            throw new CreationError("Failed creating patient", "Patient")
        }
    }

    public async getAllPatients(): Promise<Patient[]> {
        try {
            return  db.select('*').from('pacientes')
        } catch (error) {
            throw new GetAllError("Failed getting patients", "Patient")
        }
    }

    public async getPatientById(id: number): Promise<Patient> {
        try{
            const patient = await db('pacientes').where({ id_paciente: id }).first()
            return patient
        } catch (error){
            logger.error( 'Failed get patient by id in repository', {error})
            throw new RecordNotFoundError()
        }
    }

    

    public async deletePatientById(id: number): Promise<Patient> {
        try {
            const deletedCount = await db('pacientes').where({ id_paciente: id }).del();
            if (deletedCount > 0) {
                return { id_paciente: id } as Patient;
            } else {
                throw new RecordNotFoundError();
            }
        } catch (error) {
            logger.error( 'Patient not found', {error})
            throw new DeleteError("Patient delete fail","Patient")
        }
    }

    public async updatePatient(id:number, updates: Partial<PatientReq>): Promise<void>{
        try {
            await db ('pacientes').where({id_paciente : id}).update(updates)
        } catch (error) {
            logger.error('Failed updated patient in respository', {error})
            throw new UpdateError("Failed updating patient","Patient")
        }
    } 
}
 

export default{
    PatientRepository
}