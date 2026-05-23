import { Card } from "antd";

function InfoClient() {
  return (
     <div className="mt-5">
      <div className="grid grid-cols-3 max-[1100px]:grid-cols-2 max-[600px]:grid-cols-1 gap-4">
        <Card className="p-4">
          <div aria-details="header">
            <h1 className="font-semibold">Buyurtmalar</h1>
          </div>
          <div className="  border-gray-300 flex justify-between border border-border py-2 px-3 mt-3 rounded-2xl">
            <span className="font-semibold">Jami:</span>
            <span>223 323 $</span>
          </div>
        </Card>
        <Card className="p-4">
          <div aria-details="header">
            <h1 className="font-semibold">To'lovlar</h1>
          </div>
          <div className="mt-3  border-gray-300">
            <div className=" border-gray-300 flex justify-between border-b rounded-none rounded-t-lg border-t border-l border-r py-2 px-3">
              <div className="flex gap-2 items-center  border-gray-300">
        
                <span className="font-semibold  border-gray-300">Ko'chirma</span>
              </div>
              <span>223 323 $</span>
            </div>
            <div className="flex justify-between border-b rounded-none border-l border-r border-border py-2 px-3  border-gray-300">
              <div className="flex gap-2 items-center">
         
                <span className="font-semibold">Naqd so'm</span>
              </div>
              <span>223 323 $</span>
            </div>
            <div className="  border-gray-300 flex justify-between border-b rounded-none border-l border-r border-border py-2 px-3">
              <div className="flex gap-2 items-center">
                
                <span className="font-semibold">Naqd valyutada</span>
              </div>
              <span>223 323 $</span>
            </div>
            <div className="  border-gray-300 flex justify-between border-b rounded-none rounded-b-lg border-l border-r border-border py-2 px-3">
              <span className="font-semibold">Jami:</span>
              <span>223 323 $</span>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div aria-details="header">
            <h1 className="font-semibold">Moliya</h1>
          </div>
          <div className="  border-gray-300 flex justify-between border border-border py-2 px-3 mt-3 rounded-2xl">
            <span className="font-semibold">Jami:</span>
            <span>223 323 $</span>
          </div>
        </Card>
      </div>
      </div>
  );
}
export default InfoClient;
