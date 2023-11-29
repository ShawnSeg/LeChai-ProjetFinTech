use leChai

INSERT INTO provinces (nom) 
VALUES 
('Québec'),('Ontario'),('Alberta'),('Saskatchewan'),
('Colombie-Britannique'),('Yukon'),('Nunavut'),
('Territoires du Nord-Ouest'),('Île-du-Prince-Édouard'),
('Manitoba'), ('Terre-Neuve-et-Labrador');

INSERT INTO villes (nom,id_province) 
VALUES 
('Sherbrooke',1), ('Montréal',1), ('Ottawa',2);

INSERT INTO clients (nom,prenom, date_naissance, adresse_courriel, mdp, token, sel, actif) 
VALUES 
('Séguin', 'Shawn', '2000-04-28', 'shawn4seg@gmail.com', 0x8FFB0CEACE5A70EB01CF9D0DD8BBB5122B840A0F07EAFFB0A0153F0B603F24491FE426D78674D0A35A0D4DC8BC9AAB2E9C78DA5A08F3C7908DA63C9EFF4E3DC98B8E7C728493487328B1D8D5B2A86963E169CEDC73272DCBFB9BB111751ED7BCCCED1700900ED9AC6AC6F832365765C71BC3C1C21CD5E6F4ACDE586BC5C89F21, 'testToken1', 0xE53B2C8BC2E3E7B9916E8A681001F7893E272BD3162C175887377A4DC332C4203D97CC0467782A515BC1C197DB4A02C4D33401F8E607A79DBD1606A665649834, 1), 
('Plouffe', 'Antoine', '2002-01-22', 'antoplouffee@gmail.com', 0x8FFB0CEACE5A70EB01CF9D0DD8BBB5122B840A0F07EAFFB0A0153F0B603F24491FE426D78674D0A35A0D4DC8BC9AAB2E9C78DA5A08F3C7908DA63C9EFF4E3DC98B8E7C728493487328B1D8D5B2A86963E169CEDC73272DCBFB9BB111751ED7BCCCED1700900ED9AC6AC6F832365765C71BC3C1C21CD5E6F4ACDE586BC5C89F21, 'testToken2', 0xE53B2C8BC2E3E7B9916E8A681001F7893E272BD3162C175887377A4DC332C4203D97CC0467782A515BC1C197DB4A02C4D33401F8E607A79DBD1606A665649834, 1), 
('Therrien-Marois', 'Adam', '2002-05-07', 'bobamos@gmail.com', 0x8FFB0CEACE5A70EB01CF9D0DD8BBB5122B840A0F07EAFFB0A0153F0B603F24491FE426D78674D0A35A0D4DC8BC9AAB2E9C78DA5A08F3C7908DA63C9EFF4E3DC98B8E7C728493487328B1D8D5B2A86963E169CEDC73272DCBFB9BB111751ED7BCCCED1700900ED9AC6AC6F832365765C71BC3C1C21CD5E6F4ACDE586BC5C89F21, 'testToken3', 0xE53B2C8BC2E3E7B9916E8A681001F7893E272BD3162C175887377A4DC332C4203D97CC0467782A515BC1C197DB4A02C4D33401F8E607A79DBD1606A665649834, 0), 
('Fréchette', 'Amélie', '1999-10-13', 'amefre@gmail.com', 0x8FFB0CEACE5A70EB01CF9D0DD8BBB5122B840A0F07EAFFB0A0153F0B603F24491FE426D78674D0A35A0D4DC8BC9AAB2E9C78DA5A08F3C7908DA63C9EFF4E3DC98B8E7C728493487328B1D8D5B2A86963E169CEDC73272DCBFB9BB111751ED7BCCCED1700900ED9AC6AC6F832365765C71BC3C1C21CD5E6F4ACDE586BC5C89F21, 'testToken4', 0xE53B2C8BC2E3E7B9916E8A681001F7893E272BD3162C175887377A4DC332C4203D97CC0467782A515BC1C197DB4A02C4D33401F8E607A79DBD1606A665649834, 0);

