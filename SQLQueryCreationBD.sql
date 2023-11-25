use master
GO
DROP DATABASE leChai

CREATE DATABASE leChai;
GO
use leChai;


/*** CREATE TABLE ***/

CREATE TABLE clients
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	prenom VARCHAR(32) NOT NULL,
	date_naissance DATE NOT NULL,
	adresse_courriel VARCHAR(32) NOT NULL,
	mdp VARBINARY(MAX) NOT NULL,
	token VARCHAR(10) NOT NULL,
	sel VARBINARY(MAX) NOT NULL,
	actif BIT NOT NULL,
	expiration_token DATETIME NULL
);

CREATE TABLE provinces
(	
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL
);

CREATE TABLE villes
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	id_province INT NOT NULL
);

CREATE TABLE employes
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	prenom VARCHAR(32) NOT NULL,
	date_naissance DATE NOT NULL,
	adresse_courriel VARCHAR(32) NOT NULL,
	mdp VARBINARY(MAX) NOT NULL,
	token VARCHAR(10) NOT NULL,
	sel VARBINARY(MAX) NOT NULL,
	actif BIT NOT NULL,
	expiration_token DATETIME NULL
);

CREATE TABLE etats_commandes
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	descriptions TEXT NOT NULL
);

CREATE TABLE types_valeur
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	descriptions TEXT NOT NULL
);

CREATE TABLE types_affectation
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	descriptions TEXT NOT NULL,
	facteur_affectation BIT NOT NULL
);

CREATE TABLE types_preferences_graphique
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	code_html VARCHAR(32) NOT NULL,
);

CREATE TABLE [dbo].[couleurs](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[nom] [varchar](32) NOT NULL,
	[code_hex] [varchar](32) NOT NULL,
	[description] [varchar](max) NULL,
 CONSTRAINT [PK_couleurs] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[couleurs] ON 
GO
INSERT [dbo].[couleurs] ([id], [nom], [code_hex], [description]) VALUES (1, N'CouleurNav', N'#680075', N'définie la couleur de la barre de navigation du haut du site web')
GO
INSERT [dbo].[couleurs] ([id], [nom], [code_hex], [description]) VALUES (2, N'CouleurBordures', N'#ffe649', N'Couleur des bordure coté client et admin')
GO
INSERT [dbo].[couleurs] ([id], [nom], [code_hex], [description]) VALUES (3, N'CouleurBoutonForm', N'#ffffff', N'Couleur de fond des boutons dans les formulaires ')
GO
INSERT [dbo].[couleurs] ([id], [nom], [code_hex], [description]) VALUES (4, N'CouleurBackFiltreUpdate', N'#f1eff1', N'Couleur de fond des champs de modification du tableau et des filtres. Est aussi le fond de formulaire de mot de passe oublier.')
GO
INSERT [dbo].[couleurs] ([id], [nom], [code_hex], [description]) VALUES (5, N'CouleurFooter', N'#74ac0c', N'détermine qu''elle couleur sera appliquer au footer qui est la parti inférieur du site web')
GO
INSERT [dbo].[couleurs] ([id], [nom], [code_hex], [description]) VALUES (6, N'CouleurBackForm', N'#fffaea', N'Couleur de fond des formulaires sur le site admin et client')
GO
INSERT [dbo].[couleurs] ([id], [nom], [code_hex], [description]) VALUES (7, N'CouleurBoutonAdmin', N'#fffaea', N'Couleur de fond des boutons du site admin')
GO
INSERT [dbo].[couleurs] ([id], [nom], [code_hex], [description]) VALUES (8, N'CouleurSelectionMenu', N'#ffe649', N'Couleur de la ligne qui apparait sous le menu dans le site client et couleur du nom du contrôleur quand il est sélectionné.')
GO
INSERT [dbo].[couleurs] ([id], [nom], [code_hex], [description]) VALUES (9, N'CouleurTableauAdmin', N'#ffffff', N'Couleur que tout les ligne aurons dans le tableau de chaque contrôlleurs')
GO
INSERT [dbo].[couleurs] ([id], [nom], [code_hex], [description]) VALUES (10, N'CouleurEnteteTableauAdmin', N'#fffaea', N'Couleur de l''en-tête du tableau de controlleurs en admin')
GO
SET IDENTITY_INSERT [dbo].[couleurs] OFF
GO

CREATE TABLE preferences_graphiques
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	id_couleurs INT NOT NULL,
	id_types_preferences INT NOT NULL
);

