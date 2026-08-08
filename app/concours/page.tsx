"use client"

import { useMemo, useState } from "react"

type Ecole = {
  sigle: string
  nom: string
  universite: string
  ville: string
  description: string
  domaines: string[]
  concours: string
  gradient: string
}

const ecoles: Ecole[] = [
  {
    sigle: "ESP",
    nom: "École Supérieure Polytechnique de Dakar",
    universite: "Université Cheikh Anta Diop de Dakar",
    ville: "Dakar",
    description:
      "Grande école publique de formation de techniciens, ingénieurs et cadres dans les domaines scientifiques et technologiques.",
    domaines: [
      "Informatique",
      "Électronique",
      "Télécommunications",
      "Génie civil",
      "Génie mécanique",
      "Autres",
    ],
    concours: "Concours REPFIS",
    gradient: "from-indigo-700 to-violet-600",
  },
  {
    sigle: "EPT",
    nom: "École Polytechnique de Thiès",
    universite: "Établissement public",
    ville: "Thiès",
    description:
      "École publique d'ingénieurs spécialisée dans les sciences et technologies de l'ingénieur.",
    domaines: [
      "Génie civil",
      "Électromécanique",
      "Électrotechnique",
      "Informatique et télécoms",
      "Aéronautiques",
      "Autres",
    ],
    concours: "Concours REPFIS",
    gradient: "from-blue-700 to-cyan-500",
  },
  {
    sigle: "IPSL",
    nom: "Institut Polytechnique de Saint-Louis",
    universite: "Université Gaston Berger",
    ville: "Saint-Louis",
    description:
      "Institut public de formation d'ingénieurs dans les sciences, les technologies et les domaines appliqués.",
    domaines: [
      "Sciences de l'ingénieur",
      "Technologies",
      "Sciences appliquées",
    ],
    concours: "Concours REPFIS",
    gradient: "from-cyan-600 to-blue-700",
  },
  {
    sigle: "UFR-SI",
    nom: "UFR Sciences de l'Ingénieur",
    universite: "Université Iba Der Thiam de Thiès",
    ville: "Thiès",
    description:
      "Structure universitaire dédiée aux formations scientifiques et technologiques dans les sciences de l'ingénieur.",
    domaines: [
      "Sciences de l'ingénieur",
      "Technologies",
      "Sciences appliquées",
    ],
    concours: "Concours REPFIS",
    gradient: "from-violet-700 to-fuchsia-600",
  },
  {
    sigle: "POLYTECH",
    nom: "Polytech Diamniadio",
    universite: "Université Amadou Mahtar Mbow",
    ville: "Diamniadio",
    description:
      "École polytechnique publique moderne proposant des formations dans les domaines technologiques, industriels et scientifiques.",
    domaines: [
      "Électronique & Télécoms",
      "Informatique",
      "Génie civil",
      "Systeme électrique et énergetiques",
      "Géni des procédes",
      "Finance et comptabilité",
      "Autres",
    ],
    concours: "Concours REPFIS",
    gradient: "from-indigo-700 to-cyan-500",
  },
  {
    sigle: "ENSA",
    nom: "École Nationale Supérieure d'Agriculture",
    universite: "Établissement public",
    ville: "Thiès",
    description:
      "Établissement public spécialisé dans la formation supérieure et l'ingénierie agricole.",
    domaines: [
      "Agronomie",
      "Agriculture",
      "Production agricole",
      "Sciences agricoles",
      "Autres",
    ],
    concours: "Concours REPFIS",
    gradient: "from-emerald-600 to-green-700",
  },
  {
    sigle: "ENSMG",
    nom: "École Nationale Supérieure des Mines et de la Géologie",
    universite: "Université Cheikh Anta Diop de Dakar",
    ville: "Dakar",
    description:
      "École spécialisée dans les domaines des mines, de la géologie, de la géotechnique et des ressources naturelles.",
    domaines: [
      "Mines",
      "Géologie",
      "Géotechnique",
      "Environnement",
    ],
    concours: "Concours REPFIS",
    gradient: "from-orange-500 to-amber-600",
  },
  {
    sigle: "ISFAR",
    nom: "Institut Supérieur de Formation Agricole et Rurale",
    universite: "Université Alioune Diop de Bambey",
    ville: "Bambey",
    description:
      "Institut public spécialisé dans la formation agricole, rurale et le développement des territoires.",
    domaines: [
      "Agriculture",
      "Développement rural",
      "Sciences agricoles",
      "Geni Civil",
      "Autres",

    ],
    concours: "Concours REPFIS",
    gradient: "from-green-600 to-emerald-700",
  },
]

