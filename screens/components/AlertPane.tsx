import { useCallback, useMemo } from "react";

interface AlertHistoryProps {
  type: string;
  status: string;
  time: string;
  value: number | string;
  threshold?: string | number;
}

export const AlertPane: IComponent = () => {
  //fetch data here
  // TODO: integrate with backend
  // useEffect(() => {}, [])

  const renderHeader = useMemo(
    () => (
      <tr className="text-xs text-[#667085] bg-gray-100  font-normal">
        <th className="p-4">ID</th>
        <th className="p-4">Type</th>
        <th className="p-4">Value</th>
        <th className="p-4">Threshold</th>
        <th className="p-4">Status</th>
        <th className="p-4">Time</th>
      </tr>
    ),
    []
  );

  const renderData = useCallback(() => {
    const data: AlertHistoryProps[] = [
      {
        type: "Temperature",
        status: "High",
        time: "Apr 1 11:58 AM",
        value: "50 celsius",
        threshold: "30 celsius",
      },
      {
        type: "Light",
        status: "Low",
        time: "Apr 1 11:58 AM",
        value: "50",
        threshold: "30",
      },
      {
        type: "Temperature",
        status: "Low",
        time: "Apr 1 11:58 AM",
        value: "10 celsius",
        threshold: "30 celsius",
      },
      {
        type: "Smoke",
        status: "Detected",
        time: "Apr 1 11:58 AM",
        value: "-",
      },
    ];
    //TODO: sort by time
    return data.map((d, index) => (
      <tr
        key={index}
        className="cursor-pointer text-gray-700 hover:bg-gray-200"
      >
        <td className="p-4 font-bold text-black">{index}</td>
        <td className="p-4 ">{d.type}</td>
        <td className="p-4">{d.value}</td>
        <td className="p-4">{d.threshold ?? "-"}</td>
        <td className="p-4">{d.status}</td>
        <td className="p-4">{d.time}</td>
      </tr>
    ));
  }, []);
  return (
    <div className="p-8">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>10:06 AM, Mar 2 2023</h1>
      </div>

      <div className="container mx-auto p-6 bg-white rounded-2xl">
        <h1 className="text-xl font-sans	font-semibold pb-6 text-gray-900">
          Alert history
        </h1>

        <table className="table bg-white w-full	text-sm font-sans font-light">
          <thead className="!bg-[#EAECF0]">{renderHeader}</thead>
          <tbody className="text-center text-white-900">{renderData()}</tbody>
        </table>
      </div>
    </div>
  );
};
