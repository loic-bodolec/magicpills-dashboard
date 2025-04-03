// Définir une base dynamique en fonction de l'environnement
// adapté ici pour github pages
// et pour le développement local
const baseUrl = import.meta.env.MODE === 'production' ? '/magicpills-dashboard/' : '/';

export default baseUrl;
