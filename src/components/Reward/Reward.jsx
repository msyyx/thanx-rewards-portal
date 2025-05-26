import '../App/App.jsx'

function Reward({ reward, points, onRedeemClick }) {
  return (
    <div>
      <p>{reward.name}</p>
      <button disabled={reward.reward_points_required > points} onClick={() => onRedeemClick(reward.id)}>Redeem</button>
    </div>
  )
}

export default Reward
