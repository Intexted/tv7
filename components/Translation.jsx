import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

export const Transtlation = () => {
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .use(LanguageDetector)
    .init({
      // the translations
      // (tip move them in a JSON file and import them,
      // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
      resources: {
        en: {
          translation: {
            en_ce_moment: "Now",
            part1: "Early evening",
            part2: "Mid evening",
            part3: "End of the night",
            part1P: "Early ",
            part2P: "Mid ",
            part3P: "End ",
            accueil: "Home",
            programme_journee: "Day programs",
            mon_tv_guide: "My TV 7 Guide",
            evening: "Your evening programs",
            bouquets_tv: "TV packages",
            parametres: "Settings",
            mon_profil: "My profile",
            pas_de_pub: "Stop seeing ads",
            se_deconnecter: "Sign out",
            connect: "Login",
            register_now: "Register now",
            no_inscrit: "Not yet registered?",
            you_have_an_account: "Already have an account?",
            search_placeholder: "Search ...",
            you_have_an_account: "Already have an account?",
            fullname_placeholder: "Enter your full name",
            email_placeholder: "Enter Your email address",
            password_placeholder: "Enter your Password",
            confirm_password_placeholder: "Confirm your Password",
            update_profile: "Update profil",
            day: "Day",
            evening: "Evening",
            en: "English",
            fr: "Français",
            ar: "العربية",
            continue_facebook: "Continue with Faceboook",
            continue_gmail: "Continue with Gmail",
            continue_twitter: "Continue with Twitter",
          },
        },
        fr: {
          translation: {
            en_ce_moment: "Maintenant",
            part1: "Début de soirée",
            part2: "Milieu de soirée",
            part3: "Fin de soirée",
            part1P: "Debut ",
            part2P: "Milieu ",
            part3P: "Fin ",
            accueil: "Accueil",
            programme_journee: "Programme de la journée",
            mon_tv_guide: "Personnalisez votre programme TV",
            evening: "Programme de la soirée",
            bouquets_tv: "Bouquets TV",
            parametres: "Paramètres",
            mon_profil: "Mon profil",
            pas_de_pub: "Ne plus voir de publicité",
            se_deconnecter: "Se déconnecter",
            connect: "Se connecter",
            register_now: "S'inscrire maintenant",
            no_inscrit: "Pas encore inscrit?",
            you_have_an_account: "Vous avez déja un compte?",
            search_placeholder: "Recherche ...",
            you_have_an_account: "Vous avez déja un compte?",
            fullname_placeholder: "Nom complet",
            email_placeholder: "Entrez votre adresse email",
            password_placeholder: "Entrez votre mot de passe",
            confirm_password_placeholder: "Confirmez votre mot de passe",
            update_profile: "Mettre a jour le profil",
            day: "Journée",
            evening: "Soirée",
            en: "English",
            fr: "Français",
            ar: "العربية",
            continue_facebook: "Continuer avec Faceboook",
            continue_gmail: "Continuer avec Gmail",
            continue_twitter: "Continuer avec Twitter",
          },
        },
        ar: {
          translation: {
            en_ce_moment: "حاليا",
            part1: "بداية الأمسية",
            part2: "منتصف المساء",
            part3: "نهاية الليل",
            part1P: "بداية ",
            part2P: "منتصف ",
            part3P: "نهاية ",
            accueil: "الرئيسية",
            programme_journee: "برامج اليوم",
            mon_tv_guide: "دليل التلفاز الخاص بي",
            evening: "تلفزيونك المسائي",
            bouquets_tv: "باقات القنوات",
            parametres: "الإعدادات",
            mon_profil: "ملفي الشخصي",
            pas_de_pub: "إيقاف مشاهدة الإعلانات",
            se_deconnecter: "تسجيل الخروج",
            connect: "تسجيل الدخول",
            no_inscrit: "غير مسجل بعد؟",
            register_now: "سجل الان",
            you_have_an_account: "هل لديك حساب؟",
            search_placeholder:
              "........................................ بحث ...",
            you_have_an_account: "هل لديك حساب؟",
            email_placeholder:
              ".................... أدخل عنوان بريدك الالكتروني ....................",
            fullname_placeholder:
              "............................ أدخل اسمك الكامل ........................................",
            password_placeholder:
              "............................ ادخل كلمة السر ........................................",
            confirm_password_placeholder:
              "............................ تأكيد كلمة السر ........................................",
            update_profile: "تحديث الملف",
            day: "اليوم",
            evening: "المساء",
            en: "English",
            fr: "Français",
            ar: "العربية",
            continue_facebook: "الدخول باستخدام الفيسبوك",
            continue_gmail: "الدخول باستخدام جيميل",
            continue_twitter: "الدخول باستخدام تويتر",
          },
        },
      },
      // lng: "fr", // if you're using a language detector, do not define the lng option
      fallbackLng: "ar",
      detection: {
        order: [
          "querystring",
          "cookie",
          "localStorage",
          "sessionStorage",
          "navigator",
          "htmlTag",
          "path",
          "subdomain",
        ],
      },

      interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
      },
    });

  // // //
  const change_lang = () => {
    let lng = i18n.language.split("-")[0].toLowerCase();

    if (lng === "en" || lng === "fr" || lng === "ar") i18n.changeLanguage(lng);
    else {
      i18n.changeLanguage("fr");
    }
  };
  change_lang();
};
