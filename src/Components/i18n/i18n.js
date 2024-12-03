import i18next from "i18next";
import I18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next, Translation } from "react-i18next";

i18next
    .use(LanguageDetector)
.use(initReactI18next)
.init({
    debug: true,
    lng: "en",
    resources:{
        en:{
            translation:{
                greeting: "Hello, welcome to Easy Diary"
            }
        },
        bn:{
            translation:{
                greeting: "হ্যালো, সহজ ডায়েরিতে স্বাগতম"
            }
        }
    }
})