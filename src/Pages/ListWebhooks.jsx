import { useEffect, useState } from "react";
import { axiosPrivate } from "../api/axios";

const ListWebhooks = () => {
  const [webhooks, setWebhooks] = useState([]);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`
    };
    axiosPrivate
      .get("/webhooks", { headers })
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
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {webhooks.map((webhook) => (
            <tr>
              <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {webhook.source}
              </td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                {webhook.callbackUrl}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListWebhooks;
