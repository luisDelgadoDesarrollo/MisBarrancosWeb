<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-card style="max-height: 90vh; overflow-y: auto">
          <v-text-field v-model="localName" class="input-group--focused"
            ><template #label> Nombre <span style="color: red">*</span> </template></v-text-field
          >
          <v-text-field
            v-model="localDescription"
            class="input-group--focused"
            label="Descripcion"
          ></v-text-field>
          <v-text-field
            v-model="localSeason"
            class="input-group--focused"
            label="Temporada"
          ></v-text-field>
          <v-text-field
            v-model="localCountry"
            class="input-group--focused"
            label="Pais"
          ></v-text-field>
          <v-text-field
            v-model="localLocation!.population"
            class="input-group--focused"
            label="Pueblo"
          ></v-text-field>
          <v-text-field
            v-model="localLocation!.latitud"
            class="input-group--focused"
            label="Latitud"
          ></v-text-field>
          <v-text-field
            v-model="localLocation!.longitud"
            class="input-group--focused"
            label="Longitud"
          ></v-text-field>
          <v-text-field
            v-model="localLocation!.zone"
            class="input-group--focused"
            label="Zona"
          ></v-text-field>
          <v-text-field
            v-model="localRiver"
            class="input-group--focused"
            label="Rio"
          ></v-text-field>
          <v-text-field
            v-model="localCanyonDifficulty"
            class="input-group--focused"
            label="Dificultad ej: V2 A3 III"
            :rules="[validateFormatoDifficulty]"
          ></v-text-field>
          <!--Prohibiciones-->
          <div :key="localCanyonProhibitions.length" v-if="localCanyonProhibitions.length > 0">
            <ul>
              <li v-for="(entry, idx) in localCanyonProhibitions as CanyonProhibition[]" :key="idx">
                <CanyonProhibitionCard
                  :canyonProhibition="entry"
                  :updatable="true"
                  @update:canyonProhibitionEmit="
                    (updated: CanyonProhibition) => updateCanyonProhibition(updated, idx)
                  "
                  @delete="deleteCanyonProhibition"
                ></CanyonProhibitionCard>
              </li>
            </ul>
          </div>
          <v-row justify="end" clas="ma-4">
            <v-btn @click="canyonProhibitionForm = true">Nueva prohibición</v-btn>
          </v-row>
          <v-dialog v-model="canyonProhibitionForm">
            <CanyonProhibitionForm
              :update="false"
              v-model:canyonProhibitions="localCanyonProhibitions"
              @close="canyonProhibitionForm = false"
            ></CanyonProhibitionForm>
          </v-dialog>
          <!--descenso del barranco lista-->
          <div :key="localCanyonDescents.length" v-if="localCanyonDescents.length > 0">
            <ul>
              <li v-for="(entry, idx) in localCanyonDescents as CanyonDescent[]" :key="idx">
                <CanyonDescentCard
                  :canyonDescent="entry"
                  :updatable="true"
                  @update:canyonDescentEmit="(updated) => updateCanyonDescent(updated, idx)"
                  @delete="deleteCanyonDescent"
                ></CanyonDescentCard>
              </li>
            </ul>
          </div>
          <v-row justify="end" class="ma-4">
            <v-btn @click="canyonDescentForm = true">Nueva informacion basica del barranco</v-btn>
          </v-row>
          <v-dialog v-model="canyonDescentForm">
            <CanyonDescentForm
              :update="false"
              v-model:canyonDescents="localCanyonDescents"
              @close="canyonDescentForm = false"
            ></CanyonDescentForm>
          </v-dialog>
          <!--Croquis-->
          <ImagePickerD :model="localCroquis" label="Croquis"></ImagePickerD>
          <v-text-field
            v-model="localAccess"
            class="input-group--focused"
            label="Acceso"
          ></v-text-field>
          <v-text-field
            v-model="localApproach"
            class="input-group--focused"
            label="Aproximacion"
          ></v-text-field>
          <v-text-field
            v-model="localDescent"
            class="input-group--focused"
            label="Descenso"
          ></v-text-field>
          <!--Rapeles y pasos-->
          <div :key="localCanyonRappeling.length" v-if="localCanyonRappeling.length > 0">
            <ul>
              <li v-for="(entry, idx) in localCanyonRappeling" :key="entry.canyonId">
                <CanyonRappelingCard
                  :canyonRappeling="entry"
                  :updatable="true"
                  @update:canyonRappelingEmit="(updated) => updateCanyonRappeling(updated, idx)"
                  @delete="deleteCanyonRappeling"
                ></CanyonRappelingCard>
              </li>
            </ul>
          </div>
          <v-row justify="end" class="ma-4">
            <v-btn @click="canyonRappelingForm = true">Nuevo paso del barranco</v-btn>
          </v-row>
          <v-dialog v-model="canyonRappelingForm">
            <CanyonRappelingForm
              :update="false"
              v-model:canyonRappelings="localCanyonRappeling"
              @close="canyonRappelingForm = false"
            ></CanyonRappelingForm>
          </v-dialog>
          <v-text-field
            v-model="localReturn"
            class="input-group--focused"
            label="Retorno"
          ></v-text-field>
          <v-text-field
            v-model="localScape"
            class="input-group--focused"
            label="Escapes"
          ></v-text-field>
          <!--puntos de control-->
          <div :key="localCanyonControlLevel.length" v-if="localCanyonControlLevel.length > 0">
            <ul>
              <li v-for="(entry, idx) in localCanyonControlLevel" :key="idx">
                <CanyonControlLevelCard
                  :canyonControlLevel="entry"
                  :updatable="true"
                  @update:canyonControlLevelEmit="
                    (updated) => updateCanyonControlLevel(updated, idx)
                  "
                  @delete="deleteCanyonControlLevel"
                ></CanyonControlLevelCard>
              </li>
            </ul>
          </div>
          <v-row justify="end" class="ma-4">
            <v-btn @click="canyonControlLevelForm = true">Nuevo punto de control</v-btn>
          </v-row>
          <v-dialog v-model="canyonControlLevelForm">
            <CanyonControlLevelForm
              :update="false"
              v-model:canyonControlLevels="localCanyonControlLevel"
              @close="canyonControlLevelForm = false"
            ></CanyonControlLevelForm>
          </v-dialog>
          <v-text-field
            v-model="localCoverage"
            class="input-group--focused"
            label="Cobertura"
          ></v-text-field>
          <!--schedules-->
          <div :key="localCanyonSchedule.length" v-if="localCanyonSchedule.length > 0">
            <ul>
              <li v-for="(entry, idx) in localCanyonSchedule as CanyonSchedule[]" :key="idx">
                <CanyonScheduleCard
                  :canyonSchedule="entry"
                  :updatable="true"
                  @update:canyonScheduleEmit="(updated) => updateCanyonSchedule(updated, idx)"
                  @delete="deleteCanyonSchedule"
                ></CanyonScheduleCard>
              </li>
            </ul>
          </div>
          <v-row justify="end" class="ma-4">
            <v-btn @click="canyonScheduleForm = true">Nuevo horario</v-btn>
          </v-row>
          <v-dialog v-model="canyonScheduleForm">
            <CanyonScheduleForm
              :update="false"
              v-model:canyonSchedules="localCanyonSchedule"
              @close="canyonScheduleForm = false"
            ></CanyonScheduleForm>
          </v-dialog>
          <!--links-->
          <div :key="localCanyonLink.length" v-if="localCanyonLink.length > 0">
            <ul>
              <li v-for="(entry, idx) in localCanyonLink as CanyonLink[]" :key="idx">
                <CanyonLinkCard
                  :canyonLink="entry"
                  :updatable="true"
                  @update:canyonLinkEmit="(updated) => updateCanyonLink(updated, idx)"
                  @delete="deleteCanyonLink"
                ></CanyonLinkCard>
              </li>
            </ul>
          </div>
          <v-row justify="end" class="ma-4">
            <v-btn @click="canyonLinkForm = true">Nuevo link</v-btn>
          </v-row>
          <v-dialog v-model="canyonLinkForm">
            <CanyonLinkForm
              :update="false"
              v-model:canyonLinks="localCanyonLink"
              @close="canyonLinkForm = false"
            ></CanyonLinkForm>
          </v-dialog>
          <!-- Campo de texto con margen superior -->
          <v-text-field v-model="localGeology" class="input-group--focused mt-4" label="Geologia" />
          <v-row justify="space-between" class="mt-4 mr-1">
            <v-btn @click="props.close" class="mr-2">Cancelar</v-btn>
            <v-btn @click="send">Enviar</v-btn>
            <v-snackbar
              :timeout="2000"
              color="error"
              variant="tonal"
              elevation="12"
              v-model="canyonFormFail"
            >
              {{ canyonFormFailText }}
            </v-snackbar>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {
  type Canyon,
  type CanyonControlLevel,
  type CanyonDescent,
  type CanyonLink,
  type CanyonLocation,
  type CanyonProhibition,
  type CanyonRappeling,
  type CanyonSchedule,
} from '@/api'
import { reactive, ref } from 'vue'
import ImagePickerD from '../ImagePickerD.vue'
import CanyonDescentCard from '../cards/CanyonDescentCard.vue'
import CanyonRappelingCard from '../cards/CanyonRappelingCard.vue'
import CanyonProhibitionCard from '../cards/CanyonProhibitionCard.vue'
import CanyonControlLevelCard from '../cards/CanyonControlLevelCard.vue'
import CanyonScheduleCard from '../cards/CanyonScheduleCard.vue'
import CanyonLinkCard from '../cards/CanyonLinkCard.vue'
import CanyonDescentForm from './CanyonDescentForm.vue'
import CanyonRappelingForm from './CanyonRappelingForm.vue'
import CanyonControlLevelForm from './CanyonControlLevelForm.vue'
import CanyonScheduleForm from './CanyonScheduleForm.vue'
import CanyonLinkForm from './CanyonLinkForm.vue'
import CanyonProhibitionForm from './CanyonProhibitionForm.vue'
import { createImageStore } from '@/stores/images'
import { postImage } from '@/calls/ImageCalls'
import { insertCanyonsWithAuth, updateCanyonsWithAuth } from '@/calls/CanyonCalls'
import { runValidations, validateFormatoDifficulty, validateRequired } from '@/utils/Validations'

