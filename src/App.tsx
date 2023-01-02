import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import NotFound from "./components/NotFound";
import Login from "./pages/Login";
import VideoByCategory from "./pages/Category";
import Platform from "./pages/Platform";
import VideoPage from "./pages/Video";
import Header from "./components/Header/Header";
function App() {
  const { pathname } = useLocation();
  return (
    <ApolloProvider client={client}>
      {pathname.includes(
        "/" || pathname.includes("search") || pathname.includes("profile")
      ) ||
      pathname.includes("category") ||
      pathname.includes("video") ? (
        <Header />
      ) : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
        <Route path="/platform" element={<Platform />} />
        <Route path="/profile:id" element={<Profile />} />
        <Route path="/video:id" element={<VideoPage />} />
        <Route path="/category:slug" element={<VideoByCategory />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ApolloProvider>
  );
}

export default App;
