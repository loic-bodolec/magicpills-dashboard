import { vi } from 'vitest';
import { config } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

// Création de l'instance Vuetify
const vuetify = createVuetify();

// Injecte Vuetify dans les tests
config.global.plugins = [vuetify];

// Mock ResizeObserver (Vuetify en a besoin)
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Optionnel : Mock des éventuels objets globaux si nécessaire
vi.stubGlobal('matchMedia', () => ({
  matches: false,
  addListener: vi.fn(),
  removeListener: vi.fn(),
}));
