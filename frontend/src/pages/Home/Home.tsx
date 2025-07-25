import Iridescence from "./Iridescence";
import TextPressure from "./TextPressure.tsx";
import {Bot} from "lucide-react";

function Home() {
  return (
    <div className="w-screen h-screen">
        <div className="absolute w-screen h-60 grid place-items-center z-22">
            <div className="w-1/2 h-30 flex justify-between items-center  bg-white/25 backdrop-blur-md rounded-4xl px-20 py-2  ">
                <div className="flex text-white text-3xl">
                    <Bot size={30}/>
                    <h1 className="font-family">BOT</h1>
                </div>
                <button type="button" className=" text-gray-500 cursor-pointer bg-white font-medium rounded-lg text-sm px-15 py-5 text-center me-2 mb-2 ">Sign In</button>
            </div>
        </div>
      <div className="w-full h-full">
        <Iridescence
          color={[1, 1, 1]}
          mouseReact={true}
          amplitude={0.1}
          speed={1.0}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-10 bg-blue-950 opacity-50">
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="w-1/2 mx-auto">
              <TextPressure
                  text="EXPLORE"
                  flex={true}
                  alpha={false}
                  stroke={false}
                  width={true}
                  weight={true}
                  italic={true}
                  textColor="#ffffff"
                  strokeColor="#ff0000"
                  minFontSize={36}
              />
          </div>
      </div>
        <div className="absolute inset-0 grid place-items-center pt-150 z-21">
            <button type="button" className="text-white px-20 py-8 text-lg bg-white/25 backdrop-blur-md cursor-pointer rounded-4xl">
                GET STARTED
            </button>
        </div>

    </div>
  );
}

export default Home;
