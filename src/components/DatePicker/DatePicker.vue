<template>
  <v-menu
    v-model="isMenuOpen"
    :close-on-content-click="false"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="auto"
  >
    <template v-slot:activator="{ props }">
      <v-text-field
        v-model="formattedDate"
        v-bind="props"
        :label="label"
        readonly
        outlined
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="localValue"
      @update:model-value="onDateChange"
      :max="maxDate"
      :min="minDate"
      scrollable
      color="#2d3282"
      elevation="24"
    ></v-date-picker>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

interface Props {
<<<<<<< HEAD
  modelValue: Date | null; // La valeur de la date sélectionnée (passée par le parent)
  label: string; // Le texte affiché comme étiquette du champ texte
  menu: boolean; // Contrôle l'état du menu (ouvert/fermé)
  maxDate?: string; // La date maximale sélectionnable
  minDate?: string; // La date minimale sélectionnable
}

const props = defineProps<Props>();
const emit = defineEmits(['update:model-value']); // Événement émis pour mettre à jour la valeur dans le parent

// État local pour éviter de modifier directement la prop
const localValue = ref(props.modelValue);

// Surveille les changements de la prop et met à jour l'état local
=======
  modelValue: Date | null;
  label: string;
  menu: boolean;
  maxDate?: string;
  minDate?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:model-value']);

// Local state to avoid directly mutating the prop
const localValue = ref(props.modelValue);

// Watch for changes in the prop and update the local state
>>>>>>> 4012d1c (refacto: create DatePicker component for enhanced date selection functionality)
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

<<<<<<< HEAD
// Surveille les changements de l'état local et émet les mises à jour vers le parent
=======
// Watch for changes in the local state and emit updates to the parent
>>>>>>> 4012d1c (refacto: create DatePicker component for enhanced date selection functionality)
watch(localValue, (newValue) => {
  emit('update:model-value', newValue);
});

<<<<<<< HEAD
// Gestion de l'état du menu (ouvert/fermé)
const isMenuOpen = ref(false);

// Formate la date pour l'affichage dans le champ texte (format YYYY-MM-DD)
=======
// Gestion de l'état du menu
const isMenuOpen = ref(false);

// Formate la date pour l'affichage dans le champ texte
>>>>>>> 4012d1c (refacto: create DatePicker component for enhanced date selection functionality)
const formattedDate = computed(() =>
  props.modelValue ? props.modelValue.toISOString().split('T')[0] : ''
);

<<<<<<< HEAD
// Met à jour la date sélectionnée et ferme le menu
const onDateChange = (value: Date | null) => {
  emit('update:model-value', value); // Émet la nouvelle date vers le parent
  isMenuOpen.value = false; // Ferme le menu
=======
// Met à jour la date et ferme le menu
const onDateChange = (value: Date | null) => {
  emit('update:model-value', value);
  isMenuOpen.value = false;
>>>>>>> 4012d1c (refacto: create DatePicker component for enhanced date selection functionality)
};
</script>

<style scoped lang="scss">
// TODO déplacer le style dans un fichier .scss
.v-text-field {
  width: 100%;
  height: 55px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
>>>>>>> 4012d1c (refacto: create DatePicker component for enhanced date selection functionality)
}
</style>
