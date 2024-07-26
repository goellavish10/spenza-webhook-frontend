import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

const ListWebhookEvents = () => {
  const [webhooks, setWebhooks] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    };
    axiosPrivate
      .get("/webhooks/events", { headers })
      .then((res) => {
        const { data } = res;
        setWebhooks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Source
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Callback URL
            </th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
              Payload
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {webhooks.map((webhook, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {webhook.source}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {webhook.webhook.callbackUrl}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                <pre>{JSON.stringify(webhook, null, 2)}</pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListWebhookEvents;
