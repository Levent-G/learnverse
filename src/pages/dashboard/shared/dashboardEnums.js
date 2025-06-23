import SchoolIcon from "@mui/icons-material/School";
import QuizIcon from "@mui/icons-material/Quiz";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SmartToyIcon from "@mui/icons-material/SmartToy";

export const features = [
  {
    path: "/feature/kelime-kartlari",
    icon: <SchoolIcon sx={{ fontSize: 30, color: "#7e57c2" }} />,
    title: "Kelime Kartları",
    description:
      "En sık kullanılan İngilizce kelimeleri görsellerle destekleyerek öğren.",
  },
  {
    path: "/feature/kalip-cumleler",
    icon: <MenuBookIcon sx={{ fontSize: 30, color: "#8e24aa" }} />,
    title: "Kalıp Cümleler",
    description: "Günlük konuşmalarda sık kullanılan cümle kalıplarını öğren.",
  },
  {
    path: "/feature/quizler",
    icon: <QuizIcon sx={{ fontSize: 30, color: "#ab47bc" }} />,
    title: "Quiz & Test Modülü",
    description: "Seviyene uygun testlere katılarak eksiklerini keşfet.",
  },
  {
    path: "/feature/topluluk",
    icon: <PeopleAltIcon sx={{ fontSize: 30, color: "#6a1b9a" }} />,
    title: "Topluluk & Eşleşme",
    description: "Diğer kullanıcılarla eşleşerek birlikte öğren.",
  },
  {
    path: "/feature/ai-asistan",
    icon: <SmartToyIcon sx={{ fontSize: 30, color: "#9c27b0" }} />,
    title: "AI Asistan",
    description: "Yapay zeka ile kişisel çalışma planları oluştur.",
  },
];



// Örnek videolu dersler
export const videoLessons = [
  {
    id: 1,
    title: "Temel İngilizce Konuşma",
    description: "Selamlaşma, tanışma ve temel cümleler.",
    thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg",
  },
  {
    id: 2,
    title: "Zamanlar: Present Simple",
    description: "Geniş zamanın doğru kullanımı.",
    thumbnail: "https://img.youtube.com/vi/8ZAcMIqkzg0/hqdefault.jpg",
  },
  {
    id: 3,
    title: "Temel İngilizce Konuşma",
    description: "Selamlaşma, tanışma ve temel cümleler.",
    thumbnail: "https://img.youtube.com/vi/ysz5S6PUM-U/hqdefault.jpg",
  },
];

// Alınan dersler ve eğitmen bilgisi
export const enrolledCourses = [
  {
    id: 1,
    teacher: "Emily Watson",
    subject: "Konuşma Pratiği",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    id: 2,
    teacher: "David Lee",
    subject: "Dilbilgisi Temelleri",
    avatar: "https://randomuser.me/api/portraits/men/72.jpg",
  },
  {
    id: 3,
    teacher: "David Lee",
    subject: "Dilbilgisi Temelleri",
    avatar: "https://randomuser.me/api/portraits/men/72.jpg",
  },
];


// Mock diğer kullanıcıların ilerleme değerleri
export const otherUsersProgress = [
  { name: "Elif", progress: 80 },
  { name: "Mehmet", progress: 65 },
  { name: "Ayşe", progress: 90 },
];

export const tasksData = [
  {
    title: "Günlük Görev",
    tasks: [
      "📘 10 kelime kartı tekrarla",
      "🧠 1 quiz çöz",
      "🎧 1 podcast dinle",
    ],
    buttonText: "Ek görev al",
    route: "/feature/quizler",
  },
  {
    title: "Öneri",
    tasks: [
      "📖 “The Curious Incident...” kitabına başla",
      "💬 “How do you feel?” kalıbını tekrar et",
    ],
    buttonText: "Daha fazla öneri al",
    route: "/feature/quizler",
  },
  {
    title: "Mini Test",
    tasks: ["📌 Bugünkü test hazır!"],
    buttonText: "Teste Başla",
    route: "/feature/quizler",
  },
];

export const featuresModul = [
  // Örnek veri, sen kendi dashboardEnums'dan getirebilirsin
  {
    path: "/module1",
    icon: "📚",
    title: "Temel İngilizce",
    description: "İngilizce öğrenmeye giriş için temel dersler",
  },
  {
    path: "/module2",
    icon: "🗣️",
    title: "Konuşma Pratiği",
    description: "Günlük konuşma kalıplarını öğren ve uygula",
  },
  {
    path: "/module3",
    icon: "📝",
    title: "Dil Bilgisi",
    description: "Gramer kurallarını kolay ve hızlı öğren",
  },
];

