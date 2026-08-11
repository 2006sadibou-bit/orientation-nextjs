"use client"
import { useState } from "react"

// -----------------------------------------------------------------------
// Donnees de reference
// Series, mentions et concours verifies sur des sources officielles ou
// institutionnelles senegalaises (CAOSP, ESP, e-concours.ucad.sn,
// campus221.sn, concoursn.com) - a reverifier chaque annee car les
// conditions d'acces et le calendrier des concours evoluent.
// -----------------------------------------------------------------------

type StepId =
  | "accueil"
  | "serie"
  | "notesSciences"
  | "notesLettres"
  | "moyenne"
  | "resultat"

type SerieId = "S1" | "S2" | "S3" | "L1" | "L2" | "G" | "T"

type NiveauAdmission = "excellent" | "tresBien" | "bien" | "assezBien" | "passable" | "rattrapages" | "nonAdmis"

type Resultat = {
  niveau: NiveauAdmission
  mention: string
  moyenne: number
  filieres: string[]
  concours: string[]
}

const SERIES: { id: SerieId; label: string; description: string }[] = [
  { id: "S1", label: "S1", description: "Sciences exactes - Maths et Physique-Chimie" },
  { id: "S2", label: "S2", description: "Sciences experimentales - Maths, Physique-Chimie et SVT" },
  { id: "S3", label: "S3", description: "Sciences et techniques - Maths, Physique-Chimie et Construction" },
  { id: "L1", label: "L1", description: "Lettres - Langues et civilisations" },
  { id: "L2", label: "L2", description: "Lettres - Sciences sociales et humaines" },
  { id: "G", label: "G", description: "Sciences de gestion - Comptabilite, action commerciale" },
  { id: "T", label: "T", description: "Techniques industrielles - T1 Mecanique / T2 Electrotechnique" },
]

// Intitules complets des concours, pour donner du contexte sans surcharger
// les cartes de resultat (affiches en info-bulle / sous-texte).
const CONCOURS_INFO: Record<string, string> = {
  "EPT": "Ecole Polytechnique de Thies",
  "ESP": "Ecole Superieure Polytechnique de Dakar (UCAD)",
  "IPSL": "Institut Polytechnique de Saint-Louis (UGB)",
  "ISFAR": "Institut Superieur de Formation Agricole et Rurale (Bambey)",
  "ENSA": "Ecole Nationale Superieure d'Agriculture (Thies)",
  "ENSMG": "Ecole Nationale Superieure des Mines et de la Geologie",
  "Polytech Diamniadio": "Universite Amadou Mahtar Mbow ",
  "CREM": "Concours de Recrutement des Eleves-Maitres (enseignement primaire)",
  "FASTEF": "Faculte des Sciences et Technologies de l'Education et de la Formation",
  "ENA": "Ecole Nationale d'Administration",
  "ESEA": "Ecole Superieur de l'économie appliquée",
  "Ufr sciences de l'ingénieur": "Se trouve à UIDT de Thiés",
  "EMS": "Ecole Santé de Militaire",
}

function ajouterSansDoublon(liste: string[], valeur: string) {
  if (liste.indexOf(valeur) === -1) liste.push(valeur)
}

// Note sur 20 : on protege le calcul contre une saisie vide ou hors bornes.
function noteValide(valeur: string): number {
  const n = parseFloat(valeur)
  if (isNaN(n)) return 0
  return Math.min(20, Math.max(0, n))
}

// Bareme des mentions senegalais (base sur le systeme officiel : la barre
// d'admission est fixee a 10/20, avec une session de rattrapage - le
// "second groupe d'epreuves" - ouverte aux candidats entre 8 et 10/20).
function evaluerNiveau(moyenne: number): { niveau: NiveauAdmission; mention: string } {
  if (moyenne >= 18) return { niveau: "excellent", mention: "Excellent" }
  if (moyenne >= 16) return { niveau: "tresBien", mention: "Tres Bien" }
  if (moyenne >= 14) return { niveau: "bien", mention: "Bien" }
  if (moyenne >= 12) return { niveau: "assezBien", mention: "Assez Bien" }
  if (moyenne >= 9.5) return { niveau: "passable", mention: "Passable" }
  if (moyenne >= 8) return { niveau: "rattrapages", mention: "Second groupe (rattrapage)" }
  return { niveau: "nonAdmis", mention: "Non admis" }
}

