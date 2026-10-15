# Les Super Mesures

Petite PWA de révision pour le CE2 : mesures de longueur (cm et mm) et conversions.
Trois mini-jeux (l'apprenti mesureur, la machine à convertir, le tri des longueurs), étoiles et badges, sans publicité, utilisable hors-ligne.

## Mise en ligne (GitHub Pages)
1. Settings → Pages → *Deploy from a branch* → `main` / racine.
2. Ouvrir `https://<compte>.github.io/super_mesures/` une première fois en ligne.
3. Android/Chrome : « Installer l'appli » ; iPhone/Safari : Partager → « Sur l'écran d'accueil ».

## Mettre à jour
Après une modification, changer `CACHE_NAME` (`super-mesures-v1` → `v2`) dans `service-worker.js` pour forcer le rafraîchissement du cache.

Fichiers : `index.html` (appli complète), `manifest.json`, `service-worker.js`, icônes.
