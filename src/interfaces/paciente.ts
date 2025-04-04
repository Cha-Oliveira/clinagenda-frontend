export interface IPaciente {
  id: number
  name: string
  PhoneNumber: string
  DocumentNumber: string
  BirthDate: string
  StatusId: string
  StatusName: string
}

export type GetPacienteListRequest = {
  itemsPerPage: number
  page: number
  name: IPaciente['name']
}

export type GetPacienteListResponse = {
  total: number
  items: IPaciente[]
}

export type PacienteForm = {
  name: IPaciente['name']
}
