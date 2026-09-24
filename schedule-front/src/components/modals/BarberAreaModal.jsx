import { useState } from "react";
import { login, logout, isAuthenticated, getCurrentUser } from "@/services/authService";

export default function BarberAreaModal({ isOpen, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLogged, setIsLogged] = useState(() => isAuthenticated());

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await login(username.trim(), password);
      setIsLogged(true);
      setPassword("");
    } catch (error) {
      console.error("Erro no login:", error);
      setErrorMessage("Credenciais inválidas. Verifique seu usuário e senha.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsLogged(false);
    setUsername("");
    setPassword("");
    onClose();
  };

  const currentUser = getCurrentUser();

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 bg-zinc-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-gold p-0.5 shadow-md shadow-orange-500/20">
              <div className="w-full h-full bg-zinc-950 rounded-full flex items-center justify-center text-orange-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="font-extrabold text-white text-lg">Área do Barbeiro</h3>
              <p className="text-xs text-zinc-400">Painel administrativo da barbearia</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLogged ? (
            /* Dashboard Logado */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between p-4 rounded-xl bg-zinc-950 border border-zinc-800">
                <div>
                  <h4 className="font-extrabold text-white">Olá, {currentUser?.username || "Barbeiro"}!</h4>
                  <p className="text-xs text-zinc-400">Sessão autenticada via Spring Security</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                  Conectado
                </span>
              </div>

              {/* Status de Integração */}
              <div className="p-4 rounded-xl bg-zinc-950 border border-zinc-800 space-y-2 text-xs">
                <p className="text-zinc-300">
                  Seu token JWT foi registrado com sucesso e está sendo enviado em requisições autenticadas.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl font-bold text-xs text-zinc-400 bg-zinc-800 hover:bg-zinc-700 hover:text-white transition-colors cursor-pointer"
                >
                  Sair do Painel
                </button>
              </div>
            </div>
          ) : (
            /* Formulário de Login */
            <form onSubmit={handleLogin} className="space-y-4">
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                  Usuário / Login
                </label>
                <input
                  type="text"
                  placeholder="Seu usuário cadastrado"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 tracking-wider mb-2">
                  Senha
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:border-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-zinc-950 bg-gradient-gold hover:opacity-95 shadow-xl shadow-orange-500/25 active:scale-98 transition-all cursor-pointer text-sm disabled:opacity-50"
                >
                  {loading ? "Entrando..." : "Entrar no Painel do Barbeiro"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
