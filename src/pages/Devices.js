import SideMenu from "../components/SideMenu";

function Devices() {
  return (
    <div className="flex">

      <SideMenu />

      <div className="p-12 w-full">
        <h1 className="text-4xl font-bold mb-4">Devices</h1>
        <p className="text-gray-600">
          Here you can see all your devices.
        </p>
      </div>

    </div>
  );
}

export default Devices;