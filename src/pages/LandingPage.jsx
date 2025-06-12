import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { LightMode, DarkMode } from "@mui/icons-material";
import { motion } from "framer-motion";
import { CheckCircle } from "@mui/icons-material";
import {
  LibraryBooks,
  VolumeUp,
  Quiz,
  Category,
  Brightness4,
  PhoneAndroid,
} from "@mui/icons-material";

const features = [
  {
    title: "Kendi Kartlarını Oluştur",
    desc: "İster kelime ister cümle, kendi öğrenme kartlarını oluştur. Kişiselleştirilmiş içeriklerle daha etkili öğren.",
    icon: <LibraryBooks fontSize="large" />,
    bgLight: "bg-blue-100",
    textLight: "text-blue-900",
    bgDark: "bg-blue-900",
    textDark: "text-blue-200",
  },
  {
    title: "Sesli Tekrar & Dinleme",
    desc: "Gerçek insan sesiyle okunan cümle ve kelimeleri dinle, telaffuzunu geliştir. Dinle ve tekrarla!",
    icon: <VolumeUp fontSize="large" />,
    bgLight: "bg-green-100",
    textLight: "text-green-900",
    bgDark: "bg-green-900",
    textDark: "text-green-200",
  },
  {
    title: "AI Destekli Quiz",
    desc: "Zorluk seviyene göre hazırlanan AI destekli quizlerle bilgini test et, anında geri bildirim al.",
    icon: <Quiz fontSize="large" />,
    bgLight: "bg-yellow-100",
    textLight: "text-yellow-900",
    bgDark: "bg-yellow-900",
    textDark: "text-yellow-200",
  },
  {
    title: "Kategoriye Göre İçerik",
    desc: "İster seyahat ister iş İngilizcesi. Amacına uygun içerikler sayesinde hedef odaklı çalış.",
    icon: <Category fontSize="large" />,
    bgLight: "bg-purple-100",
    textLight: "text-purple-900",
    bgDark: "bg-purple-900",
    textDark: "text-purple-200",
  },
  {
    title: "Tema Seçimi",
    desc: "Karanlık ya da aydınlık — göz konforunuza uygun temayı seçin, keyifli bir öğrenme deneyimi yaşayın.",
    icon: <Brightness4 fontSize="large" />,
    bgLight: "bg-pink-100",
    textLight: "text-pink-900",
    bgDark: "bg-pink-900",
    textDark: "text-pink-200",
  },
  {
    title: "Mobil Uyumlu Arayüz",
    desc: "Learnverse her cihazda mükemmel çalışır. Mobilde, tablette veya bilgisayarda sorunsuz öğrenin.",
    icon: <PhoneAndroid fontSize="large" />,
    bgLight: "bg-teal-100",
    textLight: "text-teal-900",
    bgDark: "bg-teal-900",
    textDark: "text-teal-200",
  },
];
const generalAnalyses = [
  [
    "Toplam 120.000+ aktif kullanıcı Learnverse'i tercih etti.",
    "%90 kullanıcı genel memnuniyet oranı ile geri bildirim verdi.",
    "Platform 6 farklı üyelik planı ile herkese uygun seçenekler sunuyor.",
  ],
  [
    "Günlük ortalama 15.000 sesli tekrar gerçekleştiriliyor.",
    "Platform 16 farklı dil desteği sağlıyor.",
    "Kullanıcıların %70'i mobil uygulamaları aktif kullanıyor.",
  ],
  [
    "AI destekli quizlerle 6 milyondan fazla test tamamlandı.",
    "Ortalama quiz başarı oranı %93 olarak ölçülüyor.",
    "Quizler hem ücretsiz hem premium üyeliklerde aktif.",
  ],
  [
    "50+ farklı içerik kategorisi bulunuyor.",
    "Haftalık ortalama 500 yeni içerik ekleniyor.",
    "Kullanıcıların %60’ı günlük olarak kategori bazlı öğrenme yapıyor.",
  ],
  [
    "Kullanıcıların %75’i karanlık temayı aktif olarak kullanıyor.",
    "Tema seçimi cihaz ve oturumlar arasında otomatik senkronize ediliyor.",
    "Tema tercihi kişisel tercihe göre otomatik kaydediliyor.",
  ],
  [
    "Tüm platformlar %100 responsive olarak tasarlandı.",
    "Mobil kullanıcı oranı %68 ile hızla artıyor.",
    "iOS ve Android uygulamaları önümüzdeki ay kullanıma sunulacak.",
  ],
];
const generalFeatures = [
  "Kullanıcı dostu arayüz ile hızlı erişim.",
  "24/7 destek ve sürekli güncellenen içerik.",
  "Gelişmiş yapay zeka algoritmalarıyla kişiselleştirme.",
  "Platformlar arası senkronizasyon ve otomatik kayıt.",
  "Gizlilik ve veri güvenliğine maksimum önem.",
];
export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(false);

  // Optional: sayfa yüklendiğinde body veya html tag'ına da dark class ekle (tailwind bazen sorun yaşamamak için)
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen transition-colors duration-500 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="LearnVerse Logo" style={{ height: 40 }} />
          <h1 className="text-2xl font-bold">Learnverse</h1>
        </div>
        <nav className="space-x-4 hidden sm:block">
          <Link to="#features" className="hover:underline">
            Özellikler
          </Link>
          <Link to="#general-analyses" className="hover:underline">
            Genel Analizler
          </Link>
          <Link to="#about" className="hover:underline">
            Hakkında
          </Link>
          <Link to="#contact" className="hover:underline">
            İletişim
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
            aria-label="Toggle theme"
          >
            {!darkMode ? (
              <LightMode className="text-yellow-400" fontSize="small" />
            ) : (
              <DarkMode className="text-gray-800" fontSize="small" />
            )}
          </button>
          <Link
            to="/giris"
            className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 text-sm font-semibold"
          >
            Giriş Yap
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="text-center py-16 px-4">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          Dil Öğrenmenin Yeni Yolu:{" "}
          <span className="text-purple-400">Learnverse</span>
        </motion.h2>
        <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8">
          Konuş, dinle, test et. AI destekli, interaktif bir öğrenme deneyimi.
          Kendi kartlarını oluştur, ilerlemeni takip et, gerçek diyaloglara
          hazırlan.
        </p>
        <Link
          to="/kayit"
          className="bg-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-purple-700"
        >
          Hemen Başla
        </Link>
      </main>

      {/* Features Cards Under Hero */}
      <section
        id="features-cards"
        className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {features.map((feature, i) => (
          <div
            key={i}
            className={`p-6 rounded-xl shadow-md cursor-pointer flex flex-col items-center text-center
    ${darkMode ? feature.bgDark : feature.bgLight}
    ${darkMode ? feature.textDark : feature.textLight}
    hover:shadow-xl transition-shadow duration-300`}
          >
            <div className="mb-4">{feature.icon}</div>
            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
            <p className="text-sm text-opacity-90">
              {feature.desc.length > 70
                ? feature.desc.slice(0, 70) + "..."
                : feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-6  mx-auto text-center relative"
        style={{
          background: darkMode
            ? "linear-gradient(135deg, #2d3748 0%, #1a202c 100%)"
            : "linear-gradient(135deg, #f9fafb 0%, #e0e7ff 100%)",
        }}
      >
        <h3 className="text-4xl font-extrabold mb-4 text-purple-600 dark:text-purple-400 relative inline-block">
          Learnverse Nedir?
          <span className="block w-20 h-1 bg-purple-500 rounded-full mx-auto mt-2"></span>
        </h3>
        <p className="text-lg max-w-3xl mx-auto text-gray-700 dark:text-gray-300 leading-relaxed drop-shadow-md">
          Learnverse; interaktif, kullanıcı merkezli ve yapay zeka destekli bir
          dil öğrenme platformudur. Cümle tamamlama, sesli tekrar, kişisel kart
          oluşturma gibi araçlarla dil becerilerinizi hızla geliştirmenize
          yardımcı olur.
        </p>
      </section>

      <section id="features" className="mt-20">
        {features.map((feature, i) => (
          <div
            key={i}
            className={`py-16 px-6 md:px-12
      ${darkMode ? feature.bgDark : feature.bgLight}
      ${darkMode ? feature.textDark : feature.textLight}`}
          >
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-10">
              <div
                className={`w-full md:w-1/2 flex justify-start ${
                  i % 2 !== 0 ? "order-2" : ""
                }`}
              >
                <button
                  className={`w-full max-w-sm py-5 text-xl font-semibold rounded-full
    transition-colors duration-300 hover:brightness-110
    ${darkMode ? feature.bgLight : feature.bgDark} 
    ${darkMode ? "text-black" : "text-white"}`}
                >
                  Başla
                </button>
              </div>
              <div className="w-full md:w-1/2 px-6">
                <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                <p className="text-lg mb-6">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* General Analyses Section */}
      <section id="general-analyses" className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-4xl font-extrabold mb-10 text-center text-purple-600 dark:text-purple-400">
          Genel Site Analizleri
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {generalAnalyses.map((analysisSet, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                {analysisSet.map((stat, idx) => (
                  <li key={idx}>{stat}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Genel Özellikler Section */}
      <section
        id="general-features"
        className={`mx-auto mt-20 px-6 py-14  rounded-2xl shadow-2xl
    transition-colors duration-500
    ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}
  `}
      >
        <h3 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          Learnverse Genel Özellikleri
        </h3>
        <ul className="space-y-6 max-w-xl mx-auto text-lg">
          {generalFeatures.map((feature, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 rounded-lg p-3 hover:bg-purple-100 dark:hover:bg-purple-800 transition-colors cursor-default"
            >
              <CheckCircle className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 dark:bg-gray-800 p-4 text-center text-sm text-gray-700 dark:text-gray-300">
        © {new Date().getFullYear()} Learnverse. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
