import SideMenu from "../components/SideMenu";

function Dashboard() {
    return (
        
            <div className="flex ">
                <SideMenu/>
                <div className="p-12 w-full ">
                    <p className="text-lg text-gray-600 mb-8">Welcome to your personal space</p>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-2xl font-semibold mb-3">Statistics</h3>
                        <p className="text-gray-600">Your statistics...</p>
                    </div>
                </div>
            </div>
    );
}

export default Dashboard;