// -----------------------------------------------------------------------
// Petites icones (SVG en ligne, pas de dependance externe)
// -----------------------------------------------------------------------

function IconGraine(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className}>
      <path d="M12 21c-4-2-7-6-7-10a7 7 0 0 1 14 0c0 4-3 8-7 10Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 21V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IconChemin(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={props.className}>
      <path d="M4 20c3-6 5-6 8-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="4" cy="20" r="1.6" fill="currentColor" />
      <circle cx="12" cy="8" r="1.6" fill="currentColor" />
      <path d="M12 8c2 3 4 3 8-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="20" cy="6" r="1.6" fill="currentColor" />
    </svg>
  )
}

const ETAPES: { id: StepId; label: string }[] = [
  { id: "accueil", label: "Debut" },
  { id: "serie", label: "Serie" },
  { id: "moyenne", label: "Notes" },
  { id: "resultat", label: "Orientation" },
]

// Regroupe les etapes de saisie de notes sous une seule pastille visuelle,
// pour que la barre de progression reste lisible malgre les deux parcours
// (scientifique / litteraire) possibles.
function etapeAffichee(step: StepId): StepId {
  if (step === "notesSciences" || step === "notesLettres") return "moyenne"
  return step
}

function BarreProgression({ step }: { step: StepId }) {
  const courante = etapeAffichee(step)
  const indexCourant = ETAPES.findIndex((e) => e.id === courante)

  return (
    <div className="flex items-center gap-1 mb-8" aria-label="Progression du test">
      {ETAPES.map((etape, i) => {
        const atteinte = i <= indexCourant
        return (
          <div key={etape.id} className="flex items-center flex-1 last:flex-none">
            <div
              className={
                "h-2 w-2 shrink-0 rounded-full transition-colors " +
                (atteinte ? "bg-[#C9622E]" : "bg-[#E7DFD0]")
              }
            />
            {i < ETAPES.length - 1 && (
              <div
                className={
                  "h-px flex-1 mx-1.5 transition-colors " +
                  (i < indexCourant ? "bg-[#C9622E]" : "bg-[#E7DFD0]")
                }
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function OrientationPostBac() {
  const [step, setStep] = useState<StepId>("accueil")
  const [bacSerie, setBacSerie] = useState<SerieId | "">("")

  const [noteMath, setNoteMath] = useState("")
  const [notePC, setNotePC] = useState("")
  const [noteSvt, setNoteSvt] = useState("")

  const [noteFrancais, setNoteFrancais] = useState("")
  const [notePhilo, setNotePhilo] = useState("")
  const [noteAnglais, setNoteAnglais] = useState("")
  const [noteHistGeo, setNoteHistGeo] = useState("")

  const [moyenneBac, setMoyenneBac] = useState("")

  const [resultat, setResultat] = useState<Resultat | null>(null)

  const estScientifique = bacSerie === "S1" || bacSerie === "S2" || bacSerie === "S3"
  const estLitteraire = bacSerie === "L1" || bacSerie === "L2"
  const estGestion = bacSerie === "G"
  const estTechnique = bacSerie === "T"

  function choisirSerie(s: SerieId) {
    setBacSerie(s)
    if (s === "S1" || s === "S2" || s === "S3") setStep("notesSciences")
    else if (s === "L1" || s === "L2") setStep("notesLettres")
    else setStep("moyenne")
  }

  function calculerResultat() {
    const moyenne = noteValide(moyenneBac)
    const { niveau, mention } = evaluerNiveau(moyenne)

    const filieres: string[] = []
    const concours: string[] = []

    if (estScientifique) {
      const math = noteValide(noteMath)
      const pc = noteValide(notePC)
      const svt = bacSerie === "S2" ? noteValide(noteSvt) : null
      const moyenneSciences = svt !== null ? (math + pc + svt) / 3 : (math + pc) / 2

      if (svt !== null && svt >= 16) {
        ajouterSansDoublon(filieres, "Sciences biologiques / Medecine (orientation Ministere)")
        ajouterSansDoublon(concours, "ENSA")
        ajouterSansDoublon(concours, "EMS")
      }

      if (moyenneSciences >= 14) {
        ajouterSansDoublon(filieres, "Informatique")
        ajouterSansDoublon(filieres, "Mathematiques - Physique - Informatique (MPI)")
        ajouterSansDoublon(filieres, "Ingenierie")
        ajouterSansDoublon(concours, "EPT")
        ajouterSansDoublon(concours, "ESP")
        ajouterSansDoublon(concours, "IPSL")
        ajouterSansDoublon(concours, "ISFAR")
        ajouterSansDoublon(concours, "Polytech Diamniadio")
        ajouterSansDoublon(concours, "ENSMG")
        ajouterSansDoublon(concours, "Ufr sciences de l'ingénieur")
      } else if (moyenneSciences >= 10) {
        ajouterSansDoublon(filieres, "Chimie")
        ajouterSansDoublon(filieres, "Physique - Chimie (PC)")
        ajouterSansDoublon(filieres, "Mathematiques - Physique - Informatique (MPI)")
        ajouterSansDoublon(filieres, "Economie et Gestion")
        ajouterSansDoublon(filieres, "Sciences de la Terre et Environnement")
        if (bacSerie === "S1") {
          ajouterSansDoublon(concours, "EPT")
          ajouterSansDoublon(concours, "ESP")
          ajouterSansDoublon(concours, "IPSL")
          ajouterSansDoublon(concours, "ISFAR")
          ajouterSansDoublon(concours, "Polytech Diamniadio")
          ajouterSansDoublon(concours, "ENSMG")
          ajouterSansDoublon(concours, "Ufr sciences de l'ingénieur")
        }
      } else {
        ajouterSansDoublon(filieres, "Agronomie")
        ajouterSansDoublon(filieres, "Aquaculture")
        ajouterSansDoublon(filieres, "Mathematiques - Physique - Informatique (MPI)")
        ajouterSansDoublon(filieres, "FASEG - Sciences Economiques et de Gestion")
      }

      if (moyenne >= 10.4) {
        ajouterSansDoublon(concours, "Polytech Diamniadio")
        ajouterSansDoublon(concours, "ISFAR")
        ajouterSansDoublon(concours, "ESEA")
        ajouterSansDoublon(concours, "ESP")
        ajouterSansDoublon(concours, "Ufr sciences de l'ingénieur")
      }
    }

    if (estLitteraire) {
      const francais = noteValide(noteFrancais)
      const philo = noteValide(notePhilo)
      const anglais = noteValide(noteAnglais)
      const histGeo = noteValide(noteHistGeo)
      const moyenneLettres = (francais + philo + anglais + histGeo) / 4

      if (moyenneLettres >= 14) {
        ajouterSansDoublon(filieres, "Droit")
        ajouterSansDoublon(filieres, "Sciences politiques")
        ajouterSansDoublon(filieres, "Sciences Juridiques")
        ajouterSansDoublon(filieres, "Lettres modernes")
        ajouterSansDoublon(filieres, "Histoire")
        ajouterSansDoublon(filieres, "Geographie")
        if (bacSerie === "L2") {
          
          ajouterSansDoublon(concours, "Polytech Diamniadio")
          ajouterSansDoublon(concours, "FASTEF")
          ajouterSansDoublon(concours, "CREM")
        }
        ajouterSansDoublon(concours, "CREM")
        ajouterSansDoublon(concours, "FASTEF")
      } else if (moyenneLettres >= 10) {
        ajouterSansDoublon(filieres, "Histoire")
        ajouterSansDoublon(filieres, "Philosophie")
        ajouterSansDoublon(filieres, "Langues Etrangeres Appliquees (LEA)")
        ajouterSansDoublon(filieres, "Communication")
        ajouterSansDoublon(concours, "CREM")
        ajouterSansDoublon(concours, "FASTEF")
        ajouterSansDoublon(concours, "Polytech Diamniadio")
      } else {
        ajouterSansDoublon(filieres, "Administration Economique et Sociale (AES)")
        ajouterSansDoublon(filieres, "Management du tourisme et de l'hotellerie")
        ajouterSansDoublon(filieres, "FASEG - Sciences Economiques et de Gestion")
      }

      if (moyenne >= 10.5) {
        ajouterSansDoublon(concours, "Polytech Diamniadio")
        ajouterSansDoublon(concours, "FASTEF")
        ajouterSansDoublon(concours, "CREM")
      }
    }

    if (estGestion) {
      ajouterSansDoublon(filieres, "FASEG - Sciences Economiques et de Gestion")
      ajouterSansDoublon(filieres, "Gestion des entreprises")
      ajouterSansDoublon(filieres, "Banque et Finance")
      ajouterSansDoublon(filieres, "Administration Economique et Sociale (AES)")
      ajouterSansDoublon(concours, "ESP")
      ajouterSansDoublon(concours, "Polytech Diamniadio")
      ajouterSansDoublon(concours, "FASTEF")
      ajouterSansDoublon(concours, "CREM")
    }

    if (estTechnique) {
      ajouterSansDoublon(filieres, "Telecommunications et Electronique")
      ajouterSansDoublon(filieres, "Energies renouvelables")
      ajouterSansDoublon(filieres, "Technologies agro-alimentaires")
      ajouterSansDoublon(concours, "Polytech Diamniadio")
      ajouterSansDoublon(concours, "ESP")
      ajouterSansDoublon(concours, "FASTEF")
      ajouterSansDoublon(concours, "CREM")
      ajouterSansDoublon(concours, "EPT")
      ajouterSansDoublon(concours, "IPSL")
    }

    if (niveau === "passable" || niveau === "rattrapages") {
      ajouterSansDoublon(concours, "CREM")
      ajouterSansDoublon(concours, "FASTEF")
      ajouterSansDoublon(concours, "ENA")
      ajouterSansDoublon(concours, "Polytech Diamniadio")
    }

    setResultat({ niveau, mention, moyenne, filieres, concours })
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
    <main className="min-h-screen bg-[#FAF6EE] px-4 py-12 text-[#1E2A3C]">
      <div className="max-w-xl mx-auto">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1E2A3C]/60 hover:text-[#1E2A3C] mb-6 transition-colors">
          <span aria-hidden>&larr;</span> Retour a l'accueil
        </a>

        <div className="bg-white rounded-3xl shadow-[0_1px_2px_rgba(30,42,60,0.06),0_16px_40px_-24px_rgba(30,42,60,0.25)] p-8 sm:p-10">
          {step !== "accueil" && <BarreProgression step={step} />}

          {step === "accueil" && (
            <div>
              <div className="h-11 w-11 rounded-2xl bg-[#1E2A3C] text-[#E4A93D] flex items-center justify-center mb-6">
                <IconGraine className="h-6 w-6" />
              </div>
              <p className="uppercase tracking-[0.14em] text-xs font-semibold text-[#C9622E] mb-3">Orientation post-bac</p>
              <h1 className="text-3xl font-serif font-semibold mb-3 leading-tight">
                Felicitations pour ton bac !
              </h1>
              <p className="text-[#1E2A3C]/70 mb-8 leading-relaxed">
                On va t'aider a trouver la voie qui te correspond. Deux minutes suffisent : quelques
                notes, ta moyenne, et on te propose des filieres et des concours adaptes a ton profil,
                serie par serie.
              </p>
              <button
                onClick={() => setStep("serie")}
                className="bg-[#1E2A3C] text-white px-6 py-3.5 rounded-xl font-medium hover:bg-[#16233D] active:scale-[0.98] transition-all"
              >
                C'est parti
              </button>
            </div>
          )}

          {step === "serie" && (
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-1">Quelle est ta serie au bac ?</h2>
              <p className="text-[#1E2A3C]/60 mb-6 text-sm">Series prises en compte : S1, S2, S3, L1, L2, G et T</p>
              <div className="space-y-2.5">
                {SERIES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => choisirSerie(s.id)}
                    className="w-full border border-[#E7DFD0] rounded-xl py-3.5 px-4 text-left hover:border-[#C9622E] hover:bg-[#FDF8F1] transition-colors group"
                  >
                    <span className="font-semibold">Serie {s.label}</span>
                    <span className="block text-sm text-[#1E2A3C]/55 mt-0.5">{s.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "notesSciences" && (
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-1">Tes notes scientifiques</h2>
              <p className="text-[#1E2A3C]/60 mb-6 text-sm">Sur 20, telles qu'elles figurent sur ton releve</p>

              <ChampNote label="Mathematiques" value={noteMath} onChange={setNoteMath} exemple="14" />
              <ChampNote label="Physique-Chimie" value={notePC} onChange={setNotePC} exemple="13" />
              {bacSerie === "S2" && (
                <ChampNote label="SVT" value={noteSvt} onChange={setNoteSvt} exemple="15" />
              )}

              <button
                onClick={() => setStep("moyenne")}
                disabled={!noteMath || !notePC || (bacSerie === "S2" && !noteSvt)}
                className="bg-[#1E2A3C] text-white px-6 py-3.5 rounded-xl font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#16233D] active:scale-[0.98] transition-all mt-2"
              >
                Suivant
              </button>
            </div>
          )}

          {step === "notesLettres" && (
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-1">Tes notes litteraires</h2>
              <p className="text-[#1E2A3C]/60 mb-6 text-sm">Sur 20, telles qu'elles figurent sur ton releve</p>

              <ChampNote label="Francais" value={noteFrancais} onChange={setNoteFrancais} exemple="14" />
              <ChampNote label="Philosophie" value={notePhilo} onChange={setNotePhilo} exemple="13" />
              <ChampNote label="Anglais" value={noteAnglais} onChange={setNoteAnglais} exemple="12" />
              <ChampNote label="Histoire-Geographie" value={noteHistGeo} onChange={setNoteHistGeo} exemple="13" />

              <button
                onClick={() => setStep("moyenne")}
                disabled={!noteFrancais || !notePhilo || !noteAnglais || !noteHistGeo}
                className="bg-[#1E2A3C] text-white px-6 py-3.5 rounded-xl font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#16233D] active:scale-[0.98] transition-all mt-2"
              >
                Suivant
              </button>
            </div>
          )}

          {step === "moyenne" && (
            <div>
              <h2 className="text-2xl font-serif font-semibold mb-1">Ta moyenne generale au baccalaureat</h2>
              <p className="text-[#1E2A3C]/60 mb-6 text-sm">Sur 20 - c'est la moyenne qui figure sur ton attestation</p>
              <input
                type="number"
                min={0}
                max={20}
                step={0.1}
                value={moyenneBac}
                onChange={(e) => setMoyenneBac(e.target.value)}
                className="w-full border border-[#E7DFD0] rounded-xl py-3.5 px-4 mb-4 focus:outline-none focus:ring-2 focus:ring-[#C9622E]/40 focus:border-[#C9622E] transition-shadow text-lg"
                placeholder="Ex : 13.5"
              />
              <button
                onClick={calculerResultat}
                disabled={!moyenneBac}
                className="bg-[#1E2A3C] text-white px-6 py-3.5 rounded-xl font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#16233D] active:scale-[0.98] transition-all"
              >
                Voir mon orientation
              </button>
            </div>
          )}

          {step === "resultat" && resultat && (
            <ResultatVue resultat={resultat} onRecommencer={recommencer} />
          )}
        </div>

        {step === "resultat" && (
          <p className="text-xs text-[#1E2A3C]/45 text-center mt-6 leading-relaxed">
            Informations educatives generales, non exhaustives. Les conditions d'acces et les dates
            de concours changent chaque annee : verifie toujours aupres du CAOSP, de ton lycee ou sur
            e-concours.ucad.sn avant de deposer un dossier.
          </p>
        )}
      </div>
    </main>
  )
}

function ChampNote(props: { label: string; value: string; onChange: (v: string) => void; exemple: string }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-1.5 text-[#1E2A3C]/80">{props.label}</label>
      <input
        type="number"
        min={0}
        max={20}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full border border-[#E7DFD0] rounded-xl py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-[#C9622E]/40 focus:border-[#C9622E] transition-shadow"
        placeholder={`Ex : ${props.exemple}`}
      />
    </div>
  )
}

function ResultatVue({ resultat, onRecommencer }: { resultat: Resultat; onRecommencer: () => void }) {
  const admis = resultat.niveau !== "nonAdmis" && resultat.niveau !== "rattrapages"

  return (
    <div>
      {admis && (
        <div className="bg-[#F0F5EF] border border-[#2F6F5E]/25 rounded-2xl p-5 mb-6">
          <p className="font-serif font-semibold text-lg text-[#1F4C3F]">Felicitations pour ton baccalaureat !</p>
          <p className="text-[#1F4C3F]/80 text-sm mt-1">
            Moyenne : {resultat.moyenne.toFixed(1)} / 20 - Mention {resultat.mention}
          </p>
        </div>
      )}

      {resultat.niveau === "rattrapages" && (
        <div className="bg-[#FDF3E3] border border-[#E4A93D]/40 rounded-2xl p-5 mb-6">
          <p className="font-serif font-semibold text-lg text-[#7A5417]">Tu es dans la zone du second groupe</p>
          <p className="text-[#7A5417]/85 text-sm mt-2 leading-relaxed">
            Avec {resultat.moyenne.toFixed(1)}/20, tu peux composer les epreuves du second groupe
            (session de rattrapage) : si tu atteins 10/20 sur cette base, tu seras admis. Revois en
            priorite les deux dominantes de ta serie - c'est encore jouable, prepare-toi serieusement
            pour cette session.
          </p>
        </div>
      )}

      {resultat.niveau === "nonAdmis" && (
        <div className="bg-[#FBEEE8] border border-[#C9622E]/30 rounded-2xl p-5 mb-6">
          <p className="font-serif font-semibold text-lg text-[#8A3B15]">Ta moyenne est {resultat.moyenne.toFixed(1)} / 20</p>
          <p className="text-[#8A3B15]/85 text-sm mt-2 leading-relaxed">
            Ce resultat ne permet pas d'etre admis cette session. Ce n'est pas une fatalite : des
            formations courtes et professionnalisantes (BTS, formations en alternance, metiers
            techniques) restent d'excellentes portes d'entree, tout comme reprendre l'annee. Un
            conseiller du CAOSP de ton academie peut t'aider a construire la suite.
          </p>
        </div>
      )}

      {resultat.filieres.length > 0 && (
        <div className="mb-6">
          <h3 className="font-serif font-semibold text-lg mb-3">Filieres recommandees</h3>
          <ul className="space-y-2">
            {resultat.filieres.map((f) => (
              <li key={f} className="bg-[#FDF8F1] border border-[#E7DFD0] rounded-xl px-4 py-3 font-medium text-sm">
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {resultat.concours.length > 0 && (
        <div className="mb-6">
          <h3 className="font-serif font-semibold text-lg mb-3">Concours a envisager</h3>
          <ul className="space-y-2">
            {resultat.concours.map((c) => (
              <li key={c} className="border border-[#E7DFD0] rounded-xl px-4 py-3">
                <span className="text-sm font-semibold">{c}</span>
                {CONCOURS_INFO[c] && (
                  <span className="block text-xs text-[#1E2A3C]/55 mt-0.5">{CONCOURS_INFO[c]}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={onRecommencer}
        className="inline-flex items-center gap-1.5 text-[#1E2A3C] font-medium hover:text-[#C9622E] transition-colors"
      >
        <IconChemin className="h-4 w-4" />
        Refaire le test
      </button>
    </div>
  )
}
