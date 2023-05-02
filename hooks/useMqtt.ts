import type { IClientOptions, MqttClient } from "mqtt";
import MQTT from "mqtt";
import { useEffect, useRef } from "react";

interface useMqttProps {
  uri: string;
  options?: IClientOptions;
  topicHandlers?: { topic: string; handler: (payload: any) => void }[];
  onConnectedHandler?: (client: MqttClient) => void;
}

function useMqtt({
  uri,
  options = {},
  topicHandlers = [
    {
      topic: "",
      handler: ({ topic, payload, packet }) => {
        console.log("topic", topic);
        console.log("payload", payload);
        console.log("packet", packet);
      },
    },
  ],
  onConnectedHandler = (client) => {
    console.log("client", client);
  },
}: useMqttProps) {
  const clientRef = useRef<MqttClient | null>(null);

  useEffect(() => {
    if (clientRef.current) return;
    if (!topicHandlers || topicHandlers.length === 0)
      return () => {
        console.log("no handlers");
      };

    try {
      console.log("Conneting to", uri);
      clientRef.current = options
        ? MQTT.connect(uri, options)
        : MQTT.connect(uri);
    } catch (error) {
      console.error("error when connect", error);
    }

    const client = clientRef.current;

    if (!clientRef) return;

    topicHandlers.forEach((th) => {
      client?.subscribe(th.topic);
    });
    client?.on("message", (topic: string, rawPayload: string, packet: any) => {
      const th = topicHandlers.find((t) => t.topic === topic);
      let payload;
      try {
        payload = JSON.parse(rawPayload);
      } catch {
        payload = rawPayload;
      }
      if (th) th.handler({ topic, payload, packet });
    });

    client?.on("connect", () => {
      if (onConnectedHandler) onConnectedHandler(client);
    });

    // return () => {
    //   if (client) {
    //     topicHandlers.forEach((th) => {
    //       client.unsubscribe(th.topic);
    //     });
    //     client.end();
    //   }
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useMqtt;
