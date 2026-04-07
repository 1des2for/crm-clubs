/* =========================================================
   BLOC 1 - IMPORTS
========================================================= */

import { useState, useEffect } from "react";
import logo from "./logo.jpg";
import { supabase } from "./supabaseClient";
const VERSION = "v4.1.0";
/* =========================================================
   BLOC 2 - DÉBUT COMPOSANT + UTILISATEURS
========================================================= */
function App() {
/* =========================================================
   BLOC 2A - PROFIL UTILISATEUR SUPABASE
========================================================= */
async function chargerProfilUtilisateurParId(userId) {
  if (!userId) return null;

  const { data, error } = await supabase
    .from("utilisateurs_profils")
    .select("*")
    .eq("id", userId)
    .eq("actif", true)
    .single();

  if (error) {
    console.log("ERREUR FETCH PROFIL :", error);
    return null;
  }

  return data || null;
}

async function chargerProfilUtilisateurParUsername(usernameSaisi) {
  const usernameNettoye = String(usernameSaisi || "").trim().toLowerCase();

  if (!usernameNettoye) return null;

  const { data, error } = await supabase
    .from("utilisateurs_profils")
    .select("*")
    .eq("username", usernameNettoye)
    .eq("actif", true)
    .single();

  if (error) {
    console.log("ERREUR FETCH PROFIL USERNAME :", error);
    return null;
  }

  return data || null;
}
 /* =========================================================
   BLOC 3 - FONCTIONS OUTILS DATE ET PLANNING
========================================================= */ 
function getDateJourPlanning(jour) {
  const jours = {
    Lundi: 1,
    Mardi: 2,
    Mercredi: 3,
    Jeudi: 4,
    Vendredi: 5,
    Samedi: 6
  };

  const aujourdHui = new Date();
  const copie = new Date(aujourdHui);
  const jourActuel = copie.getDay();
  const jourCible = jours[jour] || 1;

  const diff = jourActuel === 0
    ? jourCible - 7
    : jourCible - jourActuel;

  copie.setDate(copie.getDate() + diff);

  const annee = copie.getFullYear();
  const mois = String(copie.getMonth() + 1).padStart(2, "0");
  const jourDuMois = String(copie.getDate()).padStart(2, "0");

  return `${annee}-${mois}-${jourDuMois}`;
}
/* =========================================================
   BLOC 4 - STATES PRINCIPAUX
========================================================= */
  const [planningDate, setPlanningDate] = useState(getDateJourPlanning("Lundi"));
  const [planningHeure, setPlanningHeure] = useState("10:00");
  const [planningDuree, setPlanningDuree] = useState("1h");
  const [actionsClub, setActionsClub] = useState([]);
  const [historiquesClub, setHistoriquesClub] = useState([]);
  const [toutesActions, setToutesActions] = useState([]);
  const [planning, setPlanning] = useState([]);
  const [objectifs, setObjectifs] = useState([]);
  const [allContacts, setAllContacts] = useState([]);
const [magasinsClub, setMagasinsClub] = useState([]);
const [contactsClub, setContactsClub] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userConnected, setUserConnected] = useState(null);
  const [screen, setScreen] = useState("dashboard");
  const [clubSelected, setClubSelected] = useState(null);
  const [clubs, setClubs] = useState([]);

  const [sportsOptions, setSportsOptions] = useState(() => {
    try {
      const data = localStorage.getItem("sportsOptions");
      return data
        ? JSON.parse(data)
        : [
            "Football",
            "Basket",
            "Rugby",
            "Running",
            "Handball",
            "Tennis",
            "Volley",
            "Natation",
            "Cyclisme",
            "Multisport"
          ];
    } catch (e) {
      console.log("ERREUR localStorage sportsOptions :", e);
      return [
        "Football",
        "Basket",
        "Rugby",
        "Running",
        "Handball",
        "Tennis",
        "Volley",
        "Natation",
        "Cyclisme",
        "Multisport"
      ];
    }
  });

  const [historiqueTypeOptions, setHistoriqueTypeOptions] = useState(() => {
    try {
      const data = localStorage.getItem("historiqueTypeOptions");
      return data
        ? JSON.parse(data)
        : ["Concurrence", "Équipement saison", "Observation"];
    } catch (e) {
      console.log("ERREUR localStorage historiqueTypeOptions :", e);
      return ["Concurrence", "Équipement saison", "Observation"];
    }
  });

  const [nomClub, setNomClub] = useState("");
  const [villeClub, setVilleClub] = useState("");
  const [adherentsClub, setAdherentsClub] = useState("");
  const [potentielClub, setPotentielClub] = useState("");
  const [sportClub, setSportClub] = useState("");
  const [nouveauSportClub, setNouveauSportClub] = useState("");

  const [magasinsCreation, setMagasinsCreation] = useState([
    { nom: "L’Arbresle", taux: "100" }
  ]);

  const [contactNom, setContactNom] = useState("");
  const [contactFonction, setContactFonction] = useState("");
  const [contactTelephone, setContactTelephone] = useState("");
  const [contactMail, setContactMail] = useState("");
  const [piecesClub, setPiecesClub] = useState([]);

  const aujourdHui = new Date();
  const dateDuJourInput = aujourdHui.toISOString().split("T")[0];
  const moisDuJourInput = `${aujourdHui.getFullYear()}-${String(
    aujourdHui.getMonth() + 1
  ).padStart(2, "0")}`;

  const [actionType, setActionType] = useState("Visite club");
  const [actionDate, setActionDate] = useState(dateDuJourInput);
  const [actionCommentaire, setActionCommentaire] = useState("");
  const [actionMontantTTC, setActionMontantTTC] = useState("");

  const [historiqueType, setHistoriqueType] = useState("Concurrence");
  const [historiqueNouveauType, setHistoriqueNouveauType] = useState("");
  const [historiqueDate, setHistoriqueDate] = useState(moisDuJourInput);
  const [historiqueCommentaire, setHistoriqueCommentaire] = useState("");

  const [planningJour, setPlanningJour] = useState("Lundi");
  const [planningType, setPlanningType] = useState("Visite club");
  const [planningCommentaire, setPlanningCommentaire] = useState("");
  const [planningFiltreCommercial, setPlanningFiltreCommercial] = useState("Tous");
const [planningFiltreSport, setPlanningFiltreSport] = useState("Tous les sports");
const [planningRechercheClub, setPlanningRechercheClub] = useState("");
const [filtrePlanningPeriode, setFiltrePlanningPeriode] = useState("Semaine en cours");
const [planningMoisFiltre, setPlanningMoisFiltre] = useState(moisDuJourInput);

  const [filtreCommercial, setFiltreCommercial] = useState("Moi");
  const [filtrePeriode, setFiltrePeriode] = useState("Toutes périodes");
  const [modeObjectif, setModeObjectif] = useState("Exercice fiscal");
  const [exerciceSelectionne, setExerciceSelectionne] = useState("2026");
  const [dateDepuis, setDateDepuis] = useState(dateDuJourInput);
  const [moisSelectionne, setMoisSelectionne] = useState(moisDuJourInput);
  const [filtreSport, setFiltreSport] = useState("Tous les sports");
  const [filtreFinancier, setFiltreFinancier] = useState("Tous");
  const [filtreBlocDashboard, setFiltreBlocDashboard] = useState("Tous");
  const [pieceNom, setPieceNom] = useState("");
  const [pieceType, setPieceType] = useState("");
  const [pieceData, setPieceData] = useState("");

  const [recherche, setRecherche] = useState("");

  const [alerteDoublonClub, setAlerteDoublonClub] = useState("");
  const [alerteDoublonContact, setAlerteDoublonContact] = useState("");
  
  const [objectifCommercialSelection, setObjectifCommercialSelection] = useState("Bruno");
  const [objectifExerciceSelection, setObjectifExerciceSelection] = useState("2026");
/* =========================================================
   BLOC 5 - USEEFFECTS DE SYNCHRO LOCALE
========================================================= */
useEffect(() => {
  setPlanningDate(getDateJourPlanning(planningJour));
}, [planningJour]);

useEffect(() => {
  localStorage.setItem("sportsOptions", JSON.stringify(sportsOptions));
}, [sportsOptions]);

useEffect(() => {
  localStorage.setItem(
    "historiqueTypeOptions",
    JSON.stringify(historiqueTypeOptions)
  );
}, [historiqueTypeOptions]);

useEffect(() => {
  const restaurerSession = async () => {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session?.user?.id) return;

    const profil = await chargerProfilUtilisateurParId(session.user.id);

    if (profil) {
      setUserConnected(profil);
      setFiltreCommercial(profil.nom || "Moi");
    }
  };

  restaurerSession();

  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (!session?.user?.id) {
      setUserConnected(null);
      setFiltreCommercial("Moi");
      return;
    }

    const profil = await chargerProfilUtilisateurParId(session.user.id);

    if (profil) {
      setUserConnected(profil);
      setFiltreCommercial(profil.nom || "Moi");
    }
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);
/* =========================================================
   BLOC 6 - CHARGEMENT DES DONNÉES SUPABASE
========================================================= */
const chargerPiecesClub = async (clubId) => {
  if (!clubId) {
    setPiecesClub([]);
    return;
  }

  const { data, error } = await supabase
    .from("pieces_jointes")
    .select("*")
    .eq("club_id", clubId)
    .order("created_at", { ascending: false });

  if (error) {
    console.log("ERREUR FETCH PIECES :", error);
    setPiecesClub([]);
    return;
  }

  setPiecesClub(data || []);
};

const chargerClubs = async () => {
  const { data, error } = await supabase.from("clubs").select("*");

  if (error) {
    console.log("ERROR FETCH CLUBS :", error);
    setClubs([]);
    return;
  }

  setClubs(data || []);
};

const chargerTousContacts = async () => {
  const { data, error } = await supabase.from("contacts").select("*");

  if (error) {
    console.log("ERREUR FETCH TOUS CONTACTS :", error);
    setAllContacts([]);
    return;
  }

  setAllContacts(data || []);
};

const chargerToutesActions = async () => {
  const { data, error } = await supabase.from("actions").select("*");

  if (error) {
    console.log("ERREUR FETCH TOUTES ACTIONS :", error);
    setToutesActions([]);
    return;
  }

  setToutesActions(data || []);
};

const chargerPlanning = async () => {
  const { data, error } = await supabase
    .from("planning")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log("ERREUR FETCH PLANNING :", error);
    setPlanning([]);
    return;
  }

  setPlanning(data || []);
};

const chargerObjectifs = async () => {
  const { data, error } = await supabase
    .from("objectifs")
    .select("*")
    .order("annee_reference", { ascending: false })
    .order("mois", { ascending: true });

  if (error) {
    console.log("ERREUR FETCH OBJECTIFS :", error);
    setObjectifs([]);
    return;
  }

  setObjectifs(data || []);
};

const chargerMagasinsClub = async (clubId) => {
  if (!clubId) {
    setMagasinsClub([]);
    return;
  }

  const { data, error } = await supabase
    .from("magasins_club")
    .select("*")
    .eq("club_id", clubId);

  if (error) {
    console.log("ERREUR FETCH MAGASINS :", error);
    setMagasinsClub([]);
    return;
  }

  setMagasinsClub(data || []);
};

const chargerContactsClub = async (clubId) => {
  if (!clubId) {
    setContactsClub([]);
    return;
  }

  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("club_id", clubId);

  if (error) {
    console.log("ERREUR FETCH CONTACTS :", error);
    setContactsClub([]);
    return;
  }

  setContactsClub(data || []);
};

const chargerActionsClub = async (clubId) => {
  if (!clubId) {
    setActionsClub([]);
    return;
  }

  const { data, error } = await supabase
    .from("actions")
    .select("*")
    .eq("club_id", clubId)
    .order("date", { ascending: false });

  if (error) {
    console.log("ERREUR FETCH ACTIONS :", error);
    setActionsClub([]);
    return;
  }

  setActionsClub(data || []);
};

const chargerHistoriquesClub = async (clubId) => {
  if (!clubId) {
    setHistoriquesClub([]);
    return;
  }

  const { data, error } = await supabase
    .from("historiques")
    .select("*")
    .eq("club_id", clubId)
    .order("date", { ascending: false });

  if (error) {
    console.log("ERREUR FETCH HISTORIQUES :", error);
    setHistoriquesClub([]);
    return;
  }

  setHistoriquesClub(data || []);
};

const chargerDetailClub = async (club) => {
  setClubSelected(club);

  const clubId = club?.id || club?.identifiant;

  await Promise.all([
    chargerMagasinsClub(clubId),
    chargerContactsClub(clubId),
    chargerActionsClub(clubId),
    chargerHistoriquesClub(clubId),
    chargerPiecesClub(clubId)
  ]);
};
/* =========================================================
   BLOC 7 - CHARGEMENT INITIAL APPLICATION
========================================================= */
useEffect(() => {
  chargerClubs();
  chargerTousContacts();
  chargerToutesActions();
  chargerPlanning();
  chargerObjectifs();
}, []);
/* =========================================================
   BLOC 8 - CONNEXION ET ACTIONS GLOBALES
========================================================= */
  const supprimerContact = async (idContact) => {
    const confirmation = window.confirm(
      "Voulez-vous vraiment supprimer ce contact ?"
    );
    if (!confirmation) return;

    const { error } = await supabase
      .from("contacts")
      .delete()
      .eq("id", idContact);

    if (error) {
      console.log("ERREUR DELETE CONTACT :", error);
      alert("Erreur lors de la suppression du contact");
      return;
    }

    setContactsClub((prev) => prev.filter((c) => c.id !== idContact));
    setAllContacts((prev) => prev.filter((c) => c.id !== idContact));
  };

const handleLogin = async () => {
  const usernameNettoye = String(username || "").trim().toLowerCase();
  const passwordNettoye = String(password || "");

  if (!usernameNettoye || !passwordNettoye) {
    alert("Merci de renseigner l'utilisateur et le mot de passe");
    return;
  }

  const profil = await chargerProfilUtilisateurParUsername(usernameNettoye);

  if (!profil || !profil.email) {
    alert("Identifiants incorrects");
    return;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: profil.email,
    password: passwordNettoye
  });

  if (error || !data?.user) {
    console.log("ERREUR LOGIN AUTH :", error);
    alert("Identifiants incorrects");
    return;
  }

  setUserConnected(profil);
  setFiltreCommercial(profil.nom || "Moi");
  setPassword("");
};

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.log("ERREUR LOGOUT :", error);
    alert("Erreur lors de la déconnexion");
    return;
  }

  setUserConnected(null);
  setUsername("");
  setPassword("");
  setFiltreCommercial("Moi");
  setScreen("dashboard");
  setClubSelected(null);
};
/* =========================================================
   BLOC 9 - VARIABLES DÉRIVÉES ET STYLE
========================================================= */
  const prochainCodeClub = "CLB" + String(clubs.length + 1).padStart(3, "0");

const couleurCommercial = userConnected?.couleur || "#f2f2f2"; 

const stylePage = {
  minHeight: "100vh",
  background: couleurCommercial,
  padding: 12,
  fontFamily: "Arial"
};

