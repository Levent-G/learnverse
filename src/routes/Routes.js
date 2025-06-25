import EmailVerificationNotice from "../pages/auth/EmailVerificationNotice";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyAccount from "../pages/auth/VerifyAccount";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import LandingPage from "../pages/landingPage/LandingPage";
import Dashboard from "../pages/dashboard/Dashboard";
import Topluluk from "../pages/features/topluluk/Topluluk";
import AIAsistan from "../pages/features/aiAsistan/AIAsistan";
import KalipCumleler from "../pages/features/kalipCumleler/KalipCumleler";
import QuizMain from "../pages/features/quizler/QuizMain";
import ProfilSayfasi from "../pages/profile/ProfilSayfasi";
import Sozluk from "../pages/features/sozluk/Sozluk";

const publicRoutes = [
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  { path: "/kayit", element: <Register /> },
  { path: "/auth/verify", element: <VerifyEmailPage /> },
  { path: "/reset", element: <ResetPassword /> },
  { path: "/eposta-dogrulama", element: <EmailVerificationNotice /> },
  { path: "/dogrula", element: <VerifyAccount /> },
];

const privateRoutes = [
  { path: "/ana-sayfa", element: <Dashboard /> },
  { path: "/feature/learnverse-sozluk", element: <Sozluk /> },
  { path: "/feature/kalip-cumleler", element: <KalipCumleler /> },
  { path: "/feature/quizler", element: <QuizMain /> },
  { path: "/feature/topluluk", element: <Topluluk /> },
  { path: "/feature/ai-asistan", element: <AIAsistan /> },
  { path: "/profil", element: <ProfilSayfasi /> },
];

export { publicRoutes, privateRoutes };
