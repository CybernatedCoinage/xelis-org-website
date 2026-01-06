import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Wallet, Download, Globe, Server, Shield, Clock, ArrowRight, Github, Droplet, FileText, Briefcase } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
import MiningCalculator from '@/components/mining_calculator'; // <-- import the calculator

const Resources = () => {
  // Wallet options data with all wallets now set to primary
  const wallets = [
    {
      name: "Xelis Web Wallet",
      description: "Access your XELIS directly from any browser without installing anything.",
      features: ["No installation required", "Easy to use", "Secure"],
      url: "https://wallet.xelis.io",
      buttonText: "Open Web Wallet",
      icon: <Globe className="h-6 w-6" />,
      primary: true
    },
    {
      name: "Genesix Desktop Wallet",
      description: "Download the official Xelis wallet for Windows, macOS, or Linux.",
      features: ["Full control", "Advanced features", "Highest security"],
      url: "https://github.com/xelis-project/xelis-genesix-wallet/releases",
      buttonText: "Download",
      icon: <Download className="h-6 w-6" />,
      primary: true
    },
    {
      name: "Command Line Wallet",
      description: "Command-line interface wallet for developers and advanced users.",
      features: ["Fully featured", "Scripting support", "Developer-friendly"],
      url: "https://github.com/xelis-project/xelis-blockchain/releases/",
      buttonText: "View on GitHub",
      icon: <Server className="h-6 w-6" />,
      primary: true
    },
    {
      name: "Genesix Android Mobile Wallet",
      description: "The XELIS mobile wallet experience for Android.",
      features: ["On-the-go access", "Biometric security", "User-friendly"],
      url: "https://github.com/xelis-project/xelis-genesix-wallet/releases",
      buttonText: "Download",
      icon: <Wallet className="h-6 w-6" />,
      primary: true,
    },
    {
      name: "Paper Wallet",
      description: "Generate offline XELIS paper wallets for cold storage and maximum security.",
      features: ["Offline storage", "Air-gapped security", "Physical backup"],
      url: "https://paperwallet.xelis.io/",
      buttonText: "Generate Wallet",
      icon: <FileText className="h-6 w-6" />,
      primary: true,
    },
    {       
      name: "MultiAsset Wallet (iOS, Android & Desktop)",       
      description: "Store XELIS alongside other cryptocurrencies in popular third-party wallets.",       
      features: ["Multiple assets", "Broad ecosystem", "Simplified management"],       
      url: "https://stackwallet.com", 
      buttonText: "Stack Wallet",
      icon: <Briefcase className="h-6 w-6" />, 
      primary: true,
      disabled: false,
    }
  ];

  return (
    <div className="min-h-screen flex flex-col dark:bg-black">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold dark:text-white mb-6">XELIS Wallets & Resources</h1>
            <p className="text-lg text-gray-600 dark:text-white mb-8">
              Explore the essential resources to get started with Xelis. Securely access and manage your XELIS through a variety of wallet options, claim free XELIS from our faucet, run a node, or mine XELIS using CPU/GPU to help strengthen the network's security.
            </p>
          </div>
        </section>

        {/* Wallets Section */}
        <section className="container mx-auto px-4 py-4 bg-gray-50 dark:bg-black rounded-3xl">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center dark:text-white">Choose Your Wallet</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {wallets.map((wallet, index) => (
              <div 
                key={index}
                className={`glass-card p-6 flex flex-col h-full transition-transform duration-300 hover:scale-[1.02] border-xelis-blue bg-white/90 shadow-lg ${
                  wallet.disabled ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 rounded-lg bg-xelis-blue text-white">
                    {wallet.icon}
                  </div>
                  <h3 className="text-xl font-semibold ml-4 dark:text-white">{wallet.name}</h3>
                </div>
                
                <p className="text-gray-600 dark:text-white mb-4">{wallet.description}</p>
                
                <div className="mb-6 flex-grow">
                  <ul className="space-y-2">
                    {wallet.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <Shield className="h-4 w-4 text-xelis-blue mr-2" />
                        <span className="text-sm dark:text-white">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <AnimatedButton
                  variant="primary"
                  className={`w-full justify-center ${wallet.disabled ? 'pointer-events-none' : ''}`}
                  onClick={() => !wallet.disabled && window.open(wallet.url, "_blank")}
                >
                  {wallet.buttonText}
                  {wallet.disabled ? 
                    <Clock className="ml-2 h-4 w-4" /> : 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  }
                </AnimatedButton>
              </div>
            ))}
          </div>
        </section>

        {/* Faucet Section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                <div className="bg-xelis-blue p-4 rounded-full inline-block mb-4">
                  <Droplet className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold mb-4 dark:text-white">XELIS Faucet</h2>
                <p className="text-gray-600 dark:text-white mb-6">
                  New to XELIS? Get free tokens to explore and test our ecosystem. 
                  The XELIS faucet provides a small amount of XELIS for testing wallets and applications.
                </p>
                <div className="flex flex-wrap gap-4">
                  <AnimatedButton 
                    onClick={() => window.open("https://faucet.xelis.io", "_blank")}
                    className="flex items-center"
                  >
                    Get Free XELIS
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="secondary"
                    onClick={() => window.open("https://www.xelisfaucet.site", "_blank")}
                    className="flex items-center"
                  >
                    Testnet Faucet
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </div>
              </div>
              
              <div className="md:w-1/2">
                <div className="p-6">
                  <h3 className="font-medium text-lg mb-4 dark:text-white">How It Works</h3>
                  <ol className="space-y-3">
                    <li className="flex">
                      <span className="bg-xelis-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                      <span className="dark:text-white">Visit the <a href="https://faucet.xelis.io" target="_blank" rel="noopener noreferrer" className="text-xelis-blue hover:underline">XELIS Faucet</a></span>
                    </li>
                    <li className="flex">
                      <span className="bg-xelis-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                      <span className="dark:text-white">Enter your XELIS wallet address</span>
                    </li>
                    <li className="flex">
                      <span className="bg-xelis-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                      <span className="dark:text-white">Complete the verification</span>
                    </li>
                    <li className="flex">
                      <span className="bg-xelis-blue text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</span>
                      <span className="dark:text-white">Receive free XELIS tokens</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Run a Node Section */}
        <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-black rounded-3xl mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center dark:text-white">Launch a Node</h2>
          
          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Contribute to Decentralization by Running a node</h3>
                <p className="text-gray-600 dark:text-white mb-6">
                  Run a XELIS node to support network decentralization, validate transactions, and enhance security. Access setup guides, documentation, and tools to deploy and manage your own node. Contribute to the ecosystem by strengthening the blockchain's resilience and performance.
                </p>
                <div className="flex flex-wrap gap-4">
                  <AnimatedButton 
                    variant="secondary"
                    onClick={() => window.open("https://docs.xelis.io/getting-started/build-from-source-code", "_blank")}
                    className="flex items-center"
                  >
                    Build from Source
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="secondary"
                    onClick={() => window.open("https://docs.xelis.io/getting-started/download-binaries", "_blank")}
                    className="flex items-center"
                  >
                    Pre-Complied Software
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <img 
                  src="/uploads/xel.png" 
                  alt="XELIS Logo" 
                  className="w-full max-w-[180px] mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

       {/* How to Mine Xelis Section */}
<section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-black rounded-3xl mb-12">
  <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center dark:text-white">
    Mining Xelis
  </h2>

  {/* Text + Pickaxe Card */}
  <div className="max-w-4xl mx-auto glass-card p-8 mb-8">
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
        <h3 className="text-xl font-semibold mb-4 dark:text-white">
          How to Mine Xelis
        </h3>
        <p className="text-gray-600 dark:text-white mb-6">
          Xelis is a Proof of Work (PoW) blockchain, where mining plays a crucial role
          in ensuring its security. At the heart of Xelis lies decentralization, which
          is why we've developed a unique mining algorithm that is resistant to ASIC
          and FPGA mining, making it efficiently mineable only with GPUs and CPUs.
          Our proprietary XelisHashV2 algorithm is highly memory-intensive, yet it
          operates with exceptionally low energy consumption, making it one of the
          most energy-efficient mining algorithms ever created.
        </p>

        <div className="flex flex-wrap gap-4">
          <AnimatedButton
            variant="secondary"
            onClick={() =>
              window.open(
                "https://github.com/CybernatedCoinage/How-To-Mine-Xelis/tree/main",
                "_blank"
              )
            }
            className="flex items-center"
          >
            How to Mine Xelis Guide
            <ArrowRight className="ml-2 h-4 w-4" />
          </AnimatedButton>
        </div>
      </div>

      <div className="md:w-1/3">
        {/* Light mode image */}
        <img
          src="/uploads/Pickaxe.png"
          alt="XELIS Pickaxe"
          className="w-full max-w-[180px] mx-auto block dark:hidden"
        />

        {/* Dark mode image */}
        <img
          src="/uploads/Pickaxe2.png"
          alt="XELIS Pickaxe Dark"
          className="w-full max-w-[180px] mx-auto hidden dark:block"
        />
      </div>
    </div>
  </div>

  {/* Mining Calculator — SEPARATE CARD */}
  <div className="max-w-4xl mx-auto glass-card p-8">
    <MiningCalculator />
  </div>
</section>

        {/* Developer Resources Section */}
        <section className="container mx-auto px-4 py-12 bg-gray-50 dark:bg-black rounded-3xl mb-12">
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center dark:text-white">Developer Resources</h2>
          
          <div className="max-w-4xl mx-auto glass-card p-8">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-xl font-semibold mb-4 dark:text-white">Build on XELIS</h3>
                <p className="text-gray-600 dark:text-white mb-6">
                  Access developer tools, documentation, and resources to build applications on the XELIS blockchain.
                  Explore our GitHub repositories for code examples and contribute to the ecosystem.
                </p>
                <div className="flex flex-wrap gap-4">
                  <AnimatedButton 
                    variant="secondary"
                    onClick={() => window.open("https://docs.xelis.io", "_blank")}
                    className="flex items-center"
                  >
                    Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="secondary"
                    onClick={() => window.open("https://github.com/xelis-project", "_blank")}
                    className="flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </AnimatedButton>
                  <AnimatedButton 
                    variant="secondary"
                    onClick={() => window.open("https://playground.xelis.io", "_blank")}
                    className="flex items-center"
                  >
                    Developer Playground
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </AnimatedButton>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <img 
                  src="/uploads/transparent_background_green_logo.png" 
                  alt="XELIS Logo" 
                  className="w-full max-w-[180px] mx-auto"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;

