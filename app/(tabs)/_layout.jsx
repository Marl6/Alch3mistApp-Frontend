 import React from 'react'
import { Redirect, Tabs } from "expo-router"
import { useAuth } from '@clerk/clerk-expo'
import { Ionicons } from "@expo/vector-icons"

const TabsLayout = () => {
    const {isSignedIn} = useAuth()

  if(!isSignedIn) return <Redirect href={"/(auth)/sign-in"}/>
    
    return <Tabs>

      <Tabs.Screen 
      name="index" />
      options={{
        title:"Recipes",
        tabBarIcon: ({Colors, size}) => <Ionicons name="restaurant"
        size={size}
        color={Colors}/>
      }}
    </Tabs>
  
}

export default TabsLayout