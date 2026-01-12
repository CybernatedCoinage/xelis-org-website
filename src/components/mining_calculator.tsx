import { useState } from "react";
import {
  get24hStats,
  getXelPrice,
  calculateMiningRevenue,
  formatHashrate
} from "../lib/xelis_calculator";

export default function MiningCalculator() {
  const [hashrate, setHashrate] = useState<number | "">("");
  const [power, setPower] = useState<number | "">("");
  const [electricity, setElectricity] = useState<number | "">("");
  const [result, setResult] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  async function run() {
    if (!hashrate || !power || !electricity) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const p = await getXelPrice();
      const s = await get24hStats();
      const r = calculateMiningRevenue(
        Number(hashrate),
        s,
        Number(power),
        Number(electricity),
        p
      );
      setPrice(p);
      setStats(s);
      setResult(r);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch mining data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h2 className="text-2xl md:text-3xl font-semibold text-center dark:text-white">
        XELIS Mining Profitability Calculator
      </h2>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Hashrate (KH/s)",
            placeholder: "Enter Hash",
            value: hashrate,
            setter: setHashrate
          },
          {
            label: "Power (Watts)",
            placeholder: "Enter Power",
            value: power,
            setter: setPower
          },
          {
            label: "Electricity ($/kWh)",
            placeholder: "Enter Price",
            value: electricity,
            setter: setElectricity
          }
        ].map((field, i) => (
          <div key={i}>
            <div className="h-6 mb-2">
              <label className="dark:text-white font-medium">
                {field.label}
              </label>
            </div>

            <input
              type="number"
              step="any"
              placeholder={field.placeholder}
              className="w-full border border-gray-300 rounded-lg px-4 py-3
                         dark:bg-gray-800 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-xelis-blue"
              value={field.value}
              onChange={e =>
                field.setter(e.target.value === "" ? "" : Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

      {/* Calculate Button */}
      <div className="flex justify-center">
        <button
          onClick={run}
          disabled={loading}
          className={`
            relative px-10 py-3 rounded-lg font-semibold text-lg transition
            bg-xelis-blue text-white
            hover:bg-black dark:hover:bg-white dark:text-black
            flex items-center justify-center
          `}
        >
          {loading && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 animate-spin
              border-2 border-t-transparent border-white dark:border-black w-5 h-5 rounded-full"></span>
          )}
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {/* Results */}
      {stats && result && (
        <div className="space-y-8">
          {/* Network Stats */}
          <section className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Network Statistics (Last 24 Hours)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>Network Hashrate: <strong>{formatHashrate(stats.network_hashrate)}</strong></div>
              <div>Avg Difficulty: <strong>{stats.avg_difficulty.toLocaleString()}</strong></div>
              <div>Avg Block Time: <strong>{stats.avg_block_time.toFixed(1)}s</strong></div>
              <div>Blocks (24h): <strong>{stats.total_blocks}</strong></div>
              <div>Total Rewards: <strong>{stats.total_rewards.toFixed(2)} XEL</strong></div>
            </div>
          </section>

          {/* Your Stats */}
          <section className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Your Mining Statistics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>Your Hashrate: <strong>{formatHashrate(Number(hashrate) * 1000)}</strong></div>
              <div>Network Share: <strong>{result.share_pct.toFixed(6)}%</strong></div>
              <div>Expected Blocks/Day: <strong>{result.expected_blocks.toFixed(4)}</strong></div>
              <div>Power Usage: <strong>{power} W</strong></div>
              <div>Electricity Cost: <strong>${electricity}/kWh</strong></div>
            </div>
          </section>

          {/* Estimated Revenue */}
          <section className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">
              Estimated Revenue (Before Electricity)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="font-medium">Daily</div>
                <div>{result.daily_xel.toFixed(4)} XEL</div>
                <div>${result.daily_revenue.toFixed(2)}</div>
              </div>
              <div>
                <div className="font-medium">Weekly</div>
                <div>{result.weekly_xel.toFixed(2)} XEL</div>
                <div>${result.weekly_revenue.toFixed(2)}</div>
              </div>
              <div>
                <div className="font-medium">Monthly</div>
                <div>{result.monthly_xel.toFixed(2)} XEL</div>
                <div>${result.monthly_revenue.toFixed(2)}</div>
              </div>
              <div>
                <div className="font-medium">Yearly</div>
                <div>{result.yearly_xel.toFixed(2)} XEL</div>
                <div>${result.yearly_revenue.toFixed(2)}</div>
              </div>
            </div>
          </section>

          {/* Estimated Profit */}
          <section className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 dark:text-white text-center">
              Estimated Profit (After Electricity)
            </h3>

            <div className="text-center font-bold text-lg mb-4">
              {result.daily_profit > 0 ? "✅ PROFITABLE" : "❌ NOT PROFITABLE"}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-sm text-center">
              <div>
                <div className="font-medium">Daily Profit</div>
                <div>${result.daily_profit.toFixed(2)}</div>
              </div>

              <div>
                <div className="font-medium">Weekly Profit</div>
                <div>${(result.daily_profit * 7).toFixed(2)}</div>
              </div>

              <div>
                <div className="font-medium">Monthly Profit</div>
                <div>${(result.daily_profit * 30).toFixed(2)}</div>
              </div>

              <div>
                <div className="font-medium">Yearly Profit</div>
                <div>${(result.daily_profit * 365).toFixed(2)}</div>
              </div>
            </div>

            <div className="mt-4 text-xs text-center opacity-80">
              Break-even XEL price: ${(result.daily_cost / result.daily_xel).toFixed(4)} •
              Current XEL price: ${price.toFixed(4)}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