INSERT INTO employes(nom,prenom, date_naissance, adresse_courriel, mdp, token, sel, actif) 
VALUES 
('Test', 'Employe1', '1995-05-09', 'employetest1@gmail.com', 0x8FFB0CEACE5A70EB01CF9D0DD8BBB5122B840A0F07EAFFB0A0153F0B603F24491FE426D78674D0A35A0D4DC8BC9AAB2E9C78DA5A08F3C7908DA63C9EFF4E3DC98B8E7C728493487328B1D8D5B2A86963E169CEDC73272DCBFB9BB111751ED7BCCCED1700900ED9AC6AC6F832365765C71BC3C1C21CD5E6F4ACDE586BC5C89F21, 'testToken5', 0x8FFB0CEACE5A70EB01CF9D0DD8BBB5122B840A0F07EAFFB0A0153F0B603F24491FE426D78674D0A35A0D4DC8BC9AAB2E9C78DA5A08F3C7908DA63C9EFF4E3DC98B8E7C728493487328B1D8D5B2A86963E169CEDC73272DCBFB9BB111751ED7BCCCED1700900ED9AC6AC6F832365765C71BC3C1C21CD5E6F4ACDE586BC5C89F21, 1), 
('Test', 'Employe2', '1996-12-30', 'employetest2@gmail.com', 0x8FFB0CEACE5A70EB01CF9D0DD8BBB5122B840A0F07EAFFB0A0153F0B603F24491FE426D78674D0A35A0D4DC8BC9AAB2E9C78DA5A08F3C7908DA63C9EFF4E3DC98B8E7C728493487328B1D8D5B2A86963E169CEDC73272DCBFB9BB111751ED7BCCCED1700900ED9AC6AC6F832365765C71BC3C1C21CD5E6F4ACDE586BC5C89F21, 'testToken6', 0x8FFB0CEACE5A70EB01CF9D0DD8BBB5122B840A0F07EAFFB0A0153F0B603F24491FE426D78674D0A35A0D4DC8BC9AAB2E9C78DA5A08F3C7908DA63C9EFF4E3DC98B8E7C728493487328B1D8D5B2A86963E169CEDC73272DCBFB9BB111751ED7BCCCED1700900ED9AC6AC6F832365765C71BC3C1C21CD5E6F4ACDE586BC5C89F21, 1),
('Frechette', 'Amelie', '1996-12-30', 'name9614@hotmail.ca', 0x280F1198BF76A4DD36B16495B7643AA8D69FB810ACCAE0073AA1BA79250485D960BBF71DA4ACA0E85B42FEE436D0B59B60F66E026B08703EDA971BABA3961C8E, '118488', 0x39B93D8E0373E30C4C7A399FCA20B396EFDB558FCE3D3B97A0B6383D557C01BFD47289370234F11388E6B8BBCA7C0F830C8D45C7B5C7FB77F73B96697170B87D59B3AD5147BE530C479053E0F94D1F759AA797E83B46C2BA9772C33B37A64B34C982843171E0AE3722651AB4658C0730343230855BE53C6E5349F2CF63730BBB, 1);


INSERT INTO etats_commandes(nom, descriptions)
VALUES
('fini','la commande est payée et livrée'), 
('en_cours','La commande est payée et est en préparation'), 
('erreur','Il y a eu une erreur quelconque'),
('panier','Ceci est le panier d''un client'), 
('souhait','Ceci est la liste de souhait d''un client'), 
('annulé','La commande est annulée');

INSERT INTO types_format_produit(nom, descriptions)
VALUES 
('Grandeur', 'la grandeur d''un produit'),
('Couleur','la couleur d''un produit');

INSERT INTO formats_produit(nom, descriptions, id_type_format_produit)
VALUES
('XS', ' ',1),('S', ' ',1),('M', ' ',1),('L', ' ',1),('XL', ' ',1),
('Bleu', ' ',2),('Rouge', ' ',2),('Jaune', ' ',2),('Vert', ' ',2),('Noir', ' ',2);

INSERT INTO fournisseurs(nom, telephone, adresse_courriel, contact)
VALUES
('Shawn Electroniques', '1234567890', 'shawn4seg@gmail.com', 'Shawn'),
('AP Products', '0987654321', 'app@gmail.com', 'Antoine'),
('Fréchette&Co', '1029384756', 'fco@gmail.com', 'Amélie'),
('Adams GainsGames&Grains', '0192837465', 'aggg@gmail.com', 'Adam');

INSERT INTO images_produit(url, descriptions)
VALUES
('leChai/leChaiFront.png', 'test'),
('leChai/leChaiTop.png', 'test'),
('leChai/leChaiBottom.png', 'test'),
('dirtyChai/dirtyFront.png', 'test'),
('dirtyChai/dirtyTop.png', 'test'),
('dirtyChai/dirtyBottom.png', 'test'),
('chandail/chaiShirtFront.png', 'test'),
('chandail/chaiShirtBack.png', 'test');

