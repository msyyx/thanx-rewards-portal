import '../App/App.jsx'

function UserReward({ reward }) {
  return (
    <p key={reward.id}>{reward.name}</p>
  )
}

export default UserReward
