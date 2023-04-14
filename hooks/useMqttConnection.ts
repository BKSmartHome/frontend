import { useMqttStore } from "@states/emqx";
import { connect } from "mqtt";
import { useEffect } from "react";

/**
 * connect - connect to an MQTT broker.
 *
 * @param {String} url - url of the broker
 */
const useMQTTConnection = (
  url: string,
  options?: { [key: string]: unknown }
) => {
  const { client, setClient } = useMqttStore();

  useEffect(() => {
    console.log("connecting to mqtt broker");
    const newClient = connect(url, options);
    setClient(newClient);
    return () => {
      client?.end();
    };
  }, []);

  return client;
};

export default useMQTTConnection;
