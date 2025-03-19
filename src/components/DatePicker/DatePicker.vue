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
        dense
        outlined
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="localValue"
      @update:model-value="onDateChange"
      :max="maxDate"
      :min="minDate"
      scrollable
    ></v-date-picker>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';

interface Props {
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
watch(() => props.modelValue, (newValue) => {
  localValue.value = newValue;
});

// Watch for changes in the local state and emit updates to the parent
watch(localValue, (newValue) => {
  emit('update:model-value', newValue);
});

// Gestion de l'état du menu
const isMenuOpen = ref(false);

// Formate la date pour l'affichage dans le champ texte
const formattedDate = computed(() =>
  props.modelValue ? props.modelValue.toISOString().split('T')[0] : ''
);

// Met à jour la date et ferme le menu
const onDateChange = (value: Date | null) => {
  emit('update:model-value', value);
  isMenuOpen.value = false;
};
</script>

<style scoped lang="scss">
// TODO déplacer le style dans un fichier .scss
.v-text-field {
  width: 100%;
  height: 55px;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
