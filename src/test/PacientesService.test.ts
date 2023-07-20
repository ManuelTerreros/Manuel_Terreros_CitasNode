import { Patient, PatientReq } from "../api/components/pacientes/model"
import { PatientService, PatientServiceImpl } from "../api/components/pacientes/service"
import { PatientRepository } from "../api/components/pacientes/repository"

describe('PatientService', () => {
    let patientService: PatientService
    let patientRepository: PatientRepository

    beforeEach( () =>{
        patientRepository = {
            getAllPatients: jest.fn(), 
            createPatient: jest.fn(), 
            deletePatientById: jest.fn(),
            getPatientById: jest.fn(), 
            updatePatient: jest.fn()


        }
        patientService = new PatientServiceImpl(patientRepository)
    })

    describe('getAllPatients', () => {
        it('should get all pacients from service',async () => {
         const patient: Patient[] = [
            { id_paciente: 1, nombre: 'Manuel', apellido: 'Terreros', identificacion: 'cedula', telefono:12345},
            { id_paciente: 2, nombre: 'Samuel', apellido: 'Lozano', identificacion: 'NIT', telefono:2378965}
          ];
          (patientRepository.getAllPatients as jest.Mock).mockResolvedValue(patient)

          //Method EXecution 
          const result = await patientService.getAllPatients()

          //Asserts
          expect(patientRepository.getAllPatients).toHaveBeenCalled()
          expect(result).toEqual(result)
        })
        it('should return an empty array when no doctors are found', async () => {
            // Mock Process
            (patientRepository.getAllPatients as jest.Mock).mockResolvedValue([])

            // Method execution
            const result  = await patientService.getAllPatients()

            // Asserts
            expect(patientRepository.getAllPatients).toHaveBeenCalled()
            expect(result).toEqual([])
        })
    })

    describe('createPatient', () => {
        it('should create a new patient and return it from  service', async () => {
            // Mock Process
            const patientRes: Patient = {id_paciente: 1, nombre: 'Manuel', apellido: 'Terreros', identificacion: 'cedula', telefono:12345};
            const patientReq: PatientReq = {nombre: 'Manuel', apellido: 'Terreros', identificacion: 'cedula', telefono:12345};

            (patientRepository.createPatient as jest.Mock).mockResolvedValue(patientRes)

            // Method execution
            const result  = await patientService.createPatient(patientReq)

            // Asserts
            expect(patientRepository.createPatient).toHaveBeenCalledWith(patientReq)
            expect(result).toEqual(patientRes)
        })
        it('should throw and error if doctor creation fails', async () => {
            // Mock Process
            const patientReq: PatientReq = {nombre: 'Manuel', apellido: 'Terreros', identificacion: 'cedula', telefono:12345};
            const errar = new Error('Failed to create patient');
            (patientRepository.createPatient as jest.Mock).mockRejectedValue(errar)

            await expect(patientService.createPatient(patientReq)).rejects.toThrowError(errar)
            expect(patientRepository.createPatient).toHaveBeenCalledWith(patientReq)
        }) 
    })

    describe('getPatientById', () => {
        it('should get  patient by id from service', async () => {
            // Mock Process
            const patient: Patient = {id_paciente: 1, nombre: 'Manuel', apellido: 'Terreros', identificacion: 'cedula', telefono:12345}
            const patientId = 3;

            (patientRepository.getPatientById as jest.Mock).mockResolvedValue(patient)

            // Method execution
            const result  = await patientService.getPatientById(patientId)

            // Asserts
            expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId)
            expect(result).toEqual(patient)
        })
        it('should return an empty array when no patients are found', async () => {
            // Mock Process
            const patientId = 1;
            (patientRepository.getPatientById as jest.Mock).mockResolvedValue(null)

            // Method execution
            const result  = await patientService.getPatientById(patientId)

            // Asserts
            expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId)
            expect(result).toBeNull()
        })
        it('should throw an error if retrieval fails', async () => {
            // Mock Process
            const patientId = 1
            const error = new Error('Database error');
            (patientRepository.getPatientById as jest.Mock).mockRejectedValue(error)

            // Asserts
            await expect(patientService.getPatientById(patientId)).rejects.toThrowError(error)
            expect(patientRepository.getPatientById).toHaveBeenCalledWith(patientId)
        })
    })
})