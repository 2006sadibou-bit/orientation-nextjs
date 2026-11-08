"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";

// =======================================================
// 1. TYPES ET INTERFACES
// =======================================================

type Message = {
    role: "user" | "assistant";
    content: string;
};

type ProfilOrientation = {
    serie: string;

    notes: {
        mathematiques: number | null;
        physiqueChimie: number | null;
        svt: number | null;
        francais: number | null;
        philosophie: number | null;
        anglais: number | null;
        histoireGeographie: number | null;
    };

    moyenneBac: number;
    niveau: string;
    mention: string;

    filieresRecommandees: string[];
    concoursEnvisageables: string[];

    dateTest: string;
};

// =======================================================
// 2. COMPOSANT PRINCIPAL SAMA AI
// =======================================================

export default function AssistantIA() {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = useState("");

    const [profil, setProfil] = useState<ProfilOrientation | null>(null);

    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content:
                "Bonjour ! Je suis Sama AI, ton assistant intelligent d'OrientationSN. Pose-moi tes questions sur les études, les filières, les concours et l'orientation après le bac. Comment puis-je t'aider aujourd'hui ?",
        },
    ]);

    // ===================================================
    // 3. RÉCUPÉRATION DU PROFIL D'ORIENTATION
    // ===================================================

    useEffect(() => {
        chargerProfil();
    }, []);

    function chargerProfil() {

        try {

            const donnees = localStorage.getItem("orientationSN_profil");

            if (donnees) {

                const profilEnregistre: ProfilOrientation = JSON.parse(donnees);

                setProfil(profilEnregistre);

            } else {

                setProfil(null);

            }

        } catch (error) {

            console.error(
                "Erreur de récupération du profil :",
                error
            );

            setProfil(null);

        }
    }

    // ===================================================
    // 4. ENVOI DU MESSAGE À SAMA AI
    // ===================================================

    async function envoyerMessage(e: FormEvent<HTMLFormElement>) {

        e.preventDefault();

        if (!question.trim() || loading) return;

        const nouveauMessage: Message = {
            role: "user",
            content: question.trim(),
        };

        const historique = [...messages, nouveauMessage];

        setMessages(historique);
        setQuestion("");
        setLoading(true);

        try {

            // Récupération du profil le plus récent

            let profilActuel = profil;

            try {

                const donnees = localStorage.getItem("orientationSN_profil");

                if (donnees) {

                    profilActuel = JSON.parse(
                        donnees
                    ) as ProfilOrientation;

                    setProfil(profilActuel);

                }

            } catch (error) {

                console.error(
                    "Erreur de lecture du profil :",
                    error
                );

            }

            // Appel de l'API Sama AI

            const response = await fetch("/api/assistant", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    messages: historique,
                    profil: profilActuel,
                }),

            });

            const data = await response.json();

            if (!response.ok) {

                throw new Error(
                    data.error || "Erreur de communication"
                );

            }

            if (typeof data.answer !== "string") {

                throw new Error(
                    "La réponse de Sama AI est invalide."
                );

            }

            setMessages([

                ...historique,

                {
                    role: "assistant",
                    content: data.answer,
                },

            ]);

        } catch (error) {

            console.error("Erreur Sama AI :", error);

            setMessages([

                ...historique,

                {
                    role: "assistant",
                    content:
                        "Désolé, une erreur est survenue. Réessaie dans quelques instants.",
                },

            ]);

        } finally {

            setLoading(false);

        }
    }

    // ===================================================
    // 5. AFFICHAGE PROFESSIONNEL DES RÉPONSES
    // ===================================================

    function afficherReponse(contenu: string) {

        return (

            <ReactMarkdown

                remarkPlugins={[
                    remarkGfm,
                    remarkMath,
                ]}

                rehypePlugins={[
                    rehypeKatex,
                ]}

                components={{

                    // Titres principaux

                    h1: ({ children }) => (
                        <h1 className="mb-3 mt-4 text-lg font-bold text-indigo-800">
                            {children}
                        </h1>
                    ),

                    h2: ({ children }) => (
                        <h2 className="mb-2 mt-4 border-b border-indigo-100 pb-1 text-base font-bold text-indigo-800">
                            {children}
                        </h2>
                    ),

                    h3: ({ children }) => (
                        <h3 className="mb-2 mt-3 text-sm font-bold text-indigo-700">
                            {children}
                        </h3>
                    ),

                    // Paragraphes

                    p: ({ children }) => (
                        <p className="mb-3 text-sm leading-7 text-gray-700">
                            {children}
                        </p>
                    ),

                    // Texte en gras

                    strong: ({ children }) => (
                        <strong className="font-bold text-indigo-900">
                            {children}
                        </strong>
                    ),

                    // Texte en italique

                    em: ({ children }) => (
                        <em className="italic text-gray-700">
                            {children}
                        </em>
                    ),

                    // Listes

                    ul: ({ children }) => (
                        <ul className="mb-3 ml-5 list-disc space-y-2 text-sm leading-6 text-gray-700 marker:text-indigo-600">
                            {children}
                        </ul>
                    ),

                    ol: ({ children }) => (
                        <ol className="mb-3 ml-5 list-decimal space-y-2 text-sm leading-6 text-gray-700 marker:font-bold marker:text-indigo-700">
                            {children}
                        </ol>
                    ),

                    li: ({ children }) => (
                        <li className="pl-1">
                            {children}
                        </li>
                    ),

                    // Citations

                    blockquote: ({ children }) => (
                        <blockquote className="my-3 border-l-4 border-indigo-500 bg-indigo-50 px-3 py-2 text-sm text-gray-700">
                            {children}
                        </blockquote>
                    ),

                    // Liens

                    a: ({ children, href }) => {

                        const lienValide =
                            href?.startsWith("https://") ||
                            href?.startsWith("http://");

                        return (

                            <a
                                href={lienValide ? href : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-800"
                            >
                                {children}
                            </a>

                        );
                    },

                    // Blocs de code

                    pre: ({ children }) => (
                        <pre className="my-3 overflow-x-auto rounded-xl bg-gray-900 p-3 text-xs leading-6 text-green-300">
                            {children}
                        </pre>
                    ),

                    code: ({ children, className }) => {

                        const isBlocCode =
                            Boolean(className);

                        return (

                            <code
                                className={
                                    isBlocCode
                                        ? className
                                        : "rounded bg-indigo-50 px-1.5 py-0.5 font-mono text-xs text-indigo-800"
                                }
                            >
                                {children}
                            </code>

                        );
                    },

                    // Tableaux

                    table: ({ children }) => (
                        <div className="my-3 overflow-x-auto rounded-lg border border-gray-200">
                            <table className="w-full border-collapse text-left text-xs">
                                {children}
                            </table>
                        </div>
                    ),

                    thead: ({ children }) => (
                        <thead className="bg-indigo-100 text-indigo-900">
                            {children}
                        </thead>
                    ),

                    th: ({ children }) => (
                        <th className="border border-indigo-100 px-3 py-2 font-bold">
                            {children}
                        </th>
                    ),

                    td: ({ children }) => (
                        <td className="border border-gray-200 px-3 py-2 text-gray-700">
                            {children}
                        </td>
                    ),

                    // Ligne horizontale

                    hr: () => (
                        <hr className="my-4 border-gray-200" />
                    ),

                }}

            >
                {contenu}
            </ReactMarkdown>

        );
    }

    // ===================================================
    // 6. INTERFACE SAMA AI
    // ===================================================

    return (

        <>

            {/* =================================================
                BOUTON ROBOT
            ================================================= */}

            <button

                onClick={() => {

                    chargerProfil();

                    setOpen(!open);

                }}

                aria-label="Ouvrir Sama AI"

                className="fixed top-3 right-36 md:right-44 z-[100] flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-700 to-violet-600 px-4 py-3 text-white shadow-lg transition hover:scale-105"

            >

                <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                >

                    <rect
                        x="3"
                        y="7"
                        width="18"
                        height="13"
                        rx="3"
                    />

                    <path d="M12 3v4M8 12h.01M16 12h.01M9 16h6" />

                    <path d="M2 12h1M21 12h1" />

                </svg>

                <span className="font-semibold">
                    Sama AI
                </span>

            </button>


            {/* =================================================
                FENÊTRE DE DISCUSSION
            ================================================= */}

            {open && (

                <div className="fixed right-4 top-20 z-[99] flex h-[min(600px,80vh)] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl">


                    {/* =========================================
                        EN-TÊTE
                    ========================================= */}

                    <div className="flex items-center justify-between bg-indigo-700 p-4 text-white">

                        <div>

                            <h2 className="text-lg font-bold">
                                Sama AI
                            </h2>

                            <p className="text-xs text-indigo-100">
                                Assistant intelligent • En ligne
                            </p>

                        </div>

                        <button

                            onClick={() => setOpen(false)}

                            className="text-2xl transition hover:text-gray-300"

                            aria-label="Fermer"

                        >
                            ×

                        </button>

                    </div>


                    {/* =========================================
                        PROFIL DE L'ÉTUDIANT
                    ========================================= */}

                    {profil && (

                        <div className="border-b bg-indigo-50 px-4 py-2">

                            <p className="text-xs font-semibold text-indigo-800">
                                Profil d'orientation chargé
                            </p>

                            <p className="text-xs text-indigo-700">

                                Série {profil.serie}

                                {" • "}

                                Moyenne : {profil.moyenneBac}/20

                                {" • "}

                                {profil.mention}

                            </p>

                        </div>

                    )}

                    {!profil && (

                        <div className="border-b bg-gray-50 px-4 py-2">

                            <p className="text-xs text-gray-500">

                                Aucun profil d'orientation enregistré.
                                Tu peux faire le test sur OrientationSN.

                            </p>

                        </div>

                    )}


                    {/* =========================================
                        ZONE DES MESSAGES
                    ========================================= */}

                    <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-4">

                        {messages.map((message, index) => (

                            <div

                                key={index}

                                className={`flex ${message.role === "user"
                                        ? "justify-end"
                                        : "justify-start"
                                    }`}

                            >

                                <div

                                    className={`max-w-[90%] overflow-hidden rounded-2xl p-3 text-sm ${message.role === "user"
                                            ? "whitespace-pre-wrap bg-indigo-700 text-white shadow"
                                            : "bg-white text-gray-800 shadow"
                                        }`}

                                >

                                    {message.role === "user" ? (

                                        <div className="whitespace-pre-wrap leading-6">
                                            {message.content}
                                        </div>

                                    ) : (

                                        afficherReponse(message.content)

                                    )}

                                </div>

                            </div>

                        ))}


                        {/* =====================================
                            INDICATEUR DE CHARGEMENT
                        ===================================== */}

                        {loading && (

                            <div className="flex justify-start">

                                <div className="rounded-2xl bg-white px-4 py-3 text-sm text-gray-500 shadow">

                                    <div className="flex items-center gap-2">

                                        <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600" />

                                        <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:150ms]" />

                                        <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-600 [animation-delay:300ms]" />

                                        <span className="ml-1">
                                            Sama AI réfléchit...
                                        </span>

                                    </div>

                                </div>

                            </div>

                        )}

                    </div>


                    {/* =========================================
                        CHAMP DE SAISIE
                    ========================================= */}

                    <form

                        onSubmit={envoyerMessage}

                        className="flex gap-2 border-t bg-white p-3"

                    >

                        <input

                            value={question}

                            onChange={(e) => setQuestion(e.target.value)}

                            placeholder="Pose ta question..."

                            className="min-w-0 flex-1 rounded-full border px-4 py-3 text-sm outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"

                        />

                        <button

                            type="submit"

                            disabled={loading || !question.trim()}

                            className="rounded-full bg-indigo-700 px-4 text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-50"

                        >

                            ➤

                        </button>

                    </form>

                </div>

            )}

        </>

    );
}