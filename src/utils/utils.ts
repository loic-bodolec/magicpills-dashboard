/**
 * Simule un délai pour l'appel API.
 * @param delay Le délai en millisecondes.
 * @returns Une promesse qui se résout après le délai spécifié.
 */
export const simulateApiDelay = (delay: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
