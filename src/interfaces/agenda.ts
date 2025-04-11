import type { IStatus } from './status'ç
import type { ISpecialty } from './specialty'
import type { IPaciente } from './paciente'
import type { IDoutor } from './doutor'

export interface IAgenda {
  id: number
  name: string
  patient: IPaciente
  doctor: IDoutor
  appointmentDate: string
  status: IStatus
  specialty: ISpecialty
}

export type GetAgendaListRequest = {
  itemsPerPage: number
  page: number
  name: IAgenda['name']
  doutor: IDoutor['id']
  paciente: string
  specialtyId: ISpecialty[]
}

export type GetAgendaListResponse = {
  total: number
  items: IDoutor[]
}

export type AgendaForm = {
  name: IDoutor['name']
  statusId: IStatus['id'] | null
  specialty: ISpecialty['id'][]
}
