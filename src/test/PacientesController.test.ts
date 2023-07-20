import { Patient, PatientReq } from "../api/components/pacientes/model"
import { PatientController, PatientControllerImpl } from "../api/components/pacientes/controller" 
import { PatientService } from "../api/components/pacientes/service" 
import { Request, Response } from "express" 

const mockReq = {} as Request
const mockRes = {} as Response

describe('PacienteService', () => {
    let patientservice: PatientService
    let patientController: PatientController

    beforeEach( () => {
        patientservice = {
            createPatient: jest.fn(), 
            deletePatientById: jest.fn(), 
            getAllPatients: jest.fn(), 
            getPatientById: jest.fn(),
            updatePatient: jest.fn()
        }
        patientController = new PatientControllerImpl(patientservice)
        mockRes.status = jest.fn().mockReturnThis()
        mockRes.json = jest.fn().mockReturnThis()
    })


    describe('getAllPatients', () => {
        it('should get all patients', async () => {

            const pat: Patient[] = [
                { id_paciente: 1, nombre: 'Manuel', apellido: 'Terreros', identificacion: 'cedula', telefono:12345},
                { id_paciente: 2, nombre: 'Samuel', apellido: 'Lozano', identificacion: 'NIT', telefono:2378965}
        ];
      (patientservice.getAllPatients as jest.Mock).mockResolvedValue(pat)

            // METHOD EXECUTION 
            await patientController.getAllPatient(mockReq, mockRes)

            //Asserts
            expect(patientservice.getAllPatients).toHaveBeenCalled()
            expect(mockRes.json).toHaveBeenCalledWith(pat)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should be handler error and return 400 status', async () => {
            const error = new Error('Internal Several Error');
            (patientservice.getAllPatients as jest.Mock).mockRejectedValue(error)

            await patientController.getAllPatient(mockReq, mockRes)

            expect(patientservice.getAllPatients).toHaveBeenCalled()
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Error getting all patients" })
            expect(mockRes.status).toHaveBeenCalledWith(400)
        })

      describe('getPatientById', () => {
        it('should get patients by id', async () => {
            //Mock Process
            const patientRes: Patient = { id_paciente:1, nombre: 'Manuel', apellido:'Terreros', identificacion:'cedula', telefono:13456 };
            (mockReq.params) = { id: "1"};
            (patientservice.getPatientById as jest.Mock).mockResolvedValue(patientRes)
            
            //Method execution
            await patientController.getPatientById(mockReq, mockRes)

            //Asserts
            expect(patientservice.getPatientById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenCalledWith(patientRes)
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })

        it('should return 400 if not found', async () => {
            (mockReq.params) = { id: "1"};
            (patientservice.getPatientById as jest.Mock).mockResolvedValue(null)

            await patientController.getPatientById(mockReq, mockRes)

            expect(patientservice.getPatientById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenCalledWith({ error: "Record has not found yet"})
            expect(mockRes.status).toHaveBeenCalledWith(400)
        })

        it('should return 400 if an error occurs', async () => {
            const error = new Error('Internal Server Error');
            (mockReq.params) = { id: "1" };
            (patientservice.getPatientById as jest.Mock).mockRejectedValue(error)

            await patientController.getPatientById( mockReq, mockRes)

            expect(patientservice.getPatientById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenCalledWith({ error: "Failed to retrieve patient" })
            expect(mockRes.status).toHaveBeenCalledWith(400)
        })
    })

    describe('deletePatientById', () => {
        it('should delete patients by id', async () => {
            // Mock Process
            const patientRes: Patient = { id_paciente: 1, nombre: 'Manuel', apellido: 'Terreros', identificacion: 'cedula', telefono: 13456 };
            (mockReq.params) = { id: "1" };
            (patientservice.deletePatientById as jest.Mock).mockResolvedValue(patientRes);
    
            // Method Execution
            await patientController.deletePatientById(mockReq, mockRes)
    
            // Asserts
            expect(patientservice.deletePatientById).toHaveBeenCalledWith(1)
            expect(mockRes.json).toHaveBeenLastCalledWith({ message: "Patient was deleted successfully" })
            expect(mockRes.status).toHaveBeenCalledWith(200)
        })
    })

    describe('createPatient', () => {
        it('should create a new patient and return info', async () => {
            // Mock Process
            const patientRes: Patient = { id_paciente: 1, nombre: 'Carlos', apellido: 'Caceres', identificacion: '1234567896', telefono: 123456789, createdAt: new Date ("05-05-2020"), updatedAt: new Date ("20-20-2023") }
            const patientReq: PatientReq = {
                nombre: 'Carlos',
                apellido: 'Caceres',
                identificacion: '1234567896',
                telefono: 123456789
            };
            (mockReq.body as PatientReq) = patientReq;
            (patientservice.createPatient as jest.Mock).mockResolvedValue(patientRes)

            // Method execution
            await patientController.createPatient(mockReq, mockRes)

            // Asserts
            expect(patientservice.createPatient).toHaveBeenCalledWith(patientReq)
            expect(mockRes.json).toHaveBeenCalledWith(patientRes)
            expect(mockRes.status).toHaveBeenCalledWith(201)
        })

        it('should be handler error and return 400 status', async () => {
            const error = new Error('Internal Server Error');
            (mockReq.body) = {};
            (patientservice.createPatient as jest.Mock).mockRejectedValue(error)

            await patientController.createPatient(mockReq, mockRes)

            expect(patientservice.createPatient).toHaveBeenCalledWith({})
            expect(mockRes.json).toHaveBeenCalledWith({ message: "Internal Server Error" })
            expect(mockRes.status).toHaveBeenCalledWith(400)
        })
    })



      
    })

    
})