const commercialActif =
  filtreCommercial === "Moi" ? userConnected?.nom || "" : filtreCommercial;

  const clubsFiltresCommercial =
    commercialActif === "Toute l'équipe"
      ? clubs
      : clubs.filter((club) => club.commercial === commercialActif);
/* =========================================================
   BLOC 10 - FILTRES TEMPORELS ET ACTIONS FILTRÉES
========================================================= */
function getDateLundiCourant() {
  const d = new Date();
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getDatePremierJourMois() {
  if (moisSelectionne) {
    const [annee, mois] = moisSelectionne.split("-").map(Number);
    return new Date(annee, mois - 1, 1);
  }

  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function getDatePremierJourMoisSuivant() {
  if (moisSelectionne) {
    const [annee, mois] = moisSelectionne.split("-").map(Number);
    return new Date(annee, mois, 1);
  }

  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth() + 1, 1);
}

function parseInputDate(dateString) {
  if (!dateString) return null;
  const d = new Date(dateString + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function getExerciceFiscal(date) {
  const mois = date.getMonth() + 1;
  const annee = date.getFullYear();
  return mois >= 4 ? annee : annee - 1;
}

function isActionDansPeriode(action) {
  if (!action.date) return false;

  const actionDateObj = parseInputDate(action.date);
  if (!actionDateObj) return false;

  if (filtrePeriode === "Toutes périodes") {
    return true;
  }

  if (filtrePeriode === "Semaine") {
    return actionDateObj >= getDateLundiCourant();
  }

if (filtrePeriode === "Mois") {
  return (
    actionDateObj >= getDatePremierJourMois() &&
    actionDateObj < getDatePremierJourMoisSuivant()
  );
}

  if (filtrePeriode === "Exercice fiscal") {
    const dateRef = parseInputDate(dateDepuis) || new Date();
    return getExerciceFiscal(actionDateObj) === getExerciceFiscal(dateRef);
  }

  if (filtrePeriode === "Depuis telle date") {
    const dateRef = parseInputDate(dateDepuis);
    if (!dateRef) return true;
    return actionDateObj >= dateRef;
  }

  return true;
}
function getLundiSemaine(dateBase = new Date()) {
  const d = new Date(dateBase);
  const jour = d.getDay();
  const diff = jour === 0 ? -6 : 1 - jour;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getDimancheSemaine(dateBase = new Date()) {
  const lundi = getLundiSemaine(dateBase);
  const dimanche = new Date(lundi);
  dimanche.setDate(lundi.getDate() + 6);
  dimanche.setHours(23, 59, 59, 999);
  return dimanche;
}

function addDays(dateBase, nbJours) {
  const d = new Date(dateBase);
  d.setDate(d.getDate() + nbJours);
  return d;
}

function getPremierJourMoisDepuisDate(dateBase = new Date()) {
  return new Date(dateBase.getFullYear(), dateBase.getMonth(), 1, 0, 0, 0, 0);
}

function getDernierJourMoisDepuisDate(dateBase = new Date()) {
  return new Date(dateBase.getFullYear(), dateBase.getMonth() + 1, 0, 23, 59, 59, 999);
}

function isPlanningDansPeriode(ligne) {
  if (!ligne?.date_rdv) return false;

  const dateLigne = new Date(`${ligne.date_rdv}T00:00:00`);
  if (isNaN(dateLigne.getTime())) return false;

  const aujourdHui = new Date();

  if (filtrePlanningPeriode === "Semaine en cours") {
    const debut = getLundiSemaine(aujourdHui);
    const fin = getDimancheSemaine(aujourdHui);
    return dateLigne >= debut && dateLigne <= fin;
  }

  if (filtrePlanningPeriode === "Semaine précédente") {
    const base = addDays(aujourdHui, -7);
    const debut = getLundiSemaine(base);
    const fin = getDimancheSemaine(base);
    return dateLigne >= debut && dateLigne <= fin;
  }

  if (filtrePlanningPeriode === "Semaine suivante") {
    const base = addDays(aujourdHui, 7);
    const debut = getLundiSemaine(base);
    const fin = getDimancheSemaine(base);
    return dateLigne >= debut && dateLigne <= fin;
  }

  if (filtrePlanningPeriode === "Mois en cours") {
    const debut = getPremierJourMoisDepuisDate(aujourdHui);
    const fin = getDernierJourMoisDepuisDate(aujourdHui);
    return dateLigne >= debut && dateLigne <= fin;
  }

  if (filtrePlanningPeriode === "Mois précédent") {
    const base = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth() - 1, 1);
    const debut = getPremierJourMoisDepuisDate(base);
    const fin = getDernierJourMoisDepuisDate(base);
    return dateLigne >= debut && dateLigne <= fin;
  }

  if (filtrePlanningPeriode === "Mois suivant") {
    const base = new Date(aujourdHui.getFullYear(), aujourdHui.getMonth() + 1, 1);
    const debut = getPremierJourMoisDepuisDate(base);
    const fin = getDernierJourMoisDepuisDate(base);
    return dateLigne >= debut && dateLigne <= fin;
  }

  if (filtrePlanningPeriode === "Date du mois") {
    if (!planningMoisFiltre) return true;

    const [annee, mois] = planningMoisFiltre.split("-").map(Number);
    const debut = new Date(annee, mois - 1, 1, 0, 0, 0, 0);
    const fin = new Date(annee, mois, 0, 23, 59, 59, 999);
    return dateLigne >= debut && dateLigne <= fin;
  }

  return true;
}
function getTotauxClub(club) {
  const actionsDuClub = actionsFiltrees.filter(
    (a) => String(a.club_id) === String(club.id || club.identifiant)
  );

  const totalLivre = actionsDuClub
    .filter((a) => a.type === "Livraison")
    .reduce((sum, a) => sum + (Number(a.montantTTC) || 0), 0);

  const totalFacture = actionsDuClub
    .filter((a) => a.type === "Facturé")
    .reduce((sum, a) => sum + (Number(a.montantTTC) || 0), 0);

  const totalPaye = actionsDuClub
    .filter((a) => a.type === "Payé")
    .reduce((sum, a) => sum + (Number(a.montantTTC) || 0), 0);

  return { totalLivre, totalFacture, totalPaye };
}

const toutesLesActions =
  commercialActif === "Toute l'équipe"
    ? toutesActions
    : toutesActions.filter((a) => {
        const club = clubs.find(
          (c) => String(c.id || c.identifiant) === String(a.club_id)
        );
        return club && club.commercial === commercialActif;
      });

const actionsFiltrees = toutesLesActions.filter(isActionDansPeriode);

const dateReference = moisSelectionne
  ? new Date(moisSelectionne + "-01T00:00:00")
  : new Date();

const moisReference = dateReference.getMonth() + 1;
const anneeReference = dateReference.getFullYear();


const objectifsFiltresCommercial =
  commercialActif === "Toute l'équipe"
    ? objectifs
    : objectifs.filter(
        (obj) =>
          String(obj.commercial || "").toLowerCase() ===
          String(commercialActif || "").toLowerCase()
      );

/* =========================
   OBJECTIF MOIS CA
========================= */
const objectifsMois = objectifsFiltresCommercial.filter((obj) => {
  if (String(obj.indicateur || "").toLowerCase() !== "ca_encaisse_ttc") {
    return false;
  }

  const moisObj = Number(obj.mois);
  const anneeObj = Number(obj.annee_reference);

  if (modeObjectif === "Exercice fiscal") {
    const exerciceDebut = Number(exerciceSelectionne);

    if (moisReference >= 4) {
      return anneeObj === exerciceDebut && moisObj === moisReference;
    }

    if (moisReference <= 3) {
      return anneeObj === exerciceDebut + 1 && moisObj === moisReference;
    }

    return false;
  }

  return (
    anneeObj === Number(anneeReference) &&
    moisObj === Number(moisReference)
  );
});

const objectifMoisCA = objectifsMois.reduce(
  (sum, obj) => sum + (Number(obj.valeur_objectif) || 0),
  0
);

const actionsEncaisseesMois = actionsFiltrees.filter((a) => {
  if (a.type !== "Payé") return false;
  if (!a.date) return false;

  const d = new Date(a.date + "T00:00:00");
  const moisAction = d.getMonth() + 1;
  const anneeAction = d.getFullYear();

  if (modeObjectif === "Exercice fiscal") {
    const exerciceAction = getExerciceFiscal(d);
    const exerciceDebut = Number(exerciceSelectionne);

    if (exerciceAction !== exerciceDebut) return false;

    if (moisReference >= 4) {
      return anneeAction === exerciceDebut && moisAction === moisReference;
    }

    return anneeAction === exerciceDebut + 1 && moisAction === moisReference;
  }

  return (
    anneeAction === Number(anneeReference) &&
    moisAction === Number(moisReference)
  );
});

const realiseMoisCA = actionsEncaisseesMois.reduce(
  (sum, a) => sum + (Number(a.montantTTC) || 0),
  0
);

/* =========================
   OBJECTIF CUMUL CA
========================= */
const objectifsCumul = objectifsFiltresCommercial.filter((obj) => {
  if (String(obj.indicateur || "").toLowerCase() !== "ca_encaisse_ttc") {
    return false;
  }

  const moisObj = Number(obj.mois);
  const anneeObj = Number(obj.annee_reference);

  if (modeObjectif === "Exercice fiscal") {
    const exerciceDebut = Number(exerciceSelectionne);

    if (moisReference >= 4) {
      return (
        anneeObj === exerciceDebut &&
        moisObj >= 4 &&
        moisObj <= moisReference
      );
    }

    return (
      (anneeObj === exerciceDebut && moisObj >= 4) ||
      (anneeObj === exerciceDebut + 1 && moisObj <= moisReference)
    );
  }

  return (
    anneeObj === Number(anneeReference) &&
    moisObj <= Number(moisReference)
  );
});

const objectifCumulCA = objectifsCumul.reduce(
  (sum, obj) => sum + (Number(obj.valeur_objectif) || 0),
  0
);

const actionsEncaisseesCumul = actionsFiltrees.filter((a) => {
  if (a.type !== "Payé") return false;
  if (!a.date) return false;

  const d = new Date(a.date + "T00:00:00");
  const moisAction = d.getMonth() + 1;
  const anneeAction = d.getFullYear();

  if (modeObjectif === "Exercice fiscal") {
    const exerciceAction = getExerciceFiscal(d);
    const exerciceDebut = Number(exerciceSelectionne);

    if (exerciceAction !== exerciceDebut) return false;

    if (moisReference >= 4) {
      return (
        anneeAction === exerciceDebut &&
        moisAction >= 4 &&
        moisAction <= moisReference
      );
    }

    return (
      (anneeAction === exerciceDebut && moisAction >= 4) ||
      (anneeAction === exerciceDebut + 1 && moisAction <= moisReference)
    );
  }

  return (
    anneeAction === Number(anneeReference) &&
    moisAction <= Number(moisReference)
  );
});

const realiseCumulCA = actionsEncaisseesCumul.reduce(
  (sum, a) => sum + (Number(a.montantTTC) || 0),
  0
);

/* =========================
   OBJECTIF MOIS VISITES
========================= */
const objectifsMoisVisites = objectifsFiltresCommercial.filter((obj) => {
  if (String(obj.indicateur || "").toLowerCase() !== "visites") {
    return false;
  }

  const moisObj = Number(obj.mois);
  const anneeObj = Number(obj.annee_reference);

  if (modeObjectif === "Exercice fiscal") {
    const exerciceDebut = Number(exerciceSelectionne);

    if (moisReference >= 4) {
      return anneeObj === exerciceDebut && moisObj === moisReference;
    }

    if (moisReference <= 3) {
      return anneeObj === exerciceDebut + 1 && moisObj === moisReference;
    }

    return false;
  }

  return (
    anneeObj === Number(anneeReference) &&
    moisObj === Number(moisReference)
  );
});

const objectifMoisVisites = objectifsMoisVisites.reduce(
  (sum, obj) => sum + (Number(obj.valeur_objectif) || 0),
  0
);

const actionsVisitesMois = actionsFiltrees.filter((a) => {
  if (a.type !== "Visite club") return false;
  if (!a.date) return false;

  const d = new Date(a.date + "T00:00:00");
  const moisAction = d.getMonth() + 1;
  const anneeAction = d.getFullYear();

  if (modeObjectif === "Exercice fiscal") {
    const exerciceAction = getExerciceFiscal(d);
    const exerciceDebut = Number(exerciceSelectionne);

    if (exerciceAction !== exerciceDebut) return false;

    if (moisReference >= 4) {
      return anneeAction === exerciceDebut && moisAction === moisReference;
    }

    return anneeAction === exerciceDebut + 1 && moisAction === moisReference;
  }

  return (
    anneeAction === Number(anneeReference) &&
    moisAction === Number(moisReference)
  );
});

const realiseMoisVisites = actionsVisitesMois.length;

/* =========================
   OBJECTIF CUMUL VISITES
========================= */
const objectifsCumulVisites = objectifsFiltresCommercial.filter((obj) => {
  if (String(obj.indicateur || "").toLowerCase() !== "visites") {
    return false;
  }

  const moisObj = Number(obj.mois);
  const anneeObj = Number(obj.annee_reference);

  if (modeObjectif === "Exercice fiscal") {
    const exerciceDebut = Number(exerciceSelectionne);

    if (moisReference >= 4) {
      return (
        anneeObj === exerciceDebut &&
        moisObj >= 4 &&
        moisObj <= moisReference
      );
    }

    return (
      (anneeObj === exerciceDebut && moisObj >= 4) ||
      (anneeObj === exerciceDebut + 1 && moisObj <= moisReference)
    );
  }

  return (
    anneeObj === Number(anneeReference) &&
    moisObj <= Number(moisReference)
  );
});

const objectifCumulVisites = objectifsCumulVisites.reduce(
  (sum, obj) => sum + (Number(obj.valeur_objectif) || 0),
  0
);

const actionsVisitesCumul = actionsFiltrees.filter((a) => {
  if (a.type !== "Visite club") return false;
  if (!a.date) return false;

  const d = new Date(a.date + "T00:00:00");
  const moisAction = d.getMonth() + 1;
  const anneeAction = d.getFullYear();

  if (modeObjectif === "Exercice fiscal") {
    const exerciceAction = getExerciceFiscal(d);
    const exerciceDebut = Number(exerciceSelectionne);

    if (exerciceAction !== exerciceDebut) return false;

    if (moisReference >= 4) {
      return (
        anneeAction === exerciceDebut &&
        moisAction >= 4 &&
        moisAction <= moisReference
      );
    }

    return (
      (anneeAction === exerciceDebut && moisAction >= 4) ||
      (anneeAction === exerciceDebut + 1 && moisAction <= moisReference)
    );
  }

  return (
    anneeAction === Number(anneeReference) &&
    moisAction <= Number(moisReference)
  );
});

const realiseCumulVisites = actionsVisitesCumul.length;

/* =========================
   TAUX / ECARTS / STATUTS CA
========================= */
const tauxMoisCA =
  objectifMoisCA > 0 ? (realiseMoisCA / objectifMoisCA) * 100 : 0;

const tauxCumulCA =
  objectifCumulCA > 0 ? (realiseCumulCA / objectifCumulCA) * 100 : 0;

const ecartMoisCA = realiseMoisCA - objectifMoisCA;
const ecartCumulCA = realiseCumulCA - objectifCumulCA;

/* =========================
   TAUX / ECARTS / STATUTS VISITES
========================= */
const tauxMoisVisites =
  objectifMoisVisites > 0
    ? (realiseMoisVisites / objectifMoisVisites) * 100
    : 0;

const tauxCumulVisites =
  objectifCumulVisites > 0
    ? (realiseCumulVisites / objectifCumulVisites) * 100
    : 0;

const ecartMoisVisites = realiseMoisVisites - objectifMoisVisites;
const ecartCumulVisites = realiseCumulVisites - objectifCumulVisites;

function getStatutObjectif(realise, objectif) {
  if (objectif <= 0) return "Sans objectif";
  if (realise < objectif) return "Retard";
  if (realise === objectif) return "Atteint";
  return "Dépassé";
}

const statutMoisCA = getStatutObjectif(realiseMoisCA, objectifMoisCA);
const statutCumulCA = getStatutObjectif(realiseCumulCA, objectifCumulCA);

const statutMoisVisites = getStatutObjectif(
  realiseMoisVisites,
  objectifMoisVisites
);
const statutCumulVisites = getStatutObjectif(
  realiseCumulVisites,
  objectifCumulVisites
);

/* =========================
   LARGEURS BARRES VISUELLES CA
========================= */
const largeurTotaleMois = Math.max(tauxMoisCA, 100);
const largeurVertMois =
  tauxMoisCA <= 100 ? tauxMoisCA : (100 / largeurTotaleMois) * 100;
const largeurBleuMois =
  tauxMoisCA > 100 ? ((tauxMoisCA - 100) / largeurTotaleMois) * 100 : 0;

const largeurTotaleCumul = Math.max(tauxCumulCA, 100);
const largeurVertCumul =
  tauxCumulCA <= 100 ? tauxCumulCA : (100 / largeurTotaleCumul) * 100;
const largeurBleuCumul =
  tauxCumulCA > 100 ? ((tauxCumulCA - 100) / largeurTotaleCumul) * 100 : 0;

/* =========================
   LARGEURS BARRES VISUELLES VISITES
========================= */
const largeurTotaleMoisVisites = Math.max(tauxMoisVisites, 100);
const largeurVertMoisVisites =
  tauxMoisVisites <= 100
    ? tauxMoisVisites
    : (100 / largeurTotaleMoisVisites) * 100;
const largeurBleuMoisVisites =
  tauxMoisVisites > 100
    ? ((tauxMoisVisites - 100) / largeurTotaleMoisVisites) * 100
    : 0;

const largeurTotaleCumulVisites = Math.max(tauxCumulVisites, 100);
const largeurVertCumulVisites =
  tauxCumulVisites <= 100
    ? tauxCumulVisites
    : (100 / largeurTotaleCumulVisites) * 100;
const largeurBleuCumulVisites =
  tauxCumulVisites > 100
    ? ((tauxCumulVisites - 100) / largeurTotaleCumulVisites) * 100
    : 0;
/* =========================================================
   BLOC 11 - OUTILS DE SAISIE ET OPTIONS DYNAMIQUES
========================================================= */
function formatMontant(valeur) {
  return Number(valeur || 0).toFixed(2);
} 
 function chargerPiece(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (evt) {
      setPieceNom(file.name);
      setPieceType(file.type);
      setPieceData(evt.target.result);
    };

    reader.readAsDataURL(file);
  }

  function ajouterSportOption(nouveauSport) {
    const valeur = (nouveauSport || "").trim();
    if (valeur === "") return "";

    const existe = sportsOptions.some(
      (sport) => sport.toLowerCase() === valeur.toLowerCase()
    );

    if (!existe) {
      setSportsOptions(
        [...sportsOptions, valeur].sort((a, b) => a.localeCompare(b))
      );
    }

    return valeur;
  }

  function ajouterHistoriqueTypeOption(nouveauType) {
    const valeur = (nouveauType || "").trim();
    if (valeur === "") return "";

    const existe = historiqueTypeOptions.some(
      (type) => type.toLowerCase() === valeur.toLowerCase()
    );

    if (!existe) {
      setHistoriqueTypeOptions(
        [...historiqueTypeOptions, valeur].sort((a, b) => a.localeCompare(b))
      );
    }

    return valeur;
  }
/* =========================================================
   BLOC 12 - CALCULS DASHBOARD ET RECHERCHE
========================================================= */
  const rechercheMin = recherche.trim().toLowerCase();
const planningRechercheMin = planningRechercheClub.trim().toLowerCase();

const clubsFiltresPlanning = clubs.filter((club) => {
  const commercialOk =
    planningFiltreCommercial === "Tous" ||
    (club.commercial || "") === planningFiltreCommercial;

  if (!commercialOk) return false;

  const sportOk =
    planningFiltreSport === "Tous les sports" ||
    (club.sport || "") === planningFiltreSport;

  if (!sportOk) return false;

  if (planningRechercheMin === "") return true;

  const clubId = club.id || club.identifiant;

  const codeMatch = (club.code || "").toLowerCase().includes(planningRechercheMin);
  const nomMatch = (club.nom || "").toLowerCase().includes(planningRechercheMin);
  const villeMatch = (club.ville || "").toLowerCase().includes(planningRechercheMin);

  const contactsDuClub = allContacts.filter(
    (contact) => String(contact.club_id) === String(clubId)
  );

  const contactNomMatch = contactsDuClub.some((contact) =>
    (contact.nom || "").toLowerCase().includes(planningRechercheMin)
  );

  const contactTelMatch = contactsDuClub.some((contact) =>
    (contact.telephone || "").toLowerCase().includes(planningRechercheMin)
  );

  return (
    codeMatch ||
    nomMatch ||
    villeMatch ||
    contactNomMatch ||
    contactTelMatch
  );
});
const clubsFiltres = clubsFiltresCommercial.filter((club) => {
  const sportOk =
    filtreSport === "Tous les sports" || (club.sport || "") === filtreSport;

  if (!sportOk) return false;

  const clubId = club.id || club.identifiant;

  const actionsDuClub = toutesActions.filter(
    (a) => String(a.club_id) === String(clubId)
  );

  const actionsDuClubDansPeriode = actionsDuClub.filter(isActionDansPeriode);
  if (filtreBlocDashboard === "VISITES_MOIS") {
const visitesDuMois = actionsDuClub.filter((a) => {
  if (a.type !== "Visite club") return false;
  if (!a.date) return false;

  const d = new Date(a.date + "T00:00:00");

  return (
    d.getMonth() + 1 === moisReference &&
    d.getFullYear() === anneeReference
  );
});

    if (visitesDuMois.length === 0) return false;
  }
  if (
    filtrePeriode !== "Toutes périodes" &&
    actionsDuClubDansPeriode.length === 0
  ) {
    return false;
  }

  const totalLivre = actionsDuClubDansPeriode
    .filter((a) => a.type === "Livraison")
    .reduce((sum, a) => sum + (Number(a.montantTTC) || 0), 0);

  const totalFacture = actionsDuClubDansPeriode
    .filter((a) => a.type === "Facturé")
    .reduce((sum, a) => sum + (Number(a.montantTTC) || 0), 0);

  const totalPaye = actionsDuClubDansPeriode
    .filter((a) => a.type === "Payé")
    .reduce((sum, a) => sum + (Number(a.montantTTC) || 0), 0);

  if (filtreFinancier === "Livré non facturé" && !(totalLivre > totalFacture)) {
    return false;
  }

  if (filtreFinancier === "Facturé non payé" && !(totalFacture > totalPaye)) {
    return false;
  }

  if (rechercheMin === "") return true;

  const codeClubMatch = (club.code || "").toLowerCase().includes(rechercheMin);
  const nomClubMatch = (club.nom || "").toLowerCase().includes(rechercheMin);
  const villeClubMatch = (club.ville || "").toLowerCase().includes(rechercheMin);
  const sportClubMatch = (club.sport || "").toLowerCase().includes(rechercheMin);

  const contactsDuClub = allContacts.filter(
    (contact) => String(contact.club_id) === String(clubId)
  );

  const contactNomMatch = contactsDuClub.some((contact) =>
    (contact.nom || "").toLowerCase().includes(rechercheMin)
  );

  const contactTelMatch = contactsDuClub.some((contact) =>
    (contact.telephone || "").toLowerCase().includes(rechercheMin)
  );

  const contactMailMatch = contactsDuClub.some((contact) =>
    (contact.mail || "").toLowerCase().includes(rechercheMin)
  );

  return (
    codeClubMatch ||
    nomClubMatch ||
    villeClubMatch ||
    sportClubMatch ||
    contactNomMatch ||
    contactTelMatch ||
    contactMailMatch
  );
});
const idsClubsFiltres = clubsFiltres.map((club) =>
  String(club.id || club.identifiant)
);

const actionsDashboard = actionsFiltrees.filter((action) =>
  idsClubsFiltres.includes(String(action.club_id))
);
const totalClubs = clubsFiltres.length;
const totalActions = actionsDashboard.length;
 const totalOffres = actionsDashboard.filter((a) => a.type === "Offre").length;
const totalCommandes = actionsDashboard.filter(
  (a) => a.type === "Commande"
).length;
const totalLivraisons = actionsDashboard.filter(
  (a) => a.type === "Livraison"
).length;
const totalFacturations = actionsDashboard.filter(
  (a) => a.type === "Facturé"
).length;
const totalRelances = actionsDashboard.filter(
  (a) => a.type === "Relance"
).length;

const totalLivraisonsTTC = actionsDashboard
  .filter((a) => a.type === "Livraison")
  .reduce((total, action) => total + (Number(action.montantTTC) || 0), 0);

 const totalFacturesTTC = actionsDashboard
  .filter((a) => a.type === "Facturé")
  .reduce((total, action) => total + (Number(action.montantTTC) || 0), 0);

 const totalPayesTTC = actionsDashboard
  .filter((a) => a.type === "Payé")
  .reduce((total, action) => total + (Number(action.montantTTC) || 0), 0); 

  const soldeRestantEncaisser = totalFacturesTTC - totalPayesTTC;

const potentielTotal = clubsFiltres.reduce((total, club) => {
  const valeur = Number(club.potentiel) || 0;
  return total + valeur;
}, 0);
/* =========================================================
  BLOC 13 - DOUBLONS ET GESTION MAGASINS
========================================================= */
  function detecterDoublonClub(nomSaisi) {
    const nom = (nomSaisi || "").trim().toLowerCase();
    if (nom === "") return "";

    const clubsTrouves = clubs.filter((club) => {
      const nomClub = (club.nom || "").trim().toLowerCase();
      return nomClub.includes(nom) || nom.includes(nomClub);
    });

    if (clubsTrouves.length === 0) return "";

    return (
      "Risque de doublon club : " +
      clubsTrouves.map((c) => `${c.code} - ${c.nom}`).join(" / ")
    );
  }

  function detecterDoublonContact(telephoneSaisi, mailSaisi) {
    const tel = (telephoneSaisi || "").trim().toLowerCase();
    const mail = (mailSaisi || "").trim().toLowerCase();

    if (tel === "" && mail === "") return "";

    const trouves = [];

    allContacts.forEach((contact) => {
      const telContact = (contact.telephone || "").trim().toLowerCase();
      const mailContact = (contact.mail || "").trim().toLowerCase();

      const telMatch = tel !== "" && telContact !== "" && tel === telContact;
      const mailMatch = mail !== "" && mailContact !== "" && mail === mailContact;

      if (telMatch || mailMatch) {
        const club = clubs.find(
          (c) => String(c.id || c.identifiant) === String(contact.club_id)
        );

        trouves.push(
          `${club?.code || "?"} - ${club?.nom || "Club inconnu"} - ${
            contact.nom || "Sans nom"
          }`
        );
      }
    });

    if (trouves.length === 0) return "";

    return "Risque de doublon contact : " + trouves.join(" / ");
  }

  function totalMagasins(magasins) {
    return (magasins || []).reduce((total, mag) => {
      return total + (Number(mag.taux) || 0);
    }, 0);
  }

  function updateMagasinCreation(index, field, value) {
    const copie = [...magasinsCreation];
    copie[index] = { ...copie[index], [field]: value };
    setMagasinsCreation(copie);
  }

  function addMagasinCreation() {
    setMagasinsCreation([...magasinsCreation, { nom: "", taux: "0" }]);
  }

  function removeMagasinCreation(index) {
    const ok = window.confirm("Voulez-vous vraiment supprimer ce magasin ?");
    if (!ok) return;

    const copie = magasinsCreation.filter((_, i) => i !== index);
    setMagasinsCreation(copie.length > 0 ? copie : [{ nom: "", taux: "0" }]);
  }

  function updateMagasinDetail(index, field, value) {
    const copie = [...magasinsClub];
    copie[index] = { ...copie[index], [field]: value };
    setMagasinsClub(copie);
  }

  function addMagasinDetail() {
    setMagasinsClub([...magasinsClub, { nom: "", taux: "0" }]);
  }

  function removeMagasinDetail(index) {
    const ok = window.confirm("Voulez-vous vraiment supprimer ce magasin ?");
    if (!ok) return;

    const copie = magasinsClub.filter((_, i) => i !== index);
    setMagasinsClub(copie.length > 0 ? copie : []);
  }
/* =========================================================
  BLOC 14 - GOOGLE AGENDA ET EXPORT CSV
========================================================= */	
function formaterDateGoogle(dateStr, heureStr) {
  if (!dateStr) return "";

  if (!heureStr) {
    const debut = new Date(`${dateStr}T00:00:00`);
    const fin = new Date(debut);
    fin.setDate(fin.getDate() + 1);

    const y1 = debut.getFullYear();
    const m1 = String(debut.getMonth() + 1).padStart(2, "0");
    const d1 = String(debut.getDate()).padStart(2, "0");

    const y2 = fin.getFullYear();
    const m2 = String(fin.getMonth() + 1).padStart(2, "0");
    const d2 = String(fin.getDate()).padStart(2, "0");

    return `${y1}${m1}${d1}/${y2}${m2}${d2}`;
  }

  const debut = new Date(`${dateStr}T${heureStr}:00`);
  const y = debut.getFullYear();
  const m = String(debut.getMonth() + 1).padStart(2, "0");
  const d = String(debut.getDate()).padStart(2, "0");
  const h = String(debut.getHours()).padStart(2, "0");
  const min = String(debut.getMinutes()).padStart(2, "0");

  return `${y}${m}${d}T${h}${min}00`;
}

function calculerFinPlanning(dateStr, heureStr, dureeStr) {
  if (!dateStr) return "";

  if (dureeStr === "journee") {
    const debut = new Date(`${dateStr}T00:00:00`);
    const fin = new Date(debut);
    fin.setDate(fin.getDate() + 1);

    const y = fin.getFullYear();
    const m = String(fin.getMonth() + 1).padStart(2, "0");
    const d = String(fin.getDate()).padStart(2, "0");

    return `${y}${m}${d}`;
  }

  const debut = new Date(`${dateStr}T${heureStr || "10:00"}:00`);
  const fin = new Date(debut);

  if (dureeStr === "30min") fin.setMinutes(fin.getMinutes() + 30);
  else if (dureeStr === "1h") fin.setHours(fin.getHours() + 1);
  else if (dureeStr === "2h") fin.setHours(fin.getHours() + 2);
  else if (dureeStr === "3h") fin.setHours(fin.getHours() + 3);
  else if (dureeStr === "demi-journee") fin.setHours(fin.getHours() + 4);
  else fin.setHours(fin.getHours() + 2);

  const y = fin.getFullYear();
  const m = String(fin.getMonth() + 1).padStart(2, "0");
  const d = String(fin.getDate()).padStart(2, "0");
  const h = String(fin.getHours()).padStart(2, "0");
  const min = String(fin.getMinutes()).padStart(2, "0");

  return `${y}${m}${d}T${h}${min}00`;
}

function ouvrirGoogleAgendaDepuisPlanning(ligne) {
  const titre = `${ligne.type || "Rendez-vous"} - ${ligne.clubCode || ""} ${ligne.clubNom || ""}`.trim();

  let dates = "";

  if (ligne.duree_rdv === "journee") {
    const debutJournee = formaterDateGoogle(ligne.date_rdv, null);
    const finJournee = calculerFinPlanning(ligne.date_rdv, null, "journee");
    dates = `${debutJournee}${finJournee ? finJournee : ""}`;
  } else {
    const debut = formaterDateGoogle(ligne.date_rdv, ligne.heure_rdv || "10:00");
    const fin = calculerFinPlanning(
      ligne.date_rdv,
      ligne.heure_rdv || "10:00",
      ligne.duree_rdv || "1h"
    );
    dates = `${debut}/${fin}`;
  }

  const details = [
    `Club : ${ligne.clubCode || ""} ${ligne.clubNom || ""}`.trim(),
    `Type : ${ligne.type || ""}`,
    `Commercial : ${ligne.commercial || ""}`,
    `Commentaire : ${ligne.commentaire || ""}`
  ].join("\n");

  const url =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(titre)}` +
    `&dates=${encodeURIComponent(dates)}` +
    `&details=${encodeURIComponent(details)}`;

  window.open(url, "_blank");
}

  function nettoyerCSV(valeur) {
    const texte = String(valeur ?? "");
    return `"${texte.replace(/"/g, '""')}"`;
  }

  function exportClubsCSV() {
    const entetes = [
      "Code club",
      "Nom du club",
      "Ville",
      "Sport pratiqué",
      "Adherents",
      "Potentiel TTC",
      "Commercial",
      "Contacts",
      "Nb contacts",
      "Nb actions"
    ];

    const lignes = clubsFiltres.map((club) => {
      const contactsDuClub = allContacts.filter(
        (c) => String(c.club_id) === String(club.id || club.identifiant)
      );

      const actionsDuClub = toutesActions.filter(
        (a) => String(a.club_id) === String(club.id || club.identifiant)
      );

      const contactsTexte = contactsDuClub
        .map((c) => `${c.nom || ""} / ${c.telephone || ""} / ${c.mail || ""}`)
        .join(" | ");

      return [
        club.code || "",
        club.nom || "",
        club.ville || "",
        club.sport || "",
        club.adherents || "",
        club.potentiel || "",
        club.commercial || "",
        contactsTexte,
        contactsDuClub.length,
        actionsDuClub.length
      ];
    });

    const contenu = [
      entetes.map(nettoyerCSV).join(";"),
      ...lignes.map((ligne) => ligne.map(nettoyerCSV).join(";"))
    ].join("\n");

    const blob = new Blob(["\uFEFF" + contenu], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const lien = document.createElement("a");
    const dateTexte = new Date().toISOString().slice(0, 10);

    lien.href = url;
    lien.download = `crm-clubs-${dateTexte}.csv`;
    document.body.appendChild(lien);
    lien.click();
    document.body.removeChild(lien);
    URL.revokeObjectURL(url);
  }
/* =========================================================
  BLOC 15 - RENDU ECRAN PLANNING
========================================================= */
if (userConnected && screen === "planning") {

  const planningCommercial =
    commercialActif === "Toute l'équipe"
      ? planning
      : planning.filter((ligne) => ligne.commercial === commercialActif);

  const planningUtilisateur = planningCommercial.filter(isPlanningDansPeriode);

  return (
    <div style={stylePage}>

      <h2>Planning semaine</h2>

      {/* ================= FILTRES HAUT = AFFICHAGE DU PLANNING ================= */}
      <div
        style={{
          background: "white",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          position: "sticky",
          top: 10,
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
        }}
      >
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>

          {/* Filtre commercial affichage planning */}
          <div>
            <div style={{ fontWeight: "bold", marginBottom: 5 }}>Filtre commercial</div>
            <select
              style={{ padding: 10, minWidth: 180 }}
              value={filtreCommercial}
              onChange={(e) => setFiltreCommercial(e.target.value)}
            >
              <option>Moi</option>
              <option>Adrien</option>
              <option>Hervé</option>
              <option>Bruno</option>
              <option>Arbresle</option>
              <option>Confluence</option>
              <option>Compta</option>
              <option>Toute l'équipe</option>
            </select>
          </div>

          {/* Période affichage planning */}
          <div>
            <div style={{ fontWeight: "bold", marginBottom: 5 }}>Période</div>
            <select
              style={{ padding: 10, minWidth: 220 }}
              value={filtrePlanningPeriode}
              onChange={(e) => setFiltrePlanningPeriode(e.target.value)}
            >
              <option>Semaine en cours</option>
              <option>Semaine précédente</option>
              <option>Semaine suivante</option>
              <option>Mois en cours</option>
              <option>Mois précédent</option>
              <option>Mois suivant</option>
              <option>Date du mois</option>
            </select>
          </div>

          {filtrePlanningPeriode === "Date du mois" && (
            <div>
              <div style={{ fontWeight: "bold", marginBottom: 5 }}>Mois</div>
              <input
                type="month"
                style={{ padding: 10, minWidth: 180 }}
                value={planningMoisFiltre}
                onChange={(e) => setPlanningMoisFiltre(e.target.value)}
              />
            </div>
          )}

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "flex-end" }}>
            <button
              style={{
                padding: 10,
                background: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: 6
              }}
              onClick={() => setScreen("club")}
            >
              + Nouveau club
            </button>
          </div>
        </div>
      </div>

      {/* ================= LISTE PLANNING ================= */}
      {planningUtilisateur.map((ligne) => (
        <div
          key={ligne.id}
          style={{
            background: "white",
            borderRadius: 10,
            padding: 12,
            marginBottom: 10
          }}
        >
          <div><strong>{ligne.jour}</strong></div>
          <div>
            {ligne.date_rdv || ""}{" "}
            {ligne.heure_rdv ? `- ${ligne.heure_rdv}` : ""}
            {ligne.duree_rdv ? ` - ${ligne.duree_rdv}` : ""}
          </div>
          <div>{ligne.type}</div>
          <div>{ligne.clubCode} - {ligne.clubNom}</div>
          <div>{ligne.commentaire}</div>
          <div><em>{ligne.commercial}</em></div>

          <button
            style={{
              padding: 8,
              marginTop: 10,
              marginRight: 10,
              background: "#1565c0",
              color: "white",
              border: "none",
              borderRadius: 6
            }}
            onClick={() => ouvrirGoogleAgendaDepuisPlanning(ligne)}
          >
            Google Agenda
          </button>

          <button
            style={{
              padding: 8,
              marginTop: 10,
              background: "#b71c1c",
              color: "white",
              border: "none",
              borderRadius: 6
            }}
            onClick={async () => {
              const ok = window.confirm("Supprimer ?");
              if (!ok) return;

              await supabase.from("planning").delete().eq("id", ligne.id);
              setPlanning((prev) => prev.filter((p) => p.id !== ligne.id));
            }}
          >
            Supprimer
          </button>
        </div>
      ))}

      {/* ================= AJOUT ================= */}
      <div style={{ background: "white", padding: 15, borderRadius: 10 }}>

        <h4>Ajouter au planning</h4>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div>
            <div style={{ fontWeight: "bold", marginBottom: 5 }}>Jour</div>
            <select
              style={{ padding: 10, width: 160 }}
              value={planningJour}
              onChange={(e) => setPlanningJour(e.target.value)}
            >
              <option>Lundi</option>
              <option>Mardi</option>
              <option>Mercredi</option>
              <option>Jeudi</option>
              <option>Vendredi</option>
              <option>Samedi</option>
            </select>
          </div>

          <div>
            <div style={{ fontWeight: "bold", marginBottom: 5 }}>Date</div>
            <input
              type="date"
              style={{ padding: 10, width: 170 }}
              value={planningDate}
              onChange={(e) => setPlanningDate(e.target.value)}
            />
          </div>

          <div>
            <div style={{ fontWeight: "bold", marginBottom: 5 }}>Heure</div>
            <input
              type="time"
              style={{ padding: 10, width: 140 }}
              value={planningHeure}
              onChange={(e) => setPlanningHeure(e.target.value)}
              disabled={planningDuree === "journee"}
            />
          </div>

          <div>
            <div style={{ fontWeight: "bold", marginBottom: 5 }}>Durée</div>
            <select
              style={{ padding: 10, width: 170 }}
              value={planningDuree}
              onChange={(e) => setPlanningDuree(e.target.value)}
            >
              <option value="30min">30 min</option>
              <option value="1h">1 h</option>
              <option value="2h">2 h</option>
              <option value="3h">3 h</option>
              <option value="demi-journee">1/2 journée</option>
              <option value="journee">Journée</option>
            </select>
          </div>

          <div>
            <div style={{ fontWeight: "bold", marginBottom: 5 }}>Type</div>
            <select
              style={{ padding: 10, width: 180 }}
              value={planningType}
              onChange={(e) => setPlanningType(e.target.value)}
            >
              <option>Visite club</option>
              <option>Prospection</option>
              <option>Offre</option>
              <option>Relance</option>
              <option>Commande</option>
              <option>Livraison</option>
              <option>Animation club</option>
              <option>Soirée privée</option>
              <option>Suivi</option>
            </select>
          </div>
        </div>

        {/* ================= FILTRES CLUB POUR LA SAISIE ================= */}
        <div
          style={{
            marginTop: 20,
            padding: 12,
            background: "#f7f7f7",
            borderRadius: 8
          }}
        >
          <div style={{ fontWeight: "bold", marginBottom: 10 }}>
            Filtres pour choisir le club
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div>
              <div style={{ fontWeight: "bold", marginBottom: 5 }}>Club / commercial</div>
              <select
                style={{ padding: 10, minWidth: 180 }}
                value={planningFiltreCommercial}
                onChange={(e) => setPlanningFiltreCommercial(e.target.value)}
              >
                <option value="Tous">Tous</option>
                <option>Adrien</option>
                <option>Hervé</option>
                <option>Bruno</option>
                <option>Arbresle</option>
                <option>Confluence</option>
                <option>Compta</option>
              </select>
            </div>

            <div>
              <div style={{ fontWeight: "bold", marginBottom: 5 }}>Sport</div>
              <select
                style={{ padding: 10, minWidth: 180 }}
                value={planningFiltreSport}
                onChange={(e) => setPlanningFiltreSport(e.target.value)}
              >
                <option>Tous les sports</option>
                {sportsOptions.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1, minWidth: 280 }}>
              <div style={{ fontWeight: "bold", marginBottom: 5 }}>Recherche club</div>
              <input
                style={{ padding: 10, width: "100%" }}
                placeholder="Code, nom, ville, contact, téléphone"
                value={planningRechercheClub}
                onChange={(e) => setPlanningRechercheClub(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: 15 }}>
          <div style={{ fontWeight: "bold", marginBottom: 5 }}>Club</div>
          <select
            style={{ padding: 10, width: "100%", maxWidth: 500 }}
            value={clubSelected ? clubSelected.code : ""}
            onChange={(e) => {
              const clubTrouve = clubs.find((club) => club.code === e.target.value);
              setClubSelected(clubTrouve || null);
            }}
          >
            <option value="">Choisir un club</option>

            {clubsFiltresPlanning.map((club) => (
              <option key={club.code} value={club.code}>
                {club.code} - {club.nom} ({club.ville})
              </option>
            ))}
          </select>
        </div>

        {clubsFiltresPlanning.length === 0 && (
          <div style={{ color: "#b71c1c", fontWeight: "bold", marginTop: 10 }}>
            Aucun club trouvé avec ces filtres.
          </div>
        )}

        {clubsFiltresPlanning.length === 0 && (
          <button
            style={{
              marginTop: 10,
              padding: 10,
              background: "#2e7d32",
              color: "white",
              border: "none",
              borderRadius: 6
            }}
            onClick={() => setScreen("club")}
          >
            + Créer un club
          </button>
        )}

        <div style={{ marginTop: 15 }}>
          <div style={{ fontWeight: "bold", marginBottom: 5 }}>Commentaire</div>
          <textarea
            style={{
              padding: 10,
              width: "100%",
              maxWidth: 500,
              minHeight: 90,
              resize: "vertical"
            }}
            placeholder="Commentaire"
            value={planningCommentaire}
            onChange={(e) => setPlanningCommentaire(e.target.value)}
          />
        </div>

        <div style={{ marginTop: 15, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            style={{
              padding: 10,
              background: "#1565c0",
              color: "white",
              border: "none",
              borderRadius: 6
            }}
            onClick={async () => {
              if (!clubSelected) {
                alert("Merci de choisir un club");
                return;
              }

              const nouvelleLigne = {
                jour: planningJour,
                date_rdv: planningDate,
                heure_rdv: planningDuree === "journee" ? "" : planningHeure,
                duree_rdv: planningDuree,
                type: planningType,
                commentaire: planningCommentaire,
                club_id: clubSelected.id || clubSelected.identifiant,
                clubCode: clubSelected.code || "",
                clubNom: clubSelected.nom || "",
                commercial: userConnected?.nom || ""
              };

              const { data, error } = await supabase
                .from("planning")
                .insert([nouvelleLigne])
                .select()
                .single();

              if (error) {
                console.log("ERREUR INSERT PLANNING :", error);
                alert("Erreur lors de l'enregistrement du planning");
                return;
              }

              setPlanning((prev) => [data, ...prev]);

              setPlanningJour("Lundi");
              setPlanningDate(getDateJourPlanning("Lundi"));
              setPlanningHeure("10:00");
              setPlanningDuree("1h");
              setPlanningType("Visite club");
              setPlanningCommentaire("");
              setClubSelected(null);

              /* remise à zéro des filtres de choix club */
              setPlanningFiltreCommercial("Tous");
              setPlanningFiltreSport("Tous les sports");
              setPlanningRechercheClub("");
            }}
          >
            Ajouter au planning
          </button>

          {clubSelected && (
            <button
              style={{
                padding: 10,
                background: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: 6
              }}
              onClick={() => {
                const ligneTemp = {
                  type: planningType,
                  clubCode: clubSelected.code || "",
                  clubNom: clubSelected.nom || "",
                  commercial: userConnected?.nom || "",
                  commentaire: planningCommentaire,
                  date_rdv: planningDate,
                  heure_rdv: planningDuree === "journee" ? "" : planningHeure,
                  duree_rdv: planningDuree,
                  jour: planningJour
                };

                ouvrirGoogleAgendaDepuisPlanning(ligneTemp);
              }}
            >
              Préparer Google Agenda
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
  /* =========================================================
  BLOC 16 - RENDU ECRAN DETAIL CLUB
========================================================= */
   if (userConnected && screen === "detailClub" && clubSelected) {
    const contacts = contactsClub || [];
    const actions = actionsClub || [];
    const historiques = historiquesClub || [];
const pieces = piecesClub || [];
    const magasins = magasinsClub;
    const totalMagDetail = totalMagasins(magasins);

    return (
      <div style={stylePage}>
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20
          }}
        >
          <h2>Détail club</h2>
          <p><strong>Code :</strong> {clubSelected.code}</p>
          <p><strong>Commercial :</strong> {clubSelected.commercial}</p>

          <div style={{ marginTop: 10 }}>
            <input
              placeholder="Nom du club"
              style={{ padding: 10, margin: 10, width: 250 }}
              value={clubSelected.nom || ""}
              onChange={(e) =>
                setClubSelected({ ...clubSelected, nom: e.target.value })
              }
            />
          </div>

          <div>
            <input
              placeholder="Ville"
              style={{ padding: 10, margin: 10, width: 250 }}
              value={clubSelected.ville || ""}
              onChange={(e) =>
                setClubSelected({ ...clubSelected, ville: e.target.value })
              }
            />
          </div>

          <div>
            <select
              style={{ padding: 10, margin: 10, width: 272 }}
              value={clubSelected.sport || ""}
              onChange={(e) =>
                setClubSelected({ ...clubSelected, sport: e.target.value })
              }
            >
              <option value="">Choisir un sport</option>
              {sportsOptions.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          <div style={{ margin: 10 }}>
            <input
              placeholder="Ajouter un nouveau sport"
              style={{ padding: 10, width: 250, marginRight: 10 }}
              value={nouveauSportClub}
              onChange={(e) => setNouveauSportClub(e.target.value)}
            />
            <button
              style={{ padding: 10 }}
              onClick={() => {
                const valeur = ajouterSportOption(nouveauSportClub);
                if (valeur !== "") {
                  setClubSelected({ ...clubSelected, sport: valeur });
                  setNouveauSportClub("");
                }
              }}
            >
              Ajouter ce sport
            </button>
          </div>

          <div>
            <input
              placeholder="Nombre d’adhérents"
              style={{ padding: 10, margin: 10, width: 250 }}
              value={clubSelected.adherents || ""}
              onChange={(e) =>
                setClubSelected({ ...clubSelected, adherents: e.target.value })
              }
            />
          </div>

          <div>
            <input
              placeholder="Potentiel"
              style={{ padding: 10, margin: 10, width: 250 }}
              value={clubSelected.potentiel || ""}
              onChange={(e) =>
                setClubSelected({ ...clubSelected, potentiel: e.target.value })
              }
            />
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20
          }}
        >
          <h3>Rattachement magasins</h3>

          {magasins.map((mag, index) => (
            <div
              key={index}
              style={{
                background: "#fafafa",
                padding: 10,
                margin: 10,
                border: "1px solid #ddd",
                borderRadius: 8
              }}
            >
              <input
                placeholder="Nom du magasin"
                style={{ padding: 10, marginRight: 10, width: 180 }}
                value={mag.nom}
                onChange={(e) =>
                  updateMagasinDetail(index, "nom", e.target.value)
                }
              />

              <input
                type="number"
                placeholder="%"
                style={{ padding: 10, marginRight: 10, width: 90 }}
                value={mag.taux}
                onChange={(e) =>
                  updateMagasinDetail(index, "taux", e.target.value)
                }
              />

              <button
                style={{
                  padding: 10,
                  background: "#b71c1c",
                  color: "white",
                  border: "none",
                  borderRadius: 6
                }}
                onClick={() => removeMagasinDetail(index)}
              >
                Supprimer
              </button>
            </div>
          ))}

          <button
            style={{ padding: 10, margin: 10 }}
            onClick={addMagasinDetail}
          >
            + Ajouter un magasin
          </button>

          <div style={{ margin: 10, padding: 10, background: "#fff" }}>
            <strong>Total magasins : {totalMagDetail}%</strong>
            {totalMagDetail !== 100 && (
              <div style={{ color: "#b71c1c", marginTop: 5 }}>
                Attention : le total doit idéalement être de 100%.
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20
          }}
        >
          <h3>Contacts</h3>

{contacts.map((contact, index) => {
  const telephoneNettoye = String(contact.telephone || "").replace(/\D/g, "");
  const telephoneWhatsApp =
    telephoneNettoye.startsWith("0") && telephoneNettoye.length === 10
      ? `33${telephoneNettoye.slice(1)}`
      : telephoneNettoye;

  return (
    <div
      key={contact.id || index}
      style={{
        border: "1px solid #ccc",
        padding: 10,
        margin: 10,
        background: "#f9f9f9",
        borderRadius: 8
      }}
    >
      <div><strong>{contact.nom}</strong></div>
      <div>{contact.fonction}</div>

      <div style={{ marginTop: 4 }}>
        {contact.telephone || ""}
      </div>

      <div style={{ marginTop: 4 }}>
        {contact.mail || ""}
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
        {contact.telephone && (
          <a
            href={`tel:${contact.telephone}`}
            style={{ textDecoration: "none" }}
          >
            <button
              type="button"
              style={{
                padding: 8,
                background: "#2e7d32",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              Appeler
            </button>
          </a>
        )}

        {telephoneWhatsApp && (
          <a
            href={`https://wa.me/${telephoneWhatsApp}`}
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button
              type="button"
              style={{
                padding: 8,
                background: "#25D366",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              WhatsApp
            </button>
          </a>
        )}

        {contact.mail && (
          <a
            href={`mailto:${contact.mail}?subject=Contact%20Intersport&body=Bonjour%20${encodeURIComponent(contact.nom || "")},`}
            style={{ textDecoration: "none" }}
          >
            <button
              type="button"
              style={{
                padding: 8,
                background: "#1565c0",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              Mail
            </button>
          </a>
        )}

        <button
          style={{
            padding: 8,
            background: "#b71c1c",
            color: "white",
            border: "none",
            borderRadius: 6
          }}
          onClick={() => supprimerContact(contact.id)}
        >
          Supprimer ce contact
        </button>
      </div>
    </div>
  );
})}

          <h4>Ajouter un contact</h4>

          {alerteDoublonContact !== "" && (
            <div
              style={{
                background: "#fff3cd",
                padding: 10,
                margin: 10,
                border: "1px solid #ffec99"
              }}
            >
              {alerteDoublonContact}
            </div>
          )}

          <div>
            <input
              placeholder="Nom"
              style={{ padding: 10, margin: 10, width: 250 }}
              value={contactNom}
              onChange={(e) => setContactNom(e.target.value)}
            />
          </div>

          <div>
            <input
              placeholder="Fonction"
              style={{ padding: 10, margin: 10, width: 250 }}
              value={contactFonction}
              onChange={(e) => setContactFonction(e.target.value)}
            />
          </div>

          <div>
            <input
              placeholder="Téléphone"
              style={{ padding: 10, margin: 10, width: 250 }}
              value={contactTelephone}
              onChange={(e) => {
                const value = e.target.value;
                setContactTelephone(value);
                setAlerteDoublonContact(
                  detecterDoublonContact(value, contactMail)
                );
              }}
            />
          </div>

          <div>
            <input
              placeholder="Mail"
              style={{ padding: 10, margin: 10, width: 250 }}
              value={contactMail}
              onChange={(e) => {
                const value = e.target.value;
                setContactMail(value);
                setAlerteDoublonContact(
                  detecterDoublonContact(contactTelephone, value)
                );
              }}
            />
          </div>

          <button
            style={{ padding: 10, marginTop: 10, marginRight: 10 }}
            onClick={async () => {
              const clubId = clubSelected.id || clubSelected.identifiant;

              if (!clubId) {
                alert("Identifiant du club introuvable");
                return;
              }

              const nouveauContact = {
                club_id: clubId,
                nom: contactNom,
                fonction: contactFonction,
                telephone: contactTelephone,
                mail: contactMail
              };

              const { data, error } = await supabase
                .from("contacts")
                .insert([nouveauContact])
                .select()
                .single();

              if (error) {
                console.log("ERREUR INSERT CONTACT :", error);
                alert("Erreur lors de l'enregistrement du contact");
                return;
              }

              setContactsClub((prev) => [...prev, data]);
              setAllContacts((prev) => [...prev, data]);

              setContactNom("");
              setContactFonction("");
              setContactTelephone("");
              setContactMail("");
              setAlerteDoublonContact("");
            }}
          >
            Ajouter contact
          </button>
        </div>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20
          }}
        >
          <h3>Actions commerciales</h3>

          {actions.map((action, index) => (
            <div
              key={action.id || index}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                margin: 10,
                background: "#eef6ff",
                borderRadius: 8
              }}
            >
              <div><strong>{action.type}</strong></div>
              <div>{action.date}</div>
              {action.montantTTC !== undefined && action.montantTTC !== "" && (
  <div><strong>Montant TTC :</strong> {formatMontant(action.montantTTC)} €</div>
)}
              <div>{action.commentaire}</div>

              <button
                style={{
                  padding: 8,
                  marginTop: 10,
                  background: "#b71c1c",
                  color: "white",
                  border: "none",
                  borderRadius: 6
                }}
                onClick={async () => {
                  const ok = window.confirm(
                    "Voulez-vous vraiment supprimer cette action ?"
                  );
                  if (!ok) return;

                  const { error } = await supabase
                    .from("actions")
                    .delete()
                    .eq("id", action.id);

                  if (error) {
                    console.log("ERREUR DELETE ACTION :", error);
                    alert("Erreur lors de la suppression de l'action");
                    return;
                  }

                  setActionsClub((prev) => prev.filter((a) => a.id !== action.id));
                  setToutesActions((prev) => prev.filter((a) => a.id !== action.id));
                }}
              >
                Supprimer cette action
              </button>
            </div>
          ))}

          <h4>Ajouter une action</h4>

          <div>
            <select
              style={{ padding: 10, margin: 10, width: 272 }}
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
            >
              <option>Visite club</option>
              <option>Prospection</option>
              <option>Offre</option>
              <option>Relance</option>
              <option>Commande</option>
              <option>Livraison</option>
              <option>Facturé</option>
              <option>Payé</option>
              <option>Animation club</option>
              <option>Soirée privée</option>
              <option>Suivi</option>
            </select>
          </div>

          <div>
            <input
              type="date"
              style={{ padding: 10, margin: 10, width: 250 }}
              value={actionDate}
              onChange={(e) => setActionDate(e.target.value)}
            />
          </div>

          <div>
<textarea
  placeholder="Commentaire"
  value={actionCommentaire}
  onChange={(e) => setActionCommentaire(e.target.value)}
  rows={5}
  style={{ padding: 10, margin: 10, width: 250, resize: "vertical" }}
/>
          </div>

          {["Livraison", "Facturé", "Payé"].includes(actionType) && (
            <div>
              <input
                type="number"
                placeholder="Montant TTC"
                style={{ padding: 10, margin: 10, width: 250 }}
                value={actionMontantTTC}
                onChange={(e) => setActionMontantTTC(e.target.value)}
              />
            </div>
          )}

          <button
            style={{ padding: 10, marginTop: 10, marginRight: 10 }}
            onClick={async () => {
              const clubId = clubSelected.id || clubSelected.identifiant;

              if (!clubId) {
                alert("Identifiant du club introuvable");
                return;
              }

              const nouvelleAction = {
                club_id: clubId,
                type: actionType,
                date: actionDate,
                commentaire: actionCommentaire,
                montantTTC: ["Livraison", "Facturé", "Payé"].includes(actionType)
                  ? actionMontantTTC
                  : null
              };

              const { data, error } = await supabase
                .from("actions")
                .insert([nouvelleAction])
                .select()
                .single();

              if (error) {
                console.log("ERREUR INSERT ACTION :", error);
                alert("Erreur lors de l'enregistrement de l'action");
                return;
              }

              setActionsClub((prev) => [data, ...prev]);
              setToutesActions((prev) => [data, ...prev]);

              setActionType("Visite club");
              setActionDate(dateDuJourInput);
              setActionCommentaire("");
              setActionMontantTTC("");
            }}
          >
            Ajouter action
          </button>
        </div>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20
          }}
        >
          <h3>Historique</h3>

          {historiques.map((ligne, index) => (
            <div
              key={ligne.id || index}
              style={{
                border: "1px solid #ddd",
                padding: 10,
                margin: 10,
                background: "#f6f2ff",
                borderRadius: 8
              }}
            >
              <div><strong>{ligne.type}</strong></div>
              <div>{ligne.date}</div>
              <div>{ligne.commentaire}</div>

              <button
                style={{
                  padding: 8,
                  marginTop: 10,
                  background: "#b71c1c",
                  color: "white",
                  border: "none",
                  borderRadius: 6
                }}
                onClick={async () => {
                  const ok = window.confirm(
                    "Voulez-vous vraiment supprimer cet élément d’historique ?"
                  );
                  if (!ok) return;

                  const { error } = await supabase
                    .from("historiques")
                    .delete()
                    .eq("id", ligne.id);

                  if (error) {
                    console.log("ERREUR DELETE HISTORIQUE :", error);
                    alert("Erreur lors de la suppression de l'historique");
                    return;
                  }

                  setHistoriquesClub((prev) => prev.filter((h) => h.id !== ligne.id));
                }}
              >
                Supprimer
              </button>
            </div>
          ))}

          <h4>Ajouter un élément d’historique</h4>

          <div>
            <select
              style={{ padding: 10, margin: 10, width: 272 }}
              value={historiqueType}
              onChange={(e) => setHistoriqueType(e.target.value)}
            >
              {historiqueTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div style={{ margin: 10 }}>
            <input
              placeholder="Ajouter un nouveau type"
              style={{ padding: 10, width: 250, marginRight: 10 }}
              value={historiqueNouveauType}
              onChange={(e) => setHistoriqueNouveauType(e.target.value)}
            />
            <button
              style={{ padding: 10 }}
              onClick={() => {
                const valeur = ajouterHistoriqueTypeOption(historiqueNouveauType);
                if (valeur !== "") {
                  setHistoriqueType(valeur);
                  setHistoriqueNouveauType("");
                }
              }}
            >
              Ajouter ce type
            </button>
          </div>

          <div>
            <input
              type="month"
              style={{ padding: 10, margin: 10, width: 250 }}
              value={historiqueDate}
              onChange={(e) => setHistoriqueDate(e.target.value)}
            />
          </div>

          <div>
            <textarea
              placeholder="Commentaire"
              style={{ padding: 10, margin: 10, width: 250, minHeight: 90 }}
              value={historiqueCommentaire}
              onChange={(e) => setHistoriqueCommentaire(e.target.value)}
            />
          </div>

          <button
            style={{ padding: 10, marginTop: 10, marginRight: 10 }}
            onClick={async () => {
              const clubId = clubSelected.id || clubSelected.identifiant;

              if (!clubId) {
                alert("Identifiant du club introuvable");
                return;
              }

              const nouvelleLigne = {
                club_id: clubId,
                type: historiqueType,
                date: historiqueDate,
                commentaire: historiqueCommentaire
              };

              const { data, error } = await supabase
                .from("historiques")
                .insert([nouvelleLigne])
                .select()
                .single();

              if (error) {
                console.log("ERREUR INSERT HISTORIQUE :", error);
                alert("Erreur lors de l'enregistrement de l'historique");
                return;
              }

              setHistoriquesClub((prev) => [data, ...prev]);

              setHistoriqueType(historiqueTypeOptions[0] || "Concurrence");
              setHistoriqueDate(moisDuJourInput);
              setHistoriqueCommentaire("");
            }}
          >
            Ajouter historique
          </button>
        </div>

        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12,
            marginBottom: 20
          }}
        >
          <h3>Pièces jointes</h3>

{pieces.map((p, index) => (
  <div
    key={p.id || index}
    style={{
      border: "1px solid #ccc",
      padding: 10,
      margin: 10,
      background: "#fff",
      borderRadius: 8
    }}
  >
    <div><strong>{p.nom}</strong></div>

    {p.type && p.type.startsWith("image") && (
      <div style={{ marginTop: 8 }}>
        <img
          src={p.url}
          alt={p.nom}
          style={{ width: 120, marginTop: 5, cursor: "pointer" }}
          onClick={() => window.open(p.url, "_blank")}
        />

        <div style={{ marginTop: 10 }}>
          <button
            style={{ padding: 8, marginRight: 10 }}
            onClick={() => window.open(p.url, "_blank")}
          >
            Ouvrir en grand
          </button>

          <button
            style={{ padding: 8, marginRight: 10 }}
            onClick={() => {
              const fenetre = window.open(p.url, "_blank");
              if (fenetre) {
                fenetre.onload = () => fenetre.print();
              }
            }}
          >
            Imprimer
          </button>
        </div>
      </div>
    )}

    {p.type === "application/pdf" && (
      <div style={{ marginTop: 8 }}>
        <a href={p.url} target="_blank" rel="noreferrer">
          Ouvrir le PDF
        </a>

        <div style={{ marginTop: 10 }}>
          <button
            style={{ padding: 8, marginRight: 10 }}
            onClick={() => window.open(p.url, "_blank")}
          >
            Ouvrir
          </button>

          <button
            style={{ padding: 8, marginRight: 10 }}
            onClick={() => {
              const fenetre = window.open(p.url, "_blank");
              if (fenetre) {
                fenetre.onload = () => fenetre.print();
              }
            }}
          >
            Imprimer
          </button>
        </div>
      </div>
    )}

    <button
      style={{
        padding: 8,
        marginTop: 10,
        background: "#b71c1c",
        color: "white",
        border: "none",
        borderRadius: 6
      }}
      onClick={async () => {
        const ok = window.confirm(
          "Voulez-vous vraiment supprimer cette pièce jointe ?"
        );
        if (!ok) return;

        if (p.chemin) {
          const { error: storageError } = await supabase.storage
            .from("pieces-clubs")
            .remove([p.chemin]);

          if (storageError) {
            console.log("ERREUR DELETE STORAGE :", storageError);
          }
        }

        const { error } = await supabase
          .from("pieces_jointes")
          .delete()
          .eq("id", p.id);

        if (error) {
          console.log("ERREUR DELETE PIECE :", error);
          alert("Erreur lors de la suppression de la pièce jointe");
          return;
        }

        setPiecesClub((prev) => prev.filter((piece) => piece.id !== p.id));
      }}
    >
      Supprimer cette pièce jointe
    </button>
  </div>
))}
<div style={{ margin: 10 }}>
  <div style={{ marginBottom: 10 }}>
    <strong>Choisir un fichier</strong>
  </div>
  <input
    type="file"
    accept="image/*,.pdf"
    onChange={(e) => {
      const file = e.target.files[0];
      chargerPiece(file);
    }}
  />
</div>

<div style={{ margin: 10 }}>
  <div style={{ marginBottom: 10 }}>
    <strong>Prendre une photo</strong>
  </div>
  <input
    type="file"
    accept="image/*"
    capture="environment"
    onChange={(e) => {
      const file = e.target.files[0];
      chargerPiece(file);
    }}
  />
</div>

{pieceNom !== "" && (
  <div
    style={{
      margin: 10,
      padding: 10,
      background: "#f5f5f5",
      borderRadius: 8
    }}
  >
    <div>
      Fichier sélectionné : <strong>{pieceNom}</strong>
    </div>

    <button
      style={{ padding: 10, marginTop: 10, marginRight: 10 }}
      onClick={async () => {
        const clubId = clubSelected.id || clubSelected.identifiant;

        if (!clubId) {
          alert("Identifiant du club introuvable");
          return;
        }

        if (!pieceData || !pieceNom) {
          alert("Aucun fichier sélectionné");
          return;
        }

        const response = await fetch(pieceData);
        const blob = await response.blob();

        const nomNettoye = pieceNom.replace(/[^a-zA-Z0-9._-]/g, "_");
        const chemin = `${clubId}/${Date.now()}-${nomNettoye}`;

        const { error: uploadError } = await supabase.storage
          .from("pieces-clubs")
          .upload(chemin, blob, {
            contentType: pieceType,
            upsert: false
          });

        if (uploadError) {
          console.log("ERREUR UPLOAD PIECE :", uploadError);
          alert("Erreur lors de l'envoi du fichier");
          return;
        }

        const { data: publicData } = supabase.storage
          .from("pieces-clubs")
          .getPublicUrl(chemin);

        const nouvellePiece = {
          club_id: clubId,
          nom: pieceNom,
          type: pieceType,
          chemin: chemin,
          url: publicData.publicUrl
        };

        const { data, error } = await supabase
          .from("pieces_jointes")
          .insert([nouvellePiece])
          .select()
          .single();

        if (error) {
          console.log("ERREUR INSERT PIECE :", error);
          alert("Erreur lors de l'enregistrement de la pièce jointe");
          return;
        }

        setPiecesClub((prev) => [data, ...prev]);

        setPieceNom("");
        setPieceType("");
        setPieceData("");
      }}
    >
      Ajouter pièce jointe
    </button>

    <button
      style={{ padding: 10, marginTop: 10 }}
      onClick={() => {
        setPieceNom("");
        setPieceType("");
        setPieceData("");
      }}
    >
      Annuler
    </button>
  </div>
)}
        </div>

 <div style={{ marginTop: 20 }}>
  <button
    style={{ padding: 10, marginRight: 10 }}
    onClick={async () => {
      const clubId = clubSelected.id || clubSelected.identifiant;

      const { error } = await supabase
        .from("clubs")
        .update({
          nom: clubSelected.nom,
          ville: clubSelected.ville,
          sport: clubSelected.sport,
          adherents: clubSelected.adherents,
          potentiel: clubSelected.potentiel
        })
        .eq("id", clubId);

      if (error) {
        console.log("ERREUR UPDATE CLUB :", error);
        alert("Erreur lors de la mise à jour du club");
        return;
      }

      const { error: errorDeleteMag } = await supabase
        .from("magasins_club")
        .delete()
        .eq("club_id", clubId);

      if (errorDeleteMag) {
        console.log("ERREUR DELETE MAGASINS CLUB :", errorDeleteMag);
        alert("Erreur lors de la mise à jour des magasins");
        return;
      }

      const magasinsAInserer = (magasinsClub || []).map((mag) => ({
        club_id: clubId,
        nom: mag.nom,
        taux: Number(mag.taux) || 0
      }));

      if (magasinsAInserer.length > 0) {
        const { error: errorInsertMag } = await supabase
          .from("magasins_club")
          .insert(magasinsAInserer);

        if (errorInsertMag) {
          console.log("ERREUR INSERT MAGASINS CLUB :", errorInsertMag);
          alert("Erreur lors de l'enregistrement des magasins");
          return;
        }
      }

      await chargerClubs();
      await chargerMagasinsClub(clubId);

      setScreen("dashboard");

      setPieceNom("");
      setPieceType("");
      setPieceData("");
    }}
  >
    Enregistrer modifications
  </button>

  <button
    style={{
      padding: 10,
      marginRight: 10,
      background: "#b71c1c",
      color: "white",
      border: "none",
      borderRadius: 6
    }}
    onClick={async () => {
      const ok = window.confirm(
        "Voulez-vous vraiment supprimer ce club ?"
      );
      if (!ok) return;

      const clubId = clubSelected.id || clubSelected.identifiant;

      const { error: errorMag } = await supabase
        .from("magasins_club")
        .delete()
        .eq("club_id", clubId);

      if (errorMag) {
        console.log("ERREUR DELETE MAGASINS :", errorMag);
        alert("Erreur lors de la suppression des magasins liés");
        return;
      }

      const { error: errorContacts } = await supabase
        .from("contacts")
        .delete()
        .eq("club_id", clubId);

      if (errorContacts) {
        console.log("ERREUR DELETE CONTACTS :", errorContacts);
      }

      const { error: errorHistoriques } = await supabase
        .from("historiques")
        .delete()
        .eq("club_id", clubId);

      if (errorHistoriques) {
        console.log("ERREUR DELETE HISTORIQUES :", errorHistoriques);
      }

      const { error: errorActions } = await supabase
        .from("actions")
        .delete()
        .eq("club_id", clubId);

      if (errorActions) {
        console.log("ERREUR DELETE ACTIONS :", errorActions);
      }

      const { error: errorPieces } = await supabase
        .from("pieces_jointes")
        .delete()
        .eq("club_id", clubId);

      if (errorPieces) {
        console.log("ERREUR DELETE PIECES :", errorPieces);
      }

      const { error } = await supabase
        .from("clubs")
        .delete()
        .eq("id", clubId);

      if (error) {
        console.log("ERREUR DELETE CLUB :", error);
        alert("Erreur lors de la suppression du club");
        return;
      }

      await chargerClubs();
      await chargerTousContacts();
      await chargerToutesActions();

      setClubSelected(null);
      setScreen("dashboard");

      setPieceNom("");
      setPieceType("");
      setPieceData("");
    }}
  >
    Supprimer ce club
  </button>

  <button
    style={{ padding: 10 }}
    onClick={() => {
      setScreen("dashboard");
      setPieceNom("");
      setPieceType("");
      setPieceData("");
      setAlerteDoublonContact("");
    }}
  >
    Retour
  </button>
</div>
 </div>

    );
  }
   /* =========================================================
  BLOC 17 - RENDU ECRAN CREATION CLUB
========================================================= */ 
  if (userConnected && screen === "club") {
    const totalMagCreation = totalMagasins(magasinsCreation);

    return (
      <div style={stylePage}>
        <div
          style={{
            background: "white",
            padding: 20,
            borderRadius: 12
          }}
        >
          <h2>Créer un club</h2>

          <p>Code club : {prochainCodeClub}</p>
          <p>Commercial : {userConnected?.nom || ""}</p>

          {alerteDoublonClub !== "" && (
            <div
              style={{
                background: "#fff3cd",
                padding: 10,
                margin: 10,
                border: "1px solid #ffec99"
              }}
            >
              {alerteDoublonClub}
            </div>
          )}

          <input
            placeholder="Nom du club"
            style={{ padding: 10, margin: 10 }}
            value={nomClub}
            onChange={(e) => {
              const value = e.target.value;
              setNomClub(value);
              setAlerteDoublonClub(detecterDoublonClub(value));
            }}
          />

          <input
            placeholder="Ville"
            style={{ padding: 10, margin: 10 }}
            value={villeClub}
            onChange={(e) => setVilleClub(e.target.value)}
          />

          <div>
            <select
              style={{ padding: 10, margin: 10, width: 272 }}
              value={sportClub}
              onChange={(e) => setSportClub(e.target.value)}
            >
              <option value="">Choisir un sport</option>
              {sportsOptions.map((sport) => (
                <option key={sport} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>

          <div style={{ margin: 10 }}>
            <input
              placeholder="Ajouter un nouveau sport"
              style={{ padding: 10, width: 250, marginRight: 10 }}
              value={nouveauSportClub}
              onChange={(e) => setNouveauSportClub(e.target.value)}
            />
            <button
              style={{ padding: 10 }}
              onClick={() => {
                const valeur = ajouterSportOption(nouveauSportClub);
                if (valeur !== "") {
                  setSportClub(valeur);
                  setNouveauSportClub("");
                }
              }}
            >
              Ajouter ce sport
            </button>
          </div>

          <input
            placeholder="Nombre d’adhérents"
            style={{ padding: 10, margin: 10 }}
            value={adherentsClub}
            onChange={(e) => setAdherentsClub(e.target.value)}
          />

          <input
            placeholder="Potentiel TTC"
            style={{ padding: 10, margin: 10 }}
            value={potentielClub}
            onChange={(e) => setPotentielClub(e.target.value)}
          />

          <h3 style={{ marginTop: 20 }}>Rattachement magasins</h3>

          {magasinsCreation.map((mag, index) => (
            <div
              key={index}
              style={{
                background: "#fafafa",
                padding: 10,
                margin: 10,
                border: "1px solid #ddd",
                borderRadius: 8
              }}
            >
              <input
                placeholder="Nom du magasin"
                style={{ padding: 10, marginRight: 10, width: 180 }}
                value={mag.nom}
                onChange={(e) =>
                  updateMagasinCreation(index, "nom", e.target.value)
                }
              />

              <input
                type="number"
                placeholder="%"
                style={{ padding: 10, marginRight: 10, width: 90 }}
                value={mag.taux}
                onChange={(e) =>
                  updateMagasinCreation(index, "taux", e.target.value)
                }
              />

              <button
                style={{
                  padding: 10,
                  background: "#b71c1c",
                  color: "white",
                  border: "none",
                  borderRadius: 6
                }}
                onClick={() => removeMagasinCreation(index)}
              >
                Supprimer
              </button>
            </div>
          ))}

          <button
            style={{ padding: 10, margin: 10 }}
            onClick={addMagasinCreation}
          >
            + Ajouter un magasin
          </button>

          <div style={{ margin: 10, padding: 10, background: "#fff" }}>
            <strong>Total magasins : {totalMagCreation}%</strong>
            {totalMagCreation !== 100 && (
              <div style={{ color: "#b71c1c", marginTop: 5 }}>
                Attention : le total doit idéalement être de 100%.
              </div>
            )}
          </div>

          <br />

          <button
            style={{ padding: 10 }}
            onClick={async () => {
const nouveauClub = {
  code: prochainCodeClub,
  nom: nomClub,
  ville: villeClub,
  sport: sportClub || "",
  adherents: adherentsClub ? Number(adherentsClub) : 0,
  potentiel: potentielClub ? Number(potentielClub) : 0,

commercial: userConnected?.nom || ""
};

              const { data: clubCree, error } = await supabase
                .from("clubs")
                .insert([nouveauClub])
                .select()
                .single();

              if (error) {
                console.log("ERROR INSERT CLUB :", error);
                alert("Erreur lors de l'enregistrement du club : " + error.message);
                return;
              }

              const clubId = clubCree?.id || clubCree?.identifiant;

              if (!clubCree || !clubId) {
                console.log("CLUB CREE :", clubCree);
                alert("Club créé mais identifiant introuvable");
                return;
              }

              const magasinsAInserer = (magasinsCreation || []).map((mag) => ({
                club_id: clubId,
                nom: mag.nom,
                taux: Number(mag.taux) || 0
              }));

              if (magasinsAInserer.length > 0) {
                const { error: errorMagasins } = await supabase
                  .from("magasins_club")
                  .insert(magasinsAInserer);

                if (errorMagasins) {
                  console.log("ERROR INSERT MAGASINS :", errorMagasins);
                  alert(
                    "Club créé, mais erreur lors de l'enregistrement des magasins"
                  );
                  return;
                }
              }

              await chargerClubs();

              setNomClub("");
              setVilleClub("");
              setSportClub("");
              setNouveauSportClub("");
              setAdherentsClub("");
              setPotentielClub("");
              setMagasinsCreation([{ nom: "L’Arbresle", taux: "100" }]);
              setAlerteDoublonClub("");

              setScreen("dashboard");
            }}
          >
            Enregistrer
          </button>

          <button
            style={{ padding: 10, marginLeft: 10 }}
            onClick={() => {
              setScreen("dashboard");
              setAlerteDoublonClub("");
            }}
          >
            Retour
          </button>
        </div>
      </div>
    );
  }
/* =========================================================
  BLOC 17B - RENDU ECRAN OBJECTIFS
========================================================= */
if (userConnected?.role === "superviseur" && screen === "objectifs") {
  const moisExercice = [
    { label: "Avril", mois: 4 },
    { label: "Mai", mois: 5 },
    { label: "Juin", mois: 6 },
    { label: "Juillet", mois: 7 },
    { label: "Août", mois: 8 },
    { label: "Septembre", mois: 9 },
    { label: "Octobre", mois: 10 },
    { label: "Novembre", mois: 11 },
    { label: "Décembre", mois: 12 },
    { label: "Janvier", mois: 1 },
    { label: "Février", mois: 2 },
    { label: "Mars", mois: 3 }
  ];

  function getAnneeDuMoisExercice(mois, exerciceDebut) {
    return mois >= 4 ? exerciceDebut : exerciceDebut + 1;
  }

  function getObjectifLigne(commercial, exerciceDebut, mois, indicateur) {
    const annee = getAnneeDuMoisExercice(mois, exerciceDebut);

    return objectifs.find(
      (obj) =>
        String(obj.commercial || "").toLowerCase() ===
          String(commercial || "").toLowerCase() &&
        String(obj.indicateur || "").toLowerCase() ===
          String(indicateur || "").toLowerCase() &&
        Number(obj.annee_reference) === Number(annee) &&
        Number(obj.mois) === Number(mois)
    );
  }

  function getCANmoins1(commercial, exerciceDebut, mois) {
    const anneeNMoins1 = getAnneeDuMoisExercice(mois, exerciceDebut - 1);

    const actionsNMoins1 = toutesActions.filter((a) => {
      if (a.type !== "Payé") return false;
      if (!a.date) return false;

      const d = new Date(a.date + "T00:00:00");
      const moisAction = d.getMonth() + 1;
      const anneeAction = d.getFullYear();

      if (moisAction !== mois || anneeAction !== anneeNMoins1) {
        return false;
      }

      if (commercial === "Toute l'équipe") return true;

      const club = clubs.find(
        (c) => String(c.id || c.identifiant) === String(a.club_id)
      );

      return (
        club &&
        String(club.commercial || "").toLowerCase() ===
          String(commercial || "").toLowerCase()
      );
    });

    return actionsNMoins1.reduce(
      (sum, a) => sum + (Number(a.montantTTC) || 0),
      0
    );
  }

  function getVisitesNmoins1(commercial, exerciceDebut, mois) {
    const anneeNMoins1 = getAnneeDuMoisExercice(mois, exerciceDebut - 1);

    const visitesNMoins1 = toutesActions.filter((a) => {
      if (a.type !== "Visite club") return false;
      if (!a.date) return false;

      const d = new Date(a.date + "T00:00:00");
      const moisAction = d.getMonth() + 1;
      const anneeAction = d.getFullYear();

      if (moisAction !== mois || anneeAction !== anneeNMoins1) {
        return false;
      }

      if (commercial === "Toute l'équipe") return true;

      const club = clubs.find(
        (c) => String(c.id || c.identifiant) === String(a.club_id)
      );

      return (
        club &&
        String(club.commercial || "").toLowerCase() ===
          String(commercial || "").toLowerCase()
      );
    });

    return visitesNMoins1.length;
  }

  function calculerPourcentageProgression(objectif, nMoins1) {
    const base = Number(nMoins1) || 0;
    const cible = Number(objectif) || 0;

    if (base === 0) return "-";

    const progression = ((cible - base) / base) * 100;
    return `${progression.toFixed(1)}%`;
  }

  async function enregistrerObjectifMois(mois, indicateur, valeurObjectif) {
    const exerciceDebut = Number(objectifExerciceSelection);
    const anneeReferenceLigne = getAnneeDuMoisExercice(mois, exerciceDebut);

    const objectifExistant = getObjectifLigne(
      objectifCommercialSelection,
      exerciceDebut,
      mois,
      indicateur
    );

    if (objectifExistant) {
      const { error } = await supabase
        .from("objectifs")
        .update({
          valeur_objectif: Number(valeurObjectif) || 0,
          exercice_fiscal: exerciceDebut
        })
        .eq("id", objectifExistant.id);

      if (error) {
        console.log("ERREUR UPDATE OBJECTIF :", error);
        alert("Erreur lors de la mise à jour de l'objectif");
        return;
      }
    } else {
      const { error } = await supabase
        .from("objectifs")
        .insert([
          {
            commercial: objectifCommercialSelection,
            indicateur: indicateur,
            mois: mois,
            annee_reference: anneeReferenceLigne,
            exercice_fiscal: exerciceDebut,
            valeur_objectif: Number(valeurObjectif) || 0
          }
        ]);

      if (error) {
        console.log("ERREUR INSERT OBJECTIF :", error);
        alert("Erreur lors de l'enregistrement de l'objectif");
        return;
      }
    }

    await chargerObjectifs();
  }

  return (
    <div style={stylePage}>
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 12,
          marginBottom: 20
        }}
      >
        <h2>Tableau des objectifs</h2>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 15 }}>
          <select
            style={{ padding: 10, width: 220 }}
            value={objectifCommercialSelection}
            onChange={(e) => setObjectifCommercialSelection(e.target.value)}
          >
            <option>Bruno</option>
            <option>Adrien</option>
            <option>Hervé</option>
            <option>Arbresle</option>
            <option>Confluence</option>
            <option>Compta</option>
            <option>Toute l'équipe</option>
          </select>

          <select
            style={{ padding: 10, width: 220 }}
            value={objectifExerciceSelection}
            onChange={(e) => setObjectifExerciceSelection(e.target.value)}
          >
            <option value="2024">Ex24-25</option>
            <option value="2025">Ex25-26</option>
            <option value="2026">Ex26-27</option>
            <option value="2027">Ex27-28</option>
          </select>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 12,
          overflowX: "auto"
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f5f5f5" }}>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "left" }}>
                Mois
              </th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "right" }}>
                CA encaissé N-1
              </th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "right" }}>
                Objectif CA
              </th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "right" }}>
                % prog OBJ CA
              </th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "right" }}>
                Visites N-1
              </th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "right" }}>
                Objectif visites
              </th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "right" }}>
                % prog OBJ visites
              </th>
              <th style={{ padding: 10, border: "1px solid #ddd", textAlign: "center" }}>
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {moisExercice.map((ligne) => {
              const objectifCAExistant = getObjectifLigne(
                objectifCommercialSelection,
                Number(objectifExerciceSelection),
                ligne.mois,
                "ca_encaisse_ttc"
              );

              const objectifVisitesExistant = getObjectifLigne(
                objectifCommercialSelection,
                Number(objectifExerciceSelection),
                ligne.mois,
                "visites"
              );

              const valeurObjectifCA = objectifCAExistant
                ? Number(objectifCAExistant.valeur_objectif) || 0
                : 0;

              const valeurObjectifVisites = objectifVisitesExistant
                ? Number(objectifVisitesExistant.valeur_objectif) || 0
                : 0;

              const caNMoins1 = getCANmoins1(
                objectifCommercialSelection,
                Number(objectifExerciceSelection),
                ligne.mois
              );

              const visitesNMoins1 = getVisitesNmoins1(
                objectifCommercialSelection,
                Number(objectifExerciceSelection),
                ligne.mois
              );

              const progressionCA = calculerPourcentageProgression(
                valeurObjectifCA,
                caNMoins1
              );

              const progressionVisites = calculerPourcentageProgression(
                valeurObjectifVisites,
                visitesNMoins1
              );

              return (
                <tr
                  key={`${objectifCommercialSelection}-${objectifExerciceSelection}-${ligne.mois}`}
                >
                  <td style={{ padding: 10, border: "1px solid #ddd" }}>
                    {ligne.label}
                  </td>

                  <td
                    style={{
                      padding: 10,
                      border: "1px solid #ddd",
                      textAlign: "right"
                    }}
                  >
                    {caNMoins1} €
                  </td>

                  <td
                    style={{
                      padding: 10,
                      border: "1px solid #ddd",
                      textAlign: "right"
                    }}
                  >
                    <input
                      type="number"
                      defaultValue={valeurObjectifCA}
                      id={`objectif-ca-${objectifCommercialSelection}-${objectifExerciceSelection}-${ligne.mois}`}
                      style={{ padding: 8, width: 120, textAlign: "right" }}
                    />
                  </td>

                  <td
                    style={{
                      padding: 10,
                      border: "1px solid #ddd",
                      textAlign: "right"
                    }}
                  >
                    {progressionCA}
                  </td>

                  <td
                    style={{
                      padding: 10,
                      border: "1px solid #ddd",
                      textAlign: "right"
                    }}
                  >
                    {visitesNMoins1}
                  </td>

                  <td
                    style={{
                      padding: 10,
                      border: "1px solid #ddd",
                      textAlign: "right"
                    }}
                  >
                    <input
                      type="number"
                      defaultValue={valeurObjectifVisites}
                      id={`objectif-visites-${objectifCommercialSelection}-${objectifExerciceSelection}-${ligne.mois}`}
                      style={{ padding: 8, width: 120, textAlign: "right" }}
                    />
                  </td>

                  <td
                    style={{
                      padding: 10,
                      border: "1px solid #ddd",
                      textAlign: "right"
                    }}
                  >
                    {progressionVisites}
                  </td>

                  <td
                    style={{
                      padding: 10,
                      border: "1px solid #ddd",
                      textAlign: "center"
                    }}
                  >
                    <button
                      style={{
                        padding: 8,
                        background: "#1565c0",
                        color: "white",
                        border: "none",
                        borderRadius: 6
                      }}
                      onClick={async () => {
                        const inputCA = document.getElementById(
                          `objectif-ca-${objectifCommercialSelection}-${objectifExerciceSelection}-${ligne.mois}`
                        );
                        const inputVisites = document.getElementById(
                          `objectif-visites-${objectifCommercialSelection}-${objectifExerciceSelection}-${ligne.mois}`
                        );

                        const valeurCA = inputCA ? inputCA.value : 0;
                        const valeurVisites = inputVisites ? inputVisites.value : 0;

                        await enregistrerObjectifMois(
                          ligne.mois,
                          "ca_encaisse_ttc",
                          valeurCA
                        );

                        await enregistrerObjectifMois(
                          ligne.mois,
                          "visites",
                          valeurVisites
                        );
                      }}
                    >
                      Enregistrer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div style={{ marginTop: 20 }}>
          <button
            style={{ padding: 10 }}
            onClick={() => setScreen("dashboard")}
          >
            Retour dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
/* =========================================================
  BLOC 18 - RENDU DASHBOARD PRINCIPAL
========================================================= */
if (userConnected) {
  const totalAdh = clubsFiltres.reduce(
    (sum, c) => sum + Number(c.adherents || 0),
    0
  );

  return (
    <div style={stylePage}>
      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 12,
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          flexWrap: "wrap",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 15, flexWrap: "wrap" }}>
          <img
            src={logo}
            alt="Logo"
            style={{
              width: 60,
              height: "auto",
              display: "block"
            }}
          />

          <div>
            <h2 style={{ margin: 0 }}>CRM Clubs</h2>
            <div>
              Commercial connecté : <strong>{userConnected?.nom || ""}</strong>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <button
            style={{ padding: 10 }}
            onClick={() => setScreen("club")}
          >
            + Nouveau club
          </button>

          <button
            style={{
              padding: "6px 10px",
              background: "#1565c0",
              color: "white",
              border: "none",
              borderRadius: 6,
              fontSize: 12
            }}
            onClick={async () => {
              await chargerPlanning();
              setScreen("planning");
            }}
          >
            📅 Planning
          </button>

          {userConnected?.role === "superviseur" && (
            <button
              style={{ padding: 10 }}
              onClick={() => {
                setObjectifCommercialSelection(userConnected?.nom || "Bruno");
                setObjectifExerciceSelection("2026");
                setScreen("objectifs");
              }}
            >
              Objectifs
            </button>
          )}

          <button
            style={{ padding: 10 }}
            onClick={exportClubsCSV}
          >
            Export Excel
          </button>

          <button
            style={{
              padding: 10,
              background: "#444",
              color: "white",
              border: "none",
              borderRadius: 6
            }}
            onClick={handleLogout}
          >
            Déconnexion
          </button>

          {filtreBlocDashboard !== "Tous" && (
            <button
              style={{
                padding: 10,
                background: "#ef6c00",
                color: "white",
                border: "none",
                borderRadius: 6
              }}
              onClick={() => {
                setFiltreBlocDashboard("Tous");
              }}
            >
              RAZ filtre bloc
            </button>
          )}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2.2fr 1fr 2.2fr 1fr",
          gap: 20,
          marginBottom: 20,
          marginTop: 10
        }}
      >

{/* ===================== CA MOIS ===================== */}
<div
  onClick={() => {
    setFiltreBlocDashboard("CA_MOIS");
    setFiltrePeriode("Mois");
  }}
  style={{
    background: "white",
    padding: 20,
    borderRadius: 12,
    cursor: "pointer"
  }}
>
  <h3>CA du mois</h3>

<div>Objectif : {formatMontant(objectifMoisCA)} €</div>
<div>Réalisé : {formatMontant(realiseMoisCA)} €</div>
<div>Écart : {formatMontant(ecartMoisCA)} €</div>
  <div>% : {tauxMoisCA.toFixed(1)}%</div>
  <div>
    Statut : <strong>{statutMoisCA}</strong>
  </div>

  {filtreBlocDashboard === "CA_MOIS" && (
    <div style={{ marginTop: 10 }}>
      <span
        style={{
          background: "#ef6c00",
          color: "white",
          padding: "6px 10px",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: "bold"
        }}
      >
        ⌛ Vue filtrée
      </span>
    </div>
  )}

  <div
    style={{
      marginTop: 15,
      height: 20,
      background: "#eee",
      borderRadius: 10,
      overflow: "hidden",
      display: "flex"
    }}
  >
    <div
      style={{
        width: `${largeurVertMois}%`,
        height: "100%",
        background: statutMoisCA === "Retard" ? "#ff9800" : "#4caf50"
      }}
    />

    {tauxMoisCA > 100 && (
      <div
        style={{
          width: `${largeurBleuMois}%`,
          height: "100%",
          background: "#2196f3"
        }}
      />
    )}
  </div>

  {tauxMoisCA > 100 && (
    <div style={{ marginTop: 8, color: "#2196f3", fontWeight: "bold" }}>
      Dépassé de {(tauxMoisCA - 100).toFixed(1)}%
    </div>
  )}
</div>
{/* ===================== VISITES MOIS ===================== */}
<div
  onClick={() => {
    setFiltreBlocDashboard("VISITES_MOIS");
    setFiltrePeriode("Mois");
  }}
  style={{
    background: "white",
    padding: 20,
    borderRadius: 12,
    cursor: "pointer"
  }}
>
          <h3>Visites du mois</h3>

          <div>Objectif : {objectifMoisVisites}</div>
          <div>Réalisé : {realiseMoisVisites}</div>
          <div>Écart : {ecartMoisVisites}</div>
          <div>% : {tauxMoisVisites.toFixed(1)}%</div>
          <div>
            Statut : <strong>{statutMoisVisites}</strong>
          </div>
{filtreBlocDashboard === "VISITES_MOIS" && (
  <div style={{ marginTop: 10 }}>
    <span
      style={{
        background: "#ef6c00",
        color: "white",
        padding: "6px 10px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: "bold",
        display: "inline-block"
      }}
    >
      ⌛ Vue filtrée
    </span>
  </div>
)}
          <div
            style={{
              marginTop: 15,
              height: 20,
              background: "#eee",
              borderRadius: 10,
              overflow: "hidden",
              display: "flex"
            }}
          >
            <div
              style={{
                width: `${largeurVertMoisVisites}%`,
                height: "100%",
                background:
                  statutMoisVisites === "Retard" ? "#ff9800" : "#4caf50"
              }}
            />

            {tauxMoisVisites > 100 && (
              <div
                style={{
                  width: `${largeurBleuMoisVisites}%`,
                  height: "100%",
                  background: "#2196f3"
                }}
              />
            )}
          </div>

          {tauxMoisVisites > 100 && (
            <div style={{ marginTop: 8, color: "#2196f3", fontWeight: "bold" }}>
              Dépassé de {(tauxMoisVisites - 100).toFixed(1)}%
            </div>
          )}
        </div>

        {/* ===================== CA CUMUL ===================== */}
<div
  onClick={() => {
    setFiltreBlocDashboard("CA_CUMUL");
    setFiltrePeriode("Exercice fiscal");
  }}
  style={{
    background: "white",
    padding: 20,
    borderRadius: 12,
    cursor: "pointer"
  }}
>
          <h3>Cumul CA</h3>

<div>Objectif : {formatMontant(objectifCumulCA)} €</div>
<div>Réalisé : {formatMontant(realiseCumulCA)} €</div>
<div>Écart : {formatMontant(ecartCumulCA)} €</div>
          <div>% : {tauxCumulCA.toFixed(1)}%</div>
          <div>
            Statut : <strong>{statutCumulCA}</strong>
          </div>
{filtreBlocDashboard === "CA_CUMUL" && (
  <div style={{ marginTop: 10 }}>
    <span
      style={{
        background: "#ef6c00",
        color: "white",
        padding: "6px 10px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: "bold"
      }}
    >
      ⌛ Vue filtrée
    </span>
  </div>
)}
          <div
            style={{
              marginTop: 15,
              height: 20,
              background: "#eee",
              borderRadius: 10,
              overflow: "hidden",
              display: "flex"
            }}
          >
            <div
              style={{
                width: `${largeurVertCumul}%`,
                height: "100%",
                background: statutCumulCA === "Retard" ? "#ff9800" : "#4caf50"
              }}
            />

            {tauxCumulCA > 100 && (
              <div
                style={{
                  width: `${largeurBleuCumul}%`,
                  height: "100%",
                  background: "#2196f3"
                }}
              />
            )}
          </div>

          {tauxCumulCA > 100 && (
            <div style={{ marginTop: 8, color: "#2196f3", fontWeight: "bold" }}>
              Dépassé de {(tauxCumulCA - 100).toFixed(1)}%
            </div>
          )}
        </div>


{/* ===================== VISITES CUMUL ===================== */}
<div
  onClick={() => {
    setFiltreBlocDashboard("VISITES_CUMUL");
    setFiltrePeriode("Exercice fiscal");
  }}
  style={{
    background: "white",
    padding: 20,
    borderRadius: 12,
    cursor: "pointer"
  }}
>
  <h3>Cumul visites</h3>

  <div>Objectif : {objectifCumulVisites}</div>
  <div>Réalisé : {realiseCumulVisites}</div>
  <div>Écart : {ecartCumulVisites}</div>
  <div>% : {tauxCumulVisites.toFixed(1)}%</div>
  <div>
    Statut : <strong>{statutCumulVisites}</strong>
  </div>

  {filtreBlocDashboard === "VISITES_CUMUL" && (
    <div style={{ marginTop: 10 }}>
      <span
        style={{
          background: "#ef6c00",
          color: "white",
          padding: "6px 10px",
          borderRadius: 8,
          fontSize: 12,
          fontWeight: "bold"
        }}
      >
        ⌛ Vue filtrée
      </span>
    </div>
  )}

  <div
    style={{
      marginTop: 15,
      height: 20,
      background: "#eee",
      borderRadius: 10,
      overflow: "hidden",
      display: "flex"
    }}
  >
    <div
      style={{
        width: `${largeurVertCumulVisites}%`,
        height: "100%",
        background:
          statutCumulVisites === "Retard" ? "#ff9800" : "#4caf50"
      }}
    />

    {tauxCumulVisites > 100 && (
      <div
        style={{
          width: `${largeurBleuCumulVisites}%`,
          height: "100%",
          background: "#2196f3"
        }}
      />
    )}
  </div>

  {tauxCumulVisites > 100 && (
    <div style={{ marginTop: 8, color: "#2196f3", fontWeight: "bold" }}>
      Dépassé de {(tauxCumulVisites - 100).toFixed(1)}%
    </div>
  )}
</div>
      </div>

      <div
  style={{
    display: "flex",
    gap: 14,
    marginBottom: 20,
    flexWrap: "wrap",
    alignItems: "stretch"
  }}
>
        <div
          style={{
            flex: 1,
            minWidth: 160,
            background: "white",
            padding: 20,
            borderRadius: 12
          }}
        >
          <div style={{ fontSize: 13, color: "#777" }}>Nombre de clubs</div>
          <div style={{ fontSize: 26, fontWeight: "bold" }}>{totalClubs}</div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 160,
            background: "white",
            padding: 20,
            borderRadius: 12
          }}
        >
          <div style={{ fontSize: 13, color: "#777" }}>Total adhérents</div>
          <div style={{ fontSize: 26, fontWeight: "bold" }}>{totalAdh}</div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 160,
            background: "white",
            padding: 20,
            borderRadius: 12
          }}
        >
          <div style={{ fontSize: 13, color: "#777" }}>
            Potentiel total TTC
          </div>
          <div style={{ fontSize: 26, fontWeight: "bold" }}>
           {formatMontant(potentielTotal)} €
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 360,
            background: "white",
            padding: 20,
            borderRadius: 12
          }}
        >
          <div style={{ fontSize: 13, color: "#777" }}>
            Actions / Offres / Commandes / Livraisons / Facturations / Relances
          </div>
          <div style={{ fontSize: 20, fontWeight: "bold" }}>
            {totalActions} / {totalOffres} / {totalCommandes} / {totalLivraisons} / {totalFacturations} / {totalRelances}
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: "white",
            padding: 20,
            borderRadius: 12
          }}
        >
          <div style={{ fontSize: 13, color: "#777" }}>Livraisons TTC</div>
          <div style={{ fontSize: 26, fontWeight: "bold" }}>
         {formatMontant(totalLivraisonsTTC)} €
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: "white",
            padding: 20,
            borderRadius: 12
          }}
        >
          <div style={{ fontSize: 13, color: "#777" }}>
            Montant facturé TTC
          </div>
          <div style={{ fontSize: 26, fontWeight: "bold" }}>
          {formatMontant(totalFacturesTTC)} €
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 220,
            background: "white",
            padding: 20,
            borderRadius: 12
          }}
        >
          <div style={{ fontSize: 13, color: "#777" }}>Montant payé TTC</div>
          <div style={{ fontSize: 26, fontWeight: "bold" }}>
        {formatMontant(totalPayesTTC)} €
          </div>
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 240,
            background: "white",
            padding: 20,
            borderRadius: 12
          }}
        >
          <div style={{ fontSize: 13, color: "#777" }}>
            Solde restant à encaisser
          </div>
          <div style={{ fontSize: 26, fontWeight: "bold" }}>
           {formatMontant(soldeRestantEncaisser)} €
          </div>
        </div>
      </div>

      <div
        style={{
          background: "white",
          padding: 20,
          borderRadius: 12,
          marginBottom: 20
        }}
      >
        <h3>Filtres et recherche</h3>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            style={{ padding: 10, width: 320 }}
            placeholder="Code club, nom club, ville, sport, nom contact, téléphone, mail"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
          />

          <select
            style={{ padding: 10, width: 220 }}
            value={filtreCommercial}
            onChange={(e) => setFiltreCommercial(e.target.value)}
          >
            <option>Moi</option>
            <option>Adrien</option>
            <option>Hervé</option>
            <option>Bruno</option>
            <option>Arbresle</option>
            <option>Confluence</option>
            <option>Compta</option>
            <option>Toute l'équipe</option>
          </select>

          <select
            style={{ padding: 10, width: 220 }}
            value={filtreSport}
            onChange={(e) => setFiltreSport(e.target.value)}
          >
            <option>Tous les sports</option>
            {sportsOptions.map((sport) => (
              <option key={sport} value={sport}>
                {sport}
              </option>
            ))}
          </select>

          <select
            style={{ padding: 10, width: 240 }}
            value={filtreFinancier}
            onChange={(e) => setFiltreFinancier(e.target.value)}
          >
            <option>Tous</option>
            <option>Livré non facturé</option>
            <option>Facturé non payé</option>
          </select>

          <select
            style={{ padding: 10, width: 220 }}
            value={filtrePeriode}
            onChange={(e) => setFiltrePeriode(e.target.value)}
          >
            <option>Toutes périodes</option>
            <option>Semaine</option>
            <option>Mois</option>
            <option>Exercice fiscal</option>
            <option>Depuis telle date</option>
          </select>
{filtrePeriode === "Mois" && (
  <input
    type="month"
    style={{ padding: 10 }}
    value={moisSelectionne}
    onChange={(e) => setMoisSelectionne(e.target.value)}
  />
)}
          {filtrePeriode === "Depuis telle date" && (
            <input
              type="date"
              style={{ padding: 10 }}
              value={dateDepuis}
              onChange={(e) => setDateDepuis(e.target.value)}
            />
          )}

          <select
            style={{ padding: 10, width: 220 }}
            value={modeObjectif}
            onChange={(e) => setModeObjectif(e.target.value)}
          >
            <option>Exercice fiscal</option>
            <option>Année civile</option>
          </select>

          {modeObjectif === "Exercice fiscal" && (
            <select
              style={{ padding: 10, width: 220 }}
              value={exerciceSelectionne}
              onChange={(e) => setExerciceSelectionne(e.target.value)}
            >
              <option value="2024">Ex24-25</option>
              <option value="2025">Ex25-26</option>
              <option value="2026">Ex26-27</option>
              <option value="2027">Ex27-28</option>
            </select>
          )}
        </div>
      </div>

