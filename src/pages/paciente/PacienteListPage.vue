<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { DefaultTemplate } from '@/template'
import { mdiPlusCircle, mdiSquareEditOutline, mdiTrashCan } from '@mdi/js'
import request from '@/engine/httpClient'
import { useToastStore } from '@/stores'
import type {
  GetPacienteListRequest,
  GetPacienteListResponse,
  IPaciente
} from '@/interfaces/paciente'
import type { IStatus } from '@/interfaces/status'
import { vMaska } from 'maska/vue'

import {
  clearMask,
  documentNumberMask,
  maskDocumentNumber,
  maskPhoneNumber
} from '@/utils'

const toastStore = useToastStore()
const isLoadingList = ref<boolean>(false)
const isLoadingFilter = ref<boolean>(false)

const filterName = ref<GetPacienteListRequest['name']>('')
const filterDocumentNumber = ref<GetPacienteListRequest['documentNumber']>('')
const filterStatusId = ref<IStatus['id'] | null>(null)

const itemsPerPage = ref<number>(10)
const total = ref<number>(0)
const page = ref<number>(1)
const items = ref<IPaciente[]>([])
const statusItems = ref<IStatus[]>([])

const headers = [
  {
    title: 'ID',
    key: 'id',
    sortable: false,
    width: 0,
    cellProps: { class: 'text-no-wrap' }
  },
  { title: 'Nome', key: 'name', sortable: false },
  { title: 'CPF', key: 'documentNumber', sortable: false },
  { title: 'Telefone', key: 'phoneNumber', sortable: false },
  { title: 'Data Nasciemnto', key: 'birthDate', sortable: false },
  { title: 'Status', key: 'status', sortable: false },
  {
    title: 'Ações',
    key: 'actions',
    sortable: false,
    width: 0,
    cellProps: { class: 'text-no-wrap' }
  }
]

const handleDataTableUpdate = async ({ page: tablePage, itemsPerPage: tableItemsPerPage }: any) => {
  page.value = tablePage
  itemsPerPage.value = tableItemsPerPage
  loadDataTable()
}

const loadDataTable = async () => {
  try {
    isLoadingList.value = true
    const { isError, data } = await request<GetPacienteListRequest, GetPacienteListResponse>({
      method: 'GET',
      endpoint: 'patient/list',
      body: {
        itemsPerPage: itemsPerPage.value,
        page: page.value,
        name: filterName.value,
        documentNumber: clearMask(filterDocumentNumber.value),
        statusId: filterStatusId.value
      }
    })

    if (isError) return

    items.value = data.items
    total.value = data.total
    isLoadingList.value = false
  } catch (e) {
    console.error('Erro ao buscar item da lista', e)
  }
}

const loadFilters = async () => {
  isLoadingFilter.value = true

  try {
    const statusResponse = await request<undefined, GetPacienteListResponse>({
      method: 'GET',
      endpoint: 'status/list'
    })

    if (statusResponse.isError) return

    statusItems.value = statusResponse.data.items
  } catch (e) {
    console.error('Erro ao buscar items do filtro', e)
  }

  isLoadingFilter.value = false
}

const deleteListItem = async (item: IPaciente) => {
  const shouldDelete = confirm(`Deseja mesmo deletar ${item.name}?`)

  if (!shouldDelete) return

  try {
    const response = await request<null, null>({
      method: 'DELETE',
      endpoint: `patient/delete/${item.id}`
    })

    if (response.isError) return

    toastStore.setToast({
      type: 'success',
      text: 'Paciente deletada com sucesso!'
    })

    loadDataTable()
  } catch (e) {
    console.error('Falha ao deletar item da lista', e)
  }
}

onMounted(() => {
  loadFilters()
})
</script>

<template>
  <default-template>
    <template #title> Lista de Paciente </template>

    <template #action>
      <v-btn color="primary" :prepend-icon="mdiPlusCircle" :to="{ name: 'paciente-insert' }">
        Adicionar Paciente
      </v-btn>
    </template>

    <template #default>
      <v-sheet class="pa-4 mb-4">
        <v-form @submit.prevent="loadDataTable">
          <v-row>
            <v-col>
              <v-text-field v-model.trim="filterName" label="Nome" hide-details />
            </v-col>
            <v-col>
              <v-text-field
                v-model.trim="filterDocumentNumber"
                v-maska="documentNumberMask"
                label="CPF"
                hide-details
              />
            </v-col>
            <v-col>
              <v-select
                v-model="filterStatusId"
                label="Status"
                :loading="isLoadingFilter"
                :items="statusItems"
                item-value="id"
                item-title="name"
                clearable
                hide-details
              />
            </v-col>
            <v-col cols="auto" class="d-flex align-center">
              <v-btn color="primary" type="submit">Filtrar</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-sheet>
      <v-data-table-server
        v-model:items-per-page="itemsPerPage"
        :headers="headers"
        :items-length="total"
        :items="items"
        :loading="isLoadingList"
        item-value="id"
        @update:options="handleDataTableUpdate"
      >
        <template #[`item.status`]="{ item }">
          <v-chip>
            {{ item.status.name }}
          </v-chip>
        </template>
        <template #[`item.documentNumber`]="{ item }">
          <div>{{ maskDocumentNumber(item.documentNumber) }}</div>
        </template>
        <template #[`item.phoneNumber`]="{ item }">
          <div>{{ maskPhoneNumber(item.phoneNumber) }}</div>
        </template>
        <template #[`item.actions`]="{ item }">
          <v-tooltip text="Deletar paciente" location="left">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                :icon="mdiTrashCan"
                size="small"
                color="error"
                class="mr-2"
                @click="deleteListItem(item)"
              />
            </template>
          </v-tooltip>
          <v-tooltip text="Editar paciente" location="left">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                :icon="mdiSquareEditOutline"
                size="small"
                color="primary"
                :to="{ name: 'paciente-update', params: { id: item.id } }"
              />
            </template>
          </v-tooltip>
        </template>
      </v-data-table-server>
    </template>
  </default-template>
</template>