const canyonDescentForm = ref(false)
const canyonRappelingForm = ref(false)
const canyonControlLevelForm = ref(false)
const canyonScheduleForm = ref(false)
const canyonLinkForm = ref(false)
const canyonProhibitionForm = ref(false)
const canyonFormFail = ref(false)
const canyonFormFailText = ref('')

const props = withDefaults(
  defineProps<{
    canyon?: Canyon | null
    close: () => void
  }>(),
  {},
)

const createDefaultLocation = (): CanyonLocation => ({})

const localName = ref(props.canyon?.name ?? '')
const localSeason = ref(props.canyon?.season ?? '')
const localRiver = ref(props.canyon?.river ?? '')
const localCountry = ref(props.canyon?.country ?? '')
const localDescription = ref(props.canyon?.description ?? '')
const localCoverage = ref(props.canyon?.coverage ?? '')
const localCroquis = ref(props.canyon?.croquis ?? '')
const localAccess = ref(props.canyon?.access ?? '')
const localApproach = ref(props.canyon?.approach ?? '')
const localDescent = ref(props.canyon?.descent ?? '')
const localReturn = ref(props.canyon?._return ?? '')
const localScape = ref(props.canyon?.scape ?? '')
const localGeology = ref(props.canyon?.geology ?? '')
const localLocation = reactive<CanyonLocation>(props.canyon?.location ?? createDefaultLocation())
const localCanyonRappeling = ref(props.canyon?.canyonRappeling ?? [])
const localCanyonDescents = ref(props.canyon?.canyonDescent ?? [])
const localCanyonSchedule = ref(props.canyon?.canyonSchedule ?? [])
const localCanyonLink = ref(props.canyon?.canyonLink ?? [])
const localCanyonProhibitions = ref(props.canyon?.canyonProhibition ?? [])
const localCanyonDifficulty = ref(props.canyon?.canyonDifficulty?.[0].difficultyDesc)
const localCanyonControlLevel = ref(props.canyon?.canyonControlLevel ?? [])