CREATE TABLE types_medias
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	descriptions TEXT NOT NULL,
);

CREATE TABLE media
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	liens TEXT NOT NULL,
	id_types_media INT NOT NULL
);

CREATE TABLE reseaux_sociaux
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL
);

CREATE TABLE compagnies
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	telephone VARCHAR(16) NOT NULL,
	adresse_courriel VARCHAR(32) NOT NULL,
	contact VARCHAR(32) NOT NULL
);

CREATE TABLE collaborateurs
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	prenom VARCHAR(32) NOT NULL,
	telephone VARCHAR(16) NOT NULL,
	adresse_courriel VARCHAR(32) NOT NULL,
	images VARCHAR(32) NULL,
	descriptions TEXT NULL,
	id_compagnie INT NOT NULL
);

CREATE TABLE etats_produit
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	descriptions TEXT NOT NULL,
);

CREATE TABLE categories
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	descriptions TEXT NOT NULL,
	id_categorie_mere INT NULL
);


CREATE TABLE types_format_produit
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	descriptions TEXT NOT NULL
);

CREATE TABLE formats_produit
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	descriptions TEXT NOT NULL,
	id_type_format_produit INT NOT NULL
);


CREATE TABLE fournisseurs
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	telephone VARCHAR(16) NOT NULL,
	adresse_courriel VARCHAR(32) NOT NULL,
	contact VARCHAR(32) NOT NULL
);

CREATE TABLE images_produit
(
	id INT IDENTITY(1,1),
	url TEXT NOT NULL,
	descriptions TEXT NOT NULL,
);

CREATE TABLE affectation_prix
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	date_debut DATE NOT NULL,
	date_fin DATE NOT NULL,
	descriptions TEXT NOT NULL,
	id_types_valeur INT NOT NULL,
	id_types_affectation INT NOT NULL
);

CREATE TABLE produits
(
	id INT IDENTITY(1,1),
	nom VARCHAR(32) NOT NULL,
	descriptions TEXT NOT NULL,
	ingrediants TEXT NULL,
	prix FLOAT NOT NULL,
	quantite_inventaire INT NOT NULL,
	id_categorie INT NOT NULL,
	id_etat_produit INT NOT NULL
);

CREATE TABLE commandes
(
	id INT IDENTITY(1,1),
	numero_facture VARCHAR(32) NULL,
	date_heure_transaction DATE NULL,
	montant_brut FLOAT NULL,
	no_civique_livraison INT NULL,
	rue_livraison VARCHAR(32) NULL,
	code_postal VARCHAR(32) NULL,
	id_client INT NOT NULL,
	id_etat_commande INT NOT NULL,
	id_ville INT NULL,
	id_employe INT NULL
);

CREATE TABLE produits_par_commande
(
	id INT IDENTITY(1,1),
	id_produit INT NOT NULL,
	id_commande INT NOT NULL,
	quantite INT NOT NULL,
	prix_unitaire FLOAT NOT NULL
);

CREATE TABLE affectation_prix_lors_commande
(
	id_produit_par_commande INT NOT NULL,
	id_affectation_prix INT NOT NULL,
	montant FLOAT NOT NULL
);

CREATE TABLE affectation_prix_produits
(
	id_produit INT NOT NULL,
	id_affectation_prix INT NOT NULL,
	montant FLOAT NOT NULL
);

CREATE TABLE affectation_prix_commandes
(
	id_commande INT NOT NULL,
	id_affectation_prix INT NOT NULL,
	montant FLOAT NOT NULL
);

CREATE TABLE affectation_prix_categorie
(
	id_categorie INT NOT NULL,
	id_affectation_prix INT NOT NULL
);

