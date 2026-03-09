import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
Cell
} from "recharts"

export default function CandidateChart({ result }) {

if (!result) return <p>No candidate analyzed yet</p>

const chartData = [

...result.matched_skills.map(skill => ({
skill,
value: 100,
status: "matched"
})),

...result.missing_skills.map(skill => ({
skill,
value: 20,
status: "missing"
}))

]

return (

<div>

<h2 className="score">
Score: {result.score}%
</h2>

<h3>Skill Match Chart</h3>

<div className="chartContainer">

<ResponsiveContainer width="100%" height={320}>

<BarChart
data={chartData}
margin={{ top: 10, right: 20, left: 10, bottom: 60 }}
>

<XAxis
dataKey="skill"
stroke="#9fb2d8"
angle={-30}
textAnchor="end"
interval={0}
/>

<YAxis
domain={[0,100]}
stroke="#9fb2d8"
/>

<Tooltip />

<Bar dataKey="value">

{chartData.map((entry,index)=>(
<Cell
key={`cell-${index}`}
fill={entry.status === "matched" ? "#4f9cff" : "#ff4fa3"}
/>
))}

</Bar>

</BarChart>

</ResponsiveContainer>

</div>

<h3>Matched Skills</h3>

<ul>
{result.matched_skills.map((skill,i)=>(
<li key={i} style={{color:"#4f9cff"}}>
✔ {skill}
</li>
))}
</ul>

<h3>Missing Skills</h3>

<ul>
{result.missing_skills.map((skill,i)=>(
<li key={i} style={{color:"#ff4fa3"}}>
✖ {skill}
</li>
))}
</ul>

</div>

)

}