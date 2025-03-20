import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { fr } from 'vuetify/locale';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'fr', // Définit la langue par défaut
    messages: { fr }, // Définit les messages de la langue par défaut
  },
  defaults: {
    VDatePicker: {
      locale: 'fr',
      labels: {
        selectDate: 'Sélectionner une date',
        enterDate: 'Entrer la date',
      },
    },
  },
});
