"use client";

import { useState } from "react";

import {
    CheckCircle2,
    Sparkles,
    XCircle,
} from "lucide-react";

import { continueTrip } from "../services/api";

type Checkpoint = {
  id: number;
  title: string;
};

type Props = {
  checkpoints: Checkpoint[];
  destination: string;
  onContinue: (data: any) => void;
};

export default function CheckpointCard({
  checkpoints,
  destination,
  onContinue,
}: Props) {

  const [selected, setSelected] = useState<number[]>(
    checkpoints.map((c) => c.id)
  );

  const [loading, setLoading] = useState(false);

  const toggleCheckpoint = (id: number) => {

    if (selected.includes(id)) {

      setSelected(
        selected.filter((i) => i !== id)
      );

    } else {

      setSelected([...selected, id]);
    }
  };

  const handleRejectAll = () => {
    setSelected([]);
  };

  const handleConfirm = async () => {

    try {

      setLoading(true);

      const approvedSteps = checkpoints
        .filter((c) => selected.includes(c.id))
        .map((c) => c.title);

      const response = await continueTrip(
        destination,
        approvedSteps
      );

      onContinue(response.response);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="bg-white rounded-3xl p-7 shadow-sm border border-gray-100">

      <div className="flex justify-between items-center mb-8">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <Sparkles className="text-purple-600" />

            <h2 className="text-2xl font-bold text-gray-900">
              Human Approval Workflow
            </h2>

          </div>

          <p className="text-gray-500">
            AI generated suggestions. Human makes final decisions.
          </p>

        </div>

        <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">

          {selected.length}/{checkpoints.length} Approved

        </div>

      </div>

      <div className="space-y-4">

        {checkpoints.map((step) => {

          const active = selected.includes(step.id);

          return (

            <div
              key={step.id}
              onClick={() => toggleCheckpoint(step.id)}
              className={`
                border
                rounded-2xl
                p-5
                cursor-pointer
                transition-all
                flex
                gap-4
                items-start

                ${
                  active
                    ? "border-purple-300 bg-purple-50"
                    : "border-gray-200 bg-gray-50"
                }
              `}
            >

              <div className="mt-1">

                {active ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={24}
                  />
                ) : (
                  <XCircle
                    className="text-gray-400"
                    size={24}
                  />
                )}

              </div>

              <div className="flex-1">

                <p className="text-gray-800 leading-7">
                  {step.title}
                </p>

              </div>

            </div>
          );
        })}

      </div>

      <div className="flex gap-4 mt-8">

        <button
          onClick={handleRejectAll}
          className="
            px-6
            py-3
            rounded-2xl
            bg-gray-200
            hover:bg-gray-300
            text-gray-800
            transition-all
          "
        >
          Reject All
        </button>

        <button
          onClick={handleConfirm}
          disabled={loading || selected.length === 0}
          className="
            px-6
            py-3
            rounded-2xl
            bg-green-500
            hover:bg-green-600
            text-white
            font-semibold
            transition-all
            disabled:opacity-50
          "
        >

          {loading
            ? "Generating Final Plan..."
            : `Continue With ${selected.length} Steps`}

        </button>

      </div>

    </div>
  );
}