<div
  style={{
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
    flexWrap: "wrap"
  }}
>
  <div
    style={{
      flex: 1,
      minWidth: 320,
      background: "white",
      padding: 20,
      borderRadius: 12
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 15
      }}
    >
      <h3 style={{ margin: 0 }}>Liste des clubs</h3>

      <button
        style={{
          padding: 10,
          background: "#1565c0",
          color: "white",
          border: "none",
          borderRadius: 6
        }}
        onClick={async () => {
          await chargerPlanning();
          setScreen("planning");
        }}
      >
        Voir le planning
      </button>
    </div>

          {clubsFiltres.map((club, index) => {
            const { totalLivre, totalFacture, totalPaye } = getTotauxClub(club);
            const badgeLivreNonFacture = totalLivre > totalFacture;
            const badgeFactureNonPaye = totalFacture > totalPaye;

            return (
              <div
                key={club.id || index}
                style={{
                  borderBottom: "1px solid #eee",
                  padding: 12,
                  cursor: "pointer"
                }}
                onClick={async () => {
                  await chargerDetailClub(club);
                  setScreen("detailClub");
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap"
                  }}
                >
                  <strong>{club.code}</strong>
                  <span>
                    — {club.nom} — {club.ville} — {club.sport || "Sans sport"} —{" "}
                    {club.adherents || 0} adh — {club.potentiel} € —{" "}
                    {club.commercial}
                  </span>

                  {badgeLivreNonFacture && (
                    <span
                      style={{
                        background: "#ff9800",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: "bold"
                      }}
                    >
                      🟠 Livré non facturé
                    </span>
                  )}

                  {badgeFactureNonPaye && (
                    <span
                      style={{
                        background: "#d32f2f",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: 12,
                        fontSize: 12,
                        fontWeight: "bold"
                      }}
                    >
                      🔴 Facturé non payé
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {clubsFiltres.length === 0 && (
            <div style={{ padding: 12 }}>Aucun club trouvé.</div>
          )}
        </div>


      </div>
    </div>
  );
}
   /* =========================================================
     BLOC 19 - RENDU ECRAN LOGIN
========================================================= */ 
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f2f2f2"
      }}
    >
      <div
        style={{
          background: "white",
          padding: 30,
          borderRadius: 10,
          width: 300,
          textAlign: "center"
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "33%",
            display: "block",
            margin: "0 auto 20px auto"
          }}
        />

        <h2>CRM CLUBS</h2>

        <input
          style={{ width: "100%", padding: 10, marginTop: 10 }}
          placeholder="Utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          style={{ width: "100%", padding: 10, marginTop: 10 }}
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          style={{
            marginTop: 20,
            width: "100%",
            padding: 12,
            background: "#333",
            color: "white",
            border: "none",
            borderRadius: 6
          }}
        >
          SE CONNECTER
        </button>
		<div style={{ marginTop: 10, fontSize: 12, color: "#999" }}>
			Version {VERSION}
		</div>
      </div>
    </div>
  );
}
/* =========================================================
   BLOC 20 - EXPORT COMPOSANT
========================================================= */
export default App; 