INSERT INTO compagnies(nom, telephone, adresse_courriel, contact)
VALUES
('Shawn Electroniques', '1234567890', 'shawn4seg@gmail.com', 'Shawn'),
('AP Products', '0987654321', 'app@gmail.com', 'Antoine'),
('Fréchette&Co', '1029384756', 'fco@gmail.com', 'Amélie'),
('Adams GainsGames&Grains', '0192837465', 'aggg@gmail.com', 'Adam');

INSERT INTO etats_produit(nom, descriptions)
VALUES
('En Stock', ' '),
('Rupture de stock', ' '),
('En commande',' ');

INSERT INTO reseaux_sociaux(nom)
VALUES
('Facebook'),
('Instagram'),
('LinkedIn'),
('TikTok');

INSERT INTO collaborateurs(nom, prenom, telephone, adresse_courriel, images, descriptions, id_compagnie)
VALUES
('Musk', 'Elon', '1234567890', 'elon@gmail.com','collaborateursImg/elonfunny.png','description collaborateur',1),
('Curie','Marie','0987654321', 'mc@gmail.com','collaborateursImg/marieCurie.png','description collaborateur',2),
('Obama','Barack', '9078563412', 'bo@gmail.com','collaborateursImg/funnyObama.png','description collaborateur',3),
('Paul','Logan', '5657512756', 'lp@gmail.com','collaborateursImg/collab1.png','description collaborateur',4);

INSERT INTO categories(nom, descriptions, id_categorie_mere)
VALUES
('Thé', ' ', null),
('Chai', ' ', 1),
('Linge', ' ', null),
('Chandail', ' ', 1);

