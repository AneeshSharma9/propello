import React from 'react'
import { Account } from "../components/Account"
import Navbar from '../components/Navbar'
import Signup from '../components/Signup'

function SignupPage() {
    return (
        <Account>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
            <Navbar />
            <Signup />
        </Account>
    )
}

export default SignupPage