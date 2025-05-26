import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import User from '../User/User.jsx'
import Reward from '../Reward/Reward.jsx'
import UserReward from '../UserReward/UserReward.jsx'

function App() {
  const [rewards, setRewards] = useState([])
  const [userRewards, setUserRewards] = useState([])
  const [points, setPoints] = useState(null)
  axios.defaults.baseURL = "http://localhost:3000"

  const fetchData = async () => {
    const [
      rewardsResponse, 
      userResponse, 
      userRewardsResponse
    ] = await Promise.all([
      axios.get('/rewards'), 
      axios.get('/users/1'), 
      axios.get('/users/1/user_rewards')
    ])
    
    if (rewardsResponse.status === 200) {
      setRewards(rewardsResponse.data)
    } else {
      axios.get('/rewards')
    }

    if (userResponse.status === 200) {
      setPoints(userResponse.data.user.reward_points)
    } else {
      axios.get('/users/1')
    }

    if (userRewardsResponse.status === 200) {
      setUserRewards(userRewardsResponse.data)
    } else {
      axios.get('/users/1/user_rewards')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onRedeemClick = async (id) => {
    const redeemReponse = await axios.post('/users/1/user_rewards', {reward_id: id})

    if (redeemReponse.status == 201) {
      fetchData()
    } else {
      console.log(`Failed to redeem reward ${id}`)
    }
  }

  return (
    <>
      <h1>Thanx Rewards</h1>
      <User points={points} />
      <h3>Rewards</h3>
      <div>
        {rewards.map(reward => (
          <Reward 
            key={reward.id}
            reward={reward}
            points={points}
            onRedeemClick={onRedeemClick}
          />
        ))}
      </div>
      <h3>Redeemed Rewards</h3>
      <div>
        {userRewards.map(reward => (
          <UserReward 
            key={reward.id}
            reward={reward} 
          />
        ))}
      </div>
    </>
  )
}

export default App
