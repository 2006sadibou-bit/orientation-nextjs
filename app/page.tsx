"use client"

import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-700 to-cyan-500 text-lg font-black text-white shadow-lg">
              O
            </div>

            <div>
              <p className="text-lg font-black tracking-tight">
                Orientation<span className="text-indigo-700">SN</span>
              </p>
              <p className="text-[10px] text-slate-500">
                Ton avenir commence ici 🇸🇳
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold md:flex">
            <Link href="/" className="text-indigo-700 hover:text-indigo-900">
              Accueil
            </Link>

            <Link href="/filieres" className="text-slate-600 hover:text-indigo-700">
              Filières
            </Link>

            <Link href="/universites" className="text-slate-600 hover:text-indigo-700">
              Universités
            </Link>

            <Link href="/conseils" className="text-slate-600 hover:text-indigo-700">
              Conseils
            </Link>

            <Link href="/concours" className="text-slate-600 hover:text-indigo-700">
              Concours
            </Link>
          </nav>

          <Link
            href="/test"
            className="rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-indigo-800"
          >
            Faire le test
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=2000&q=85')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-indigo-950/90 to-indigo-900/60" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8 lg:py-32">

          <div>
            <div className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
              🇸🇳 La plateforme d'orientation des étudiants sénégalais
            </div>

            <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              Construis ton avenir
              <span className="block bg-gradient-to-r from-cyan-300 via-white to-indigo-300 bg-clip-text text-transparent">
                au Sénégal.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-slate-200 sm:text-lg">
              Découvre les filières, universités, grandes écoles et concours
              disponibles au Sénégal. Fais les bons choix après ton bac et
              construis un projet d'avenir qui te ressemble.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/test"
                className="rounded-xl bg-white px-6 py-3.5 text-center text-sm font-extrabold text-indigo-800 shadow-xl hover:bg-slate-100"
              >
                🎯 Trouver ma filière
              </Link>

              <Link
                href="/universites"
                className="rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-center text-sm font-extrabold text-white backdrop-blur hover:bg-white/20"
              >
                Découvrir les universités
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-7">

              <div>
                <p className="text-2xl font-black text-white">+50</p>
                <p className="mt-1 text-xs text-slate-300">Filières</p>
              </div>

              <div>
                <p className="text-2xl font-black text-white">+20</p>
                <p className="mt-1 text-xs text-slate-300">Établissements</p>
              </div>

              <div>
                <p className="text-2xl font-black text-white">🇸🇳</p>
                <p className="mt-1 text-xs text-slate-300">Sénégal</p>
              </div>

            </div>
          </div>

          <div className="hidden lg:block">
            <div className="ml-auto max-w-md rounded-3xl border border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-xl">

              <div className="overflow-hidden rounded-2xl bg-white">

                

                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Orientation
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Ton projet commence maintenant
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    Trouve une formation adaptée à tes ambitions et découvre
                    les possibilités qui s'offrent à toi.
                  </p>

                  <Link
                    href="/test"
                    className="mt-5 block rounded-xl bg-indigo-700 px-5 py-3 text-center text-sm font-bold text-white hover:bg-indigo-800"
                  >
                    Faire le test
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
      {/* SERVICES */}
      <section className="bg-slate-50 px-5 py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-2xl">
            <span className="text-sm font-black uppercase tracking-widest text-indigo-700">
              OrientationSN
            </span>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Tout ce qu'il te faut après le bac
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Une plateforme pensée pour les lycéens et étudiants qui veulent
              comprendre leurs possibilités et préparer leur avenir.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <Link
              href="/filieres"
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-2xl">
                📚
              </div>

              <h3 className="mt-6 text-lg font-black">
                Filières
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Explore les formations et découvre les domaines qui
                correspondent à ton profil.
              </p>

              <p className="mt-5 text-sm font-bold text-indigo-700">
                Explorer →
              </p>
            </Link>

            <Link
              href="/universites"
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-2xl">
                🏫
              </div>

              <h3 className="mt-6 text-lg font-black">
                Universités
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Découvre les universités et établissements d'enseignement
                supérieur au Sénégal.
              </p>

              <p className="mt-5 text-sm font-bold text-indigo-700">
                Découvrir →
              </p>
            </Link>

            <Link
              href="/concours"
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-2xl">
                🏆
              </div>

              <h3 className="mt-6 text-lg font-black">
                Concours
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Retrouve les grandes écoles et les concours accessibles aux
                étudiants sénégalais.
              </p>

              <p className="mt-5 text-sm font-bold text-indigo-700">
                Voir les concours →
              </p>
            </Link>

            <Link
              href="/conseils"
              className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                💡
              </div>

              <h3 className="mt-6 text-lg font-black">
                Conseils
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Méthodes et informations utiles pour réussir ton parcours
                après le bac.
              </p>

              <p className="mt-5 text-sm font-bold text-indigo-700">
                Lire les conseils →
              </p>
            </Link>

          </div>
        </div>
      </section>

      {/* SECTION SÉNÉGAL */}
      <section className="bg-white px-5 py-20 lg:px-8">

        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          <div className="relative">

            <div className="overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=85"
                alt="Jeunes étudiants"
                className="h-[430px] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -right-4 rounded-2xl bg-white p-5 shadow-xl sm:-right-6">
              <p className="text-2xl font-black text-indigo-700">
                Nouveaux Bacheliers
              </p>

              <p className="mt-1 text-sm font-bold">
                
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Pour les étudiants sénégalais
              </p>
            </div>

          </div>

          <div>

            <span className="text-sm font-black uppercase tracking-widest text-indigo-700">
              Notre mission
            </span>

            <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
              Une orientation pensée pour les réalités du Sénégal
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              Au Sénégal, choisir une filière après le bac peut être difficile.
              Entre les universités, les écoles, les concours et les différentes
              formations, il est facile de se perdre.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              OrientationSN rassemble ces informations dans une plateforme
              moderne, simple et accessible afin de t'aider à prendre une
              décision réfléchie.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-xl">🎯</div>
                <h3 className="mt-3 font-black">
                  Choix personnalisé
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Des recommandations adaptées à ton profil.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <div className="text-xl">🇸🇳</div>
                <h3 className="mt-3 font-black">
                  Contexte sénégalais
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Des informations centrées sur les études au Sénégal.
                </p>
              </div>

            </div>
          </div>

        </div>
      </section>
      {/* CHEIKH ANTAn DIOP */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-950 via-indigo-900 to-slate-950 px-5 py-20 text-white lg:px-8">

        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

          <div>

            <span className="text-sm font-black uppercase tracking-[0.1em] text-cyan-50">
              
            </span>

            <h2 className="mt-1 text-1xl font-black sm:text-1xl lg:text-1xl">
              Je me nomme Cheikh Sadibou
            </h2>

            Elève ingénieur en génie informatique à l'école supérieur polytechnique
            de Diamniadio. J'ai crée ce site pour venir en aide aux nouveaux bacheliers
            vers une orientation meilleur. Partagez svp le site
            
            <p className="mt-5 text-lg font-semibold text-indigo-100">
              Science • Savoir • Excellence 
            </p>

            <p className="mt-6 max-w-xl leading-8 text-indigo-100/80">
            
            </p>

            <div className="mt-8 flex flex-wrap gap-3">

              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold">
                🔬 Science
              </span>

              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-bold">
                📖 Éducation
              </span>

             
             
            </div>
          </div>

          <div className="relative">

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur">

              <img
                src="/photo-cheikh.jpg"
                alt="Cheikh Anta Diop"
                className="h-[380px] w-full rounded-2xl object-cover"
              />

            </div>

          </div>

        </div>
      </section>

      {/* POURQUOI ORIENTATIONSN */}
      <section className="bg-slate-50 px-5 py-20 lg:px-8">

        <div className="mx-auto max-w-7xl">

          <div className="mx-auto max-w-2xl text-center">

            <span className="text-sm font-black uppercase tracking-widest text-indigo-700">
              Pourquoi OrientationSN ?
            </span>

            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Plus qu'un simple site d'information
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Nous voulons rendre l'orientation scolaire et universitaire plus
              simple, plus claire et plus accessible.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-2xl">
                🧭
              </div>

              <h3 className="mt-6 text-xl font-black">
                Mieux s'orienter
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Comprends les différentes possibilités avant de choisir ton
                parcours universitaire ou professionnel.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-100 text-2xl">
                📊
              </div>

              <h3 className="mt-6 text-xl font-black">
                Comparer les possibilités
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Compare les filières, établissements et concours afin de
                mieux comprendre tes options.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                🚀
              </div>

              <h3 className="mt-6 text-xl font-black">
                Préparer son avenir
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Passe de l'incertitude à un véritable projet d'études avec des
                informations utiles et accessibles.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CHIFFRES */}
      <section className="bg-white px-5 py-16 lg:px-8">

        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-3xl bg-indigo-50 p-7 text-center">
            <p className="text-4xl font-black text-indigo-700">+50</p>
            <p className="mt-2 font-semibold text-slate-700">
              Filières à découvrir
            </p>
          </div>

          <div className="rounded-3xl bg-cyan-50 p-7 text-center">
            <p className="text-4xl font-black text-cyan-700">+20</p>
            <p className="mt-2 font-semibold text-slate-700">
              Établissements
            </p>
          </div>

          <div className="rounded-3xl bg-amber-50 p-7 text-center">
            <p className="text-4xl font-black text-amber-600">🏆</p>
            <p className="mt-2 font-semibold text-slate-700">
              Concours
            </p>
          </div>

          <div className="rounded-3xl bg-emerald-50 p-7 text-center">
            <p className="text-4xl font-black text-emerald-600">🇸🇳</p>
            <p className="mt-2 font-semibold text-slate-700">
              100% Sénégal
            </p>
          </div>

        </div>
      </section>
      {/* CTA FINAL */}
      <section className="px-5 py-20 lg:px-8">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-700 via-violet-600 to-cyan-500 p-8 text-center shadow-2xl sm:p-12 lg:p-16">

          <p className="text-sm font-black uppercase tracking-[0.2em] text-white/80">
            Ton avenir commence maintenant
          </p>

          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl lg:text-5xl">
            Tu ne sais pas encore quelle voie choisir ?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-white/85">
            Réponds à quelques questions et découvre les filières qui peuvent
            correspondre à ton profil.
          </p>

          <Link
            href="/test"
            className="mt-8 inline-flex rounded-xl bg-white px-7 py-3.5 text-sm font-black text-indigo-700 shadow-xl hover:bg-slate-100"
          >
            🎓 Commencer mon test d'orientation
          </Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-slate-950 px-5 py-10 text-white lg:px-8">

        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 md:flex-row">

          <div>
            <p className="text-xl font-black">
              Orientation<span className="text-cyan-400">SN</span>
            </p>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Une plateforme dédiée à l'orientation des lycéens et étudiants
              au Sénégal.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-sm text-slate-400">

            <Link href="/filieres" className="hover:text-white">
              Filières
            </Link>

            <Link href="/universites" className="hover:text-white">
              Universités
            </Link>

            <Link href="/concours" className="hover:text-white">
              Concours
            </Link>

            <Link href="/conseils" className="hover:text-white">
              Conseils
            </Link>

          </div>

        </div>

        <div className="mx-auto mt-8 max-w-7xl border-t border-white/10 pt-6 text-xs text-slate-500">
          © 2026 OrientationSN — Orientation et information au Sénégal 🇸🇳
        </div>

      </footer>

    </main>
  )
}