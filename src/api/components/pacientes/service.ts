import { CreationError, DeleteError, GetAllError, RecordNotFoundError, UpdateError } from '../../../utils/customErrors'
import logger from "../../../utils/logger"
import { PatientReq, Patient } from "./model"
import { PatientRepository } from "./repository"


export interface PatientService {
    getAllPatients(): Promise<Patient[]>
    createPatient(patientReq: PatientReq): Promise<Patient>
    getPatientById(id: number): Promise<Patient>
    deletePatientById(id: number): Promise<Patient>
    updatePatient(id:number, updates:Partial<Patient>):Promise<Patient>
}

export class PatientServiceImpl implements PatientService {
    private patientRepository: PatientRepository

    constructor(patientRepository: PatientRepository){
        this.patientRepository = patientRepository
    }

    public getAllPatients(): Promise<Patient[]> {
        const patients: Promise<Patient[]> =  this.patientRepository.getAllPatients()
        return patients
    }
    
    public createPatient(patientReq: PatientReq): Promise<Patient> {
        try{
            return this.patientRepository.createPatient(patientReq)
        } catch (error){
            throw new CreationError("Failed to create patient", "Patient")
        }
    }

    public getPatientById(id: number): Promise<Patient> {
        try {
            return this.patientRepository.getPatientById(id)
        } catch (error) {
            logger.error('Failed to get patient from service')
            throw new RecordNotFoundError()
        }
    }

    public deletePatientById(id: number): Promise<Patient> {
        try{
            return this.patientRepository.deletePatientById(id)

        }catch(error){
            logger.error('Failed to delete patient from service')
        throw new DeleteError("Failed to dele patient", "Patient")
        }
    }

    public async updatePatient(id: number, updates: Partial<PatientReq>): Promise<Patient>{
        try {
            const existPat = await this.patientRepository.getPatientById(id)
            if(!existPat){
                throw new RecordNotFoundError()
            }
            const updatePatient = {...existPat, ...updates}
            this.patientRepository.updatePatient(id, updatePatient)
            return updatePatient
        } catch (error) {
            logger.error('Failed to update patient from service')
            throw new UpdateError("Failed to update patient", "Patient")
        }
    }

   
}