const resultValidations = () => {
  return runValidations([
    () => validateRequired(localName.value),
    () => validateFormatoDifficulty(localCanyonDifficulty.value),
  ])
}

const send = () => {
  const resultVal = resultValidations()
  if (resultVal === true) {
    const canyonToSave = buildCanyonToSave()
    const canyonControlLevelControlPointPinia = createImageStore('canyonControlLevelImages')()
    if (canyonToSave.canyonId) {
      updateCanyonsWithAuth({ canyonId: canyonToSave.canyonId, canyon: canyonToSave })
    } else {
      insertCanyonsWithAuth({ canyon: canyonToSave })
    }
    canyonControlLevelControlPointPinia.getImages().forEach((image) => {
      postImage({ dir: 'controlPoints', file: image.file, name: image.name })
    })

    props.close()
  } else {
    canyonFormFailText.value = resultVal
    canyonFormFail.value = true
  }
}

const buildCanyonToSave = (): Canyon => {
  const canyonToSave = {} as Canyon
  canyonToSave.canyonId = props.canyon?.canyonId ?? undefined
  canyonToSave.name = localName.value
  canyonToSave.season = localSeason.value
  canyonToSave.river = localRiver.value
  canyonToSave.country = localCountry.value
  canyonToSave.description = localDescription.value
  canyonToSave.coverage = localCoverage.value
  canyonToSave.croquis = localCroquis.value
  canyonToSave.access = localAccess.value
  canyonToSave.approach = localApproach.value
  canyonToSave.descent = localDescent.value
  canyonToSave._return = localReturn.value
  canyonToSave.scape = localScape.value
  canyonToSave.geology = localGeology.value
  canyonToSave.location = localLocation
  canyonToSave.canyonRappeling = localCanyonRappeling.value
  canyonToSave.canyonDescent = localCanyonDescents.value
  canyonToSave.canyonSchedule = localCanyonSchedule.value
  canyonToSave.canyonLink = localCanyonLink.value
  canyonToSave.canyonProhibition = localCanyonProhibitions.value
  canyonToSave.canyonDifficulty = [
    { canyonId: props.canyon?.canyonId ?? undefined, difficultyDesc: localCanyonDifficulty.value },
  ]
  canyonToSave.canyonControlLevel = localCanyonControlLevel.value

  return canyonToSave
}

