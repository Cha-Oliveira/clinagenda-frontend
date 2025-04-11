<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { DefaultTemplate } from '@/template'
import { mdiCancel, mdiPlusCircle } from '@mdi/js'
import request from '@/engine/httpClient'
import { useRoute } from 'vue-router'
import { PageMode } from '@/enum'
import { useToastStore } from '@/stores'
import router from '@/router'
import type { PacienteForm } from '@/interfaces/paciente'
import type { GetStatusListResponse, IStatus } from '@/interfaces/status'
import { clearMask, dateFormat, DateFormatEnum, dateMask, phoneNumberMask, documentNumberMask } from '@/utils'

const toastStore = useToastStore()
 const route = useRoute()
 
 const isLoadingForm = ref<boolean>(false)
 
 const id = route.params.id
 const pageMode = id ? PageMode.PAGE_UPDATE : PageMode.PAGE_INSERT
 
 const form = ref<PacienteForm>({
   name: '',
   documentNumber: '',
   phoneNumber: '',
   birthDate: '',
   statusId: null
 })
 const statusItems = ref<IStatus[]>([])
 
 const pageTitle = computed(() => {
   return pageMode === PageMode.PAGE_UPDATE ? 'Editar paciente' : 'Cadastrar novo paciente'
 })
 
 const submitForm = async () => {
   isLoadingForm.value = true
 
   const body = {
     ...form.value,
     documentNumber: clearMask(form.value.documentNumber),
     phoneNumber: clearMask(form.value.phoneNumber),
     birthDate: dateFormat(
       form.value.birthDate,
       DateFormatEnum.FullDateAmerican.value,
       DateFormatEnum.FullDate.value
     )
   }
 
   const response = await request<PacienteForm, null>({
     method: pageMode == PageMode.PAGE_INSERT ? 'POST' : 'PUT',
     endpoint: pageMode == PageMode.PAGE_INSERT ? 'patient/insert' : `patient/update/${id}`,
     body
   })
 
   if (response.isError) return
 
   toastStore.setToast({
     type: 'success',
     text: `patient ${pageMode == PageMode.PAGE_INSERT ? 'criado' : 'alterado'} com sucesso!`
   })
 
   router.push({ name: 'patient-list' })
   isLoadingForm.value = false
 }
 
 const loadForm = async () => {
   isLoadingForm.value = true
 
   const statusRequest = request<undefined, GetStatusListResponse>({
     method: 'GET',
     endpoint: 'status/list'
   })
 
   const requests: Promise<any>[] = [statusRequest]
 
   if (pageMode === PageMode.PAGE_UPDATE) {
     const pacienteFormRequest = request<undefined, PacienteForm>({
       method: 'GET',
       endpoint: `patient/listById/${id}`
     })
 
     requests.push(pacienteFormRequest)
   }
 
   const [statusResponse, patienteFormResponse] = await Promise.all(requests)
 
   if (statusResponse.isError || patienteFormResponse?.isError) return
 
   statusItems.value = statusResponse.data.items
 
   if (pageMode === PageMode.PAGE_UPDATE) {
     form.value = patienteFormResponse.data
   }
 
   isLoadingForm.value = false
 }
 
 onMounted(() => {
   loadForm()
 })
 </script>

<template>
  <DefaultTemplate>
    <template #title>
      {{ pageTitle }}
    </template>

    <template #action>
      <v-btn :prepend-icon="mdiCancel" :to="{ name: 'paciente-list' }"> Cancelar </v-btn>
      <v-btn color="primary" :prepend-icon="mdiPlusCircle" @click.prevent="submitForm">
        Salvar
      </v-btn>
    </template>

    <v-form :disabled="isLoadingForm" @submit.prevent="submitForm">
      <v-row>
        <v-col cols="4">
          <v-text-field v-model.trim="form.name" label="Nome" hide-details />
        </v-col>
        <v-col cols="2">
          <v-select
            v-model="form.statusId"
            label="Status"
            :loading="isLoadingForm"
            :items="statusItems"
            item-value="id"
            item-title="name"
            clearable
            hide-details
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model.trim="form.documentNumber"
            v-maska="documentNumberMask"
            label="CPF"
            hide-details
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model.trim="form.phoneNumber"
            v-maska="phoneNumberMask"
            label="Telefone"
            hide-details
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model.trim="form.birthDate"
            v-maska="dateMask"
            label="Data de Nascimento"
            hide-details
          />
        </v-col>
      </v-row>
    </v-form>
  </DefaultTemplate>
</template>
