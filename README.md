# appointment-platform
********Disponibilite Tests:

1) Vérifier que la disponibilité a été ajoutée:
GET http://localhost:5000/api/disponibilites?professionnelId=67d348d73013d9c514e6ddfa

2) Supprimer la disponibilité:
DELETE  http://localhost:5000/api/disponibilites/<id>

3) Retester l'ajout d'une disponibilité:
POST   http://localhost:5000/api/add
Body:{
  "professionnelId": "67d348d73013d9c514e6ddfa",
  "date": "2025-03-13",
  "heureDebut": "09:00",
  "heureFin": "17:00"
}

 4) Vérifier à nouveau l'ajout:
 GET  http://localhost:5000/api/disponibilites?professionnelId=67d348d73013d9c514e6ddfa

**********Notifications Test
1) creer une  notification  :
POST      http://localhost:5000/api/notifications/create

 Body : 
 {
  "type": "rappel",
  "message": "Votre rendez-vous est prévu demain à 10h.",
  "destinataireId": "67d368a180b199f1e3cf4405"
}
2) Supprimer une notification
DELETE    http://localhost:5000/api/notifications/delete/<id>

3) Récupérer les notifications d'un utilisateur
GET     http://localhost:5000/api/notifications/my

********Rendezvous
1) Créer un rendez-vous
POST    http://localhost:5000/api/rendezvous/create
Body :
{
    "date": "2025-03-14",
    "heure": "10:00",
    "professionnelId": "67d346a7d8bca6187c27db7c"
}
2) Récupérer les rendez-vous d'un professionnel
GET     http://localhost:5000/api/rendezvous/my