const deleteCanyonRappeling = (canyonRappelingDelete: CanyonRappeling) => {
  localCanyonRappeling.value = localCanyonRappeling.value.filter(
    (canyonRappeling) => canyonRappeling != canyonRappelingDelete,
  )
}

const updateCanyonRappeling = (canyonRappelingUpdated: CanyonRappeling, index: number) => {
  const newList = [...localCanyonRappeling.value]
  newList[index] = canyonRappelingUpdated
  localCanyonRappeling.value = newList
}

const deleteCanyonDescent = (canyonDescentDelete: CanyonDescent) => {
  localCanyonDescents.value = localCanyonDescents.value.filter(
    (canyonDescent) => canyonDescent != canyonDescentDelete,
  )
}

const updateCanyonDescent = (canyonDescentUpdated: CanyonDescent, index: number) => {
  const newList = [...localCanyonDescents.value]
  newList[index] = canyonDescentUpdated
  localCanyonDescents.value = newList
}

const deleteCanyonControlLevel = (canyonControlLevelDelete: CanyonControlLevel) => {
  localCanyonControlLevel.value = localCanyonControlLevel.value.filter(
    (canyonControlLevel) => canyonControlLevel != canyonControlLevelDelete,
  )
}

const updateCanyonControlLevel = (canyonControlLevelUpdated: CanyonControlLevel, index: number) => {
  const newList = [...localCanyonControlLevel.value]
  newList[index] = canyonControlLevelUpdated
  localCanyonControlLevel.value = newList
}

const deleteCanyonSchedule = (canyonScheduleDelete: CanyonSchedule) => {
  localCanyonSchedule.value = localCanyonSchedule.value.filter(
    (canyonSchedule) => canyonSchedule != canyonScheduleDelete,
  )
}

const updateCanyonSchedule = (canyonScheduleUpdate: CanyonSchedule, index: number) => {
  const newList = [...localCanyonSchedule.value]
  newList[index] = canyonScheduleUpdate
  localCanyonSchedule.value = newList
}

const deleteCanyonLink = (canyonLinkDelete: CanyonLink) => {
  localCanyonLink.value = localCanyonLink.value.filter(
    (canyonLink) => canyonLink != canyonLinkDelete,
  )
}

const updateCanyonLink = (canyonLinkUpdate: CanyonLink, index: number) => {
  const newList = [...localCanyonLink.value]
  newList[index] = canyonLinkUpdate
  localCanyonLink.value = newList
}

const deleteCanyonProhibition = (canyonProhibitionDelete: CanyonProhibition) => {
  localCanyonProhibitions.value = localCanyonProhibitions.value.filter(
    (canyonProhibition) => canyonProhibition != canyonProhibitionDelete,
  )
}

const updateCanyonProhibition = (canyonProhibitionUpdate: CanyonProhibition, index: number) => {
  const newList = [...localCanyonProhibitions.value]
  newList[index] = canyonProhibitionUpdate
  localCanyonProhibitions.value = newList
}
</script>
