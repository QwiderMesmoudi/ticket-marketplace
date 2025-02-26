"use client"

import { api } from "@/convex/_generated/api"
import { useUser } from "@clerk/nextjs"
import { useMutation } from "convex/react"
import { use, useEffect } from "react"

const SyncUserWithConvex = () => {

    const {user}=useUser()
    const updateUser = useMutation(api.users.updateUser)

    useEffect(() => {
        if(!user) return;
        const syncUser = async () => {
           try {
            
            await updateUser({name:`${user.firstName || ""} ${user.lastName || ""}`.trim(),email:user.emailAddresses[0]?.emailAddress ?? "",userId:user.id})
            
           } catch (error) {
            console.error(error)
           }
        }
        syncUser()
    }, [user,updateUser])


  return null
}

export default SyncUserWithConvex
