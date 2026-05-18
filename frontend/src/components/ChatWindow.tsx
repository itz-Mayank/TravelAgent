import CheckpointCard from "./CheckpointCard";

type Props = {
  session: any;
  onContinue: (data: any) => void;
};

export default function ChatWindow({
  session,
  onContinue,
}: Props) {

  if (!session) {

    return (

      <div className="flex-1 flex items-center justify-center">

        <div className="text-center">

          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            AI Travel Copilot
          </h1>

          <p className="text-gray-500 text-xl">
            Human-controlled AI travel workspace
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="flex-1 overflow-y-auto px-10 py-8">

      <div className="max-w-5xl mx-auto space-y-8">

        {session.messages.map(
          (message: any, index: number) => {

            if (message.role === "user") {

              return (

                <div
                  key={index}
                  className="flex justify-end"
                >

                  <div
                    className="
                      bg-purple-600
                      text-white
                      px-6
                      py-4
                      rounded-3xl
                      max-w-2xl
                      shadow-sm
                    "
                  >

                    <p className="leading-7">
                      {message.content}
                    </p>

                  </div>

                </div>
              );
            }

            const response = message.content;

            return (

              <div
                key={index}
                className="space-y-6"
              >

                {/* Destination Card */}

                {response.destination && (

                  <div className="
                    bg-white
                    rounded-3xl
                    p-7
                    shadow-sm
                    border
                    border-gray-100
                  ">

                    <h1 className="
                      text-4xl
                      font-bold
                      text-gray-900
                      mb-4
                    ">
                      {response.destination}
                    </h1>

                    <p className="
                      text-gray-700
                      leading-8
                      text-lg
                    ">
                      {response.weather_summary}
                    </p>

                  </div>
                )}

                {/* Packing Checklist */}

                {response.packing_items && (

                  <div className="
                    bg-white
                    rounded-3xl
                    p-7
                    shadow-sm
                    border
                    border-gray-100
                  ">

                    <h2 className="
                      text-2xl
                      font-bold
                      text-gray-900
                      mb-6
                    ">
                      Packing Checklist
                    </h2>

                    <div className="space-y-3">

                      {response.packing_items.map(
                        (
                          item: string,
                          itemIndex: number
                        ) => (

                          <div
                            key={itemIndex}
                            className="
                              bg-gray-50
                              border
                              border-gray-200
                              rounded-2xl
                              p-4
                              flex
                              items-center
                              gap-3
                            "
                          >

                            <input
                              type="checkbox"
                              defaultChecked
                              className="
                                w-5
                                h-5
                                accent-purple-600
                              "
                            />

                            <p className="text-gray-800">
                              {item}
                            </p>

                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}

                {/* Human Approval Workflow */}

                {response.checkpoints && (

                  <CheckpointCard
                    checkpoints={response.checkpoints}
                    destination={response.destination}
                    onContinue={onContinue}
                      // console.log(newResponse);
                    
                  />
                )}

                {/* Travel Intelligence */}

                {response.travel_tips && (

                  <div className="
                    bg-white
                    rounded-3xl
                    p-7
                    shadow-sm
                    border
                    border-gray-100
                  ">

                    <h2 className="
                      text-2xl
                      font-bold
                      text-gray-900
                      mb-6
                    ">
                      AI Travel Intelligence
                    </h2>

                    <div className="space-y-4">

                      {response.travel_tips.map(
                        (
                          tip: string,
                          tipIndex: number
                        ) => (

                          <div
                            key={tipIndex}
                            className="
                              bg-blue-50
                              border
                              border-blue-100
                              rounded-2xl
                              p-5
                            "
                          >

                            <p className="
                              text-gray-800
                              leading-7
                            ">
                              {tip}
                            </p>

                          </div>
                        )
                      )}

                    </div>

                  </div>
                )}

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}