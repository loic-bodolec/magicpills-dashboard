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
  },
});
