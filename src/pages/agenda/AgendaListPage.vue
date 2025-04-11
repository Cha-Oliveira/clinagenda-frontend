<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { DefaultTemplate } from '@/template'
import { mdiPlusCircle, mdiSquareEditOutline, mdiTrashCan } from '@mdi/js'
import request from '@/engine/httpClient'
import { useToastStore } from '@/stores'

import type {  ISpecialty } from '@/interfaces/specialty'
import type { GetAgendaListRequest, IAgenda } from '@/interfaces/agenda'

const toastStore = useToastStore()

const isLoadingList = ref<boolean>(false)
const isLoadingFilter = ref<boolean>(false)

const filterName = ref<GetAgendaListRequest['name']>('')
const filterSpecialtyId = ref<ISpecialty[]>()


const itemsPerPage = ref<number>(10)
const total = ref<number>(0)
const page = ref<number>(1)
const items = ref<IAgenda[]>([])
const specialtyItems = ref<ISpecialty[]>([])



const headers = [
  {
    title: 'ID',
    key: 'id',
    sortable: false,
    width: 0,
    cellProps: { class: 'text-no-wrap' }
  },
  { title: 'Nome', key: 'name', sortable: false },
  { title: 'Paciente', key: 'paciente', sortable: false },
  { title: 'Documento', key: 'documentNumber', sortable: false },
  { title: 'Profissional', key: 'doctor', sortable: false },
  { title: 'Especialidades', key: 'specialty', sortable: false },
  { title: 'Hora da Consulta', key: 'appointmentDate', sortable: false },
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
    const { isError, data } = await request<GetAgendaListRequest, GetAgendaListRequest>({
      method: 'GET',
      endpoint: 'appointment/list',
      body: {
        itemsPerPage: itemsPerPage.value,
        page: page.value,
        name: filterName.value,
        SpecialtyId: filterSpecialtyId.value
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

 
    const specialtyResponse = await request<undefined, GetAgendaListRequest>({
      method: 'GET',
      endpoint: 'specialty/list'
    })
    try {
    if (specialtyResponse.isError) return
    specialtyItems.value = specialtyResponse.data.items
  } catch (e) {
    console.error('Erro ao buscar items do filtro', e)
  }

  isLoadingFilter.value = false
}

const deleteListItem = async (item: IAgenda) => {
  const shouldDelete = confirm(`Deseja mesmo deletar ${item.name}?`)

  if (!shouldDelete) return

  try {
    const response = await request<null, null>({
      method: 'DELETE',
      endpoint: `appointment/${item.id}`
    })

    if (response.isError) return

    toastStore.setToast({
      type: 'success',
      text: 'Profissional deletada com sucesso!'
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
    <template #title> Lista de Profissionais </template>

    <template #action>
      <v-btn color="primary" :prepend-icon="mdiPlusCircle" :to="{ name: 'appointment-insert' }">
        Cadastrar
      </v-btn>
    </template>

    <template #default>
      <v-sheet class="pa-4 mb-4">
        <v-form @submit.prevent="loadDataTable">
          <v-row>
            <v-col>
              <v-text-field 
                v-model.trim="filterName"
                label="Profissional"
                hide-details
              />
            </v-col>
            <v-col>
              <v-text-field 
                v-model.trim="filterName"
                label="Pacientes"
                hide-details
              />
            </v-col>
            <v-col>
              <v-select
                v-model="filterSpecialtyId"
                label="Especialidade"
                :loading="isLoadingFilter"
                :items="specialtyItems"
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
        <template #[`item.specialty`]="{ item }">
          <v-chip v-for="specialty in item.specialty" :key="specialty.id" class="mr-2">
            {{ specialty.name }}
          </v-chip>
        </template>
        <template #[`item.status`]="{ item }">
          <v-chip>
            {{ item.status.name }}
          </v-chip>        
        </template>
        <template #[`item.actions`]="{ item }">
          <v-tooltip text="Deletar profissional" location="left">
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
          <v-tooltip text="Editar profissional" location="left">
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                :icon="mdiSquareEditOutline"
                size="small"
                color="primary"
                :to="{ name: 'doctor-update', params: { id: item.id } }"
              />
            </template>
          </v-tooltip>
        </template>
      </v-data-table-server>
    </template>
  </default-template>
</template>
