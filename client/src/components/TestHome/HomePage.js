import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const HomePage = () => {
 const {logout} = useAuth0();
  return (
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        Hey pookie! You have succesfully logged in. Now you can sleep peacefully! RIP

        <button onClick={(e)=>{logout({ logoutParams: { returnTo: window.location.origin } })}} style={{marginTop:"2rem"}}>Go back to Hell</button>
    </div>
  )
}

export default HomePage
