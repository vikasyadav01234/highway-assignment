"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import {logo} from "@/app/logo (1).png";
import {rightcolom} from "@/app/right-column.png"
export default function SignUpPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        dob: "",
        name: "",
    })
    const [loading, setLoading] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.name.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    const onSignup = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/users/signup", user)
            console.log("SignUp Successfully", res.data)
            router.push("/login");
            toast("Sign Up Successfully ")
        } catch (error) {
            toast("Something went wrong")
            console.log(error);

        }
    }
    return (
        <div className="flex flex-col">
            <div className="flex flex-row">
                <div>
                    <img src={logo} alt="logo"/>
                    <div>
                        <h1>Sign Up</h1>
                        <form>
                            <label>Name</label>
                            <input type="text" id="name" value={name} placeholder="Enter Your Name"/>
                        </form>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>


    )
}