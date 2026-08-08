"use client"
import { useState } from "react"

const filieres = [
  { nom: "Informatique", categorie: "Sciences et Ingenierie", series: "S1, S2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Developpeur, administrateur systemes, data analyst", salaire: "150 000 - 700 000 FCFA/mois" },
  { nom: "Mathematiques - Physique - Informatique (MPI)", categorie: "Sciences et Ingenierie", series: "S1, S2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Ingenieur, enseignant, chercheur, data scientist", salaire: "150 000 - 600 000 FCFA/mois" },
  { nom: "Mathematiques appliquees et informatique", categorie: "Sciences et Ingenierie", series: "S1, S2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Data scientist, actuaire, ingenieur logiciel", salaire: "200 000 - 700 000 FCFA/mois" },
  { nom: "Physique - Chimie (PC)", categorie: "Sciences et Ingenierie", series: "S1, S2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Enseignant, chercheur, technicien de laboratoire", salaire: "120 000 - 400 000 FCFA/mois" },
  { nom: "Physique - Chimie - Sciences de la matiere (PCSM)", categorie: "Sciences et Ingenierie", series: "S1, S2, S3", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Chercheur, enseignant, ingenieur materiaux", salaire: "150 000 - 550 000 FCFA/mois" },
  { nom: "Chimie", categorie: "Sciences et Ingenierie", series: "S1, S2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Ingenieur chimiste, technicien de laboratoire", salaire: "150 000 - 500 000 FCFA/mois" },
  { nom: "Geologie", categorie: "Sciences et Ingenierie", series: "S1, S2, S3", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Geologue minier, petrolier, environnemental", salaire: "200 000 - 800 000 FCFA/mois" },
  { nom: "Energies renouvelables", categorie: "Sciences et Ingenierie", series: "S1, S2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Ingenieur solaire, technicien energie verte", salaire: "180 000 - 600 000 FCFA/mois" },
  { nom: "Telecommunications et Electronique", categorie: "Sciences et Ingenierie", series: "S1, S2, T", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Ingenieur telecoms, technicien reseaux", salaire: "180 000 - 700 000 FCFA/mois" },
  { nom: "Developpement web et applications", categorie: "Sciences et Ingenierie", series: "S1, S2", niveau: "Licence professionnelle", debouches: "Developpeur web, developpeur mobile", salaire: "180 000 - 700 000 FCFA/mois" },

  { nom: "Medecine", categorie: "Sante", series: "S1, S2", niveau: "Doctorat (7 ans)", debouches: "Medecin generaliste ou specialiste", salaire: "300 000 - 1 500 000 FCFA/mois" },
  { nom: "Pharmacie", categorie: "Sante", series: "S1, S2", niveau: "Doctorat (6 ans)", debouches: "Pharmacien d'officine, industriel, hospitalier", salaire: "300 000 - 1 200 000 FCFA/mois" },
  { nom: "Odontostomatologie", categorie: "Sante", series: "S1, S2", niveau: "Doctorat (6 ans)", debouches: "Chirurgien-dentiste", salaire: "300 000 - 1 200 000 FCFA/mois" },
  { nom: "Sciences infirmieres et paramedicales", categorie: "Sante", series: "S1, S2, S3", niveau: "Licence (LMD)", debouches: "Infirmier, sage-femme, technicien de sante", salaire: "120 000 - 400 000 FCFA/mois" },
  { nom: "Biologie", categorie: "Sante", series: "S1, S2, S3", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Biologiste, chercheur, technicien de laboratoire, enseignant", salaire: "150 000 - 500 000 FCFA/mois" },
  { nom: "Biologie - Chimie - Geosciences (BCG)", categorie: "Sante", series: "S1, S2, S3", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Chercheur, enseignant, technicien de laboratoire", salaire: "150 000 - 500 000 FCFA/mois" },

  { nom: "Agronomie", categorie: "Agriculture et Environnement", series: "S1, S2, S3", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Ingenieur agronome, conseiller agricole", salaire: "150 000 - 600 000 FCFA/mois" },
  { nom: "Agrobusiness et Entrepreneuriat", categorie: "Agriculture et Environnement", series: "S1, S2, S3, G", niveau: "Licence - Master (LMD)", debouches: "Entrepreneur agricole, chef d'exploitation", salaire: "150 000 - 700 000 FCFA/mois" },
  { nom: "Aquaculture", categorie: "Agriculture et Environnement", series: "S1, S2, S3", niveau: "Licence - Master (LMD)", debouches: "Technicien aquacole, gestionnaire de ferme piscicole", salaire: "130 000 - 450 000 FCFA/mois" },
  { nom: "Sciences de la Terre et Environnement", categorie: "Agriculture et Environnement", series: "S1, S2, S3", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Ingenieur environnement, consultant ecologique", salaire: "180 000 - 600 000 FCFA/mois" },
  { nom: "Technologies agro-alimentaires", categorie: "Agriculture et Environnement", series: "S1, S2, S3", niveau: "Licence - Master (LMD)", debouches: "Ingenieur agroalimentaire, controleur qualite", salaire: "150 000 - 550 000 FCFA/mois" },

  { nom: "Droit", categorie: "Economie Gestion et Droit", series: "L1, L2, S1, S2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Avocat, magistrat, juriste d'entreprise", salaire: "150 000 - 800 000 FCFA/mois" },
  { nom: "Sciences politiques", categorie: "Economie Gestion et Droit", series: "L1, L2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Diplomate, analyste politique", salaire: "200 000 - 700 000 FCFA/mois" },
  { nom: "Economie", categorie: "Economie Gestion et Droit", series: "S1, S2, G, L1", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Economiste, analyste financier, conseiller", salaire: "180 000 - 700 000 FCFA/mois" },
  { nom: "FASEG - Sciences Economiques et de Gestion", categorie: "Economie Gestion et Droit", series: "S1, S2, G, L1", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Economiste, gestionnaire, comptable, analyste financier, cadre bancaire", salaire: "180 000 - 700 000 FCFA/mois" },
  { nom: "Gestion des entreprises", categorie: "Economie Gestion et Droit", series: "G, S1, S2", niveau: "Licence - Master (LMD)", debouches: "Manager, chef de projet, entrepreneur", salaire: "150 000 - 700 000 FCFA/mois" },
  { nom: "Banque et Finance", categorie: "Economie Gestion et Droit", series: "G, S1, S2", niveau: "Licence - Master (LMD)", debouches: "Analyste financier, conseiller bancaire", salaire: "200 000 - 900 000 FCFA/mois" },
  { nom: "Administration Economique et Sociale (AES)", categorie: "Economie Gestion et Droit", series: "L1, L2, G", niveau: "Licence - Master (LMD)", debouches: "Cadre administratif, fonctionnaire", salaire: "150 000 - 500 000 FCFA/mois" },
  { nom: "Management du tourisme et de l'hotellerie", categorie: "Economie Gestion et Droit", series: "G, L1, L2", niveau: "Licence - Master (LMD)", debouches: "Manager d'hotel, agent de voyage", salaire: "130 000 - 500 000 FCFA/mois" },
  { nom: "Statistiques et actuariat", categorie: "Economie Gestion et Droit", series: "S1, S2", niveau: "Licence - Master (LMD)", debouches: "Statisticien, actuaire, data analyst", salaire: "250 000 - 900 000 FCFA/mois" },

  { nom: "Lettres modernes", categorie: "Lettres et Sciences humaines", series: "L1, L2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Professeur de francais, journaliste, ecrivain", salaire: "120 000 - 400 000 FCFA/mois" },
  { nom: "Anglais", categorie: "Lettres et Sciences humaines", series: "L1, L2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Professeur d'anglais, traducteur, interprete", salaire: "120 000 - 450 000 FCFA/mois" },
  { nom: "Espagnol", categorie: "Lettres et Sciences humaines", series: "L1, L2", niveau: "Licence - Master (LMD)", debouches: "Professeur, traducteur", salaire: "120 000 - 400 000 FCFA/mois" },
  { nom: "Arabe", categorie: "Lettres et Sciences humaines", series: "L1, L2", niveau: "Licence - Master (LMD)", debouches: "Professeur, traducteur, diplomate", salaire: "120 000 - 450 000 FCFA/mois" },
  { nom: "Langues Etrangeres Appliquees (LEA)", categorie: "Lettres et Sciences humaines", series: "L1, L2", niveau: "Licence - Master (LMD)", debouches: "Traducteur, charge de commerce international", salaire: "150 000 - 500 000 FCFA/mois" },
  { nom: "Histoire", categorie: "Lettres et Sciences humaines", series: "L1, L2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Professeur d'histoire, chercheur, archiviste", salaire: "120 000 - 400 000 FCFA/mois" },
  { nom: "Geographie", categorie: "Lettres et Sciences humaines", series: "L1, L2, S1, S2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Professeur, urbaniste, cartographe", salaire: "130 000 - 450 000 FCFA/mois" },
  { nom: "Philosophie", categorie: "Lettres et Sciences humaines", series: "L1, L2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Professeur de philosophie, chercheur", salaire: "120 000 - 400 000 FCFA/mois" },
  { nom: "Sociologie", categorie: "Lettres et Sciences humaines", series: "L1, L2", niveau: "Licence - Master - Doctorat (LMD)", debouches: "Sociologue, charge d'etudes, travailleur social", salaire: "150 000 - 500 000 FCFA/mois" },

  { nom: "Communication", categorie: "Arts et Communication", series: "L1, L2, G", niveau: "Licence - Master (LMD)", debouches: "Charge de communication, journaliste, RP", salaire: "150 000 - 600 000 FCFA/mois" },
  { nom: "Communication digitale", categorie: "Arts et Communication", series: "L1, L2, G, S1, S2", niveau: "Licence - Master (LMD)", debouches: "Community manager, specialiste marketing digital", salaire: "150 000 - 600 000 FCFA/mois" },
  { nom: "Infographie", categorie: "Arts et Communication", series: "ARTS, L1, L2", niveau: "Licence professionnelle", debouches: "Infographiste, designer graphique", salaire: "130 000 - 500 000 FCFA/mois" },
  { nom: "Arts graphiques et numeriques", categorie: "Arts et Communication", series: "ARTS", niveau: "Licence - Master (LMD)", debouches: "Designer, illustrateur, animateur 3D", salaire: "130 000 - 550 000 FCFA/mois" },

  { nom: "Professeurs de college (PCEM)", categorie: "Enseignement", series: "S1, S2, L1, L2", niveau: "Licence - Master (LMD) plus Concours", debouches: "Professeur de college toutes matieres", salaire: "150 000 - 400 000 FCFA/mois" },
  { nom: "Sciences des activites physiques et sportives (STAPS)", categorie: "Enseignement", series: "S1, S2, L1, L2", niveau: "Licence - Master (LMD)", debouches: "Professeur d'EPS, entraineur sportif", salaire: "130 000 - 400 000 FCFA/mois" },
]

const categories = ["Sciences et Ingenierie", "Sante", "Agriculture et Environnement", "Economie Gestion et Droit", "Lettres et Sciences humaines", "Arts et Communication", "Enseignement"]

export default function Filieres() {
  const [filtre, setFiltre] = useState("Toutes")

  const filtrees = filtre === "Toutes" ? filieres : filieres.filter(function (f) {
    return f.categorie === filtre
  })

  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white border-b px-8 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-extrabold text-blue-900">Orientation Senegal</a>
        <nav className="space-x-6 text-sm font-medium text-gray-700">
          <a href="/filieres" className="hover:text-blue-900">Filieres</a>
          <a href="/universites" className="hover:text-blue-900">Universites</a>
          <a href="/conseils" className="hover:text-blue-900">Conseils</a>
          <a href="/test" className="bg-blue-900 text-white px-5 py-2 rounded-full">test</a>
        </nav>
      </header>

      <section className="py-16 px-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Toutes les filieres</h1>
        <p className="text-gray-500 mb-8">Systeme LMD (Licence - Master - Doctorat)</p>

        <div className="flex flex-wrap gap-2 mb-10">
          <button
            onClick={function () { setFiltre("Toutes") }}
            className={filtre === "Toutes" ? "px-4 py-2 rounded-full text-sm bg-blue-900 text-white" : "px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-700"}
          >
            Toutes
          </button>
          {categories.map(function (cat) {
            const active = filtre === cat
            const style = active ? "px-4 py-2 rounded-full text-sm bg-blue-900 text-white" : "px-4 py-2 rounded-full text-sm bg-gray-100 text-gray-700"
            return (
              <button key={cat} onClick={function () { setFiltre(cat) }} className={style}>
                {cat}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrees.map(function (f) {
            return (
              <div key={f.nom} className="border rounded-2xl p-6 flex flex-col">
                <span className="text-xs bg-blue-100 text-blue-900 px-3 py-1 rounded-full self-start mb-3">
                  {f.categorie}
                </span>
                <h3 className="font-bold text-lg mb-2">{f.nom}</h3>
                <div className="text-sm text-gray-500 mb-2">Series: {f.series}</div>
                <div className="text-sm text-gray-600 mb-2">Niveau: {f.niveau}</div>
                <div className="text-sm text-gray-600 mb-3 flex-1">Debouches: {f.debouches}</div>
                <div className="text-sm font-semibold text-blue-900 pt-3 border-t">{f.salaire}</div>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}