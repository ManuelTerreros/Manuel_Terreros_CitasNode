import  { Router} from 'express'
import { PatientController, PatientControllerImpl } from './controller'
import { PatientRepository } from './repository'
import { PatientServiceImpl } from './service'


const router = Router()
const repository = new PatientRepository()
const service = new PatientServiceImpl(repository)
const Patientcontroller: PatientController = new PatientControllerImpl(service)


router.get('',  Patientcontroller.getAllPatient.bind(Patientcontroller))
router.post('/create',  Patientcontroller.createPatient.bind(Patientcontroller))
router.get('/getpats/:id',  Patientcontroller.getPatientById.bind(Patientcontroller))
router.delete('/delete/:id', Patientcontroller.deletePatientById.bind(Patientcontroller))
router.put('/update/:id', Patientcontroller.updatePatient.bind(Patientcontroller))



export default router