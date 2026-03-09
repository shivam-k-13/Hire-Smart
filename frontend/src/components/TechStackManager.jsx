import { ALL_TECH } from "../data/techData"

export default function TechStackManager({ techStack, setTechStack }) {

  const addTech = (e) => {

    const tech = e.target.value

    if (!techStack.includes(tech))
      setTechStack([...techStack, tech])
  }

  const removeTech = (tech) => {

    setTechStack(techStack.filter(t => t !== tech))
  }

  return (

    <div>

      <h3>Tech Stack</h3>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        marginBottom: "20px"
      }}>

        {techStack.map((tech) => (

          <div
            key={tech}
            style={{

background:"#1a2336",

padding:"7px 14px",

borderRadius:"30px",

border:"1px solid #25345c",

display:"flex",

alignItems:"center",

gap:"8px"

}}
          >

            {tech}

            <span
              style={{
                cursor: "pointer",
                color: "#ff4fa3",
                fontWeight: "bold"
              }}
              onClick={() => removeTech(tech)}
            >
              ✕
            </span>

          </div>

        ))}

      </div>

      <h4>Add Tech</h4>

      <select onChange={addTech}>

        <option>Select Tech</option>

        {ALL_TECH.map((tech) => (

          <option key={tech} value={tech}>
            {tech}
          </option>

        ))}

      </select>

    </div>
  )
}