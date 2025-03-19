import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import KpiCard from '@/components/KpiCard/KpiCard.vue';

describe('KpiCard.vue', () => {
  it('affiche correctement les props de base', () => {
    const wrapper = mount(KpiCard, {
      props: {
        title: 'Test Title',
        value: 'Test Value',
      },
    });

    expect(wrapper.find('.kpi-title-text').text()).toBe('Test Title');
    expect(wrapper.find('.kpi-card-value').text()).toBe('Test Value');
  });

  it('affiche correctement le sous-titre', () => {
    const wrapper = mount(KpiCard, {
      props: {
        title: 'Test Title',
        value: 'Test Value',
        subtitle: 'Test Subtitle',
      },
    });

    const subtitle = wrapper.find('.kpi-card-subtitle');
    expect(subtitle.exists()).toBe(true);
    expect(subtitle.text()).toBe('Test Subtitle');
  });

  it('affiche correctement le taux de conversion', async () => {
    const wrapper = mount(KpiCard, {
      props: {
        title: 'Taux de conversion',
        value: '75%',
        subtitle: 'Visiteurs: 100, Héros créés: 75',
        icon: 'mdi-percent-outline',
        iconColor: '#fa9100',
        tooltip: 'Ce taux correspond au pourcentage de visiteurs ayant acheté une pilule.',
      },
    });

    expect(wrapper.find('.kpi-title-text').text()).toBe('Taux de conversion');
    expect(wrapper.find('.kpi-card-value').text()).toBe('75%');
    expect(wrapper.find('.kpi-card-subtitle').text()).toBe('Visiteurs: 100, Héros créés: 75');
    const icon = wrapper.find('.v-icon');
    expect(icon.exists()).toBe(true);
    // expect(icon.text()).toBe('mdi-percent-outline');
    expect(icon.attributes('style')).toContain('color: rgb(250, 145, 0);');
    const tooltipIcon = wrapper.find('.kpi-card-tooltip-icon');
    expect(tooltipIcon.exists()).toBe(true);
    expect(tooltipIcon.attributes('aria-describedby')).toBe('tooltip-text');
    // await tooltipIcon.trigger('click');
    // const tooltipText = wrapper.find('#tooltip-text');
    // expect(tooltipText.exists()).toBe(true);
    // expect(tooltipText.text()).toBe(
    //   "Ce taux correspond au pourcentage d'objets trouvés qui ont été restitués.",
    // );
  });

  // it("affiche correctement l'info-bulle au survol", async () => {
  //   const wrapper = mount(KpiCard, {
  //     props: {
  //       title: 'Test Title',
  //       value: 'Test Value',
  //       tooltip: 'Test Tooltip',
  //     },
  //   });

  //   const tooltipIcon = wrapper.find('.kpi-card-tooltip-icon');
  //   expect(tooltipIcon.exists()).toBe(true);
  //   await tooltipIcon.trigger('mouseenter');
  //   const tooltipText = wrapper.find('#tooltip-text');
  //   expect(tooltipText.exists()).toBe(true);
  //   expect(tooltipText.text()).toBe('Test Tooltip');
  // });
});
