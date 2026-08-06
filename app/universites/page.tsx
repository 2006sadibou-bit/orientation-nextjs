const universites = [
  { nom: "Université Cheikh Anta Diop (UCAD)", ville: "Dakar", type: "Publique", description: "La plus grande et la plus ancienne université du Sénégal." },
  { nom: "Université Gaston Berger (UGB)", ville: "Saint-Louis", type: "Publique", description: "Réputée pour ses filières scientifiques et de gestion." },
  { nom: "Université Alioune Diop de Bambey (UADB)", ville: "Bambey", type: "Publique", description: "Agriculture, sciences, gestion, santé." },
  { nom: "Université Amadou Mahtar Mbow (UAM)", ville: "Diamniadio", type: "Publique", description: "Innovation, numérique, entrepreneuriat." },
  { nom: "Université Iba Der Thiam de Thiès (UIDT)", ville: "Thiès", type: "Publique", description: "Sciences, ingénierie, formation des enseignants." },
  { nom: "Université Assane Seck de Ziguinchor (UASZ)", ville: "Ziguinchor", type: "Publique", description: "Sciences, lettres, agroforesterie, tourisme." },
  { nom: "Université du Sine Saloum (USSEIN)", ville: "Kaolack", type: "Publique", description: "Agro-industrie, mines, entrepreneuriat." },
  { nom: "Université Sourakhata Cissé de Bakel", ville: "Bakel", type: "Publique", description: "Développement local, agriculture, environnement." },
  { nom: "Institut Supérieur de Management (ISM)", ville: "Dakar", type: "Privée", description: "Commerce, gestion, informatique, communication." },
  { nom: "Université Dakar Bourguiba (UDB)", ville: "Dakar", type: "Privée", description: "Droit, sciences politiques, gestion." },
  { nom: "Institut Africain de Management (IAM)", ville: "Dakar", type: "Privée", description: "Gestion, commerce international, finance." },
  { nom: "Université Numérique Cheikh Hamidou Kane (UN-CHK)", ville: "En ligne", type: "Publique", description: "Formations à distance, tous domaines." },
  { nom: "Institut Supérieur d'Informatique (ISI)", ville: "Dakar", type: "Privée", description: "Informatique, réseaux, développement web." },
  { nom: "Université Catholique de l'Afrique de l'Ouest (UCAO)", ville: "Dakar", type: "Privée", description: "Sciences sociales, gestion, théologie." },
]

export default function Universites() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b px-8 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-extrabold text-blue-900 tracking-tight">
          Orientation<span className="text-blue-500">SN</span>
        </a>
        <nav className="space-x-8 text-sm font-medium text-gray-700">
          <a href="/filieres" className="hover:text-blue-900">Filières</a>
          <a href="/universites" className="hover:text-blue-900">Universités</a>
          <a href="/test" className="bg-blue-900 text-white px-5 py-2 rounded-full hover:bg-blue-800">
            Passer le test
          </a>
        </nav>
      </header>

      <section className="py-16 px-8 max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">Universités du Sénégal</h1>
          <p className="text-gray-500">Publiques et privées, réparties dans tout le pays</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {universites.map((u) => {
            const isPublique = u.type === "Publique"
            const badgeColor = isPublique ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"
            const initiales = u.nom.match(/\(([^)]+)\)/)
            const sigle = initiales ? initiales[1] : u.nom.slice(0, 4)

            return (
              <div key={u.nom} className="rounded-2xl border bg-white p-6 hover:shadow-xl transition flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-blue-900 text-white flex items-center justify-center font-bold text-sm">
                    {sigle}
                  </div>
                  <span className={"text-xs px-3 py-1 rounded-full font-medium " + badgeColor}>
                    {u.type}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-1">{u.nom}</h3>
                <p className="text-sm text-gray-400 mb-3">📍 {u.ville}</p>
                <p className="text-gray-600 text-sm flex-1">{u.description}</p>
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
