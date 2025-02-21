import SideBar from "@/components/Dashboard/SideBar"

export default async function DashboardLayout({children}:{
    children : React.ReactNode
}){
    return (
        <div className="w-full min-h-screen flex">
            <SideBar/>
            {children}
        </div>
    )
}