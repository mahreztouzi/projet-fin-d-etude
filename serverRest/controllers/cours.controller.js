const models = require("../models");

//  file systeme des operation sur les fichiers
const fs = require("fs");

// chemin vers les fichiers
const path = require("path");

//  cree un nouveau cours
function createCours(req, res) {
  const cours = {
    namePdf: req.file.filename,
    description: req.body.description,
    title: req.body.title,
    idEnseignant: req.userData.enseignantId,
  };

  models.Cours.create(cours)
    .then((result) => {
      res.status(201).json({
        message: "Cours créé avec succès",
        cours: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la création du cours",
        error: err,
      });
    });
}

//  suppresion d'un cours
function deleteCours(req, res) {
  const coursId = req.params.id;
  const userId = req.userData.enseignantId;
  models.Cours.findOne({ where: { id: coursId, idEnseignant: userId } })
    .then((cours) => {
      if (!cours) {
        return res.status(404).json({
          message: "Cours non trouvé",
        });
      }

      const filePath = path.join(__dirname, "../uploads", cours.namePdf);

      // Supprimer le fichier du dossier d'upload
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Erreur lors de la suppression du fichier :", err);
        }
      });

      // Supprimer le cours de la base de données
      cours
        .destroy()
        .then(() => {
          res.status(200).json({
            message: "Cours supprimé avec succès",
          });
        })
        .catch((err) => {
          res.status(500).json({
            message:
              "Une erreur s'est produite lors de la suppression du cours",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la recherche du cours",
        error: err,
      });
    });
}

//  faire la mise a jour d'un cours ou les informations du cours
function updateCours(req, res) {
  const id = req.params.id;
  const userId = req.userData.enseignantId;
  console.log("userData", req.userData);

  const updatedValue = {
    description: req.body.description,
    title: req.body.title,
  };

  // Vérifier s'il y a un nouveau fichier PDF téléchargé
  if (req.file) {
    const filePath = path.join(__dirname, "../uploads", req.file.filename);
    updatedValue.namePdf = req.file.filename;
    //
    // Vérifier si le cours existe et s'il a déjà un fichier PDF
    models.Cours.findOne({ where: { id: id, idEnseignant: userId } })
      .then((cours) => {
        if (cours) {
          // S'il y a déjà un fichier PDF, supprimer l'ancien fichier
          if (cours.namePdf) {
            const oldFilePath = path.join(
              __dirname,
              "../uploads",
              cours.namePdf
            );
            fs.unlink(oldFilePath, (err) => {
              if (err) {
                console.error(
                  "Erreur lors de la suppression de l'ancien fichier PDF :",
                  err
                );
              }
            });
          }
        }

        // Mettre à jour les informations du cours
        models.Cours.update(updatedValue, {
          where: { id: id, idEnseignant: userId },
        })
          .then((result) => {
            if (result == 1) {
              res.status(200).json({
                message: "Cours mis à jour avec succès",
                cours: updatedValue,
              });
            } else {
              res.status(404).json({ message: "Cours non trouvé" });
            }
          })
          .catch((err) => {
            res.status(500).json({
              message:
                "Une erreur s'est produite lors de la mise à jour du cours",
              error: err,
            });
          });
      })
      .catch((err) => {
        console.error(
          "Une erreur s'est produite lors de la recherche du cours :",
          err
        );
        res.status(500).json({
          message: "Une erreur s'est produite lors de la mise à jour du cours",
          error: err,
        });
      });
  } else {
    // Mettre à jour les informations du cours sans changer le fichier PDF
    models.Cours.update(updatedValue, {
      where: { id: id, enseignantId: userId },
    })
      .then((result) => {
        if (result == 1) {
          res.status(200).json({
            message: "Cours mis à jour avec succès",
            cours: updatedValue,
          });
        } else {
          res.status(404).json({ message: "Cours non trouvé" });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Une erreur s'est produite lors de la mise à jour du cours",
          error: err,
        });
      });
  }
}

// recuperer tout les cours
function getAllCours(req, res) {
  models.Cours.findAll({
    include: models.Enseignant, // Inclure le modèle Sequelize de l'enseignant
  })
    .then((cours) => {
      res.status(200).json(cours);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la récupération des cours",
        error: err.message, // Utilisation de err.message pour obtenir le message d'erreur spécifique
      });
    });
}

//  tester sur l'existance d'un cours avant de faire la mise a jour
function TestUploadUpdate(req, res, next) {
  const id = req.params.id;
  const userId = req.userData.enseignantId;

  models.Cours.findOne({ where: { id: id, idEnseignant: userId } })
    .then((cours) => {
      if (!cours) {
        return res.status(404).json({ message: "Cours non trouvé" });
      } else {
        // Votre logique de téléchargement du fichier PDF ici
        // Vous pouvez utiliser req.file pour accéder au fichier téléchargé

        next(); // Appeler la fonction suivante dans le flux de la requête
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Une erreur s'est produite lors de la vérification du cours",
        error: err,
      });
    });
}
module.exports = {
  createCours: createCours,
  deleteCours: deleteCours,
  updateCours: updateCours,
  TestUploadUpdate: TestUploadUpdate,
  getAllCours: getAllCours,
};
