const conseils = [
  {
    emoji: "🧮",
    titre: "Vous êtes très à l'aise en mathématiques et en physique",
    texte: "Si vous obtenez d'excellents résultats dans ces matières et que vous aimez résoudre des problèmes scientifiques, les écoles d'ingénieurs peuvent être un excellent choix. Pensez à tenter les concours de l'EPT, de l'ESP, de Polytech Diamniadio, de l'IPSL, de l'ISFAR ainsi que d'autres écoles d'ingénieurs.",
  },
  {
    emoji: "🧬",
    titre: "Vous êtes meilleur en SVT avec un bon niveau en mathématiques et physique",
    texte: "Si les sciences de la vie vous passionnent, vous pouvez envisager des études en médecine, pharmacie, odontologie, biologie ou dans d'autres filières des sciences de la santé. Les concours de l'EMS et les formations proposées par l'UCAD constituent également de bonnes opportunités.",
  },
  {
    emoji: "📊",
    titre: "Les matières scientifiques ne sont pas votre point fort",
    texte: "Ne vous découragez pas. De nombreuses filières offrent d'excellentes perspectives d'avenir, notamment l'économie, la gestion (FASEG), le management, la comptabilité, la finance et d'autres domaines des sciences humaines et sociales.",
  },
  {
    emoji: "⚙️",
    titre: "Vous souhaitez devenir ingénieur",
    texte: "Si votre objectif est une carrière d'ingénieur, pensez également à vous renseigner sur le concours de l'UAM ainsi que sur les autres écoles d'ingénieurs reconnues. Une bonne préparation augmente vos chances de réussite.",
  },
  {
    emoji: "⚖️",
    titre: "Vous êtes titulaire d'un baccalauréat littéraire (L)",
    texte: "Les études en droit, en sciences juridiques, en administration publique, ainsi que les concours du CREM et de la FASTEF, représentent d'excellentes possibilités selon votre projet professionnel.",
  },
]

export default function Conseils() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b px-8 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-extrabold text-blue-900 tracking-tight">
          Orientation<span className="text-blue-500">SN</span>
        </a>
        <nav className="space-x-8 text-sm font-medium text-gray-700">
          <a href="/filieres" className="hover:text-blue-900">Filières</a>
          <a href="/universites" className="hover:text-blue-900">Universités</a>
          <a href="/conseils" className="hover:text-blue-900">Conseils</a>
          <a href="/test" className="bg-blue-900 text-white px-5 py-2 rounded-full hover:bg-blue-800">
            Passer le test
          </a>
        </nav>
      </header>

      <section className="py-16 px-8 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">Conseils d'orientation</h1>
        <p className="text-gray-600 mb-10 leading-relaxed">
          Le choix d'une filière ne dépend pas uniquement de vos notes. Vos compétences, vos centres
          d'intérêt, votre motivation et votre projet professionnel sont tout aussi importants.
          Les conseils ci-dessous sont donnés à titre indicatif.
        </p>

        <div className="space-y-6">
          {conseils.map((c) => (
            <div key={c.titre} className="border rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{c.emoji}</div>
                <div>
                  <h3 className="font-bold text-lg mb-2">{c.titre}</h3>
                  <p className="text-gray-600 leading-relaxed">{c.texte}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-6">
          <p className="font-bold text-blue-900 mb-1">Important</p>
          <p className="text-gray-700 leading-relaxed">
            Aucune filière n'est meilleure qu'une autre. La réussite dépend surtout de votre
            motivation, de votre travail, de vos compétences et de votre persévérance. Choisissez
            une formation qui correspond à votre profil et à vos ambitions.
          </p>
        </div>
      </section>
    </main>
  )
}