INSERT INTO produits(nom, descriptions, prix, quantite_inventaire, id_categorie, id_etat_produit)
VALUES
('Le chai', 'Nôtre Chai est naître comme la meilleure solution à une forte demande de nos clients toujours à la recherche
      d’une bonne boisson plaine de réconfort.

      La principale prétention de Le Chai est de satisfaire les palais qu’on le désir de découverte,
      d’un gout authentique et d’une texture remarquable. Fait avec un mélange d’épices bien choisis et en équilibre.
      Une petite touche piquante qui ne laissera pas tes sens indifférents. Du début à la fin un réconfort dans la bouche!
	  ingrédiant:Thé noir cannelle mouscade cardamome gingenbre anis etoiler clou de girofle piment cayenne sucre.', 18, 200,2,1),
('Dirty Chai', 'C’est la version de Le Chai mélangé avec les délicieux attributs de la caféine.
      La touché caféiné développe des notes plus boisées, grillés et de cacao.
      Pourquoi pas essayer le meilleur de ces deux mondes.Ingrédiants:The noir, cannelle, muscade, cardamome, gingembre, anis etoiler, clou girofle, piment cayenne,cafe,sucre',
	  21, 200, 2, 2),
('Chandail LeChai', 'Chandail Promo', 32, 50, 4, 3);


INSERT INTO couleurs(nom, code_hex)
VALUES
('bleu', '0000FF'),
('jaune', 'FFFF00'),
('bleu', 'FF0000');

INSERT INTO types_preferences_graphique(nom, code_html)
VALUES
('footer','<footer></footer>'),
('titre','<h1></h1>'),
('sous-titre','<h2></h2>');

INSERT INTO preferences_graphiques(nom, id_couleurs, id_types_preferences)
VALUES
('original footer', 1, 1),
('original titre',2,2);

INSERT INTO types_affectation(nom, descriptions, facteur_affectation)
VALUES
('Rabais utilisation uniqueUser', 'Rabais pouvant être utiliser par plusieurs personnes une seule fois', 1),
('Rabais utilisation unique', 'Rabais pouvant être utilisé qu''une seule fois par une seule personne',1),
('taxe', 'Taxe', 0);

INSERT INTO types_valeur(nom, descriptions)
VALUES
('Pourcentage', ' '),
('Montant fixe', ' ');


INSERT INTO affectation_prix(nom, date_debut, date_fin, descriptions, id_types_affectation, id_types_valeur)
VALUES
('tps', '2023-10-01', '2099-12-30', 'Taxes TPS', 3, 1),
('tvq', '2023-10-01', '2099-12-30', 'Taxes TVQ', 3, 1),
('taxe autre', '2023-10-01', '2099-12-30', 'Taxes autre', 3, 1),
('rabais_chandail', '2023-10-01','2023-10-10', 'Rabais chandail', 1,2);


INSERT INTO collaborateurs_reseaux_sociaux(id_collaborateur, id_reseaux_sociaux, liens)
VALUES
(1,1,'https://www.facebook.com/groups/elonmusk1/?locale=fr_CA'),
(2,1,'https://www.facebook.com/EEPMarieCurie/?locale=fr_CA'),
(3,1,'https://www.facebook.com/barackobama/?locale=fr_FR'),
(4,1,'https://www.facebook.com/LoganPaul/?locale=fr_CA');

INSERT INTO collaborateurs_produits(id_collaborateur, id_produit)
VALUES 
(1,1),
(2,3);

INSERT INTO affectation_prix_categorie(id_categorie, id_affectation_prix)
VALUES
(4,4);

INSERT INTO formats_produit_produits(id_produit, id_format_produit)
VALUES
(3, 1),
(3, 2),
(3, 3),
(3, 4),
(3, 5),
(1, 6),
(1, 7),
(1, 8),
(1, 9);

INSERT INTO fournisseurs_produits(id_fournisseur, id_produit)
VALUES
(1,1),
(2,2);

INSERT INTO images_produit_produits(id_produit, id_image_produit)
VALUES
(1,1),
(1,2),
(1,3),
(2,4),
(2,5),
(2,6),
(3,7),
(3,8);

INSERT INTO commandes(numero_facture, date_heure_transaction, code_postal, montant_brut, no_civique_livraison, rue_livraison, id_client, id_etat_commande, id_ville, id_employe)
VALUES
(null, null, null,  null, null, null, 1, 4, null, null),
(null, null, null,null, null, null, 1, 5, null, null),
(null, null, null,null, null, null, 2, 4, null, null),
(null, null, null,null, null, null, 2, 5, null, null),
('1', '2023-10-11', 'J1H4W2',18, 1, 'rue King-O', 1, 1, 1, 1),
('2', '2023-10-11', 'J1H4W2',18, 1, 'rue King-O', 1, 2, 1, 1),
('3', '2023-10-11', 'J1H4W2',18, 1, 'rue King-O', 1, 3, 1, 1),
('4', '2023-10-11', 'J1H4W2',18, 1, 'rue King-O', 1, 6, 1, 1);

INSERT INTO produits_par_commande(id_commande, id_produit, quantite, prix_unitaire)
VALUES
(1, 1, 1, 18),
(1, 2, 1, 21),
(2, 3, 1, 32),
(3, 1, 1, 18),
(4, 3, 1, 32),
(5, 1, 1, 18),
(6, 3, 1, 32),
(7, 2, 2, 42),
(8, 3, 3, 96);

INSERT INTO affectation_prix_produits(id_produit, id_affectation_prix, montant)
VALUES
(1,1, 0.07),
(1,2, 0.08),
(2,1, 0.07),
(2,2, 0.08),
(3,1, 0.07),
(3,2, 0.07),
(3,3, 0.10);

INSERT INTO affectation_prix_lors_commande(id_produit_par_commande, id_affectation_prix, montant)
VALUES
(1,1, 0.07),
(1,2, 0.08),
(2,1, 0.07),
(2,2, 0.08),
(3,1, 0.07),
(3,2, 0.08),
(3,3, 0.10),
(4,1, 0.07),
(4,2, 0.08),
(5,1, 0.07),
(5,2, 0.08),
(5,3, 0.10),
(6,1, 0.07),
(6,2, 0.08),
(7,1, 0.07),
(7,2, 0.08),
(7,3, 0.10),
(8,1, 0.07),
(8,2, 0.08),
(9,1, 0.07),
(9,2, 0.08),
(9,3, 0.10);

INSERT INTO affectation_prix_commandes(id_commande, id_affectation_prix, montant)
VALUES
(5, 4, 5.00);

INSERT INTO format_produit_produits_commande (id_produit_commande, id_format_choisi, format_choisi)
VALUES
(1,6, 'Bleu'); 

INSERT INTO types_medias (nom, descriptions)
VALUES
('image','Image utilisée dans le caroussel'),
('video','Video utilisée dans le caroussel')

INSERT INTO media (nom, liens, id_types_media)
VALUES
('image caroussel accueil 1','carousel1.png',1),
('image caroussel accueil 2','carousel2.png',1),
('image caroussel accueil 3','carousel3.png',1)




