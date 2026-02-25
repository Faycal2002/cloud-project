import SideMenu from "../components/SideMenu";

function Energy() {
  return (
    <div className="flex">
      <SideMenu />

      <div className="p-12 w-full">
        <h1 className="text-4xl font-bold">Energy</h1>
         <p className="text-gray-600">
          Here you can see devices energy consuming.
        </p>
      </div>
    </div>
  );
}

export default Energy;