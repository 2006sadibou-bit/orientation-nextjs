export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b px-8 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-extrabold text-blue-900 tracking-tight">
          Orientation<span className="text-blue-500">SN</span>
        </a>
        <nav className="space-x-8 text-sm font-medium text-gray-700">
          <a href="/filieres" className="hover:text-blue-900">Filieres</a>
          <a href="/universites" className="hover:text-blue-900">Universites</a>
          <a href="/conseils" className="hover:text-blue-900">Conseils</a>
          <a href="/test" className="bg-blue-900 text-white px-5 py-2 rounded-full hover:bg-blue-800">
            Passer le test
          </a>
        </nav>
      </header>

      <section className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1800&h=900&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Etudiants africains"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-950/70 to-blue-950/95" />
        <div className="relative px-6 py-24 text-center text-white max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
            Ton bac en poche. Et maintenant ?
          </h1>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            Reponds a quelques questions sur ta serie et tes notes, et decouvre les
            filieres faites pour toi.
          </p>
          <a href="/test" className="bg-white text-blue-900 font-bold px-8 py-4 rounded-full inline-block hover:bg-blue-50 transition">
            Commencer le test d'orientation
          </a>
        </div>
      </section>

      <section className="py-16 px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=500&h=350&fit=crop" className="w-full h-48 object-cover rounded-2xl" alt="Etudiants qui travaillent" />
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=350&fit=crop" className="w-full h-48 object-cover rounded-2xl" alt="Etudiants en bibliotheque" />
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&h=350&fit=crop" className="w-full h-48 object-cover rounded-2xl" alt="Etudiants en cours" />
        </div>
      </section>

      <section className="py-20 px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center">
          <div className="md:col-span-1 flex justify-center">
            <div className="w-48 h-48 rounded-full bg-gray-200 border-4 border-blue-900 overflow-hidden">
              <img
                src="/photo-cheikh.jpg"
                className="w-full h-full object-cover"
                alt="Cheikh Sadibou"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-1">Cheikh Sadibou</h2>
            <p className="text-blue-900 font-medium mb-4">
              Eleve ingenieur en Genie Informatique — Ecole Superieure Polytechnique de Diamniadio
            </p>
            <p className="text-gray-600 leading-relaxed">
              Ce site, je l'ai cree afin de venir en aide aux nouveaux bacheliers apres l'obtention
              de leur diplome. Beaucoup d'entre nous se retrouvent perdus face au choix d'une filiere.
              Mon objectif est simple : donner des reperes clairs, bases sur les notes, les series et
              les vraies opportunites qui existent au Senegal.
            </p>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4 text-center md:text-left">
          Pour afficher ta photo, ajoute un fichier nomme photo-cheikh.jpg dans le dossier public
        </p>
      </section>

      <section className="py-16 px-8 bg-blue-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">S'inspirer des grands savants senegalais</h2>
          <p className="text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Cheikh Anta Diop, historien, physicien et anthropologue senegalais, a marque l'histoire
            intellectuelle africaine par ses travaux sur l'origine de l'humanite et les civilisations
            africaines. Son parcours rappelle qu'avec rigueur et perseverance, un bachelier senegalais
            peut atteindre l'excellence dans n'importe quel domaine, scientifique comme litteraire.
          </p>
        </div>
      </section>

      <section className="py-20 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-2 text-center">Sites officiels utiles</h2>
          <p className="text-gray-500 text-center mb-10">
            Liens vers les principales ecoles et plateformes d'information
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="https://ept.edu.sn/" target="_blank" rel="noopener noreferrer" className="border rounded-2xl p-6 bg-white hover:shadow-lg transition block">
              <h3 className="font-bold text-lg mb-1">EPT</h3>
              <p className="text-gray-500 text-sm mb-3">Ecole Polytechnique de Thies</p>
              <span className="text-blue-900 text-sm font-medium">ept.edu.sn</span>
            </a>
            <a href="https://esp.sn/" target="_blank" rel="noopener noreferrer" className="border rounded-2xl p-6 bg-white hover:shadow-lg transition block">
              <h3 className="font-bold text-lg mb-1">ESP</h3>
              <p className="text-gray-500 text-sm mb-3">Ecole Superieure Polytechnique de Dakar</p>
              <span className="text-blue-900 text-sm font-medium">esp.sn</span>
            </a>
            <a href="https://uam.sn/" target="_blank" rel="noopener noreferrer" className="border rounded-2xl p-6 bg-white hover:shadow-lg transition block">
              <h3 className="font-bold text-lg mb-1">UAM</h3>
              <p className="text-gray-500 text-sm mb-3">Universite Amadou Mahtar Mbow, Diamniadio</p>
              <span className="text-blue-900 text-sm font-medium">uam.sn</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <a href="https://campusen.sn/" target="_blank" rel="noopener noreferrer" className="border rounded-2xl p-6 bg-white hover:shadow-lg transition block">
              <h3 className="font-bold text-lg mb-1">Campusen</h3>
              <p className="text-gray-500 text-sm mb-3">Plateforme officielle d'orientation post-bac au Senegal</p>
              <span className="text-blue-900 text-sm font-medium">campusen.sn</span>
            </a>
            <a href="https://www.ucad.sn/" target="_blank" rel="noopener noreferrer" className="border rounded-2xl p-6 bg-white hover:shadow-lg transition block">
              <h3 className="font-bold text-lg mb-1">UCAD</h3>
              <p className="text-gray-500 text-sm mb-3">Universite Cheikh Anta Diop de Dakar</p>
              <span className="text-blue-900 text-sm font-medium">ucad.sn</span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-bold">Filieres populaires</h2>
              <p className="text-gray-500 mt-1">Les domaines les plus recherches</p>
            </div>
            <a href="/filieres" className="text-blue-900 font-medium text-sm hover:underline">Tout voir</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/filieres" className="rounded-2xl overflow-hidden bg-white border hover:shadow-xl transition block">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop" className="w-full h-44 object-cover" alt="Informatique" />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">Informatique</h3>
                <p className="text-gray-500 text-sm">Developpement, reseaux, intelligence artificielle</p>
              </div>
            </a>
            <a href="/filieres" className="rounded-2xl overflow-hidden bg-white border hover:shadow-xl transition block">
              <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=300&fit=crop" className="w-full h-44 object-cover" alt="Medecine" />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">Medecine</h3>
                <p className="text-gray-500 text-sm">Medecin, pharmacien, sage-femme</p>
              </div>
            </a>
            <a href="/filieres" className="rounded-2xl overflow-hidden bg-white border hover:shadow-xl transition block">
              <img src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=500&h=300&fit=crop" className="w-full h-44 object-cover" alt="Droit" />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-1">Droit</h3>
                <p className="text-gray-500 text-sm">Avocat, magistrat, juriste</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 px-8 text-center bg-blue-900 text-white">
        <h2 className="text-3xl font-bold mb-4">Pret a trouver ta voie ?</h2>
        <p className="text-blue-200 mb-8 max-w-lg mx-auto">
          Le test prend moins de deux minutes et te donne des pistes concretes pour la suite.
        </p>
        <a href="/test" className="bg-white text-blue-900 font-bold px-8 py-4 rounded-full inline-block hover:bg-blue-50 transition">
          Commencer maintenant
        </a>
      </section>

      <footer className="py-8 px-8 text-center text-gray-400 text-sm">
        OrientationSN — Un site cree par Cheikh Sadibou pour aider les bacheliers senegalais
      </footer>
    </main>
  )
}