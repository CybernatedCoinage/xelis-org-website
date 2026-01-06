/* XELIS Mining Profitability Calculator (Web Port)
   Faithful port of original Python script
*/

const NODE_RPC_URL = "https://us-node.xelis.io/json_rpc";
const COINGECKO_API =
  "https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=xelis";
const BATCH_SIZE = 20;
const LEX_TO_XEL = 1e8;
const SECONDS_IN_24H = 86400;
const MAX_WORKERS = 6; // parallel fetch limit

type RpcPayload = {
  jsonrpc: string;
  id: number;
  method: string;
  params?: any;
};

async function rpcCall(method: string, params?: any) {
  const payload: RpcPayload = {
    jsonrpc: "2.0",
    id: 1,
    method,
    ...(params ? { params } : {})
  };

  const res = await fetch(NODE_RPC_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const json = await res.json();
  if (json.error) throw new Error(json.error.message);
  return json.result;
}

export async function getXelPrice(): Promise<number> {
  try {
    const res = await fetch(COINGECKO_API);
    const json = await res.json();
    return json.xelis.usd;
  } catch {
    return 1.0;
  }
}

export async function get24hStats() {
  const info = await rpcCall("get_info");
  const currentTopo = info.topoheight;
  const cutoff = Date.now() - SECONDS_IN_24H * 1000;

  let blocks: any[] = [];
  let firstTs: number | null = null;
  let lastTs: number | null = null;

  // Build topo ranges
  const ranges: Array<[number, number]> = [];
  let end = currentTopo;
  while (end > 0) {
    const start = Math.max(0, end - BATCH_SIZE + 1);
    ranges.push([start, end]);
    end = start - 1;
  }

  // Limited parallel fetch
  for (let i = 0; i < ranges.length; i += MAX_WORKERS) {
    const chunk = ranges.slice(i, i + MAX_WORKERS);

    const results = await Promise.all(
      chunk.map(([start, end]) =>
        rpcCall("get_blocks_range_by_topoheight", {
          start_topoheight: start,
          end_topoheight: end
        })
      )
    );

    for (const batch of results) {
      const list = Array.isArray(batch) ? batch : [batch];

      for (const block of list) {
        const ts = block.timestamp;
        if (ts < cutoff) return finalize(blocks, firstTs, lastTs);

        blocks.push(block);
        firstTs = firstTs === null ? ts : Math.min(firstTs, ts);
        lastTs = lastTs === null ? ts : Math.max(lastTs, ts);
      }
    }
  }

  return finalize(blocks, firstTs, lastTs);
}

function finalize(blocks: any[], firstTs: number | null, lastTs: number | null) {
  const normal = blocks.filter(b => b.block_type !== "Side");
  const side = blocks.filter(b => b.block_type === "Side");

  const totalNormal = normal.reduce((s, b) => s + b.reward / LEX_TO_XEL, 0);
  const totalSide = side.reduce((s, b) => s + b.reward / LEX_TO_XEL, 0);

  const avgDifficulty =
    blocks.reduce((s, b) => s + Number(b.difficulty), 0) / blocks.length;

  const avgBlockTime =
    blocks.length > 1 && firstTs && lastTs
      ? (lastTs - firstTs) / 1000 / (blocks.length - 1)
      : 15;

  const networkHashrate = avgDifficulty / avgBlockTime;

  return {
    total_blocks: blocks.length,
    normal_blocks: normal.length,
    side_blocks: side.length,
    blocks_per_day: blocks.length,
    avg_difficulty: avgDifficulty,
    avg_block_time: avgBlockTime,
    network_hashrate: networkHashrate,
    total_rewards: totalNormal + totalSide
  };
}

export function calculateMiningRevenue(
  userHashrateKhs: number,
  stats: any,
  powerWatts: number,
  electricityCost: number,
  xelPrice: number
) {
  const userHs = userHashrateKhs * 1000;
  const share = userHs / stats.network_hashrate;
  const expectedBlocks = stats.blocks_per_day * share;
  const avgReward = stats.total_rewards / stats.total_blocks;
  const dailyXel = expectedBlocks * avgReward;

  const dailyKwh = (powerWatts / 1000) * 24;
  const dailyElectricityCost = dailyKwh * electricityCost;

  const dailyRevenueUsd = dailyXel * xelPrice;
  const dailyProfitUsd = dailyRevenueUsd - dailyElectricityCost;

  return {
    share_pct: share * 100,
    expected_blocks: expectedBlocks,
    daily_xel: dailyXel,
    weekly_xel: dailyXel * 7,
    monthly_xel: dailyXel * 30,
    yearly_xel: dailyXel * 365,
    daily_revenue: dailyRevenueUsd,
    weekly_revenue: dailyRevenueUsd * 7,
    monthly_revenue: dailyRevenueUsd * 30,
    yearly_revenue: dailyRevenueUsd * 365,
    daily_cost: dailyElectricityCost,
    weekly_cost: dailyElectricityCost * 7,
    monthly_cost: dailyElectricityCost * 30,
    yearly_cost: dailyElectricityCost * 365,
    daily_profit: dailyProfitUsd
  };
}

export function formatHashrate(hs: number): string {
  if (hs >= 1e12) return `${(hs / 1e12).toFixed(2)} TH/s`;
  if (hs >= 1e9) return `${(hs / 1e9).toFixed(2)} GH/s`;
  if (hs >= 1e6) return `${(hs / 1e6).toFixed(2)} MH/s`;
  if (hs >= 1e3) return `${(hs / 1e3).toFixed(2)} KH/s`;
  return `${hs.toFixed(2)} H/s`;
}
