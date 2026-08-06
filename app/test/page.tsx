"use client"
import { useState } from "react"

export default function Test() {
  const [step, setStep] = useState("accueil")
  const [bacSerie, setBacSerie] = useState("")

  const [noteMath, setNoteMath] = useState("")
  const [notePC, setNotePC] = useState("")
  const [noteSvt, setNoteSvt] = useState("")

  const [noteFrancais, setNoteFrancais] = useState("")
  const [notePhilo, setNotePhilo] = useState("")
  const [noteAnglais, setNoteAnglais] = useState("")
  const [noteHistGeo, setNoteHistGeo] = useState("")

  const [moyenneBac, setMoyenneBac] = useState("")

  const [resultat, setResultat] = useState(null)

  const estScientifique = bacSerie === "S1" || bacSerie === "S2" || bacSerie === "S3"
  const estLitteraire = bacSerie === "L1" || bacSerie === "L2"
  const estGestion = bacSerie === "G"
  const estTechnique = bacSerie === "T"

  function choisirSerie(s) {
    setBacSerie(s)
    if (s === "S1" || s === "S2" || s === "S3") setStep("notesSciences")
    else if (s === "L1" || s === "L2") setStep("notesLettres")
    else setStep("moyenne")
  }

  function calculerMention(moyenne) {
    if (moyenne < 9.5) return "Insuffisant"
    if (moyenne < 12) return "Passable"
    if (moyenne < 14) return "Assez Bien"
    if (moyenne < 16) return "Bien"
    if (moyenne < 18) return "Tres Bien"
    return "Excellent"
  }

  function ajouterSansDoublon(liste, valeur) {
    if (liste.indexOf(valeur) === -1) liste.push(valeur)
  }

  function calculerResultat() {
    const moyenne = parseFloat(moyenneBac)
    const mention = calculerMention(moyenne)

    let filieresRecommandees = []
    let concours = []
    let avertissement = false

    if (estScientifique) {
      const math = parseFloat(noteMath)
      const pc = parseFloat(notePC)
      const svt = bacSerie === "S2" ? parseFloat(noteSvt) : null
      const moyenneSciences = svt !== null ? (math + pc + svt) / 3 : (math + pc) / 2

      if (svt !== null && svt >= 16) {
        ajouterSansDoublon(filieresRecommandees, "Biologie")
        ajouterSansDoublon(filieresRecommandees, "Medecine")
        ajouterSansDoublon(concours, "EMS ou ENSA")
      }

      if (moyenneSciences >= 14) {
        ajouterSansDoublon(filieresRecommandees, "Informatique")
        ajouterSansDoublon(filieresRecommandees, "Mathematiques - Physique - Informatique (MPI)")
        ajouterSansDoublon(filieresRecommandees, "Ingenierie")
        ajouterSansDoublon(concours, "EPT")
        ajouterSansDoublon(concours, "ESP")
        ajouterSansDoublon(concours, "ESAE")
        ajouterSansDoublon(concours, "IPSL")
        ajouterSansDoublon(concours, "ISFAR")
        ajouterSansDoublon(concours, "Polytech Diamniadio")
        ajouterSansDoublon(concours, "ENSG")
      } else if (moyenneSciences >= 10) {
        ajouterSansDoublon(filieresRecommandees, "Chimie")
        ajouterSansDoublon(filieresRecommandees, "Physique - Chimie (PC)")
        ajouterSansDoublon(filieresRecommandees, "Technologies agro-alimentaires")
        ajouterSansDoublon(filieresRecommandees, "Sciences de la Terre et Environnement")
        if (bacSerie === "S1") {
          ajouterSansDoublon(concours, "EPT")
          ajouterSansDoublon(concours, "ESP")
          ajouterSansDoublon(concours, "ESAE")
          ajouterSansDoublon(concours, "IPSL")
          ajouterSansDoublon(concours, "ISFAR")
          ajouterSansDoublon(concours, "Polytech Diamniadio")
          ajouterSansDoublon(concours, "ENSG")
        }
      } else {
        ajouterSansDoublon(filieresRecommandees, "Agronomie")
        ajouterSansDoublon(filieresRecommandees, "Aquaculture")
        ajouterSansDoublon(filieresRecommandees, "Technicien superieur (BTS)")
      }

      if (moyenne >= 11) {
        ajouterSansDoublon(concours, "Polytech UAM")
        ajouterSansDoublon(concours, "ESAE")
      }
    }

    if (estLitteraire) {
      const francais = parseFloat(noteFrancais)
      const philo = parseFloat(notePhilo)
      const anglais = parseFloat(noteAnglais)
      const histGeo = parseFloat(noteHistGeo)
      const moyenneLettres = (francais + philo + anglais + histGeo) / 4

      if (moyenneLettres >= 14) {
        ajouterSansDoublon(filieresRecommandees, "Droit")
        ajouterSansDoublon(filieresRecommandees, "Sciences politiques")
        ajouterSansDoublon(filieresRecommandees, "Lettres modernes")
        ajouterSansDoublon(filieresRecommandees, "Anglais")
        if (bacSerie === "L2") {
          ajouterSansDoublon(concours, "ESP")
          ajouterSansDoublon(concours, "Polytech Diamniadio")
        }
        ajouterSansDoublon(concours, "CREM")
        ajouterSansDoublon(concours, "FASTEF")
      } else if (moyenneLettres >= 10) {
        ajouterSansDoublon(filieresRecommandees, "Histoire")
        ajouterSansDoublon(filieresRecommandees, "Philosophie")
        ajouterSansDoublon(filieresRecommandees, "Langues Etrangeres Appliquees (LEA)")
        ajouterSansDoublon(filieresRecommandees, "Communication")
        ajouterSansDoublon(concours, "CREM")
        ajouterSansDoublon(concours, "FASTEF")
      } else {
        ajouterSansDoublon(filieresRecommandees, "Administration Economique et Sociale (AES)")
        ajouterSansDoublon(filieresRecommandees, "Management du tourisme et de l'hotellerie")
      }

      if (moyenne >= 11) {
        ajouterSansDoublon(concours, "Polytech UAM")
      }
    }

    if (estGestion) {
      ajouterSansDoublon(filieresRecommandees, "FASEG - Sciences Economiques et de Gestion")
      ajouterSansDoublon(filieresRecommandees, "Gestion des entreprises")
      ajouterSansDoublon(filieresRecommandees, "Banque et Finance")
      ajouterSansDoublon(filieresRecommandees, "Administration Economique et Sociale (AES)")
      ajouterSansDoublon(concours, "ESP")
      ajouterSansDoublon(concours, "Polytech diamiadio")
    }

    if (estTechnique) {
      ajouterSansDoublon(filieresRecommandees, "Telecommunications et Electronique")
      ajouterSansDoublon(filieresRecommandees, "Energies renouvelables")
      ajouterSansDoublon(filieresRecommandees, "Technologies agro-alimentaires")
      ajouterSansDoublon(concours, "Polytech diamniadio)")
    }

    if (mention === "Passable") {
      ajouterSansDoublon(concours, "CREM")
      ajouterSansDoublon(concours, "FASTEF")
      ajouterSansDoublon(concours, "ENA")
    }

    if (mention === "Insuffisant") {
      avertissement = true
    }

    setResultat({
      mention: mention,
      moyenne: moyenne,
      filieres: filieresRecommandees,
      concours: concours,
      avertissement: avertissement,
    })
    setStep("resultat")
  }

  function recommencer() {
    setStep("accueil")
    setBacSerie("")
    setNoteMath("")
    setNotePC("")
    setNoteSvt("")
    setNoteFrancais("")
    setNotePhilo("")
    setNoteAnglais("")
    setNoteHistGeo("")
    setMoyenneBac("")
    setResultat(null)
  }

  return (
    <main className="min-h-screen bg-blue-50 px-4 py-12">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-8">
        <a href="/" className="text-blue-900 font-bold mb-6 block">Retour a l'accueil</a>

        {step === "accueil" && (
          <div>
            <h2 className="text-2xl font-bold mb-3">Bonjour, nouveau bachelier !</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Felicitations pour ton bac ! On va t'aider a trouver la voie qui te correspond.
              Ca prend deux minutes : quelques notes, ta moyenne, et on te propose des filieres
              et des concours adaptes a ton profil.
            </p>
            <button
              onClick={function () { setStep("serie") }}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg font-medium"
            >
              C'est parti
            </button>
          </div>
        )}

        {step === "serie" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Quelle est ta serie au bac ?</h2>
            <p className="text-gray-500 mb-6">Seules les series S1, S2, S3, L1, L2, G et T sont prises en compte</p>
            <div className="space-y-3">
              {["S1", "S2", "S3", "L1", "L2", "G", "T"].map(function (s) {
                return (
                  <button
                    key={s}
                    onClick={function () { choisirSerie(s) }}
                    className="w-full border rounded-lg py-3 hover:bg-blue-50 text-left px-4"
                  >
                    Serie {s}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {step === "notesSciences" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Tes notes scientifiques</h2>
            <p className="text-gray-500 mb-6">Sur 20, s'il te plait</p>

            <label className="block text-sm font-medium mb-1">Mathematiques</label>
            <input type="number" min="0" max="20" value={noteMath} onChange={function (e) { setNoteMath(e.target.value) }} className="w-full border rounded-lg py-2 px-4 mb-4" placeholder="Ex: 14" />

            <label className="block text-sm font-medium mb-1">Physique-Chimie</label>
            <input type="number" min="0" max="20" value={notePC} onChange={function (e) { setNotePC(e.target.value) }} className="w-full border rounded-lg py-2 px-4 mb-4" placeholder="Ex: 13" />

            {bacSerie === "S2" && (
              <div>
                <label className="block text-sm font-medium mb-1">SVT</label>
                <input type="number" min="0" max="20" value={noteSvt} onChange={function (e) { setNoteSvt(e.target.value) }} className="w-full border rounded-lg py-2 px-4 mb-4" placeholder="Ex: 15" />
              </div>
            )}

            <button
              onClick={function () { setStep("moyenne") }}
              disabled={!noteMath || !notePC || (bacSerie === "S2" && !noteSvt)}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg disabled:opacity-40 mt-2"
            >
              Suivant
            </button>
          </div>
        )}

        {step === "notesLettres" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Tes notes litteraires</h2>
            <p className="text-gray-500 mb-6">Sur 20, s'il te plait</p>

            <label className="block text-sm font-medium mb-1">Francais</label>
            <input type="number" min="0" max="20" value={noteFrancais} onChange={function (e) { setNoteFrancais(e.target.value) }} className="w-full border rounded-lg py-2 px-4 mb-4" placeholder="Ex: 14" />

            <label className="block text-sm font-medium mb-1">Philosophie</label>
            <input type="number" min="0" max="20" value={notePhilo} onChange={function (e) { setNotePhilo(e.target.value) }} className="w-full border rounded-lg py-2 px-4 mb-4" placeholder="Ex: 13" />

            <label className="block text-sm font-medium mb-1">Anglais</label>
            <input type="number" min="0" max="20" value={noteAnglais} onChange={function (e) { setNoteAnglais(e.target.value) }} className="w-full border rounded-lg py-2 px-4 mb-4" placeholder="Ex: 12" />

            <label className="block text-sm font-medium mb-1">Histoire-Geographie</label>
            <input type="number" min="0" max="20" value={noteHistGeo} onChange={function (e) { setNoteHistGeo(e.target.value) }} className="w-full border rounded-lg py-2 px-4 mb-4" placeholder="Ex: 13" />

            <button
              onClick={function () { setStep("moyenne") }}
              disabled={!noteFrancais || !notePhilo || !noteAnglais || !noteHistGeo}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg disabled:opacity-40 mt-2"
            >
              Suivant
            </button>
          </div>
        )}

        {step === "moyenne" && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Ta moyenne generale au baccalaureat</h2>
            <p className="text-gray-500 mb-6">Sur 20</p>
            <input
              type="number"
              min="0"
              max="20"
              step="0.1"
              value={moyenneBac}
              onChange={function (e) { setMoyenneBac(e.target.value) }}
              className="w-full border rounded-lg py-3 px-4 mb-4"
              placeholder="Ex: 13.5"
            />
            <button
              onClick={calculerResultat}
              disabled={!moyenneBac}
              className="bg-blue-900 text-white px-6 py-3 rounded-lg disabled:opacity-40"
            >
              Voir mes resultats
            </button>
          </div>
        )}

        {step === "resultat" && resultat && (
          <div>
            {!resultat.avertissement && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="font-bold text-green-800">Felicitations pour ton baccalaureat !</p>
                <p className="text-green-700 text-sm mt-1">
                  Moyenne : {resultat.moyenne} sur 20 — Mention {resultat.mention}
                </p>
              </div>
            )}

            {resultat.avertissement && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <p className="font-bold text-orange-800">Ta moyenne est {resultat.moyenne} sur 20</p>
                <p className="text-orange-700 text-sm mt-2 leading-relaxed">
                  Avec ce niveau et sans mention, poursuivre a l'universite risque d'etre tres difficile,
                  autant sur le plan academique que sur les conditions de vie etudiante. Ce n'est pas une
                  fatalite : des formations courtes et professionnalisantes (BTS, formations en alternance,
                  metiers manuels ou techniques) peuvent etre de bonnes alternatives pour construire ton
                  avenir progressivement.
                </p>
              </div>
            )}

            {resultat.filieres.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Filieres recommandees</h3>
                <ul className="space-y-2">
                  {resultat.filieres.map(function (f) {
                    return (
                      <li key={f} className="bg-blue-50 rounded-lg px-4 py-3 font-medium">{f}</li>
                    )
                  })}
                </ul>
              </div>
            )}

            {resultat.concours.length > 0 && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Concours a envisager</h3>
                <ul className="space-y-2">
                  {resultat.concours.map(function (c) {
                    return (
                      <li key={c} className="bg-gray-50 border rounded-lg px-4 py-3 text-sm">{c}</li>
                    )
                  })}
                </ul>
              </div>
            )}

            <button onClick={recommencer} className="text-blue-900 underline">
              Refaire le test
            </button>
          </div>
        )}
      </div>
    </main>
  )
}