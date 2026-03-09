import { ROLE_TECH_MAP } from "../data/techData"

export default function RoleSelector({ setRole, setTechStack }) {

  const handleChange = (e) => {

    const role = e.target.value

    setRole(role)
    setTechStack(ROLE_TECH_MAP[role] || [])
  }

  return (
    <div>

      <h3>Select Role</h3>

      <select onChange={handleChange}>

        <option>Select Role</option>

        {Object.keys(ROLE_TECH_MAP).map((role) => (

          <option key={role} value={role}>
            {role}
          </option>

        ))}

      </select>

    </div>
  )
}