import Link from "next/link"
import { ArrowRight, CheckCircle, Eye, Code, Database } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-cyan-400 overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
        <div className="absolute inset-0 opacity-20">
          <div className="matrix-rain" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_70%)]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-cyan-500/30 bg-black/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50">
              <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg">M</div>
              <div className="absolute inset-0 rounded-full border border-cyan-300 animate-pulse" />
            </div>
            <span className="text-2xl font-bold text-cyan-300 tracking-wider font-mono">
              META<span className="text-cyan-500">CITIZEN</span>
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-mono text-cyan-300 hover:text-cyan-100 hover:glow transition-all duration-300 relative group"
            >
              FEATURES
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="#protocol"
              className="text-sm font-mono text-cyan-300 hover:text-cyan-100 hover:glow transition-all duration-300 relative group"
            >
              PROTOCOL
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </Link>
            <Link
              href="#network"
              className="text-sm font-mono text-cyan-300 hover:text-cyan-100 hover:glow transition-all duration-300 relative group"
            >
              NETWORK
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-100 font-mono"
            >
              DOCS
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30"
            >
              CONNECT
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative py-32 md:py-40">
          <div className="container relative z-10">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="inline-flex items-center rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-2 text-sm font-mono font-semibold text-cyan-300 backdrop-blur-sm">
                  <span className="mr-2 h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                  SYSTEM ONLINE
                </div>
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tighter font-mono">
                    <span className="text-cyan-300">THE BLOCKCHAIN</span>
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 animate-pulse">
                      IDENTITY
                    </span>
                    <br />
                    <span className="text-cyan-500">SOLUTION</span>
                  </h1>
                  <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-transparent animate-pulse" />
                </div>
                <p className="max-w-[600px] text-lg text-cyan-200/80 font-mono leading-relaxed">
                  {">"} Decentralized identity verification protocol
                  <br />
                  {">"} Privacy-preserving compliance framework
                  <br />
                  {">"} Real users. Real verification. Real future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400"
                  >
                    GET STARTED
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-100 font-mono"
                  >
                    VIEW SOURCE
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <img
                    src="/images/digital-head.png"
                    alt="Digital Identity Visualization"
                    className="w-full max-w-md h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  {/* Scanning line effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Grid overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300ffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 relative">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold font-mono mb-4">
                <span className="text-cyan-300">SYSTEM</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  CAPABILITIES
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-6" />
              <p className="text-cyan-200/80 font-mono text-lg">
                {">"} Advanced protocols for the decentralized future
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="group relative p-8 rounded-lg border border-cyan-500/30 bg-black/50 backdrop-blur-sm hover:border-cyan-400 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                    <Database className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold font-mono text-cyan-300 mb-4">DECENTRALIZED REGISTRY</h3>
                  <p className="text-cyan-200/70 font-mono leading-relaxed">
                    {">"} Distributed attestation network
                    <br />
                    {">"} Immutable identity proofs
                    <br />
                    {">"} Zero-knowledge architecture
                  </p>
                </div>
              </div>
              <div className="group relative p-8 rounded-lg border border-cyan-500/30 bg-black/50 backdrop-blur-sm hover:border-cyan-400 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                    <Eye className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold font-mono text-cyan-300 mb-4">PRIVACY SHIELD</h3>
                  <p className="text-cyan-200/70 font-mono leading-relaxed">
                    {">"} Selective disclosure protocol
                    <br />
                    {">"} Encrypted attribute verification
                    <br />
                    {">"} Anonymous compliance checks
                  </p>
                </div>
              </div>
              <div className="group relative p-8 rounded-lg border border-cyan-500/30 bg-black/50 backdrop-blur-sm hover:border-cyan-400 transition-all duration-500 hover:shadow-lg hover:shadow-cyan-500/20">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="h-16 w-16 rounded-lg bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-cyan-500/30 transition-all duration-300">
                    <Code className="h-8 w-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold font-mono text-cyan-300 mb-4">PROTOCOL INTERFACE</h3>
                  <p className="text-cyan-200/70 font-mono leading-relaxed">
                    {">"} Universal DeFi integration
                    <br />
                    {">"} Real-time verification API
                    <br />
                    {">"} Cross-chain compatibility
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Protocol Section */}
        <section id="protocol" className="py-24 relative">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold font-mono mb-4">
                <span className="text-cyan-300">PROTOCOL</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  EXECUTION
                </span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-6" />
              <p className="text-cyan-200/80 font-mono text-lg">{">"} Three-phase verification sequence</p>
            </div>
            <div className="grid gap-12 md:grid-cols-3">
              <div className="relative flex flex-col items-center text-center">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent opacity-30 md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:h-px md:w-full md:bg-gradient-to-r" />
                <div className="relative h-16 w-16 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                  <span className="text-2xl font-bold font-mono text-cyan-400">01</span>
                  <div className="absolute inset-0 rounded-full border border-cyan-300 animate-ping opacity-20" />
                </div>
                <h3 className="text-xl font-bold font-mono text-cyan-300 mb-4">IDENTITY SCAN</h3>
                <p className="text-cyan-200/70 font-mono leading-relaxed">
                  {">"} Biometric verification
                  <br />
                  {">"} Document authentication
                  <br />
                  {">"} Trusted partner network
                </p>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="absolute top-8 left-1/2 -translate-x-1/2 h-full w-px bg-gradient-to-b from-cyan-500 via-cyan-500/50 to-transparent opacity-30 md:left-auto md:right-0 md:top-1/2 md:-translate-y-1/2 md:h-px md:w-full md:bg-gradient-to-r" />
                <div className="relative h-16 w-16 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                  <span className="text-2xl font-bold font-mono text-cyan-400">02</span>
                  <div className="absolute inset-0 rounded-full border border-cyan-300 animate-ping opacity-20 [animation-delay:500ms]" />
                </div>
                <h3 className="text-xl font-bold font-mono text-cyan-300 mb-4">IDENTITY STORAGE</h3>
                <p className="text-cyan-200/70 font-mono leading-relaxed">
                  {">"} Encrypted attestations
                  <br />
                  {">"} Blockchain immutability
                  <br />
                  {">"} Distributed consensus
                </p>
              </div>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative h-16 w-16 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                  <span className="text-2xl font-bold font-mono text-cyan-400">03</span>
                  <div className="absolute inset-0 rounded-full border border-cyan-300 animate-ping opacity-20 [animation-delay:1000ms]" />
                </div>
                <h3 className="text-xl font-bold font-mono text-cyan-300 mb-4">PROTOCOL QUERY</h3>
                <p className="text-cyan-200/70 font-mono leading-relaxed">
                  {">"} Real-time verification
                  <br />
                  {">"} Privacy-preserving checks
                  <br />
                  {">"} Instant compliance results
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Matrix Section */}
        <section id="network" className="py-24 relative">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold font-mono mb-4">
                <span className="text-cyan-300">USE</span>{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">CASES</span>
              </h2>
              <div className="h-1 w-24 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-6" />
              <p className="text-cyan-200/80 font-mono text-lg">{">"} Real-world protocol implementations</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="relative p-8 rounded-lg border border-cyan-500/30 bg-black/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold font-mono text-cyan-300 mb-6">DEFI PROTOCOLS</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-cyan-200/80 font-mono">Geographic compliance verification</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-cyan-200/80 font-mono">Anti-money laundering protocols</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-cyan-200/80 font-mono">Institutional user verification</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="relative p-8 rounded-lg border border-cyan-500/30 bg-black/50 backdrop-blur-sm">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-lg" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold font-mono text-cyan-300 mb-6">DAO GOVERNANCE</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-cyan-200/80 font-mono">Sybil attack prevention</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-cyan-200/80 font-mono">One-person-one-vote systems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
                      <span className="text-cyan-200/80 font-mono">Reputation-based governance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative">
          <div className="container">
            <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-black via-slate-950 to-black">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2300ffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
              <div className="relative z-10 p-12 md:p-16 text-center">
                <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
                  <span className="text-cyan-300">READY TO</span>{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    BUILD?
                  </span>
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-500 to-transparent mx-auto mb-8" />
                <p className="text-cyan-200/80 font-mono text-lg mb-8 max-w-2xl mx-auto">
                  {">"} Join the network of verified protocols
                  <br />
                  {">"} Build the future of decentralized identity
                  <br />
                  {">"} Secure. Decentralized. Compliant.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-black font-mono font-bold shadow-lg shadow-cyan-500/30 border border-cyan-400"
                  >
                    GET STARTED
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-cyan-500 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-100 font-mono"
                  >
                    CONTACT US
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-cyan-500/30 bg-black/80 backdrop-blur-md py-16 relative z-10">
        <div className="container">
          <div className="grid gap-8 text-center mx-auto">
            <div>
              <div className="flex items-center gap-3 mb-6 mx-auto justify-center ">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-cyan-400 bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/50">
                  <div className="absolute inset-0 flex items-center justify-center text-black font-bold text-lg">
                    M
                  </div>
                </div>
                <span className="text-xl font-bold font-mono text-cyan-300">METACITIZEN</span>
              </div>
              <p className="text-cyan-200/70 font-mono">Your blockchain identity solution.</p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-cyan-500/30 text-center">
            <p className="text-cyan-200/70 font-mono">
              © {new Date().getFullYear()} METACITIZEN PROTOCOL. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
