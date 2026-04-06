import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts"

export default function CandidateChart({ result }) {

  if (!result) return null

  const matched = result.matched_skills || []
  const missing = result.missing_skills || []

  const data = [
    ...matched.map(skill => ({
      name: skill,
      value: 1,
      type: "matched"
    })),
    ...missing.map(skill => ({
      name: skill,
      value: 1,
      type: "missing"
    }))
  ]

  // 🔥 NEW COLORS (match your UI)
  const COLORS = {
    matched: "#2f3792",   // blue
    missing: "#c0008d"    // pink
  }

  return (
    <div className="chartContainer">

      <h2 className="chartTitle">Skill Distribution</h2>

      <PieChart width={460} height={380}>
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          outerRadius={145}   // 🔥 slightly bigger
          label={false}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[entry.type]} />
          ))}
        </Pie>

        {/* Tooltip */}
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div style={{
                  background: "#111",
                  color: "#fff",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  border: "1px solid #333"
                }}>
                  {payload[0].name}
                </div>
              )
            }
            return null
          }}
        />
      </PieChart>

      {/* Legend */}
      <div className="customLegend">
        <span className="legendItem">
          <span className="legendColor matched"></span>
          Matched Skills
        </span>

        <span className="legendItem">
          <span className="legendColor missing"></span>
          Missing Skills
        </span>
      </div>

    </div>
  )
}