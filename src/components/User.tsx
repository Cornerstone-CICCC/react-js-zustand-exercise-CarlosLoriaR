import { useState } from 'react'
import { useUserStore } from '../stores/user.store'

const HOBBIES = [
  'Reading',
  'Gaming',
  'Cooking',
  'Sports',
  'Music',
  'Traveling',
  'Photography',
  'Art',
]

export function User() {
  const users = useUserStore((state) => state.users)
  const addUser = useUserStore((state) => state.addUser)
  const deleteUser = useUserStore((state) => state.deleteUser)

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [age, setAge] = useState('')
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([])

  const handleHobbyChange = (hobby: string) => {
    setSelectedHobbies((prev) =>
      prev.includes(hobby)
        ? prev.filter((h) => h !== hobby)
        : [...prev, hobby]
    )
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()

    if (!firstname.trim() || !lastname.trim() || !age.trim()) {
      alert('Please fill in all fields')
      return
    }

    addUser({
      firstname,
      lastname,
      age: parseInt(age, 10),
      hobbies: selectedHobbies,
    })

    setFirstname('')
    setLastname('')
    setAge('')
    setSelectedHobbies([])
  }

  return (
    <div>
      <h1>User Management</h1>

      <div>
        <h2>Users List</h2>
        {users.length === 0 ? (
          <p>No users yet</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.map((user) => (
              <li
                key={user.id}
                style={{
                  border: '1px solid #646cff',
                  padding: '1em',
                  marginBottom: '1em',
                  borderRadius: '4px',
                }}
              >
                <div>
                  <strong>
                    {user.firstname} {user.lastname}
                  </strong>
                </div>
                <div>Age: {user.age}</div>
                <div>
                  Hobbies: {user.hobbies.length > 0 ? user.hobbies.join(', ') : 'None'}
                </div>
                <button
                  onClick={() => deleteUser(user.id)}
                  style={{ marginTop: '0.5em', backgroundColor: '#ff6b6b' }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: '2em' }}>
        <h2>Add New User</h2>
        <form onSubmit={handleAddUser}>
          <div>
            <label htmlFor="firstname">First Name:</label>
            <input
              id="firstname"
              type="text"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label htmlFor="lastname">Last Name:</label>
            <input
              id="lastname"
              type="text"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label htmlFor="age">Age:</label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
            />
          </div>

          <div>
            <label>Hobbies:</label>
            <div style={{ marginLeft: '1em' }}>
              {HOBBIES.map((hobby) => (
                <label key={hobby} style={{ display: 'block', margin: '0.5em 0' }}>
                  <input
                    type="checkbox"
                    checked={selectedHobbies.includes(hobby)}
                    onChange={() => handleHobbyChange(hobby)}
                    style={{ marginRight: '0.5em' }}
                  />
                  {hobby}
                </label>
              ))}
            </div>
          </div>

          <button type="submit" style={{ marginTop: '1em', color: 'white' }}>
            Add User
          </button>
        </form>
      </div>
    </div>
  )
}
