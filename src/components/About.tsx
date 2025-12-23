import React, { useState, useEffect } from 'react';
import AnimatedButton from './AnimatedButton';
import { ExternalLink } from 'lucide-react';

const About = () => {
  const [circulatingSupply, setCirculatingSupply] = useState<number | null>(null);

  useEffect(() => {
    const fetchCirculatingSupply = async () => {
      try {
        const response = await fetch('https://mini-api.xelis.io/?key=circulating_supply');
        const data = await response.json();

        if (typeof data === 'number') {
          setCirculatingSupply(data);
        } else {
          console.error('Error: Circulating supply value is not a number');
        }
      } catch (error) {
        console.error('Error fetching circulating supply:', error);
      }
    };

    fetchCirculatingSupply();
  }, []);

  const formatCirculatingSupply = (supply: number | null) => {
    if (supply === null) return 'Loading...';

    if (supply >= 1_000_000) {
      return (supply / 1_000_000).toFixed(3) + 'm';
    } else if (supply >= 1_000) {
      return (supply / 1_000).toFixed(3) + 'k';
    }

    return supply.toFixed(4);
  };

  return (
    <section id="about" className="bg-gray-50 dark:bg-[#0a0a0a] py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column */}
          <div className="order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#02FFCF] border border-white dark:border-[#02FFCF] text-sm font-medium text-black">
              About XELIS
            </span>

            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mb-6">
              Building the Future of Confidential Digital Infrastructure
            </h2>

            <div className="space-y-6 text-gray-600 dark:text-white">
              <p>
                XELIS is a next-generation Layer 1 blockchain engineered for privacy,
                scalability, and real-world usability. Built on a fully decentralized
                and immutable ledger, XELIS ensures data integrity, security, and
                trustless transactions—without compromising confidentiality.
              </p>

              <p>
                Unlike traditional privacy chains that operate in complete obscurity
                or public chains that expose sensitive data, XELIS strikes a deliberate
                balance: confidential transaction data and wallet balances are
                protected through advanced cryptography, while public addresses remain
                visible for transparency and accountability.
              </p>

              <p>
                With a high-performance Virtual Machine, programmable smart contracts,
                and innovative consensus and transaction architecture, XELIS goes
                beyond the limitations of earlier privacy networks.
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <AnimatedButton
                  variant="primary"
                  className="flex items-center"
                  onClick={() => window.open('https://whitepaper.xelis.io', '_blank')}
                >
                  Read our Whitepaper
                  <ExternalLink className="ml-2 h-4 w-4" />
                </AnimatedButton>

                <AnimatedButton
                  variant="secondary"
                  className="flex items-center"
                  onClick={() => document.getElementById('roadmap')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View Roadmap
                </AnimatedButton>
              </div>
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="order-1 lg:order-2">
            <div className="glass-card p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">Key Metrics</h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white dark:bg-[#0a0a0a] rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-xelis-blue mb-1">7,500+</div>
                  <div className="text-sm text-gray-500 dark:text-white">
                    Max Transactions Per Second
                  </div>
                </div>

                <div className="text-center p-4 bg-white dark:bg-[#0a0a0a] rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-xelis-blue mb-1">150+</div>
                  <div className="text-sm text-gray-500 dark:text-white">
                    Network Nodes
                  </div>
                </div>

                <div className="text-center p-4 bg-white dark:bg-[#0a0a0a] rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-xelis-blue mb-1">5s</div>
                  <div className="text-sm text-gray-500 dark:text-white">
                    Block Speed
                  </div>
                </div>

                <div className="text-center p-4 bg-white dark:bg-[#0a0a0a] rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-xelis-blue mb-1">100%</div>
                  <div className="text-sm text-gray-500 dark:text-white">
                    Network Uptime
                  </div>
                </div>

                <div className="text-center p-4 bg-white dark:bg-[#0a0a0a] rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-xelis-blue mb-1">
                    {formatCirculatingSupply(circulatingSupply)}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-white">
                    Circulating Supply
                  </div>
                </div>

                <div className="text-center p-4 bg-white dark:bg-[#0a0a0a] rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-xelis-blue mb-1">18.4m</div>
                  <div className="text-sm text-gray-500 dark:text-white">
                    Max Supply
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
