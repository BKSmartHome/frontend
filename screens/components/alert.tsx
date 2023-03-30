export const Alert: IComponent = () => {
  return (
    <div className="p-8">
      <div className="text-white text-4xl justify-between font-semibold flex gap-2 mb-8">
        <h1>Smart Home</h1>
        <h1>10:06 AM, Mar 2 2023</h1>
      </div>

      <div className="container mx-auto p-6 bg-gray-100 rounded-2xl">
        <h1 className="text-xl font-sans	font-semibold pb-6 text-gray-900">
          Alert history
        </h1>

        <table className="table-auto w-full	font-sans">
          <thead>
            <tr className="text-gray-900 bg-gray-300">
              <th className="border border-gray-600">ID</th>
              <th className="border border-gray-600">Alert</th>
              <th className="border border-gray-600">Time</th>
              <th className="border border-gray-600">Date</th>
            </tr>
          </thead>
          <tbody className="text-center text-white-900">
            <tr className="text-gray-900 hover:bg-gray-200">
              <td className="border border-gray-600 py-2">1</td>
              <td className="border border-gray-600">High temperature</td>
              <td className="border border-gray-600">10:30 AM</td>
              <td className="border border-gray-600">2022-03-12</td>
            </tr>
            <tr className="text-gray-900 hover:bg-gray-200">
              <td className="border border-gray-600 py-2">2</td>
              <td className="border border-gray-600">Low temperature</td>
              <td className="border border-gray-600">02:15 PM</td>
              <td className="border border-gray-600">2022-02-28</td>
            </tr>
            <tr className="text-gray-900 hover:bg-gray-200">
              <td className="border border-gray-600 py-2">3</td>
              <td className="border border-gray-600">Low light level</td>
              <td className="border border-gray-600">08:45 PM</td>
              <td className="border border-gray-600">2022-01-07</td>
            </tr>
            <tr className="text-gray-900 hover:bg-gray-200">
              <td className="border border-gray-600 py-2">4</td>
              <td className="border border-gray-600">Device not connected</td>
              <td className="border border-gray-600">11:20 AM</td>
              <td className="border border-gray-600">2022-02-01</td>
            </tr>
            <tr className="text-gray-900 hover:bg-gray-200">
              <td className="border border-gray-600 py-2">5</td>
              <td className="border border-gray-600">Smoke detected</td>
              <td className="border border-gray-600">09:05 AM</td>
              <td className="border border-gray-600">2022-03-17</td>
            </tr>
            <tr className="text-gray-900 hover:bg-gray-200">
              <td className="border border-gray-600 py-2">6</td>
              <td className="border border-gray-600">High humidity</td>
              <td className="border border-gray-600">06:00 PM</td>
              <td className="border border-gray-600">2022-05-25</td>
            </tr>
            <tr className="text-gray-900 hover:bg-gray-200">
              <td className="border border-gray-600 py-2">7</td>
              <td className="border border-gray-600">Power failure</td>
              <td className="border border-gray-600">03:20 AM</td>
              <td className="border border-gray-600">2022-06-09</td>
            </tr>
            <tr className="text-gray-900 hover:bg-gray-200">
              <td className="border border-gray-600 py-2">8</td>
              <td className="border border-gray-600">Motion detected</td>
              <td className="border border-gray-600">03:25 AM</td>
              <td className="border border-gray-600">2022-02-18</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
