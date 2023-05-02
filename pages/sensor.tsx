import {
  NEXT_PUBLIC_MQTT_CLIENT_ID,
  NEXT_PUBLIC_MQTT_PASSWORD,
  NEXT_PUBLIC_MQTT_URI,
  NEXT_PUBLIC_MQTT_USERNAME,
} from "@env";
import useMqtt from "@hooks/useMqtt";
import { Button } from "@material-tailwind/react";
import type { MqttClient } from "mqtt";
import { useRef, useState } from "react";

export default function Home() {
  const [incommingMessages, setIncommingMessages] = useState<any[]>([]);
  const addMessage = (message: string) => {
    setIncommingMessages((incommingMessages) => [
      ...incommingMessages,
      message,
    ]);
  };
  const clearMessages = () => {
    setIncommingMessages(() => []);
  };

  const incommingMessageHandlers = useRef([
    {
      topic: "temperature",
      handler: (msg: string) => {
        addMessage(msg);
      },
    },
  ]);

  const mqttClientRef = useRef<MqttClient | null>(null);
  const setMqttClient = (client: MqttClient) => {
    mqttClientRef.current = client;
  };
  useMqtt({
    uri: NEXT_PUBLIC_MQTT_URI,
    options: {
      username: NEXT_PUBLIC_MQTT_USERNAME,
      password: NEXT_PUBLIC_MQTT_PASSWORD,
      clientId: NEXT_PUBLIC_MQTT_CLIENT_ID,
    },
    topicHandlers: incommingMessageHandlers.current,
    onConnectedHandler: (client) => setMqttClient(client),
  });

  const publishMessages = (client: any) => {
    if (!client) {
      console.log("(publishMessages) Cannot publish, mqttClient: ", client);
      return;
    }

    client.publish("topic1", "1st message from component");
  };

  console.log("mqttClientRef.current: ", mqttClientRef.current);

  return (
    <div>
      <h2>Subscribed Topics</h2>
      {incommingMessageHandlers.current.map((i) => (
        <p key={Math.random()}>{i.topic}</p>
      ))}
      <h2>Incomming Messages:</h2>
      {incommingMessages.map((m) => (
        <p key={Math.random()}>{m.payload.toString()}</p>
      ))}
      <Button
        onClick={() => publishMessages(mqttClientRef.current)}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        Publish Test Messages
      </Button>
      <Button
        onClick={() => clearMessages()}
        nonce={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
      >
        Clear Test Messages
      </Button>
    </div>
  );
}