export default function ConcoursPage() {
  const [recherche, setRecherche] = useState("")
  const [ville, setVille] = useState("Toutes")

  const villes = [
    "Toutes",
    ...Array.from(new Set(ecoles.map((ecole) => ecole.ville))),
  ]

  const resultats = useMemo(() => {
    const rechercheNormalisee = recherche.toLowerCase().trim()

    return ecoles.filter((ecole) => {
      const contenu = [
        ecole.sigle,
        ecole.nom,
        ecole.universite,
        ecole.ville,
        ...ecole.domaines,
      ]
        .join(" ")
        .toLowerCase()

      const correspondRecherche =
        rechercheNormalisee === "" ||
        contenu.includes(rechercheNormalisee)

      const correspondVille =
        ville === "Toutes" || ecole.ville === ville

      return correspondRecherche && correspondVille
    })
  }, [recherche, ville])

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden bg-slate-950">

        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-indigo-700/30 blur-3xl" />

        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">

          <div className="max-w-4xl">

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-bold text-cyan-300 backdrop-blur">
              <span>🎓</span>
              <span>ORIENTATION SÉNÉGAL</span>
            </div>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
              Concours & grandes écoles
              <span className="block bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                d'ingénieurs du Sénégal
              </span>
            </h1>

            <p className="mt-6 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              Découvre les établissements publics de formation
              d'ingénieurs du Sénégal, leurs domaines de formation
              et les informations concernant les concours.
            </p>

          </div>

          {/* STATS */}

          <div className="mt-12 grid gap-4 sm:grid-cols-3">

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-3xl font-black text-white">
                08
              </p>

              <p className="mt-1 text-sm text-slate-400">
                établissements REPFIS
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-3xl font-black text-white">
                🇸🇳
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Formation publique
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <p className="text-3xl font-black text-white">
                2026
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Session REPFIS
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= RECHERCHE ================= */}

      <section className="relative z-10 mx-auto -mt-8 max-w-7xl px-6 lg:px-8">

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">

          <div className="grid gap-5 lg:grid-cols-[1fr_230px]">

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Rechercher une école
              </label>

              <div className="relative">

                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                  🔎
                </span>

                <input
                  type="text"
                  value={recherche}
                  onChange={(event) =>
                    setRecherche(event.target.value)
                  }
                  placeholder="Ex : ESP, Polytech, informatique..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />

              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-bold text-slate-700">
                Ville
              </label>

              <select
                value={ville}
                onChange={(event) => setVille(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 font-semibold outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              >
                {villes.map((nomVille) => (
                  <option key={nomVille} value={nomVille}>
                    {nomVille}
                  </option>
                ))}
              </select>

            </div>

          </div>

        </div>
      </section>

      {/* ================= LISTE ================= */}

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        <div className="mb-10">

          <p className="text-sm font-black uppercase tracking-widest text-indigo-600">
            Établissements
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Les écoles d'ingénieurs
              </h2>

              <p className="mt-2 text-slate-500">
                Trouve l'établissement qui correspond à ton projet.
              </p>

            </div>

            <div className="w-fit rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
              {resultats.length} résultat
              {resultats.length > 1 ? "s" : ""}
            </div>

          </div>

        </div>

        {/* AUCUN RESULTAT */}

        {resultats.length === 0 ? (

          <div className="rounded-3xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">

            <div className="text-5xl">
              🔍
            </div>

            <h3 className="mt-5 text-2xl font-black">
              Aucun établissement trouvé
            </h3>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              Essaie un autre nom d'école, une autre spécialité
              ou une autre ville.
            </p>

            <button
              type="button"
              onClick={() => {
                setRecherche("")
                setVille("Toutes")
              }}
              className="mt-6 rounded-xl bg-indigo-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-indigo-800"
            >
              Réinitialiser la recherche
            </button>

          </div>

        ) : (

          <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">

            {resultats.map((ecole) => (

              <article
                key={ecole.sigle}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* ================= EN-TÊTE CARTE ================= */}

                <div
                  className={
                    "relative overflow-hidden bg-gradient-to-r " +
                    ecole.gradient +
                    " p-6"
                  }
                >

                  <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />

                  <div className="absolute -bottom-16 -left-10 h-32 w-32 rounded-full bg-white/5" />

                  <div className="relative flex items-start justify-between gap-4">

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-center text-xs font-black text-slate-900 shadow-xl">
                      {ecole.sigle}
                    </div>

                    <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur">
                      PUBLIC
                    </span>

                  </div>

                  <h3 className="relative mt-6 text-xl font-black leading-tight text-white">
                    {ecole.nom}
                  </h3>

                  <p className="relative mt-2 text-sm leading-5 text-white/75">
                    {ecole.universite}
                  </p>

                </div>

                {/* ================= CONTENU CARTE ================= */}

                <div className="p-6">

                  <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
                    <span>📍</span>
                    <span>{ecole.ville}</span>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    {ecole.description}
                  </p>

                  {/* DOMAINES */}

                  <div className="mt-6">

                    <p className="mb-3 text-xs font-black uppercase tracking-wider text-slate-400">
                      Domaines
                    </p>

                    <div className="flex flex-wrap gap-2">

                      {ecole.domaines.map((domaine) => (

                        <span
                          key={domaine}
                          className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600"
                        >
                          {domaine}
                        </span>

                      ))}

                    </div>

                  </div>

                  {/* CONCOURS */}

                  <div className="mt-6 rounded-2xl bg-indigo-50 p-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-lg">
                        📝
                      </div>

                      <div>

                        <p className="text-xs font-bold uppercase tracking-wide text-indigo-400">
                          Admission
                        </p>

                        <p className="mt-0.5 text-sm font-black text-indigo-950">
                          {ecole.concours}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* BOUTONS */}

                  <div className="mt-6 grid grid-cols-2 gap-3">

                    <button
                      type="button"
                      className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                    >
                      SELECTIF
                    </button>

                    <button
                      type="button"
                      className="rounded-xl bg-indigo-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-800"
                    >
                      BIEN LE PREPARER
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </section>

      {/* ================= INFORMATION ================= */}

      <section className="bg-slate-950">

        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">

            <div>

              <p className="text-sm font-black uppercase tracking-widest text-cyan-400">
                Information importante
              </p>

              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                Prépare ton concours sérieusement.
              </h2>

              <p className="mt-5 max-w-2xl leading-7 text-slate-400">
                Les dates, conditions d'admission, pièces à fournir
                et modalités peuvent varier selon l'établissement
                et la session. Vérifie toujours les informations
                auprès de la source officielle.
              </p>

            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-7">

              <div className="flex gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-500/10 text-xl">
                  🎓
                </div>

                <div>

                  <h3 className="font-black text-white">
                    REPFIS 2026
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    Le REPFIS regroupe huit établissements publics
                    de formation d'ingénieurs au Sénégal.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  )
}