import type { IStatus } from './status'

export interface IPaciente {
  id: number
  name: string
  documentNumber: string
  phoneNumber: string
  birthDate: string
  status: IStatus
}

export type GetPacienteListRequest = {
  itemsPerPage: number
  page: number
  name: IPaciente['name']
  documentNumber: IPaciente['documentNumber']
  statusId: IStatus['id'] | null
}

export type GetPacienteListResponse = {
  total: number
  items: IPaciente[]
}

export type PacienteForm = {
  name: IPaciente['name']
  documentNumber: IPaciente['documentNumber']
  phoneNumber: IPaciente['phoneNumber']
  birthDate: IPaciente['birthDate']
  statusId: IPaciente['id'] | null
}
