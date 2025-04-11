import type { IStatus } from './status'
import type { ISpecialty } from './specialty'

export interface IDoutor {
  id: number
  name: string
  status: IStatus
  specialty: ISpecialty[]
}

export type GetDoutorListRequest = {
  itemsPerPage: number
  page: number
  name: IDoutor['name']
  statusId: IStatus['id'] | null
  SpecialtyId: ISpecialty['id'] | null
}

export type GetDoutorListResponse = {
  total: number
  items: IDoutor[]
}

export type DoutorForm = {
  name: IDoutor['name']
  statusId: IStatus['id'] | null
  specialty: ISpecialty['id'][]
}
