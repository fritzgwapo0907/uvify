"use client"
import { useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../main"
import { useLanguage } from "../contexts/LanguageContext"

export default function LandingPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)

  const navigate = useNavigate()
  const { login } = useContext(AuthContext)
  const { t } = useLanguage()

  const BACKEND_URL = "https://uvify-backend.onrender.com"

  const setCookie = (name, value, days = 30) => {
    const expires = new Date()
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`
  }

  const getCookie = (name) => {
    const nameEQ = name + "="
    const cookies = document.cookie.split(";")
    for (let cookie of cookies) {
      cookie = cookie.trim()
      if (cookie.indexOf(nameEQ) === 0) {
        return cookie.substring(nameEQ.length)
      }
    }
    return ""
  }

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const url = `${BACKEND_URL}/auth/login`
      const body = { email: formData.email, password: formData.password }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setError(data.message || "Something went wrong")
        setIsLoading(false)
        return
      }

      if (rememberMe) {
        setCookie("uvify_email", formData.email, 30)
        setCookie("uvify_password", formData.password, 30)
        setCookie("uvify_remember_me", "true", 30)
      } else {
        setCookie("uvify_email", "", -1)
        setCookie("uvify_password", "", -1)
        setCookie("uvify_remember_me", "", -1)
      }

      login(data.user)
      navigate("/dashboard")
    } catch (err) {
      console.error("Auth error:", err)
      setError("Server error. Please try again.")
      setIsLoading(false)
    }
  }

  const teamMembers = [
    {
      name: "Fritz Gerald Tacanay",
      role: t("about.leadDeveloper"),
      description: t("about.alexDesc"),
      image: "/ilad.png",
    },
    {
      name: "Rosselah Marie Bodaño",
      role: t("about.designerDeveloper"),
      description: t("about.mariaDesc"),
      image: "/lheng.jpg",
    },
    {
      name: "Cathrina Lapuz",
      role: t("about.backendDeveloper"),
      description: t("about.jamesDesc"),
      image: "/cath.jpg",
    },
    {
      name: "Flix Vixen Barbero",
      role: t("about.qaStrategist"),
      description: t("about.sofiaDesc"),
      image: "/flix.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">☀️</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              UVify
            </span>
          </div>
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
          >
            {t("login.loginButton")}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 text-center">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-100 rounded-full border border-orange-200">
            <span className="text-orange-700 text-sm font-semibold tracking-wide">{t("common.uvify")}</span>
          </div>
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-[1.1] tracking-tight">
            {t("about.title")}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: "☀️", title: t("login.realTimeMonitoring"), desc: t("login.realTimeDesc") },
            { icon: "🛡️", title: t("login.safetyAlerts"), desc: t("login.safetyAlertsDesc") },
            { icon: "📈", title: t("login.historicalData"), desc: t("login.historicalDataDesc") },
            { icon: "👥", title: t("login.multiUserSupport"), desc: t("login.multiUserDesc") },
          ].map((item, i) => (
            <div key={i} className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300">
              <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
              <h3 className="font-bold text-gray-900 mb-3 text-xl">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-gradient-to-br from-orange-50 via-orange-100/50 to-yellow-50">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-12 md:p-16 shadow-xl border border-orange-200">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("about.ourMission")}</h2>
            <p className="text-xl text-gray-700 leading-relaxed">{t("about.missionText")}</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">{t("about.coreValues")}</h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">{t("about.coreValuesDesc")}</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: t("about.innovation"), desc: t("about.innovationDesc"), icon: "💡" },
              { title: t("about.health"), desc: t("about.healthDesc"), icon: "❤️" },
              { title: t("about.accessibility"), desc: t("about.accessibilityDesc"), icon: "🌍" },
              { title: t("about.reliability"), desc: t("about.reliabilityDesc"), icon: "🔒" },
            ].map((value, index) => (
              <div key={index} className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-8 border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300">
                <div className="text-5xl mb-6">{value.icon}</div>
                <h3 className="font-bold text-orange-600 mb-3 text-xl">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{t("about.ourTeam")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("about.teamSubtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          {teamMembers.map((member, index) => (
            <div key={index} className="group bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-300">
              <div className="relative h-96 overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-100">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-semibold mb-6">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
          {[
            { label: t("about.usersProtected"), value: "10K+", icon: "👥" },
            { label: t("about.readingsTracked"), value: "1M+", icon: "📊" },
            { label: t("about.yearsFounded"), value: "2024", icon: "🚀" },
          ].map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl p-10 border border-orange-200 text-center hover:shadow-xl transition-all duration-300">
              <div className="text-6xl mb-6">{stat.icon}</div>
              <div className="text-5xl font-bold text-orange-600 mb-4">{stat.value}</div>
              <p className="text-gray-700 font-semibold text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-5xl mx-auto text-center text-white">
          <h3 className="text-4xl md:text-5xl font-bold mb-6">{t("about.joinUs")}</h3>
          <p className="text-xl md:text-2xl opacity-95 leading-relaxed font-light">{t("about.joinUsDesc")}</p>
        </div>
      </section>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-10 relative animate-in zoom-in duration-300">
            <button onClick={() => setShowLoginModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-3xl transition-colors leading-none">×</button>

            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-400 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                <span className="text-3xl">☀️</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{t("login.title")}</h2>
              <p className="text-gray-600">{t("login.subtitle")}</p>
            </div>

            {error && (
              <div className="mb-6 text-red-700 text-sm font-medium text-center bg-red-50 p-4 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">{t("login.email")}</label>
                <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} className="w-full px-4 py-3.5 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">{t("login.password")}</label>
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} className="w-full px-4 py-3.5 border border-gray-300 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">{showPassword ? "Hide" : "Show"}</button>
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={handleRememberMeChange} className="w-5 h-5 border-2 border-gray-300 rounded bg-white cursor-pointer accent-orange-500" />
                <label htmlFor="rememberMe" className="ml-3 text-sm text-gray-700 cursor-pointer font-medium">{t("login.rememberMe")}</label>
              </div>

              <button type="submit" disabled={isLoading} className="w-full py-4 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-xl hover:from-orange-600 hover:to-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg">
                {isLoading ? t("login.loggingIn") : t("login.loginButton")}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center text-gray-600">
          <p className="font-medium text-lg">© 2025 UVify. All rights reserved. Protecting your skin with innovation.</p>
        </div>
      </footer>
    </div>
  )
}
