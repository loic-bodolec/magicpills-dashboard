/**
 * Retourne un message d'erreur basé sur l'erreur fournie.
 * @param error L'objet d'erreur.
 * @returns Une chaîne contenant le message d'erreur.
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  return "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
}