CREATE TABLE collaborateurs_reseaux_sociaux
(
	id_collaborateur INT NOT NULL,
	id_reseaux_sociaux INT NOT NULL,
	liens TEXT NOT NULL
);

CREATE TABLE collaborateurs_produits
(
	id_collaborateur INT NOT NULL,
	id_produit INT NOT NULL,
);

CREATE TABLE formats_produit_produits
(
	id_format_produit INT NOT NULL,
	id_produit INT NOT NULL,
);

CREATE TABLE fournisseurs_produits
(
	id_fournisseur INT NOT NULL,
	id_produit INT NOT NULL,
);

CREATE TABLE images_produit_produits
(
	id_image_produit INT NOT NULL,
	id_produit INT NOT NULL,
);

CREATE TABLE format_produit_produits_commande
(
	id_format_choisi INT NOT NULL,
	id_produit_commande INT NOT NULL,
	format_choisi VARCHAR(32) NULL,
	type_format VARCHAR(32) NULL
);



/*** AJOUT DE PRIMARY KEY ***/
ALTER TABLE provinces ADD CONSTRAINT PK_provinces PRIMARY KEY(id)
ALTER TABLE villes ADD CONSTRAINT PK_villes PRIMARY KEY(id)
ALTER TABLE clients ADD CONSTRAINT PK_clients PRIMARY KEY(id)
ALTER TABLE employes ADD CONSTRAINT PK_employes PRIMARY KEY(id)
ALTER TABLE commandes ADD CONSTRAINT PK_commandes PRIMARY KEY(id)
ALTER TABLE etats_commandes ADD CONSTRAINT PK_etats_commandes PRIMARY KEY(id)
ALTER TABLE types_valeur ADD CONSTRAINT PK_types_valeur PRIMARY KEY(id)
ALTER TABLE affectation_prix ADD CONSTRAINT PK_affectation_prix PRIMARY KEY(id)
ALTER TABLE types_affectation ADD CONSTRAINT PK_types_affectation PRIMARY KEY(id)
ALTER TABLE compagnies ADD CONSTRAINT PK_comapgnies PRIMARY KEY(id)
ALTER TABLE reseaux_sociaux ADD CONSTRAINT PK_reseaux_sociaux PRIMARY KEY(id)
ALTER TABLE collaborateurs ADD CONSTRAINT PK_collaborateurs PRIMARY KEY(id)
ALTER TABLE etats_produit ADD CONSTRAINT PK_etats_produit PRIMARY KEY(id)
ALTER TABLE categories ADD CONSTRAINT PK_categories PRIMARY KEY(id)
ALTER TABLE produits ADD CONSTRAINT PK_produits PRIMARY KEY(id)
ALTER TABLE images_produit ADD CONSTRAINT PK_images_produit PRIMARY KEY(id)
ALTER TABLE fournisseurs ADD CONSTRAINT PK_fournisseurs PRIMARY KEY(id)
ALTER TABLE formats_produit ADD CONSTRAINT PK_formats_produit PRIMARY KEY(id)
ALTER TABLE types_format_produit ADD CONSTRAINT PK_types_format_produit PRIMARY KEY(id)
ALTER TABLE types_preferences_graphique ADD CONSTRAINT PK_types_preferences_graphique PRIMARY KEY(id)
ALTER TABLE preferences_graphiques ADD CONSTRAINT PK_preferences_graphiques PRIMARY KEY(id)

ALTER TABLE media ADD CONSTRAINT PK_media PRIMARY KEY(id)
ALTER TABLE types_medias ADD CONSTRAINT PK_types_medias PRIMARY KEY(id)


ALTER TABLE affectation_prix_commandes ADD CONSTRAINT PK_affectation_prix_commandes PRIMARY KEY (id_commande, id_affectation_prix);
ALTER TABLE affectation_prix_lors_commande ADD CONSTRAINT PK_affectation_prix_lors_commande PRIMARY KEY (id_produit_par_commande, id_affectation_prix);
ALTER TABLE affectation_prix_produits ADD CONSTRAINT PK_affectation_prix_produits PRIMARY KEY (id_produit, id_affectation_prix);
ALTER TABLE produits_par_commande ADD CONSTRAINT PK_produits_par_commande PRIMARY KEY (id);
ALTER TABLE collaborateurs_reseaux_sociaux ADD CONSTRAINT PK_collaborateur_reseaux_sociaux PRIMARY KEY (id_collaborateur, id_reseaux_sociaux);
ALTER TABLE collaborateurs_produits ADD CONSTRAINT PK_collaborateur_produits PRIMARY KEY (id_collaborateur, id_produit);
ALTER TABLE affectation_prix_categorie ADD CONSTRAINT PK_affectation_prix_categorie PRIMARY KEY (id_affectation_prix, id_categorie);
ALTER TABLE formats_produit_produits ADD CONSTRAINT PK_formats_produit_produits PRIMARY KEY (id_format_produit, id_produit);
ALTER TABLE fournisseurs_produits ADD CONSTRAINT PK_fournisseurs_produits PRIMARY KEY (id_fournisseur, id_produit);
ALTER TABLE images_produit_produits ADD CONSTRAINT PK_images_produit_produits PRIMARY KEY (id_image_produit, id_produit);
ALTER TABLE format_produit_produits_commande ADD CONSTRAINT PK_format_produit_produits_commande PRIMARY KEY (id_format_choisi, id_produit_commande);


/*** AJOUT DES FOREIGN KEYS ***/

ALTER TABLE villes ADD CONSTRAINT FK_villes_provinces FOREIGN KEY (id_province) REFERENCES provinces (id);

ALTER TABLE commandes ADD CONSTRAINT FK_commandes_villes FOREIGN KEY (id_ville) REFERENCES villes (id);
ALTER TABLE commandes ADD CONSTRAINT FK_commandes_clients FOREIGN KEY (id_client) REFERENCES clients (id);
ALTER TABLE commandes ADD CONSTRAINT FK_commandes_employes FOREIGN KEY (id_employe) REFERENCES employes (id);
ALTER TABLE commandes ADD CONSTRAINT FK_commandes_etats_commandes FOREIGN KEY (id_etat_commande) REFERENCES etats_commandes (id);

ALTER TABLE produits_par_commande ADD CONSTRAINT FK_produits_par_commande_commandes FOREIGN KEY (id_commande) REFERENCES commandes (id);
ALTER TABLE produits_par_commande ADD CONSTRAINT FK_produits_par_commande_produits FOREIGN KEY (id_produit) REFERENCES produits (id);

ALTER TABLE affectation_prix_lors_commande ADD CONSTRAINT FK_affectation_prix_lors_commande_produits_par_commande FOREIGN KEY (id_produit_par_commande) REFERENCES produits_par_commande (id);
ALTER TABLE affectation_prix_lors_commande ADD CONSTRAINT FK_affectation_prix_lors_commande_affectation_prix FOREIGN KEY (id_affectation_prix) REFERENCES affectation_prix (id);

ALTER TABLE affectation_prix_commandes ADD CONSTRAINT FK_affectation_prix_commandes_commandes FOREIGN KEY (id_commande) REFERENCES commandes (id);
ALTER TABLE affectation_prix_commandes ADD CONSTRAINT FK_affectation_prix_commandes_affectation_prix FOREIGN KEY (id_affectation_prix) REFERENCES affectation_prix (id);

ALTER TABLE affectation_prix_produits ADD CONSTRAINT FK_affectation_prix_produits_produits FOREIGN KEY (id_produit) REFERENCES produits (id);
ALTER TABLE affectation_prix_produits ADD CONSTRAINT FK_affectation_prix_produits_affectation_commande FOREIGN KEY (id_affectation_prix) REFERENCES affectation_prix (id);

ALTER TABLE affectation_prix_categorie ADD CONSTRAINT FK_affectation_prix_categorie_categories FOREIGN KEY (id_categorie) REFERENCES categories (id);
ALTER TABLE affectation_prix_categorie ADD CONSTRAINT FK_affectation_prix_categorie_affectation_prix FOREIGN KEY (id_affectation_prix) REFERENCES affectation_prix (id);

ALTER TABLE affectation_prix ADD CONSTRAINT FK_affectation_prix_types_valeur FOREIGN KEY (id_types_valeur) REFERENCES types_valeur (id);
ALTER TABLE affectation_prix ADD CONSTRAINT FK_affectation_prix_types_affectation FOREIGN KEY (id_types_affectation) REFERENCES types_affectation (id);

ALTER TABLE preferences_graphiques ADD CONSTRAINT FK_preferences_graphiques_types_preferences_graphiques FOREIGN KEY (id_types_preferences) REFERENCES types_preferences_graphique (id);
ALTER TABLE preferences_graphiques ADD CONSTRAINT FK_preferences_graphiques_couleurs FOREIGN KEY (id_couleurs) REFERENCES couleurs (id);

ALTER TABLE media ADD CONSTRAINT FK_medias_types_media FOREIGN KEY (id_types_media) REFERENCES types_medias (id);

ALTER TABLE categories ADD CONSTRAINT FK_categories_sous_categories FOREIGN KEY (id_categorie_mere) REFERENCES categories (id);

ALTER TABLE collaborateurs_reseaux_sociaux ADD CONSTRAINT FK_collaborateurs_reseaux_sociaux_collaborateurs FOREIGN KEY (id_collaborateur) REFERENCES collaborateurs (id);
ALTER TABLE collaborateurs_reseaux_sociaux ADD CONSTRAINT FK_collaborateurs_reseaux_sociaux_reseaux_sociaux FOREIGN KEY (id_reseaux_sociaux) REFERENCES reseaux_sociaux (id);

ALTER TABLE collaborateurs ADD CONSTRAINT FK_collaborateurs_compagnies FOREIGN KEY (id_compagnie) REFERENCES compagnies (id);

ALTER TABLE collaborateurs_produits ADD CONSTRAINT FK_collaborateurs_produits_collaborateurs FOREIGN KEY (id_collaborateur) REFERENCES collaborateurs (id);
ALTER TABLE collaborateurs_produits ADD CONSTRAINT FK_collaborateurs_produits_produits FOREIGN KEY (id_produit) REFERENCES produits (id);

ALTER TABLE produits ADD CONSTRAINT FK_produits_categories FOREIGN KEY (id_categorie) REFERENCES categories (id);
ALTER TABLE produits ADD CONSTRAINT FK_produits_etats_produit FOREIGN KEY (id_etat_produit) REFERENCES etats_produit (id);

ALTER TABLE images_produit_produits ADD CONSTRAINT FK_images_produit_produits_images_produit FOREIGN KEY (id_image_produit) REFERENCES images_produit (id);
ALTER TABLE images_produit_produits ADD CONSTRAINT FK_images_produit_produits_produits FOREIGN KEY (id_produit) REFERENCES produits (id);

ALTER TABLE format_produit_produits_commande ADD CONSTRAINT FK_format_produit_produits_commande_produits_par_commande FOREIGN KEY (id_produit_commande) REFERENCES produits_par_commande (id);
ALTER TABLE format_produit_produits_commande ADD CONSTRAINT FK_format_produit_produits_commande_produits FOREIGN KEY (id_format_choisi) REFERENCES formats_produit (id);

ALTER TABLE fournisseurs_produits ADD CONSTRAINT FK_fournisseurs_produits_produits FOREIGN KEY (id_produit) REFERENCES produits (id);
ALTER TABLE fournisseurs_produits ADD CONSTRAINT FK_fournisseurs_produits_fournisseurs FOREIGN KEY (id_fournisseur) REFERENCES fournisseurs (id);

ALTER TABLE formats_produit_produits ADD CONSTRAINT FK_formats_produit_produits_produits FOREIGN KEY (id_produit) REFERENCES produits (id);
ALTER TABLE formats_produit_produits ADD CONSTRAINT FK_formats_produit_produits_formats_produit FOREIGN KEY (id_format_produit) REFERENCES formats_produit (id);

ALTER TABLE formats_produit ADD CONSTRAINT FK_formats_produit_types_format_produit FOREIGN KEY (id_type_format_produit) REFERENCES types_format_produit (id);
